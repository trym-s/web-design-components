import { useEffect, useRef, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "./lib/utils";
import "./modal.css";

export type ModalProps = {
  /** Whether the dialog is shown. It mounts on open and unmounts after the 150 ms exit. */
  open: boolean;
  /** Called with `false` by the close button and by Escape. */
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  className?: string;
};

type Phase = "closed" | "mounted" | "open" | "closing";

/**
 * Dialog surface that scales up from the centre (0.96 → 1 + fade, 250 ms) and scales back while
 * fading (150 ms). It does not position itself or draw a scrim: place it in your overlay layer.
 */
export function Modal({ open, onOpenChange, children, className, ...aria }: ModalProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("closed");

  useEffect(() => {
    setPhase((p) => (open ? (p === "open" ? p : "mounted") : p === "closed" ? p : "closing"));
  }, [open]);

  useEffect(() => {
    // Mount first, add `.is-open` next frame so the entrance transition plays.
    if (phase === "mounted") {
      const id = requestAnimationFrame(() => requestAnimationFrame(() => setPhase("open")));
      return () => cancelAnimationFrame(id);
    }
    if (phase === "open") ref.current?.focus();
    if (phase === "closing") {
      const ms = ref.current ? parseFloat(getComputedStyle(ref.current).getPropertyValue("--modal-close-dur")) : NaN;
      const id = window.setTimeout(() => setPhase("closed"), Number.isFinite(ms) ? ms : 150);
      return () => window.clearTimeout(id);
    }
  }, [phase]);

  if (phase === "closed") return null;

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      onKeyDown={(e) => e.key === "Escape" && onOpenChange?.(false)}
      className={cn(
        "t-modal relative w-full max-w-sm rounded-xl bg-popover p-5 text-popover-foreground shadow-lg ring-1 ring-border outline-none",
        phase === "open" && "is-open",
        phase === "closing" && "is-closing",
        className,
      )}
      {...aria}
    >
      {children}
      <button
        type="button"
        aria-label="Close"
        onClick={() => onOpenChange?.(false)}
        className="absolute top-3 right-3 grid size-6 place-items-center rounded-full text-muted-foreground outline-none hover:bg-accent hover:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
      >
        <X className="size-3.5" />
      </button>
    </div>
  );
}
