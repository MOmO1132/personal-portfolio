import { useState } from "react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import Icon from "./Icon";
import { projects } from "../data/content";

type Status = "done" | "building" | "planned";
type Item = (typeof projects.items)[number];

const STATUS_LABEL: Record<Status, string> = {
  done: "已完成",
  building: "进行中",
  planned: "计划中",
};

/** 状态徽章：已完成=实心底色，进行中=反色，计划中=描边 */
function StatusBadge({ status, className = "" }: { status: Status; className?: string }) {
  const styles: Record<Status, string> = {
    done: "bg-accent text-accent-ink",
    building: "bg-ink text-bg",
    planned: "border border-(--line) text-muted",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider ${styles[status]} ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {STATUS_LABEL[status]}
    </span>
  );
}

function TechTags({ tech }: { tech: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tech.map((t) => (
        <span
          key={t}
          className="rounded border border-(--line) px-2 py-0.5 font-mono text-[11px] text-muted"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function ProjectLinks({ item }: { item: Item }) {
  return (
    <div className="mt-auto flex items-center gap-4 pt-2">
      <a
        href={item.githubUrl}
        className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-accent"
      >
        <Icon name="github" className="h-3.5 w-3.5" />
        源码
      </a>
      <a
        href={item.demoUrl}
        className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-accent"
      >
        <Icon name="external" className="h-3.5 w-3.5" />
        在线演示
      </a>
    </div>
  );
}

/** 项目展示：筛选按钮 + 横版特色卡 + 双列网格 */
export default function Projects() {
  const [filter, setFilter] = useState("all");
  const items = projects.items.filter(
    (p) => filter === "all" || p.status === filter,
  );
  const featured = items.find((p) => p.id === "portfolio") ?? items[0];
  const rest = items.filter((p) => p !== featured);

  return (
    <section id="projects" className="py-20 sm:py-24">
      <div className="container-x">
        <SectionHead
          index="02"
          label={projects.label}
          heading={projects.heading}
          em={projects.headingEm}
          note={projects.note}
        />

        {/* 状态筛选 */}
        <Reveal className="mb-10 flex flex-wrap gap-2">
          {projects.filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
                filter === f.key
                  ? "border-accent bg-accent font-bold text-accent-ink"
                  : "border-(--line) text-muted hover:border-accent hover:text-accent"
              }`}
            >
              {f.label}
            </button>
          ))}
        </Reveal>

        {/* 特色项目（横版大卡） */}
        {featured && (
          <Reveal className="mb-6">
            <article className="group grid overflow-hidden rounded-2xl border border-(--line) bg-(--card) transition-colors duration-300 hover:border-accent lg:grid-cols-2">
              <a href={featured.demoUrl} className="relative block overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  loading="lazy"
                  className="aspect-[3/2] h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <StatusBadge
                  status={featured.status as Status}
                  className="absolute left-4 top-4"
                />
              </a>
              <div className="flex flex-col gap-4 p-7 sm:p-10">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
                  {featured.year} · Featured
                </p>
                <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {featured.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted sm:text-[15px]">
                  {featured.description}
                </p>
                <TechTags tech={featured.tech} />
                <ProjectLinks item={featured} />
              </div>
            </article>
          </Reveal>
        )}

        {/* 其余项目：双列网格 */}
        <div className="grid gap-6 sm:grid-cols-2">
          {rest.map((p, i) => (
            <Reveal key={p.id} delay={(i % 2) * 100} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-(--line) bg-(--card) transition-colors duration-300 hover:border-accent">
                <a href={p.demoUrl} className="relative block overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="aspect-[2/1] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <StatusBadge
                    status={p.status as Status}
                    className="absolute left-4 top-4"
                  />
                </a>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-lg font-bold tracking-tight">
                      {p.title}
                    </h3>
                    <span className="shrink-0 font-mono text-xs text-muted">
                      {p.year}
                    </span>
                  </div>
                  <p className="line-clamp-3 text-sm leading-relaxed text-muted">
                    {p.description}
                  </p>
                  <TechTags tech={p.tech} />
                  <ProjectLinks item={p} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
