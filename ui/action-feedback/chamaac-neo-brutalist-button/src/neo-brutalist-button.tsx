/**
 * Neo Brutalist Button — Chamaac UI `registry/chamaac/neo-brutalist-button/neo-brutalist-button.tsx` (commit 345d79b)
 * without Next.js: the styled-jsx shimmer keyframes become a one-way CSS transition.
 * MIT License, Copyright (c) 2026 Amarnath — see ./LICENSE.
 */
import { cn } from "./lib/utils";

export interface NeoBrutalistButtonProps {
  /** Label. */
  text?: string;
  className?: string;
  onClick?: () => void;
}

/**
 * Skewed (−10°) button with a hard offset shadow that doubles on hover while a white sheen sweeps across once.
 * Colours: `--neo-brutalist-fill` (default pink `#ff90e8`) and `--neo-brutalist-ink` (default black) for text, border, shadow.
 */
export default function NeoBrutalistButton({ text = "Click Me", className, onClick }: NeoBrutalistButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative cursor-pointer overflow-hidden px-6 py-3 outline-none",
        "bg-[var(--neo-brutalist-fill,#ff90e8)] text-[var(--neo-brutalist-ink,black)]",
        "skew-x-[-10deg] border-[1.5px] border-[var(--neo-brutalist-ink,black)] transition-all duration-100",
        "shadow-[4px_4px_0_0_var(--neo-brutalist-ink,black)] hover:shadow-[8px_8px_0_0_var(--neo-brutalist-ink,black)] focus-visible:shadow-[8px_8px_0_0_var(--neo-brutalist-ink,black)]",
        className,
      )}
    >
      {/* Sheen: sweeps −100% → 200% in 0.2 s on hover, snaps back (no transition) when the pointer leaves. */}
      <div className="absolute top-0 bottom-0 left-0 z-0 w-1/2 -translate-x-full bg-gradient-to-r from-transparent via-white/80 to-transparent transition-none group-hover:translate-x-[200%] group-hover:transition-transform group-hover:duration-200 group-hover:ease-linear motion-reduce:hidden" />
      <span className="relative z-10 inline-block skew-x-[10deg] text-lg font-medium">{text}</span>
    </button>
  );
}
