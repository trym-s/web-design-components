import type { ReactNode } from "react";
import { cn } from "./lib/utils";
import "./card-resize.css";

export type CardResizeProps = {
  /** Current width in px; changing it tweens. */
  width: number;
  /** Current height in px; changing it tweens. */
  height: number;
  children?: ReactNode;
  className?: string;
};

/** A card whose explicit width/height tween (300 ms, ease-out-quint) whenever the parent changes them. */
export function CardResize({ width, height, children, className }: CardResizeProps) {
  return (
    <div
      className={cn("t-resize overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm", className)}
      style={{ width, height }}
    >
      {children}
    </div>
  );
}
