/* Use when: A placeholder that loads then reveals real content — list rows, cards, profile headers. The skeleton pulses, then both layers cross-fade with a matching cross-blur. Bring your own bars / avatar / text; the skeleton stays in the same slot as the content so the swap is layout-free.
 * Source: transitions.dev — React tab. */

import "./styles.css";

import { useRef, useState } from "react";

// Pair with the CSS from the CSS tab.
// `loading` is yours to drive (data fetch, route change, etc.).
// On every fresh load → ready cycle, call `replay()` to flash the
// skeleton again before revealing the content.
export function SkeletonReveal({ skeleton, children }) {
  const wrapRef = useRef(null);
  const skelRef = useRef(null);
  const timerRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  const replay = () => {
    const wrap = wrapRef.current;
    const skel = skelRef.current;
    if (!wrap || !skel) return;
    if (timerRef.current) window.clearTimeout(timerRef.current);
    // Snap-back: kill transitions for one frame so the reverse
    // (revealed → skeleton) is instant.
    wrap.classList.add("is-resetting");
    setRevealed(false);
    skel.classList.remove("is-pulsing");
    void skel.offsetWidth;
    wrap.classList.remove("is-resetting");
    skel.classList.add("is-pulsing");
    const dur = readMs("--pulse-dur", 1000);
    const count = parseFloat(
      getComputedStyle(document.documentElement)
        .getPropertyValue("--pulse-count")
    ) || 1;
    timerRef.current = window.setTimeout(() => {
      setRevealed(true);
      timerRef.current = null;
    }, dur * count);
  };

  return (
    <>
      <button type="button" onClick={replay}>Animate</button>
      <div
        ref={wrapRef}
        className={"t-skel" + (revealed ? " is-revealed" : "")}
      >
        <div ref={skelRef} className="t-skel-skeleton is-pulsing" aria-hidden="true">
          {skeleton}
        </div>
        <div className="t-skel-content">{children}</div>
      </div>
    </>
  );
}

function readMs(name, fallback) {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(name).trim();
  const n = parseFloat(raw);
  return Number.isFinite(n) ? n : fallback;
}
