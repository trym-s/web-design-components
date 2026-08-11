/* Use when: Tweening a container's width or height when its layout state changes (compact ↔ expanded card, collapsing panel, list row toggling extra detail). Pure CSS — no JS required beyond the class toggle that drives the size change.
 * Source: transitions.dev — React tab. */

import "./styles.css";

import { useState } from "react";

// Pair with the CSS from the CSS tab (.t-resize tweens width + height).
export function CardResize() {
  const [small, setSmall] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setSmall((v) => !v)}>
        {small ? "Expand" : "Shrink"}
      </button>
      <div
        className="t-resize"
        style={{
          width: small ? 160 : 260,
          height: small ? 100 : 180,
        }}
      />
    </>
  );
}
