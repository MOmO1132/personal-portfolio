# 个人作品集网站

数字经济专业在读学生的个人作品集 —— 《Vibe Coding 个人工具开发》课程实战项目一。

技术栈：React 18 · TypeScript · Vite 5 · Tailwind CSS 4

## 快速开始

需要 Node.js 18+。在项目目录下运行：

```bash
npm install        # 安装依赖（已配置国内镜像源）
npm run dev        # 本地开发，默认 http://localhost:5173
npm run build      # 类型检查 + 构建，产物在 dist/
npm run preview    # 本地预览构建产物
```

## 如何修改网站内容

**所有文案、图片、链接都只在 [`src/data/content.ts`](src/data/content.ts) 一个文件里改**，不用动组件代码。文件里每个字段都有中文注释：

- 标了 `【待改】` 的：占位内容，发布前换成真实信息（姓名、学校、邮箱、自我介绍等）
- 标了 `【待填】` 的：链接占位（GitHub 主页、项目仓库、演示地址）
- 新增项目：在 `projects.items` 数组里复制一段，改标题、描述、技术栈即可
- 换头像/截图：把图片放进 `public/img/`，改 `content.ts` 里的图片路径

改完后运行 `npm run build` 重新生成 `dist/`。也可以直接把需求发给 AI 助手让它帮你改。

## 部署（已上线）

本站已通过 **GitHub Pages** 发布到公网：

- 仓库：<https://github.com/MOmO1132/personal-portfolio>
- 线上地址：<https://momo1132.github.io/personal-portfolio/>

发布流程：把代码推送到 GitHub 仓库后，运行 `npm run build` 生成 `dist/`，
将构建产物推送到仓库的 `gh-pages` 分支，在仓库 Settings → Pages 中选择
「Deploy from a branch → gh-pages → /（root）」即可。之后每次更新内容：
改 `content.ts` → `npm run build` → 把新产物覆盖到 `gh-pages` 分支。

> 课程文档也推荐 Vercel 方案：登录 [Vercel](https://vercel.com) 用 GitHub 账号
> Import 本仓库，Framework Preset 选 **Vite**，Deploy 后即可获得
> `xxx.vercel.app` 链接。二者任选其一即可公网访问。

## 目录结构

```
├── index.html            页面骨架（字体、防闪烁主题脚本）
├── PRD.md                需求文档（课程要求交付物）
├── TECH_DESIGN.md        技术设计文档（课程要求交付物）
├── AGENTS.md             AI 开发规范（课程要求交付物）
├── public/img/           头像与项目配图（均可替换）
└── src/
    ├── data/content.ts   ★ 网站全部内容
    ├── components/       Nav / Hero / Marquee / About / Projects / Contact / Footer 等
    ├── App.tsx           页面组合与主题状态
    ├── main.tsx          入口
    └── index.css         设计令牌（配色/字体的唯一入口）与动画
```

## 实现要点

- 深色/浅色主题：CSS 变量 + `data-theme` 切换，localStorage 记忆
- 滚动动画：IntersectionObserver 触发 CSS 过渡，尊重系统的减弱动画设置
- 响应式：移动端单列 + 汉堡菜单；桌面端横版一屏首页
- 性能：图片懒加载、无重型动画库、构建产物 gzip 后约 60KB
