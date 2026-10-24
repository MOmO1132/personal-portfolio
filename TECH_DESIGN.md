# 技术设计

## 技术栈

- **React 18 + TypeScript + Vite 5**：前端框架与构建工具（函数式组件 + Hooks）
- **Tailwind CSS 4**：样式方案，通过 `@tailwindcss/vite` 插件接入，配置零依赖
- **不使用 React Router**：单页应用，用锚点（#home / #about / #projects / #contact）导航
- **不使用 Framer Motion**：动画用 IntersectionObserver + CSS 过渡实现，减少依赖体积

## 项目结构

```
src/
  components/
    Nav.tsx         固定导航：锚点链接、滚动高亮、主题切换、移动端菜单
    Hero.tsx        首页一屏横版：标题遮罩动画、头像、统计数字滚动
    Marquee.tsx     关键词跑马灯
    About.tsx       关于我：陈述、介绍、教育背景、技能条、工具墙
    Projects.tsx    项目：状态筛选、特色横卡 + 双列网格
    Contact.tsx     联系方式：邮箱一键复制、社交链接卡片
    Footer.tsx      页脚三栏 + 回到顶部
    Reveal.tsx      滚动显现容器（IntersectionObserver 加 .visible）
    SectionHead.tsx 章节标题（编号 + 中文标题 + 说明）
    Icon.tsx        全局 SVG 图标
  data/
    content.ts      ★ 全部网站内容（文案 / 图片 / 链接 / 技能 / 项目）
  App.tsx           组合所有区块，管理主题状态
  main.tsx          入口
  index.css         Tailwind 入口 + 设计令牌（CSS 变量）+ 动画关键帧
```

## 数据管理

- 项目数据、技能数据、文案全部存储在 `src/data/content.ts`，用对象和数组组织
- 组件只负责渲染，不硬编码任何文案；新增项目 = 往 `projects.items` 数组加一项
- 每个字段都有中文注释，标【待改】/【待填】的是发布前必须替换的占位内容

## 主题方案

- 颜色定义成 CSS 变量：`src/index.css` 的 `:root`（深色）与 `[data-theme="light"]`（浅色）
- 通过 `<html data-theme="...">` 切换，选择器存 `localStorage("site-theme")`
- `index.html` 内联脚本在渲染前恢复主题，防止刷新闪烁

## 动画方案

- `Reveal` 组件监听元素进入视口，加 `.visible` 类触发 CSS 过渡：
  - 淡入上移（通用区块）
  - 遮罩上滑（首页大标题）
  - 技能条宽度动画（关于我）
  - 数字滚动（首页统计，rAF + easeOutCubic）
- `prefers-reduced-motion` 下全部动画降级为直接显示

## 响应式

- Tailwind 断点：`sm` 640 / `md` 768 / `lg` 1024
- 移动端：单列堆叠、全屏汉堡菜单、头像下移
- 桌面端：横版 Hero（左文案右头像）、关于我双栏（5:7）、项目双列网格

## 构建与部署

- `npm run dev`：本地开发（热更新）
- `npm run build`：TypeScript 检查 + 产物输出到 `dist/`（`base: './'` 相对路径，可放任意子路径）
- `npm run preview`：本地预览构建产物
- 部署（Vercel）：推送 GitHub → Vercel 导入仓库 → 框架预设选 Vite → 自动构建，产物无需额外配置
