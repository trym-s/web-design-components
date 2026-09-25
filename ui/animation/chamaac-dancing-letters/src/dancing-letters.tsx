/**
 * Dancing Letters — Chamaac UI `app/components/text-animations/dancing-letters/dancing-letters.tsx` (commit 345d79b)
 * without Next.js. Upstream loaded Outfit through next/font but never applied it; the text uses the inherited font.
 * MIT License, Copyright (c) 2026 Amarnath — see ./LICENSE.
 */
import { useCallback, useEffect, useState } from "react";
import { LazyMotion, MotionConfig, domAnimation, m, type Transition } from "motion/react";
import { cn } from "./lib/utils";

export interface DancingLettersProps {
  /** The word to animate; every character is its own letter. */
  text?: string;
  className?: string;
  /** Classes for each letter. */
  letterClassName?: string;
}

type LetterAnimation = { active: Record<string, unknown>; transition: Transition; transformOrigin: string };

// Sleek, physics-based animations
const letterAnimations: LetterAnimation[] = [
  // 1. Rubber Band (Snap)
  {
    active: {
      scaleX: [1, 1.25, 0.75, 1.15, 0.95, 1.05, 1],
      scaleY: [1, 0.75, 1.25, 0.85, 1.05, 0.95, 1],
    },
    transition: { duration: 0.8, ease: "easeInOut" },
    transformOrigin: "center center",
  },
  // 2. The Hinge (Falling effect)
  {
    active: {
      rotate: [0, 80, 60, 80, 60, 0],
      y: [0, 10, -5, 5, -2, 0],
      originX: 0,
      originY: 1,
    },
    transition: { duration: 1.2, ease: [0.175, 0.885, 0.32, 1.275] },
    transformOrigin: "bottom left",
  },
  // 3. Squash and Jump
  {
    active: {
      scaleY: [1, 0.6, 1.2, 1],
      y: [0, 20, -40, 0],
    },
    transition: { duration: 0.6, ease: "easeOut" },
    transformOrigin: "bottom center",
  },
  // 4. Falling (Requests)
  {
    active: {
      rotateX: [0, 240, 150, 200, 175, 180, 180, 0],
      scale: [1, 1.1, 1],
    },
    transition: {
      duration: 2,
      ease: "easeOut",
      times: [0, 0.12, 0.24, 0.36, 0.48, 0.6, 0.85, 1],
    },
    transformOrigin: "50% 80%",
  },
  // 5. Elastic Slide
  {
    active: {
      x: [0, -20, 15, -10, 5, 0],
    },
    transition: { duration: 0.8, ease: "easeInOut" },
    transformOrigin: "center center",
  },
  // 6. Impact Shake
  {
    active: {
      x: [0, -5, 5, -5, 5, -2, 2, 0],
      y: [0, -2, 2, -1, 1, 0],
      rotate: [0, -1, 1, -0.5, 0.5, 0],
    },
    transition: { duration: 0.5, ease: "linear" },
    transformOrigin: "center center",
  },
  // 7. Pop (Scale)
  {
    active: {
      scale: [1, 1.4, 1],
    },
    transition: { duration: 0.5, ease: "easeInOut" },
    transformOrigin: "center center",
  },
  // 8. Levitate
  {
    active: {
      y: [0, -30, 0],
      scale: [1, 1.1, 1],
      // Motion resolves var() keyframes against the element; the variable is declared on the root below.
      textShadow: ["var(--dancing-letters-shadow-rest)", "var(--dancing-letters-shadow)", "var(--dancing-letters-shadow-rest)"],
    },
    transition: { duration: 1.2, ease: "easeInOut" },
    transformOrigin: "center center",
  },
];

/**
 * A word whose letters stagger in, then each plays one of eight physics-style animations (rubber band, hinge,
 * squash-and-jump, flip, elastic slide, shake, pop, levitate — assigned by position) when hovered or clicked.
 */
export default function DancingLetters({ text = "ANIMATE", className, letterClassName }: DancingLettersProps) {
  const [activeIndices, setActiveIndices] = useState<Set<number>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);
  const letters = text.split("");

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const play = useCallback((index: number) => {
    setActiveIndices((prev) => {
      const next = new Set(prev);
      next.delete(index);
      // Re-add on the next tick so a rapid second trigger restarts the animation.
      setTimeout(() => setActiveIndices((later) => new Set(later).add(index)), 10);
      return next;
    });
  }, []);

  const finish = useCallback((index: number) => {
    setActiveIndices((prev) => {
      if (!prev.has(index)) return prev;
      const next = new Set(prev);
      next.delete(index);
      return next;
    });
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <m.div
          className={cn(
            "flex items-center justify-center select-none [--dancing-letters-shadow-rest:0px_0px_0px_rgba(0,0,0,0)] [--dancing-letters-shadow:0px_20px_20px_rgba(0,0,0,0.2)]",
            className,
          )}
          style={{ perspective: "1000px" }}
          initial="hidden"
          animate="visible"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.05 } } }}
        >
          {letters.map((letter, id) => {
            const anim = letterAnimations[id % letterAnimations.length];
            const isActive = activeIndices.has(id);
            return (
              <m.span
                key={`${letter}-${id}`}
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    x: 0,
                    y: 0,
                    rotate: 0,
                    rotateX: 0,
                    rotateY: 0,
                    scaleX: 1,
                    scaleY: 1,
                    textShadow: "var(--dancing-letters-shadow-rest)",
                    transition: { type: "spring", stiffness: 300, damping: 20 },
                  },
                  active: { ...anim.active, opacity: 1, transition: anim.transition },
                }}
                animate={isActive ? "active" : isLoaded ? "visible" : undefined}
                onHoverStart={() => {
                  if (!isActive) play(id);
                }}
                onClick={() => play(id)}
                onAnimationComplete={(definition) => {
                  if (definition === "active") finish(id);
                }}
                className={cn(
                  "relative inline-block cursor-pointer text-5xl font-bold text-foreground md:text-7xl lg:text-8xl",
                  letterClassName,
                  isActive ? "z-10" : "z-0",
                )}
                style={{ transformOrigin: anim.transformOrigin, transformStyle: "preserve-3d" }}
              >
                {letter}
              </m.span>
            );
          })}
        </m.div>
      </MotionConfig>
    </LazyMotion>
  );
}
