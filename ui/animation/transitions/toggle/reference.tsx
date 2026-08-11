/* Use when: A binary switch should feel physical, with a thumb travel and subtle overshoot.
 * Source: transitions.dev CSS tab; the site has no React tab for this newer free transition. */

import { useState } from "react";
import "./styles.css";

export function Toggle() {
  const [on, setOn] = useState(false);

  return (
    <button
      type="button"
      className="t-toggle is-init"
      role="switch"
      aria-checked={on}
      data-on={on}
      onClick={() => setOn((value) => !value)}
    >
      <span className="t-toggle-thumb" />
    </button>
  );
}
