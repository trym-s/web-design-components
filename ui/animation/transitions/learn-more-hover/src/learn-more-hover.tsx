import type { ComponentProps } from "react";
import { cn } from "./lib/utils";
import "./learn-more-hover.css";

export type LearnMoreHoverProps = ComponentProps<"button">;

/**
 * Pill button whose trailing chevron nudges right 2 px and opens its arms ±8° on hover (350 ms).
 * Label defaults to "Learn more"; pass children to change it. All button props pass through.
 */
export function LearnMoreHover({ children = "Learn more", className, type = "button", ...props }: LearnMoreHoverProps) {
  return (
    <button
      type={type}
      className={cn(
        "t-learn inline-flex h-9 items-center gap-1 rounded-full bg-card pr-3 pl-4 text-sm font-medium text-card-foreground shadow-sm ring-1 ring-border outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
        className,
      )}
      {...props}
    >
      {children}
      <span className="t-learn-chevron text-muted-foreground" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path className="t-learn-arm t-learn-arm-top" d="M6 4L10 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path className="t-learn-arm t-learn-arm-bot" d="M10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </span>
    </button>
  );
}
