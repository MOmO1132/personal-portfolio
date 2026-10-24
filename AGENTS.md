# 个人作品集网站开发指令

## 项目概述

使用 React + TypeScript + Tailwind CSS 开发的个人作品集网站，Vite 构建。所有网站内容集中在 `src/data/content.ts`。

## 开发规范

- 使用函数式组件 + Hooks，不写类组件
- 样式一律用 Tailwind 工具类书写；颜色、字体、最大宽度等设计令牌只在 `src/index.css` 的 `:root` 变量和 `@theme` 中维护
- 滚动显现动画统一用现成的 `Reveal` 组件，不要重复实现 IntersectionObserver
- 代码写中文注释；`content.ts` 里每个字段都要注释用途
- **禁止把文案硬编码进组件**——新内容一律加进 `src/data/content.ts`

## 设计要求

- 深色主题（背景 `#0c0c0b`，文字 `#f0eee6`），单强调色 `#d7f94e`，不要引入第二个强调色
- 标题使用遮罩上滑动画，区块滚动淡入，动画要流畅不拖沓
- 任何布局改动都要检查移动端（≤640px）是否正常

## 注意事项

- 保持设计简洁，不要过度设计
- 性能优化：图片必须 `loading="lazy"`，不引入大型动画库
- 确保所有链接可点击；暂时没有真实地址的链接填 `#` 并在 content.ts 注释标 `【待填】`
- 内容必须真实：不虚构项目完成状态、不编造经历和账号
- 提交前运行 `npm run build` 确认 TypeScript 检查与构建都通过
