/**
 * SVG Animation — Chamaac UI `app/in-progress/svg-animaiton/svg-animation.tsx` (commit 345d79b) without Next.js;
 * icons are any component taking `size` / `className` (lucide-react in the demo instead of @tabler/icons-react).
 * MIT License, Copyright (c) 2026 Amarnath — see ./LICENSE.
 */
import type { ComponentType } from "react";
import { LazyMotion, MotionConfig, domAnimation, m } from "motion/react";
import { cn } from "./lib/utils";

export interface Trend {
  id: string;
  name: string;
  icon: ComponentType<{ size?: number; className?: string }>;
}

export interface SvgAnimationProps {
  /** Rows on the left; the six connector paths are drawn for up to six rows. */
  trends: Trend[];
  /** Image in the circle on the right. */
  imageSrc: string;
  imageAlt?: string;
  /** Stagger between rows entering, seconds. */
  delay?: number;
  /** Two accent colours per connector path (six paths); the pulse travels base → first → second → base. */
  accents?: [string, string][];
  /** Container classes (upstream took a background class in `backgroundColor`). */
  className?: string;
  /** Called with the row's id when a row is clicked. */
  onSelect?: (id: string) => void;
}

// Upstream palette, one pair per path.
const DEFAULT_ACCENTS: [string, string][] = [
  ["#FFEA00", "#0096FF"],
  ["#FFEA00", "#00FF8D"],
  ["#BF40BF", "#FFEA00"],
  ["#EE4B2B", "#FFEA00"],
  ["#465491", "#FFB8FF"],
  ["#FAD5A5", "#FFEA00"],
];

// Path shapes (309×422 box) and pulse durations, in upstream order; `paint` is the gradient each path uses.
const PATHS = [
  { d: "M0 84.5C155 84.5 155 208.5 308.5 208.5", paint: 0 },
  { d: "M0.5 0.5C154.5 0.5 155.5 206.5 308.5 206.5", paint: 1 },
  { d: "M0.5 168.5C155 168.5 155 210.5 308.5 210.5", paint: 2 },
  { d: "M0 337C155 337 155 213 308.5 213", paint: 4 },
  { d: "M0.5 421C154.5 421 155.5 215 308.5 215", paint: 3 },
  { d: "M0.5 253C155 253 155 211 308.5 211", paint: 5 },
];
const DURATIONS = [2, 2.5, 3, 2.2, 2.8, 2.6];
const OFFSETS = [
  [0, 0.3, 0.5, 0.7, 1],
  [0, 0.25, 0.5, 0.75, 1],
  [0, 0.25, 0.5, 0.75, 1],
  [0, 0.25, 0.5, 0.75, 1],
  [0, 0.25, 0.5, 0.75, 1],
  [0, 0.25, 0.5, 0.75, 1],
];

/**
 * A list of capability rows wired by six curved connectors into one circular image; a coloured pulse runs along
 * each connector forever. The connector base colour is `--svg-animation-line` (default `#313131`).
 */
export default function SvgAnimation({
  trends,
  imageSrc,
  imageAlt = "Trends",
  delay = 0.1,
  accents = DEFAULT_ACCENTS,
  className,
  onSelect,
}: SvgAnimationProps) {
  const line = { stopColor: "var(--svg-animation-line, #313131)" };
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <div className={cn("flex h-[600px] items-center justify-center bg-background text-foreground", className)}>
          <div className="flex flex-row items-center justify-between">
            <div className="space-y-[10px]">
              {trends.map((trend, index) => (
                <m.button
                  type="button"
                  key={trend.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * delay }}
                  onClick={() => onSelect?.(trend.id)}
                  className="group flex h-[74px] min-w-[423px] cursor-pointer items-center rounded-[10px] border border-foreground/10 bg-foreground/5 text-left transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center rounded-lg pl-[25px]">
                      <trend.icon size={20} />
                    </div>
                    <h3 className="font-mono text-[16px] leading-[14px]">{trend.name}</h3>
                  </div>
                </m.button>
              ))}
            </div>
            <svg width="309" height="422" viewBox="0 0 309 422" fill="none" aria-hidden>
              {PATHS.map((path) => (
                <path key={path.d} d={path.d} stroke={`url(#svg-animation-paint${path.paint})`} />
              ))}
              <defs>
                {DURATIONS.map((duration, i) => {
                  const [first, second] = accents[i] ?? DEFAULT_ACCENTS[i];
                  const [o0, o1, o2, o3, o4] = OFFSETS[i];
                  return (
                    <m.linearGradient
                      key={i}
                      id={`svg-animation-paint${i}`}
                      gradientUnits="userSpaceOnUse"
                      animate={{
                        x1: [-60, 60, 120, 180, 240],
                        y1: [0, 50, 103, 150, 206],
                        x2: [0, 120, 180, 250, 350],
                        y2: [0, 50, 103, 150, 206],
                      }}
                      transition={{ duration, ease: "linear", repeat: Infinity, repeatType: "loop" }}
                    >
                      <stop offset={o0} style={line} />
                      <stop offset={o1} style={line} />
                      <stop offset={o2} stopColor={first} />
                      <stop offset={o3} stopColor={second} />
                      <stop offset={o4} style={line} />
                    </m.linearGradient>
                  );
                })}
              </defs>
            </svg>
            <m.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="rounded-full"
            >
              <img src={imageSrc} alt={imageAlt} width={100} height={100} className="rounded-full" />
            </m.div>
          </div>
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}
