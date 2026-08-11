/* Use when: Modal dialogs and full-overlay surfaces that scale up from center. Use when the surface is conceptually "on top of" the page rather than anchored to a trigger.
 * Source: transitions.dev — React tab. */

import "./styles.css";

import { useEffect, useState } from "react";

// Pair with the CSS from the CSS tab (.t-modal + .is-open / .is-closing).
export function Modal({ children }) {
  // "closed" | "open" | "closing"
  const [state, setState] = useState("closed");

  useEffect(() => {
    if (state !== "closing") return;
    const ms = readMs("--modal-close-dur", 150);
    const id = window.setTimeout(() => setState("closed"), ms);
    return () => window.clearTimeout(id);
  }, [state]);

  const open = () => setState("open");
  const close = () => setState("closing");

  return (
    <>
      <button type="button" onClick={open}>Open modal</button>

      {state !== "closed" && (
        <div
          role="dialog"
          aria-modal="true"
          className={
            "t-modal" +
            (state === "open" ? " is-open" : "") +
            (state === "closing" ? " is-closing" : "")
          }
        >
          {children}
          <button type="button" onClick={close}>Close</button>
        </div>
      )}
    </>
  );
}

function readMs(name, fallback) {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  const n = parseFloat(raw);
  return Number.isFinite(n) ? n : fallback;
}
