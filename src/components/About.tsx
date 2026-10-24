import type { CSSProperties } from "react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import { about } from "../data/content";

/** 关于我：左栏（陈述 + 介绍 + 教育背景），右栏（技能分组 + 工具墙） */
export default function About() {
  return (
    <section id="about" className="py-20 sm:py-24">
      <div className="container-x">
        <SectionHead
          index="01"
          label={about.label}
          heading={about.heading}
          em={about.headingEm}
        />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* 左栏 */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="font-serif text-2xl italic leading-snug text-ink sm:text-3xl">
                {about.statement}
              </p>
            </Reveal>
            <div className="mt-6 space-y-4">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 100}>
                  <p className="text-[15px] leading-relaxed text-muted">{p}</p>
                </Reveal>
              ))}
            </div>

            {/* 教育背景 */}
            <Reveal delay={150} className="mt-8">
              <div className="rounded-xl border border-(--line) bg-(--card) p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-bold">{about.education.school}</h3>
                  <span className="font-mono text-xs text-muted">
                    {about.education.period}
                  </span>
                </div>
                <p className="mt-1 text-sm text-accent">
                  {about.education.major} · {about.education.degree}
                </p>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                  相关课程
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {about.education.courses.map((c) => (
                    <span
                      key={c}
                      className="rounded border border-(--line) px-2.5 py-1 text-xs text-muted"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* 右栏：技能 + 工具 */}
          <div className="lg:col-span-7">
            <div className="grid gap-10 sm:grid-cols-2">
              {about.skillGroups.map((g, gi) => (
                <Reveal key={g.name} delay={gi * 120}>
                  <h3 className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-accent">
                    <span className="h-px w-6 bg-accent" />
                    {g.name}
                  </h3>
                  <ul className="space-y-5">
                    {g.items.map((it) => (
                      <li key={it.name}>
                        <div className="mb-1.5 flex items-baseline justify-between">
                          <span className="text-sm font-medium">{it.name}</span>
                          <span className="font-mono text-xs text-muted">
                            {it.level}%
                          </span>
                        </div>
                        <div className="h-1 overflow-hidden rounded-full bg-(--line)">
                          <div
                            className="skill-fill h-full rounded-full bg-accent"
                            style={
                              { "--level": `${it.level}%` } as CSSProperties
                            }
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>

            {/* 工具墙 */}
            <Reveal delay={200} className="mt-10">
              <h3 className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-accent">
                <span className="h-px w-6 bg-accent" />
                工具与平台
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {about.tools.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-(--line) px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
