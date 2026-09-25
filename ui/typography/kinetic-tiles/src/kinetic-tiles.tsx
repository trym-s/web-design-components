// Kinetic Tiles — Arlan Marat's vault (MIT). A bold letter (or short word) warped through a grid of
// tiles, each riding its own wave, in duotone with an accent edge-split (see engine.ts). Colours are
// `--kinetic-paper` / `--kinetic-ink` (the theme's background / foreground) and `--kinetic-accent`,
// declared on the root; they are re-read when the theme changes.

import { useEffect, useRef } from "react";
import { KineticA as Engine, type KineticParams } from "./engine";

export type KineticTilesProps = {
  /** 1 character fills 86 % of the height; up to 12 are shrunk to fit. */
  text?: string;
  /** Grid columns (rows follow the 16∶9 aspect). */
  tiles?: number;
  /** Max source displacement, CSS px. */
  offset?: number;
  /** Wave speed per frame. */
  speed?: number;
  /** The x·y phase term — low = uniform, high = turbulent. */
  spread?: number;
  /** Chromatic-split strength 0–1. */
  chroma?: number;
  /** Depth-shading strength 0–1. */
  shade?: number;
  /** Grain / scanline strength 0–1. */
  grain?: number;
  "aria-label"?: string;
  className?: string;
};

const VARS = "[--kinetic-paper:var(--background)] [--kinetic-ink:var(--foreground)] [--kinetic-accent:oklch(0.623_0.188_259.8)]";

export function KineticTiles({
  text = "a", tiles = 34, offset = 26, speed = 0.02, spread = 0.025, chroma = 0.35, shade = 0.35, grain = 0.7,
  "aria-label": ariaLabel, className,
}: KineticTilesProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Engine | null>(null);

  const params = (stage: HTMLElement): KineticParams => {
    const css = getComputedStyle(stage);
    return {
      text, tiles, offset, speed, spread, chroma, shade, grain,
      paper: css.getPropertyValue("--kinetic-paper"),
      ink: css.getPropertyValue("--kinetic-ink"),
      accent: css.getPropertyValue("--kinetic-accent"),
      fontFamily: css.fontFamily,
    };
  };

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const engine = new Engine(stage, params(stage));
    engineRef.current = engine;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      engine.renderStatic();
      return () => {
        engine.destroy();
        engineRef.current = null;
      };
    }
    let onScreen = true;
    let hidden = false;
    const sync = () => (onScreen && !hidden ? engine.start() : engine.stop());
    sync();
    const ro = new ResizeObserver(() => engine.resize());
    ro.observe(stage);
    const io = new IntersectionObserver((es) => {
      onScreen = es[0]?.isIntersecting ?? true;
      sync();
    });
    io.observe(stage);
    const onVis = () => {
      hidden = document.hidden;
      sync();
    };
    document.addEventListener("visibilitychange", onVis);
    // theme switches change the resolved tokens
    const mo = new MutationObserver(() => engine.setParams(params(stage)));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme", "style"] });
    return () => {
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      engine.destroy();
      engineRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (stageRef.current) engineRef.current?.setParams(params(stageRef.current));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, tiles, offset, speed, spread, chroma, shade, grain]);

  return (
    <div
      ref={stageRef}
      role="img"
      aria-label={ariaLabel ?? text}
      className={[VARS, "relative mx-auto aspect-video w-full select-none overflow-hidden rounded-[calc(var(--radius)+2px)] border border-border bg-(--kinetic-paper) font-sans", className].filter(Boolean).join(" ")}
    />
  );
}
