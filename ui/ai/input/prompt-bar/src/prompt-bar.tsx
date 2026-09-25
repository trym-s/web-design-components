import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { ChevronDown, FileText, Mic, Plus, X } from "lucide-react";
import { cn } from "./lib/utils";
import "./prompt-bar.css";

/* ─────────────────────────────────────────────────────────
 * PROMPT BAR — Beautiful UI. A composer with attach, @ sources,
 * / commands, a model picker, dictation and send. Type @ or / to
 * open the menus; ↑↓ + Enter/Tab to pick; Esc closes.
 * Variants: rounded (card radius) · pill (full radius).
 * ───────────────────────────────────────────────────────── */

export type PromptSource = {
  key: string;
  name: string;
  desc: string;
  /** 15 px icon or brand mark. */
  icon?: ReactNode;
  /** Picking it calls `onAttach` instead of inserting `@name`. */
  attach?: boolean;
  /** Shows a Connect / Connected toggle on the row. */
  connectable?: boolean;
  connected?: boolean;
};
export type PromptCommand = { key: string; name: string; desc: string };
export type PromptModel = { key: string; name: string; tag?: string; /** Selecting it plays the rainbow sweep. */ flagship?: boolean };

export type PromptBarProps = {
  sources: PromptSource[];
  commands: PromptCommand[];
  models: PromptModel[];
  model: string;
  onModelChange?: (key: string) => void;
  /** Controlled draft; omit for an uncontrolled composer (`defaultDraft`). */
  draft?: string;
  defaultDraft?: string;
  onDraftChange?: (draft: string) => void;
  attachments?: string[];
  /** The attach source was picked. */
  onAttach?: () => void;
  onRemoveAttachment?: (index: number) => void;
  onConnectChange?: (key: string, connected: boolean) => void;
  onSend?: (message: { text: string; attachments: string[] }) => void;
  /** Dictation is the caller's service: the bar shows its state and asks to toggle it. */
  listening?: boolean;
  onListeningChange?: (listening: boolean) => void;
  variant?: "rounded" | "pill";
  placeholder?: string;
  className?: string;
};

const EASE = "cubic-bezier(0.23,1,0.32,1)";
const GLIDE = `top 220ms ${EASE}, height 220ms ${EASE}, opacity 150ms ease`;

/** The last @word or /word being typed, if any. */
function parseToken(draft: string): { kind: "at" | "slash"; query: string; start: number } | null {
  const match = /(^|\s)([@/])([\w-]*)$/.exec(draft);
  if (!match) return null;
  return { kind: match[2] === "@" ? "at" : "slash", query: match[3].toLowerCase(), start: match.index + match[1].length };
}

/* Full-spectrum hue sweep (algorithmic colour, not a theme colour). */
const RAINBOW = `linear-gradient(90deg, transparent, ${[25, 60, 100, 150, 200, 260, 310].map((h) => `oklch(0.72 0.19 ${h})`).join(", ")}, transparent)`;

export function PromptBar({
  sources, commands, models, model, onModelChange, draft: draftProp, defaultDraft = "", onDraftChange,
  attachments = [], onAttach, onRemoveAttachment, onConnectChange, onSend, listening = false, onListeningChange,
  variant = "rounded", placeholder = "Write a message…", className,
}: PromptBarProps) {
  const pill = variant === "pill";
  const [innerDraft, setInnerDraft] = useState(defaultDraft);
  const draft = draftProp ?? innerDraft;
  const setDraft = (next: string) => {
    if (draftProp === undefined) setInnerDraft(next);
    onDraftChange?.(next);
  };
  const [dismissed, setDismissed] = useState(false);
  const [plusOpen, setPlusOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [engaged, setEngaged] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [rowBox, setRowBox] = useState<{ top: number; height: number } | null>(null);
  const [modelBox, setModelBox] = useState<{ top: number; height: number } | null>(null);
  const [modelHovered, setModelHovered] = useState<number | null>(null);
  const [sweep, setSweep] = useState(0);
  const controlsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const modelRef = useRef<HTMLButtonElement>(null);
  const rowRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const modelRowRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const token = dismissed ? null : parseToken(draft);
  const menu: "at" | "slash" | null = plusOpen ? "at" : token?.kind ?? null;
  const query = plusOpen ? "" : token?.query ?? "";
  const rows: (PromptSource | PromptCommand)[] =
    menu === "at"
      ? sources.filter((s) => s.name.toLowerCase().includes(query))
      : menu === "slash"
        ? commands.filter((c) => c.name.replace(/^\//, "").startsWith(query))
        : [];
  const current = models.find((m) => m.key === model) ?? models[0];
  const modelIndex = models.findIndex((m) => m.key === current?.key);

  useEffect(() => {
    setActive(0);
    setEngaged(false);
  }, [menu, query]);

  /* One highlight glides to the active row instead of each row toggling its own background. */
  useLayoutEffect(() => {
    const target = rowRefs.current[active];
    if (target) setRowBox({ top: target.offsetTop, height: target.offsetHeight });
  }, [menu, query, active, rows.length]);

  useLayoutEffect(() => {
    if (!modelOpen) return;
    const target = modelRowRefs.current[modelHovered ?? modelIndex];
    if (target) setModelBox({ top: target.offsetTop, height: target.offsetHeight });
  }, [modelOpen, modelHovered, modelIndex]);

  useEffect(() => {
    if (!modelOpen) setModelHovered(null);
  }, [modelOpen]);

  /* Wrapped text moves above the controls, then the field grows to 100 px. */
  useLayoutEffect(() => {
    const input = inputRef.current;
    const controls = controlsRef.current;
    const measure = measureRef.current;
    const modelButton = modelRef.current;
    if (!input || !controls || !measure || !modelButton) return;
    const inlineInputWidth = controls.clientWidth - (28 * 3 + modelButton.offsetWidth) - 4 * 4;
    const needsFullWidth = draft.includes("\n") || measure.offsetWidth + 8 > inlineInputWidth;
    if (needsFullWidth !== expanded) setExpanded(needsFullWidth);
    input.style.height = "0px";
    const contentHeight = input.scrollHeight;
    input.style.height = `${Math.min(Math.max(contentHeight, 28), 100)}px`;
    input.style.overflowY = contentHeight > 100 ? "auto" : "hidden";
  }, [draft, expanded]);

  const selectModel = (next: PromptModel) => {
    setModelOpen(false);
    onModelChange?.(next.key);
    if (next.flagship && next.key !== current?.key && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) setSweep((n) => n + 1);
  };

  const pick = (row: PromptSource | PromptCommand) => {
    const base = token ? draft.slice(0, token.start) : draft;
    if ("attach" in row && row.attach) {
      onAttach?.();
      if (token) setDraft(base);
    } else setDraft(`${base}${menu === "at" ? "@" : ""}${row.name} `);
    setPlusOpen(false);
    setDismissed(false);
    inputRef.current?.focus();
  };

  const canSend = draft.trim().length > 0 || attachments.length > 0;
  const send = () => {
    if (!canSend) return;
    onSend?.({ text: draft, attachments });
    setDraft("");
    setPlusOpen(false);
    setModelOpen(false);
  };

  const shape = pill ? "rounded-full" : "rounded-md";
  const menuClass = "absolute bottom-full z-10 mb-2 rounded-lg bg-card p-1 text-card-foreground shadow-sm ring-1 ring-border";
  const highlightClass = "pointer-events-none absolute inset-x-1 rounded-sm bg-accent";

  return (
    <div className={cn("relative w-full max-w-105 [--success:oklch(0.603_0.155_150.9)] dark:[--success:oklch(0.705_0.154_153.8)]", className)}>
      {menu && (
        <div
          onMouseLeave={() => setEngaged(false)}
          role="listbox"
          className={cn(menuClass, "inset-x-0")}
          style={{ animation: `prompt-bar-pop-in 180ms ${EASE} both`, transformOrigin: "bottom center" }}
        >
          <span
            aria-hidden
            className={highlightClass}
            style={{ top: rowBox?.top ?? 0, height: rowBox?.height ?? 0, opacity: rowBox && engaged && rows.length > 0 ? 1 : 0, transition: GLIDE }}
          />
          {rows.map((row, i) => {
            const source = menu === "at" ? (row as PromptSource) : undefined;
            return (
              <button
                key={row.key}
                type="button"
                role="option"
                aria-selected={i === active}
                ref={(el) => {
                  rowRefs.current[i] = el;
                }}
                onMouseDown={(event) => event.preventDefault()}
                onMouseEnter={() => {
                  setActive(i);
                  setEngaged(true);
                }}
                onClick={() => pick(row)}
                className="relative z-10 flex h-9 w-full items-center gap-2.5 rounded-sm px-2 text-left"
              >
                {source?.icon && <span className="flex size-5.5 shrink-0 items-center justify-center text-muted-foreground">{source.icon}</span>}
                <span className="shrink-0 text-[12.5px] font-medium text-foreground">{row.name}</span>
                <span className="min-w-0 flex-1 truncate text-[12px] text-muted-foreground">{row.desc}</span>
                {source?.connectable && (
                  <span
                    role="button"
                    tabIndex={-1}
                    onClick={(event) => {
                      event.stopPropagation();
                      onConnectChange?.(source.key, !source.connected);
                    }}
                    className={cn(
                      "shrink-0 text-[12px] font-medium transition-colors duration-100",
                      source.connected ? "text-(--success)" : "text-primary hover:underline",
                    )}
                  >
                    {source.connected ? "Connected" : "Connect"}
                  </span>
                )}
              </button>
            );
          })}
          {rows.length === 0 && <div className="flex h-9 items-center px-2 text-[12px] text-muted-foreground">No matches for “{query}”</div>}
          <div className="mt-1 border-t border-border px-2 pt-1.5 pb-1 text-[11px] text-muted-foreground">
            {menu === "at" ? "Type to search sources & files" : "Type to search commands"}
          </div>
        </div>
      )}

      {modelOpen && (
        <div
          onMouseLeave={() => setModelHovered(null)}
          role="listbox"
          className={cn(menuClass, "right-0 w-44")}
          style={{ animation: `prompt-bar-pop-in 180ms ${EASE} both`, transformOrigin: "bottom right" }}
        >
          <span
            aria-hidden
            className={highlightClass}
            style={{ top: modelBox?.top ?? 0, height: modelBox?.height ?? 0, opacity: modelBox && modelHovered !== null ? 1 : 0, transition: GLIDE }}
          />
          {models.map((m, i) => (
            <button
              key={m.key}
              type="button"
              role="option"
              aria-selected={m.key === current?.key}
              ref={(el) => {
                modelRowRefs.current[i] = el;
              }}
              onMouseDown={(event) => event.preventDefault()}
              onMouseEnter={() => setModelHovered(i)}
              onClick={() => {
                selectModel(m);
                inputRef.current?.focus();
              }}
              className="relative z-10 flex h-7.5 w-full items-center gap-2 rounded-sm px-2 text-left"
            >
              <span className="min-w-0 flex-1 truncate text-[12.5px] font-medium text-foreground">{m.name}</span>
              {m.tag && <span className="shrink-0 text-[11px] text-muted-foreground">{m.tag}</span>}
              <svg
                width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden
                className={cn("shrink-0 text-foreground", m.key !== current?.key && "invisible")}
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </button>
          ))}
        </div>
      )}

      <div
        className={cn(
          "relative isolate flex flex-col gap-1.5 overflow-hidden border border-border bg-card p-1.5 text-card-foreground shadow-xs ring-1 ring-border transition-[border-color,border-radius] duration-150 focus-within:border-input",
          pill ? (attachments.length > 0 || expanded ? "rounded-[calc(var(--radius)+14px)]" : "rounded-full") : "rounded-[calc(var(--radius)+4px)]",
        )}
      >
        {sweep > 0 && (
          <span
            key={sweep}
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-0 blur-md"
            style={{ backgroundImage: RAINBOW, animation: "prompt-bar-sweep 1080ms cubic-bezier(0.16,1,0.3,1) both" }}
          />
        )}
        <span ref={measureRef} aria-hidden="true" className="pointer-events-none invisible absolute whitespace-pre text-[13px] leading-[18px]">
          {draft}
        </span>

        {attachments.length > 0 && (
          <div className={cn("flex flex-wrap gap-1.5 pt-0.5", pill ? "px-1" : "px-0.5")}>
            {attachments.map((file, i) => (
              <span
                key={`${file}-${i}`}
                className={cn("flex h-6.5 items-center gap-1.5 bg-muted py-1 pr-1 pl-1.5 text-[11.5px] text-muted-foreground ring-1 ring-border", pill ? "rounded-full" : "rounded-sm")}
                style={{ animation: `prompt-bar-pop-in 200ms ${EASE} both` }}
              >
                <FileText size={12} strokeWidth={1.8} aria-hidden />
                <span className="max-w-36 truncate">{file}</span>
                <button
                  type="button"
                  aria-label={`Remove ${file}`}
                  onClick={() => onRemoveAttachment?.(i)}
                  className={cn(
                    "flex size-4 items-center justify-center text-muted-foreground transition-colors duration-100 hover:bg-border/70 hover:text-foreground",
                    pill ? "rounded-full" : "rounded-[calc(var(--radius)-6px)]",
                  )}
                >
                  <X size={10} strokeWidth={2.5} aria-hidden />
                </button>
              </span>
            ))}
          </div>
        )}

        <div
          ref={controlsRef}
          className={cn("grid items-end gap-x-1 gap-y-1.5", expanded ? "grid-cols-[minmax(0,1fr)_auto_28px_28px]" : "grid-cols-[28px_minmax(0,1fr)_auto_28px_28px]")}
        >
          <button
            type="button"
            aria-label="Add attachments and sources"
            aria-expanded={plusOpen}
            onClick={() => {
              setModelOpen(false);
              setPlusOpen((open) => !open);
              inputRef.current?.focus();
            }}
            className={cn(
              "flex size-7 shrink-0 items-center justify-center justify-self-start text-muted-foreground transition-[background-color,color,transform] duration-150 hover:bg-accent hover:text-foreground active:scale-[0.94]",
              shape,
              plusOpen && "bg-accent text-foreground",
              expanded ? "col-start-1 row-start-2" : "col-start-1 row-start-1",
            )}
          >
            <Plus size={16} strokeWidth={2} aria-hidden />
          </button>

          <textarea
            ref={inputRef}
            rows={1}
            value={draft}
            onChange={(event) => {
              setDraft(event.target.value);
              setDismissed(false);
              setPlusOpen(false);
            }}
            onKeyDown={(event) => {
              if (menu && rows.length > 0) {
                if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                  event.preventDefault();
                  setEngaged(true);
                  setActive((i) => (i + (event.key === "ArrowDown" ? 1 : rows.length - 1)) % rows.length);
                  return;
                }
                if ((event.key === "Enter" && !event.shiftKey) || event.key === "Tab") {
                  event.preventDefault();
                  pick(rows[active]);
                  return;
                }
              }
              if (event.key === "Escape") {
                setDismissed(true);
                setPlusOpen(false);
                setModelOpen(false);
                return;
              }
              if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
                event.preventDefault();
                send();
              }
            }}
            placeholder={listening ? "Listening…" : placeholder}
            aria-label="Prompt"
            className={cn(
              "min-h-7 w-full min-w-0 resize-none bg-transparent px-1 py-[5px] text-[13px] leading-[18px] text-foreground outline-none [overflow-wrap:anywhere] placeholder:text-muted-foreground",
              expanded ? "col-span-full col-start-1 row-start-1" : "col-start-2 row-start-1",
            )}
          />

          <button
            ref={modelRef}
            type="button"
            aria-expanded={modelOpen}
            aria-label="Choose model"
            onClick={() => {
              setPlusOpen(false);
              setModelOpen((open) => !open);
            }}
            className={cn(
              "flex h-7 shrink-0 items-center gap-1 px-1.5 text-[12px] font-medium text-muted-foreground transition-colors duration-150 hover:bg-accent hover:text-foreground",
              shape,
              expanded ? "col-start-2 row-start-2" : "col-start-3 row-start-1",
            )}
          >
            {current?.name}
            <ChevronDown size={11} strokeWidth={2.4} aria-hidden className="text-muted-foreground" />
          </button>

          <button
            type="button"
            aria-label={listening ? "Stop dictation" : "Start dictation"}
            aria-pressed={listening}
            onClick={() => onListeningChange?.(!listening)}
            className={cn(
              "flex size-7 shrink-0 items-center justify-center transition-[background-color,color,transform] duration-150 active:scale-[0.94]",
              shape,
              listening ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground",
              expanded ? "col-start-3 row-start-2" : "col-start-4 row-start-1",
            )}
          >
            {listening ? (
              <span className="flex h-3.5 items-center gap-[2.5px]">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="h-full w-[2.5px] rounded-full bg-current" style={{ animation: `prompt-bar-eq-bounce 900ms ease-in-out ${i * 150}ms infinite` }} />
                ))}
              </span>
            ) : (
              <Mic size={15} strokeWidth={2} aria-hidden />
            )}
          </button>

          <button
            type="button"
            aria-label="Send"
            disabled={!canSend}
            onClick={send}
            className={cn(
              "flex size-7 shrink-0 items-center justify-center transition-[background-color,color,transform] duration-200 enabled:active:scale-[0.94]",
              shape,
              canSend ? "bg-foreground text-card" : "bg-input text-muted-foreground",
              expanded ? "col-start-4 row-start-2" : "col-start-5 row-start-1",
            )}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
