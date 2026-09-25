/**
 * Insight cards — Beautiful UI's paged agent insights (reference.tsx), styled with shadcn tokens.
 * The upstream `liveline` canvas charts are replaced by `SnapshotChart` (plain SVG).
 */
import { useState, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import { cn } from "./lib/utils";
import { SnapshotChart } from "./snapshot-chart";

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
/** `--success` / `--warning` status hues, declared once on each root with the upstream values. */
const STATUS_VARS =
  "[--success:oklch(0.603_0.155_150.9)] [--warning:oklch(0.689_0.179_49.9)] dark:[--success:oklch(0.705_0.154_153.8)] dark:[--warning:oklch(0.746_0.156_55.6)]";

/* ── inline prose pieces ─────────────────────────────────── */

/** Inline `@entity` mention with a coloured dot (`color`: any CSS colour). */
export function Entity({ name, color = "var(--warning)" }: { name: string; color?: string }) {
  return (
    <span className="inline-flex items-center gap-1 align-baseline font-medium text-foreground">
      <span className="inline-block size-2.5 rounded-full" style={{ background: color }} />@{name}
    </span>
  );
}

/** Monospace figure: `negative` → destructive, `positive` → `--success`. */
export function Mono({ children, tone }: { children: ReactNode; tone: "negative" | "positive" }) {
  return <code className={cn("font-mono text-[11.5px]", tone === "negative" ? "text-destructive" : "text-(--success)")}>{children}</code>;
}

/* ── chart stage: pointer scrub, cursor line, tooltip ────── */

type TooltipRow = { label: string; value: string; color: string };

function ChartStage({ count, children, rows, time, onIndexChange }: { count: number; children: ReactNode; rows: (i: number) => TooltipRow[]; time: string; onIndexChange?: (i: number | null) => void }) {
  const [index, setIndexState] = useState<number | null>(null);
  const setIndex = (i: number | null) => {
    setIndexState(i);
    onIndexChange?.(i);
  };
  const track = (e: PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const p = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setIndex(Math.round(p * (count - 1)));
  };
  const clear = () => setIndex(null);
  const pct = index === null ? 0 : (index / (count - 1)) * 100;
  return (
    <div
      className="relative h-[166px] touch-pan-y overflow-hidden"
      onPointerDown={track}
      onPointerMove={track}
      onPointerLeave={clear}
      onPointerCancel={clear}
      onPointerUp={clear}
    >
      {children}
      {index !== null && (
        <>
          <span className="pointer-events-none absolute inset-y-0 z-4 w-px bg-foreground opacity-26" style={{ left: `${pct}%` }} />
          <span className="pointer-events-none absolute top-2 z-5 -translate-x-1/2" style={{ left: `${Math.min(Math.max(pct, 28), 72)}%` }}>
            <div className="min-w-[154px] rounded-lg border border-foreground bg-foreground px-2.5 py-[9px] text-[12px] text-background shadow-lg">
              <span className="mb-[7px] block text-[11px] text-background/70">{time}</span>
              {rows(index).map((row) => (
                <div key={row.label} className="flex items-center justify-between gap-4 leading-[1.65]">
                  <span className="inline-flex items-center gap-[7px] text-background">
                    <span className="size-2 flex-[0_0_8px] rounded-full" style={{ background: row.color }} />
                    {row.label}
                  </span>
                  <strong className="font-medium tabular-nums text-background/70">{row.value}</strong>
                </div>
              ))}
            </div>
          </span>
        </>
      )}
    </div>
  );
}

const CARD = cn("min-h-[278px] rounded-lg bg-card p-3 ring-1 ring-border", STATUS_VARS);
const INSET = "mt-2 overflow-hidden rounded-md bg-muted ring-1 ring-border";
const BADGE = "rounded-full bg-foreground/8 px-2 py-0.5 text-[10.5px] font-medium text-muted-foreground";

/* ── 1. comparison ───────────────────────────────────────── */

export type CompareSeries = {
  id: string;
  name: string;
  values: number[];
  /** Mono caption under the delta, e.g. "-$2,377.66". */
  sub: string;
  tone: "negative" | "positive";
  /** Any CSS colour. */
  color: string;
};

export type CompareCardProps = {
  series: CompareSeries[];
  formatValue: (v: number) => string;
  caption?: string;
  badge?: string;
  tooltipTime?: string;
};

export function CompareCard({ series, formatValue, caption = "Trend snapshot", badge = "Snapshot", tooltipTime = "Today, 12:00" }: CompareCardProps) {
  return (
    <div className={CARD}>
      <div className="flex items-center gap-4">
        {series.map((s) => (
          <div key={s.id} className="flex-1">
            <span className="flex items-center gap-1.5 text-[11.5px] text-muted-foreground">
              <span className="size-2 rounded-full" style={{ background: s.color }} />
              {s.name}
            </span>
            <span className={cn("block text-[17px] font-semibold tracking-[-0.01em] tabular-nums", s.tone === "negative" ? "text-destructive" : "text-(--success)")}>
              {formatValue(s.values[s.values.length - 1])}
            </span>
            <Mono tone={s.tone}>{s.sub}</Mono>
          </div>
        ))}
      </div>
      <div className={INSET}>
        <div className="flex items-center justify-between border-b border-border px-2.5 py-1.5">
          <span className="text-[11px] tabular-nums text-muted-foreground">{caption}</span>
          <span className={BADGE}>{badge}</span>
        </div>
        <ChartStage
          count={series[0]?.values.length ?? 0}
          time={tooltipTime}
          rows={(i) => series.map((s) => ({ label: s.name, value: formatValue(s.values[i]), color: s.color }))}
        >
          <SnapshotChart series={series} legend padding={{ top: 24, bottom: 22 }} />
        </ChartStage>
      </div>
    </div>
  );
}

/* ── 2. anomaly ──────────────────────────────────────────── */

export type AnomalyMetric = { key: string; label: string; values: number[]; format: (v: number) => string; /** Shown when not scrubbing, e.g. "$2,112 threshold". */ threshold: string };

export type AnomalyCardProps = {
  title: string;
  metrics: AnomalyMetric[];
  defaultMetric?: string;
  onMetricChange?: (key: string) => void;
  /** Summary line under the chart. */
  total: string;
  delta: string;
  comparison: string;
  badge?: string;
  tooltipTime?: string;
  /** Any CSS colour; defaults to `--destructive`. */
  color?: string;
};

export function AnomalyCard({
  title,
  metrics,
  defaultMetric = metrics[0]?.key,
  onMetricChange,
  total,
  delta,
  comparison,
  badge = "Snapshot",
  tooltipTime = "Today, 12:00",
  color = "var(--destructive)",
}: AnomalyCardProps) {
  const [key, setKey] = useState(defaultMetric);
  const [scrub, setScrub] = useState<number | null>(null);
  const metric = metrics.find((m) => m.key === key) ?? metrics[0];
  const select = (k: string) => {
    setKey(k);
    onMetricChange?.(k);
  };

  return (
    <div className={CARD}>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[12px] font-medium text-foreground">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="stroke-destructive" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
          {title}
        </span>
        <span className={BADGE}>{badge}</span>
      </div>
      <div className={INSET}>
        <div className="flex items-center justify-between border-b border-border px-2.5 py-1.5">
          <span className="text-[11px] tabular-nums text-muted-foreground">{scrub !== null ? metric.format(metric.values[scrub]) : metric.threshold}</span>
          <span className="flex rounded-full bg-foreground/8 p-0.5">
            {metrics.map((m) => (
              <button
                key={m.key}
                type="button"
                aria-pressed={m.key === metric.key}
                onClick={() => select(m.key)}
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10.5px] font-medium transition-[background-color,color,box-shadow,transform] duration-150 active:scale-[0.96]",
                  m.key === metric.key ? "bg-card text-foreground shadow-xs ring-1 ring-input" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {m.label}
              </button>
            ))}
          </span>
        </div>
        <ChartStage count={metric.values.length} time={tooltipTime} onIndexChange={setScrub} rows={(i) => [{ label: metric.label, value: metric.format(metric.values[i]), color }]}>
          <SnapshotChart series={[{ id: metric.key, values: metric.values, color }]} grid padding={{ top: 18, bottom: 22 }} />
        </ChartStage>
      </div>
      <div className="mt-1.5 flex items-baseline gap-2">
        <span className="text-[17px] font-semibold tracking-[-0.01em] tabular-nums text-foreground">{total}</span>
        <Mono tone="negative">{delta}</Mono>
        <span className="text-[11px] text-muted-foreground">{comparison}</span>
      </div>
    </div>
  );
}

/* ── 3. allocation ───────────────────────────────────────── */

export type AllocationSegment = {
  name: string;
  label: string;
  pct: number;
  amount: string;
  /** `accent` → `--warning`, `strong` → `input`, `subtle` → `border`. */
  tone: "accent" | "strong" | "subtle";
};

const SEGMENT_FILL = { accent: "bg-(--warning)", strong: "bg-input", subtle: "bg-border" } as const;
const SEGMENT_TEXT = { accent: "text-(--warning)", strong: "text-muted-foreground", subtle: "text-muted-foreground" } as const;

export type AllocationCardProps = {
  title: string;
  /** Letter in the round badge before the title. */
  mark: string;
  segments: AllocationSegment[];
  description: string;
  defaultSelected?: string;
  onSelectedChange?: (name: string) => void;
};

export function AllocationCard({ title, mark, segments, description, defaultSelected = segments[0]?.name, onSelectedChange }: AllocationCardProps) {
  const [selected, setSelected] = useState(defaultSelected);
  const active = segments.find((s) => s.name === selected) ?? segments[0];
  const select = (name: string) => {
    setSelected(name);
    onSelectedChange?.(name);
  };

  return (
    <div className={cn(CARD, "[--allocation-ring:oklch(1_0_0/0.22)] [--allocation-sheen:oklch(1_0_0/0.2)]")}>
      <span className="flex items-center gap-1.5 text-[12px] font-medium text-foreground">
        <span className="flex size-3.5 items-center justify-center rounded-full bg-(--warning) text-[8px] font-bold text-white">{mark}</span>
        {title}
      </span>
      <span className="mt-1 block text-[20px] font-semibold tracking-[-0.01em] tabular-nums text-foreground">{active.amount}</span>
      <div className="mt-3 flex h-9 gap-0.5 overflow-hidden rounded-full bg-muted p-0.5" role="group" aria-label="Allocation segments">
        {segments.map((s) => {
          const on = selected === s.name;
          return (
            <button
              key={s.name}
              type="button"
              aria-pressed={on}
              aria-label={`${s.label}: ${s.pct}%`}
              onClick={() => select(s.name)}
              className={cn("relative h-full overflow-hidden rounded-full transition-[opacity,transform,box-shadow] duration-300 active:scale-[0.98]", SEGMENT_FILL[s.tone], on && "shadow-[inset_0_0_0_1px_var(--allocation-ring)]")}
              style={{ width: `${s.pct}%`, opacity: on ? 1 : 0.58, transitionTimingFunction: EASE }}
            >
              <span
                className="absolute inset-y-1 left-1 rounded-full bg-(--allocation-sheen) transition-[width,opacity] duration-500"
                style={{ width: on ? "calc(100% - 8px)" : "0%", opacity: on ? 1 : 0, transitionTimingFunction: EASE }}
              />
            </button>
          );
        })}
      </div>
      <div className="mt-2 flex items-center gap-1.5">
        {segments.map((s) => (
          <button
            key={s.name}
            type="button"
            aria-pressed={selected === s.name}
            onClick={() => select(s.name)}
            className={cn(
              "flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[11px] transition-[background-color,color,transform] duration-150 active:scale-[0.96]",
              selected === s.name ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground",
            )}
          >
            <span className={cn("size-1.5 rounded-full", SEGMENT_FILL[s.tone])} />
            {s.name} <span className="tabular-nums">{s.pct}%</span>
          </button>
        ))}
      </div>
      <div className="mt-3 min-h-16 rounded-md bg-muted px-2.5 py-2 ring-1 ring-border">
        <span className={cn("block text-[11.5px] font-medium", SEGMENT_TEXT[active.tone])}>{active.label}</span>
        <span className="mt-1 block text-[11px] leading-relaxed text-muted-foreground">{description}</span>
      </div>
    </div>
  );
}

/* ── pager ───────────────────────────────────────────────── */

export type InsightPage = { key: string; prose: ReactNode; card: ReactNode; /** Follow-up suggestion. */ pill: string };

export type InsightCardsProps = {
  pages: InsightPage[];
  title?: string;
  defaultPage?: number;
  onPageChange?: (page: number) => void;
  onPillClick?: (page: InsightPage) => void;
  className?: string;
  style?: CSSProperties;
};

export function InsightCards({ pages, title = "Insights", defaultPage = 0, onPageChange, onPillClick, className, style }: InsightCardsProps) {
  const [page, setPage] = useState(defaultPage);
  const move = (dir: -1 | 1) => {
    const next = (page + dir + pages.length) % pages.length;
    setPage(next);
    onPageChange?.(next);
  };
  const current = pages[page];

  return (
    <div className={cn("min-h-[408px] w-full max-w-86", STATUS_VARS, className)} style={style}>
      <div className="flex items-center justify-between">
        <span className="flex items-baseline gap-1.5">
          <span className="text-[13px] font-semibold text-foreground">{title}</span>
          <span className="text-[13px] tabular-nums text-muted-foreground">{pages.length}</span>
        </span>
        <span className="flex items-center gap-0.5">
          {(["M15 18l-6-6 6-6", "M9 6l6 6-6 6"] as const).map((d, i) => (
            <button
              key={d}
              type="button"
              aria-label={i === 0 ? "Previous insight" : "Next insight"}
              onClick={() => move(i === 0 ? -1 : 1)}
              className="flex size-6 items-center justify-center rounded-sm text-muted-foreground transition-[background-color,color,transform] duration-100 hover:bg-accent hover:text-foreground active:scale-[0.96]"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d={d} />
              </svg>
            </button>
          ))}
        </span>
      </div>
      <div key={current.key}>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted-foreground">{current.prose}</p>
        <div className="mt-2">{current.card}</div>
        <button
          type="button"
          onClick={() => onPillClick?.(current)}
          className="mt-2 rounded-full bg-card px-3 py-1.5 text-left text-[12px] text-foreground shadow-xs ring-1 ring-input transition-colors duration-100 hover:bg-accent"
        >
          {current.pill}
        </button>
      </div>
    </div>
  );
}
