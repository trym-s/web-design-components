/* Use when: Confirming a completed action — payment processed, file uploaded, message sent, form saved. The icon fades in, rotates upright, settles with a Y-bob, and (for SVG icons) draws its path stroke. Use whenever a status changes from "pending / unknown" to "success" and you want the moment to feel earned rather than instantaneous. The snippet covers the **appear transition only** — bring your own hide behavior (e.g. unmount, opacity:0, or a custom exit). This is intentional: success states are usually persistent, and a soft fade-out is rarely worth the extra DOM/JS surface.
 * Source: transitions.dev — React tab. */

import "./styles.css";

import { useRef, useState } from "react";

// Pair with the CSS from the CSS tab.
// The .t-success-check wrapper is the API surface — drop any icon
// (SVG, image, glyph) inside it. data-state drives the appear
// transition: "out" is the resting hidden state (opacity 0, no
// animation), "in" runs fade + rotate + blur + Y-bob + path draw
// in parallel. To replay "in" cleanly on rapid re-triggers we clear
// the state and re-apply it after a forced layout commit so the
// keyframes restart from offset 0.
//
// This snippet covers the appear transition only — bring your own
// hide behavior (unmount, opacity:0, or a custom exit).
export function SuccessCheck({ children }) {
  const [state, setState] = useState("out");
  const ref = useRef(null);

  const show = () => {
    setState("out");
    requestAnimationFrame(() => {
      if (ref.current) void ref.current.offsetWidth;
      setState("in");
    });
  };

  return (
    <>
      <button type="button" onClick={show}>Animate</button>
      <span
        ref={ref}
        className="t-success-check"
        data-state={state}
        aria-hidden="true"
      >
        {children /* drop your SVG / icon here */}
      </span>
    </>
  );
}
