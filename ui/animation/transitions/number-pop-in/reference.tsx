/* Use when: Counters, prices, balances, or any number that updates and should re-enter from a direction with blur. Each character animates independently and the last two digits stagger so decimals feel alive without looking chaotic.
 * Source: transitions.dev — React tab. */

import "./styles.css";

import { useState } from "react";

// Pair with the CSS from the CSS tab.
// Toggle `.is-animating` to replay the pop-in sequence.
export function NumberPopIn({ value = "123" }) {
  const [playing, setPlaying] = useState(true);

  // Replay: strip the class, force a reflow via rAF, then re-add.
  const replay = () => {
    setPlaying(false);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setPlaying(true))
    );
  };

  return (
    <>
      <button type="button" onClick={replay}>Animate</button>
      <span className={"t-digit-group" + (playing ? " is-animating" : "")}>
        {value.split("").map((ch, i) => (
          <span
            key={i}
            className="t-digit"
            data-stagger={i > 0 ? i : undefined}
          >
            {ch}
          </span>
        ))}
      </span>
    </>
  );
}
