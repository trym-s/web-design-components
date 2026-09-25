import { useEffect, useState } from "react";
import { cn } from "./lib/utils";
import "./number-pop-in.css";

export type NumberPopInProps = {
  /** The formatted value; each character animates on its own. */
  value: string;
  /** Change it to replay the pop-in without changing `value`. */
  replayKey?: number;
  className?: string;
};

/**
 * Number whose characters rise 8 px into place with a 2 px blur and an overshoot ease (500 ms).
 * The 2nd and 3rd characters wait 70 / 140 ms. Replays whenever `value` or `replayKey` changes.
 */
export function NumberPopIn({ value, replayKey = 0, className }: NumberPopInProps) {
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    // Replay: strip the class, wait two frames, then re-add it.
    setPlaying(false);
    let inner = 0;
    const outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setPlaying(true));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, [value, replayKey]);

  return (
    <span className={cn("t-digit-group tabular-nums", playing && "is-animating", className)} aria-label={value} role="img">
      {value.split("").map((ch, i) => (
        <span key={i} className="t-digit" data-stagger={i > 0 ? i : undefined} aria-hidden="true">
          {ch}
        </span>
      ))}
    </span>
  );
}
