/* Use when: Hovering an item in a horizontal stack (avatar row, chip group, badge cluster, segmented button) should lift the hovered item, gently lift its neighbors with a power-falloff, then snap everything back with an overshoot spring on `mouseleave`. Direction-aware easing (clean ease-in on hover, bouncy ease-out on return) is what gives the group its springy, physical feel. Equally good for: pill stacks in a tag editor, chips in a filter bar, reaction-emoji rows, anywhere a horizontal row benefits from a "comb" interaction signal.
 * Source: transitions.dev — React tab. */

import "./styles.css";

import { useRef } from "react";

// Pair with the CSS from the CSS tab.
// `items` is any list of React nodes (avatars, chips, badges, etc.) —
// this hook only owns the hover-spring transition. Each item is wrapped
// in a .t-avatar so it picks up the transform/transition rules from CSS.
//
// On mouseenter of any sibling, we write per-item:
//   --shift         = lift * pow(falloff, distance from hovered)
//   --scale-active  = scale on the hovered item, 1 elsewhere
// Direction-aware easing: we set transition-timing-function inline
// BEFORE the variable writes so the lift uses --avatar-ease-in
// (clean) and the return uses --avatar-ease-out (bouncy spring).
export function AvatarGroup({ items }) {
  const rootRef = useRef(null);

  const setShifts = (activeIdx, phase) => {
    if (!rootRef.current) return;
    const cs = getComputedStyle(document.documentElement);
    const num = (name, fb) => {
      const v = parseFloat(cs.getPropertyValue(name));
      return Number.isFinite(v) ? v : fb;
    };
    const ease = (name, fb) =>
      cs.getPropertyValue(name).trim() || fb;

    const lift    = num("--avatar-lift", -4);
    const falloff = num("--avatar-falloff", 0.45);
    const scale   = num("--avatar-scale", 1.05);
    const tf      = phase === "out"
      ? ease("--avatar-ease-out", "cubic-bezier(0.34, 3.85, 0.64, 1)")
      : ease("--avatar-ease-in",  "cubic-bezier(0.22, 1, 0.36, 1)");

    const els = rootRef.current.querySelectorAll(".t-avatar");
    els.forEach((el, i) => {
      el.style.transitionTimingFunction = tf;
      if (activeIdx == null) {
        el.style.setProperty("--shift", "0px");
        el.style.setProperty("--scale-active", "1");
        return;
      }
      const d = Math.abs(i - activeIdx);
      el.style.setProperty(
        "--shift",
        (lift * Math.pow(falloff, d)).toFixed(3) + "px"
      );
      el.style.setProperty(
        "--scale-active",
        i === activeIdx ? String(scale) : "1"
      );
    });
  };

  return (
    <div
      ref={rootRef}
      onMouseLeave={() => setShifts(null, "out")}
    >
      {items.map((node, i) => (
        <div
          key={i}
          className="t-avatar"
          onMouseEnter={() => setShifts(i, "in")}
        >
          {node}
        </div>
      ))}
    </div>
  );
}
