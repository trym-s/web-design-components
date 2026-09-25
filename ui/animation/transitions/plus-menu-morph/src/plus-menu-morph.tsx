import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "./lib/utils";
import "./plus-menu-morph.css";

export type PlusMenuProps = {
  /** Menu content, laid out inside the open 183 × 172 px panel. */
  children: ReactNode;
  /** Controlled open state. */
  open?: boolean;
  /** Initial open state when uncontrolled. */
  defaultOpen?: boolean;
  /** Called by the plus button, outside clicks and Escape. */
  onOpenChange?: (open: boolean) => void;
  "aria-label"?: string;
  className?: string;
};

/**
 * 40 px round "+" button that morphs into its own menu panel: the box grows to 183 × 172 px and
 * relaxes its radius (bouncy 350 ms) while the plus slides out rotating into an × and the menu
 * slides in. The plus sits bottom-right, so anchor the root by its bottom-right corner.
 */
export function PlusMenu({
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  "aria-label": label = "Open menu",
  className,
}: PlusMenuProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inner, setInner] = useState(defaultOpen);
  const open = openProp ?? inner;
  const setOpen = (next: boolean) => {
    if (openProp === undefined) setInner(next);
    onOpenChange?.(next);
  };
  const setOpenRef = useRef(setOpen);
  setOpenRef.current = setOpen;

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpenRef.current(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenRef.current(false);
    };
    document.addEventListener("click", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className={cn("t-morph bg-popover text-popover-foreground shadow-md ring-1 ring-border", className)}
      data-open={open ? "true" : "false"}
    >
      <div className="t-morph-menu" role="menu" inert={!open}>
        {children}
      </div>
      <button
        type="button"
        className="t-morph-plus rounded-full text-foreground outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:ring-inset"
        aria-expanded={open}
        aria-label={label}
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
