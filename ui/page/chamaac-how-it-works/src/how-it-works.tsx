/**
 * How It Works — Chamaac UI `registry/chamaac/how-it-works/how-it-works.tsx` (commit 345d79b) without Next.js.
 * Steps are a required prop (upstream fell back to built-in sample steps).
 * MIT License, Copyright (c) 2026 Amarnath — see ./LICENSE.
 */
import type { CSSProperties } from "react";
import { LazyMotion, MotionConfig, domAnimation, m } from "motion/react";
import { cn } from "./lib/utils";

type ColorTheme = "orange" | "blue" | "purple";

export interface StepColors {
  /** Class for the inner panel background. */
  bg: string;
  /** Class for the pin and the step number. */
  text: string;
  /** Class for the inner panel border. */
  border: string;
}

export interface Step {
  title: string;
  description: string;
  /** Preset accent; ignored when `colors` is set. */
  colorTheme?: ColorTheme;
  colors?: StepColors;
}

export interface StepPosition {
  /** Placement classes (md+ uses absolute positioning inside a fixed-height board). */
  className?: string;
  /** Rotation class, e.g. `rotate-8`. */
  rotate?: string;
}

export interface HowItWorksProps {
  /** One to five steps; the board height and the connector path follow the count. */
  features: Step[];
  className?: string;
  stepPositions?: StepPosition[];
}

// Accent presets — inherently multi-colour, so they stay Tailwind palette classes; override per step with `colors`.
const PRESETS: Record<ColorTheme, StepColors> = {
  orange: { bg: "bg-orange-50 dark:bg-orange-500/10", text: "text-orange-500 dark:text-orange-400", border: "border-orange-100 dark:border-orange-500/20" },
  blue: { bg: "bg-blue-50 dark:bg-blue-500/10", text: "text-blue-600 dark:text-blue-400", border: "border-blue-100 dark:border-blue-500/20" },
  purple: { bg: "bg-purple-50 dark:bg-purple-500/10", text: "text-purple-600 dark:text-purple-400", border: "border-purple-100 dark:border-purple-500/20" },
};

const DEFAULT_CARD_POSITIONS: StepPosition[] = [
  { className: "md:absolute md:top-0 md:left-[15%]", rotate: "rotate-8" },
  { className: "md:absolute md:top-[120px] md:right-[15%]", rotate: "-rotate-8" },
  { className: "md:absolute md:top-[450px] md:left-[15%]", rotate: "rotate-8" },
  { className: "md:absolute md:top-[570px] md:right-[10%]", rotate: "-rotate-8" },
  { className: "md:absolute md:top-[850px] md:left-[15%]", rotate: "rotate-8" },
];

const HEIGHTS = [400, 400, 450, 800, 900, 1130];

// Curve segments linking card n to card n+1, in the board's 1000-wide viewBox.
const SEGMENTS = [
  "M 290 150 C 500 150, 550 270, 710 270",
  " C 850 270, 500 350, 290 450",
  " C 290 600, 550 720, 750 720",
  " C 950 720, 500 800, 290 850",
];

function Pin({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M16 3a1 1 0 0 1 .117 1.993l-.117 .007v4.764l1.894 3.789a1 1 0 0 1 .1 .331l.006 .116v2a1 1 0 0 1 -.883 .993l-.117 .007h-4v4a1 1 0 0 1 -1.993 .117l-.007 -.117v-4h-4a1 1 0 0 1 -.993 -.883l-.007 -.117v-2a1 1 0 0 1 .06 -.34l.046 -.107l1.894 -3.791v-4.762a1 1 0 0 1 -.117 -1.993l.117 -.007h8z" />
    </svg>
  );
}

function Card({ number, step, position }: { number: string; step: Step; position: StepPosition }) {
  const colors = step.colors ?? PRESETS[step.colorTheme ?? "blue"];
  return (
    <div className={cn("relative w-full transition-transform duration-300 hover:z-30 hover:scale-105 md:w-[280px]", position.rotate, position.className)}>
      <div className="rounded-[25px] border border-border bg-card p-2 shadow-[0px_10px_20px_0px_var(--how-it-works-shadow,#D3D3D3)] dark:shadow-none">
        <Pin className={cn("z-20 mx-auto mb-6 h-8 w-8", colors.text)} />
        <div className={cn("relative flex h-full flex-col overflow-hidden rounded-[15px] border p-[15px]", colors.bg, colors.border)}>
          <span
            className={cn("mb-5 text-4xl", colors.text)}
            style={{ fontFamily: 'var(--font-handwriting, "Comic Sans MS", "Chalkboard SE", sans-serif)' }}
          >
            {number}
          </span>
          <h3 className="mb-[10px] text-2xl leading-none font-semibold text-card-foreground">{step.title}</h3>
          <p className="text-sm/5 tracking-tight text-muted-foreground">{step.description}</p>
        </div>
      </div>
    </div>
  );
}

/**
 * A ruled-paper board of pinned, alternately tilted step cards joined by a dashed path whose dashes march along
 * forever (md+). Below md the cards stack in a column and the path is hidden.
 */
export default function HowItWorks({ features, className, stepPositions = DEFAULT_CARD_POSITIONS }: HowItWorksProps) {
  const height = HEIGHTS[Math.min(features.length, 5)];
  const pathD = SEGMENTS.slice(0, Math.max(0, Math.min(features.length, 5) - 1)).join("");

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <div className={cn("relative bg-background px-8 max-md:pt-10 max-md:pb-25 md:py-20", className)}>
          {/* Ruled lines every 32 px */}
          <div
            className="pointer-events-none absolute inset-0 mt-[4px] opacity-[0.08] dark:opacity-[0.1]"
            style={{ backgroundImage: "linear-gradient(var(--foreground) 1px, transparent 1px)", backgroundSize: "100% 32px" }}
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-background" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-background" />

          <div className="relative z-10 mx-auto max-w-6xl">
            <div
              className="relative mx-auto flex h-auto w-full max-w-[1000px] flex-col space-y-8 md:block md:h-[var(--md-height)] md:space-y-0"
              style={{ "--md-height": `${height}px` } as CSSProperties}
            >
              {pathD && (
                <svg
                  className="pointer-events-none absolute top-0 left-0 z-0 hidden h-full w-full md:block"
                  viewBox={`0 0 1000 ${height}`}
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <m.path
                    d={pathD}
                    stroke="currentColor"
                    className="text-foreground/20"
                    strokeWidth="2"
                    strokeDasharray="8 6"
                    fill="none"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    initial={{ strokeDashoffset: 0 }}
                    // A multiple of the 14-unit dash pattern, so the loop is seamless.
                    animate={{ strokeDashoffset: -140 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                </svg>
              )}
              {features.map((step, index) => (
                <Card key={step.title} number={`0${index + 1}`} step={step} position={stepPositions[index % stepPositions.length]} />
              ))}
            </div>
          </div>
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}
