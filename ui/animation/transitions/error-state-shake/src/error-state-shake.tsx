import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "./lib/utils";
import "./error-state-shake.css";

export type InputShakeProps = {
  /** The field itself — typically a borderless `<input>`; the wrapper draws the border. */
  children: ReactNode;
  /** Message revealed under the field while in the error state. */
  message: ReactNode;
  /**
   * Every change to a non-zero value triggers the error: the field shakes, the border and the
   * message switch to `--destructive`, then both fade back after `--revert-hold` (3 s).
   */
  shakeKey?: number;
  /** Called with `true` when the error starts and `false` when it clears (timer or typing). */
  onErrorChange?: (error: boolean) => void;
  className?: string;
};

function readMs(el: Element, name: string, fallback: number) {
  const n = parseFloat(getComputedStyle(el).getPropertyValue(name));
  return Number.isFinite(n) ? n : fallback;
}

/** Validation feedback: a 280 ms left/right shake with overshoot plus an auto-reverting error state. */
export function InputShake({ children, message, shakeKey = 0, onErrorChange, className }: InputShakeProps) {
  const inputRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);
  const [error, setError] = useState(false);
  const onErrorChangeRef = useRef(onErrorChange);
  onErrorChangeRef.current = onErrorChange;

  const clearTimer = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = null;
  };

  useEffect(() => {
    const el = inputRef.current;
    if (!shakeKey || !el) return;
    setError(true);
    onErrorChangeRef.current?.(true);
    // Replay: drop the class, force a reflow, re-add it.
    el.classList.remove("is-shaking");
    void el.offsetWidth;
    el.classList.add("is-shaking");
    clearTimer();
    const shakeMs = readMs(el, "--shake-dur-a", 80) * 2 + readMs(el, "--shake-dur-b", 60) * 2;
    timerRef.current = window.setTimeout(() => {
      timerRef.current = null;
      setError(false);
      onErrorChangeRef.current?.(false);
    }, shakeMs + readMs(el, "--revert-hold", 3000));
  }, [shakeKey]);

  useEffect(() => clearTimer, []);

  // Typing cancels the auto-revert and clears the error at once.
  const cancel = () => {
    if (!error) return;
    clearTimer();
    setError(false);
    onErrorChange?.(false);
  };

  return (
    <div className={cn("t-input-wrap w-56", error && "is-error", className)}>
      <div
        ref={inputRef}
        onInput={cancel}
        className={cn(
          "t-input rounded-md border border-input bg-background shadow-xs focus-within:ring-[3px] focus-within:ring-ring/50",
          error && "is-error border-destructive focus-within:ring-destructive/20",
        )}
      >
        {children}
      </div>
      <p className="t-error-msg mt-1.5 text-xs text-destructive" role="alert">
        {message}
      </p>
    </div>
  );
}
