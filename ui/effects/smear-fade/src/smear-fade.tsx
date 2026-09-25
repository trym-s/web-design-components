// Smear Fade — Arlan Marat's vault (MIT). A word trailing into light, the fade built from hundreds of
// overlapping copies instead of a blur filter (WebGL, see engine.ts). The colour world is the
// `--smear-*` variables declared on the root (upstream "Afterglow" preset); the trail ramp is numeric
// HSL because the engine sweeps its hue along the tail.

import { useEffect, useRef, type CSSProperties } from "react";
import { FadeMotion, type Palette } from "./engine";

export type SmearTrail = Palette["trail"];

export type SmearFadeProps = {
  word?: string;
  /** `add` glows on a dark wall; `subtract` presses ink into a light one. */
  mode?: "add" | "subtract";
  /** Trail ramp: hue/sat/light at the word and how each travels to the tail. */
  trail?: SmearTrail;
  /** Per-copy alpha scale (subtractive worlds want ~0.4). */
  alphaScale?: number;
  /** Let the card run itself: a ghost cursor sweeps it (a real pointer still wins). */
  autoplay?: boolean;
  "aria-label"?: string;
  className?: string;
  /** Inline style — the reliable place to override the `--smear-*` variables. */
  style?: CSSProperties;
};

const VARS =
  "[--smear-bg:oklch(0.160_0.006_156.4)] [--smear-bleed:oklch(0.599_0.113_158.3)] [--smear-halo:oklch(0.798_0.143_156.1)] [--smear-core:oklch(0.953_0.017_156.9)] [--smear-pool-a:oklch(0.788_0.154_153.2/0.16)] [--smear-pool-b:oklch(0.607_0.107_161.7/0.06)] [--smear-vignette:oklch(0.564_0.023_156.4)]";
const AFTERGLOW_TRAIL: SmearTrail = { hue: 132, sat: 46, light: 52, dHue: 26, dSat: -14, dLight: -26 };

export function SmearFade({
  word = "motion", mode = "add", trail = AFTERGLOW_TRAIL, alphaScale = 1, autoplay = true,
  "aria-label": ariaLabel = "A word trailing into light, its fade built from hundreds of overlapping copies", className, style,
}: SmearFadeProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const trailKey = JSON.stringify(trail);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const css = getComputedStyle(host);
    const v = (name: string) => css.getPropertyValue(`--smear-${name}`).trim();
    const palette: Palette = {
      name: "custom", mode, trail, alphaScale,
      bg: v("bg"), bleed: v("bleed"), halo: v("halo"), core: v("core"), pool: [v("pool-a"), v("pool-b")], vignette: v("vignette"),
    };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const engine = new FadeMotion(host, [palette], word, css.fontFamily);
    if (!engine.ok) return;
    if (autoplay && !reduced) engine.enableHero(Number.POSITIVE_INFINITY);
    if (reduced) engine.renderStill();

    let onScreen = false;
    let hidden = false;
    const sync = () => {
      if (reduced) return;
      if (onScreen && !hidden) engine.start();
      else engine.stop();
    };
    const io = new IntersectionObserver((es) => {
      onScreen = es.some((e) => e.isIntersecting);
      sync();
    }, { rootMargin: "200px" });
    io.observe(host);
    const onVis = () => {
      hidden = document.hidden;
      sync();
    };
    document.addEventListener("visibilitychange", onVis);
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      engine.setPointer({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
    };
    const onLeave = () => engine.setPointer(null);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      engine.destroy();
    };
  }, [word, mode, trailKey, alphaScale, autoplay]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={hostRef}
      role="img"
      aria-label={ariaLabel}
      style={style}
      className={[VARS, "relative aspect-[1344/620] w-full select-none overflow-hidden rounded-[calc(var(--radius)+2px)] border border-border bg-(--smear-bg) font-mono", className].filter(Boolean).join(" ")}
    />
  );
}
