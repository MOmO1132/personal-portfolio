import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import Icon from "./Icon";
import { hero, site } from "../data/content";

/** 数字统计：进入视口后从 0 滚动到目标值（缓出动画） */
function Stat({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / 1400);
          const eased = 1 - Math.pow(1 - p, 3);
          setN(Math.round(value * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <div ref={ref}>
      <p className="font-mono text-3xl font-bold text-ink sm:text-4xl">
        {n}
        <span className="text-accent">{suffix}</span>
      </p>
      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
        {label}
      </p>
    </div>
  );
}

/** 首页：一屏横版 —— 顶部标签行 / 中部标题+头像 / 底部统计 */
export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-[var(--nav-h)]">
      <div className="container-x flex min-h-[calc(100svh-var(--nav-h))] flex-col justify-between gap-7 py-7">
        {/* 顶部行：身份标签 + 方向标签 */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Reveal className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-muted">
              {hero.kicker}
            </span>
          </Reveal>
          <Reveal
            delay={100}
            className="hidden flex-wrap items-center gap-2 sm:flex"
          >
            {hero.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-(--line) px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-muted"
              >
                {t}
              </span>
            ))}
          </Reveal>
        </div>

        {/* 中部：左标题文案 + 右头像 */}
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
          <div>
            <h1>
              <Reveal className="mask">
                <span className="mask-inner text-[clamp(2.4rem,5.8vw,5rem)] font-bold leading-[1.05] tracking-tight">
                  {hero.titleLine1}
                </span>
              </Reveal>
              <Reveal className="mask" delay={120}>
                <span className="mask-inner font-serif italic text-[clamp(2.4rem,5.8vw,5rem)] leading-[1.05] tracking-tight text-accent">
                  {hero.titleLine2}
                </span>
              </Reveal>
            </h1>
            <Reveal delay={220}>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                {hero.description}
              </p>
            </Reveal>
            <Reveal delay={320} className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={hero.primaryButton.href}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-mono text-sm font-bold uppercase tracking-wider text-accent-ink transition-transform duration-300 hover:-translate-y-0.5"
              >
                {hero.primaryButton.label}
                <span aria-hidden="true">→</span>
              </a>
              <a
                href={hero.secondaryButton.href}
                className="inline-flex items-center gap-2 rounded-full border border-(--line) px-6 py-3 font-mono text-sm uppercase tracking-wider text-ink transition-colors hover:border-accent hover:text-accent"
              >
                <Icon name="github" className="h-4 w-4" />
                {hero.secondaryButton.label}
              </a>
            </Reveal>
          </div>

          <Reveal delay={200} className="justify-self-start lg:justify-self-end">
            <figure>
              <div className="w-44 overflow-hidden rounded-xl border border-(--line) sm:w-56 lg:w-[280px] xl:w-[320px]">
                <img
                  src={hero.avatar}
                  alt={`${site.name} 的照片`}
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted lg:text-right">
                {hero.avatarCaption}
              </figcaption>
            </figure>
          </Reveal>
        </div>

        {/* 底部：数据统计 */}
        <Reveal delay={150}>
          <div className="grid grid-cols-3 gap-6 border-t border-(--line) pt-6">
            {hero.stats.map((s) => (
              <Stat key={s.label} {...s} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
