import type { ReactNode } from "react";
import { cn } from "./lib/utils";
import "./toast.css";

export type ToastProps = {
  /** `true` rises the toast into view (350 ms); `false` sinks it out (250 ms). */
  open: boolean;
  children: ReactNode;
  className?: string;
};

/**
 * Toast surface that rises 16 px from below while scaling 0.97 → 1 and un-blurring 2 px. It stays
 * mounted; place it in your toast region and drive `open` (timers are yours).
 */
export function Toast({ open, children, className }: ToastProps) {
  return (
    <div
      role="status"
      aria-hidden={!open}
      className={cn(
        "t-toast inline-flex items-center gap-2 rounded-xl bg-popover px-4 py-2.5 text-sm font-medium text-popover-foreground shadow-lg ring-1 ring-border",
        open && "is-open",
        className,
      )}
    >
      {children}
    </div>
  );
}
