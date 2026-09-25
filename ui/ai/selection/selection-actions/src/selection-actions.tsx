import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUp, Check, ChevronRight, MessageCircleQuestion, RefreshCw, Scissors, Smile, Sparkle, SpellCheck, X } from "lucide-react";
import { cn } from "./lib/utils";
import "./selection-actions.css";

/* ─────────────────────────────────────────────────────────
 * SELECTION ACTIONS — Beautiful UI. A contextual AI bar attached
 * beneath selected text: presets (Explain, Improve, + Shorten,
 * Tone, Grammar), a free-text prompt, a busy state and a
 * Keep / Discard / Retry confirmation.
 * ───────────────────────────────────────────────────────── */

export type SelectionMode = "idle" | "thinking" | "streaming" | "result";
export type SelectionAction = "explain" | "improve" | "shorten" | "tone" | "grammar";

export type SelectionActionsProps = {
  /** Text before the selection, in the same paragraph. */
  before?: ReactNode;
  /** The selected text (swap in a `StreamText` while streaming). */
  selection: ReactNode;
  after?: ReactNode;
  /** Whether the bar is shown (it pops in once positioned). */
  open?: boolean;
  mode: SelectionMode;
  /** Busy label, e.g. "Improving" (an ellipsis is appended). */
  busyLabel?: string;
  onAction?: (action: SelectionAction) => void;
  onPrompt?: (prompt: string) => void;
  onKeep?: () => void;
  onDiscard?: () => void;
  onRetry?: () => void;
  className?: string;
};

const EASE = "cubic-bezier(0.23,1,0.32,1)";
const icon = { size: 14, strokeWidth: 1.8, "aria-hidden": true } as const;

const control =
  "inline-flex h-7 shrink-0 items-center gap-1 rounded-full px-2.5 text-[12px] font-normal text-foreground transition-[background-color,color,transform] duration-150 hover:bg-accent active:scale-[0.96]";
const primary =
  "inline-flex h-7 shrink-0 items-center gap-1 rounded-full bg-foreground px-2.5 text-[12.5px] font-normal text-muted ring-1 ring-border transition-[opacity,transform] duration-150 hover:opacity-90 active:scale-[0.96]";

/** Text sweep for the thinking label. */
function Shimmer({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-block bg-clip-text text-[12.5px] font-normal text-transparent"
      style={{
        backgroundImage: "linear-gradient(90deg, var(--muted-foreground) 35%, var(--foreground) 50%, var(--muted-foreground) 65%)",
        backgroundSize: "200% 100%",
        animation: "selection-actions-shimmer 1.8s linear infinite",
      }}
    >
      {children}
    </span>
  );
}

/** Reveals `text` a few characters per tick with a blurred tail and a caret; calls `onDone` at the end. */
export function StreamText({
  text, charsPerTick = 2, tickMs = 9, blurTail = 6, caret = true, className, onDone,
}: { text: string; charsPerTick?: number; tickMs?: number; blurTail?: number; caret?: boolean; className?: string; onDone?: () => void }) {
  const [visible, setVisible] = useState(0);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    setVisible(0);
    let next = 0;
    const timer = window.setInterval(() => {
      next = Math.min(next + charsPerTick, text.length);
      setVisible(next);
      if (next >= text.length) {
        window.clearInterval(timer);
        onDoneRef.current?.();
      }
    }, tickMs);
    return () => window.clearInterval(timer);
  }, [text, charsPerTick, tickMs]);

  const streaming = visible < text.length;
  const shown = text.slice(0, visible);
  const stableEnd = streaming ? Math.max(0, shown.length - blurTail) : shown.length;
  return (
    <span className={className}>
      {shown.slice(0, stableEnd)}
      {stableEnd < shown.length && <span className="selection-actions-stream-tail">{shown.slice(stableEnd)}</span>}
      {caret && <span aria-hidden="true" className={cn("selection-actions-stream-caret", streaming && "is-streaming")} />}
    </span>
  );
}

export function SelectionActions({
  before, selection, after, open = true, mode, busyLabel = "Editing",
  onAction, onPrompt, onKeep, onDiscard, onRetry, className,
}: SelectionActionsProps) {
  const [prompt, setPrompt] = useState("");
  const [typingWidth, setTypingWidth] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [anchor, setAnchor] = useState({ x: 0, y: 0 });
  const [positioned, setPositioned] = useState(false);

  const hostRef = useRef<HTMLDivElement>(null);
  const selectionRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const previousModeRef = useRef<SelectionMode>(mode);
  const lastWidthRef = useRef(0);
  const widthAnimationRef = useRef<Animation | null>(null);

  /* Leaving idle collapses the presets; returning to idle clears the prompt. */
  useEffect(() => {
    setExpanded(false);
    if (mode === "idle") {
      setPrompt("");
      setTypingWidth(null);
    }
  }, [mode]);

  /* Attach beneath the last selected line, centred on the whole selection; batched per frame. */
  const place = useCallback(() => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const host = hostRef.current;
      const target = selectionRef.current;
      if (!host || !target) return;
      const bounds = target.getBoundingClientRect();
      const lastLine = Array.from(target.getClientRects()).at(-1);
      if (!lastLine) return;
      const hostBounds = host.getBoundingClientRect();
      const next = {
        x: Math.round(bounds.left - hostBounds.left + bounds.width / 2),
        y: Math.round(lastLine.bottom - hostBounds.top + 8),
      };
      setAnchor((current) => (current.x === next.x && current.y === next.y ? current : next));
      setPositioned(true);
    });
  }, []);

  useLayoutEffect(() => {
    place();
  }, [mode, place]);

  useEffect(() => {
    const host = hostRef.current;
    const target = selectionRef.current;
    if (!host || !target) return;
    const resize = new ResizeObserver(place);
    resize.observe(host);
    const mutation = new MutationObserver(place); // streamed text reflows the selection
    mutation.observe(target, { childList: true, subtree: true, characterData: true });
    window.addEventListener("resize", place);
    return () => {
      resize.disconnect();
      mutation.disconnect();
      window.removeEventListener("resize", place);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [place]);

  /* When the whole content swaps (idle ↔ busy ↔ result) animate from the last width to the new one. */
  useLayoutEffect(() => {
    const bar = barRef.current;
    const content = contentRef.current;
    if (!bar || !content) return;
    const nextWidth = Math.ceil(content.getBoundingClientRect().width) + 8;
    const previousWidth = lastWidthRef.current || Math.ceil(bar.getBoundingClientRect().width);
    if (previousModeRef.current !== mode && Math.abs(nextWidth - previousWidth) > 1) {
      widthAnimationRef.current?.cancel();
      const animation = bar.animate([{ width: `${previousWidth}px` }, { width: `${nextWidth}px` }], { duration: 320, easing: EASE });
      widthAnimationRef.current = animation;
      animation.onfinish = () => {
        lastWidthRef.current = nextWidth;
        widthAnimationRef.current = null;
      };
    } else {
      lastWidthRef.current = nextWidth;
    }
    previousModeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    const observer = new ResizeObserver(() => {
      if (widthAnimationRef.current?.playState === "running") return;
      lastWidthRef.current = Math.ceil(content.getBoundingClientRect().width) + 8;
    });
    observer.observe(content);
    return () => {
      observer.disconnect();
      widthAnimationRef.current?.cancel();
    };
  }, []);

  const busy = mode === "thinking" || mode === "streaming";
  const visible = open && positioned;
  const hasPrompt = prompt.trim().length > 0;
  const typing = mode === "idle" && hasPrompt ? typingWidth : null;
  const submitPrompt = () => onPrompt?.(prompt.trim());

  return (
    <div className={cn("w-full max-w-[460px]", className)}>
      <div ref={hostRef} className="relative select-none pb-12">
        <p className="text-[13px] leading-relaxed text-foreground">
          {before}
          <span ref={selectionRef} className="box-decoration-clone rounded-[calc(var(--radius)-7px)] bg-primary/15 text-foreground">
            {selection}
          </span>
          {after}
        </p>

        <div
          className="absolute top-0 left-0 z-10"
          style={{
            transform: `translate3d(${anchor.x}px, ${anchor.y}px, 0) translateX(-50%)`,
            transition: "transform 320ms cubic-bezier(0.77,0,0.175,1), opacity 180ms ease-out",
            opacity: visible ? 1 : 0,
            pointerEvents: visible ? "auto" : "none",
            willChange: "transform",
          }}
        >
          {/* A 36 px pill wraps 28 px controls at a 4 px inset: concentric radii. */}
          <div
            ref={barRef}
            className="flex h-9 w-fit max-w-[calc(100vw-48px)] items-center justify-center gap-0.5 overflow-hidden rounded-full bg-card p-1 font-sans font-normal text-card-foreground antialiased shadow-lg ring-1 ring-border"
            style={{
              width: typing ? typing : undefined,
              ...(visible ? { animation: `selection-actions-pop-in 220ms ${EASE} both` } : {}),
            }}
          >
            <div
              ref={contentRef}
              className="flex w-fit shrink-0 items-center justify-center gap-0.5"
              style={{ width: typing ? typing - 8 : undefined }}
            >
              {busy && (
                <span className="inline-flex h-7 items-center gap-1.5 whitespace-nowrap px-2.5 text-[12.5px] font-normal text-muted-foreground">
                  <span
                    className="size-3 shrink-0 rounded-full border-[1.5px] border-input border-t-muted-foreground"
                    style={{ animation: "selection-actions-spin 700ms linear infinite" }}
                  />
                  {mode === "thinking" ? <Shimmer>{busyLabel}…</Shimmer> : <span>{busyLabel}…</span>}
                </span>
              )}

              {mode === "result" && (
                <>
                  <button type="button" onClick={onKeep} className={primary}>
                    <Check {...icon} />
                    Keep
                  </button>
                  <button type="button" onClick={onDiscard} className={control}>
                    <X {...icon} />
                    Discard
                  </button>
                  <span className="mx-0.5 h-4 w-px shrink-0 bg-border" />
                  <button
                    type="button"
                    aria-label="Try again"
                    onClick={onRetry}
                    className="flex size-7 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-[background-color,color,transform] duration-150 hover:bg-foreground/8 active:scale-[0.96]"
                  >
                    <RefreshCw {...icon} />
                  </button>
                </>
              )}

              {mode === "idle" && (
                <>
                  <div
                    className="flex min-w-0 items-center overflow-hidden transition-[max-width,opacity,transform] duration-400"
                    style={{
                      maxWidth: expanded ? 0 : typing ? typing - 40 : 145,
                      opacity: expanded ? 0 : 1,
                      transform: expanded ? "translateX(-8px)" : "translateX(0)",
                      transitionTimingFunction: EASE,
                    }}
                  >
                    <form
                      className="flex h-7 shrink-0 items-center transition-[width] duration-400"
                      style={{ width: typing ? typing - 40 : 145, transitionTimingFunction: EASE }}
                      onSubmit={(event) => {
                        event.preventDefault();
                        if (hasPrompt) submitPrompt();
                        else onAction?.("improve");
                      }}
                    >
                      <input
                        value={prompt}
                        onChange={(event) => {
                          const next = event.target.value;
                          if (!prompt.trim() && next.trim()) setTypingWidth(Math.ceil(barRef.current?.getBoundingClientRect().width ?? 0));
                          else if (!next.trim()) setTypingWidth(null);
                          setPrompt(next);
                        }}
                        aria-label="Describe edits"
                        placeholder="Describe edits"
                        className="h-7 w-full bg-transparent pr-2.5 pl-3 text-[12.5px] text-foreground outline-none placeholder:text-muted-foreground"
                      />
                    </form>
                  </div>

                  <div
                    className="flex min-w-0 items-center gap-0.5 overflow-hidden transition-[max-width,opacity,transform] duration-400"
                    style={{
                      maxWidth: hasPrompt ? 0 : expanded ? 462 : 224,
                      opacity: hasPrompt ? 0 : 1,
                      transform: hasPrompt ? "translateX(-8px)" : "translateX(0)",
                      transitionTimingFunction: EASE,
                    }}
                  >
                    {!expanded && <span className="mx-1 h-4 w-px shrink-0 bg-input" />}
                    <button type="button" onClick={() => onAction?.("explain")} className={control}>
                      <MessageCircleQuestion {...icon} />
                      Explain
                    </button>
                    <button type="button" onClick={() => onAction?.("improve")} className={control}>
                      <Sparkle {...icon} />
                      Improve
                    </button>
                    <div
                      className="flex min-w-0 items-center gap-0.5 overflow-hidden transition-[max-width,opacity,margin] duration-400"
                      style={{ maxWidth: expanded ? 262 : 0, opacity: expanded ? 1 : 0, marginLeft: expanded ? 2 : 0, transitionTimingFunction: EASE }}
                    >
                      <button type="button" onClick={() => onAction?.("shorten")} className={control}>
                        <Scissors {...icon} />
                        Shorten
                      </button>
                      <button type="button" onClick={() => onAction?.("tone")} className={control}>
                        <Smile {...icon} />
                        Tone
                      </button>
                      <button type="button" onClick={() => onAction?.("grammar")} className={control}>
                        <SpellCheck {...icon} />
                        Grammar
                      </button>
                    </div>
                    <span className="mx-0.5 h-4 w-px shrink-0 bg-border" />
                    <button
                      type="button"
                      aria-label={expanded ? "Show fewer actions" : "Show more actions"}
                      aria-expanded={expanded}
                      onClick={() => setExpanded((value) => !value)}
                      className="flex size-7 shrink-0 items-center justify-center rounded-full text-foreground transition-[background-color,transform] duration-200 hover:bg-accent active:scale-[0.96]"
                    >
                      <span
                        className="flex transition-transform duration-400"
                        style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)", transitionTimingFunction: EASE }}
                      >
                        <ChevronRight {...icon} />
                      </span>
                    </button>
                  </div>

                  <div
                    className="flex min-w-0 items-center overflow-hidden transition-[max-width,opacity,transform] duration-400"
                    style={{
                      maxWidth: hasPrompt ? 30 : 0,
                      opacity: hasPrompt ? 1 : 0,
                      transform: hasPrompt ? "scale(1)" : "scale(0.88)",
                      transitionTimingFunction: EASE,
                    }}
                  >
                    <button
                      type="button"
                      aria-label="Send edit instruction"
                      onClick={submitPrompt}
                      className="flex size-7 shrink-0 items-center justify-center rounded-full bg-foreground text-card transition-[opacity,transform] duration-200 active:scale-[0.94]"
                    >
                      <ArrowUp size={16} strokeWidth={2.4} aria-hidden />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
