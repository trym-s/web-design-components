/**
 * Filter table — Beautiful UI's status-chip task table (reference.tsx), styled with shadcn tokens.
 * The three status hues are declared on the root (`--filter-todo`, `--filter-progress`, `--filter-done`)
 * with the upstream values; pass any CSS colour as a status `color` to rebrand.
 */
import { useState } from "react";
import { cn } from "./lib/utils";

export type FilterStatus = { value: string; label: string; /** CSS colour, e.g. `var(--filter-todo)`. */ color: string };
export type FilterRow = { id: string; task: string; date: string; status: string; owner: string };

export type FilterTableProps = {
  statuses: FilterStatus[];
  rows: FilterRow[];
  /** Header labels: task, date, status, owner. */
  columns?: [string, string, string, string];
  allLabel?: string;
  /** `"all"` or a status value. */
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
};

const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";
const COLS = "grid grid-cols-[1.3fr_0.6fr_0.95fr_0.9fr]";

export function FilterTable({
  statuses,
  rows,
  columns = ["Task name", "Date", "Status", "Advisor"],
  allLabel = "All",
  value,
  defaultValue = "all",
  onValueChange,
  className,
}: FilterTableProps) {
  const [inner, setInner] = useState(defaultValue);
  const filter = value ?? inner;
  const select = (v: string) => {
    setInner(v);
    onValueChange?.(v);
  };
  const chips = [
    { value: "all", label: allLabel, color: undefined as string | undefined, count: rows.length },
    ...statuses.map((s) => ({ ...s, count: rows.filter((r) => r.status === s.value).length })),
  ];
  const byValue = Object.fromEntries(statuses.map((s) => [s.value, s]));

  return (
    <div
      className={cn(
        "w-full max-w-105 [--filter-done:oklch(0.652_0.131_162.9)] [--filter-progress:oklch(0.671_0.118_219.4)] [--filter-todo:oklch(0.757_0.153_66.4)]",
        className,
      )}
    >
      <div className="-mx-1 mb-1 flex items-center gap-1 overflow-x-auto px-1 py-1 [scrollbar-width:none]">
        {chips.map((f) => {
          const active = filter === f.value;
          return (
            <button
              key={f.value}
              type="button"
              aria-pressed={active}
              onClick={() => select(f.value)}
              className={cn(
                "flex h-6.5 shrink-0 items-center gap-1.5 rounded-full px-2.5 text-[12px] font-medium transition-[background-color,box-shadow,color] duration-200",
                active ? "bg-card text-foreground shadow-xs ring-1 ring-input" : "text-muted-foreground hover:bg-accent",
              )}
            >
              {f.color && <span className="size-1.5 rounded-full" style={{ background: f.color }} />}
              {f.label}
              <span
                className={cn(
                  "rounded-[calc(var(--radius)-6px)] px-1 text-[10.5px] tabular-nums",
                  active ? "bg-muted text-muted-foreground" : "text-muted-foreground",
                )}
              >
                {f.count}
              </span>
            </button>
          );
        })}
      </div>

      <div
        aria-label="Scrollable task table"
        className="overflow-x-auto rounded-lg bg-card shadow-xs ring-1 ring-border [scrollbar-width:none]"
        role="region"
        tabIndex={0}
      >
        <div className="min-w-[420px]">
          <div className={cn(COLS, "border-b border-border px-3 py-2 text-[11.5px] font-medium text-muted-foreground")}>
            {columns.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
          {rows.map((row) => {
            const shown = filter === "all" || row.status === filter;
            const status = byValue[row.status];
            return (
              <div
                key={row.id}
                className="grid transition-[grid-template-rows,opacity] duration-300"
                style={{ gridTemplateRows: shown ? "1fr" : "0fr", opacity: shown ? 1 : 0, transitionTimingFunction: EASE }}
              >
                <div className="overflow-hidden">
                  <div
                    className={cn(
                      COLS,
                      "items-center border-b border-border px-3 py-2 text-[12px] transition-colors duration-100 last:border-0 hover:bg-accent",
                    )}
                  >
                    <span className="truncate font-medium text-foreground">{row.task}</span>
                    <span className="tabular-nums text-muted-foreground">{row.date}</span>
                    <span>
                      {status && (
                        <span
                          className="inline-flex h-5 items-center rounded-[calc(var(--radius)-5px)] border px-1.5 text-[11px] font-medium"
                          style={{
                            color: `color-mix(in srgb, ${status.color} 92%, var(--foreground))`,
                            background: `color-mix(in srgb, ${status.color} 20%, var(--card))`,
                            borderColor: `color-mix(in srgb, ${status.color} 34%, var(--card))`,
                          }}
                        >
                          {status.label}
                        </span>
                      )}
                    </span>
                    <span className="truncate text-muted-foreground">{row.owner}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
