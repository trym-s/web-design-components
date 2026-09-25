/**
 * Diff table — Beautiful UI's AI-proposed table edit (reference.tsx), styled with shadcn tokens.
 * Removed rows tint `destructive`; added rows tint `--success` (declared on the root).
 */
import { cn } from "./lib/utils";

export type DiffTone = "primary" | "muted" | "warning" | "success";

export type DiffRow = {
  id: string;
  /** First column, medium weight. */
  name: string;
  /** Second column: a pill with a coloured dot. */
  tag: { label: string; tone: DiffTone };
  /** Third column. */
  detail: string;
  /** `removed` rows strike through once `showRemovals`; `added` rows expand in once `showAdditions`. */
  change?: "removed" | "added";
};

export type DiffTableProps = {
  title: string;
  columns: [string, string, string];
  rows: DiffRow[];
  showRemovals?: boolean;
  showAdditions?: boolean;
  className?: string;
};

const DOT: Record<DiffTone, string> = {
  primary: "bg-primary",
  muted: "bg-muted-foreground",
  warning: "bg-(--warning)",
  success: "bg-(--success)",
};

const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";

export function DiffTable({ title, columns, rows, showRemovals = false, showAdditions = false, className }: DiffTableProps) {
  const current = rows.filter((r) => r.change !== "added");
  const added = rows.filter((r) => r.change === "added");

  return (
    <div
      className={cn(
        "w-full max-w-95 [--success:oklch(0.603_0.155_150.9)] [--warning:oklch(0.689_0.179_49.9)] dark:[--success:oklch(0.705_0.154_153.8)] dark:[--warning:oklch(0.746_0.156_55.6)]",
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-lg bg-card shadow-xs ring-1 ring-border">
        <div className="flex items-center justify-between border-b border-border px-3 py-2.5">
          <span className="text-[12.5px] font-medium text-foreground">{title}</span>
        </div>

        <table className="w-full table-fixed border-collapse text-left">
          <colgroup>
            <col className="w-[34%]" />
            <col className="w-[30%]" />
            <col className="w-[36%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-border">
              {columns.map((h) => (
                <th key={h} className="px-3 py-2.5 text-[12px] font-medium text-muted-foreground">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {current.map((row) => {
              const out = row.change === "removed" && showRemovals;
              return (
                <tr
                  key={row.id}
                  className={cn(
                    "border-b border-border transition-colors duration-400 last:border-0",
                    out ? "bg-destructive/10" : "hover:bg-accent",
                  )}
                >
                  <td
                    className={cn(
                      "px-3 py-2.5 text-[13px] font-medium tabular-nums transition-colors duration-400",
                      out ? "text-destructive" : "text-foreground",
                    )}
                  >
                    {row.name}
                  </td>
                  <td className="px-3 py-2.5">
                    <span
                      className="inline-flex h-5.5 items-center gap-1.5 rounded-full bg-muted px-2 text-[11.5px] font-medium ring-1 ring-border transition-opacity duration-400"
                      style={{ opacity: out ? 0.55 : 1 }}
                    >
                      <span className={cn("size-1.5 rounded-full", DOT[row.tag.tone])} />
                      <span className="text-muted-foreground">{row.tag.label}</span>
                    </span>
                  </td>
                  <td
                    className={cn(
                      "whitespace-nowrap px-3 py-2.5 text-[12.5px] decoration-destructive/50 transition-colors duration-400",
                      out ? "text-destructive line-through" : "text-muted-foreground",
                    )}
                  >
                    {row.detail}
                  </td>
                </tr>
              );
            })}
            {added.map((row) => (
              <tr key={row.id}>
                <td colSpan={3} className="p-0">
                  <div
                    className="grid transition-[grid-template-rows,opacity] duration-400"
                    style={{
                      gridTemplateRows: showAdditions ? "1fr" : "0fr",
                      opacity: showAdditions ? 1 : 0,
                      transitionTimingFunction: EASE,
                    }}
                  >
                    <div className="overflow-hidden bg-(--success)/12">
                      <div className="grid grid-cols-[34%_30%_36%] items-center border-t border-border">
                        <span className="px-3 py-2.5 text-[13px] font-medium tabular-nums text-(--success)">{row.name}</span>
                        <span className="px-3 py-2.5">
                          <span className="inline-flex h-5.5 items-center gap-1.5 rounded-full bg-card px-2 text-[11.5px] font-medium ring-1 ring-border">
                            <span className={cn("size-1.5 rounded-full", DOT[row.tag.tone])} />
                            <span className="text-muted-foreground">{row.tag.label}</span>
                          </span>
                        </span>
                        <span className="px-3 py-2.5 text-[13px] text-(--success)">{row.detail}</span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
