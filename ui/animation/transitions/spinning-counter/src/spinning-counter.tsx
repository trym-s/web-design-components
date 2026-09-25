import { useLayoutEffect, useRef } from "react";
import { cn } from "./lib/utils";
import "./spinning-counter.css";

const DIGITS = Array.from({ length: 10 }, (_, value) => value);

export type SpinningCounterProps = {
  /** Non-negative integer to show. Every change rolls each column forward to its new digit. */
  value: number;
  /** Delay between columns, left to right, in ms. */
  stagger?: number;
  className?: string;
};

/**
 * Slot-machine counter: each digit is a 0–9–0–9 strip in a 30 px window with faded edges. On a
 * change every column snaps to its old digit in the first decade, then rolls (1.4 s, strong
 * ease-out) to the new digit in the second decade — always forward, at least one full turn when
 * the digit is unchanged. Columns start `stagger` ms apart.
 */
export function SpinningCounter({ value, stagger = 60, className }: SpinningCounterProps) {
  const text = String(Math.max(0, Math.trunc(value)));
  const stripRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const shown = useRef<string | null>(null);

  useLayoutEffect(() => {
    if (shown.current === text) return;
    const initial = shown.current === null;
    const strips = stripRefs.current.slice(0, text.length);
    strips.forEach((strip, index) => {
      if (!strip) return;
      const digit = Number(text[index]);
      const cell = (n: number) => `translateY(calc(-1 * var(--reel-cell) * ${n}))`;
      if (initial) {
        strip.style.transform = cell(digit);
        return;
      }
      const prev = Number(strip.dataset.digit ?? digit);
      strip.style.transition = "none";
      strip.style.transform = cell(prev);
      void strip.offsetWidth;
      strip.style.transition = `transform var(--reel-dur) var(--reel-ease) ${index * stagger}ms`;
      strip.style.transform = cell(10 + digit);
    });
    strips.forEach((strip, index) => strip && (strip.dataset.digit = text[index]));
    shown.current = text;
  }, [text, stagger]);

  return (
    <span className={cn("t-reel", className)} role="img" aria-label={text}>
      {text.split("").map((_, index) => (
        <span key={index} className="t-reel-col" aria-hidden="true">
          <span ref={(el) => { stripRefs.current[index] = el; }} className="t-reel-strip">
            {[...DIGITS, ...DIGITS].map((item, itemIndex) => (
              <span key={itemIndex} className="t-reel-digit">{item}</span>
            ))}
          </span>
        </span>
      ))}
    </span>
  );
}
