/**
 * Slide Up Button — Chamaac UI `registry/chamaac/slideup-button/slideup-button.tsx` (commit 345d79b) without Next.js.
 * MIT License, Copyright (c) 2026 Amarnath — see ./LICENSE.
 */
import type { ReactNode } from "react";
import { LazyMotion, MotionConfig, domAnimation, m } from "motion/react";
import { cn } from "./lib/utils";

export interface SlideUpButtonProps {
  children: ReactNode;
  className?: string;
  /** Seconds for the label to leave upward. */
  textDuration?: number;
  /** Seconds for the copy to arrive from below. */
  cloneDuration?: number;
  /** Delay before the copy starts, seconds. */
  cloneDelay?: number;
  /** Button scale while hovered. */
  buttonScale?: number;
  /** Button opacity while hovered. */
  buttonOpacity?: number;
  onClick?: () => void;
}

/**
 * On hover the label slides up and out while a tilted copy rises into place. Colours: `--slide-up-fill`
 * (default `#f73b20`) and `--slide-up-foreground` (default white); `className` can override both.
 */
export default function SlideUpButton({
  children,
  className,
  textDuration = 0.25,
  cloneDuration = 0.5,
  cloneDelay = 0.12,
  buttonScale = 0.98,
  buttonOpacity = 0.8,
  onClick,
}: SlideUpButtonProps) {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <m.button
          onClick={onClick}
          variants={{ initial: { scale: 1 }, hover: { scale: buttonScale, opacity: buttonOpacity } }}
          initial="initial"
          whileHover="hover"
          whileFocus="hover"
          className={cn(
            "relative cursor-pointer overflow-hidden rounded-[12px] px-6 py-3 text-[16px] leading-[1.5] outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
            "bg-[var(--slide-up-fill,#f73b20)] text-[var(--slide-up-foreground,white)]",
            className,
          )}
        >
          <m.div className="relative overflow-hidden">
            <m.span
              variants={{ initial: { y: 0 }, hover: { y: "-200%" } }}
              transition={{ duration: textDuration, ease: [0.55, 0.085, 0.68, 0.53] }}
              className="block"
            >
              {children}
            </m.span>
            <m.span
              aria-hidden
              variants={{ initial: { y: "200%", rotate: 20 }, hover: { y: 0, rotate: 0 } }}
              transition={{ duration: cloneDuration, ease: [0.165, 0.84, 0.44, 1], delay: cloneDelay }}
              className="absolute top-0 left-0 block"
            >
              {children}
            </m.span>
          </m.div>
        </m.button>
      </MotionConfig>
    </LazyMotion>
  );
}
