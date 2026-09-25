import { useEffect, useRef } from "react";
import { ReadingProgress } from "./reading-progress";

const PARAGRAPHS = [
  "The house had been empty for eleven years before anyone thought to measure it. The surveyor arrived on a Tuesday with a folding rule and a notebook, and left in the dark with neither of them full.",
  "What he found first was that none of the rooms agreed with the plan. The kitchen was a foot short in one direction and a foot long in the other, as though the walls had been shuffled overnight and had settled back almost, but not quite, where they began.",
  "He drew the discrepancy twice, then a third time, and the third drawing was the one he kept. It showed the stair landing sitting half a step above where the drawing said it should, which is a small thing on paper and a very large thing underfoot.",
  "In the front room the light came in low and stayed low, sliding across the boards all afternoon without ever reaching the far wall. He wrote that down too, because a room that never fills is a room somebody will keep leaving.",
  "By four o'clock the rule had stopped being useful. The remaining questions were about height and weight and the way a floor answers a footstep, and none of those are questions a rule can be pointed at.",
  "He locked the door behind him and stood on the path for a while, working out how long it would take to put right. The number he arrived at was longer than anyone had asked for and shorter than the house deserved.",
];

const WORDS = PARAGRAPHS.join(" ").split(/\s+/).length;

export default function ReadingProgressDemo() {
  const scroller = useRef<HTMLDivElement>(null);

  // Start part-way through the article so the bar shows progress.
  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTop = (el.scrollHeight - el.clientHeight) * 0.4;
  }, []);

  return (
    <div className="mx-auto w-full max-w-[420px]">
      <div className="border border-border bg-card shadow-sm rounded-[calc(var(--radius)+4px)] p-[5px]">
        <div className="px-2 pb-2.5 pt-2">
          <ReadingProgress scroller={scroller} words={WORDS} />
        </div>
        <div className="border border-border bg-card inset-shadow-xs rounded-[calc(var(--radius)-1px)]">
          <div
            ref={scroller}
            role="region"
            aria-label="Article body"
            className="[mask-image:linear-gradient(transparent,black_14px,black_calc(100%-22px),transparent)] [scrollbar-width:none] max-h-[184px] space-y-3 overflow-y-auto overscroll-contain rounded-[calc(var(--radius)-1px)] p-3 text-[12.5px] leading-relaxed text-foreground"
          >
            {PARAGRAPHS.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
