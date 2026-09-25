import { useState, type ReactNode } from "react";
import { cn } from "./lib/utils";
import "./recommendation-card.css";

/* ─────────────────────────────────────────────────────────
 * RECOMMENDATION CARD
 * The card holds its shape. "Alternatives" opens a drawer
 * listing the other options; picking one promotes it to the
 * recommendation. The primary action confirms.
 * ───────────────────────────────────────────────────────── */

export type RecommendationOption = {
  key: string;
  body: ReactNode;
  /** One-line summary shown in the alternatives drawer. */
  short: string;
  /** Filled bars of the three-bar meter (0–3). */
  signal: number;
  tone: "success" | "warning" | "muted";
  label: string;
  cta: string;
  /** `primary` = `--primary` fill; `foreground` = `--foreground` fill. */
  ctaVariant?: "primary" | "foreground";
};

const TONE = {
  success: "bg-(--success)",
  warning: "bg-(--warning)",
  muted: "bg-muted-foreground",
} as const;

function Meter({ signal, tone }: { signal: number; tone: RecommendationOption["tone"] }) {
  return (
    <span className="flex items-end gap-0.5">
      {[0, 1, 2].map((bar) => (
        <span
          key={bar}
          className={cn("h-2.5 w-1 rounded-full transition-colors duration-300", bar < signal ? TONE[tone] : "bg-input")}
        />
      ))}
    </span>
  );
}

export function RecommendationCard({
  title,
  options,
  defaultSelected = 0,
  onSelect,
  onAccept,
  alternativesLabel = "Alternatives",
  acceptedLabel = "Accepted",
  className,
}: {
  title: ReactNode;
  options: RecommendationOption[];
  defaultSelected?: number;
  onSelect?: (option: RecommendationOption) => void;
  onAccept?: (option: RecommendationOption) => void;
  alternativesLabel?: string;
  acceptedLabel?: string;
  className?: string;
}) {
  const [selected, setSelected] = useState(defaultSelected);
  const [open, setOpen] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const active = options[selected];
  const others = options.map((o, i) => ({ o, i })).filter(({ i }) => i !== selected);

  return (
    <div
      className={cn(
        "w-full max-w-95 overflow-hidden rounded-lg bg-card shadow-xs ring-1 ring-border",
        "[--success:oklch(0.603_0.155_150.9)] dark:[--success:oklch(0.705_0.154_153.8)]",
        "[--warning:oklch(0.689_0.179_49.9)] dark:[--warning:oklch(0.746_0.156_55.6)]",
        "[--recommendation-card-shadow:inset_0_1px_0_oklch(1_0_0/0.14),0_0_0_1px_oklch(0.21_0.034_263.4/0.12),0_1px_2px_oklch(0.21_0.034_263.4/0.1)]",
        className,
      )}
    >
      <div className="p-3">
        <span className="text-[13px] font-semibold text-foreground">{title}</span>
        <p
          key={active.key}
          className="mt-1.5 min-h-12 text-[13px] leading-relaxed text-muted-foreground"
          style={{ animation: "fade-in 180ms ease-out both" }}
        >
          {active.body}
        </p>
      </div>

      {/* alternatives drawer — a distinctly new section of the card */}
      <div
        className="grid transition-[grid-template-rows,opacity] duration-300"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          opacity: open ? 1 : 0,
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="overflow-hidden">
          <div className="border-t border-border bg-muted px-2 py-2">
            <p className="px-1.5 pb-1 text-[11px] font-medium text-muted-foreground">Other options</p>
            {others.map(({ o, i }) => (
              <button
                key={o.key}
                type="button"
                tabIndex={open ? undefined : -1}
                onClick={() => {
                  setSelected(i);
                  setAccepted(false);
                  setOpen(false);
                  onSelect?.(o);
                }}
                className="flex w-full items-center gap-2.5 rounded-md px-1.5 py-1.5 text-left transition-colors duration-100 hover:bg-accent"
              >
                <Meter signal={o.signal} tone={o.tone} />
                <span className="min-w-0 flex-1 truncate text-[12.5px] text-foreground">{o.short}</span>
                <span className="shrink-0 text-[11px] text-muted-foreground">{o.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-border bg-muted px-3 py-2.5">
        <span className="flex items-center gap-2">
          <Meter signal={active.signal} tone={active.tone} />
          <span className="text-[12.5px] font-medium text-muted-foreground">{active.label}</span>
        </span>

        <span className="-mr-0.5 flex items-center gap-2">
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((current) => !current)}
            className={cn(
              "h-7 rounded-md px-2.5 text-[12.5px] font-medium text-foreground shadow-xs ring-1 ring-input transition-[background-color,transform] duration-100 active:scale-[0.96]",
              open ? "bg-accent" : "bg-card hover:bg-accent",
            )}
          >
            {alternativesLabel}
          </button>
          <button
            type="button"
            onClick={() => {
              setAccepted(true);
              onAccept?.(active);
            }}
            className={cn(
              "h-7 rounded-md px-3 text-[12.5px] font-medium shadow-(--recommendation-card-shadow) transition-[background-color,transform] duration-150 active:scale-[0.96]",
              accepted
                ? "bg-(--success) text-white"
                : active.ctaVariant === "primary"
                  ? "bg-primary text-primary-foreground"
                  : "bg-foreground text-muted",
            )}
          >
            {accepted ? acceptedLabel : active.cta}
          </button>
        </span>
      </div>
    </div>
  );
}
