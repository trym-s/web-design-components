/**
 * Fine-tune card — Beautiful UI's compact inspector (reference.tsx), styled with shadcn tokens.
 * Number fields scrub: drag the label (1 step per 2 px), ↑/↓/←/→ (⇧ ×10), or type.
 */
import { useRef, useState } from "react";
import { cn } from "./lib/utils";
import "./fine-tune-card.css";

const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";

export type ScrubFieldProps = {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  suffix?: string;
  /** Highlights the field (e.g. when it differs from its baseline). */
  active?: boolean;
};

export function ScrubField({ label, value, onChange, min, max, step = 1, suffix = "", active }: ScrubFieldProps) {
  const drag = useRef<{ x: number; v: number } | null>(null);
  const clamp = (v: number) => Math.min(max, Math.max(min, Math.round(v)));

  return (
    <label
      className={cn(
        "flex h-6.5 min-w-0 items-center gap-1 rounded-sm py-1 pl-0.5 pr-1 transition-[background-color,box-shadow] duration-200",
        active ? "bg-primary/10 ring-1 ring-primary" : "bg-muted",
      )}
    >
      <span
        role="slider"
        aria-label={label}
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        tabIndex={0}
        onPointerDown={(e) => {
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
          drag.current = { x: e.clientX, v: value };
        }}
        onPointerMove={(e) => {
          if (!drag.current) return;
          onChange(clamp(drag.current.v + ((e.clientX - drag.current.x) / 2) * step));
        }}
        onPointerUp={() => (drag.current = null)}
        onKeyDown={(e) => {
          const mult = e.shiftKey ? 10 : 1;
          if (e.key === "ArrowUp" || e.key === "ArrowRight") {
            e.preventDefault();
            onChange(clamp(value + step * mult));
          } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
            e.preventDefault();
            onChange(clamp(value - step * mult));
          }
        }}
        className="flex h-full shrink-0 cursor-ew-resize touch-none select-none items-center rounded-[calc(var(--radius)-6px)] px-0.5 text-[12px] text-muted-foreground hover:text-foreground focus-visible:text-primary focus-visible:outline-none"
      >
        {label}
      </span>
      <input
        inputMode="numeric"
        value={value}
        onChange={(e) => {
          const n = Number(e.target.value.replace(/[^\d-]/g, ""));
          if (!Number.isNaN(n)) onChange(clamp(n));
        }}
        aria-label={`${label} value`}
        className="min-w-0 flex-1 bg-transparent text-[12px] tabular-nums text-foreground outline-none"
      />
      {suffix && <span className="shrink-0 pr-0.5 text-[11.5px] text-muted-foreground">{suffix}</span>}
    </label>
  );
}

export type FineTuneLayout = "row" | "col" | "grid";
export type FineTuneValues = { layout: FineTuneLayout; width: number; height: number; radius: number; opacity: number; type: string | null };

const LAYOUTS: FineTuneLayout[] = ["row", "col", "grid"];

function LayoutIcon({ kind }: { kind: FineTuneLayout }) {
  const dot = "size-1.5 rounded-[calc(var(--radius)-8px)] border-[1.2px] border-current";
  if (kind === "row") return <span className="flex gap-0.5">{[0, 1, 2].map((i) => <span key={i} className={dot} />)}</span>;
  if (kind === "col") return <span className="flex flex-col gap-0.5">{[0, 1].map((i) => <span key={i} className={dot} />)}</span>;
  return <span className="grid grid-cols-2 gap-0.5">{[0, 1, 2, 3].map((i) => <span key={i} className={dot} />)}</span>;
}

export type FineTuneCardProps = {
  title: string;
  /** Baseline: the card shows "Edited" once any value differs from it. */
  defaultValue: FineTuneValues;
  value?: FineTuneValues;
  onValueChange?: (value: FineTuneValues) => void;
  typeOptions: string[];
  typePlaceholder?: string;
  className?: string;
};

export function FineTuneCard({ title, defaultValue, value: valueProp, onValueChange, typeOptions, typePlaceholder = "Select type", className }: FineTuneCardProps) {
  const [inner, setInner] = useState(defaultValue);
  const value = valueProp ?? inner;
  const [menuOpen, setMenuOpen] = useState(false);
  const set = <K extends keyof FineTuneValues>(key: K, v: FineTuneValues[K]) => {
    const next = { ...value, [key]: v };
    setInner(next);
    onValueChange?.(next);
  };
  const changed = (key: keyof FineTuneValues) => value[key] !== defaultValue[key];
  const done = (Object.keys(value) as (keyof FineTuneValues)[]).some(changed);
  const seg = LAYOUTS.indexOf(value.layout);

  return (
    <div
      className={cn(
        "relative w-full max-w-60 rounded-lg bg-card shadow-sm ring-1 ring-border [--success:oklch(0.603_0.155_150.9)] dark:[--success:oklch(0.705_0.154_153.8)]",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-border px-3 py-2.5">
        <span className="text-[13px] font-medium text-foreground">{title}</span>
        {done ? (
          <span className="flex items-center gap-1.5 text-[12px] font-medium text-(--success)" style={{ animation: `pop-in 250ms ${EASE} both` }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            Edited
          </span>
        ) : (
          <span className="flex items-center gap-1.5">
            <span className="flex size-4.5 items-center justify-center rounded-[calc(var(--radius)-5px)] border border-primary/30 bg-primary/10">
              <svg width="9" height="9" viewBox="0 0 24 24" className="fill-primary">
                <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
              </svg>
            </span>
            <span
              className="bg-clip-text text-[12px] font-medium text-transparent"
              style={{
                backgroundImage: "linear-gradient(90deg, var(--primary) 35%, color-mix(in oklab, var(--primary) 45%, transparent) 50%, var(--primary) 65%)",
                backgroundSize: "200% 100%",
                animation: "shimmer-text 1.4s linear infinite",
              }}
            >
              Adjust
            </span>
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 border-b border-border p-3">
        <p className="text-[12.5px] font-medium text-foreground">Layout</p>
        <div className="relative grid grid-cols-3 rounded-md bg-muted p-0.5">
          <span
            aria-hidden
            className="absolute inset-y-0.5 rounded-sm bg-card shadow-xs ring-1 ring-input transition-transform duration-300"
            style={{ width: "calc((100% - 4px) / 3)", left: 2, transform: `translateX(${seg * 100}%)`, transitionTimingFunction: EASE }}
          />
          {LAYOUTS.map((s, i) => (
            <button
              key={s}
              type="button"
              aria-label={`${s} layout`}
              aria-pressed={i === seg}
              onClick={() => set("layout", s)}
              className={cn("relative z-10 flex h-6 items-center justify-center transition-colors duration-200", i === seg ? "text-primary" : "text-muted-foreground")}
            >
              <LayoutIcon kind={s} />
            </button>
          ))}
        </div>
        <div className="grid min-w-0 grid-cols-2 gap-2">
          <ScrubField label="W" value={value.width} onChange={(v) => set("width", v)} min={40} max={999} active={changed("width")} />
          <ScrubField label="H" value={value.height} onChange={(v) => set("height", v)} min={24} max={999} active={changed("height")} />
        </div>
        <div className="grid min-w-0 grid-cols-2 gap-2">
          <ScrubField label="Radius" value={value.radius} onChange={(v) => set("radius", v)} min={0} max={64} active={changed("radius")} />
          <ScrubField label="Opacity" value={value.opacity} onChange={(v) => set("opacity", v)} min={0} max={100} suffix="%" active={changed("opacity")} />
        </div>
      </div>

      <div className="flex items-center justify-between px-3 py-2.5">
        <span className="text-[12px] text-muted-foreground">Type</span>
        <div className="relative -mr-0.5 w-30">
          <button
            type="button"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className={cn(
              "flex h-6.5 w-full items-center justify-between rounded-sm bg-muted py-1 pl-2 pr-1 ring-1 transition-shadow duration-200 focus-visible:outline-none",
              menuOpen ? "ring-primary" : "ring-border",
            )}
          >
            <span className={cn("text-[12px]", value.type ? "text-foreground" : "text-muted-foreground")}>{value.type ?? typePlaceholder}</span>
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              className="stroke-muted-foreground transition-transform duration-200"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transform: menuOpen ? "rotate(180deg)" : "rotate(0)" }}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {menuOpen && (
            <div
              className="absolute bottom-8 right-0 z-10 w-30 rounded-lg bg-card p-1 shadow-sm ring-1 ring-border"
              style={{ animation: `pop-in 200ms ${EASE} both`, transformOrigin: "bottom right" }}
            >
              {typeOptions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    set("type", item);
                    setMenuOpen(false);
                  }}
                  className={cn(
                    "flex h-6.5 w-full items-center rounded-sm px-2 text-left text-[12.5px] text-foreground transition-colors duration-150 hover:bg-muted",
                    item === value.type && "bg-muted",
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
