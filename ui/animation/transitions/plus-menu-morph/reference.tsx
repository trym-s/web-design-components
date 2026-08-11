/* Use when: A small circular trigger (a "+" FAB, a compose button, an add-action affordance) that **morphs into the menu / panel it opens** instead of popping a separate surface next to it. The button's box grows in width / height and relaxes its corner radius into a rounded panel while the plus icon cross-fades + rotates out and the menu content slides in. Reach for this over **menu dropdown** when the trigger and the surface are the *same* element (the button becomes the panel). Use plain **menu dropdown** when the surface is a distinct popover that merely grows from the trigger's corner.
 * Source: transitions.dev — React tab. */

import "./styles.css";

import { useEffect, useRef, useState } from "react";

// Pair with the CSS from the CSS tab.
// `data-open` drives the whole morph; CSS handles the size + radius
// animation and the plus ↔ menu cross-fade. Outside click / Escape
// close the menu.
export function PlusMenu({ children }) {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("click", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="t-morph" data-open={open ? "true" : "false"}>
      <div className="t-morph-menu" role="menu">{children}</div>
      <button
        type="button"
        className="t-morph-plus"
        aria-expanded={open ? "true" : "false"}
        aria-label="Open menu"
        onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
