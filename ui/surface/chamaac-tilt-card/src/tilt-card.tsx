/**
 * Tilt Card — Chamaac UI `app/in-progress/tilt-card/tilt-card.tsx` (commit 345d79b) without Next.js; icons are any
 * component taking `className` (lucide-react in the demo instead of @tabler/icons-react).
 * MIT License, Copyright (c) 2026 Amarnath — see ./LICENSE.
 */
import type { ComponentType } from "react";
import { LazyMotion, MotionConfig, domAnimation, m } from "motion/react";
import { cn } from "./lib/utils";

export interface TiltFeature {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

export interface TiltCardProps {
  features: TiltFeature[];
  /** Resting rotation of the top sheet, degrees. */
  initialRotate?: number;
  /** Rotation while hovered, degrees. */
  hoverRotate?: number;
  duration?: number;
  /** Spring stiffness. */
  stiffness?: number;
  /** Spring damping (low = wobbly). */
  damping?: number;
  className?: string;
}

/** Two stacked cards; the top one sits tilted over the other and springs straight on hover, listing icon + title + description rows. */
export default function TiltCard({
  features,
  initialRotate = 7.1,
  hoverRotate = 0,
  duration = 0.3,
  stiffness = 100,
  damping = 5,
  className,
}: TiltCardProps) {
  const sheet = "border border-border bg-card text-card-foreground";
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <div className={cn("flex items-center justify-center md:h-[500px]", className)}>
          <div className={cn("relative h-full max-h-[285px] w-full max-w-[280px] rounded-[20px] p-5 md:max-h-[325px] md:max-w-[325px]", sheet)}>
            <m.div
              initial={{ rotate: initialRotate }}
              whileHover={{ rotate: hoverRotate }}
              transition={{ duration, type: "spring", stiffness, damping }}
              className={cn("absolute inset-0 flex flex-col justify-center gap-6 rounded-[15px] p-4 md:gap-8 md:rounded-[20px] md:p-8", sheet)}
            >
              {features.map((feature) => (
                <div key={feature.title} className="flex flex-row items-start gap-2 md:gap-3">
                  <div>
                    <feature.icon className="size-[16px] text-foreground md:size-[24px]" />
                  </div>
                  <div>
                    <h2 className="mb-1 text-[16px] leading-[15px] font-medium tracking-[0em] text-foreground md:text-[18px]">{feature.title}</h2>
                    <p className="text-[14px] leading-[16px] tracking-[0em] text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </m.div>
          </div>
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}
