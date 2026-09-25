import { useState, type ReactNode } from "react";
import { cn } from "./lib/utils";
import "./notification-badge.css";

export type NotificationBadgeProps = {
  /** The trigger's content (e.g. a bell icon). */
  children: ReactNode;
  /** What the badge shows (a count). */
  count?: ReactNode;
  /** Controlled badge visibility. */
  open?: boolean;
  /** Initial visibility when uncontrolled. */
  defaultOpen?: boolean;
  /** Clicking the trigger toggles the badge (as upstream); called with the next state. */
  onOpenChange?: (open: boolean) => void;
  "aria-label"?: string;
  className?: string;
};

/**
 * Round trigger with a count badge that slides in diagonally and pops (scale 0 → 1 with overshoot,
 * blur 2 px → 0) independently of the trigger; hiding shrinks and blurs it out in 180 ms.
 */
export function NotificationBadge({
  children,
  count = 1,
  open: openProp,
  defaultOpen = true,
  onOpenChange,
  className,
  ...aria
}: NotificationBadgeProps) {
  const [inner, setInner] = useState(defaultOpen);
  const open = openProp ?? inner;
  const toggle = () => {
    if (openProp === undefined) setInner(!open);
    onOpenChange?.(!open);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "relative grid size-10 place-items-center rounded-full bg-card text-card-foreground shadow-sm ring-1 ring-border outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
        className,
      )}
      {...aria}
    >
      {children}
      <span className="t-badge" data-open={open} aria-hidden={!open}>
        <span className="t-badge-dot grid h-4 min-w-4 place-items-center rounded-full bg-destructive px-1 text-[10px] leading-none font-semibold text-white tabular-nums">
          {count}
        </span>
      </span>
    </button>
  );
}
