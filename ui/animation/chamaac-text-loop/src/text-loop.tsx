/**
 * Text Loop — Chamaac UI `app/components/text-animations/text-loop/text-loop.tsx` (commit 345d79b) without Next.js.
 * MIT License, Copyright (c) 2026 Amarnath — see ./LICENSE.
 */
import { useEffect, useState } from "react";
import { AnimatePresence, LazyMotion, MotionConfig, domAnimation, m, type Transition } from "motion/react";
import { cn } from "./lib/utils";

export interface TextLoopProps {
  /** Fixed leading word(s). */
  staticText?: string;
  /** Words that replace each other after `staticText`. */
  rotatingTexts?: string[];
  className?: string;
  /** Milliseconds each word stays. */
  interval?: number;
  /** Transition of the width/opacity reveal. */
  transition?: Transition;
  staticTextClassName?: string;
  rotatingTextClassName?: string;
  backgroundClassName?: string;
  cursorClassName?: string;
}

/**
 * "Design **Limitless**|" — the rotating word wipes open from zero width, sits on a soft highlight and is followed by
 * a blinking caret. Colours (defaults are Tailwind violet/purple): `--text-loop-from` / `--text-loop-to` (word
 * gradient), `--text-loop-highlight` (box behind the word) and `--text-loop-caret`.
 */
export default function TextLoop({
  staticText = "Design",
  rotatingTexts = ["Limitless", "Timeless", "Flawless"],
  className,
  interval = 3000,
  transition = { duration: 0.8, ease: "easeInOut" },
  staticTextClassName,
  rotatingTextClassName,
  backgroundClassName,
  cursorClassName,
}: TextLoopProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((prev) => (prev + 1) % rotatingTexts.length), interval);
    return () => clearInterval(timer);
  }, [rotatingTexts.length, interval]);

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <div
          className={cn(
            "flex w-fit flex-wrap items-center justify-start gap-x-2 gap-y-1 text-3xl font-medium tracking-tight md:gap-x-3 md:text-7xl",
            "[--text-loop-from:var(--color-violet-400)] [--text-loop-to:var(--color-violet-800)] [--text-loop-highlight:var(--color-purple-200)] [--text-loop-caret:var(--color-violet-500)]",
            "dark:[--text-loop-to:var(--color-violet-600)] dark:[--text-loop-highlight:var(--color-violet-950)]",
            className,
          )}
        >
          <span className={cn("whitespace-nowrap", staticTextClassName)}>{staticText}</span>
          <div className="relative flex items-center">
            <AnimatePresence mode="wait">
              <m.div
                key={rotatingTexts[index]}
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={transition}
                className="relative overflow-hidden whitespace-nowrap"
                aria-live="polite"
              >
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-r from-transparent via-(--text-loop-highlight)/30 to-(--text-loop-highlight) dark:to-(--text-loop-highlight)/60",
                    backgroundClassName,
                  )}
                />
                <span
                  className={cn(
                    "relative bg-gradient-to-r from-(--text-loop-from) to-(--text-loop-to) bg-clip-text pr-1 text-transparent",
                    rotatingTextClassName,
                  )}
                >
                  {rotatingTexts[index]}
                </span>
              </m.div>
            </AnimatePresence>
            <m.div
              className={cn("h-[1.10em] w-[3px] bg-(--text-loop-caret) sm:h-[1em] md:w-[4px]", cursorClassName)}
              animate={{ opacity: [1, 0.5] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
            />
          </div>
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}
