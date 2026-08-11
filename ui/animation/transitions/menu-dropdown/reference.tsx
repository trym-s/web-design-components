/* Use when: Contextual menus, dropdowns, popovers — anything that opens from a trigger and should visually grow from that trigger's position. Origin-aware via `data-origin` (top-left, top-center, top-right, bottom-*).
 * Source: transitions.dev — React tab. */

import "./styles.css";

import { useEffect, useState } from "react";

// Pair with the CSS from the CSS tab (.t-dropdown + .is-open / .is-closing).
export function MenuDropdown() {
  // "closed" | "open" | "closing"
  const [state, setState] = useState("closed");

  // Hold `.is-closing` for the exit duration, then fully unmount state.
  useEffect(() => {
    if (state !== "closing") return;
    const ms = readMs("--dropdown-close-dur", 200);
    const id = window.setTimeout(() => setState("closed"), ms);
    return () => window.clearTimeout(id);
  }, [state]);

  const toggle = () =>
    setState((s) => (s === "open" ? "closing" : "open"));

  return (
    <>
      <button type="button" onClick={toggle}>Toggle menu</button>
      <div
        role="menu"
        data-origin="top-center"
        className={
          "t-dropdown" +
          (state === "open" ? " is-open" : "") +
          (state === "closing" ? " is-closing" : "")
        }
      >
        <button type="button" role="menuitem">Item 1</button>
        <button type="button" role="menuitem">Item 2</button>
      </div>
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
