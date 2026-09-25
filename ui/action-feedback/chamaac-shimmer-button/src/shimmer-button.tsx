/**
 * Shimmer Button — Chamaac UI `registry/chamaac/shimmer-button/shimmer-button.tsx` (commit 345d79b) without Next.js.
 * MIT License, Copyright (c) 2026 Amarnath — see ./LICENSE.
 */
import { LazyMotion, MotionConfig, domAnimation, m } from "motion/react";
import { cn } from "./lib/utils";

export interface ShimmerButtonProps {
  /** Label. */
  text?: string;
  className?: string;
  /** Seconds per shimmer sweep. */
  duration?: number;
  onClick?: () => void;
}

/** Outlined pill whose label is `--muted-foreground` text with a `--foreground` highlight sweeping through it forever. */
export default function ShimmerButton({ text = "Book a Free Call", className, duration = 1.2, onClick }: ShimmerButtonProps) {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <button
          onClick={onClick}
          className={cn(
            "group relative cursor-pointer rounded-full border border-border bg-background px-8 py-3 transition-all outline-none hover:scale-[1.02] focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-[0.98]",
            className,
          )}
        >
          <m.span
            className="relative block bg-[linear-gradient(110deg,var(--muted-foreground)_0%,var(--muted-foreground)_40%,var(--foreground)_50%,var(--muted-foreground)_60%,var(--muted-foreground)_100%)] bg-[length:200%_100%] bg-clip-text text-base font-medium tracking-tight text-transparent"
            animate={{ backgroundPosition: ["0% 0%", "-200% 0%"] }}
            transition={{ repeat: Infinity, duration, ease: "linear" }}
          >
            {text}
          </m.span>
        </button>
      </MotionConfig>
    </LazyMotion>
  );
}
