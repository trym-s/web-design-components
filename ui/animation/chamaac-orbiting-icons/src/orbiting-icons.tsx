/**
 * Orbiting Icons — Chamaac UI `app/in-progress/orbiting-icons/orbiting-icons.tsx` (commit 345d79b) without Next.js.
 * MIT License, Copyright (c) 2026 Amarnath — see ./LICENSE.
 */
import { LazyMotion, MotionConfig, domAnimation, m } from "motion/react";
import { cn } from "./lib/utils";

export interface OrbitingIconsProps {
  /** Icon image URLs; repeated around the ring so no two neighbours match. */
  icons: string[];
  /** Radius of the ring, px. */
  radius?: number;
  /** Seconds per full turn. */
  duration?: number;
  /** Heading under the ring. */
  title?: string;
  /** Line under the heading. */
  description?: string;
  className?: string;
}

const ICON_SIZE = 80; // px reserved per icon along the circumference

/** Fill the circumference with icons, never placing the same one twice in a row (including across the seam). */
function distribute(icons: string[], count: number) {
  const out: string[] = [];
  if (icons.length < 2) return Array.from({ length: count }, () => icons[0]);
  for (let i = 0; i < count; i++) {
    const prev = out[i - 1];
    let index = i % icons.length;
    if (icons[index] === prev) index = (index + 1) % icons.length;
    if (i === count - 1 && icons[index] === out[0] && icons.length > 2) {
      for (let j = 0; j < icons.length; j++) {
        const candidate = (index + j) % icons.length;
        if (icons[candidate] !== prev && icons[candidate] !== out[0]) {
          index = candidate;
          break;
        }
      }
    }
    out.push(icons[index]);
  }
  return out;
}

/** A card whose upper half shows a slowly turning ring of app icons, with a title and description below. */
export default function OrbitingIcons({
  icons,
  radius = 250,
  duration = 40,
  title = "Automate Your Workflow",
  description = "Connect your favorite tools and boost productivity effortlessly.",
  className,
}: OrbitingIconsProps) {
  const ring = distribute(icons, Math.floor((2 * Math.PI * radius) / (ICON_SIZE * 0.9)));

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <div
          className={cn(
            "relative flex h-[300px] w-[300px] flex-col items-center overflow-hidden rounded-[32px] bg-muted shadow-2xl md:h-[350px] md:w-[375px]",
            className,
          )}
        >
          <m.div
            className="absolute"
            style={{ width: radius * 2, height: radius * 2, top: "70px", left: "50%", marginLeft: -radius }}
            animate={{ rotate: 360 }}
            transition={{ ease: "linear", repeat: Infinity, repeatType: "loop", duration }}
          >
            {ring.map((icon, index) => {
              const angle = (index / ring.length) * 2 * Math.PI;
              return (
                <div
                  key={angle.toFixed(6)}
                  style={{
                    position: "absolute",
                    left: `${radius + Math.cos(angle) * radius - 40}px`,
                    top: `${radius + Math.sin(angle) * radius - 40}px`,
                    // Face the direction of travel (tangent).
                    transform: `rotate(${(angle * 180) / Math.PI + 90}deg)`,
                  }}
                >
                  <div className="relative flex size-[50px] items-center justify-center rounded-full bg-card md:size-[65px]">
                    <img alt="" src={icon} className="absolute inset-0 size-full object-contain p-3 md:p-5" />
                  </div>
                </div>
              );
            })}
          </m.div>
          <div className="absolute bottom-6 z-20 flex flex-col items-center gap-[5px] px-5 text-center md:bottom-12">
            <h2 className="text-[20px] leading-[1.1] font-medium text-foreground md:text-[24px]">{title}</h2>
            <p className="text-[14px] leading-snug text-muted-foreground">{description}</p>
          </div>
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}
