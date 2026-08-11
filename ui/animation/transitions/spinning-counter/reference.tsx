/* Use when: A compact numeric value should visibly roll to its next value, such as a score, price, or live count.
 * Source: transitions.dev CSS tab; the site has no React tab for this newer free transition. */

import { useState } from "react";
import "./styles.css";

const DIGITS = Array.from({ length: 10 }, (_, value) => value);

export function SpinningCounter({ value = 128 }: { value?: number }) {
  const [spins, setSpins] = useState(0);

  return (
    <button type="button" className="t-reel" onClick={() => setSpins((count) => count + 1)}>
      {String(value).split("").map((character, index) => {
        const digit = Number(character);
        return (
          <span key={index} className="t-reel-col">
            <span
              className="t-reel-strip"
              style={{
                transform: `translateY(calc(-1 * var(--reel-cell) * ${spins * 10 + digit}))`,
                transition: `transform var(--reel-dur) var(--reel-ease) ${index * 60}ms`,
              }}
            >
              {[...DIGITS, ...DIGITS].map((item, itemIndex) => (
                <span key={itemIndex} className="t-reel-digit">{item}</span>
              ))}
            </span>
          </span>
        );
      })}
    </button>
  );
}
