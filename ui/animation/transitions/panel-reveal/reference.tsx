/* Use when: A panel that slides into view inside an existing container — e.g. detail panel inside a card, expanding section. Combines a short translate, opacity, and a 2px cross-blur so a half-height travel still reads as a full open.
 * Source: transitions.dev — React tab. */

import "./styles.css";

import { useState } from "react";

// Pair with the CSS from the CSS tab (.t-panel-slide + data-open).
export function PanelReveal({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen((v) => !v)}>
        {open ? "Hide" : "Show"} panel
      </button>

      {/* Wrap the panel in a container that clips the travel area. */}
      <div style={{ overflow: "hidden" }}>
        <div className="t-panel-slide" data-open={open}>
          {children}
        </div>
      </div>
    </>
  );
}
