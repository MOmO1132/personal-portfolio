import { marquee } from "../data/content";

/** 首页下方的滚动关键词条（内容两份复制实现无缝循环） */
export default function Marquee() {
  return (
    <div className="overflow-hidden border-y border-(--line) py-3.5" aria-hidden="true">
      <div className="marquee-track flex w-max items-center">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center">
            {marquee.items.map((item, i) => (
              <span
                key={`${half}-${i}`}
                className="flex items-center font-mono text-xs uppercase tracking-[0.25em] text-muted"
              >
                <span className="px-6">{item}</span>
                <span className="text-accent">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
