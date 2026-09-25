import type { ReactNode } from "react";
import { cn } from "./lib/utils";
import "./success-check.css";

export type SuccessCheckProps = {
  /**
   * `false` is the hidden resting state (no animation). Each `false → true` runs the appear:
   * fade, rotate upright from 80°, blur 10 px → 0, a 40 px Y-bob with overshoot (all 500 ms) and
   * the SVG path stroke drawing after 80 ms. To replay, set `false` then `true` on the next frame.
   */
  visible: boolean;
  /** The icon; an SVG `<path>` inside draws its stroke (dash length 20). */
  children: ReactNode;
  className?: string;
};

/** Appear transition for a success icon. Hide behaviour is yours (it just snaps back to hidden). */
export function SuccessCheck({ visible, children, className }: SuccessCheckProps) {
  return (
    <span className={cn("t-success-check", className)} data-state={visible ? "in" : "out"}>
      {children}
    </span>
  );
}
