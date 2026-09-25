/**
 * Hover Arrow Button — Chamaac UI `registry/chamaac/hover-arrow-button/hover-arrow-button.tsx` (commit 345d79b)
 * without Next.js; `@tabler/icons-react`'s IconArrowRight is lucide-react's ArrowRight.
 * MIT License, Copyright (c) 2026 Amarnath — see ./LICENSE.
 */
import type { ComponentProps } from "react";
import { ArrowRight } from "lucide-react";
import { LazyMotion, MotionConfig, domAnimation, m } from "motion/react";
import { cn } from "./lib/utils";

export interface HoverArrowButtonProps extends ComponentProps<typeof m.button> {
  /** Label. */
  text?: string;
  /** Duration of the arrow swap, seconds. */
  duration?: number;
  /** Arrow size, px. */
  iconSize?: number;
}

const EASE = [0.165, 0.84, 0.44, 1] as const;

/** Pill button: on hover the trailing arrow slides out to the right while a leading arrow slides in from the left. */
export default function HoverArrowButton({ text = "Get Started", duration = 0.3, iconSize = 24, className, ...props }: HoverArrowButtonProps) {
  const transition = { duration, ease: EASE };
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <m.button
          className={cn(
            "group relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-full bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-all outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
            className,
          )}
          whileHover="hover"
          whileFocus="hover"
          initial="initial"
          whileTap="tap"
          variants={{ initial: { scale: 1 }, hover: { scale: 1 } }}
          {...props}
        >
          <m.div
            className="flex items-center justify-center overflow-hidden"
            variants={{ initial: { width: 0, opacity: 0 }, hover: { width: "auto", opacity: 1 } }}
            transition={transition}
          >
            <m.div
              className="flex items-center justify-center"
              variants={{ initial: { x: "-200%", opacity: 0 }, hover: { x: 0, opacity: 1 } }}
              transition={transition}
            >
              <ArrowRight size={iconSize} aria-hidden />
            </m.div>
          </m.div>
          <span className="mx-2">{text}</span>
          <m.div
            className="flex items-center justify-center overflow-hidden"
            variants={{ initial: { width: "auto", opacity: 1 }, hover: { width: 0, opacity: 0 } }}
            transition={transition}
          >
            <m.div
              className="flex items-center justify-center"
              variants={{ initial: { x: 0, opacity: 1 }, hover: { x: "200%", opacity: 0 } }}
              transition={transition}
            >
              <ArrowRight size={iconSize} aria-hidden />
            </m.div>
          </m.div>
        </m.button>
      </MotionConfig>
    </LazyMotion>
  );
}
