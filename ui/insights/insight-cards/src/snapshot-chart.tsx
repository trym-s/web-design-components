/**
 * Snapshot chart — a static SVG stand-in for the paused `liveline` canvas the upstream card uses:
 * monotone cubic spline, a dashed line at each series' latest value (series colour at 40 %), a dot at the
 * tip, optional dotted value grid, and a 40 px fade at the left edge. No chart package.
 */
import { useLayoutEffect, useRef, useState } from "react";

export type SnapshotSeries = { id: string; values: number[]; /** Any CSS colour, e.g. `var(--primary)`. */ color: string };

export type SnapshotChartProps = {
  series: SnapshotSeries[];
  grid?: boolean;
  lineWidth?: number;
  padding?: { top: number; bottom: number };
  /** Multi-series legend chips (dot only), top-left. */
  legend?: boolean;
};

/** Liveline's range: min/max of every value with a 12 % margin (or a minimum span of 10 % / 0.4). */
function range(values: number[]) {
  let min = Math.min(...values);
  let max = Math.max(...values);
  const raw = max - min;
  const minRange = raw * 0.1 || 0.4;
  if (raw < minRange) {
    const mid = (min + max) / 2;
    return { min: mid - minRange / 2, max: mid + minRange / 2 };
  }
  min -= raw * 0.12;
  max += raw * 0.12;
  return { min, max };
}

/** Fritsch–Carlson monotone cubic, as Bézier segments (liveline's `drawSpline`). */
function splinePath(pts: [number, number][]) {
  const n = pts.length;
  if (n < 2) return "";
  let d = `M${pts[0][0]},${pts[0][1]}`;
  if (n === 2) return `${d}L${pts[1][0]},${pts[1][1]}`;
  const h: number[] = [];
  const delta: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    h[i] = pts[i + 1][0] - pts[i][0];
    delta[i] = h[i] === 0 ? 0 : (pts[i + 1][1] - pts[i][1]) / h[i];
  }
  const m: number[] = [delta[0]];
  for (let i = 1; i < n - 1; i++) m[i] = delta[i - 1] * delta[i] <= 0 ? 0 : (delta[i - 1] + delta[i]) / 2;
  m[n - 1] = delta[n - 2];
  for (let i = 0; i < n - 1; i++) {
    if (delta[i] === 0) {
      m[i] = 0;
      m[i + 1] = 0;
    } else {
      const a = m[i] / delta[i];
      const b = m[i + 1] / delta[i];
      const s2 = a * a + b * b;
      if (s2 > 9) {
        const s = 3 / Math.sqrt(s2);
        m[i] = s * a * delta[i];
        m[i + 1] = s * b * delta[i];
      }
    }
  }
  for (let i = 0; i < n - 1; i++) {
    const hi = h[i];
    d += `C${pts[i][0] + hi / 3},${pts[i][1] + (m[i] * hi) / 3} ${pts[i + 1][0] - hi / 3},${pts[i + 1][1] - (m[i + 1] * hi) / 3} ${pts[i + 1][0]},${pts[i + 1][1]}`;
  }
  return d;
}

/** Nice grid step ≥ 36 px (1 / 2 / 2.5 / 5 × 10^k). */
function gridStep(span: number, px: number) {
  const raw = (span * 36) / px;
  const pow = 10 ** Math.floor(Math.log10(raw));
  return [1, 2, 2.5, 5, 10].map((f) => f * pow).find((s) => s >= raw) ?? raw;
}

export function SnapshotChart({ series, grid = false, lineWidth = 2.25, padding = { top: 24, bottom: 22 }, legend = false }: SnapshotChartProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { w, h } = size;
  const chartH = h - padding.top - padding.bottom;
  const { min, max } = range(series.flatMap((s) => s.values));
  const toY = (v: number) => padding.top + ((max - v) / (max - min)) * chartH;
  const clampY = (y: number) => Math.max(padding.top, Math.min(h - padding.bottom, y));
  const chartW = w * 0.985;
  const multi = series.length > 1;

  const lines: number[] = [];
  if (grid && chartH > 0) {
    const step = gridStep(max - min, chartH);
    for (let v = Math.ceil(min / step) * step; v <= max; v += step) lines.push(v);
  }

  return (
    <div ref={ref} className="absolute inset-0">
      {w > 0 && chartH > 0 && (
        <svg width={w} height={h} className="block [mask-image:linear-gradient(to_right,transparent,currentColor_40px)]" aria-hidden="true">
          {lines.map((v) => {
            const y = toY(v);
            const edge = Math.min(y - padding.top, h - padding.bottom - y);
            return (
              <line
                key={v}
                x1={0}
                x2={w}
                y1={y}
                y2={y}
                className="stroke-foreground/6"
                strokeDasharray="1 3"
                opacity={Math.max(0, Math.min(1, edge / 32))}
              />
            );
          })}
          {series.map((s) => {
            const pts = s.values.map((v, i) => [(i / (s.values.length - 1)) * chartW, clampY(toY(v))] as [number, number]);
            const tip = pts[pts.length - 1];
            return (
              <g key={s.id}>
                <line x1={0} x2={w} y1={tip[1]} y2={tip[1]} stroke={s.color} strokeOpacity={0.4} strokeDasharray="4 4" />
                <path d={splinePath(pts)} fill="none" stroke={s.color} strokeWidth={lineWidth} strokeLinecap="round" strokeLinejoin="round" />
                {multi ? (
                  <circle cx={tip[0]} cy={tip[1]} r={3} fill={s.color} />
                ) : (
                  <>
                    <circle cx={tip[0]} cy={tip[1] + 1} r={6.5} className="fill-card drop-shadow-sm" />
                    <circle cx={tip[0]} cy={tip[1]} r={3.5} fill={s.color} />
                  </>
                )}
              </g>
            );
          })}
        </svg>
      )}
      {legend && multi && (
        <div className="absolute left-1 top-1 flex gap-1">
          {series.map((s) => (
            <span key={s.id} className="flex h-3.5 w-5 items-center justify-center rounded-full bg-foreground/8">
              <span className="size-1.5 rounded-full" style={{ background: s.color }} />
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
