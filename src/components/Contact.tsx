import { useState } from "react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import Icon, { type IconName } from "./Icon";
import { contact } from "../data/content";

/** 联系方式：左侧邮箱（一键复制），右侧社交卡片 */
export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
    } catch {
      // 剪贴板 API 不可用时的兜底方案
      const ta = document.createElement("textarea");
      ta.value = contact.email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-20 sm:py-24">
      <div className="container-x">
        <SectionHead
          index="03"
          label={contact.label}
          heading={contact.heading}
          em={contact.headingEm}
        />

        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                {contact.intro}
              </p>
            </Reveal>
            <Reveal delay={120} className="mt-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
                邮箱
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-4">
                <a
                  href={`mailto:${contact.email}`}
                  className="break-all font-mono text-2xl font-bold text-ink transition-colors hover:text-accent sm:text-4xl"
                >
                  {contact.email}
                </a>
                <button
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 rounded-full border border-(--line) px-4 py-2 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon name={copied ? "check" : "copy"} className="h-3.5 w-3.5" />
                  {copied ? "已复制" : "复制"}
                </button>
              </div>
            </Reveal>
            {/* 电话：在 content.ts 里删掉 phone 字段即可隐藏 */}
            {contact.phone && (
              <Reveal delay={180} className="mt-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
                  电话
                </p>
                <div className="mt-3">
                  <a
                    href={`tel:${contact.phone}`}
                    className="font-mono text-2xl font-bold text-ink transition-colors hover:text-accent sm:text-3xl"
                  >
                    {contact.phone}
                  </a>
                </div>
              </Reveal>
            )}
          </div>

          <div className="flex flex-col gap-4 lg:col-span-5">
            {contact.socials.map((s, i) => (
              <Reveal key={s.label} delay={i * 100}>
                <a
                  href={s.url}
                  className="group flex items-center justify-between rounded-xl border border-(--line) bg-(--card) px-6 py-5 transition-colors duration-300 hover:border-accent"
                >
                  <span className="flex items-center gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-(--line) text-muted transition-colors group-hover:border-accent group-hover:text-accent">
                      <Icon name={s.icon as IconName} className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-sm font-bold">{s.label}</span>
                      <span className="block font-mono text-xs text-muted">
                        {s.handle}
                      </span>
                    </span>
                  </span>
                  <Icon
                    name="external"
                    className="h-4 w-4 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
