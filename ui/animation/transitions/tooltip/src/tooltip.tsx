import { useId, type ReactNode } from "react";
import { cn } from "./lib/utils";
import "./tooltip.css";

export type TooltipTriggerProps = { "aria-describedby": string; className: string };

export type TooltipProps = {
  /** Tooltip text. */
  content: ReactNode;
  /**
   * Render the trigger and spread the given props on it: they carry `aria-describedby` and the
   * `t-tt-trigger` class the focus-visible selector needs. Merge your own classes after them.
   */
  children: (props: TooltipTriggerProps) => ReactNode;
  className?: string;
};

/**
 * Pure-CSS tooltip above its trigger: fades + scales in (0.98 → 1, 150 ms) after an 80 ms delay on
 * hover or keyboard focus, and disappears immediately (50 ms) on leave. The wrapper is the hover
 * target, so the pointer can drift onto the tooltip without flicker.
 */
export function Tooltip({ content, children, className }: TooltipProps) {
  const id = useId();
  return (
    <span className="t-tt-wrap">
      {children({ "aria-describedby": id, className: "t-tt-trigger" })}
      <span
        id={id}
        role="tooltip"
        className={cn("t-tt rounded-md bg-popover text-xs text-popover-foreground shadow-md ring-1 ring-foreground/5", className)}
      >
        {content}
      </span>
    </span>
  );
}
