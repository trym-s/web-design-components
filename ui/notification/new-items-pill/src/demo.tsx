import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { NewItemsPill, useNewItems } from "./new-items-pill";

const WHO = ["Wren", "Ada", "Iris", "Noor", "Kaz", "Milo", "Sena", "Otto"];
const WHAT = [
  "shipped the scroll restoration fix",
  "left a note on the pricing page",
  "moved two tickets to review",
  "published the changelog",
  "renamed the staging cluster",
  "closed the flaky test issue",
];

export default function NewItemsPillDemo() {
  const [ids, setIds] = useState<number[]>(() =>
    Array.from({ length: 14 }, (_, i) => 13 - i),
  );
  const [marked, setMarked] = useState(0);
  const next = useRef(14);

  const { scrollProps, unread, jump } = useNewItems<HTMLDivElement>({
    itemCount: ids.length,
  });
  const scroller = scrollProps.ref;

  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTop = 150;
  }, [scroller]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIds((prev) => [next.current + 1, ...prev]);
      next.current += 1;
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (marked === 0) return;
    const timer = setTimeout(() => setMarked(0), 2000);
    return () => clearTimeout(timer);
  }, [marked]);

  return (
    <div className="relative h-[320px] w-full max-w-[420px] overflow-hidden rounded-xl border bg-card">
      <div
        {...scrollProps}
        role="region"
        aria-label="Team activity"
        className="[mask-image:linear-gradient(transparent,black_14px,black_calc(100%-22px),transparent)] h-full overflow-y-auto overscroll-contain px-3 py-3 outline-none"
      >
        {ids.map((id, i) => (
          <article
            key={id}
            className="relative rounded-[calc(var(--radius)-2px)] px-2.5 py-[9px] text-[12.5px] leading-relaxed"
          >
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[calc(var(--radius)-2px)] bg-primary/[0.09]"
              initial={false}
              animate={{ opacity: i < marked ? 1 : 0 }}
              transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
            />
            <span className="relative font-medium text-foreground">
              {WHO[id % WHO.length]}
            </span>{" "}
            <span className="relative text-muted-foreground">{WHAT[id % WHAT.length]}</span>
          </article>
        ))}
      </div>
      <NewItemsPill
        count={unread}
        onJump={() => setMarked(jump())}
        className="px-3"
      />
    </div>
  );
}
