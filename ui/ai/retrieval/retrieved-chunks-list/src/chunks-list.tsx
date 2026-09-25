import { useEffect, useState, type HTMLAttributes } from "react";
import { cn } from "./lib/utils";
import "./chunks-list.css";

/* ─────────────────────────────────────────────────────────
 * CONTEXT CARDS
 * Retrieved chunks enter once, then remain available; the
 * source chips pop in 700 ms after mount.
 * ───────────────────────────────────────────────────────── */

export type RetrievedChunk = {
  title: string;
  /** Size caption, e.g. "290 characters". */
  chars: string;
  body: string;
  source: string;
  /** 2–3 letter file-type badge, e.g. "PDF". */
  badge: string;
  tone?: "destructive" | "success" | "warning" | "primary" | "muted";
  href?: string;
};

const TONE = {
  destructive: "bg-destructive",
  success: "bg-(--success)",
  warning: "bg-(--warning)",
  primary: "bg-primary",
  muted: "bg-muted-foreground",
} as const;

const EASE = "cubic-bezier(0.23,1,0.32,1)";

/** A link when the chunk has an `href`, otherwise a button. */
function SourceChip({ href, ...props }: { href?: string } & HTMLAttributes<HTMLElement>) {
  return href ? <a href={href} target="_blank" rel="noreferrer" {...props} /> : <button type="button" {...props} />;
}

export function ChunksList({
  title = "All chunks",
  count,
  chunks,
  onOpenSource,
  className,
}: {
  title?: string;
  /** Total number of chunks shown in the header badge. */
  count?: number;
  chunks: RetrievedChunk[];
  onOpenSource?: (chunk: RetrievedChunk) => void;
  className?: string;
}) {
  const [chipsShown, setChipsShown] = useState(false);

  useEffect(() => {
    const chips = setTimeout(() => setChipsShown(true), 700);
    return () => clearTimeout(chips);
  }, []);

  return (
    <div
      className={cn(
        "flex w-full max-w-95 flex-col gap-2",
        "[--success:oklch(0.603_0.155_150.9)] dark:[--success:oklch(0.705_0.154_153.8)]",
        "[--warning:oklch(0.689_0.179_49.9)] dark:[--warning:oklch(0.746_0.156_55.6)]",
        className,
      )}
    >
      <div className="flex items-center gap-2 px-0.5" style={{ animation: "fade-in 400ms ease-out both" }}>
        <span className="text-[13px] font-semibold text-foreground">{title}</span>
        {count !== undefined && (
          <span className="inline-flex h-5 items-center rounded-sm bg-muted px-1.5 text-[11.5px] font-medium text-muted-foreground tabular-nums ring-1 ring-border">
            {count}
          </span>
        )}
      </div>

      {chunks.map((chunk, i) => (
        <div
          key={chunk.title}
          className="overflow-hidden rounded-lg bg-card shadow-xs ring-1 ring-border"
          style={{ animation: `fade-up 400ms ${EASE} ${i * 100}ms both` }}
        >
          <div className="flex items-center gap-2.5 border-b border-border px-3 py-2.5">
            <span className="flex min-w-0 items-center gap-1.5 text-[13px] font-medium text-foreground">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M4 6h16M4 12h16M4 18h10" />
              </svg>
              <span className="truncate">{chunk.title}</span>
            </span>
            <span className="ml-auto shrink-0 text-[12px] text-muted-foreground tabular-nums">{chunk.chars}</span>
          </div>
          <p className="px-3 pt-2 pb-1 text-[12.5px] leading-relaxed text-muted-foreground">{chunk.body}</p>
          <div className="px-3 pb-3">
            <SourceChip
              href={chunk.href}
              onClick={() => onOpenSource?.(chunk)}
              className="inline-flex h-6 cursor-pointer items-center gap-1.5 rounded-full bg-muted px-2 text-[12px] font-medium text-muted-foreground shadow-xs ring-1 ring-input transition-[opacity,transform,background-color] duration-300 hover:bg-accent"
              style={{
                opacity: chipsShown ? 1 : 0,
                transform: chipsShown ? "scale(1)" : "scale(0.95)",
                transitionTimingFunction: EASE,
                transitionDelay: `${i * 80}ms`,
              }}
            >
              <span
                className={cn(
                  "flex size-3.5 items-center justify-center rounded-[calc(var(--radius)-6px)] text-[7px] font-bold text-white",
                  TONE[chunk.tone ?? "muted"],
                )}
              >
                {chunk.badge}
              </span>
              {chunk.source}
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </SourceChip>
          </div>
        </div>
      ))}
    </div>
  );
}
