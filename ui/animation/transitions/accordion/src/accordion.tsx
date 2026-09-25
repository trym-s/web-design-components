import { useId, useState, type ReactNode } from "react";
import { cn } from "./lib/utils";
import "./accordion.css";

export type AccordionProps = {
  title: ReactNode;
  children: ReactNode;
  /** Controlled open state. */
  open?: boolean;
  /** Initial open state when uncontrolled. */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
};

/**
 * Disclosure whose panel animates height via `grid-template-rows: 0fr ↔ 1fr` (no JS measuring)
 * while the chevron flips (v ↔ ^). `data-open` on the root drives every transition.
 */
export function Accordion({ title, children, open: openProp, defaultOpen = false, onOpenChange, className }: AccordionProps) {
  const [inner, setInner] = useState(defaultOpen);
  const open = openProp ?? inner;
  const panelId = useId();
  const toggle = () => {
    if (openProp === undefined) setInner(!open);
    onOpenChange?.(!open);
  };

  return (
    <div
      className={cn("t-acc w-full rounded-xl border bg-card text-card-foreground shadow-sm", className)}
      data-open={open ? "true" : "false"}
    >
      <button
        type="button"
        className="flex h-14 w-full items-center justify-between gap-4 rounded-xl px-6 text-left text-sm font-medium outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={toggle}
      >
        {title}
        <span className="t-acc-chevron text-muted-foreground" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6.5L8 10.5L12 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      <div className="t-acc-panel" id={panelId}>
        <div className="t-acc-panel-inner">
          <div className="px-6 pb-5 text-sm text-muted-foreground">{children}</div>
        </div>
      </div>
    </div>
  );
}
