import { useState, type ReactNode } from "react";
import { cn } from "./lib/utils";
import "./task-rows.css";

/* ─────────────────────────────────────────────────────────
 * TASK ROWS — Beautiful UI. Rows enter staggered (80 ms apart);
 * each row shows a status badge, label, amount and an optional
 * status pill, and expands to a list of detail steps.
 * ───────────────────────────────────────────────────────── */

export type TaskStatus = "pending" | "running" | "failed" | "done";

export type Task = {
  id: string;
  label: string;
  /** Right-aligned quantity, e.g. "12 suppliers". */
  amount?: string;
  status: TaskStatus;
  /** Number shown inside the ring while pending or running (usually the row's position). */
  step?: number;
  details?: { label: string; meta?: string }[];
};

export type TaskRowsProps = {
  tasks: Task[];
  /** `capsules`: separate rounded cards; `list`: one card with divided rows. */
  variant?: "capsules" | "list";
  /** Rows opened by the caller (e.g. while a task runs). A row the user toggled keeps the user's choice. */
  open?: Record<string, boolean>;
  onOpenChange?: (id: string, open: boolean) => void;
  labels?: { done?: string; failed?: string };
  className?: string;
};

const EASE = "cubic-bezier(0.23,1,0.32,1)";

function SpinnerRing({ active, children }: { active?: boolean; children?: ReactNode }) {
  const size = 24, stroke = 2;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <span className="relative inline-flex size-6 shrink-0 items-center justify-center">
      <svg
        width={size} height={size} className="absolute inset-0"
        style={active ? { animation: "task-rows-spin 1.1s linear infinite" } : undefined}
      >
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" className="stroke-border" strokeWidth={stroke} />
        {active && (
          <circle
            cx={size / 2} cy={size / 2} r={r} fill="none" className="stroke-muted-foreground"
            strokeWidth={stroke} strokeLinecap="round" strokeDasharray={`${c * 0.28} ${c * 0.72}`}
          />
        )}
      </svg>
      <span className="relative text-[10.5px] font-semibold tabular-nums text-foreground">{children}</span>
    </span>
  );
}

function Badge({ tone, children }: { tone: "failed" | "done"; children: ReactNode }) {
  return (
    <span
      className={cn(
        "flex size-5.5 shrink-0 items-center justify-center rounded-full text-white",
        tone === "failed" ? "bg-destructive" : "bg-(--success)",
      )}
      style={{ animation: `task-rows-pop-in 300ms ${EASE} both` }}
    >
      {children}
    </span>
  );
}

const XIcon = (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
);
const CheckIcon = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
);
const RetryIcon = (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" /></svg>
);

function statusBadge(task: Task) {
  if (task.status === "done") return <Badge tone="done">{CheckIcon}</Badge>;
  if (task.status === "failed") return <Badge tone="failed">{XIcon}</Badge>;
  return <SpinnerRing active={task.status === "running"}>{task.step}</SpinnerRing>;
}

export function TaskRows({ tasks, variant = "capsules", open = {}, onOpenChange, labels, className }: TaskRowsProps) {
  const [manualOpen, setManualOpen] = useState<Record<string, boolean>>({});
  const list = variant === "list";

  return (
    <div
      className={cn(
        "flex w-full max-w-110 flex-col [--success:oklch(0.603_0.155_150.9)] dark:[--success:oklch(0.705_0.154_153.8)]",
        list ? "gap-0 self-start overflow-hidden rounded-lg bg-card text-card-foreground shadow-xs ring-1 ring-border" : "min-h-[196px] gap-2",
        className,
      )}
    >
      {tasks.map((task, i) => {
        const isOpen = manualOpen[task.id] ?? open[task.id] ?? false;
        return (
          <div
            key={task.id}
            className={cn(
              "self-stretch overflow-hidden transition-[border-radius] duration-300",
              list ? "border-b border-border last:border-0" : "bg-card text-card-foreground shadow-xs ring-1 ring-border",
            )}
            style={{
              borderRadius: list ? 0 : isOpen ? "calc(var(--radius) + 4px)" : "calc(var(--radius) + 12px)",
              animation: `task-rows-fade-up 450ms ${EASE} ${i * 80}ms both`,
            }}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => {
                setManualOpen((current) => ({ ...current, [task.id]: !isOpen }));
                onOpenChange?.(task.id, !isOpen);
              }}
              className="flex h-11 w-full items-center gap-2.5 px-2.5 text-left transition-colors duration-100 hover:bg-muted"
            >
              <span className="flex size-6 shrink-0 items-center justify-center">{statusBadge(task)}</span>
              <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-foreground">{task.label}</span>
              {task.amount && <span className="text-[12.5px] tabular-nums text-muted-foreground">{task.amount}</span>}
              {task.status === "done" && (
                <span
                  className="inline-flex h-5.5 items-center rounded-full bg-(--success)/12 px-2 text-[11.5px] font-medium text-(--success)"
                  style={{ animation: "task-rows-fade-in 200ms ease-out both" }}
                >
                  {labels?.done ?? "Completed"}
                </span>
              )}
              {task.status === "failed" && (
                <span
                  className="inline-flex h-5.5 items-center gap-1.5 rounded-full bg-destructive/10 px-2 text-[11.5px] font-medium text-destructive"
                  style={{ animation: "task-rows-fade-in 200ms ease-out both" }}
                >
                  {labels?.failed ?? "Failed"}
                  <span className="flex" style={{ animation: "task-rows-spin 1.2s linear infinite" }}>{RetryIcon}</span>
                </span>
              )}
              <span aria-hidden="true" className="-ml-2 flex size-7 shrink-0 items-center justify-center rounded-full text-muted-foreground">
                <svg
                  width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                  className="transition-transform duration-300"
                  style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </button>

            <div
              className="grid transition-[grid-template-rows,opacity] duration-300"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0, transitionTimingFunction: EASE }}
            >
              <div className="overflow-hidden">
                <div className="mb-2.5 grid grid-cols-[24px_1fr] gap-2.5 px-2.5">
                  <span aria-hidden className="mx-auto h-full w-px bg-border" />
                  <div className="flex flex-col gap-1.5">
                    {task.details?.map((d, j) => (
                      <div
                        key={d.label}
                        className="flex items-center justify-between"
                        style={isOpen ? { animation: `task-rows-fade-up 300ms ${EASE} ${120 + j * 100}ms both` } : undefined}
                      >
                        <span className="text-[12px] text-muted-foreground">{d.label}</span>
                        {d.meta && <span className="font-mono text-[11.5px] tabular-nums text-muted-foreground">{d.meta}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
