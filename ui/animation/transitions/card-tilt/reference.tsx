/* Use when: A card / tile / media surface that tilts in 3D toward the pointer while hovered, with a soft light "glare" tracking the cursor across it. Use for product cards, credit / membership cards, feature tiles, cover art — anything that should feel physical and reactive on hover. Pointer-only (skips touch) and flattens under reduced motion. The pointer is tracked on an **outer flat wrapper** (`.t-tilt`) that never transforms, so the tilting card can't rotate its own edges out from under the cursor (which causes hover flicker). The inner `.t-tilt-card` is the element that actually rotates.
 * Source: transitions.dev — React tab. */

import "./styles.css";

import { useRef } from "react";

// Pair with the CSS from the CSS tab.
// The pointer is tracked on the OUTER wrapper (which never transforms)
// so the tilting card can't pull its own edges out from under the
// cursor. rotateX/Y + glare position are written into CSS vars.
export function TiltCard({ children, max = 32 }) {
  const wrapRef = useRef(null);
  const cardRef = useRef(null);

  const onMove = (e) => {
    const wrap = wrapRef.current;
    const card = cardRef.current;
    if (!wrap || !card) return;
    const r = wrap.getBoundingClientRect();
    const px = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    const py = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
    wrap.classList.add("is-hover");
    card.classList.add("is-tilting");
    card.style.setProperty("--tilt-ry", ((px - 0.5) * max).toFixed(2) + "deg");
    card.style.setProperty("--tilt-rx", ((0.5 - py) * max).toFixed(2) + "deg");
    card.style.setProperty("--tilt-gx", (px * 100).toFixed(1) + "%");
    card.style.setProperty("--tilt-gy", (py * 100).toFixed(1) + "%");
  };

  const onLeave = () => {
    const wrap = wrapRef.current;
    const card = cardRef.current;
    if (wrap) wrap.classList.remove("is-hover");
    if (card) {
      card.classList.remove("is-tilting");
      card.style.setProperty("--tilt-rx", "0deg");
      card.style.setProperty("--tilt-ry", "0deg");
    }
  };

  return (
    <div ref={wrapRef} className="t-tilt" onPointerMove={onMove} onPointerLeave={onLeave}>
      <div ref={cardRef} className="t-tilt-card">
        {children}
        <div className="t-tilt-glare" aria-hidden="true" />
      </div>
    </div>
  );
}
