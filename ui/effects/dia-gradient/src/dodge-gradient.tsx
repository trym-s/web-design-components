// The "color-dodge" gradient: a vertical dark → off-white fade colour-dodged over a horizontal
// rainbow, masked into a dome rising from the floor. Reads dark at the floor and blooms into
// saturated rainbow toward the top. Put it on a dark stage. Gradients interpolate `in srgb`
// (as the upstream hex gradients did); oklch stops would otherwise interpolate in oklab.

import { useEffect, useState } from "react";
import { cn } from "./lib/utils";
import { RISE_EASE } from "./palette";

const RAINBOW = ["var(--dodge-1)", "var(--dodge-2)", "var(--dodge-3)", "var(--dodge-4)", "var(--dodge-5)", "var(--dodge-6)"];
const MASK = "radial-gradient(75% 170% at 50% 100%, oklch(0 0 0) 38%, oklch(0 0 0 / 0) 78%)";

export interface DodgeGradientProps {
  /** Rainbow band colours, left → right (looped back to the first). */
  colors?: string[];
  riseMs?: number;
  className?: string;
}

export function DodgeGradient({ colors = RAINBOW, riseMs = 1100, className }: DodgeGradientProps) {
  const band = (colors.length ? colors : RAINBOW).concat(colors[0] ?? RAINBOW[0]);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    let inner = 0;
    const outer = requestAnimationFrame(() => (inner = requestAnimationFrame(() => setShown(true))));
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, []);

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none size-full origin-bottom will-change-transform",
        "[--dodge-1:oklch(0.628_0.258_29.2)] [--dodge-2:oklch(0.968_0.211_109.8)] [--dodge-3:oklch(0.866_0.295_142.5)]",
        "[--dodge-4:oklch(0.905_0.155_194.8)] [--dodge-5:oklch(0.452_0.313_264.1)] [--dodge-6:oklch(0.702_0.322_328.4)]",
        "[--dodge-floor:oklch(0_0_0)] [--dodge-top:oklch(0.976_0_0)]",
        className,
      )}
      style={{
        transform: shown ? "scaleY(1)" : "scaleY(0)",
        transition: `transform ${riseMs}ms ${RISE_EASE}`,
      }}
    >
      <div
        className="size-full"
        style={{
          background: `linear-gradient(in srgb 0deg, var(--dodge-floor) 0%, var(--dodge-top) 100%), linear-gradient(in srgb 90deg, ${band.join(", ")})`,
          backgroundBlendMode: "color-dodge, normal",
          WebkitMaskImage: MASK,
          maskImage: MASK,
        }}
      />
    </div>
  );
}
