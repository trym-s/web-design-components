/**
 * Premium Button — Chamaac UI `registry/chamaac/premium-button/premium-button.tsx` (commit 345d79b) without Next.js.
 * MIT License, Copyright (c) 2026 Amarnath — see ./LICENSE.
 */
import { useEffect, useState } from "react";
import { cn } from "./lib/utils";

export interface PremiumButtonProps {
  /** Label. */
  text?: string;
  className?: string;
  onClick?: () => void;
}

function Bubble({ highlight }: { highlight?: boolean }) {
  return <span className={cn("inline-block size-[3px] bg-current", !highlight && "opacity-25")} />;
}

/** 5×5 dot matrix in which an arrow marches left to right, one column every 100 ms (14-step loop). */
function Box() {
  const [step, setStep] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reducedMotion) return setStep(8); // a still arrow, centred
    const timer = setInterval(() => setStep((prev) => (prev + 1) % 14), 100);
    return () => clearInterval(timer);
  }, [reducedMotion]);

  const isArrow = (row: number, col: number) => {
    const headX = step - 4; // starts outside on the left
    if (row === 2) return col <= headX && col >= headX - 4;
    if (row === 1 || row === 3) return col === headX - 1;
    if (row === 0 || row === 4) return col === headX - 2;
    return false;
  };

  return (
    <div className="absolute inset-y-0 left-1 my-auto flex size-9 flex-col items-center justify-center gap-px rounded-[4px] bg-[var(--premium-button-accent,var(--color-rose-500))] text-[var(--premium-button-foreground,white)] shadow-sm transition-all duration-400 ease-out">
      {[0, 1, 2, 3, 4].map((row) => (
        <div key={row} className="flex gap-[2px]">
          {[0, 1, 2, 3, 4].map((col) => (
            <Bubble key={col} highlight={isArrow(row, col)} />
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * Dark 44 px button with an animated arrow tile on the left. Colours: `--premium-button-fill` (default black),
 * `--premium-button-foreground` (default white) and `--premium-button-accent` (default Tailwind rose-500).
 */
export default function PremiumButton({ text = "Premium Button", className, onClick }: PremiumButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex h-[44px] cursor-pointer items-center gap-2 rounded-[8px] bg-[var(--premium-button-fill,black)] pr-4 pl-[48px] tracking-tight transition-all outline-none hover:scale-[1.02] focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-[0.98] motion-reduce:hover:scale-100 dark:border dark:border-border",
        className,
      )}
    >
      <Box />
      <span className="font-medium text-[var(--premium-button-foreground,white)]">{text}</span>
    </button>
  );
}
