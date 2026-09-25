// Symbols effect — Arlan Marat's vault (MIT). React wrapper around the standalone three.js renderer
// (symbols-effect.ts): the source image or video is cut into four luminance bands, each stamped with
// its own glyph tinted with its own colour. Band colours and paper are the `--symbols-*` variables
// declared on the root (defaults: the shadcn chart tokens and `--background`).

import { useEffect, useRef } from "react";
import { SymbolsEffect } from "./symbols-effect";

export type SymbolsCanvasProps = {
  /** Image URL (or data URL) to rebuild; ignored when `video` is set. */
  image?: string;
  /** Video URL — plays muted and looped through the effect. */
  video?: string;
  /** Cell size in CSS px at a 600 px wide canvas (scales with the width). */
  cell: number;
  /** Five luminance stops (0–1) → four bands, dark to light. */
  bandStops: [number, number, number, number, number];
  /** Glyph index per band (see `GLYPHS` in glyphs.ts; 0 = empty). */
  bandGlyphs: [number, number, number, number];
  /** Source zoom (1 = cover). */
  zoom?: number;
  "aria-label"?: string;
  className?: string;
};

const VARS =
  "[--symbols-band-1:var(--chart-3)] [--symbols-band-2:var(--chart-2)] [--symbols-band-3:var(--chart-1)] [--symbols-band-4:var(--chart-4)] [--symbols-bg:var(--background)]";

export function SymbolsCanvas({ image, video, cell, bandStops, bandGlyphs, zoom, "aria-label": ariaLabel, className }: SymbolsCanvasProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  const key = `${cell}|${bandStops.join()}|${bandGlyphs.join()}|${zoom}`;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const css = getComputedStyle(canvas);
    const fx = new SymbolsEffect(canvas, {
      cell,
      bandStops,
      bandGlyphs,
      zoom,
      bandColors: [1, 2, 3, 4].map((n) => css.getPropertyValue(`--symbols-band-${n}`)),
      bg: css.getPropertyValue("--symbols-bg"),
    });
    if (video) fx.setVideo(video);
    else if (image) fx.setImage(image);
    const ro = new ResizeObserver(fx.resize);
    ro.observe(canvas);
    return () => {
      ro.disconnect();
      fx.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image, video, key]);

  return <canvas ref={ref} role="img" aria-label={ariaLabel} className={[VARS, "block size-full", className].filter(Boolean).join(" ")} />;
}
