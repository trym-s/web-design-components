import { cn } from "./lib/utils";
import "./work-loader.css";

/* ─────────────────────────────────────────────────────────
 * LOADING STATE — pixel-grid loader for long-running work
 *
 *   drive  square cells, chevron wavefront driving right; the
 *          650 ms cycle is shorter than the sweep, so two fronts
 *          are always in flight
 *   dots   same wavefront, circular cells
 *   orbit  a comet lapping the grid perimeter
 *
 * Paired with a shimmering label and an elapsed timer in mono
 * tabular figures. Reduced motion freezes the grid to its dim state.
 * ───────────────────────────────────────────────────────── */

export type WorkLoaderVariant = "drive" | "dots" | "orbit";

const chevron = Array.from({ length: 9 }, (_, i) => {
  const r = Math.floor(i / 3), c = i % 3;
  return (c + Math.abs(r - 1)) * 90;
});

const ORBIT_ORDER = [0, 1, 2, 5, 8, 7, 6, 3];
const orbit = Array.from({ length: 9 }, (_, i) => {
  const k = ORBIT_ORDER.indexOf(i);
  return k === -1 ? null : k * 110;
});

const PATTERNS: Record<WorkLoaderVariant, { delays: (number | null)[]; dur: number; round: boolean }> = {
  drive: { delays: chevron, dur: 650, round: false },
  dots: { delays: chevron, dur: 650, round: true },
  orbit: { delays: orbit, dur: 950, round: false },
};

/** 12.3 → "12.3s", 75.4 → "1m 15.4s". */
export function formatElapsed(seconds: number) {
  if (seconds < 60) return `${seconds.toFixed(1)}s`;
  return `${Math.floor(seconds / 60)}m ${(seconds % 60).toFixed(1)}s`;
}

export function WorkLoader({
  label = "Churning",
  variant = "drive",
  elapsed,
  className,
}: {
  label?: string;
  variant?: WorkLoaderVariant;
  /** Seconds since the work started; omit to hide the timer. */
  elapsed?: number;
  className?: string;
}) {
  const { delays, dur, round } = PATTERNS[variant];

  return (
    <div role="status" className={cn("flex w-fit items-center gap-2.5", className)}>
      <span aria-hidden className="grid grid-cols-[repeat(3,4px)] gap-[1.5px]">
        {delays.map((d, i) => (
          <span
            key={i}
            className={cn("work-loader-cell size-[4px] bg-foreground", round ? "rounded-full" : "rounded-[calc(var(--radius)-9px)]")}
            style={{
              opacity: d === null ? 0.07 : 0.15,
              animation: d === null ? "none" : `pixel-on ${dur}ms ease-in-out ${d}ms infinite`,
            }}
          />
        ))}
      </span>
      <span
        className="bg-clip-text text-[13px] font-medium text-transparent"
        style={{
          backgroundImage: "linear-gradient(90deg, var(--muted-foreground) 35%, var(--foreground) 50%, var(--muted-foreground) 65%)",
          backgroundSize: "200% 100%",
          animation: "shimmer-text 1.4s linear infinite",
        }}
      >
        {label}
      </span>
      {elapsed !== undefined && (
        <span className="font-mono text-[12px] text-muted-foreground tabular-nums">{formatElapsed(elapsed)}</span>
      )}
    </div>
  );
}
