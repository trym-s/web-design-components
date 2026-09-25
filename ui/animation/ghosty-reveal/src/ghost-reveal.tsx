import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "./lib/utils";

export type GhostDirection = "up" | "down" | "left" | "right";

export interface GhostRevealProps {
  children: ReactNode;
  /** Mask image URL with a VERTICAL ramp (transparent top → opaque bottom), used for up/down.
   *  Omit to use the built-in feathered gradient. */
  maskSrc?: string;
  /** Mask image URL with a HORIZONTAL ramp, used for left/right. Falls back to `maskSrc`. */
  maskSrcH?: string;
  /** How many times taller/wider than the box the mask is, in %. Bigger = slower, softer bleed. */
  scale?: number;
  /** Reveal duration in ms. */
  duration?: number;
  /** CSS easing of the mask slide. */
  easing?: string;
  /** Which way the soft edge travels. */
  direction?: GhostDirection;
  /** Controlled trigger. When omitted, reveals once on scroll-into-view. */
  play?: boolean;
  /** Visible fraction before the scroll trigger fires (0..1). */
  threshold?: number;
  /** Fires when the mask finishes animating out (fully hidden). */
  onHidden?: () => void;
  className?: string;
  style?: CSSProperties;
}

// Built-in feather: the same ramp as the reference mask (0 → 35 % at 45 % → opaque at 70 %).
// Only alpha matters in a mask, so the colour is irrelevant. The ramp is oriented per direction
// so the opaque end is the one showing when revealed.
const ramp = (to: string) =>
  `linear-gradient(${to}, oklch(0 0 0 / 0) 0%, oklch(0 0 0 / 0.35) 45%, oklch(0 0 0) 70%)`;

function axisFor(dir: GhostDirection, maskSrc: string | undefined, maskSrcH: string | undefined, scale: number) {
  const pct = `${scale}%`;
  const v = maskSrc && `url(${maskSrc})`;
  const h = (maskSrcH ?? maskSrc) && `url(${maskSrcH ?? maskSrc})`;
  switch (dir) {
    case "up": // feather rises from the bottom
      return { image: v ?? ramp("to bottom"), size: `100% ${pct}`, from: "0% 0%", to: "0% 100%" };
    case "down": // feather descends from the top
      return { image: v ?? ramp("to top"), size: `100% ${pct}`, from: "0% 100%", to: "0% 0%" };
    case "left": // feather sweeps in from the right edge towards the left
      return { image: h ?? ramp("to right"), size: `${pct} 100%`, from: "0% 0%", to: "100% 0%" };
    case "right":
      return { image: h ?? ramp("to left"), size: `${pct} 100%`, from: "100% 0%", to: "0% 0%" };
  }
}

/** Soft "ghostly" reveal: an oversized feathered alpha mask slides across the children via `mask-position`. */
export function GhostReveal({
  children,
  maskSrc,
  maskSrcH,
  scale = 500,
  duration = 1000,
  easing = "cubic-bezier(0.16, 1, 0.3, 1)",
  direction = "up",
  play,
  threshold = 0.2,
  onHidden,
  className,
  style,
}: GhostRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const controlled = play !== undefined;
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (controlled) return;
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return setShown(true);
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [controlled, threshold]);

  const open = controlled ? play : shown;
  const { image, size, from, to } = axisFor(direction, maskSrc, maskSrcH, scale);

  const openRef = useRef(open);
  openRef.current = open;
  const onHiddenRef = useRef(onHidden);
  onHiddenRef.current = onHidden;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handle = (e: TransitionEvent) => {
      if (e.target !== el) return;
      if (e.propertyName !== "mask-position" && e.propertyName !== "-webkit-mask-position") return;
      if (!openRef.current) onHiddenRef.current?.();
    };
    el.addEventListener("transitionend", handle);
    return () => el.removeEventListener("transitionend", handle);
  }, []);

  const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const maskStyle: CSSProperties = reduce
    ? { opacity: open ? 1 : 0, transition: `opacity 0.3s ${easing}` }
    : {
        WebkitMaskImage: image,
        maskImage: image,
        WebkitMaskSize: size,
        maskSize: size,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: open ? to : from,
        maskPosition: open ? to : from,
        transition: `-webkit-mask-position ${duration}ms ${easing}, mask-position ${duration}ms ${easing}`,
      };

  return (
    <div ref={ref} className={cn(className)} style={{ ...maskStyle, ...style }}>
      {children}
    </div>
  );
}
