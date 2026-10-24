import Reveal from "./Reveal";

type Props = {
  index: string;
  label: string;
  heading: string;
  /** 标题里高亮的部分（衬线斜体 + 强调色） */
  em: string;
  /** 标题右侧的说明文字（可选） */
  note?: string;
};

/** 章节标题：编号 + 英文小标 + 中文大标题 + 可选说明 */
export default function SectionHead({ index, label, heading, em, note }: Props) {
  return (
    <Reveal className="mb-10 sm:mb-12">
      <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4 border-b border-(--line) pb-7">
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-accent">
            ( {index} ) — {label}
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
            {heading}
            <em className="font-serif italic text-accent">{em}</em>
          </h2>
        </div>
        {note && (
          <p className="max-w-sm text-sm leading-relaxed text-muted">{note}</p>
        )}
      </div>
    </Reveal>
  );
}
