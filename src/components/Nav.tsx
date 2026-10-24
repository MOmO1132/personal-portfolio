import { useEffect, useState } from "react";
import Icon from "./Icon";
import { nav, site } from "../data/content";

type Props = {
  theme: "dark" | "light";
  onToggleTheme: () => void;
};

export default function Nav({ theme, onToggleTheme }: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  // 滚动后导航栏加底色和描边
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll Spy：高亮当前所在区块
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    nav.links.forEach((l) => {
      const el = document.getElementById(l.href.slice(1));
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // 移动端菜单打开时锁定背景滚动
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          scrolled || open
            ? "border-(--line) bg-(--bg)/85 backdrop-blur-md"
            : "border-transparent"
        }`}
        style={{ height: "var(--nav-h)" }}
      >
        <div className="container-x flex h-full items-center justify-between">
          <a
            href="#home"
            onClick={() => setOpen(false)}
            className="font-mono text-sm font-bold uppercase tracking-[0.2em]"
          >
            {site.name}
            <span className="text-accent">.</span>
          </a>

          {/* 桌面端导航 */}
          <nav className="hidden items-center gap-8 md:flex">
            {nav.links.map((l) => {
              const isActive = active === l.href.slice(1);
              return (
                <a
                  key={l.href}
                  href={l.href}
                  className={`group relative font-mono text-xs uppercase tracking-[0.18em] transition-colors ${
                    isActive ? "text-accent" : "text-muted hover:text-ink"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px bg-accent transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={onToggleTheme}
              aria-label="切换深浅主题"
              className="flex items-center gap-2 rounded-full border border-(--line) px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <Icon name={theme === "dark" ? "sun" : "moon"} className="h-3.5 w-3.5" />
              {theme === "dark" ? "浅色" : "深色"}
            </button>
            <button
              onClick={() => setOpen(!open)}
              aria-label={open ? "关闭菜单" : "打开菜单"}
              className="text-ink md:hidden"
            >
              <Icon name={open ? "close" : "menu"} className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* 移动端全屏菜单 */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-(--bg) md:hidden"
          style={{ paddingTop: "var(--nav-h)" }}
        >
          <nav className="container-x flex h-full flex-col justify-center gap-1">
            {nav.links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-(--line) py-5 text-3xl font-bold tracking-tight"
              >
                <span className="mr-4 font-mono text-sm text-accent">
                  0{i + 1}
                </span>
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
