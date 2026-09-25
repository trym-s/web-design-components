"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import ameliaFoster from "../../../_sources/originkit/media/amelia-foster.png";
import benjaminHarris from "../../../_sources/originkit/media/benjamin-harris.png";
import concreteForm from "../../../_sources/originkit/media/concrete-form.png";
import jamesWalker from "../../../_sources/originkit/media/james-walker.png";
import lucasMartin from "../../../_sources/originkit/media/lucas-martin.png";
import metalMinimal from "../../../_sources/originkit/media/metal-minimal.png";
import oliviaCarter from "../../../_sources/originkit/media/olivia-carter.png";
import steelClean from "../../../_sources/originkit/media/steel-clean.png";

interface Slide {
  image?: { src?: string; srcSet?: string; alt?: string };
  title?: string;
}

type AutoplayDir = "leftToRight" | "rightToLeft";
type TitleCorner = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

export interface CoverflowGalleryProps {
  slides?: Slide[];
  cardWidth?: number;
  cardHeight?: number;
  radius?: number;
  tilt?: number;
  sideTilt?: number;
  gap?: number;
  opacity?: number;
  transition?: { duration?: number; delay?: number; ease?: string | number[] };
  autoplay?: boolean;
  autoplayDirection?: AutoplayDir;
  showTitle?: boolean;
  titleFont?: CSSProperties;
  titleColor?: string;
  titlePosition?: { position?: TitleCorner; paddingLeft?: number; paddingRight?: number; paddingTop?: number; paddingBottom?: number };
  style?: CSSProperties;
}

const DEFAULT_SLIDES: Slide[] = [
  { image: { src: metalMinimal }, title: "For Sitting\nMetal\nMinimal" },
  { image: { src: concreteForm }, title: "For Living\nConcrete\nForm" },
  { image: { src: steelClean }, title: "For Working\nSteel\nClean" },
];

const PERSPECTIVE = 1600;
const SCALE_STEP = 0.16;
const MAX_VISIBLE = 2;
const DEPTH = 240;

function cssTransition(t: CoverflowGalleryProps["transition"]) {
  const dur = t?.duration ?? 0.6;
  const e = t?.ease;
  const ease = Array.isArray(e) && e.length === 4
    ? `cubic-bezier(${e.join(", ")})`
    : typeof e === "string"
      ? ({ linear: "linear", easeIn: "ease-in", easeOut: "ease-out", easeInOut: "ease-in-out" }[e] || "ease")
      : "cubic-bezier(0.22, 1, 0.36, 1)";
  return { dur, ease };
}

export default function CoverflowGallery(props: CoverflowGalleryProps) {
  const { slides = DEFAULT_SLIDES, cardWidth = 400, cardHeight = 400, radius = 3, tilt = 12, sideTilt = 8, gap = 8, opacity = 60, transition, autoplay = false, autoplayDirection = "rightToLeft", showTitle = true, titleFont, titleColor = "#ffffff", titlePosition, style } = { ...COMPONENT_DEFAULTS, ...props };
  const list = slides.length ? slides : DEFAULT_SLIDES;
  const n = list.length;
  const [active, setActive] = useState(0);
  const lockRef = useRef(false);
  const moveDur = transition?.duration ?? 0.6;

  useEffect(() => setActive((a) => Math.max(0, Math.min(n - 1, a))), [n]);

  const lock = useCallback(() => {
    lockRef.current = true;
    window.setTimeout(() => { lockRef.current = false; }, Math.max(50, moveDur * 1000));
  }, [moveDur]);
  const step = useCallback((dir: number) => {
    if (lockRef.current) return;
    lock();
    setActive((a) => (((a + dir) % n) + n) % n);
  }, [lock, n]);

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

  return (
    <div
      style={{ ...style, position: "relative", width: "100%", height: "100%", minWidth: 320, minHeight: 360, display: "flex", alignItems: "center", justifyContent: "center", perspective: `${PERSPECTIVE}px`, overflow: "hidden", outline: "none" }}
      tabIndex={0}
      role="group"
      aria-roledescription="carousel"
      onKeyDown={(e) => { if (e.key === "ArrowRight") { e.preventDefault(); step(1); } else if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); } }}
    >
      <div style={{ position: "relative", width: cardWidth, height: cardHeight, transformStyle: "preserve-3d" }}>
        {list.map((slide, i) => {
          let rel = i - active;
          if (rel > n / 2) rel -= n;
          if (rel < -n / 2) rel += n;
          const distance = Math.abs(rel);
          const visible = distance <= MAX_VISIBLE;
          const isActive = rel === 0;
          const pad = titlePosition ?? {};
          return (
            <div
              key={i}
              onClick={() => { if (!autoplay && !lockRef.current) { lock(); setActive((a) => i === a ? (a + 1) % n : i); } }}
              aria-label={slide.title}
              aria-hidden={!visible}
              style={{ position: "absolute", left: "50%", top: "50%", width: cardWidth, height: cardHeight, borderRadius: effectiveRadius, overflow: "hidden", transformStyle: "preserve-3d", transform: `translate(-50%, -50%) translateX(${rel * gap * 30}px) translateZ(${-distance * DEPTH}px) rotateY(${-rel * tilt}deg) rotateZ(${rel * sideTilt}deg) scale(${Math.max(0.4, 1 - distance * SCALE_STEP)})`, transition: transitionCss, opacity: visible ? 1 : 0, cursor: autoplay || isActive ? "default" : "pointer", pointerEvents: visible && !autoplay ? "auto" : "none", background: "#1a1a1a" }}
            >
              {slide.image?.src && <img src={slide.image.src} alt={slide.image.alt || slide.title || ""} draggable={false} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block", userSelect: "none" }} />}
              {showTitle && <><div style={{ position: "absolute", inset: 0, background: isTop ? "linear-gradient(0deg, transparent 35%, rgba(0,0,0,.7))" : "linear-gradient(180deg, transparent 35%, rgba(0,0,0,.7))", pointerEvents: "none" }} /><div style={{ position: "absolute", left: pad.paddingLeft ?? 22, right: pad.paddingRight ?? 22, [isTop ? "top" : "bottom"]: isTop ? pad.paddingTop ?? 24 : pad.paddingBottom ?? 24, textAlign: isRight ? "right" : "left", pointerEvents: "none" }}><span style={{ color: titleColor, fontSize: 28, fontWeight: 700, lineHeight: "1.1em", letterSpacing: "-0.02em", whiteSpace: "pre-line", textShadow: "0 2px 10px rgba(0,0,0,.4)", ...titleFont }}>{slide.title}</span></div></>}
              <div style={{ position: "absolute", inset: 0, background: "#000", opacity: isActive ? 0 : dim, transition: `opacity ${dur}s ${ease}`, pointerEvents: "none" }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const COMPONENT_DEFAULTS = {
  slides: [
    { image: { src: jamesWalker }, title: "James Walker" },
    { image: { src: oliviaCarter }, title: "Olivia Carter" },
    { image: { src: ameliaFoster }, title: "Amelia Foster" },
    { image: { src: benjaminHarris }, title: "Benjamin Harris" },
    { image: { src: lucasMartin }, title: "Lucas Martin" },
  ],
  cardWidth: 400,
  cardHeight: 400,
  radius: 3,
  tilt: 12,
  sideTilt: 8,
  gap: 8,
  opacity: 60,
  autoplay: false,
  autoplayDirection: "rightToLeft" as AutoplayDir,
  transition: { duration: 0.6, delay: 2.5, ease: [0.22, 1, 0.36, 1] },
  showTitle: true,
  titleFont: { fontFamily: "Inter", fontSize: "28px", letterSpacing: "-0.02em", lineHeight: "1.1em" },
  titleColor: "#ffffff",
  titlePosition: { position: "bottomLeft" as TitleCorner, paddingLeft: 22, paddingRight: 22, paddingTop: 24, paddingBottom: 24 },
};
