/* Use when: Cross-fading two icons in the same slot — hamburger ↔ close, sun ↔ moon, play ↔ pause, expand ↔ collapse. Both icons stay in the DOM stacked in the same grid cell.
 * Source: transitions.dev — React tab. */

import "./styles.css";

import { useState } from "react";

// Pair with the CSS from the CSS tab (.t-icon-swap + data-state a/b).
export function IconSwap({ iconA, iconB }) {
  const [state, setState] = useState("a");

  return (
    <button
      type="button"
      aria-label={state === "a" ? "Show B" : "Show A"}
      onClick={() => setState((s) => (s === "a" ? "b" : "a"))}
    >
      <span className="t-icon-swap" data-state={state}>
        <span className="t-icon" data-icon="a">{iconA}</span>
        <span className="t-icon" data-icon="b">{iconB}</span>
      </span>
    </button>
  );
}
