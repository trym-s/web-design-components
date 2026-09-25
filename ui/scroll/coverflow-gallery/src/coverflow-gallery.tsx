/**
 * Coverflow Gallery — Originkit (source supplied by the user). Cards fan out in perspective around the
 * active one; click or arrow keys move, optional autoplay. Colours are the `--coverflow-*` variables
 * declared on the root with the upstream values.
 */
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

export type CoverflowSlide = {
  image?: { src: string; srcSet?: string; alt?: string };
  /** Rendered instead of an image (e.g. a placeholder or any card content). */
  content?: ReactNode;
  /** Shown over the card; `\n` breaks lines. */
  title?: string;
};
type AutoplayDir = "leftToRight" | "rightToLeft";
type TitleCorner = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

export type CoverflowGalleryProps = {
  slides: CoverflowSlide[];
  /** Controlled active index (else internal, starting at `defaultActive`). */
  active?: number;
  defaultActive?: number;
  onActiveChange?: (index: number) => void;
  cardWidth?: number;
  cardHeight?: number;
  /** 0–20 → 0 … half the shorter card side. */
  radius?: number;
  tilt?: number;
  sideTilt?: number;
  gap?: number;
  /** Dimming of inactive cards, 0–100. */
  opacity?: number;
  transition?: { duration?: number; delay?: number; ease?: string | number[] };
  autoplay?: boolean;
  autoplayDirection?: AutoplayDir;
  showTitle?: boolean;
  titleStyle?: CSSProperties;
  titlePosition?: { position?: TitleCorner; paddingLeft?: number; paddingRight?: number; paddingTop?: number; paddingBottom?: number };
  className?: string;
  style?: CSSProperties;
};

const PERSPECTIVE = 1600;
const SCALE_STEP = 0.16;
const MAX_VISIBLE = 2;
const DEPTH = 240;
const VARS = "[--coverflow-card:oklch(0.218_0_0)] [--coverflow-scrim:oklch(0_0_0)] [--coverflow-title:oklch(1_0_0)]";

function cssTransition(t: CoverflowGalleryProps["transition"]) {
  const dur = t?.duration ?? 0.6;
  const e = t?.ease;
  const ease =
    Array.isArray(e) && e.length === 4
      ? `cubic-bezier(${e.join(", ")})`
      : typeof e === "string"
        ? ({ linear: "linear", easeIn: "ease-in", easeOut: "ease-out", easeInOut: "ease-in-out" } as Record<string, string>)[e] || "ease"
        : "cubic-bezier(0.22, 1, 0.36, 1)";
  return { dur, ease };
}

export function CoverflowGallery({
  slides, active: activeProp, defaultActive = 0, onActiveChange, cardWidth = 400, cardHeight = 400, radius = 3, tilt = 12,
  sideTilt = 8, gap = 8, opacity = 60, transition, autoplay = false, autoplayDirection = "rightToLeft", showTitle = true,
  titleStyle, titlePosition, className, style,
}: CoverflowGalleryProps) {
  const n = slides.length;
  const [inner, setInner] = useState(defaultActive);
  const active = activeProp ?? inner;
  const activeRef = useRef(active);
  activeRef.current = active;
  const lockRef = useRef(false);
  const moveDur = transition?.duration ?? 0.6;

  const go = useCallback(
    (index: number) => {
      setInner(index);
      onActiveChange?.(index);
    },
    [onActiveChange],
  );
  useEffect(() => {
    if (n && active > n - 1) go(n - 1);
  }, [n, active, go]);

  const lock = useCallback(() => {
    lockRef.current = true;
    window.setTimeout(() => {
      lockRef.current = false;
    }, Math.max(50, moveDur * 1000));
  }, [moveDur]);
  const step = useCallback(
    (dir: number) => {
      if (lockRef.current || !n) return;
      lock();
      go((((activeRef.current + dir) % n) + n) % n);
    },
    [lock, n, go],
  );

  const delay = transition?.delay ?? 2.5;
  useEffect(() => {
    if (!autoplay || n < 2) return;
    const id = window.setInterval(() => step(autoplayDirection === "leftToRight" ? -1 : 1), Math.max(0.3, delay) * 1000);
    return () => window.clearInterval(id);
  }, [autoplay, autoplayDirection, delay, n, step]);

  const { dur, ease } = cssTransition(transition);
  const transitionCss = `transform ${dur}s ${ease}, opacity ${dur}s ${ease}`;
  const effectiveRadius = (Math.max(0, Math.min(20, radius)) / 20) * (Math.min(cardWidth, cardHeight) / 2);
  const dim = 1 - Math.max(0, Math.min(100, opacity)) / 100;
  const corner = titlePosition?.position ?? "bottomLeft";
  const isTop = corner === "topLeft" || corner === "topRight";
  const isRight = corner === "topRight" || corner === "bottomRight";
  const pad = titlePosition ?? {};

  return (
    <div
      className={[VARS, "relative flex size-full min-h-[360px] min-w-[320px] items-center justify-center overflow-hidden outline-none", className].filter(Boolean).join(" ")}
      style={{ ...style, perspective: `${PERSPECTIVE}px` }}
      tabIndex={0}
      role="group"
      aria-roledescription="carousel"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") {
          e.preventDefault();
          step(1);
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          step(-1);
        }
      }}
    >
      <div className="relative" style={{ width: cardWidth, height: cardHeight, transformStyle: "preserve-3d" }}>
        {slides.map((slide, i) => {
          let rel = i - active;
          if (rel > n / 2) rel -= n;
          if (rel < -n / 2) rel += n;
          const distance = Math.abs(rel);
          const visible = distance <= MAX_VISIBLE;
          const isActive = rel === 0;
          return (
            <div
              key={i}
              onClick={() => {
                if (!autoplay && !lockRef.current) {
                  lock();
                  go(i === active ? (active + 1) % n : i);
                }
              }}
              aria-label={slide.title}
              aria-hidden={!visible}
              className="absolute top-1/2 left-1/2 overflow-hidden bg-(--coverflow-card)"
              style={{
                width: cardWidth,
                height: cardHeight,
                borderRadius: effectiveRadius,
                transformStyle: "preserve-3d",
                transform: `translate(-50%, -50%) translateX(${rel * gap * 30}px) translateZ(${-distance * DEPTH}px) rotateY(${-rel * tilt}deg) rotateZ(${rel * sideTilt}deg) scale(${Math.max(0.4, 1 - distance * SCALE_STEP)})`,
                transition: transitionCss,
                opacity: visible ? 1 : 0,
                cursor: autoplay || isActive ? "default" : "pointer",
                pointerEvents: visible && !autoplay ? "auto" : "none",
              }}
            >
              {slide.image ? (
                <img
                  src={slide.image.src}
                  srcSet={slide.image.srcSet}
                  alt={slide.image.alt || slide.title || ""}
                  draggable={false}
                  className="absolute inset-0 block size-full select-none object-cover"
                />
              ) : (
                <div className="absolute inset-0">{slide.content}</div>
              )}
              {showTitle && slide.title && (
                <>
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background: `linear-gradient(${isTop ? "0deg" : "180deg"}, transparent 35%, color-mix(in oklab, var(--coverflow-scrim) 70%, transparent))`,
                    }}
                  />
                  <div
                    className="pointer-events-none absolute"
                    style={{
                      left: pad.paddingLeft ?? 22,
                      right: pad.paddingRight ?? 22,
                      [isTop ? "top" : "bottom"]: isTop ? pad.paddingTop ?? 24 : pad.paddingBottom ?? 24,
                      textAlign: isRight ? "right" : "left",
                    }}
                  >
                    <span
                      className="whitespace-pre-line font-sans text-[28px] font-bold leading-[1.1em] tracking-[-0.02em] text-(--coverflow-title) [text-shadow:0_2px_10px_color-mix(in_oklab,var(--coverflow-scrim)_40%,transparent)]"
                      style={titleStyle}
                    >
                      {slide.title}
                    </span>
                  </div>
                </>
              )}
              <div
                className="pointer-events-none absolute inset-0 bg-(--coverflow-scrim)"
                style={{ opacity: isActive ? 0 : dim, transition: `opacity ${dur}s ${ease}` }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
