/* Use when: A checkbox needs a clear completion cue: fill the box, then draw its checkmark.
 * Source: transitions.dev CSS tab; the site has no React tab for this newer free transition. */

import { useState } from "react";
import "./styles.css";

export function CheckboxCheck() {
  const [checked, setChecked] = useState(false);

  return (
    <button
      type="button"
      className="t-check"
      role="checkbox"
      aria-checked={checked}
      onClick={() => setChecked((value) => !value)}
    >
      <svg viewBox="0 0 10.1668 10.1668" aria-hidden="true">
        <path d="M1 5.52L3.92 9.17L9.17 1" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </button>
  );
}
