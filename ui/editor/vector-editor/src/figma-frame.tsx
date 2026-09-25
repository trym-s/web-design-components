// FigmaFrame — the "selected layer" chrome from Figma/Framer: a thin accent border that draws
// itself open, four corner handles that pop in one by one, and a live W×H badge under the box.
// It tracks its children's size with a ResizeObserver unless explicit width/height are given.

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "./lib/utils";
import "./vector-editor.css";

export interface FrameStyle {
  /** Selection colour. Defaults to the `--vector-accent` variable declared on the root. */
  accent: string;
  /** Corner square size, px. */
  handleSize: number;
  handleFill: string;
  /** Border width, px. */
  borderWidth: number;
  showHandles: boolean;
  showBadge: boolean;
  badgeBg: string;
  badgeText: string;
}

export const DEFAULT_FRAME: FrameStyle = {
  accent: "var(--vector-accent)",
  handleSize: 8,
  handleFill: "var(--vector-point)",
  borderWidth: 1,
  showHandles: true,
  showBadge: true,
  badgeBg: "var(--vector-accent)",
  badgeText: "var(--vector-point)",
};

export function FigmaFrame({
  children,
  style = DEFAULT_FRAME,
  width,
  height,
  className,
}: {
  children: ReactNode;
  style?: FrameStyle;
  /** Override the measured size (e.g. with the SVG viewBox size). */
  width?: number;
  height?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  // The intro animation plays only on the first mount; later size changes just track.
  const [intro, setIntro] = useState(true);
  useEffect(() => {
    const id = setTimeout(() => setIntro(false), 900);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (width != null && height != null) return;
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect();
      setSize({ w: Math.round(r.width), h: Math.round(r.height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [width, height]);

  const w = width ?? size.w;
  const h = height ?? size.h;
  const s = style;
  const half = s.handleSize / 2;
  const handle = (pos: CSSProperties, delay: number): CSSProperties => ({
    position: "absolute",
    zIndex: 10,
    width: s.handleSize,
    height: s.handleSize,
    backgroundColor: s.handleFill,
    border: `1px solid ${s.accent}`,
    borderRadius: 1,
    ...(intro ? { animation: "bbox-handle 0.25s ease-out both", animationDelay: `${delay}s` } : {}),
    ...pos,
  });

  return (
    <div
      ref={ref}
      className={cn(
        "relative inline-block [--vector-accent:oklch(0.67_0.183_249.2)] [--vector-point:oklch(1_0_0)]",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 origin-top-left"
        style={{
          border: `${s.borderWidth}px solid ${s.accent}`,
          animation: intro ? "bbox-open 0.6s cubic-bezier(0.16, 1, 0.3, 1) both" : undefined,
        }}
      />

      {s.showHandles && (
        <>
          <span style={handle({ top: -half, left: -half }, 0.18)} />
          <span style={handle({ top: -half, right: -half }, 0.28)} />
          <span style={handle({ bottom: -half, right: -half }, 0.38)} />
          <span style={handle({ bottom: -half, left: -half }, 0.48)} />
        </>
      )}

      {s.showBadge && (
        <span
          className="pointer-events-none absolute left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-sm px-2 py-0.5 font-sans text-[11px] tabular-nums"
          style={{
            bottom: -30,
            backgroundColor: s.badgeBg,
            color: s.badgeText,
            ...(intro ? { animation: "bbox-badge 0.25s ease-out both", animationDelay: "0.2s" } : {}),
          }}
        >
          {w} × {h}
        </span>
      )}

      {children}
    </div>
  );
}
