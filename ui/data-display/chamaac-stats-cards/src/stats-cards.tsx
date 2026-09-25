/**
 * Stats Cards — Chamaac UI `registry/chamaac/stats-cards/stats-cards.tsx` (commit 345d79b) without Next.js.
 * The copy that upstream hard-coded is now props; Inter (next/font) is a font-family variable.
 * MIT License, Copyright (c) 2026 Amarnath — see ./LICENSE.
 */
import { LazyMotion, MotionConfig, domAnimation, m } from "motion/react";
import { cn } from "./lib/utils";

export interface Stat {
  /** Big figure, e.g. "$100k+". */
  value: string;
  label: string;
  description: string;
}

export interface ImageStat {
  src: string;
  alt: string;
  /** Pill over the photo, e.g. "900k Liked". */
  badge: string;
}

export interface StatsCardsProps {
  /** Card 1 (light) and card 3 (accent-filled). */
  stats: [Stat, Stat];
  /** Card 2 (badge top-left) and card 4 (badge bottom-right). */
  images: [ImageStat, ImageStat];
  className?: string;
  /** Tailwind width class for every card. */
  width?: string;
  /** Tailwind height class for every card. */
  height?: string;
}

const lift = (scale: number) => ({ rotate: 0, scale, transition: { duration: 0.3, ease: "easeInOut" as const } });

function StatBody({ stat, filled }: { stat: Stat; filled?: boolean }) {
  return (
    <>
      <h2 className="text-5xl font-semibold tracking-tighter">{stat.value}</h2>
      <div>
        <h4 className="text-lg leading-tight font-medium tracking-tighter">{stat.label}</h4>
        <div className={cn("my-2 h-px w-full", filled ? "bg-[var(--stats-cards-accent-foreground,white)]" : "bg-[var(--stats-cards-accent,#FF4400)]")} />
        <p className="max-w-[90%] text-sm leading-tight tracking-tight">{stat.description}</p>
      </div>
    </>
  );
}

/**
 * Four overlapping, slightly rotated cards — stat, photo, accent stat, photo — that straighten and lift on hover.
 * Colours: `--stats-cards-accent` (default `#FF4400`), `--stats-cards-accent-foreground` (white) and
 * `--stats-cards-surface` (Tailwind orange-50) behind the row; font `--font-stats-cards` (Inter, then sans-serif).
 */
export function StatsCards({ stats, images, className, width = "w-70", height = "h-84" }: StatsCardsProps) {
  const card = cn("relative rounded-[16px] hover:z-50", width, height);
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <div
          className={cn(
            "flex flex-wrap items-center justify-center gap-6 bg-[var(--stats-cards-surface,var(--color-orange-50))] px-4 py-4 font-[family-name:var(--font-stats-cards,Inter,ui-sans-serif,system-ui,sans-serif)] sm:gap-4 md:gap-0",
            className,
          )}
        >
          <m.div
            className={cn(card, "z-10 flex flex-col justify-between bg-card p-5 text-[var(--stats-cards-accent,#FF4400)]")}
            initial={{ rotate: -3 }}
            whileHover={lift(1.05)}
          >
            <StatBody stat={stats[0]} />
          </m.div>

          <m.div className={cn(card, "group z-20 overflow-hidden")} initial={{ rotate: 2, y: 1 }} whileHover={lift(1.05)}>
            <img src={images[0].src} alt={images[0].alt} className="absolute inset-0 size-full object-cover" />
            <div className="absolute top-5 left-5 rounded-full bg-background/90 px-[8px] py-[4px] text-xs font-semibold tracking-tighter text-foreground">
              {images[0].badge}
            </div>
          </m.div>

          <m.div
            className={cn(
              card,
              "z-30 flex flex-shrink-0 flex-col justify-between bg-[var(--stats-cards-accent,#FF4400)] p-5 text-[var(--stats-cards-accent-foreground,white)]",
            )}
            initial={{ rotate: 8 }}
            whileHover={lift(1.02)}
          >
            <StatBody stat={stats[1]} filled />
          </m.div>

          <m.div className={cn(card, "z-40 -ml-1 overflow-hidden")} initial={{ rotate: -4 }} whileHover={lift(1.05)}>
            <img src={images[1].src} alt={images[1].alt} className="absolute inset-0 size-full object-cover" />
            <div className="absolute right-5 bottom-5 rounded-full bg-background/90 px-[8px] py-[4px] text-xs font-semibold tracking-tighter text-foreground">
              {images[1].badge}
            </div>
          </m.div>
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}

export default StatsCards;
