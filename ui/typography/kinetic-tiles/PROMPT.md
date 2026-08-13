<!-- Verbatim "Copy prompt" payload from kinetic-typography; includes the full source inline. -->

You are given the complete source for a self-contained web visual: "Kinetic typography".

What it is:
- A letter is cut into a grid of tiles, and each tile slips on its own wave, so the whole letter ripples like water.

How to use this code:
- It is a React + TypeScript component tree (Next.js App Router) that renders to an HTML canvas; the entry point is the playground component.
- Drop the files into a project under the same relative paths, mount the playground component, and it runs as-is. No external assets beyond what's inline.
- To adapt it: change the resolved word/logo, the color controls, or the experiment parameters. Ask me to modify, explain, or port any part.

The full source follows, one file per block:

### kinetic-a/engine.ts
```ts
// Kinetic typography — a letter warped through a tile grid, in duotone.
//
// The core: draw the letter once to an offscreen buffer, cut the frame into a
// grid of tiles, and for each tile copy from a SOURCE rectangle offset by a sine
// wave whose phase depends on frameCount and the tile's position. That slips
// neighbouring tiles out of phase and the letter ripples.
//
// Four upgrades on top of that base:
//   1. Two-axis interference — the source offset is the SUM of two waves at
//      different frequencies, so the ripple crosses itself (cloth/water) instead
//      of sliding as one flat sheet.
//   2. Chromatic split — the warped letter is composited in the ink colour plus
//      two accent copies pushed a few px apart, so warped edges bloom into a
//      coloured fringe.
//   3. Depth shading — each warped tile is drawn at an alpha set by how much it
//      moved, so tiles in motion catch a bit of light and the letter gains relief.
//   4. A faint grain + scanline veil over the whole card for analog warmth.
//
// PERFORMANCE: the warp is done ONCE per frame with plain drawImage tile copies
// (no per-tile compositing — that was the slow path). Duotone + chroma are three
// whole-frame composites, so their cost is constant no matter the tile count.

export interface KineticParams {
  text: string;
  paper: string;
  ink: string;
  accent: string;
  tiles: number; // grid columns; rows derived from aspect
  offset: number; // max source displacement, CSS px
  speed: number; // wave speed per frame
  spread: number; // the x*y phase term — low = uniform, high = turbulent
  chroma: number; // chromatic-split strength 0..1
  shade: number; // depth-shading strength 0..1
  grain: number; // grain/scanline strength 0..1
}

// ── small colour helpers ────────────────────────────────────────────────────
function parseHex(hex: string): [number, number, number] {
  let h = hex.replace("#", "").trim();
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}
const clamp255 = (n: number) => Math.max(0, Math.min(255, Math.round(n)));
const rgb = ([r, g, b]: [number, number, number], a = 1) => `rgba(${r},${g},${b},${a})`;

function token(name: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

const ASPECT = 16 / 9;

export class KineticA {
  private stage: HTMLDivElement;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  // `mask`: the letter drawn once as WHITE on BLACK (opaque), so warping it is a
  // plain fast drawImage copy. `warp`: the warped letter each frame (also
  // white-on-black). We tint `warp` onto the main canvas at composite time.
  private mask: HTMLCanvasElement;
  private mctx: CanvasRenderingContext2D;
  private warp: HTMLCanvasElement;
  private wctx: CanvasRenderingContext2D;
  private grainCanvas: HTMLCanvasElement | null = null;

  private dpr = 1;
  private w = 0;
  private h = 0;
  private frame = 0;
  private raf = 0;
  private running = false;

  private p: KineticParams;
  private paperRGB: [number, number, number] = [252, 252, 252];
  private inkRGB: [number, number, number] = [27, 27, 27];
  private accentRGB: [number, number, number] = [59, 130, 246];
  private accentInv: [number, number, number] = [196, 125, 9];
  private box = { x0: 0, y0: 0, x1: 0, y1: 0 };

  constructor(stage: HTMLDivElement, params: KineticParams) {
    this.stage = stage;
    this.p = params;

    this.canvas = document.createElement("canvas");
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";
    this.canvas.style.display = "block";
    stage.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d")!;

    this.mask = document.createElement("canvas");
    this.mctx = this.mask.getContext("2d", { willReadFrequently: true })!;
    this.warp = document.createElement("canvas");
    this.wctx = this.warp.getContext("2d")!;

    this.applyColors();
    this.resize();
  }

  setParams(params: KineticParams) {
    const textChanged = params.text !== this.p.text;
    const colorsChanged =
      params.paper !== this.p.paper ||
      params.ink !== this.p.ink ||
      params.accent !== this.p.accent;
    const grainChanged = params.grain !== this.p.grain;
    this.p = params;
    if (colorsChanged) this.applyColors();
    if (textChanged) this.drawLetter();
    if (grainChanged) this.buildGrain();
    if (!this.running) this.renderStatic();
  }

  private applyColors() {
    this.paperRGB = parseHex(this.p.paper);
    this.inkRGB = parseHex(this.p.ink);
    this.accentRGB = parseHex(this.p.accent);
    this.accentInv = [
      255 - this.accentRGB[0],
      255 - this.accentRGB[1],
      255 - this.accentRGB[2],
    ];
  }

  resize() {
    const rect = this.stage.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = rect.width;
    this.h = rect.height;

    const pw = Math.round(this.w * this.dpr);
    const ph = Math.round(this.h * this.dpr);
    for (const c of [this.canvas, this.mask, this.warp]) {
      c.width = pw;
      c.height = ph;
    }

    this.buildGrain();
    this.drawLetter();
    if (!this.running) this.renderStatic();
  }

  // Draw the letter once as an opaque white shape on a TRANSPARENT background, so
  // the warped tiles carry real alpha and can be tinted to any ink and placed
  // over any paper. Warping is a plain drawImage copy (the fast tutorial path).
  private drawLetter() {
    const { mctx, mask } = this;
    const W = mask.width;
    const H = mask.height;
    mctx.clearRect(0, 0, W, H);

    const text = (this.p.text || "A").slice(0, 12);
    const single = text.length === 1;
    const family = token("--font-woodland", "").split(",")[0].trim();
    let size = Math.round(H * (single ? 0.86 : 0.6));
    mctx.fillStyle = "#fff";
    mctx.textAlign = "center";
    mctx.textBaseline = "middle";
    const setFont = (s: number) =>
      (mctx.font = family ? `700 ${s}px ${family}, system-ui` : `800 ${s}px system-ui`);
    setFont(size);
    if (!single) {
      const maxW = W * 0.9;
      let guard = 0;
      while (mctx.measureText(text).width > maxW && size > 12 && guard++ < 40) {
        size -= 4;
        setFont(size);
      }
    }
    mctx.fillText(text, W / 2, H * 0.54);
    this.measureBox();
  }

  // Bounding box of the ink so the tile loop skips empty tiles. Runs only on
  // text/size change (not per frame), so getImageData here is fine.
  private measureBox() {
    const { mctx, mask } = this;
    const W = mask.width;
    const H = mask.height;
    try {
      const data = mctx.getImageData(0, 0, W, H).data;
      let x0 = W, y0 = H, x1 = 0, y1 = 0;
      for (let y = 0; y < H; y += 2) {
        for (let x = 0; x < W; x += 2) {
          // letter is opaque on a transparent bg → alpha channel marks ink
          if (data[(y * W + x) * 4 + 3] > 20) {
            if (x < x0) x0 = x;
            if (x > x1) x1 = x;
            if (y < y0) y0 = y;
            if (y > y1) y1 = y;
          }
        }
      }
      if (x1 < x0) { x0 = 0; y0 = 0; x1 = W; y1 = H; }
      this.box = { x0, y0, x1, y1 };
    } catch {
      this.box = { x0: 0, y0: 0, x1: W, y1: H };
    }
  }

  private buildGrain() {
    if (this.p.grain <= 0) { this.grainCanvas = null; return; }
    const W = this.mask.width;
    const H = this.mask.height;
    if (!W || !H) return;
    const c = document.createElement("canvas");
    c.width = W;
    c.height = H;
    const g = c.getContext("2d")!;
    const img = g.createImageData(W, H);
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      const n = (Math.sin(i * 12.9898) * 43758.5453) % 1;
      const v = 128 + (n - 0.5) * 255;
      d[i] = d[i + 1] = d[i + 2] = clamp255(v);
      d[i + 3] = 12;
    }
    g.putImageData(img, 0, 0);
    g.globalAlpha = 0.06;
    g.fillStyle = "#000";
    const step = Math.max(2, Math.round(3 * this.dpr));
    for (let y = 0; y < H; y += step) g.fillRect(0, y, W, Math.max(1, Math.round(this.dpr)));
    this.grainCanvas = c;
  }

  // ── the frame ────────────────────────────────────────────────────────────
  private renderFrame() {
    const { ctx, wctx, mask } = this;
    const W = mask.width;
    const H = mask.height;
    const p = this.p;
    const off = p.offset * this.dpr;

    // 1) Build the warped letter into `warp` (white shape on transparent). Plain
    //    tile copies — the fast tutorial path. Depth shade is baked in per-tile.
    wctx.globalCompositeOperation = "source-over";
    wctx.globalAlpha = 1;
    wctx.clearRect(0, 0, W, H);

    const TILES_X = Math.max(2, Math.round(p.tiles));
    const TILES_Y = Math.max(2, Math.round(p.tiles / ASPECT));
    const tileW = Math.floor(W / TILES_X);
    const tileH = Math.floor(H / TILES_Y);
    if (tileW > 0 && tileH > 0) {
      const cx0 = Math.max(0, Math.floor(this.box.x0 / tileW) - 1);
      const cy0 = Math.max(0, Math.floor(this.box.y0 / tileH) - 1);
      const cx1 = Math.min(TILES_X - 1, Math.ceil(this.box.x1 / tileW) + 1);
      const cy1 = Math.min(TILES_Y - 1, Math.ceil(this.box.y1 / tileH) + 1);
      const t = this.frame * p.speed;

      for (let y = cy0; y <= cy1; y++) {
        for (let x = cx0; x <= cx1; x++) {
          const phase = x * y;
          const wave1 = Math.sin(t + phase * p.spread);
          const wave2 = Math.sin(t * 0.7 + (x + y) * p.spread * 1.9 + 1.3);
          const mix = wave1 * 0.65 + wave2 * 0.45; // ~[-1.1, 1.1]
          const waveX = Math.round(mix * off);
          const waveY = Math.round(Math.sin(t * 0.9 + phase * p.spread * 0.6) * off * 0.7);

          const sx = x * tileW + waveX;
          const sy = y * tileH + waveY;
          const dx = x * tileW;
          const dy = y * tileH;
          const dw = x === TILES_X - 1 ? W - dx : tileW;
          const dh = y === TILES_Y - 1 ? H - dy : tileH;
          if (dw <= 0 || dh <= 0) continue;
          if (sx + dw <= 0 || sy + dh <= 0 || sx >= W || sy >= H) continue;

          // depth shade → alpha: tiles that moved most are a touch brighter.
          wctx.globalAlpha = p.shade > 0
            ? 1 - p.shade * 0.5 + Math.min(1, Math.abs(mix)) * p.shade * 0.5
            : 1;
          wctx.drawImage(mask, sx, sy, dw, dh, dx, dy, dw, dh);
        }
      }
      wctx.globalAlpha = 1;
    }

    // 2) Composite `warp` onto the main canvas in DUOTONE, with a chromatic split.
    //    Constant cost: three full-frame draws max. The accent copies go down
    //    FIRST (offset, so their fringe peeks out from behind), then the ink on
    //    top at true position, so the letter body stays clean ink and only the
    //    warped edges show colour.
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
    ctx.fillStyle = rgb(this.paperRGB);
    ctx.fillRect(0, 0, W, H);

    if (p.chroma > 0) {
      const shiftPx = Math.round(p.chroma * 5 * this.dpr) + 1;
      this.compositeTinted(this.accentRGB, shiftPx, 0.7 * p.chroma);
      this.compositeTinted(this.accentInv, -shiftPx, 0.6 * p.chroma);
    }
    this.compositeTinted(this.inkRGB, 0, 1);

    // 3) grain + scanline veil
    if (this.grainCanvas && p.grain > 0) {
      ctx.globalCompositeOperation = "overlay";
      ctx.globalAlpha = p.grain;
      ctx.drawImage(this.grainCanvas, 0, 0);
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    }
  }

  // Tint the warped letter (white shape on transparent) to `col` and composite it
  // onto the main canvas, shifted by `dxPx`. One reusable scratch buffer:
  //   scratch = warp            (white letter, real alpha)
  //   scratch 'source-in' col   (fill col only where the letter is) → tinted letter
  //   main    'source-over'     (place it over the paper at any offset)
  // Correct for ANY ink/paper combo (no luminance-key assumptions).
  private tintScratch: HTMLCanvasElement | null = null;
  private tctx: CanvasRenderingContext2D | null = null;
  private compositeTinted(
    col: [number, number, number],
    dxPx: number,
    alpha: number,
  ) {
    const W = this.warp.width;
    const H = this.warp.height;
    if (!this.tintScratch) {
      this.tintScratch = document.createElement("canvas");
      this.tctx = this.tintScratch.getContext("2d")!;
    }
    if (this.tintScratch.width !== W || this.tintScratch.height !== H) {
      this.tintScratch.width = W;
      this.tintScratch.height = H;
    }
    const s = this.tctx!;
    s.globalCompositeOperation = "source-over";
    s.globalAlpha = 1;
    s.clearRect(0, 0, W, H);
    s.drawImage(this.warp, 0, 0);
    s.globalCompositeOperation = "source-in";
    s.fillStyle = rgb(col);
    s.fillRect(0, 0, W, H);
    s.globalCompositeOperation = "source-over";

    this.ctx.globalAlpha = alpha;
    this.ctx.drawImage(this.tintScratch, dxPx, 0);
    this.ctx.globalAlpha = 1;
  }

  renderStatic() {
    this.frame = 0;
    this.renderFrame();
  }

  private tick = () => {
    if (!this.running) return;
    this.frame++;
    this.renderFrame();
    this.raf = requestAnimationFrame(this.tick);
  };

  start() {
    if (this.running) return;
    this.running = true;
    this.raf = requestAnimationFrame(this.tick);
  }

  stop() {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  refreshLetter() {
    this.drawLetter();
    if (!this.running) this.renderStatic();
  }

  destroy() {
    this.stop();
    this.canvas.remove();
  }
}

```

### kinetic-a/KineticACard.tsx
```tsx
"use client";

// The kinetic-typography Vault card: a bold letter warped through a tile grid in
// duotone (see ./engine.ts). Thin wrapper — mounts the framework-free engine,
// keeps it in sync with `params`, and pauses it offscreen or when the tab is
// hidden. Used both as the gallery card and the detail-page hero (share a
// view-transition-name so the card morphs into the hero).

import { useEffect, useRef, type CSSProperties } from "react";
import { KineticA as Engine, type KineticParams } from "./engine";
import { onTransitionChange } from "../../lib/view-transition";

// The card's default look: ink on paper, a calm ripple with a blue edge-split.
// The playground passes its own live params instead.
export const DEFAULT_PARAMS: KineticParams = {
  text: "a",
  paper: "#fcfcfc",
  ink: "#1b1b1b",
  accent: "#3b82f6",
  tiles: 34,
  offset: 26,
  speed: 0.02,
  spread: 0.025,
  chroma: 0.35,
  shade: 0.35,
  grain: 0.7,
};

export function KineticACard({
  flush = false,
  params = DEFAULT_PARAMS,
  viewTransitionName,
}: {
  /** Playground mode: round only the TOP so the control panel tucks under the
   *  flat bottom (matches PG_PREVIEW + PG_PANEL used by the other playgrounds). */
  flush?: boolean;
  params?: KineticParams;
  viewTransitionName?: string;
} = {}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Engine | null>(null);

  // Mount once; lifecycle wiring lives here.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const engine = new Engine(stage, params);
    engineRef.current = engine;

    // Repaint the letter once the heavy display face loads (first paint may have
    // used the fallback).
    if (typeof document !== "undefined" && document.fonts) {
      const fam = getComputedStyle(document.documentElement)
        .getPropertyValue("--font-woodland")
        .split(",")[0]
        .trim();
      if (fam) {
        document.fonts.load(`700 64px ${fam}`).then(() => engine.refreshLetter()).catch(() => {});
      }
    }

    if (reduced) {
      engine.renderStatic();
      return () => {
        engine.destroy();
        engineRef.current = null;
      };
    }

    let onScreen = true;
    let hidden = false;
    let inTransition = false;
    // Freeze the rAF loop while a cross-route morph is running — the browser is
    // compositing page snapshots then, so a live canvas underneath only steals
    // the main thread / GPU (and can't visibly update anyway).
    const running = () => onScreen && !hidden && !inTransition;
    const sync = () => {
      if (running()) engine.start();
      else engine.stop();
    };
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
    const offTransition = onTransitionChange((active) => {
      inTransition = active;
      sync();
    });

    return () => {
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      offTransition();
      engine.destroy();
      engineRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Push live param changes to the running engine (playground drives this).
  useEffect(() => {
    engineRef.current?.setParams(params);
  }, [params]);

  // The engine paints its own paper colour, so the frame bg only shows for the
  // split second before mount. In `flush` (playground) mode the bottom is square
  // and the panel tucks under it; otherwise it's a fully-rounded card.
  // flush = the PG_PREVIEW recipe: a FULLY-rounded box at z-10, so PG_PANEL's
  // -mt-5 slides up BEHIND it and the preview keeps its own rounded bottom.
  const shape = flush
    ? "relative z-10 rounded-xl border"
    : "rounded-[12px] border";

  const style: CSSProperties | undefined = viewTransitionName
    ? { viewTransitionName, background: params.paper }
    : { background: params.paper };

  return (
    <div
      ref={stageRef}
      data-canvas-card
      style={style}
      className={`relative mx-auto aspect-video w-full select-none overflow-hidden border-[var(--border-line)] ${shape}`}
    />
  );
}

```18:["$","div",null,{"className":"py-24","children":[["$","script",null,{"type":"application/ld+json","suppressHydrationWarning":true,"dangerouslySetInnerHTML":{"__html":"[{\"@context\":\"https://schema.org\",\"@type\":\"TechArticle\",\"headline\":\"Kinetic typography\",\"url\":\"https://arlan.me/vault/kinetic-typography\",\"image\":\"/vault/color-depth.svg\",\"datePublished\":\"Jul 25, 2026\",\"about\":\"Study\",\"keywords\":\"Canvas, Type, Warp\",\"author\":{\"@type\":\"Person\",\"name\":\"Arlan Marat\",\"url\":\"https://arlan.me\"},\"isPartOf\":{\"@type\":\"CollectionPage\",\"name\":\"Vault\",\"url\":\"https://arlan.me/vault\"}},{\"@context\":\"https://schema.org\",\"@type\":\"BreadcrumbList\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Vault\",\"item\":\"https://arlan.me/vault\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Kinetic typography\",\"item\":\"https://arlan.me/vault/kinetic-typography\"}]}]"}}],["$","article",null,{"className":"flex min-w-0 flex-col gap-10 text-[15px] leading-[1.7]","children":[["$","header",null,{"style":{"viewTransitionName":"vault-detail-head"},"className":"flex items-center justify-between gap-4","children":[["$","h1",null,{"className":"font-semibold text-[var(--text-primary)]","children":"Kinetic typography"}],["$","$L22",null,{"href":"/vault"}]]}],[["$","$L23",null,{"moduleIds":[3751]}],"$L24"],false,["$","div",null,{"style":{"viewTransitionName":"vault-detail-body"},"className":"flex min-w-0 flex-col gap-14","children":[["$","div",null,{"className":"flex flex-col gap-3","children":[["$","p","0",{"className":"text-pretty text-[var(--text-primary)]","children":[["$","$1","0",{"children":"A letter is cut into a grid of tiles, and each tile slips on its own wave, so the whole letter ripples like water."}]]}]]}],["$","$L25",null,{"children":[["$","$L26",null,{"playground":"kinetic-type"}],["$","section",null,{"className":"flex min-w-0 flex-col gap-3","children":[["$","header",null,{"className":"flex items-center justify-between gap-3 pb-2 border-b border-[var(--border-line)]","children":[["$","h2",null,{"className":"font-semibold text-[var(--text-primary)]","children":"Code"}],["$","$L27",null,{"text":"$28","label":"Copy prompt","hideIcon":true,"className":"inline-flex h-7 shrink-0 items-center self-start rounded-lg border border-[var(--border-line)] bg-[var(--bg-surface)] px-3 text-[12px] font-medium text-[var(--text-secondary)] transition-colors duration-150 ease-[var(--ease-out)] hover:bg-[var(--bg-hover)] hover:border-[var(--border-ring)] hover:text-[var(--text-primary)] active:scale-[0.98]"}]]}],"$L29"]}],"$L2a","$L2b"]}]]}],"$L2c"]}]]}]
