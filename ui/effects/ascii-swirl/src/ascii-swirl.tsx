// ASCII Swirl — Arlan Marat's vault (MIT). Thousands of live glyphs vortex into a wordmark, with a CRT
// pass on top (WebGL2; see use-swirl-stage.ts). Colours are `--swirl-ink` (letters), `--swirl-logo`
// (the resolved word) and `--swirl-bg`, declared on the root with the upstream "Arlan" preset values.

import { forwardRef, useEffect, useImperativeHandle, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { DEFAULT_STAGE, useSwirlStage, type StageConfig } from "./use-swirl-stage";
import type { FontStyle } from "./block-font";
import type { WavePattern } from "./vortex-field";
import { DEFAULT_TEXT } from "./default-text";

export type AsciiSwirlProps = {
  /** Pre-baked ASCII rows for the wordmark (takes priority over `word`). */
  rows?: string[];
  /** Word rendered live with a built-in ASCII face. */
  word?: string;
  fontStyle?: FontStyle;
  /** Field text the swirling glyphs are sampled from (long, varied lines). */
  text?: string;
  /** Rows of glyphs = 22 / zoom (smaller zoom → more, smaller cells). */
  zoom?: number;
  scanlines?: number;
  aberration?: number;
  curvature?: number;
  /** Cursor wake that swirls letters up. */
  trail?: boolean;
  /** Click shockwaves. */
  shock?: boolean;
  /** Permanent ambient ripple 0–1 and its shape. */
  turbulence?: number;
  wavePattern?: WavePattern;
  /** Shown when WebGL2 is unavailable. */
  fallback?: ReactNode;
  className?: string;
};

export type AsciiSwirlHandle = { replay: () => void };

const VARS = "[--swirl-ink:oklch(0.882_0_0)] [--swirl-logo:oklch(1_0_0)] [--swirl-bg:oklch(0.155_0.002_286.2)]";

export const AsciiSwirl = forwardRef<AsciiSwirlHandle, AsciiSwirlProps>(function AsciiSwirl(
  {
    rows, word, fontStyle = "slant", text = DEFAULT_TEXT, zoom = 0.62, scanlines = 0.4, aberration = 1, curvature = 1,
    trail = false, shock = false, turbulence = 0, wavePattern = "wavefront", fallback, className,
  },
  ref,
) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);
  const cfg = useRef<StageConfig>({ ...DEFAULT_STAGE, inkStops: [""], logoColor: "", bg: "", zoom });

  useEffect(() => {
    const css = getComputedStyle(rootRef.current!);
    cfg.current = {
      ...DEFAULT_STAGE,
      rows, word, style: fontStyle, text, zoom, scanlines, aberration, curvature, trail, shock, turbulence, wavePattern,
      inkStops: [css.getPropertyValue("--swirl-ink").trim()],
      logoColor: css.getPropertyValue("--swirl-logo").trim(),
      bg: css.getPropertyValue("--swirl-bg").trim(),
    };
  }, [rows, word, fontStyle, text, zoom, scanlines, aberration, curvature, trail, shock, turbulence, wavePattern]);

  const stage = useSwirlStage(canvasRef, cfg, () => setFailed(true));
  useImperativeHandle(ref, () => ({ replay: () => stage.current.replay() }), [stage]);

  const norm = (e: PointerEvent<HTMLCanvasElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * 2 - 1, y: ((e.clientY - r.top) / r.height) * 2 - 1 };
  };

  return (
    <div ref={rootRef} className={[VARS, "relative overflow-hidden rounded-xl border border-border bg-(--swirl-bg)", className].filter(Boolean).join(" ")}>
      {failed ? (
        <div className="flex aspect-[16/10] w-full items-center justify-center px-6 text-center text-[13px] text-muted-foreground">
          {fallback ?? "WebGL2 is not available, so the effect can't run here."}
        </div>
      ) : (
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={word ?? "ASCII wordmark"}
          className="block aspect-[16/10] w-full"
          onPointerMove={(e) => stage.current.setPointer(norm(e))}
          onPointerLeave={() => stage.current.setPointer(null)}
          onPointerDown={(e) => {
            const p = norm(e);
            stage.current.burst(p.x, p.y);
          }}
        />
      )}
    </div>
  );
});
