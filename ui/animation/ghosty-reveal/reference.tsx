/* Use when: an image or block should bleed in through a soft feathered fog edge
 * instead of a plain fade. */

"use client";

import { useState } from "react";
import { GhostReveal } from "./src/ghosty-reveal/standalone/GhostReveal";

/* The upstream mask is a feathered PNG. This inline SVG ramp is the same idea in
 * a data URI, so the reference runs with no external asset. */
const MASK =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="800" preserveAspectRatio="none">
       <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
         <stop offset="0%" stop-color="#000" stop-opacity="0"/>
         <stop offset="45%" stop-color="#000" stop-opacity="0.35"/>
         <stop offset="70%" stop-color="#000" stop-opacity="1"/>
       </linearGradient></defs>
       <rect width="8" height="800" fill="url(#g)"/>
     </svg>`,
  );

export default function GhostyRevealReference() {
  const [play, setPlay] = useState(true);
  return (
    <div style={{ display: "grid", gap: 16, justifyItems: "center" }}>
      <GhostReveal maskSrc={MASK} direction="up" duration={1400} play={play}>
        <div
          style={{
            width: 320,
            height: 200,
            borderRadius: 16,
            background: "linear-gradient(140deg,#7aa2ff,#c084fc 55%,#f472b6)",
          }}
        />
      </GhostReveal>
      <button onClick={() => setPlay((p) => !p)}>replay</button>
    </div>
  );
}
