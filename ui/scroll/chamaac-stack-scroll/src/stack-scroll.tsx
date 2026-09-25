/**
 * Stack Scroll — Chamaac UI `app/in-progress/.../stack-scroll-demo.tsx` (commit 345d79b) without Next.js: the card
 * stack is split from the demo data, and react-responsive (whose breakpoint changed nothing) is dropped.
 * MIT License, Copyright (c) 2026 Amarnath — see ./LICENSE.
 */
import { useRef } from "react";
import { LazyMotion, MotionConfig, domAnimation, m, useScroll, useTransform } from "motion/react";
import { cn } from "./lib/utils";

export interface StackScrollItem {
  image: string;
  title: string;
}

export interface StackScrollProps {
  items: StackScrollItem[];
  className?: string;
}

function StackScrollCard({ image, title, index }: StackScrollItem & { index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [0, index * 10]);
  // Later cards are wider, so the stack reads as a pile.
  const widthPercent = 70 + index * 5;

  return (
    <m.div ref={ref} style={{ scale, top: `${index * 10}px`, y }} className="sticky flex h-[500px] w-full items-center justify-center">
      <div style={{ width: `${widthPercent}%` }} className="mx-auto">
        <div className="relative h-[180px] overflow-hidden rounded-[10px] md:h-[250px] md:rounded-[20px]">
          <img alt={title} src={image} width={400} height={400} className="h-full w-full object-cover" />
          {/* Scrim for the caption: darkens toward the bottom. */}
          <div className="absolute inset-0 rounded-[8px] bg-gradient-to-b from-transparent via-transparent to-[var(--stack-scroll-scrim,rgb(0_0_0/0.4))]" />
          <div className="absolute right-4 bottom-8 left-4 flex flex-col gap-3">
            <h2 className="text-xl leading-[60%] font-bold text-[var(--stack-scroll-caption,white)] drop-shadow-lg md:text-2xl">{title}</h2>
          </div>
        </div>
      </div>
    </m.div>
  );
}

/**
 * Photo cards that stick as the page scrolls and pile up: each grows from 80 % to full size while it travels from
 * the viewport bottom to the top, landing 10 px lower than the one before. Scroll-linked (window scroll).
 */
export default function StackScroll({ items, className }: StackScrollProps) {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <div className={cn("min-h-full w-full bg-background", className)}>
          <div className="relative flex w-full items-start justify-center">
            <div className="relative w-full max-w-[600px]">
              {items.map((item, i) => (
                <StackScrollCard key={item.title} {...item} index={i} />
              ))}
            </div>
          </div>
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}
