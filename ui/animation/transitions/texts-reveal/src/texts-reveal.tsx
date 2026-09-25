import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "./lib/utils";
import "./texts-reveal.css";

export type StaggerRevealProps = {
  /** Headline line. */
  primary: ReactNode;
  /** Supporting line (enters 40 ms after the headline). */
  secondary: ReactNode;
  /** `true` plays the staggered entrance; `false` fades both lines out in place (200 ms). */
  shown: boolean;
  className?: string;
};

/** Headline + supporting line that rise 12 px into view with a 3 px blur, staggered (500 ms). */
export function StaggerReveal({ primary, secondary, shown, className }: StaggerRevealProps) {
  const [visible, setVisible] = useState(false);
  const [hiding, setHiding] = useState(false);
  const wasShown = useRef(false);

  useEffect(() => {
    if (shown) {
      wasShown.current = true;
      setHiding(false);
      // Flip on the next frame so the entrance starts from the hidden pose.
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    }
    setVisible(false);
    if (!wasShown.current) return;
    setHiding(true);
    const id = window.setTimeout(() => setHiding(false), 200);
    return () => window.clearTimeout(id);
  }, [shown]);

  return (
    <div className={cn("t-stagger", visible && "is-shown", hiding && "is-hiding", className)} aria-hidden={!shown}>
      <strong className="t-stagger-line t-stagger-line--1 font-semibold text-foreground">{primary}</strong>
      <span className="t-stagger-line t-stagger-line--2 text-muted-foreground">{secondary}</span>
    </div>
  );
}
