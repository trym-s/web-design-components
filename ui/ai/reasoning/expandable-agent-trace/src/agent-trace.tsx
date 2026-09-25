import { useLayoutEffect, useRef, useState } from "react";
import { cn } from "./lib/utils";
import "./agent-trace.css";

/* ─────────────────────────────────────────────────────────
 * THINKING — expandable agent trace, four variants
 *
 *   steps      step list with spinner → muted checks
 *   reasoning  prose reasoning that expands, then settles
 *   search     web-search trace: query + sources read
 *   coding     tool trace: files read, edits, commands
 * ───────────────────────────────────────────────────────── */

export type AgentTraceVariant = "steps" | "reasoning" | "search" | "coding";

export type AgentTraceRow = {
  primary: string;
  secondary?: string;
  mono?: boolean;
  add?: number;
  del?: number;
  /** Search rows render as links. */
  href?: string;
};

const EASE = "cubic-bezier(0.23,1,0.32,1)";
const DOT_TONES = ["bg-primary", "bg-(--warning)", "bg-(--success)"];

function Dot({ tone }: { tone: string }) {
  return (
    <span className={cn("flex size-3.5 shrink-0 items-center justify-center rounded-full text-white", tone)}>
      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="12" cy="12" r="9" />
        <path d="M3.5 12h17M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </svg>
    </span>
  );
}

export function AgentTrace({
  variant = "steps",
  working,
  activeLabel,
  doneLabel,
  rows,
  query,
  moreLabel,
  autoExpanded = false,
  onToggle,
  className,
}: {
  variant?: AgentTraceVariant;
  /** Shimmering `activeLabel` + spinner on the last step while true; `doneLabel` once false. */
  working: boolean;
  activeLabel: string;
  doneLabel: string;
  /** The rows shown so far; append rows as the agent produces them. */
  rows: AgentTraceRow[];
  /** Search variant: the query line above the sources. */
  query?: string;
  /** Trailing caption such as "+7 more"; fades in when set. */
  moreLabel?: string;
  /** The open state the agent suggests; once the user toggles, their choice wins. */
  autoExpanded?: boolean;
  onToggle?: (expanded: boolean) => void;
  className?: string;
}) {
  const [manualExpanded, setManualExpanded] = useState<boolean | null>(null);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const expanded = manualExpanded ?? autoExpanded;
  const visible = rows.length;
  const traceRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);
  useLayoutEffect(() => {
    if (traceRef.current) setLineHeight(traceRef.current.offsetHeight);
  }, [visible, expanded, variant, working, moreLabel]);

  return (
    <div
      className={cn(
        "flex min-h-[176px] w-full max-w-95 flex-col",
        "[--success:oklch(0.603_0.155_150.9)] dark:[--success:oklch(0.705_0.154_153.8)]",
        "[--warning:oklch(0.689_0.179_49.9)] dark:[--warning:oklch(0.746_0.156_55.6)]",
        className,
      )}
    >
      <button
        type="button"
        aria-expanded={expanded}
        onClick={() => {
          setManualExpanded(!expanded);
          onToggle?.(!expanded);
        }}
        className="-mx-1.5 flex w-fit items-center gap-2 rounded-md px-1.5 py-1 transition-colors duration-100 hover:bg-foreground/8"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--muted-foreground)">
          <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" />
        </svg>
        {working ? (
          <span
            className="bg-clip-text text-[13px] font-medium whitespace-nowrap text-transparent"
            style={{
              backgroundImage: "linear-gradient(90deg, var(--muted-foreground) 35%, var(--foreground) 50%, var(--muted-foreground) 65%)",
              backgroundSize: "200% 100%",
              animation: "shimmer-text 1.4s linear infinite",
            }}
          >
            {activeLabel}
          </span>
        ) : (
          <span className="text-[13px] font-medium whitespace-nowrap text-muted-foreground" style={{ animation: "fade-in 350ms ease-out both" }}>
            {doneLabel}
          </span>
        )}
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted-foreground)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
          className="transition-transform duration-300"
          style={{ transform: expanded ? "rotate(180deg)" : "rotate(0)" }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* expandable trace */}
      <div
        className="grid transition-[grid-template-rows,opacity] duration-400"
        style={{ gridTemplateRows: expanded ? "1fr" : "0fr", opacity: expanded ? 1 : 0, transitionTimingFunction: EASE }}
      >
        <div className="overflow-hidden">
          <div className="relative mt-1 ml-[5px] pl-4">
            <span
              aria-hidden
              className="absolute left-[3px] w-px bg-border"
              style={{ top: -8, height: lineHeight ? lineHeight - 2 : 0, transition: `height 500ms ${EASE}` }}
            />
            <div ref={traceRef} className="flex flex-col gap-1 py-1">
              {query && (
                <div className="flex h-6 items-center gap-2 px-1.5" style={{ animation: expanded ? `fade-up 300ms ${EASE} both` : undefined }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted-foreground)" strokeWidth="2" strokeLinecap="round" className="shrink-0">
                    <circle cx="11" cy="11" r="7" />
                    <path d="M21 21l-4.3-4.3" />
                  </svg>
                  <span className="text-[12.5px] text-muted-foreground">{query}</span>
                </div>
              )}
              {rows.map((row, i) => {
                const content = (
                  <>
                    {variant === "search" && <Dot tone={DOT_TONES[i % 3]} />}
                    {variant === "steps" &&
                      (i < visible - 1 || !working ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--muted-foreground)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      ) : (
                        <span className="size-3 shrink-0 rounded-full border-[1.5px] border-input border-t-muted-foreground" style={{ animation: "spin 700ms linear infinite" }} />
                      ))}
                    <span
                      className={cn(
                        "min-w-0 truncate text-[12.5px]",
                        variant === "reasoning" ? "leading-relaxed whitespace-normal text-muted-foreground" : "font-medium text-foreground",
                        variant === "search" && "agent-trace-underline",
                      )}
                    >
                      {row.primary}
                    </span>
                    {row.secondary && (
                      <span className={cn("shrink-0 text-[11.5px] text-muted-foreground", row.mono && "font-mono")}>{row.secondary}</span>
                    )}
                    {row.add !== undefined && (
                      <span className="shrink-0 font-mono text-[11px] tabular-nums">
                        <span className="text-(--success)">+{row.add}</span> <span className="text-destructive">−{row.del}</span>
                      </span>
                    )}
                  </>
                );
                const rowClass = "flex min-h-7 w-full items-center gap-2 rounded-sm px-1.5 py-0.5 text-left";
                const animation = { animation: `fade-up 320ms ${EASE} ${i * 120}ms both` };

                if (variant === "search") {
                  return (
                    <a key={row.primary} href={row.href} target="_blank" rel="noreferrer" className={cn(rowClass, "transition-colors duration-150 hover:bg-accent")} style={animation}>
                      {content}
                    </a>
                  );
                }
                if (variant === "coding") {
                  const selected = selectedTool === row.primary;
                  return (
                    <button
                      key={row.primary}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setSelectedTool(selected ? null : row.primary)}
                      className={cn(rowClass, "transition-colors duration-150", selected ? "bg-muted" : "hover:bg-accent")}
                      style={animation}
                    >
                      {content}
                    </button>
                  );
                }
                return (
                  <div key={row.primary} className={rowClass} style={animation}>
                    {content}
                  </div>
                );
              })}
              {moreLabel && (
                <span className="text-[12px] text-muted-foreground" style={{ animation: "fade-in 300ms ease-out both" }}>
                  {moreLabel}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
