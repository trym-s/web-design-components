/**
 * Feature Steps — Chamaac UI `app/components/sections/feature-steps/feature-steps.tsx` (commit 345d79b) without Next.js.
 * MIT License, Copyright (c) 2026 Amarnath — see ./LICENSE.
 */
import { useEffect, useState } from "react";
import { LazyMotion, MotionConfig, domMax, m } from "motion/react";
import { cn } from "./lib/utils";

export interface Feature {
  step?: string;
  title: string;
  content: string;
  /** Image URL shown while this feature is current. */
  image: string;
}

export interface FeatureStepsProps {
  features: Feature[];
  className?: string;
  /** Milliseconds each feature stays current; also the progress-line duration. */
  autoPlayInterval?: number;
  /** Classes for the image column (height). */
  imageClassName?: string;
}

/**
 * Two columns: a bordered list of features on the left, the current feature's image on the right. The current row
 * shows a 1 px progress line filling over `autoPlayInterval`, then the next feature slides its image up from below.
 * Clicking (or Enter/Space on) a row jumps to it and restarts the timer.
 */
export default function FeatureSteps({ features, className, autoPlayInterval = 3000, imageClassName = "h-[400px]" }: FeatureStepsProps) {
  const [state, setState] = useState({ feature: 0, tick: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setState((prev) => ({ feature: (prev.feature + 1) % features.length, tick: prev.tick + 1 }));
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlayInterval, state.feature, features.length]);

  const select = (index: number) => setState((prev) => ({ feature: index, tick: prev.tick + 1 }));
  const current = features[state.feature];

  return (
    <LazyMotion features={domMax}>
      <MotionConfig reducedMotion="user">
        <div className={cn("mx-auto flex w-full max-w-[1440px] flex-col md:flex-row md:items-stretch", className)}>
          <div className="flex w-full flex-col divide-y divide-foreground/10 border border-foreground/10 md:w-1/2">
            {features.map((feature, index) => (
              <m.div
                key={feature.title}
                layoutId={feature.title}
                role="button"
                tabIndex={0}
                aria-current={index === state.feature}
                onClick={() => select(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    select(index);
                  }
                }}
                className="relative cursor-pointer p-4 outline-none focus-visible:bg-accent md:p-10"
              >
                <h3 className="text-base leading-none text-foreground md:text-lg">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{feature.content}</p>
                {index === state.feature && (
                  <m.div
                    key={state.tick}
                    className="absolute bottom-0 left-0 h-[1px] bg-foreground"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: autoPlayInterval / 1000, ease: "easeIn" }}
                  />
                )}
              </m.div>
            ))}
          </div>

          <div
            className={cn(
              "relative w-full overflow-hidden border border-t-0 border-foreground/10 p-4 md:w-1/2 md:border-t md:border-l-0 md:p-5",
              imageClassName,
            )}
          >
            <m.div
              key={state.feature}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-4 md:inset-5"
            >
              <img src={current.image} alt={current.title} className="absolute inset-0 size-full rounded object-cover" />
            </m.div>
          </div>
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}
