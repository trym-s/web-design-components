import type { ReactNode } from "react";
import { cn } from "./lib/utils";
import "./panel-reveal.css";

export type PanelRevealProps = {
  /** Whether the panel is in view. */
  open: boolean;
  children: ReactNode;
  id?: string;
  /** Classes for the clipping container (size it to the travel area). */
  className?: string;
  /** Classes for the sliding panel (its surface). */
  panelClassName?: string;
};

/**
 * Panel that rises 100 px into a clipping container with a fade and a 2 px blur (open 400 ms,
 * close 350 ms). The closed panel is inert.
 */
export function PanelReveal({ open, children, id, className, panelClassName }: PanelRevealProps) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <div id={id} className={cn("t-panel-slide h-full", panelClassName)} data-open={open} inert={!open}>
        {children}
      </div>
    </div>
  );
}
