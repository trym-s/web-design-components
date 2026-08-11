/* Use when: A disclosure / accordion / collapsible section whose panel grows and shrinks in height when toggled, with the header chevron flipping between a downward "v" and an upward "^". Use for settings groups, FAQs, filter sections, "show more" details — any header + collapsible body. Height animates via `grid-template-rows: 0fr ↔ 1fr`, so there's **no JS height measuring** and content of any size animates cleanly. The chevron flips vertically (`scaleY`) from a "v" to a "^", passing through a flat line at the midpoint.
 * Source: transitions.dev — React tab. */

import "./styles.css";

import { useState } from "react";

// Pair with the CSS from the CSS tab.
// `data-open` toggles the grid-rows height animation and the chevron
// path morph — no height measuring needed.
export function Accordion({ title, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="t-acc" data-open={open ? "true" : "false"}>
      <button
        type="button"
        className="t-acc-head"
        aria-expanded={open ? "true" : "false"}
        onClick={() => setOpen((v) => !v)}
      >
        {title}
        <span className="t-acc-chevron" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6.5L8 10.5L12 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      <div className="t-acc-panel">
        <div className="t-acc-panel-inner">{children}</div>
      </div>
    </div>
  );
}
