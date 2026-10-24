# -*- coding: utf-8 -*-
"""
通过 GitHub REST API（Git Database API）把本地提交推送到远端。
用途：本机 git HTTPS 上传通道被网络掐住时，改走畅通的 api.github.com。
令牌从环境变量 GH_TOKEN 读取，不写进任何文件。
用法：GH_TOKEN=<PAT> python deploy_via_api.py <commit1> <commit2>
"""
import base64
import json
import os
import re
import subprocess
import sys
import time
import urllib.error
import urllib.request
from datetime import datetime, timedelta, timezone

TOKEN = os.environ["GH_TOKEN"]
REPO = "MOmO1132/personal-portfolio"
API = "https://api.github.com/repos/" + REPO


def req(method, path, body=None, ok404=False):
    url = API + path
    data = json.dumps(body).encode() if body is not None else None
    headers = {
        "Authorization": "token " + TOKEN,
        "Accept": "application/vnd.github+json",
        "User-Agent": "api-deploy",
    }
    if data:
        headers["Content-Type"] = "application/json"
    for attempt in range(4):
        try:
            r = urllib.request.Request(url, data=data, headers=headers, method=method)
            with urllib.request.urlopen(r, timeout=180) as resp:
                return json.loads(resp.read())
        except urllib.error.HTTPError as e:
            if ok404 and e.code in (404, 409):
                return None
            if 500 <= e.code < 600 and attempt < 3:
                time.sleep(2 ** attempt)
                continue
            print("HTTP %s %s -> %s" % (method, path, e.code))
            print(e.read().decode()[:500])
            sys.exit(1)
        except urllib.error.URLError as e:
            if attempt < 3:
                time.sleep(2 ** attempt)
                continue
            print("URL error:", e)
            sys.exit(1)


def git(*args, text=False):
    kw = {"capture_output": True, "check": True}
    if text:
        kw.update(text=True, encoding="utf-8")
    return subprocess.run(["git"] + list(args), **kw).stdout


def blob_exists(sha):
    return req("GET", "/git/blobs/" + sha, ok404=True) is not None


def upload_blob(sha, label, idx, total):
    if blob_exists(sha):
        print("  [%d/%d] 已存在，跳过 %s" % (idx, total, label))
        return sha
    content = git("cat-file", "blob", sha)
    body = {"content": base64.b64encode(content).decode(), "encoding": "base64"}
    r = req("POST", "/git/blobs", body)
    print("  [%d/%d] 已上传 %s (%s)" % (idx, total, label, r["sha"][:7]))
    return r["sha"]


IDENT_RE = re.compile(r"^(author|committer) (.*) <(.*)> (\d+) ([+-])(\d{2})(\d{2})$")


def parse_ident(line):
    m = IDENT_RE.match(line)
    kind, name, email, epoch, sign, hh, mm = m.groups()
    delta = timedelta(hours=int(hh), minutes=int(mm))
    if sign == "-":
        delta = -delta
    tz = timezone(delta)
    dt = datetime.fromtimestamp(int(epoch), tz).isoformat()
    return kind, {"name": name, "email": email, "date": dt}


def commit_info(local_sha):
    raw = git("cat-file", "commit", local_sha, text=True)
    head, _, msg = raw.partition("\n\n")
    info = {"parents": [], "message": msg.rstrip("\n")}
    for line in head.splitlines():
        if line.startswith("parent "):
            info["parents"].append(line[7:])
        elif line.startswith(("author ", "committer ")):
            kind, ident = parse_ident(line)
            info[kind] = ident
    return info


def create_tree_for_commit(local_sha, cache):
    out = git("ls-tree", "-r", local_sha, text=True)
    lines = [l for l in out.splitlines() if l]
    entries = []
    for i, line in enumerate(lines, 1):
        meta, path = line.split("\t", 1)
        mode, typ, sha = meta.split()
        if sha not in cache:
            cache[sha] = upload_blob(sha, path, i, len(lines))
        entries.append({"path": path, "mode": mode, "type": typ, "sha": cache[sha]})
    r = req("POST", "/git/trees", {"tree": entries})
    return r["sha"]


def create_commit(info, tree_sha, parents):
    body = {
        "message": info["message"],
        "tree": tree_sha,
        "author": info["author"],
        "committer": info["committer"],
    }
    if parents:
        body["parents"] = parents
    return req("POST", "/git/commits", body)["sha"]


def push_main_commits(local_shas):
    cache = {}
    remote_shas = []
    head_ref = req("GET", "/git/refs/heads/main", ok404=True)
    if not head_ref:
        # 空仓库：Git Database API 拒绝接收对象，先用 Contents API 补一个初始提交
        print("仓库为空，先创建 README 初始提交...")
        readme = (
            "# personal-portfolio\n\n"
            "Momo's personal portfolio site. Built with React + TypeScript + Vite + Tailwind CSS.\n\n"
            "Live: https://momo1132.github.io/personal-portfolio/\n"
        )
        body = {
            "message": "Initial commit",
            "content": base64.b64encode(readme.encode()).decode(),
        }
        req("PUT", "/contents/README.md", body)
        head_ref = req("GET", "/git/refs/heads/main", ok404=True)
    parents = [head_ref["object"]["sha"]]
    for local_sha in local_shas:
        info = commit_info(local_sha)
        print("处理提交 %s —— %s" % (local_sha[:7], info["message"].splitlines()[0]))
        tree_sha = create_tree_for_commit(local_sha, cache)
        new_sha = create_commit(info, tree_sha, parents)
        remote_shas.append(new_sha)
        parents = [new_sha]
        print("  远端提交 %s" % new_sha[:7])
    req("PATCH", "/git/refs/heads/main", {"sha": remote_shas[-1]})
    print("main 分支已指向 %s" % remote_shas[-1][:7])
    return remote_shas[-1]


def push_gh_pages(dist_dir):
    entries = []
    files = []
    for root, _dirs, fs in os.walk(dist_dir):
        for f in fs:
            files.append(os.path.join(root, f))
    files.sort()
    for i, p in enumerate(files, 1):
        rel = os.path.relpath(p, dist_dir).replace(os.sep, "/")
        data = open(p, "rb").read()
        body = {"content": base64.b64encode(data).decode(), "encoding": "base64"}
        r = req("POST", "/git/blobs", body)
        entries.append({"path": rel, "mode": "100644", "type": "blob", "sha": r["sha"]})
        print("  [%d/%d] dist/%s" % (i, len(files), rel))
    tree = req("POST", "/git/trees", {"tree": entries})["sha"]
    commit = req("POST", "/git/commits", {
        "message": "GitHub Pages 构建产物（npm run build 输出，部署分支）",
        "tree": tree,
    })["sha"]
    req("POST", "/git/refs", {"ref": "refs/heads/gh-pages", "sha": commit})
    print("gh-pages 分支已创建，提交 %s" % commit[:7])


def enable_pages():
    r = req("POST", "/pages", {"source": {"branch": "gh-pages", "path": "/"}})
    if r:
        print("GitHub Pages 已开启：", r.get("html_url"))


if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    local_shas = sys.argv[1:]
    if local_shas:
        head = push_main_commits(local_shas)
    else:
        head = req("GET", "/git/refs/heads/main")["object"]["sha"]
    print("===== 上传构建产物到 gh-pages =====")
    push_gh_pages("dist")
    enable_pages()
    print("完成。远端 main HEAD =", head[:7])
