import { cn } from "./lib/utils";
import "./shimmer-text.css";

export type ShimmerProps = {
  /** The label; it is duplicated into `data-text` for the highlight layer. */
  children: string;
  className?: string;
};

/**
 * In-progress label ("Generating…") in `--shimmer-base` with a `--shimmer-highlight` band sweeping
 * across the glyphs every 2 s. Pure CSS; the colours are declared on the element.
 */
export function Shimmer({ children, className }: ShimmerProps) {
  return (
    <span
      className={cn("t-shimmer [--shimmer-base:var(--muted-foreground)] [--shimmer-highlight:var(--foreground)]", className)}
      data-text={children}
    >
      {children}
    </span>
  );
}
