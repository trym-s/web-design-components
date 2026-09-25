"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import image01 from "../../../_sources/originkit/interactive-grid/01.png";
import image02 from "../../../_sources/originkit/interactive-grid/02.png";
import image03 from "../../../_sources/originkit/interactive-grid/03.png";
import image04 from "../../../_sources/originkit/interactive-grid/04.png";
import image05 from "../../../_sources/originkit/interactive-grid/05.png";
import image06 from "../../../_sources/originkit/interactive-grid/06.png";
import image07 from "../../../_sources/originkit/interactive-grid/07.png";
import image08 from "../../../_sources/originkit/interactive-grid/08.png";
import image09 from "../../../_sources/originkit/interactive-grid/09.png";
import image10 from "../../../_sources/originkit/interactive-grid/10.png";

const DEFAULTS = {
  padding: "50px", columns: 3, rows: 3, gap: 0, rounded: 0, logoScale: 3,
  cardFill: "#000000", cardBorder: "#292929", shadow: false,
  cardShadow: "rgba(217, 251, 232, 0.5)", glow: false,
  glowStart: "rgba(56, 239, 125, 0.5)", glowEnd: "#38EF7D",
  glowIntensity: 50, perspective: 1600, rotateX: 0, rotateY: 0,
};
const DEFAULT_IMAGES = [image01, image02, image03, image04, image05, image06, image07, image08, image09, image10];
const NS = "originkit-interactive-grid";
const CSS = `
.${NS}-card { transition: all 200ms; }
.${NS}-shadow { box-shadow: 2px 2px 5px var(--ag-shadow), 3px 3px 10px var(--ag-shadow), 6px 6px 20px var(--ag-shadow); }
.${NS}-card img { opacity: .7; transition: all 200ms; shape-rendering: geometricPrecision; }
.${NS}-card:hover img { opacity: 1; }
.${NS}-small { transform: scale(1.05) translate(-5px, -5px) translateZ(0); }
.${NS}-big { transform: scale(1.15) translate(-20px, -20px) translateZ(15px); }
.${NS}-glow-big { animation: ${NS}-glow 1.5s ease-in-out infinite alternate; }
.${NS}-glow-small { animation: ${NS}-glow-small 1.5s ease-in-out infinite alternate; }
@keyframes ${NS}-glow { from { filter: drop-shadow(0 0 2px var(--ag-glow-start)); } to { filter: drop-shadow(0 1px var(--ag-glow-blur) var(--ag-glow-end)); } }
@keyframes ${NS}-glow-small { from { filter: drop-shadow(0 0 2px var(--ag-glow-start)); } to { filter: drop-shadow(0 1px var(--ag-glow-blur-small) var(--ag-glow-start)); } }
`;

type ImageItem = { src: string } | string;
export interface InteractiveGridProps {
  images?: ImageItem[]; padding?: string; columns?: number; rows?: number; gap?: number;
  rounded?: number; logoScale?: number; cardFill?: string; cardBorder?: string;
  shadow?: boolean; cardShadow?: string; glow?: boolean; glowStart?: string;
  glowEnd?: string; glowIntensity?: number; perspective?: number; rotateX?: number;
  rotateY?: number; style?: CSSProperties;
}
const source = (image: ImageItem) => typeof image === "string" ? image : image.src;

export default function InteractiveGrid(props: InteractiveGridProps) {
  const { images = DEFAULT_IMAGES, padding = DEFAULTS.padding, columns = DEFAULTS.columns,
    rows = DEFAULTS.rows, gap = DEFAULTS.gap, rounded = DEFAULTS.rounded,
    logoScale = DEFAULTS.logoScale, cardFill = DEFAULTS.cardFill,
    cardBorder = DEFAULTS.cardBorder, shadow = DEFAULTS.shadow,
    cardShadow = DEFAULTS.cardShadow, glow = DEFAULTS.glow,
    glowStart = DEFAULTS.glowStart, glowEnd = DEFAULTS.glowEnd,
    glowIntensity = DEFAULTS.glowIntensity, perspective = DEFAULTS.perspective,
    rotateX = DEFAULTS.rotateX, rotateY = DEFAULTS.rotateY, style } = props;
  const urls = useMemo(() => {
    const list = images.map(source).filter(Boolean);
    return list.length ? list : DEFAULT_IMAGES;
  }, [images]);
  const cols = Math.max(1, Math.round(columns));
  const rowCount = Math.max(1, Math.round(rows));
  const count = cols * rowCount;
  const [hovered, setHovered] = useState<number | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (leaveTimer.current) clearTimeout(leaveTimer.current); }, []);
  const neighbours = useMemo(() => {
    if (hovered === null) return [];
    return [hovered % cols ? hovered - 1 : -1, hovered % cols < cols - 1 ? hovered + 1 : -1, hovered - cols, hovered + cols]
      .filter((index) => index >= 0 && index < count);
  }, [hovered, cols, count]);
  const enter = (index: number) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    leaveTimer.current = null;
    setHovered(index);
  };
  const leave = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => setHovered(null), 200);
  };
  const glowBlur = Math.min(100, Math.max(0, glowIntensity)) / 100 * 16;
  const logoSize = Math.min(10, Math.max(1, Math.round(logoScale))) * 20;

  return (
    <div style={{ ...style, position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding, boxSizing: "border-box", "--ag-shadow": cardShadow, "--ag-glow-start": glowStart, "--ag-glow-end": glowEnd, "--ag-glow-blur": `${glowBlur.toFixed(1)}px`, "--ag-glow-blur-small": `${(glowBlur / 2).toFixed(1)}px` } as CSSProperties}>
      <style>{CSS}</style>
      <div onPointerLeave={leave} style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gridTemplateRows: `repeat(${rowCount}, minmax(0, 1fr))`, gap, width: "100%", height: "100%", transform: `perspective(${perspective}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg)`, transformStyle: "preserve-3d" }}>
        {Array.from({ length: count }, (_, index) => {
          const big = hovered === index;
          const small = !big && neighbours.includes(index);
          return (
            <div key={index} onPointerEnter={() => enter(index)} className={[`${NS}-card`, shadow && `${NS}-shadow`, big && `${NS}-big`, small && `${NS}-small`, glow && big && `${NS}-glow-big`, glow && small && `${NS}-glow-small`].filter(Boolean).join(" ")} style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px 12px", background: cardFill, border: `1px solid ${cardBorder}`, borderRadius: rounded, boxSizing: "border-box", minWidth: 0, minHeight: 0, overflow: "visible", zIndex: big ? count + 1 : index + 1 }}>
              <img src={urls[index % urls.length]} alt="" draggable={false} style={{ width: `${logoSize}%`, height: `${logoSize}%`, objectFit: "contain", display: "block", margin: "0 auto", userSelect: "none", pointerEvents: "none" }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
