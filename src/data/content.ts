/**
 * ============================================================================
 *  网站内容配置（唯一需要改的文件）
 * ----------------------------------------------------------------------------
 *  · 改文字：直接修改引号里的内容即可，不用懂代码
 *  · 加项目：在 projects.items 里照着复制一段，改掉内容
 *  · 标了 【待改】 的是占位内容，发布前请换成你的真实信息
 *  · 图片放在 public/img/ 目录，这里填 "img/文件名.png"
 *  · 改完后运行 `npm run build` 重新生成网站（或让 AI 助手帮你改）
 * ============================================================================
 */

/* ---------------- 基础信息 ---------------- */

export const site = {
  /** 导航栏 Logo 文字、页脚署名 */
  name: "Momo", // 【待改】换成你的名字或昵称
  /** 浏览器标签页标题（index.html 里还有一份，两处保持一致） */
  title: "Momo · 个人作品集",
};

export const nav = {
  links: [
    { label: "首页", href: "#home" },
    { label: "关于我", href: "#about" },
    { label: "项目", href: "#projects" },
    { label: "联系方式", href: "#contact" },
  ],
};

/* ---------------- 首页 ---------------- */

export const hero = {
  /** 标题上方的小字 */
  kicker: "数字经济专业 · 本科在读",
  /** 大标题（两行）；第二行会用斜体衬线字体显示 */
  titleLine1: "数字经济专业学生",
  titleLine2: "的个人作品集",
  /** 自我介绍，2~3 句话，说真实情况即可 */
  description:
    "我是 Momo，一名数字经济专业的本科生，正在学习用数据分析和前端工具解决真实问题。这个网站是我在「Vibe Coding 个人工具开发」课程中完成的第一件实战作品，用来记录学习过程和课程项目。", // 【待改】换成你的真实介绍
  /** 标题下方的标签，如实填写 */
  tags: ["数据分析", "前端开发", "课程实战"], // 【待改】按你的实际方向调整
  /** 右侧头像 */
  avatar: "img/avatar.png", // 【待改】换成你的照片（建议 1:1 方图，放 public/img/）
  avatarCaption: "FIG.01 — MOMO",
  /** 主按钮 */
  primaryButton: { label: "查看项目", href: "#projects" },
  /** 次按钮（链接填你的 GitHub 主页，没有就先保留 #） */
  secondaryButton: { label: "GitHub", href: "https://github.com/MOmO1132" },
  /** 底部数据统计 —— 只写真实数字 */
  stats: [
    { value: 5, suffix: "", label: "课程实战项目" },
    { value: 6, suffix: "", label: "正在学习的工具" },
    { value: 1, suffix: "", label: "已上线的作品集" },
  ], // 【待改】换成你的真实数据
};

/* ---------------- 跑马灯（首页标题下方滚动条） ---------------- */

export const marquee = {
  items: [
    "DIGITAL ECONOMY",
    "数据分析",
    "REACT",
    "TYPESCRIPT",
    "统计学",
    "TAILWIND CSS",
    "PYTHON",
    "VIBE CODING",
  ], // 【待改】换成你的关键词
};

/* ---------------- 关于我 ---------------- */

export const about = {
  headingEm: "我",
  heading: "关于",
  label: "ABOUT",
  /** 一句话个人陈述（衬线斜体大字） */
  statement:
    "对数字经济感兴趣，正在从「会调用工具」走向「会分析真实问题」。", // 【待改】
  /** 详细介绍，每段 2~4 句话，写真实情况 */
  paragraphs: [
    "高中阶段我对经济和数学比较感兴趣，填报志愿时选择了数字经济专业，希望把经济学直觉和数据工具结合起来。进入大学后，我系统学习了经济学和统计学基础课程，也开始接触 Python 和数据分析。", // 【待改】
    "这个学期我选修了 Vibe Coding 课程，学习用自然语言驱动 AI 完成开发：先做需求研究、写 PRD 和技术设计文档，再让 AI 生成代码、自己验证效果。本站就是我的第一个完整练习——从文档到上线的完整流程都走了一遍。", // 【待改】
  ],
  /** 教育背景 */
  education: {
    school: "武汉理工大学",
    major: "数字经济",
    degree: "本科在读",
    period: "2023 — 2027", // 【待改】按实际入学年份
    /** 学过的专业课，按实际课表增删 */
    courses: [
      "微观经济学",
      "宏观经济学",
      "统计学",
      "计量经济学",
      "Python 程序设计",
      "数据库基础",
    ], // 【待改】按实际修读课程填写
  },
  /** 专业技能：分组展示，level 是 0-100 的熟练度，自己诚实估计 */
  skillGroups: [
    {
      name: "数据分析",
      items: [
        { name: "Excel 数据处理", level: 75 },
        { name: "统计学基础", level: 70 },
        { name: "Python（pandas）", level: 55 },
      ],
    },
    {
      name: "开发工具",
      items: [
        { name: "HTML / CSS / JS", level: 65 },
        { name: "React 前端", level: 45 },
        { name: "Git 版本管理", level: 45 },
      ],
    },
  ], // 【待改】按你的真实水平调整名称和熟练度
  /** 工具墙（小标签） */
  tools: [
    "Excel",
    "Python",
    "VS Code",
    "Git",
    "Vite",
    "Tailwind CSS",
  ], // 【待改】
};

/* ---------------- 项目展示 ---------------- */

export const projects = {
  headingEm: "项目",
  heading: "",
  label: "PROJECTS",
  /** 标题旁的说明 */
  note: "以下是课程规划的 5 个实战项目。每完成一个，就把它的状态改为「已完成」并补上仓库和演示链接。",
  /** 筛选按钮 */
  filters: [
    { key: "all", label: "全部" },
    { key: "done", label: "已完成" },
    { key: "building", label: "进行中" },
    { key: "planned", label: "计划中" },
  ],
  /**
   * 项目列表：
   *  status — done 已完成 / building 进行中 / planned 计划中（如实填写）
   *  image  — public/img/ 下的图片
   *  tech   — 技术栈标签
   *  demoUrl / githubUrl — 部署后把 # 换成真实链接
   */
  items: [
    {
      id: "portfolio",
      title: "个人作品集网站（本站）",
      status: "done",
      year: "2026",
      description:
        "课程第一个实战项目：按「需求研究 → PRD → 技术设计 → AGENTS 规范 → 开发 → 部署」的完整流程，用 React + TypeScript + Vite + Tailwind CSS 搭建的个人网站，实现了深色主题、滚动动画、移动端适配，并通过 GitHub Pages 发布到公网。",
      image: "img/project-5.png",
      tech: ["React", "TypeScript", "Vite", "Tailwind CSS"],
      demoUrl: "https://momO1132.github.io/personal-portfolio/",
      githubUrl: "https://github.com/MOmO1132/personal-portfolio",
    },
    {
      id: "todo",
      title: "待办事项应用（进阶版）",
      status: "building",
      year: "2026",
      description:
        "在基础待办之上增加描述、截止日期、优先级、分类字段，支持按分类/优先级/状态多条件筛选与关键词搜索，用 Zustand 管理全局状态，LocalStorage 持久化，并带完成率统计。",
      image: "img/project-1.png",
      tech: ["React", "Zustand", "LocalStorage", "date-fns"],
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      id: "markdown-notes",
      title: "Markdown 笔记应用",
      status: "planned",
      year: "2026",
      description:
        "左右分栏的 Markdown 编辑器：左侧编辑、右侧实时预览，代码块带语法高亮；支持笔记的增删、按标题搜索，数据保存在 LocalStorage。",
      image: "img/project-2.png",
      tech: ["React", "react-markdown", "LocalStorage"],
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      id: "pomodoro",
      title: "番茄钟计时器",
      status: "planned",
      year: "2026",
      description:
        "按番茄工作法实现 25 分钟工作 + 5 分钟休息的倒计时，支持开始/暂停/重置与自定义时长，结束时发送浏览器通知并播放提示音，统计每日/每周完成数量。",
      image: "img/project-3.png",
      tech: ["React", "Notification API", "LocalStorage"],
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      id: "weather",
      title: "天气查询应用",
      status: "planned",
      year: "2026",
      description:
        "调用 OpenWeatherMap 免费 API 查询城市天气：显示温度、天气状况、湿度、风速和未来几日预报，支持浏览器定位与常用城市收藏（LocalStorage 保存）。",
      image: "img/project-4.png",
      tech: ["React", "OpenWeatherMap API", "Geolocation"],
      demoUrl: "#",
      githubUrl: "#",
    },
  ],
};

/* ---------------- 联系方式 ---------------- */

export const contact = {
  headingEm: "方式",
  heading: "联系",
  label: "CONTACT",
  intro:
    "想交流课程作业、数据分析或学习心得，欢迎通过下面的方式找到我。",
  /** 邮箱（右侧带一键复制按钮） */
  email: "1548274873@qq.com",
  /** 手机号（公开显示，不想展示就把引号内容删掉） */
  phone: "19373513874",
  socials: [
    {
      label: "GitHub",
      handle: "MOmO1132",
      url: "https://github.com/MOmO1132",
      icon: "github",
    },
    {
      label: "Bilibili",
      handle: "愿百年",
      url: "https://space.bilibili.com/533586382",
      icon: "link",
    },
    {
      label: "QQ",
      handle: "1548274873",
      url: "#", // QQ 没有网页版主页，保留 # 仅作展示
      icon: "link",
    },
  ],
};

/* ---------------- 页脚 ---------------- */

export const footer = {
  blurb:
    "数字经济专业在读学生的个人作品集，记录课程实战与学习过程。",
  techNote: "React 18 · TypeScript · Vite · Tailwind CSS",
  copyright: "© 2026 Momo · 保留所有权利", // 【待改】
};
