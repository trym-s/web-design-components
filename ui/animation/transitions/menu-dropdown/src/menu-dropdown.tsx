import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "./lib/utils";
import "./menu-dropdown.css";

export type DropdownOrigin = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";

export type MenuDropdownProps = {
  /** Whether the menu is shown. Closing plays the exit (150 ms) before the menu goes inert. */
  open: boolean;
  /** Corner the menu grows from — match it to where the trigger sits. */
  origin?: DropdownOrigin;
  /** Menu items; give each `role="menuitem"`. */
  children: ReactNode;
  id?: string;
  className?: string;
};

type Phase = "closed" | "open" | "closing";

/**
 * Menu surface that scales in from its trigger's side (0.97 → 1, 250 ms) and fades out with a
 * smaller 0.99 scale (150 ms). Position it yourself (e.g. absolutely under the trigger).
 */
export function MenuDropdown({ open, origin = "top-left", children, id, className }: MenuDropdownProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>(open ? "open" : "closed");

  useEffect(() => {
    setPhase((p) => (open ? "open" : p === "open" ? "closing" : p));
  }, [open]);

  // Hold `.is-closing` for the exit duration, then settle on closed.
  useEffect(() => {
    if (phase !== "closing" || !ref.current) return;
    const ms = parseFloat(getComputedStyle(ref.current).getPropertyValue("--dropdown-close-dur"));
    const t = window.setTimeout(() => setPhase("closed"), Number.isFinite(ms) ? ms : 150);
    return () => window.clearTimeout(t);
  }, [phase]);

  return (
    <div
      ref={ref}
      id={id}
      role="menu"
      data-origin={origin}
      aria-hidden={phase !== "open"}
      className={cn(
        "t-dropdown w-56 rounded-xl bg-popover p-1.5 text-sm text-popover-foreground shadow-lg ring-1 ring-border",
        phase === "open" && "is-open",
        phase === "closing" && "is-closing",
        phase === "closed" && "invisible",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Row styling for a menu entry (plain button with `role="menuitem"`). */
export function MenuDropdownItem({ children, onSelect }: { children: ReactNode; onSelect?: () => void }) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onSelect}
      className="flex h-9 w-full items-center gap-2 rounded-lg px-2.5 text-left outline-none hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent"
    >
      {children}
    </button>
  );
}
