// Dia Browser's signature gradient. A row of N tall, heavily blurred columns share one vertical
// rainbow gradient and follow a bell curve (short at the edges, tallest in the middle). The field
// is anchored to the bottom and rises on mount via scaleY(0) → 1 with transform-origin: bottom.
// One inline <svg>, no per-frame work.

import { useEffect, useId, useState } from "react";
import { cn } from "./lib/utils";
import { DIA_VARS, RISE_EASE } from "./palette";

export type Stop = { offset: number; color: string };

/** Bottom (0) → top (1): dark ember → blue → near-white → yellow → red-orange → magenta → transparent pink. */
export const DIA_STOPS: Stop[] = [
  { offset: 0, color: "var(--dia-1)" },
  { offset: 0.1827, color: "var(--dia-2)" },
  { offset: 0.2837, color: "var(--dia-3)" },
  { offset: 0.4135, color: "var(--dia-4)" },
  { offset: 0.5866, color: "var(--dia-5)" },
  { offset: 0.6827, color: "var(--dia-6)" },
  { offset: 0.8029, color: "var(--dia-7)" },
  { offset: 1, color: "var(--dia-8)" },
];

const VBW = 1271;
const VBH = 599;

// Height curve fitted to the Dia footer: a gentle power falloff (flatter, pyramid-like rise).
function bellHeights(n: number, peak: number, valley: number): number[] {
  const mid = (n - 1) / 2;
  return Array.from({ length: n }, (_, i) => {
    const t = mid === 0 ? 0 : Math.abs(i - mid) / mid; // 0 centre → 1 edge
    const eased = 1 - Math.pow(t, 1.24);
    return peak * VBH * (valley + (1 - valley) * eased);
  });
}

export interface DiaGradientProps {
  /** Number of columns. */
  bars?: number;
  /** Gaussian blur, viewBox units. */
  blur?: number;
  /** Tallest column as a fraction of the height (0..1). */
  peak?: number;
  /** Edge column height relative to the peak (0..1). */
  valley?: number;
  stops?: Stop[];
  /** Rise duration, ms. */
  riseMs?: number;
  className?: string;
}

export function DiaGradient({
  bars = 9,
  blur = 15,
  peak = 0.98,
  valley = 0.55,
  stops = DIA_STOPS,
  riseMs = 1100,
  className,
}: DiaGradientProps) {
  const id = `dia${useId().replace(/[^\w-]/g, "")}`;
  const [shown, setShown] = useState(false);
  useEffect(() => {
    let inner = 0;
    const outer = requestAnimationFrame(() => (inner = requestAnimationFrame(() => setShown(true))));
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, []);

  const heights = bellHeights(bars, peak, valley);
  const colW = VBW / bars;

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none size-full origin-bottom will-change-transform", DIA_VARS, className)}
      style={{
        transform: shown ? "scaleY(1)" : "scaleY(0)",
        transition: `transform ${riseMs}ms ${RISE_EASE}`,
      }}
    >
      <svg className="size-full" viewBox={`0 0 ${VBW} ${VBH}`} preserveAspectRatio="none" fill="none">
        <defs>
          {/* objectBoundingBox units: every bar shows the full rainbow over its own height. */}
          <linearGradient id={`${id}g`} x1="0" y1="1" x2="0" y2="0">
            {stops.map((s, i) => (
              <stop key={i} offset={s.offset} style={{ stopColor: s.color }} />
            ))}
          </linearGradient>
          <filter id={`${id}b`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={blur} />
          </filter>
        </defs>
        {heights.map((h, i) => (
          <g key={i} filter={`url(#${id}b)`}>
            <rect x={i * colW} y={VBH - h} width={colW * 1.23} height={h} fill={`url(#${id}g)`} />
          </g>
        ))}
      </svg>
    </div>
  );
}
