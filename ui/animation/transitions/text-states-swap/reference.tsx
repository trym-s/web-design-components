/* Use when: Swapping the text of a status indicator in place — "Processing…" → "Done", "Save" → "Saved". The old text exits up with blur, the new text enters from below.
 * Source: transitions.dev — React tab. */

import "./styles.css";

import { useRef, useState } from "react";

// Pair with the CSS from the CSS tab.
// Three-phase text swap: exit old ->  swap text ->  enter new.
const MESSAGES = [
  "Transaction processing...",
  "Transaction completed",
];

export function TextStatesSwap() {
  const [index, setIndex] = useState(0);
  const ref = useRef(null);
  const busy = useRef(false);

  const next = () => {
    if (busy.current) return;
    const el = ref.current;
    if (!el) return;
    busy.current = true;
    const dur = readMs("--text-swap-dur", 200);

    el.classList.add("is-exit");
    window.setTimeout(() => {
      setIndex((i) => (i + 1) % MESSAGES.length);

      // Jump below (no transition), then release so it animates back.
      el.classList.remove("is-exit");
      el.classList.add("is-enter-start");
      void el.offsetWidth; // force reflow
      el.classList.remove("is-enter-start");
      busy.current = false;
    }, dur);
  };

  return (
    <>
      <span className="t-text-swap" ref={ref}>{MESSAGES[index]}</span>
      <button type="button" onClick={next}>Next</button>
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
