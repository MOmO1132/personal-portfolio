/* ============================================================
 * 渲染与交互逻辑
 * ------------------------------------------------------------
 * 一般情况下不需要修改本文件。
 * 所有内容都来自 content.js 的 SITE 对象。
 * 新增栏目时请在这里添加对应的 render 函数并在 init() 中调用。
 * ============================================================ */

"use strict";

/* ---------- 工具函数 ---------- */
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

/** 输出一个 SVG 图标引用 */
const icon = (name, cls = "") =>
  `<svg class="icon ${cls}" aria-hidden="true"><use href="#icon-${name}"/></svg>`;

/** 安全地把纯文本插进 HTML */
const esc = (str) =>
  String(str).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );

/** 两位数字补零（时钟用） */
const pad = (n) => String(n).padStart(2, "0");

/* ============================================================
 * 各栏目渲染函数（每个栏目一个纯函数，互相独立）
 * ============================================================ */

function renderNav() {
  $("#nav-links").innerHTML = SITE.nav
    .map(
      (n, i) =>
        `<a class="nav-link" href="#${n.id}" data-target="${n.id}">
           <span class="nav-num">${pad(i + 1)}</span>${esc(n.label)}
         </a>`
    )
    .join("");

  $("#mobile-menu").innerHTML =
    `<nav class="mobile-menu-links" aria-label="移动端导航">` +
    SITE.nav
      .map(
        (n, i) =>
          `<a class="mobile-menu-link" href="#${n.id}">
             <span class="nav-num">${pad(i + 1)} /</span> ${esc(n.label)}
           </a>`
      )
      .join("") +
    `</nav>`;
}

function renderHero() {
  const h = SITE.hero;
  const [t1, t2] = h.title;
  $("#home").innerHTML = `
    <div class="container hero-inner">
      <div class="hero-top reveal">
        <span class="hero-kicker">${esc(h.kicker)}</span>
        <span class="hero-top-right">
          <span class="hero-avail"><i class="dot" aria-hidden="true"></i>${esc(h.availability)}</span>
          <span class="hero-loc">${esc(h.location)}</span>
        </span>
      </div>
      <div class="hero-main">
        <div class="hero-left">
          <h1 class="hero-title">
            <span class="mask"><span class="mask-inner">${esc(t1)}</span></span>
            ${t2 ? `<span class="mask"><span class="mask-inner" style="--d:100ms">${esc(t2)}</span></span>` : ""}
          </h1>
          <p class="hero-desc reveal" style="--d:200ms">${esc(h.description)}</p>
          <div class="hero-cta reveal" style="--d:280ms">
            <a class="btn btn-primary" href="#projects">查看项目</a>
            <a class="btn btn-ghost" href="#contact">联系我</a>
            <a class="btn btn-text" href="${esc(h.resumeUrl)}" target="_blank" rel="noopener">
              ${icon("file")} 简历
            </a>
          </div>
          <div class="socials reveal" style="--d:340ms">
            ${h.socials
              .map(
                (s) => `<a class="social-link" href="${esc(s.url)}" target="_blank" rel="noopener"
                            aria-label="${esc(s.label)}" title="${esc(s.label)}">${icon(s.icon)}</a>`
              )
              .join("")}
          </div>
        </div>
        <figure class="hero-figure reveal" style="--d:240ms">
          <img src="${esc(h.avatar)}" alt="${esc(SITE.meta.logo)} 的头像" width="340" height="425" />
          <figcaption>FIG.01 — PORTRAIT · 占位头像，上线前替换</figcaption>
        </figure>
      </div>
      <div class="hero-stats reveal" style="--d:400ms">
        ${h.stats
          .map(
            (s) => `<div class="stat">
                <span class="stat-num"><span class="stat-value" data-target="${s.value}">0</span><span class="stat-suffix">${esc(s.suffix)}</span></span>
                <span class="stat-label">${esc(s.label)}</span>
              </div>`
          )
          .join("")}
      </div>
    </div>`;
}

function renderMarquee() {
  // 跑马灯内容 = 工具标签，首尾复制一份实现无缝滚动
  const words = SITE.about.tools;
  const half = words.map((w) => `<span class="mq-item">${esc(w)}</span>`).join("");
  $("#marquee").innerHTML = `<div class="marquee-track">${half}${half}</div>`;
}

/** 生成统一风格的栏目标题 */
const secHead = (index, cfg) => `
  <header class="sec-head reveal">
    <span class="sec-index">${index}</span>
    <h2 class="sec-title">${esc(cfg.heading)}<em>${esc(cfg.headingEm || "")}</em></h2>
    <span class="sec-tag">${esc(cfg.label || "")}</span>
  </header>`;

function renderAbout() {
  const a = SITE.about;
  const [statement, ...rest] = a.paragraphs;
  $("#about").innerHTML = `
    <div class="container">
      ${secHead("01", a)}
      <div class="about-grid">
        <div class="about-statement reveal">
          <p>${esc(statement || "")}</p>
        </div>
        <div class="about-detail reveal" style="--d:120ms">
          ${rest.map((p) => `<p>${esc(p)}</p>`).join("")}
          <div class="about-skills">
            ${a.skills
              .map(
                (s) => `<div class="skill">
                    <span class="skill-name">${esc(s.name)}</span>
                    <span class="skill-bar"><span class="skill-fill" data-level="${s.level}" style="width:0%"></span></span>
                    <span class="skill-pct">${s.level}%</span>
                  </div>`
              )
              .join("")}
          </div>
        </div>
      </div>
    </div>`;
}

function renderProjects() {
  const p = SITE.projects;
  const categories = ["全部", ...new Set(p.items.map((it) => it.category))];
  const featured = p.items.filter((it) => it.featured);
  const regular  = p.items.filter((it) => !it.featured);

  const linksHTML = (it) => `
    <div class="card-links">
      <a href="${esc(it.demoUrl)}" target="_blank" rel="noopener" aria-label="查看演示" title="查看演示">${icon("external")}</a>
      <a href="${esc(it.githubUrl)}" target="_blank" rel="noopener" aria-label="查看源码" title="查看源码">${icon("code")}</a>
    </div>`;

  const featuredHTML = featured
    .map(
      (it) => `
      <article class="pcard pcard-featured reveal" data-category="${esc(it.category)}">
        <a class="card-media" href="${esc(it.demoUrl)}" target="_blank" rel="noopener" aria-label="查看 ${esc(it.title)} 演示">
          <img src="${esc(it.image)}" alt="${esc(it.title)} 项目截图" loading="lazy" />
        </a>
        <div class="card-body">
          <div class="card-top">
            <span class="card-cat">${esc(it.category)}</span>
            <span class="card-year">${esc(it.year || "")}</span>
          </div>
          <h3 class="card-title">${esc(it.title)}</h3>
          <p class="card-desc">${esc(it.description)}</p>
          <div class="card-tech">${it.tech.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
          ${linksHTML(it)}
        </div>
      </article>`
    )
    .join("");

  const cardsHTML = regular
    .map(
      (it) => `
      <article class="pcard reveal" data-category="${esc(it.category)}">
        <a class="card-media" href="${esc(it.demoUrl)}" target="_blank" rel="noopener" aria-label="查看 ${esc(it.title)} 演示">
          <img src="${esc(it.image)}" alt="${esc(it.title)} 项目截图" loading="lazy" />
        </a>
        <div class="card-body">
          <div class="card-top">
            <span class="card-cat">${esc(it.category)}</span>
            <span class="card-year">${esc(it.year || "")}</span>
          </div>
          <h3 class="card-title">${esc(it.title)}</h3>
          <p class="card-desc">${esc(it.description)}</p>
          <div class="card-tech">${it.tech.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
          ${linksHTML(it)}
        </div>
      </article>`
    )
    .join("");

  $("#projects").innerHTML = `
    <div class="container">
      ${secHead("02", p)}
      <div class="filter-bar reveal" role="group" aria-label="按分类筛选项目">
        ${categories
          .map(
            (c, i) =>
              `<button class="filter-btn${i === 0 ? " active" : ""}" data-filter="${esc(c)}">${esc(c)}</button>`
          )
          .join("")}
      </div>
      ${featuredHTML ? `<div class="project-featured">${featuredHTML}</div>` : ""}
      <div class="project-grid">${cardsHTML}</div>
    </div>`;

  // 分类筛选交互
  $$(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      $$(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.dataset.filter;
      $$(".pcard").forEach((card) => {
        const show = f === "全部" || card.dataset.category === f;
        card.classList.toggle("hide", !show);
        if (show) {
          card.classList.remove("flash");
          void card.offsetWidth; // 重新触发动画
          card.classList.add("flash");
        }
      });
    });
  });
}

function renderContact() {
  const c = SITE.contact;
  $("#contact").innerHTML = `
    <div class="container">
      ${secHead("03", c)}
      <div class="contact-body reveal">
        <p class="contact-desc">${esc(c.description)}</p>
        <a class="email-link" href="mailto:${esc(c.email)}">${esc(c.email)} ${icon("external")}</a>
        <div class="contact-row">
          <button class="btn btn-ghost btn-mono" id="copy-email">
            ${icon("copy")}<span id="copy-email-text">COPY EMAIL</span>
          </button>
          <div class="socials">
            ${c.socials
              .map(
                (s) => `<a class="social-link" href="${esc(s.url)}" target="_blank" rel="noopener"
                            aria-label="${esc(s.label)}" title="${esc(s.label)}">${icon(s.icon)}</a>`
              )
              .join("")}
          </div>
        </div>
      </div>
    </div>`;

  // 一键复制邮箱
  $("#copy-email").addEventListener("click", async () => {
    const label = $("#copy-email-text");
    try {
      await navigator.clipboard.writeText(SITE.contact.email);
    } catch (e) {
      // 旧内核回退方案
      const tmp = document.createElement("textarea");
      tmp.value = SITE.contact.email;
      document.body.appendChild(tmp);
      tmp.select();
      document.execCommand("copy");
      tmp.remove();
    }
    label.textContent = "COPIED";
    setTimeout(() => (label.textContent = "COPY EMAIL"), 2000);
  });
}

function renderFooter() {
  $("#site-footer").innerHTML = `
    <div class="container footer-bar">
      <span>© <span id="footer-year"></span> ${esc(SITE.meta.logo)} — ${esc(SITE.footer.text)}</span>
      <span class="footer-clock">LOCAL TIME — <span id="footer-clock">--:--:--</span></span>
      <button class="footer-top" id="footer-top">
        BACK TO TOP ${icon("arrow-up")}
      </button>
    </div>`;
  $("#footer-year").textContent = new Date().getFullYear();
}

/* ============================================================
 * 交互初始化
 * ============================================================ */

/* 数字滚动：统计数字进入视口时从 0 计数到目标值 */
function initCounters() {
  const animate = (el) => {
    const target = Number(el.dataset.target) || 0;
    const dur = 1200, t0 = performance.now();
    const step = (t) => {
      const k = Math.min((t - t0) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3))); // easeOutCubic
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); }
    }),
    { threshold: 0.6 }
  );
  $$(".stat-value").forEach((el) => io.observe(el));
}

/* 滚动渐入 + 首屏标题遮罩上浮 + 技能条展开 */
function initReveal() {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("visible");
      $$(".skill-fill", e.target).forEach((f) => (f.style.width = f.dataset.level + "%"));
      io.unobserve(e.target);
    }),
    { threshold: 0.12, rootMargin: "0px 0px -32px 0px" }
  );
  $$(".reveal, .mask").forEach((el) => io.observe(el));
}

/* Scroll Spy：滚动时高亮当前栏目的导航链接 */
function initScrollSpy() {
  const links = $$(".nav-link");
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((l) => l.classList.toggle("active", l.dataset.target === e.target.id));
    }),
    { rootMargin: "-45% 0px -50% 0px" }
  );
  SITE.nav.forEach((n) => { const s = $("#" + n.id); if (s) io.observe(s); });
}

/* 主题切换（偏好保存在 localStorage） */
function initTheme() {
  const btn = $("#theme-toggle");
  const label = $(".theme-label", btn);
  const sync = () => {
    label.textContent = document.documentElement.getAttribute("data-theme") === "dark" ? "深色" : "浅色";
  };
  btn.addEventListener("click", () => {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("site-theme", next); } catch (e) { /* 忽略 */ }
    sync();
  });
  sync();
}

/* 导航栏滚动态样式 + 返回顶部按钮 */
function initScrollUI() {
  const nav = $("#site-nav");
  const toTop = $("#to-top");
  const onScroll = () => {
    nav.classList.toggle("scrolled", window.scrollY > 16);
    toTop.classList.toggle("show", window.scrollY > 480);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  const goTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  toTop.addEventListener("click", goTop);
  const footerTop = $("#footer-top");
  if (footerTop) footerTop.addEventListener("click", goTop);
}

/* 页脚本地时钟 */
function initClock() {
  const el = $("#footer-clock");
  if (!el) return;
  const tick = () => {
    const d = new Date();
    el.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  };
  tick();
  setInterval(tick, 1000);
}

/* 移动端汉堡菜单 */
function initMobileMenu() {
  const burger = $("#nav-burger");
  const menu = $("#mobile-menu");
  const setOpen = (open) => {
    document.body.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-hidden", String(!open));
  };
  burger.addEventListener("click", () => setOpen(!document.body.classList.contains("menu-open")));
  $$(".mobile-menu-link", menu).forEach((l) => l.addEventListener("click", () => setOpen(false)));
  window.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
}

/* ============================================================
 * 启动入口
 * ============================================================ */
function init() {
  // meta 信息回填
  document.title = SITE.meta.title;
  $('meta[name="description"]').setAttribute("content", SITE.meta.description);
  const ogTitle = $('meta[property="og:title"]');
  const ogDesc  = $('meta[property="og:description"]');
  if (ogTitle) ogTitle.setAttribute("content", SITE.meta.title);
  if (ogDesc)  ogDesc.setAttribute("content", SITE.meta.description);
  $(".nav-logo").innerHTML = `${esc(SITE.meta.logo)}<span>©</span>`;

  renderNav();
  renderHero();
  renderMarquee();
  renderAbout();
  renderProjects();
  renderContact();
  renderFooter();

  initTheme();
  initMobileMenu();
  initScrollUI();
  initScrollSpy();
  initCounters();
  initReveal();
  initClock();
}

init();
