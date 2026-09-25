/**
 * Gauge — Chamaac UI `app/components/sections/gauge/gauge.tsx` (commit 345d79b) without Next.js.
 * MIT License, Copyright (c) 2026 Amarnath — see ./LICENSE.
 */
import { useEffect, useState } from "react";
import { LazyMotion, MotionConfig, animate, domAnimation, m, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { cn } from "./lib/utils";

export interface GaugeProps {
  value?: number;
  min?: number;
  max?: number;
  /** Diameter, px (280 below 640 px viewport width). */
  size?: number;
  /** Angle between bars, degrees; 180 / gap bars are drawn. */
  gap?: number;
  /** Bar thickness, px (6 below 640 px viewport width). */
  thickness?: number;
  /** Class for lit bars. Default: `--gauge-active` (Tailwind blue-600). */
  activeColor?: string;
  /** Class for unlit bars. Default: `--gauge-inactive` (Tailwind blue-100). */
  inactiveColor?: string;
  /** Show the counting percentage and label. */
  showValue?: boolean;
  label?: string;
  className?: string;
  /** Milliseconds between bars lighting up. */
  delay?: number;
}

/**
 * Semicircle of rounded bars that light up one after another to the value, while the percentage in the middle
 * counts up in step. Exposes `role="meter"` with the value range.
 */
export default function Gauge({
  value = 70,
  min = 0,
  max = 100,
  size = 400,
  gap = 4,
  thickness = 10,
  activeColor = "bg-[var(--gauge-active,var(--color-blue-600))]",
  inactiveColor = "bg-[var(--gauge-inactive,var(--color-blue-100))]",
  showValue = true,
  label = "Performance",
  className,
  delay = 25,
}: GaugeProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [dims, setDims] = useState({ size, thickness });
  const reducedMotion = useReducedMotion();
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const { size: currentSize, thickness: currentThickness } = dims;
  const radius = currentSize / 2;
  const percentage = Math.round(((value - min) / (max - min)) * 100);
  const totalBars = Math.floor(180 / gap);
  const stagger = reducedMotion ? 0 : delay;

  useEffect(() => {
    if (!isMounted) return;
    const animation = animate(count, percentage, { duration: (totalBars * stagger) / 1000 });
    return animation.stop;
  }, [isMounted, percentage, totalBars, stagger, count]);

  useEffect(() => {
    const handleResize = () => setDims(window.innerWidth < 640 ? { size: 280, thickness: 6 } : { size, thickness });
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [size, thickness]);

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <div className="origin-center scale-[0.7] transform md:scale-100">
          <div
            role="meter"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            aria-label={label}
            className={cn("relative flex items-center justify-center", className)}
            style={{ width: currentSize, height: currentSize / 2 }}
          >
            <div className="absolute bottom-0 left-1/2">
              {Array.from({ length: totalBars }).map((_, index) => {
                const isActive = isMounted && index < (percentage / 100) * totalBars;
                return (
                  <div
                    key={index}
                    className={cn("absolute rounded-full transition-colors duration-300", isActive ? activeColor : inactiveColor)}
                    style={{
                      width: currentThickness,
                      height: currentSize / 8,
                      left: "50%",
                      top: "50%",
                      transform: `translate(-50%, -50%) rotate(${index * gap - 90}deg) translateY(-${radius}px)`,
                      transitionDelay: `${index * stagger}ms`,
                    }}
                  />
                );
              })}
              {showValue && (
                <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 flex-col items-center">
                  <h2 className="flex text-[32px] leading-none font-bold text-foreground md:text-[48px]">
                    <m.span>{rounded}</m.span>%
                  </h2>
                  {label && <p className="font-medium text-foreground">{label}</p>}
                </div>
              )}
            </div>
          </div>
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}
