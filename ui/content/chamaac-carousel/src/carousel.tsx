/**
 * Carousel — Chamaac UI `registry/chamaac/carousel/carousel.tsx` (commit 345d79b) without Next.js.
 * MIT License, Copyright (c) 2026 Amarnath — see ./LICENSE.
 */
import { useEffect, useState } from "react";
import { LazyMotion, MotionConfig, domMax, m } from "motion/react";
import { cn } from "./lib/utils";

export interface CarouselProps {
  /** Image URLs; three are visible at a time. */
  images: string[];
  className?: string;
  /** Card width (CSS length or px number). */
  cardWidth?: string | number;
  /** Card height (CSS length or px number). */
  cardHeight?: string | number;
  /** Seconds per step transition. */
  duration?: number;
  /** Y-rotation of the side cards, degrees. */
  rotationAngle?: number;
  /** Milliseconds between automatic steps. */
  interval?: number;
}

/**
 * Three cards in perspective — the side ones turned inward by `rotationAngle`, the centre one full size — that
 * advance by one every `interval`; cards glide between slots with shared-layout animation.
 */
export default function Carousel({
  images,
  className,
  cardWidth = "250px",
  cardHeight = "284px",
  duration = 0.5,
  rotationAngle = 45,
  interval = 3000,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = images.length;

  useEffect(() => {
    const timer = setInterval(() => setCurrentIndex((prev) => (prev + 1) % total), interval);
    return () => clearInterval(timer);
  }, [total, interval]);

  const items = [0, 1, 2].map((position) => {
    const index = (currentIndex + position + total) % total;
    return { src: images[index], index, position, isCenter: position === 1 };
  });
  const rotateY = (position: number) => (position === 0 ? rotationAngle : position === 2 ? -rotationAngle : 0);

  return (
    <LazyMotion features={domMax}>
      <MotionConfig reducedMotion="user">
        <div className={cn("flex", className)} style={{ perspective: "1200px", transformStyle: "preserve-3d" }}>
          {items.map((item) => (
            <m.div
              key={item.src}
              layoutId={item.src}
              initial={{ scale: 0.8, rotateY: rotateY(item.position) }}
              animate={{ scale: item.isCenter ? 1 : 0.9, opacity: 1, rotateY: rotateY(item.position) }}
              exit={{ scale: 0.8, opacity: 0, rotateY: rotateY(item.position) }}
              transition={{ duration }}
              style={{ width: cardWidth, height: cardHeight }}
              className={cn(item.isCenter && "z-10", "relative flex-shrink-0")}
            >
              <img src={item.src} alt={`image-${item.index}`} className="absolute inset-0 size-full rounded-[16px] object-cover" />
            </m.div>
          ))}
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}
