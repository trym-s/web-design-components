/* Use when: A headline + supporting line that rise into view with staggered blur — hero copy, empty states, onboarding steps. Exit is decoupled: a single quiet fade with no Y-return so dismissing doesn't replay the reveal in reverse.
 * Source: transitions.dev — React tab. */

import "./styles.css";

import { useRef, useState } from "react";

// Pair with the CSS from the CSS tab.
// Two states: idle → shown (staggered entrance) and shown → hiding
// (quick fade-out, no Y return). The hiding class is held only long
// enough for the 200ms fade to play, then dropped so the next show
// can replay the staggered entrance from a clean state.
export function StaggerReveal({ primary, secondary }) {
  const [shown, setShown]   = useState(false);
  const [hiding, setHiding] = useState(false);
  const timerRef = useRef(null);

  const onAnimate = () => {
    if (shown) {
      // shown → hiding (fade out in place)
      setShown(false);
      setHiding(true);
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => setHiding(false), 200);
    } else {
      // idle → shown (replay the staggered entrance)
      if (timerRef.current) window.clearTimeout(timerRef.current);
      setHiding(false);
      // setState is async — flip to shown on the next tick so React
      // doesn't batch idle→shown into a single render and skip the
      // entrance transition.
      window.requestAnimationFrame(() => setShown(true));
    }
  };

  const cls = "t-stagger" +
    (shown  ? " is-shown"  : "") +
    (hiding ? " is-hiding" : "");

  return (
    <>
      <button type="button" onClick={onAnimate}>Animate</button>
      <div className={cls}>
        <strong className="t-stagger-line t-stagger-line--1">{primary}</strong>
        <span    className="t-stagger-line t-stagger-line--2">{secondary}</span>
      </div>
    </>
  );
}
