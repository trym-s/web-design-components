// The "peaked" Dia glow: a few smooth quadratic-bezier peaks stacked light-in-front / dark-behind,
// blurred together into one soft mountain of colour rising from the bottom.

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { cn } from "./lib/utils";
import { DIA_VARS, RISE_EASE } from "./palette";

const VBW = 1271;
const VBH = 599;

// Bottom-left → peak → bottom-right, closed along an extended bottom so the blur never clips.
function peakPath(widthFrac: number, heightFrac: number, pointiness: number): string {
  const w = widthFrac * VBW;
  const startX = (VBW - w) / 2;
  const endX = startX + w;
  const peakX = VBW / 2;
  const peakY = VBH - heightFrac * VBH;
  const spread = (1 - pointiness) * (w / 2);
  const ext = VBH * 0.6;
  return [
    `M ${startX} ${VBH}`,
    `Q ${peakX - spread} ${peakY}, ${peakX} ${peakY}`,
    `Q ${peakX + spread} ${peakY}, ${endX} ${VBH}`,
    `L ${endX} ${VBH + ext}`,
    `L ${startX} ${VBH + ext}`,
    "Z",
  ].join(" ");
}

export interface PeakedGradientProps {
  /** Front-to-back colours (lightest first looks best). */
  colors?: string[];
  /** Peak height as a fraction of the height (0..1). */
  peak?: number;
  /** 0 = round dome, 1 = sharp point. */
  pointiness?: number;
  /** Blur in viewBox units. */
  blur?: number;
  /** `mount`: rise once on mount; `scroll`: scaleY follows scroll position; `none`: static. */
  reveal?: "mount" | "scroll" | "none";
  riseMs?: number;
  /** Change to replay the mount reveal. */
  replayKey?: number;
  className?: string;
  style?: CSSProperties;
}

const DEFAULT_COLORS = ["var(--dia-4)", "var(--dia-5)", "var(--dia-6)", "var(--dia-7)", "var(--dia-2)", "var(--dia-1)"];

export function PeakedGradient({
  colors = DEFAULT_COLORS,
  peak = 0.92,
  pointiness = 0.5,
  blur = 26,
  reveal = "mount",
  riseMs = 1100,
  replayKey = 0,
  className,
  style,
}: PeakedGradientProps) {
  const fid = `peak${useId().replace(/[^\w-]/g, "")}`;
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scaleY, setScaleY] = useState(reveal === "none" ? 1 : 0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reveal === "none" || reduced) {
      setScaleY(1);
      return;
    }
    if (reveal === "mount") {
      setScaleY(0);
      let inner = 0;
      const outer = requestAnimationFrame(() => (inner = requestAnimationFrame(() => setScaleY(1))));
      return () => {
        cancelAnimationFrame(outer);
        cancelAnimationFrame(inner);
      };
    }
    let ticking = false;
    const measure = () => {
      ticking = false;
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      setScaleY(Math.max(0, Math.min(1, (vh - r.top) / (vh * 0.65))));
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(measure);
      }
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reveal, replayKey]);

  // back (darkest, widest, lowest) → front (lightest, narrowest, tallest)
  const layers = colors
    .slice()
    .reverse()
    .map((color, i, arr) => {
      const t = arr.length === 1 ? 1 : i / (arr.length - 1);
      return { color, d: peakPath(1.05 - 0.45 * t, peak * (0.55 + 0.45 * t), pointiness) };
    });

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className={cn("pointer-events-none origin-bottom will-change-transform", DIA_VARS, className)}
      style={{
        transform: `scaleY(${scaleY})`,
        transition: reveal === "mount" ? `transform ${riseMs}ms ${RISE_EASE}` : undefined,
        ...style,
      }}
    >
      <svg className="size-full" viewBox={`0 0 ${VBW} ${VBH}`} preserveAspectRatio="none" fill="none">
        <defs>
          <filter id={fid} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={blur} />
          </filter>
        </defs>
        <g filter={`url(#${fid})`}>
          {layers.map((l, i) => (
            <path key={i} d={l.d} style={{ fill: l.color }} />
          ))}
        </g>
      </svg>
    </div>
  );
}
