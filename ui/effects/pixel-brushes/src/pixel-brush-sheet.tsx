// Pixel Brushes — Arlan Marat's vault (MIT). Brush swatches on one sheet.
//
// Three rather than the full set: at card size twelve swatches are small and read
// as one texture. Three that sit far apart — a combed ribbon, a dense spray, a
// wide drift — show the range better and stay large enough to read. One shared
// paper, one ink each.
//
// Each swatch draws itself in, staggered, then rests. Watching the stamps land in
// order is what makes the model legible. The loop stops once they have landed, so
// the card settles into a still sheet instead of animating forever.

import { useEffect, useRef } from "react";
import { BRUSHES, type Brush, type Ink } from "./brushes";
import { spiralPath, stroke } from "./engine";

/** How long one swatch takes to draw, and how far apart consecutive ones start.
 *  The stagger is short relative to the draw, so several are always in flight and
 *  the sheet fills as a wave. */
const DRAW_MS = 900;
const STAGGER_MS = 180;

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/** The three shown, ordered tightest to loosest: a combed ribbon, a dense spray,
 *  and a wide drift. `rows` leads because its stamp is a 3-cell bar — the other
 *  two are single squares, so it adds a different shape and not just different
 *  numbers. */
const DEFAULT_SHOWN = ["rows", "scatter-heavy", "cluster"];

/** Per-card tweaks. The authored presets are tuned for a sheet of twelve; at
 *  three-up there is far more room. Overridden here rather than edited in the set,
 *  which the playground and the published code both use.
 *
 *  `scatter-heavy` needs both numbers, not just the size: spacing is a FRACTION
 *  of stamp size, so scaling the stamp alone keeps the same 83% overlap and the
 *  mark stays a fused ribbon. Opening the spacing to 0.4 drops that to ~20%, so
 *  the stamps touch but stay individually readable — actual pixels. */
const TWEAKS: Record<string, Partial<Brush>> = {
  "scatter-heavy": { size: 0.075, spacing: 0.4 },
};

const pick = (ids: string[]): Brush[] =>
  ids.map((id) => {
    const b = BRUSHES.find((x) => x.id === id) ?? BRUSHES[0];
    return TWEAKS[id] ? { ...b, ...TWEAKS[id] } : b;
  });

/** One paper for the whole card, with an ink per swatch. A shared ground reads as
 *  one sheet with three specimens on it; the inks are far enough apart in hue to
 *  separate the marks without any of them fighting the page. */
/* Paper and inks are declared on the root (`--pixel-brush-paper`, `--pixel-brush-ink-1…3`, upstream values).
 * Inks stay HSL because the rainbow brushes drift the hue per stamp. */
const VARS =
  "[--pixel-brush-paper:oklch(0.983_0.003_67.8)] [--pixel-brush-ink-1:hsl(336_82%_56%)] [--pixel-brush-ink-2:hsl(212_84%_52%)] [--pixel-brush-ink-3:hsl(152_62%_40%)]";

function readInk(value: string): Ink {
  const [h, s, l] = value.match(/-?[\d.]+/g)?.map(Number) ?? [336, 82, 56];
  return { h, s, l };
}

export type PixelBrushSheetProps = {
  /** Brush ids (see the BRUSHES list in brushes.ts), drawn left to right. */
  brushes?: string[];
  "aria-label"?: string;
  className?: string;
};

export function PixelBrushSheet({ brushes = DEFAULT_SHOWN, "aria-label": ariaLabel, className }: PixelBrushSheetProps) {
  const brushKey = brushes.join(",");
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const PICKED = pick(brushKey.split(","));
    const css = getComputedStyle(host);
    const PAPER_BG = css.getPropertyValue("--pixel-brush-paper").trim();
    const INKS = [1, 2, 3].map((n) => readInk(css.getPropertyValue(`--pixel-brush-ink-${n}`)));

    const canvas = document.createElement("canvas");
    canvas.style.cssText = "display:block;width:100%;height:100%";
    host.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let start = 0;
    let running = false;
    let done = false;
    let onScreen = false;
    let hidden = false;
    let dpr = 1;
    let cols = 4;
    let rows = 3;

    // Always three across, at every width. The card keeps a fixed aspect ratio,
    // so on a phone it is short as well as narrow — stacking into one column made
    // three tall cells inside a wide box, and each spiral ended up smaller than
    // it is when they sit side by side.
    const layout = () => {
      const w = host.clientWidth;
      const h = host.clientHeight;
      if (!w || !h) return false;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const bw = Math.round(w * dpr);
      const bh = Math.round(h * dpr);
      if (canvas.width !== bw || canvas.height !== bh) {
        canvas.width = bw;
        canvas.height = bh;
      }
      cols = PICKED.length;
      rows = 1;
      return true;
    };

    const draw = (elapsed: number) => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.fillStyle = PAPER_BG;
      ctx.fillRect(0, 0, w, h);

      // cell geometry in CSS px (the engine converts to device px itself)
      const cw = host.clientWidth / cols;
      const ch = host.clientHeight / rows;
      const short = Math.min(cw, ch);
      // Radius leaves a margin so neighbouring swatches never touch and the sheet
      // reads as separate specimens.
      const rMax = short * 0.38;

      PICKED.forEach((brush, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const cx = cw * (col + 0.5);
        const cy = ch * (row + 0.5);
        const began = i * STAGGER_MS;
        const p = reduced ? 1 : easeOut(Math.min(1, Math.max(0, (elapsed - began) / DRAW_MS)));
        if (p <= 0) return;
        const path = spiralPath(cx, cy, rMax);
        stroke(ctx, path, brush, short, { progress: p, dpr, ink: INKS[i % INKS.length] });
      });
    };

    const finished = (elapsed: number) =>
      elapsed > (PICKED.length - 1) * STAGGER_MS + DRAW_MS;

    const tick = (now: number) => {
      if (!running) return;
      const elapsed = now - start;
      draw(elapsed);
      if (finished(elapsed)) {
        // The sheet is a still image once drawn, so the loop stops rather than
        // burning frames on a finished picture.
        done = true;
        running = false;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const sync = () => {
      const should = onScreen && !hidden;
      if (!should) {
        running = false;
        cancelAnimationFrame(raf);
        return;
      }
      if (done || running) return;
      if (reduced) {
        draw(Infinity);
        done = true;
        return;
      }
      running = true;
      start = performance.now();
      raf = requestAnimationFrame(tick);
    };

    if (!layout()) return;

    const ro = new ResizeObserver(() => {
      if (!layout()) return;
      // Finished sheets repaint complete rather than replaying, so a resize is
      // not a second entrance.
      if (done) draw(Infinity);
    });
    ro.observe(host);

    const io = new IntersectionObserver(
      (es) => {
        onScreen = es.some((e) => e.isIntersecting);
        sync();
      },
      { rootMargin: "200px" },
    );
    io.observe(host);

    const onVis = () => {
      hidden = document.hidden;
      sync();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      canvas.remove();
    };
  }, [brushKey]);

  return (
    <div
      ref={hostRef}
      role="img"
      aria-label={ariaLabel ?? "Pixel brush swatches on one sheet: the same spiral drawn three times in pink, blue and green, as a combed ribbon, a dense spray, and a loose drift of squares"}
      className={[VARS, "relative aspect-[1344/620] w-full select-none overflow-hidden rounded-[calc(var(--radius)+2px)] border border-border bg-(--pixel-brush-paper)", className].filter(Boolean).join(" ")}
    />
  );
}
