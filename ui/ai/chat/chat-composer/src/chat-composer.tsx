import { useRef, useState, type ReactNode } from "react";
import { cn } from "./lib/utils";
import "./chat-composer.css";

/* ─────────────────────────────────────────────────────────
 * CHAT — panel with tabs, replies, and composer.
 * The conversation region is fixed so the card never changes shape.
 * ───────────────────────────────────────────────────────── */

export type ChatSection = {
  label: string;
  sub: string;
  time: string;
  body: ReactNode;
  /** Still resolving: dimmed (55 %), 0.5 px blur, scaled to 0.985. */
  resolving?: boolean;
};

export type ChatHeaderAction = "new" | "history" | "more";

const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";

const ACTION_ICONS: { key: ChatHeaderAction; label: string; icon: ReactNode }[] = [
  { key: "new", label: "New chat", icon: <path d="M12 5v14M5 12h14" /> },
  { key: "history", label: "History", icon: <g><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></g> },
  {
    key: "more",
    label: "More",
    icon: <g fill="currentColor" stroke="none"><circle cx="5" cy="12" r="1.8" /><circle cx="12" cy="12" r="1.8" /><circle cx="19" cy="12" r="1.8" /></g>,
  },
];

function Section({ label, sub, time, body, resolving }: ChatSection) {
  return (
    <div
      className="flex w-full flex-col gap-1.5 transition-[opacity,filter,transform] duration-400"
      style={{
        opacity: resolving ? 0.55 : 1,
        filter: resolving ? "blur(0.5px)" : "blur(0)",
        transform: resolving ? "scale(0.985)" : "scale(1)",
        transformOrigin: "top left",
        transitionTimingFunction: EASE,
        animation: "fade-up 400ms cubic-bezier(0.23,1,0.32,1) both",
      }}
    >
      <div className="flex items-center gap-1 text-[12px] leading-[1.3]">
        <span className="font-medium text-foreground">{label}</span>
        <span className="text-muted-foreground">{sub}</span>
        <span className="text-foreground">for {time}</span>
      </div>
      <p className="text-[13px] leading-normal text-foreground">{body}</p>
    </div>
  );
}

export function ChatComposer({
  tabs,
  activeTab,
  onTabChange,
  onAction,
  userMessage,
  sections = [],
  placeholder = "Prompt or tag a flavor with @",
  onSend,
  className,
}: {
  tabs: string[];
  activeTab: string;
  onTabChange?: (tab: string) => void;
  onAction?: (action: ChatHeaderAction) => void;
  /** The last user prompt; the bubble is hidden (opacity 0, 10 px lower) while it is empty. */
  userMessage?: string;
  sections?: ChatSection[];
  placeholder?: string;
  onSend?: (text: string) => void;
  className?: string;
}) {
  const [draft, setDraft] = useState("");
  const [lastMessage, setLastMessage] = useState(userMessage ?? "");
  const inputRef = useRef<HTMLInputElement>(null);
  if (userMessage && userMessage !== lastMessage) setLastMessage(userMessage);
  const shown = Boolean(userMessage);
  const canSend = draft.trim().length > 0;

  const send = () => {
    if (!canSend) return;
    onSend?.(draft.trim());
    setDraft("");
  };

  return (
    <div
      className={cn(
        "flex h-[288px] w-full max-w-95 flex-col self-start overflow-hidden rounded-xl bg-card shadow-xs ring-1 ring-border",
        className,
      )}
    >
      {/* header — tabs + actions */}
      <div className="flex shrink-0 items-center justify-between border-b border-border p-1.5">
        <div className="flex items-center">
          {tabs.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={activeTab === item}
              onClick={() => onTabChange?.(item)}
              className={cn(
                "rounded-sm px-2 py-[3px] text-[13px] text-foreground transition-[background-color,opacity] duration-100",
                activeTab === item ? "bg-muted" : "opacity-50 hover:opacity-75",
              )}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1">
          {ACTION_ICONS.map(({ key, label, icon }) => (
            <button
              key={key}
              type="button"
              aria-label={label}
              onClick={() => onAction?.(key)}
              className="flex size-6 items-center justify-center rounded-sm text-muted-foreground transition-colors duration-100 hover:bg-accent hover:text-muted-foreground"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {icon}
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* conversation — fixed region so the card never changes shape */}
      <div className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto px-3 pt-2.5 pb-1">
        <div className="flex justify-end pl-14">
          <div
            className="rounded-[calc(var(--radius)+2px)] bg-muted px-3 py-1.5 text-[13px] leading-[1.4] text-foreground transition-[opacity,transform] duration-300"
            style={{
              opacity: shown ? 1 : 0,
              transform: shown ? "translateY(0)" : "translateY(10px)",
              transitionTimingFunction: EASE,
            }}
          >
            {userMessage || lastMessage}
          </div>
        </div>
        {sections.map((section) => (
          <Section key={section.label} {...section} />
        ))}
      </div>

      {/* composer */}
      <div className="mt-auto shrink-0 p-1.5">
        <div
          role="presentation"
          onClick={() => inputRef.current?.focus()}
          className="flex cursor-text flex-col gap-2 rounded-md border border-border bg-muted p-2.5 shadow-xs transition-[border-color,box-shadow] duration-150 focus-within:border-input"
        >
          <input
            ref={inputRef}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") send();
            }}
            placeholder={placeholder}
            aria-label="Chat prompt"
            className="min-h-4.5 bg-transparent text-[13px] leading-[1.4] text-foreground outline-none placeholder:text-muted-foreground"
          />
          <div className="flex items-center justify-end">
            <button
              type="button"
              aria-label="Send"
              disabled={!canSend}
              onClick={send}
              className={cn(
                "flex size-7 items-center justify-center rounded-md transition-[background-color,color,transform] duration-200 enabled:active:scale-[0.96]",
                canSend ? "bg-foreground text-card" : "bg-input text-muted-foreground",
              )}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
