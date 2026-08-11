/* Use when: A lightweight like/favourite control should acknowledge a new selection with a heart fill, pop, and particle burst.
 * Source: transitions.dev CSS tab; the site has no React tab for this newer free transition. */

import { useEffect, useState, type CSSProperties } from "react";
import "./styles.css";

const PARTICLES = [
  ["-16px", "-12px"], ["0px", "-20px"], ["16px", "-12px"], ["20px", "2px"],
  ["12px", "16px"], ["-4px", "20px"], ["-18px", "12px"], ["-20px", "-2px"],
];

export function LikeButton() {
  const [liked, setLiked] = useState(false);
  const [bursting, setBursting] = useState(false);

  useEffect(() => {
    if (!bursting) return;
    const id = window.setTimeout(() => setBursting(false), 500);
    return () => window.clearTimeout(id);
  }, [bursting]);

  const toggle = () => {
    setLiked((value) => {
      if (!value) setBursting(true);
      return !value;
    });
  };

  return (
    <button
      type="button"
      className={`t-like${bursting ? " is-bursting" : ""}`}
      data-liked={liked}
      aria-pressed={liked}
      onClick={toggle}
    >
      <span className="t-like-icon">
        <svg className="t-like-heart" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 21s-7-4.35-9.35-8.5C.48 8.67 2.72 5 6.5 5c2.1 0 3.7 1.1 4.5 2.6C11.8 6.1 13.4 5 15.5 5c3.78 0 6.02 3.67 3.85 7.5C19 16.65 12 21 12 21Z" />
        </svg>
      </span>
      <span className="t-like-particles" aria-hidden="true">
        {PARTICLES.map(([x, y], index) => (
          <i key={index} style={{ "--px": x, "--py": y } as CSSProperties} />
        ))}
      </span>
      {liked ? "Liked" : "Like"}
    </button>
  );
}
