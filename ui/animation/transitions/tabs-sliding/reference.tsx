/* Use when: A segmented control / tab bar where the active pill slides between options — view switchers, filter segments, small mutually-exclusive button sets. JS writes the active tab's `offsetLeft` / `offsetWidth` onto the pill; CSS owns the tween.
 * Source: transitions.dev — React tab. */

import "./styles.css";

import { useEffect, useRef, useState } from "react";

// Pair with the CSS from the CSS tab.
// The pill's transform + width are written inline by JS so the
// CSS transition tweens between the previous and next measured
// positions. We re-snap (no animation) on resize so a viewport
// change doesn't desync the pill from its tab.
export function SlidingTabs({ tabs }) {
  const rootRef = useRef(null);
  const pillRef = useRef(null);
  const tabRefs = useRef([]);
  const [active, setActive] = useState(0);

  const moveTo = (idx, animate) => {
    const tab = tabRefs.current[idx];
    const pill = pillRef.current;
    if (!tab || !pill) return;
    const left = tab.offsetLeft;
    const width = tab.offsetWidth;
    if (!animate) {
      const prev = pill.style.transition;
      pill.style.transition = "none";
      pill.style.transform = `translateX(${left}px)`;
      pill.style.width = `${width}px`;
      void pill.offsetWidth;
      pill.style.transition = prev;
    } else {
      pill.style.transform = `translateX(${left}px)`;
      pill.style.width = `${width}px`;
    }
  };

  useEffect(() => {
    const id = window.requestAnimationFrame(() => moveTo(active, false));
    const onResize = () => moveTo(active, false);
    window.addEventListener("resize", onResize);
    return () => {
      window.cancelAnimationFrame(id);
      window.removeEventListener("resize", onResize);
    };
  }, [active]);

  return (
    <div ref={rootRef} className="t-tabs" role="tablist">
      <span ref={pillRef} className="t-tabs-pill" aria-hidden="true" />
      {tabs.map((label, i) => (
        <button
          key={label}
          ref={(el) => { tabRefs.current[i] = el; }}
          type="button"
          className="t-tab"
          role="tab"
          aria-selected={i === active}
          onClick={() => { setActive(i); moveTo(i, true); }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
