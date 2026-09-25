/**
 * Random Image Reveal — Chamaac UI `app/in-progress/random-image-reveal/reveal-card.tsx` (commit 345d79b) without Next.js.
 * MIT License, Copyright (c) 2026 Amarnath — see ./LICENSE.
 */
import { useState } from "react";
import { LazyMotion, MotionConfig, domAnimation, m } from "motion/react";
import { cn } from "./lib/utils";

export interface RandomImageRevealProps {
  /** Image URLs; hovering picks one at random. */
  images: string[];
  /** Duration of the lift / tilt, seconds. */
  duration?: number;
  className?: string;
  /** Card width (CSS length). */
  width?: string;
  /** Card height (CSS length). */
  height?: string;
  /** Photo width (CSS length). */
  innerWidth?: string;
  /** Photo height (CSS length). */
  innerHeight?: string;
  /** Alt text for the photo. */
  alt?: string;
}

export default function RandomImageReveal({
  images,
  duration = 0.3,
  className,
  width = "350px",
  height = "270px",
  innerWidth = "200px",
  innerHeight = "135px",
  alt = "Reveal card image",
}: RandomImageRevealProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImage, setCurrentImage] = useState(images[0] || "");

  const pickRandomImage = () => {
    if (images.length > 0) setCurrentImage(images[Math.floor(Math.random() * images.length)]);
  };

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <m.div
          onHoverStart={() => {
            setIsHovered(true);
            pickRandomImage();
          }}
          onHoverEnd={() => setIsHovered(false)}
          style={{ width, height }}
          className={cn("relative cursor-pointer rounded-4xl border border-border bg-background", className)}
        >
          {/* Frosted pocket the photo slides out of */}
          <div className="absolute top-30/100 right-0 bottom-0 left-0 z-10 rounded-4xl border border-border backdrop-blur-sm" />
          <m.div
            animate={{ rotate: isHovered ? -15 : 15, y: isHovered ? -200 : 0, scale: isHovered ? 1.2 : 1 }}
            transition={{ duration, ease: "easeIn" }}
            style={{ width: innerWidth, height: innerHeight }}
            className="absolute top-40/100 left-1/2 -translate-x-1/2 overflow-hidden rounded-3xl"
          >
            <img src={currentImage} alt={alt} className="absolute inset-0 size-full object-cover" />
          </m.div>
        </m.div>
      </MotionConfig>
    </LazyMotion>
  );
}
