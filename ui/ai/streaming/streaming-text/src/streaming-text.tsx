import { useState, type ReactNode } from "react";
import { cn } from "./lib/utils";
import "./streaming-text.css";

/* ─────────────────────────────────────────────────────────
 * STREAMING TEXT
 * Words resolve out of blur, inline citations appear in
 * context, then actions and follow-up prompts become usable.
 * ───────────────────────────────────────────────────────── */

export type StreamSource = {
  name: string;
  domain: string;
  href: string;
  /** Square avatar; it is sized by the component (12–16 px) and clipped to its radius. */
  icon: ReactNode;
};

/** A word, or an inline citation chip pointing at `sources[cite]`. */
export type StreamToken = { text: string } | { cite: number };

export type StreamAction = "copy" | "retry" | "up" | "down";

const EASE = "cubic-bezier(0.23,1,0.32,1)";

const ACTIONS: { key: StreamAction; label: string; icon: ReactNode }[] = [
  { key: "copy", label: "Copy", icon: <g><rect x="9" y="9" width="12" height="12" rx="2.5" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></g> },
  { key: "retry", label: "Regenerate", icon: <path d="M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" /> },
  {
    key: "up",
    label: "Good response",
    icon: <path d="M7 10v12M15 5.88L14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88z" />,
  },
  {
    key: "down",
    label: "Bad response",
    icon: <path d="M17 14V2M9 18.12L10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88z" />,
  },
];

function Avatar({ icon, className }: { icon: ReactNode; className: string }) {
  return <span className={cn("flex shrink-0 overflow-hidden ring-1 ring-foreground/10 [&>*]:size-full", className)}>{icon}</span>;
}

function SourceChip({ source }: { source: StreamSource }) {
  return (
    <a
      href={source.href}
      target="_blank"
      rel="noreferrer"
      className="mr-1 ml-0 inline-flex h-4.5 translate-y-[-1px] items-center gap-1 rounded-[calc(var(--radius)-5px)] bg-muted px-[3px] align-middle font-mono text-[10.5px] text-muted-foreground ring-1 ring-border transition-colors duration-150 hover:bg-accent hover:text-foreground"
      style={{ animation: `pop-in 250ms ${EASE} both` }}
    >
      <Avatar icon={source.icon} className="size-3 rounded-[calc(var(--radius)-7px)]" />
      <span>{source.domain}</span>
    </a>
  );
}

export function StreamingText({
  tokens,
  done,
  sources,
  sourcesLabel,
  followUps = [],
  followUpsLabel = "Follow-ups",
  onFollowUp,
  onAction,
  className,
}: {
  /** The tokens streamed so far; append one per tick. */
  tokens: StreamToken[];
  /** Streaming finished: hides the caret, reveals actions, sources and follow-ups. */
  done: boolean;
  sources: StreamSource[];
  /** Caption beside the stacked avatars, default "{n} sources". */
  sourcesLabel?: string;
  followUps?: string[];
  followUpsLabel?: string;
  onFollowUp?: (text: string) => void;
  onAction?: (action: StreamAction) => void;
  className?: string;
}) {
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const reveal = { opacity: done ? 1 : 0, pointerEvents: done ? ("auto" as const) : ("none" as const) };

  return (
    <div className={cn("min-h-[15.5rem] w-full max-w-95", className)}>
      <p className="text-[13px] leading-relaxed text-foreground">
        {tokens.map((token, i) =>
          "cite" in token ? (
            sources[token.cite] && <SourceChip key={i} source={sources[token.cite]} />
          ) : (
            <span key={i} className="inline [will-change:filter,opacity]" style={{ animation: "stream-in 420ms cubic-bezier(0.22,0.61,0.25,1) both" }}>
              {token.text}{" "}
            </span>
          ),
        )}
        {!done && (
          <span className="ml-0.5 inline-block h-3 w-0.5 translate-y-0.5 rounded-full bg-foreground" style={{ animation: "fade-in 150ms ease-out both" }} />
        )}
      </p>

      {/* action icons row */}
      <div className="mt-2 flex items-center gap-0.5 transition-opacity duration-400" style={reveal}>
        {ACTIONS.map(({ key, label, icon }) => (
          <button
            key={key}
            type="button"
            aria-label={label}
            onClick={() => onAction?.(key)}
            className="flex size-6 items-center justify-center rounded-sm text-muted-foreground transition-colors duration-100 hover:bg-foreground/8 hover:text-muted-foreground"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              {icon}
            </svg>
          </button>
        ))}
        <button
          type="button"
          aria-expanded={sourcesOpen}
          onClick={() => setSourcesOpen((current) => !current)}
          className="ml-1.5 flex items-center gap-1.5 rounded-sm px-1 py-0.5 text-left transition-colors duration-150 hover:bg-accent"
        >
          <span className="flex -space-x-1">
            {sources.map((source) => (
              <span key={source.domain} className="flex size-3.5 shrink-0 overflow-hidden rounded-full bg-card ring-[1.5px] ring-muted [&>*]:size-full">
                {source.icon}
              </span>
            ))}
          </span>
          <span className="text-[12px] text-muted-foreground">{sourcesLabel ?? `${sources.length} sources`}</span>
        </button>
      </div>

      <div
        className="grid transition-[grid-template-rows,opacity] duration-300"
        style={{ gridTemplateRows: done && sourcesOpen ? "1fr" : "0fr", opacity: done && sourcesOpen ? 1 : 0, transitionTimingFunction: EASE }}
      >
        <div className="overflow-hidden">
          <div className="mt-1.5 flex flex-col rounded-lg bg-muted p-1 ring-1 ring-border">
            {sources.map((source) => (
              <a
                key={source.domain}
                href={source.href}
                target="_blank"
                rel="noreferrer"
                tabIndex={done && sourcesOpen ? undefined : -1}
                className="flex items-center gap-2 rounded-sm px-1.5 py-1 text-[12px] text-muted-foreground transition-colors duration-150 hover:bg-accent hover:text-foreground"
              >
                <Avatar icon={source.icon} className="size-4 rounded-[calc(var(--radius)-6px)]" />
                <span className="streaming-text-underline">{source.name}</span>
                <span className="ml-auto font-mono text-[10.5px] text-muted-foreground">{source.domain}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* follow-ups */}
      {followUps.length > 0 && (
        <div className="mt-2.5 transition-opacity duration-400" style={reveal}>
          <p className="text-[12px] font-medium text-muted-foreground">{followUpsLabel}</p>
          <div className="mt-0.5 flex flex-col">
            {followUps.map((text, i) => (
              <button
                key={text}
                type="button"
                onClick={() => onFollowUp?.(text)}
                className="-mx-1.5 flex items-center gap-2 rounded-[calc(var(--radius)-3px)] border-b border-border px-1.5 py-1.5 text-left text-[12.5px] text-foreground transition-colors duration-100 hover:bg-foreground/8"
                style={done ? { animation: `fade-up 350ms ${EASE} ${i * 90}ms both` } : { opacity: 0 }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--muted-foreground)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <path d="M9 10l-5 5 5 5" />
                  <path d="M20 4v7a4 4 0 0 1-4 4H4" />
                </svg>
                {text}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
