import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "./lib/utils";
import "./text-states-swap.css";

export type TextStatesSwapProps = {
  /** The status text. Changing it plays exit (up + blur + fade) → swap → enter (from below). */
  text: string;
  className?: string;
};

/** In-place status text swap ("Processing…" → "Done"), 150 ms per phase. */
export function TextStatesSwap({ text, className }: TextStatesSwapProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(text);
  const swapped = useRef(false);

  // Phase 1: exit the old text, then swap once the exit has played.
  useEffect(() => {
    const el = ref.current;
    if (!el || text === shown) return;
    el.classList.add("is-exit");
    const ms = parseFloat(getComputedStyle(el).getPropertyValue("--text-swap-dur"));
    const id = window.setTimeout(() => {
      swapped.current = true;
      setShown(text);
    }, Number.isFinite(ms) ? ms : 150);
    return () => window.clearTimeout(id);
  }, [text, shown]);

  // Phase 2: jump below without a transition, then release so the new text rises in.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !swapped.current) return;
    swapped.current = false;
    el.classList.remove("is-exit");
    el.classList.add("is-enter-start");
    void el.offsetWidth;
    el.classList.remove("is-enter-start");
  }, [shown]);

  return (
    <span ref={ref} className={cn("t-text-swap", className)} aria-live="polite">
      {shown}
    </span>
  );
}
