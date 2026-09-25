import { useRef, type ReactNode } from "react";
import { cn } from "./lib/utils";
import "./avatar-group-hover.css";

export type AvatarGroupProps = {
  /** Any nodes (avatars, chips, badges); each is wrapped in a `.t-avatar` that owns the hover spring. */
  items: ReactNode[];
  className?: string;
  /** Classes for each item wrapper (e.g. the negative overlap `-ml-1.5 first:ml-0`). */
  itemClassName?: string;
};

/**
 * Horizontal stack whose hovered item lifts and scales while its neighbours lift by
 * `lift × falloff^distance`; leaving the row springs everything back with an overshoot ease.
 * Tuning comes from the `--avatar-*` custom properties (read on every hover).
 */
export function AvatarGroup({ items, className, itemClassName }: AvatarGroupProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  const setShifts = (activeIdx: number | null, phase: "in" | "out") => {
    const root = rootRef.current;
    if (!root) return;
    const cs = getComputedStyle(root);
    const num = (name: string, fb: number) => {
      const v = parseFloat(cs.getPropertyValue(name));
      return Number.isFinite(v) ? v : fb;
    };
    const ease = (name: string, fb: string) => cs.getPropertyValue(name).trim() || fb;

    const lift = num("--avatar-lift", -4);
    const falloff = num("--avatar-falloff", 0.45);
    const scale = num("--avatar-scale", 1.05);
    // Direction-aware easing: set the timing function before the variable writes.
    const tf = phase === "out"
      ? ease("--avatar-ease-out", "cubic-bezier(0.34, 3.85, 0.64, 1)")
      : ease("--avatar-ease-in", "cubic-bezier(0.22, 1, 0.36, 1)");

    root.querySelectorAll<HTMLElement>(".t-avatar").forEach((el, i) => {
      el.style.transitionTimingFunction = tf;
      if (activeIdx == null) {
        el.style.setProperty("--shift", "0px");
        el.style.setProperty("--scale-active", "1");
        return;
      }
      const d = Math.abs(i - activeIdx);
      el.style.setProperty("--shift", (lift * Math.pow(falloff, d)).toFixed(3) + "px");
      el.style.setProperty("--scale-active", i === activeIdx ? String(scale) : "1");
    });
  };

  return (
    <div ref={rootRef} className={cn("flex items-center", className)} onMouseLeave={() => setShifts(null, "out")}>
      {items.map((node, i) => (
        <div key={i} className={cn("t-avatar", itemClassName)} onMouseEnter={() => setShifts(i, "in")}>
          {node}
        </div>
      ))}
    </div>
  );
}
