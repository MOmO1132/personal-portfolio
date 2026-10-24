import { useEffect, useState } from "react";
import Icon from "./Icon";
import { footer, nav, site } from "../data/content";

/** 页脚三栏信息 + 回到顶部按钮 */
export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <footer className="border-t border-(--line) py-12">
        <div className="container-x grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-mono text-sm font-bold uppercase tracking-[0.2em]">
              {site.name}
              <span className="text-accent">.</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              {footer.blurb}
            </p>
          </div>
          <div>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
              导航
            </p>
            <ul className="space-y-2.5">
              {nav.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-muted transition-colors hover:text-accent"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
              技术栈
            </p>
            <p className="font-mono text-xs leading-loose text-muted">
              {footer.techNote}
            </p>
          </div>
        </div>
        <div className="container-x mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-(--line) pt-6">
          <p className="font-mono text-xs text-muted">{footer.copyright}</p>
          <p className="font-mono text-xs text-muted">
            Built with Vibe Coding · {new Date().getFullYear()}
          </p>
        </div>
      </footer>

      {/* 回到顶部 */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="回到顶部"
        className={`fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-accent text-accent-ink shadow-lg transition-all duration-300 hover:-translate-y-1 ${
          showTop ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <Icon name="arrow-up" className="h-5 w-5" />
      </button>
    </>
  );
}
