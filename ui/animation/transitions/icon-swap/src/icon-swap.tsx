import { useState, type ReactNode } from "react";
import { cn } from "./lib/utils";
import "./icon-swap.css";

export type IconSwapState = "a" | "b";

export type IconSwapProps = {
  iconA: ReactNode;
  iconB: ReactNode;
  /** Controlled state: which icon is shown. */
  state?: IconSwapState;
  /** Initial state when uncontrolled. */
  defaultState?: IconSwapState;
  onStateChange?: (state: IconSwapState) => void;
  /** Accessible name while `a` / `b` is shown (describes what a click does). */
  labelA?: string;
  labelB?: string;
  className?: string;
};

/** Icon button that cross-fades two stacked icons with blur + scale (250 ms ease-in-out). */
export function IconSwap({
  iconA,
  iconB,
  state: stateProp,
  defaultState = "a",
  onStateChange,
  labelA = "Show B",
  labelB = "Show A",
  className,
}: IconSwapProps) {
  const [inner, setInner] = useState<IconSwapState>(defaultState);
  const state = stateProp ?? inner;
  const toggle = () => {
    const next = state === "a" ? "b" : "a";
    if (stateProp === undefined) setInner(next);
    onStateChange?.(next);
  };

  return (
    <button
      type="button"
      aria-label={state === "a" ? labelA : labelB}
      onClick={toggle}
      className={cn(
        "inline-grid size-9 place-items-center rounded-md text-foreground outline-none hover:bg-accent focus-visible:ring-[3px] focus-visible:ring-ring/50",
        className,
      )}
    >
      <span className="t-icon-swap" data-state={state}>
        <span className="t-icon" data-icon="a">{iconA}</span>
        <span className="t-icon" data-icon="b">{iconB}</span>
      </span>
    </button>
  );
}
