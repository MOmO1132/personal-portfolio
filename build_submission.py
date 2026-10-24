# -*- coding: utf-8 -*-
"""生成《应用生成》节点提交图：AI 交互记录摘录 + 本地运行截图，拼为一张长图。"""
import io
from PIL import Image, ImageDraw, ImageFont

W = 1400
M = 70
ACCENT = (215, 249, 78)
DARK = (12, 12, 11)
CARD = (244, 244, 238)
LINE = (210, 210, 200)
INK = (30, 30, 26)
MUTED = (110, 108, 96)

F_TITLE = ImageFont.truetype(r"C:\Windows\Fonts\msyhbd.ttc", 44)
F_H1 = ImageFont.truetype(r"C:\Windows\Fonts\msyhbd.ttc", 30)
F_H2 = ImageFont.truetype(r"C:\Windows\Fonts\msyhbd.ttc", 24)
F_BODY = ImageFont.truetype(r"C:\Windows\Fonts\msyh.ttc", 23)
F_SMALL = ImageFont.truetype(r"C:\Windows\Fonts\msyh.ttc", 20)
F_MONO = ImageFont.truetype(r"C:\Windows\Fonts\consola.ttf", 21)
F_MONO_B = ImageFont.truetype(r"C:\Windows\Fonts\consolab.ttf", 21)

# ---------------- 对话实录（来自本次 Qoder 会话的真实内容摘录） ----------------
CHAT = [
    ("user", "我要设计一个个人网站，你先进行设计，后面有需求的个人资料内容我再给你，"
             "按照图片所给的要求设计，可以上网参考别人的设计案例，最好包容性强一点，够后续调整迭代。"),
    ("ai", "完成需求研究：检索并对比了多个开发者作品集案例，按作业要求确定四区块结构"
           "（首页/关于我/项目展示/联系方式），编写 PRD.md 与技术设计文档，搭建首版深色主题网站。"),
    ("user", "按照这个文件再完善一下个人工具网站的开发（附《01 个人工具开发.pdf》讲义）。"
             "我是数字经济专业的学生，不要胡编乱造一些东西，信息密度过小，内容无法修改，等一系列诸多毛病。"),
    ("ai", "按讲义把网站重构为 React 18 + TypeScript + Vite 5 + Tailwind CSS 4 工程：下载免安装 Node、"
           "初始化工程、全部内容集中到 src/data/content.ts（改数据即改页面）、按模板补齐 PRD.md / "
           "TECH_DESIGN.md / AGENTS.md，项目状态如实标注（已完成/进行中/计划中），信息密度加倍。"),
    ("user", "武汉理工大学  qq 1548274873  github  手机19373513874  GitHub1548274873@qq.com"),
    ("ai", "真实信息已填入：学校=武汉理工大学，邮箱=1548274873@qq.com（带复制按钮），电话可点击拨打，"
           "B 站卡片链接到空间「愿百年」；npm run build 重新构建通过，本地 preview 预览确认无误。"),
]

BUILD_LOG = [
    "$ npm run build",
    "> tsc --noEmit && vite build",
    "",
    "vite v5.4.21 building for production...",
    "transforming...",
    "✓ 42 modules transformed.",
    "rendering chunks...",
    "dist/index.html                   1.42 kB │ gzip:  0.91 kB",
    "dist/assets/index-CR5b1AF2.css   25.34 kB │ gzip:  5.92 kB",
    "dist/assets/index-CR5b1AF2.js   168.09 kB │ gzip: 54.54 kB",
    "✓ built in 760ms",
]

SHOTS = [
    (r"previews\1-home.png", "首页（一屏横版：标题 + 简介 + 头像 + 统计）"),
    (r"previews\3-projects.png", "项目展示（状态筛选 + 特色横卡 + 项目网格）"),
    (r"previews\6-mobile.png", "移动端 420px 自适应验证"),
]


def wrap(draw, text, font, max_w):
    """按像素宽度换行（中英文混排）。"""
    lines, cur = [], ""
    for ch in text:
        if ch == "\n":
            lines.append(cur)
            cur = ""
            continue
        if draw.textlength(cur + ch, font=font) > max_w:
            lines.append(cur)
            cur = ch
        else:
            cur += ch
    lines.append(cur)
    return lines


def bubble_height(draw, text, font, max_w, pad):
    lines = wrap(draw, text, font, max_w)
    return len(lines) * int(font.size * 1.55) + pad * 2, lines


def main():
    img = Image.new("RGB", (W, 12000), "white")
    d = ImageDraw.Draw(img)
    y = 0

    def line_h(font):
        return int(font.size * 1.55)

    # ---------- 头部 ----------
    d.rectangle([0, 0, W, 210], fill=DARK)
    d.rectangle([0, 210, W, 218], fill=ACCENT)
    d.text((M, 52), "Vibe Coding 个人作品集网站 —— 「应用生成」提交材料", font=F_TITLE, fill=(240, 238, 230))
    d.text((M, 130), "武汉理工大学 · 数字经济专业 · Momo    日期：2026-10-24", font=F_BODY, fill=(170, 168, 150))
    d.text((M, 168), "内容：① AI 交互记录（对话实录摘录）  ② 代码构建成功日志  ③ 本地运行页面截图", font=F_SMALL, fill=(120, 120, 105))
    y = 218 + 46

    # ---------- 第一部分：交互记录 ----------
    d.text((M, y), "一、AI 交互记录（Qoder 对话实录摘录）", font=F_H1, fill=INK)
    y += line_h(F_H1) + 26

    bubble_w = W - M * 2
    for role, text in CHAT:
        is_user = role == "user"
        max_w = bubble_w - 56
        h, lines = bubble_height(d, text, F_BODY, max_w, 26)
        if is_user:
            x0 = M + 40
            d.rounded_rectangle([x0, y, x0 + bubble_w - 40, y + h], 14, fill=CARD, outline=LINE, width=1)
            ty = y + 26
            for ln in lines:
                d.text((x0 + 28, ty), ln, font=F_BODY, fill=INK)
                ty += line_h(F_BODY)
            tag = "我（需求方）"
        else:
            x0 = M
            d.rounded_rectangle([x0, y, x0 + bubble_w - 40, y + h], 14, fill=(250, 252, 240), outline=(190, 200, 140), width=1)
            ty = y + 26
            for ln in lines:
                d.text((x0 + 28, ty), ln, font=F_BODY, fill=(45, 55, 20))
                ty += line_h(F_BODY)
            tag = "Qoder AI"
        tw = d.textlength(tag, font=F_SMALL)
        d.text((x0 + bubble_w - 40 - 28 - tw, y - 14), tag, font=F_SMALL, fill=MUTED)
        y += h + 34

    # ---------- 构建日志 ----------
    y += 16
    d.text((M, y), "构建成功日志（npm run build：TypeScript 检查 + Vite 打包）", font=F_H2, fill=INK)
    y += line_h(F_H2) + 14
    log_h = len(BUILD_LOG) * 32 + 36
    d.rounded_rectangle([M, y, W - M, y + log_h], 10, fill=(24, 24, 22))
    ty = y + 20
    for ln in BUILD_LOG:
        d.text((M + 26, ty), ln, font=F_MONO_B if ln.startswith("✓") else F_MONO,
               fill=ACCENT if ln.startswith("✓") else (200, 198, 185))
        ty += 32
    y += log_h + 30

    # ---------- 第二部分：本地运行截图 ----------
    d.text((M, y), "二、本地运行成功截图（npm run preview → http://localhost:4173）", font=F_H1, fill=INK)
    y += line_h(F_H1) + 10
    d.text((M, y), "运行方式：vite preview 本地服务；另已完成深色/浅色主题切换验证。", font=F_SMALL, fill=MUTED)
    y += line_h(F_SMALL) + 22

    shot_w = W - M * 2
    for path, caption in SHOTS:
        shot = Image.open(path)
        ratio = shot_w / shot.width
        shot = shot.resize((shot_w, int(shot.height * ratio)))
        d.rounded_rectangle([M - 2, y - 2, M + shot.width + 2, y + shot.height + 2], 8,
                            outline=LINE, width=2)
        img.paste(shot, (M, y))
        y += shot.height + 14
        cw = d.textlength(caption, font=F_SMALL)
        d.text(((W - cw) / 2, y), caption, font=F_SMALL, fill=MUTED)
        y += line_h(F_SMALL) + 30

    # ---------- 页脚 ----------
    d.rectangle([0, y + 10, W, y + 74], fill=DARK)
    d.text((M, y + 30), "技术栈：React 18 · TypeScript · Vite 5 · Tailwind CSS 4    项目文档：PRD.md / TECH_DESIGN.md / AGENTS.md",
           font=F_SMALL, fill=(160, 158, 145))

    final = img.crop((0, 0, W, y + 74))
    out = r"submission.png"
    final.save(out, "PNG")
    print("saved:", out, final.size)


if __name__ == "__main__":
    main()
