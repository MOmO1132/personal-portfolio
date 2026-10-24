/* ============================================================
 * 个人网站内容配置文件（唯一需要修改的文件）
 * ------------------------------------------------------------
 * 本站采用"内容驱动"架构：页面上所有文字 / 图片 / 链接
 * 都出自本文件。后续替换个人资料时，只需修改这里，
 * 不需要改动 index.html、style.css、main.js 中的任何逻辑。
 *
 * 每个字段都附有中文注释，占位内容均带有"示例 / TODO" 提示。
 * ============================================================ */

const SITE = {

  /* ---------- 站点基础信息（浏览器标签页 / SEO / 分享卡片） ---------- */
  meta: {
    title: "Momo | 个人作品集",                          // TODO: 浏览器标签页标题
    description: "统计学学生的个人作品集：数据分析、统计建模与 Web 开发实践。",  // TODO: 一句话站点描述
    logo: "Momo",                                        // TODO: 导航栏左上角的名字 / 昵称
  },

  /* ---------- 顶部导航栏目（新增栏目后在这里加一项即可） ---------- */
  nav: [
    { id: "home",     label: "首页" },
    { id: "about",    label: "关于我" },
    { id: "projects", label: "项目" },
    { id: "contact",  label: "联系我" },
  ],

  /* ---------- 首页（首屏 Hero，一屏横版布局） ----------
   * 结构对照参考设计：顶部一行小字，左侧大标题（两行）+ 简介 + 按钮，
   * 右侧照片，底部数据统计行。
   */
  hero: {
    kicker: "你好，我是 Momo — 统计学学生",               // TODO: 标题上方的一行小字自我介绍
    title: ["Crafting Data", "Experiences"],             // TODO: 首屏大标题，两行（可改成中文，如 ["构建数据", "可视化体验"]）

    description:
      "专注于用数据讲好故事——从采集、清洗到建模与可视化，也把统计思维带进 Web 开发的每一个细节。",  // TODO: 首屏个人简介（一句话）

    availability: "OPEN TO WORK · 欢迎实习机会",          // TODO: 首屏右上角状态徽标
    location: "BASED IN CHINA",                          // TODO: 首屏右上角所在地

    avatar: "assets/img/avatar.png",                     // TODO: 替换为真实头像
    resumeUrl: "#",                                      // TODO: 简历 PDF 链接，暂时没有可保持 "#"

    // 首屏社交图标（icon 可选：github / mail / zhihu / bilibili，可再扩展）
    socials: [
      { label: "GitHub", url: "https://github.com/yourname", icon: "github" },   // TODO
      { label: "邮箱",   url: "mailto:you@example.com",       icon: "mail" },    // TODO
    ],

    // 首屏底部数据概览（数字滚动动画）
    stats: [
      { value: 12, suffix: "+", label: "项目实践" },
      { value: 3,  suffix: "", label: "年学习经历" },
      { value: 8,  suffix: "+", label: "掌握技能" },
    ],
  },

  /* ---------- 关于我 ----------
   * paragraphs 的第一段会以"大字号引言"样式展示在左栏，
   * 其余段落展示在右栏。
   */
  about: {
    heading: "关于我",
    headingEm: "About",                                  // 栏目标题旁的斜体英文装饰词
    label: "ABOUT ME",                                   // 栏目右上角小标签
    paragraphs: [                                        // TODO: 详细介绍，可多段
      "我是一名统计学专业的学生，对数据分析与可视化有浓厚兴趣。课堂上系统学习了概率论、回归分析与抽样调查，课下喜欢用真实数据集动手实践，把课本方法跑通、跑透。",
      "除了统计，我也在自学 Web 开发，希望把分析结果变成别人看得懂、用得上的页面和工具。这个网站就是我的练习场：从零设计、从零实现，也会持续迭代。",
    ],

    // 技能列表（0~100，进入视口时播放进度条动画）
    skills: [
      { name: "Python 数据分析", level: 85 },
      { name: "R / 统计建模",   level: 78 },
      { name: "SQL",            level: 80 },
      { name: "HTML / CSS / JavaScript", level: 70 },
      { name: "机器学习基础",    level: 60 },
    ],

    // 工具标签（同时用于首页的跑马灯）
    tools: [
      "Python", "Pandas", "R", "ggplot2", "SPSS",
      "SQL", "Excel", "ECharts", "Git", "LaTeX",
    ],
  },

  /* ---------- 项目展示 ----------
   * 新增项目 = 复制一个对象改字段，卡片与筛选自动适配。
   * category 用于分类筛选；featured: true 的项目会以横向大卡展示在最前。
   */
  projects: {
    heading: "精选项目",
    headingEm: "Works",
    label: "SELECTED WORKS",
    items: [
      {
        title: "城市空气质量数据分析",
        category: "数据分析",
        year: "2026",                                    // TODO: 项目年份
        description:
          "基于公开环境数据，用 Python 完成数据清洗、探索性分析与可视化，挖掘污染物的时空分布规律，最终输出一份可交互的分析看板。",
        image: "assets/img/project-1.png",               // TODO: 替换为项目真实截图
        tech: ["Python", "Pandas", "ECharts", "Jupyter"],
        demoUrl: "#",                                    // TODO: 演示链接
        githubUrl: "#",                                  // TODO: 源码链接
        featured: true,
      },
      {
        title: "课程成绩可视化看板",
        category: "Web 开发",
        year: "2026",
        description:
          "一个纯前端的成绩管理与可视化小工具，支持成绩录入、GPA 自动计算与多维度图表展示，数据保存在浏览器本地。",
        image: "assets/img/project-2.png",
        tech: ["JavaScript", "ECharts", "LocalStorage"],
        demoUrl: "#",
        githubUrl: "#",
        featured: false,
      },
      {
        title: "基于 R 的线性回归建模实践",
        category: "统计建模",
        year: "2025",
        description:
          "围绕一份真实问卷数据，完成从假设检验、变量筛选、模型诊断到结果解释的全流程，并对比多个模型的解释力。",
        image: "assets/img/project-3.png",
        tech: ["R", "ggplot2", "回归分析"],
        demoUrl: "#",
        githubUrl: "#",
        featured: false,
      },
      {
        title: "个人记账小应用",
        category: "Web 开发",
        year: "2025",
        description:
          "移动端优先的记账应用，支持分类统计、月度报表与数据导出，练手组件化思路与本地数据管理。",
        image: "assets/img/project-4.png",
        tech: ["HTML", "CSS", "JavaScript"],
        demoUrl: "#",
        githubUrl: "#",
        featured: false,
      },
    ],
  },

  /* ---------- 联系方式 ---------- */
  contact: {
    heading: "保持联系",
    headingEm: "Contact",
    label: "GET IN TOUCH",
    description:
      "如果你对某个项目感兴趣，或者想聊聊数据分析、统计学习的话题，欢迎给我发邮件，我会尽快回复。",   // TODO
    email: "you@example.com",                            // TODO: 真实邮箱（大标题邮箱链接 + 一键复制）
    socials: [
      { label: "GitHub", url: "https://github.com/yourname", icon: "github" },   // TODO
      { label: "知乎",   url: "https://www.zhihu.com/",       icon: "zhihu" },   // TODO
      { label: "B站",    url: "https://space.bilibili.com/",  icon: "bilibili" }, // TODO
    ],
  },

  /* ---------- 页脚 ---------- */
  footer: {
    text: "用数据与代码构建",                             // TODO: 页脚签名语
  },
};
