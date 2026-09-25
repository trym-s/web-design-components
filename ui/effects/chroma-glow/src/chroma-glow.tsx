// Chromatic Glow — Arlan Marat's vault (MIT). One word as a bright chromatic bloom with a warm/cool
// RGB split that leans toward the cursor (raw WebGL1, see engine.ts). Colours are the `--chroma-*`
// variables declared on the root (upstream "Peach / Steel" world); the font is the element's own.

import { useEffect, useRef, type CSSProperties } from "react";
import { ChromaGlow, type ChromaParams } from "./engine";

export type ChromaGlowTextProps = {
  word: string;
  /** Overall glow gain (1.62). */
  bloom?: number;
  /** Chromatic split distance in px at a 620 px tall card (9). */
  split?: number;
  /** Crisp rim brightness (1.06). */
  core?: number;
  /** Grain (0.15). */
  noise?: number;
  /** 0–1 prism rainbow over the split (0.6). */
  spectral?: number;
  /** Light wall with a dark pressed word instead of a dark wall. */
  invert?: boolean;
  className?: string;
  /** Inline style — the reliable place to override the `--chroma-*` variables. */
  style?: CSSProperties;
};

const VARS =
  "[--chroma-warm:oklch(0.809_0.116_45.8)] [--chroma-cool:oklch(0.690_0.141_262.6)] [--chroma-fringe:oklch(0.722_0.184_3.5)] [--chroma-bg:oklch(0.252_0.035_271.5)]";

/** Any CSS colour → sRGB 0–1 via a 1×1 canvas (WebGL uniforms need numbers). */
function rgbOf(value: string): [number, number, number] {
  const ctx = document.createElement("canvas").getContext("2d")!;
  ctx.fillStyle = value.trim();
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return [r / 255, g / 255, b / 255];
}

export function ChromaGlowText({ word, bloom = 1.62, split = 9, core = 1.06, noise = 0.15, spectral = 0.6, invert = false, className, style }: ChromaGlowTextProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<ChromaGlow | null>(null);
  const params = (host: HTMLElement): Partial<ChromaParams> => {
    const css = getComputedStyle(host);
    return {
      word, bloom, split, core, noise, spectral, invert,
      warm: rgbOf(css.getPropertyValue("--chroma-warm")),
      cool: rgbOf(css.getPropertyValue("--chroma-cool")),
      red: rgbOf(css.getPropertyValue("--chroma-fringe")),
      bg: rgbOf(css.getPropertyValue("--chroma-bg")),
    };
  };

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const eng = new ChromaGlow(host, params(host));
    if (!eng.ok) return;
    engineRef.current = eng;
    eng.setFont(getComputedStyle(host).fontFamily);
    const io = new IntersectionObserver(([e]) => (e?.isIntersecting ? eng.start() : eng.stop()), { rootMargin: "200px" });
    io.observe(host);
    const onResize = () => eng.resize();
    window.addEventListener("resize", onResize);
    return () => {
      io.disconnect();
      window.removeEventListener("resize", onResize);
      eng.destroy();
      engineRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (hostRef.current) engineRef.current?.setParams(params(hostRef.current));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [word, bloom, split, core, noise, spectral, invert]);

  return (
    <div
      role="img"
      aria-label={word}
      style={style}
      className={[VARS, "relative aspect-[1344/620] w-full overflow-hidden rounded-[calc(var(--radius)+2px)] bg-(--chroma-bg) font-sans", className].filter(Boolean).join(" ")}
    >
      <div ref={hostRef} className="absolute inset-0" />
    </div>
  );
}
