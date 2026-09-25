import { useState, type ReactNode } from "react";
import { cn } from "./lib/utils";
import "./tool-call-chips.css";

/* ─────────────────────────────────────────────────────────
 * TOOL CALL CHIPS — Beautiful UI. An agent run as compact rows:
 * tool calls with inline chips, then file-diff chips summarizing
 * the edits. Hover a row to reveal its chevron; every row expands
 * to show what the tool actually did.
 * ───────────────────────────────────────────────────────── */

export type ToolIcon = "think" | "write" | "run" | "read";

export type ToolCall = {
  icon: ToolIcon;
  label: string;
  /** Inline chip text (file name, command, thought summary). */
  chip: string;
  /** Render the chip in the mono font. */
  mono?: boolean;
  detail?: { text: string; tone?: "add" }[];
  /** Render the detail lines in the mono font. */
  detailMono?: boolean;
};

export type FileDiff = { file: string; add: number; del: number };

export type ToolCallChipsProps = {
  /** Calls shown so far — append to stream them in (each fades up). */
  calls: ToolCall[];
  /** File-diff chips; pass once the run has finished. */
  diffs?: FileDiff[];
  /** Header text, e.g. "4 tool calls, 2 messages". */
  summary: string;
  defaultOpen?: boolean;
  /** Label of the trailing link after the diff chips, e.g. "+2 more". */
  moreLabel?: string;
  onDiffClick?: (diff: FileDiff) => void;
  onMoreClick?: () => void;
  className?: string;
};

const EASE = "cubic-bezier(0.23,1,0.32,1)";

const Icons: Record<ToolIcon, ReactNode> = {
  think: <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />,
  write: <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z" /></g>,
  run: <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 17l6-5-6-5M12 19h8" /></g>,
  read: <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></g>,
};

const Chevron = ({ className, rotate }: { className?: string; rotate: boolean }) => (
  <svg
    width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
    className={className} style={{ transform: rotate ? "rotate(-90deg)" : "rotate(0deg)" }}
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export function ToolCallChips({ calls, diffs, summary, defaultOpen = true, moreLabel, onDiffClick, onMoreClick, className }: ToolCallChipsProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [openRows, setOpenRows] = useState<Set<number>>(new Set());
  const toggleRow = (index: number) =>
    setOpenRows((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });

  return (
    <div className={cn("min-h-[220px] w-full max-w-80 pb-1 [--success:oklch(0.603_0.155_150.9)] dark:[--success:oklch(0.705_0.154_153.8)]", className)}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="-mx-1.5 flex w-fit items-center gap-1.5 rounded-md px-1.5 py-1 text-[12.5px] text-muted-foreground transition-colors duration-100 hover:bg-foreground/8"
      >
        <Chevron className="transition-transform duration-200" rotate={!open} />
        <span className="tabular-nums">{summary}</span>
      </button>

      <div className="grid transition-[grid-template-rows,opacity] duration-300" style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}>
        {/* -mx-1 + px-1.5 keeps content in place while giving the row hover pills room inside the clip box */}
        <div className="-mx-1 overflow-hidden px-1.5 pb-1">
          <div className="mt-1.5 flex flex-col gap-1">
            {calls.map((call, index) => {
              const rowOpen = openRows.has(index);
              return (
                <div key={index} style={{ animation: `tool-call-chips-fade-up 300ms ${EASE} both` }}>
                  <button
                    type="button"
                    aria-expanded={rowOpen}
                    onClick={() => toggleRow(index)}
                    className="group/row -mx-[3px] flex h-7 w-[calc(100%+6px)] min-w-0 items-center gap-2 rounded-md px-[3px] text-left transition-colors duration-100 hover:bg-foreground/8"
                  >
                    <span className="relative flex size-4 shrink-0 items-center justify-center text-muted-foreground">
                      <svg
                        width="13" height="13" viewBox="0 0 24 24" fill={call.icon === "think" ? "currentColor" : "none"} stroke="currentColor"
                        className={cn("transition-opacity duration-100 group-hover/row:opacity-0", rowOpen && "opacity-0")}
                      >
                        {Icons[call.icon]}
                      </svg>
                      <Chevron
                        className={cn("absolute transition-[opacity,transform] duration-150 group-hover/row:opacity-100", rowOpen ? "opacity-100" : "opacity-0")}
                        rotate={!rowOpen}
                      />
                    </span>
                    <span className="shrink-0 text-[12.5px] font-medium text-foreground">{call.label}</span>
                    <span
                      className={cn(
                        "inline-flex h-5.5 min-w-0 flex-1 cursor-pointer items-center truncate rounded-sm bg-foreground/8 px-1.5 text-[11.5px] text-foreground/80 ring-1 ring-border transition-colors duration-100 hover:bg-input dark:bg-muted dark:text-muted-foreground dark:hover:bg-accent",
                        call.mono && "font-mono",
                      )}
                    >
                      {call.chip}
                    </span>
                  </button>

                  <div
                    className="grid transition-[grid-template-rows,opacity] duration-300"
                    style={{ gridTemplateRows: rowOpen ? "1fr" : "0fr", opacity: rowOpen ? 1 : 0, transitionTimingFunction: EASE }}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="mt-0.5 mb-1 ml-2 flex flex-col gap-0.5 border-l border-border py-0.5 pl-3.5">
                        {call.detail?.map((line) => (
                          <span
                            key={line.text}
                            className={cn(
                              "truncate text-[11.5px] leading-[1.6]",
                              call.detailMono && "font-mono",
                              line.tone === "add" ? "text-(--success)" : "text-muted-foreground",
                            )}
                          >
                            {line.text}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {diffs && (
            <div className="mt-2.5 flex max-w-full flex-wrap gap-1.5 border-t border-border pt-2.5">
              {diffs.map((d, i) => (
                <button
                  type="button"
                  key={d.file}
                  onClick={() => onDiffClick?.(d)}
                  className="inline-flex h-7 max-w-full cursor-pointer items-center gap-1.5 rounded-sm bg-card px-2 font-mono text-[11.5px] text-card-foreground shadow-xs ring-1 ring-input transition-colors duration-100 hover:bg-accent"
                  style={{ animation: `tool-call-chips-pop-in 250ms ${EASE} ${i * 80}ms both` }}
                >
                  <span className="min-w-0 truncate">{d.file}</span>
                  <span className="shrink-0 tabular-nums text-(--success)">+{d.add}</span>
                  {d.del > 0 && <span className="shrink-0 tabular-nums text-destructive">−{d.del}</span>}
                </button>
              ))}
              {moreLabel && (
                <button
                  type="button"
                  onClick={onMoreClick}
                  className="inline-flex h-7 items-center rounded-sm px-1.5 font-mono text-[11.5px] text-muted-foreground underline decoration-transparent underline-offset-2 transition-colors duration-100 hover:text-foreground/80 hover:decoration-current"
                  style={{ animation: `tool-call-chips-fade-in 300ms ease-out ${diffs.length * 80}ms both` }}
                >
                  {moreLabel}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
