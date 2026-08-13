<!-- Verbatim "Copy prompt" payload from pixel-brushes; includes the full source inline. -->

You are given the complete source for a self-contained web visual: "Pixel brushes".

What it is:
- A brush is a small shape stamped over and over along a path, and a handful of numbers turn the same code into a crisp line or a loose spray.

How to use this code:
- It is a React + TypeScript component tree (Next.js App Router) that renders to an HTML canvas; the entry point is the playground component.
- Drop the files into a project under the same relative paths, mount the playground component, and it runs as-is. No external assets beyond what's inline.
- To adapt it: change the resolved word/logo, the color controls, or the experiment parameters. Ask me to modify, explain, or port any part.

The full source follows, one file per block:

### pixel-brush/brushes.ts
```ts
// Pixel brushes — the brush model.
//
// A brush is a shape stamped repeatedly along a path. Five numbers control how
// each stamp is placed: spacing, jitter, scatter, follow and speedSize. Together
// they cover everything from a crisp line to a loose spray.
//
// Stamps are axis-aligned squares, sometimes several per stamp at different
// opacities. Everything is generated — no bitmap textures.

export interface Brush {
  id: string;
  /** shown in the swatch caption */
  name: string;

  // ── the five numbers ──────────────────────────────────────────────────────
  /** gap between stamps, as a fraction of stamp size. Small = a solid line,
   *  large = separate marks with paper between them. */
  spacing: number;
  /** perpendicular wander of the stamp centre, fraction of stamp size. Moves the
   *  line off itself without breaking it up. */
  jitter: number;
  /** free radial offset per stamp, fraction of stamp size. This is what turns a
   *  line into a spray — the stamps stop belonging to the path. */
  scatter: number;
  /** 0 = stamps keep a fixed angle, 1 = they rotate to follow the path. On a
   *  curve this is very visible: fixed squares read as a pixel grid the line
   *  passes through, following ones read as a ribbon. */
  follow: number;
  /** how much speed shrinks the stamp, 0..1. Gives a stroke its taper. */
  speedSize: number;

  // ── the stamp ─────────────────────────────────────────────────────────────
  /** cells that make up one stamp, in stamp-local units (-1..1), each with its
   *  own alpha. One cell is a plain square; several make a cluster or a
   *  checkerboard. */
  cells: { x: number; y: number; s: number; a: number }[];
  /** base stamp size as a fraction of the swatch's short side */
  size: number;
  /** degrees of hue drift along the stroke; 0 for the single-colour brushes */
  hueDrift: number;
}

/** One square, the default stamp. */
const ONE = [{ x: 0, y: 0, s: 1, a: 1 }];

/** A diagonal run of squares at falling opacity. Stamped along a path, each one
 *  lays a short diagonal and consecutive stamps interlock into a weave. */
function diagonal(n: number, fade: number) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const t = i / Math.max(1, n - 1);
    out.push({ x: (t - 0.5) * 2, y: (t - 0.5) * 2, s: 1, a: 1 - t * fade });
  }
  return out;
}

/** A few squares around the centre. Offsets are fixed, not random, so a brush
 *  produces the same mark every time. */
const CLUMP = [
  { x: -0.55, y: 0.15, s: 0.9, a: 1 },
  { x: 0.45, y: -0.5, s: 1.05, a: 0.92 },
  { x: 0.3, y: 0.6, s: 0.8, a: 0.85 },
];

/** A short vertical bar of cells — reads as a row/comb rather than a dot. */
function bar(n: number, s: number) {
  const out = [];
  for (let i = 0; i < n; i++) {
    out.push({ x: 0, y: (i / (n - 1) - 0.5) * 2, s, a: 1 });
  }
  return out;
}

// The brush set. Ordered tightest to loosest: a line, then a woven fill, then
// progressively more scatter until the marks stop touching.
export const BRUSHES: Brush[] = [
  {
    id: "line-fine",
    name: "Line fine",
    spacing: 0.026,
    jitter: 0,
    scatter: 0,
    follow: 0,
    speedSize: 0,
    cells: ONE,
    size: 0.030,
    hueDrift: 0,
  },
  {
    id: "line-medium",
    name: "Line medium",
    spacing: 0.195,
    jitter: 0,
    scatter: 0,
    follow: 0,
    speedSize: 0,
    cells: ONE,
    size: 0.055,
    hueDrift: 0,
  },
  {
    id: "checker",
    name: "Checkerboard",
    spacing: 0.195,
    jitter: 0,
    scatter: 0,
    // follows the path, so the diagonal stamp swings with the curve and weaves
    follow: 1,
    speedSize: 0,
    cells: diagonal(4, 0.55),
    size: 0.055,
    hueDrift: 0,
  },
  {
    id: "checker-angled",
    name: "Checker angled",
    spacing: 0.130,
    jitter: 0,
    scatter: 0,
    follow: 0,
    speedSize: 0,
    cells: diagonal(3, 0.35),
    size: 0.048,
    hueDrift: 0,
  },
  {
    id: "rows",
    name: "Rows",
    spacing: 0.170,
    jitter: 0.115,
    scatter: 0,
    follow: 1,
    speedSize: 0.563,
    cells: bar(3, 0.8),
    size: 0.055,
    hueDrift: 12,
  },
  {
    id: "bunch",
    name: "Bunch",
    spacing: 0.221,
    jitter: 0.030,
    scatter: 0.042,
    follow: 1,
    speedSize: 0.611,
    cells: CLUMP,
    size: 0.048,
    hueDrift: 0,
  },
  {
    id: "scatter-light",
    name: "Scatter light",
    spacing: 0.304,
    jitter: 0.103,
    scatter: 0,
    follow: 0,
    speedSize: 0.668,
    cells: ONE,
    size: 0.042,
    hueDrift: 0,
  },
  {
    id: "scatter-heavy",
    name: "Scatter heavy",
    spacing: 0.087,
    jitter: 0.184,
    scatter: 0.042,
    follow: 1,
    speedSize: 0.563,
    cells: ONE,
    size: 0.040,
    hueDrift: 0,
  },
  {
    id: "cluster",
    name: "Cluster",
    spacing: 0.195,
    // loosest in the set: stamps thrown a full stamp-width off the line
    scatter: 1.0,
    jitter: 0,
    follow: 0,
    speedSize: 0,
    cells: ONE,
    size: 0.048,
    hueDrift: 0,
  },
  {
    id: "shader",
    name: "Shader",
    spacing: 0.199,
    jitter: 0.212,
    scatter: 0.5,
    follow: 0.5,
    speedSize: 1.0,
    cells: CLUMP,
    size: 0.055,
    hueDrift: 0,
  },
  {
    id: "paint",
    name: "Paint",
    spacing: 0.114,
    jitter: 0.006,
    scatter: 0,
    follow: 1,
    speedSize: 0.25,
    cells: ONE,
    size: 0.062,
    hueDrift: 16,
  },
  {
    id: "rainbow",
    name: "Rainbow",
    spacing: 0.087,
    jitter: 0.184,
    scatter: 0.042,
    follow: 1,
    speedSize: 0.563,
    cells: ONE,
    size: 0.040,
    // scatter-heavy plus colour drift along the stroke
    hueDrift: 300,
  },
];

/** Looked up by id, not index — the array order is presentational and may change. */
export const DEFAULT_BRUSH =
  BRUSHES.find((b) => b.id === "scatter-heavy") ?? BRUSHES[0];

/** Ink colour, as HSL parts. Hue is what the rainbow brushes drift. */
export interface Ink {
  h: number;
  s: number;
  l: number;
}

/** The pink family from the source sheet: hot pink on white. */
export const INK: Ink = { h: 336, s: 82, l: 56 };

/** The default plate: a hair off pure white, so ink sits on paper. */
export const PAPER = "#fdfcfc";

export function inkColor(ink: Ink, hueOffset: number, alpha: number): string {
  const h = (((ink.h + hueOffset) % 360) + 360) % 360;
  return `hsl(${h} ${ink.s}% ${ink.l}% / ${alpha})`;
}

/* ------------------------------------------------------------------ *
 * Remix — a random but always-legible brush + palette.
 * ------------------------------------------------------------------ */

/** Rough relative luminance of an HSL ink, 0..1. A legibility guard, not colour science. */
function inkLuma(ink: Ink): number {
  const s = ink.s / 100;
  const l = ink.l / 100;
  // saturated hues read darker than their lightness suggests, so weight them down
  return l * (1 - s * 0.35);
}

/**
 * A random ink + paper pair that is always readable. Colours are generated
 * freely, then the ink is darkened until it clears a contrast floor — otherwise
 * a roll eventually lands pale-yellow on white and the stroke disappears.
 */
export function remixPalette(rand: () => number): { ink: Ink; paper: string } {
  const ink: Ink = {
    h: Math.floor(rand() * 360),
    s: 55 + rand() * 40,
    l: 40 + rand() * 20,
  };

  // Paper is a full colour, not just a paper-white. Four families, weighted so
  // pale plates stay the common case and the louder ones arrive as a surprise.
  const roll = rand();
  const paperHue =
    rand() < 0.5 ? (ink.h + 180) % 360 : Math.floor(rand() * 360);
  let paperSat: number;
  let paperLight: number;
  if (roll < 0.4) {
    // pale tint — the classic sheet
    paperSat = rand() < 0.4 ? 0 : 8 + rand() * 16;
    paperLight = 92 + rand() * 6;
  } else if (roll < 0.65) {
    // soft colour: a proper coloured ground, still light enough to read on
    paperSat = 30 + rand() * 45;
    paperLight = 78 + rand() * 12;
  } else if (roll < 0.85) {
    // dark plate — ink goes light against it, handled by the guard below
    paperSat = 18 + rand() * 40;
    paperLight = 10 + rand() * 14;
  } else {
    // near-black or near-white extreme
    paperSat = rand() * 12;
    paperLight = rand() < 0.5 ? 4 + rand() * 6 : 97 + rand() * 3;
  }
  const paper = `hsl(${paperHue} ${paperSat}% ${paperLight}%)`;

  // Legibility guard, both directions: push the ink away from the paper until
  // there is a clear gap. On a dark plate that means lightening it, which is why
  // this cannot be a one-way darken.
  const paperLuma = paperLight / 100;
  const goDark = paperLuma > 0.5;
  let guard = 0;
  while (Math.abs(inkLuma(ink) - paperLuma) < 0.3 && guard++ < 24) {
    ink.l += goDark ? -4 : 4;
    ink.l = Math.min(92, Math.max(12, ink.l));
    // clamped at both ends: if lightness alone cannot open the gap, drop the
    // saturation instead, which moves luminance the rest of the way
    if (ink.l <= 12 || ink.l >= 92) ink.s = Math.max(25, ink.s - 6);
  }

  return { ink, paper };
}

/* ------------------------------------------------------------------ *
 * Generated stamps
 *
 * Remix invents a stamp shape rather than reusing one from the set above, so a
 * remixed brush is one that is not in the list. Each generator returns cells in
 * stamp-local -1..1 space, the same format as the authored stamps.
 * ------------------------------------------------------------------ */

type Cells = Brush["cells"];

/** A hollow ring of cells — draws as a tube or a chain depending on spacing. */
function ring(n: number, rand: () => number): Cells {
  const out: Cells = [];
  const phase = rand() * Math.PI * 2;
  for (let i = 0; i < n; i++) {
    const a = phase + (i / n) * Math.PI * 2;
    out.push({ x: Math.cos(a), y: Math.sin(a), s: 0.85, a: 1 });
  }
  return out;
}

/** Two parallel rows of cells — reads as a comb, or as tyre tread on a curve. */
function comb(n: number, gap: number): Cells {
  const out: Cells = [];
  for (let i = 0; i < n; i++) {
    const t = (i / Math.max(1, n - 1) - 0.5) * 2;
    out.push({ x: t, y: -gap, s: 0.8, a: 1 });
    out.push({ x: t, y: gap, s: 0.8, a: 0.85 });
  }
  return out;
}

/** A plus / cross of cells. Fixed it reads as a grid of crosses; following the
 *  path it reads as a rail with sleepers. */
function cross(arm: number): Cells {
  const out: Cells = [{ x: 0, y: 0, s: 1, a: 1 }];
  for (let i = 1; i <= arm; i++) {
    const t = i / arm;
    const a = 1 - t * 0.5;
    out.push({ x: t, y: 0, s: 0.75, a });
    out.push({ x: -t, y: 0, s: 0.75, a });
    out.push({ x: 0, y: t, s: 0.75, a });
    out.push({ x: 0, y: -t, s: 0.75, a });
  }
  return out;
}

/** A sparse cloud of cells. Offsets are rolled once, so the spatter is stable. */
function cloud(n: number, rand: () => number): Cells {
  const out: Cells = [];
  for (let i = 0; i < n; i++) {
    const a = rand() * Math.PI * 2;
    const r = Math.pow(rand(), 0.6);
    out.push({
      x: Math.cos(a) * r,
      y: Math.sin(a) * r,
      s: 0.5 + rand() * 0.7,
      a: 0.5 + rand() * 0.5,
    });
  }
  return out;
}

/** A wedge: cells along one axis at shrinking size, so each stamp has a nose and
 *  a tail. Following the path this reads as a calligraphic nib. */
function wedge(n: number): Cells {
  const out: Cells = [];
  for (let i = 0; i < n; i++) {
    const t = i / Math.max(1, n - 1);
    out.push({ x: (t - 0.5) * 2, y: 0, s: 1 - t * 0.7, a: 1 - t * 0.3 });
  }
  return out;
}

/** Named stamp generators, so a remix reads as a preset rather than a dice roll. */
const STAMPS: { name: string; make: (rand: () => number) => Cells }[] = [
  { name: "Ring", make: (r) => ring(4 + Math.floor(r() * 4), r) },
  { name: "Comb", make: (r) => comb(2 + Math.floor(r() * 3), 0.5 + r() * 0.5) },
  { name: "Cross", make: (r) => cross(1 + Math.floor(r() * 2)) },
  { name: "Spatter", make: (r) => cloud(3 + Math.floor(r() * 4), r) },
  { name: "Nib", make: (r) => wedge(3 + Math.floor(r() * 3)) },
  { name: "Dot", make: () => [{ x: 0, y: 0, s: 1, a: 1 }] },
  { name: "Weave", make: (r) => diagonal(3 + Math.floor(r() * 3), 0.3 + r() * 0.5) },
];

/** Adjective derived from the numbers, so the name describes the brush. */
function describe(b: Omit<Brush, "id" | "name">): string {
  if (b.scatter > 0.6) return "spray";
  if (b.spacing > 0.35) return "dotted";
  if (b.spacing < 0.06) return "solid";
  if (b.jitter > 0.18) return "rough";
  if (b.follow >= 1) return "flowing";
  return "even";
}

/**
 * A remix brush: an invented stamp plus a full roll of the five numbers. Nothing
 * is inherited from the set above. Ranges are wide, with guards that keep the
 * result a brush rather than static.
 */
export function remixBrush(rand: () => number): Brush {
  const stamp = STAMPS[Math.floor(rand() * STAMPS.length)];
  const cells = stamp.make(rand);

  // Curved rather than uniform: a flat roll would make most remixes dotted.
  const spacing = 0.02 + Math.pow(rand(), 1.8) * 0.55;
  const scatter = rand() < 0.45 ? 0 : Math.pow(rand(), 1.4) * 1.0;
  const jitter = rand() < 0.4 ? 0 : Math.pow(rand(), 1.5) * 0.3;
  // follow is a mode (fixed vs. rotating with the path), so it is snapped.
  const follow = rand() < 0.45 ? 0 : rand() < 0.75 ? 1 : 0.5;
  const speedSize = rand() < 0.5 ? 0 : rand();
  // Scale down as cell count goes up, or a busy stamp becomes a blob.
  const bulk = Math.min(1, cells.length / 8);
  const size = 0.026 + rand() * 0.055 * (1 - bulk * 0.45);
  const hueDrift = rand() < 0.75 ? 0 : Math.floor(rand() * 320);

  const parts = { spacing, jitter, scatter, follow, speedSize, cells, size, hueDrift };
  return {
    id: "remix",
    name: `${stamp.name} ${describe(parts)}`,
    ...parts,
  };
}

```

### pixel-brush/engine.ts
```ts
// Pixel brushes — framework-free Canvas 2D.
//
// Canvas 2D rather than WebGL: a stroke is a few hundred axis-aligned filled
// rects with no per-pixel maths, and fillRect gives hard pixel edges for free.
// Hard edges are the point of a pixel brush, so anything that antialiases them
// works against it.
//
// The model, end to end:
//
//   walk the path at a fixed step
//     -> every `spacing` units, drop a stamp
//        -> offset it perpendicular by `jitter`
//        -> offset it radially by `scatter`
//        -> rotate it by the path direction if `follow`
//        -> scale it down by local speed if `speedSize`
//        -> draw its cells as rects, snapped to whole device pixels
//
// Randomness comes from a seeded hash of the stamp index, not Math.random, so a
// given brush on a given path always produces the same mark — a stroke that
// redrew differently on every resize would read as noise.

import { type Brush, type Ink, INK, inkColor } from "./brushes";

/** Deterministic 0..1 from an integer. Same input, same mark, forever. */
function hash(n: number): number {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
}

export interface PathPoint {
  x: number;
  y: number;
  /** 0..1 along the path, for hue drift and taper */
  t: number;
  /** local speed 0..1, drives speedSize */
  v: number;
}

/**
 * A spiral test path.
 *
 * Curvature changes constantly along it, so a single mark shows how the stamps
 * behave on a tight bend and on a lazy one, and whether they rotate to follow.
 * Every brush looks much the same on a straight line.
 */
export function spiralPath(
  cx: number,
  cy: number,
  rMax: number,
  turns = 2.15,
  steps = 900,
): PathPoint[] {
  const pts: PathPoint[] = [];
  const a0 = -Math.PI * 0.55; // start angle, so the tail exits top-right like the sheet
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    // t^0.72 rather than linear: a linear spiral crowds its turns at the centre
    // and the marks collide into a blob
    const r = rMax * Math.pow(t, 0.72);
    const a = a0 + t * turns * Math.PI * 2;
    // speed rises toward the outside, which tapers the speed-sensitive brushes
    pts.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r, t, v: Math.pow(t, 0.6) });
  }
  return pts;
}

/** Turn a raw pointer trail into a path, with speed measured from the samples. */
export function trailPath(raw: { x: number; y: number }[]): PathPoint[] {
  if (raw.length < 2) return [];
  const out: PathPoint[] = [];
  let total = 0;
  const seg: number[] = [0];
  for (let i = 1; i < raw.length; i++) {
    total += Math.hypot(raw[i].x - raw[i - 1].x, raw[i].y - raw[i - 1].y);
    seg.push(total);
  }
  if (total <= 0) return [];
  for (let i = 0; i < raw.length; i++) {
    const prev = raw[Math.max(0, i - 1)];
    const next = raw[Math.min(raw.length - 1, i + 1)];
    const d = Math.hypot(next.x - prev.x, next.y - prev.y);
    out.push({
      x: raw[i].x,
      y: raw[i].y,
      t: seg[i] / total,
      // normalised against a nominal fast move, so speedSize behaves the same
      // whatever the card size
      v: Math.min(1, d / 24),
    });
  }
  return out;
}

export interface StrokeOptions {
  /** 0..1 — draw only this much of the path. Drives the draw-in animation. */
  progress?: number;
  /** stamp size in px; defaults to brush.size * shortSide */
  sizePx?: number;
  /** extra hue offset applied to the whole stroke */
  hue?: number;
  /** device pixel ratio, so stamps land on whole device pixels */
  dpr?: number;
  /** ink colour; defaults to the sheet's pink */
  ink?: Ink;
  /** multiplies every cell's alpha — used to fade a whole stroke out */
  alpha?: number;
  /** draw only from this point in the path (0..1). With `progress` it makes a
   *  moving window, which is how the card's trail fades from its tail. */
  from?: number;
}

/**
 * Stamp `brush` along `path`.
 *
 * Note the pixel snapping: every cell must land on a whole device pixel or the
 * browser antialiases its edges and the marks turn to soft grey. Stamp size is
 * rounded and each rect origin floored, in device pixels — so the canvas is drawn
 * in device space with the transform reset, not in CSS space.
 */
export function stroke(
  ctx: CanvasRenderingContext2D,
  path: PathPoint[],
  brush: Brush,
  shortSide: number,
  opts: StrokeOptions = {},
) {
  if (path.length < 2) return;
  const dpr = opts.dpr ?? 1;
  const progress = opts.progress ?? 1;
  if (progress <= 0) return;
  const ink = opts.ink ?? INK;
  const alphaMul = opts.alpha ?? 1;
  if (alphaMul <= 0) return;
  const from = opts.from ?? 0;

  // Stamp size in DEVICE px, at least 1 — below that there is nothing to draw.
  const base = Math.max(1, Math.round((opts.sizePx ?? brush.size * shortSide) * dpr));
  // Spacing is authored as a fraction of stamp size, matching how the source
  // brushes express it, so a bigger brush automatically spaces out to match.
  const step = Math.max(1, base * Math.max(0.02, brush.spacing));

  // Walk the path by arc length, dropping a stamp every `step`.
  let carry = 0;
  let idx = 0;
  const limit = progress;

  for (let i = 1; i < path.length; i++) {
    const a = path[i - 1];
    const b = path[i];
    if (a.t > limit) break;

    const dx = (b.x - a.x) * dpr;
    const dy = (b.y - a.y) * dpr;
    const segLen = Math.hypot(dx, dy);
    if (segLen <= 0) continue;
    const ux = dx / segLen;
    const uy = dy / segLen;
    const ang = Math.atan2(uy, ux);

    let travelled = carry;
    while (travelled < segLen) {
      const f = travelled / segLen;
      const t = a.t + (b.t - a.t) * f;
      if (t > limit) break;
      // Below the window: still step the index so the seeded randomness stays
      // attached to its stamp, or the marks reshuffle as the window moves.
      if (t < from) {
        idx++;
        travelled += step;
        continue;
      }

      const v = a.v + (b.v - a.v) * f;
      let px = (a.x * dpr + dx * f);
      let py = (a.y * dpr + dy * f);

      const h1 = hash(idx * 2.17);
      const h2 = hash(idx * 3.71 + 11.3);
      const h3 = hash(idx * 5.13 + 27.9);

      // jitter: perpendicular to travel, so the line wanders without leaving itself
      if (brush.jitter > 0) {
        const j = (h1 - 0.5) * 2 * brush.jitter * base;
        px += -uy * j;
        py += ux * j;
      }
      // scatter: free radial throw, which is what breaks a line into a spray
      if (brush.scatter > 0) {
        const sa = h2 * Math.PI * 2;
        const sr = h3 * brush.scatter * base;
        px += Math.cos(sa) * sr;
        py += Math.sin(sa) * sr;
      }

      // speed thins the mark, but never to nothing: a stamp that rounds to 0px
      // leaves a hole rather than a light patch
      const scale = brush.speedSize > 0 ? 1 - brush.speedSize * v * 0.55 : 1;
      const cell = Math.max(1, Math.round(base * scale * 0.5));

      const rot = brush.follow > 0 ? ang * brush.follow : 0;
      const cos = Math.cos(rot);
      const sin = Math.sin(rot);
      const hue = brush.hueDrift * t + (opts.hue ?? 0);

      for (const c of brush.cells) {
        // cell offset within the stamp, rotated if the brush follows the path
        const ox = c.x * base * 0.5;
        const oy = c.y * base * 0.5;
        const rx = ox * cos - oy * sin;
        const ry = ox * sin + oy * cos;
        const w = Math.max(1, Math.round(cell * c.s));
        // floor, not round: adjacent stamps tile exactly instead of overlapping
        // by a pixel and darkening the seam
        const x = Math.floor(px + rx - w / 2);
        const y = Math.floor(py + ry - w / 2);
        ctx.fillStyle = inkColor(ink, hue, c.a * alphaMul);
        ctx.fillRect(x, y, w, w);
      }

      idx++;
      travelled += step;
    }
    carry = travelled - segLen;
  }
}

```

### pixel-brush/PixelBrushCard.tsx
```tsx
"use client";

// The Vault card + detail hero: three brush swatches.
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
import { onTransitionChange } from "../../lib/view-transition";

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
const SHOWN = ["rows", "scatter-heavy", "cluster"];

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

const PICKED: Brush[] = SHOWN.map((id) => {
  const b = BRUSHES.find((x) => x.id === id) ?? BRUSHES[0];
  return TWEAKS[id] ? { ...b, ...TWEAKS[id] } : b;
});

/** One paper for the whole card, with an ink per swatch. A shared ground reads as
 *  one sheet with three specimens on it; the inks are far enough apart in hue to
 *  separate the marks without any of them fighting the page. */
const PAPER_BG = "#fbf9f7";
const INKS: Ink[] = [
  { h: 336, s: 82, l: 56 }, // the set's pink
  { h: 212, s: 84, l: 52 }, // blue
  { h: 152, s: 62, l: 40 }, // green
];

export function PixelBrushCard({
  bare = false,
  viewTransitionName,
}: { bare?: boolean; viewTransitionName?: string } = {}) {
  void bare;
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
    let inTransition = false;
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
      const should = onScreen && !hidden && !inTransition;
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
    const offTransition = onTransitionChange((active) => {
      inTransition = active;
      sync();
    });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      offTransition();
      canvas.remove();
    };
  }, []);

  return (
    <div
      ref={hostRef}
      data-canvas-card
      style={{ viewTransitionName }}
      aria-label="Three pixel brush swatches on one sheet: the same spiral drawn three times in pink, blue and green, as a combed ribbon, a dense spray, and a loose drift of squares"
      className="relative aspect-[1344/620] w-full select-none overflow-hidden rounded-[12px] border border-[var(--border-line)] bg-[#fbf9f7]"
    />
  );
}

```18:["$","div",null,{"className":"py-24","children":[["$","script",null,{"type":"application/ld+json","suppressHydrationWarning":true,"dangerouslySetInnerHTML":{"__html":"[{\"@context\":\"https://schema.org\",\"@type\":\"TechArticle\",\"headline\":\"Pixel brushes\",\"url\":\"https://arlan.me/vault/pixel-brushes\",\"image\":\"/vault/color-depth.svg\",\"datePublished\":\"Aug 2, 2026\",\"about\":\"Study\",\"keywords\":\"Canvas, Brush, Pixel\",\"author\":{\"@type\":\"Person\",\"name\":\"Arlan Marat\",\"url\":\"https://arlan.me\"},\"isPartOf\":{\"@type\":\"CollectionPage\",\"name\":\"Vault\",\"url\":\"https://arlan.me/vault\"}},{\"@context\":\"https://schema.org\",\"@type\":\"BreadcrumbList\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Vault\",\"item\":\"https://arlan.me/vault\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Pixel brushes\",\"item\":\"https://arlan.me/vault/pixel-brushes\"}]}]"}}],["$","article",null,{"className":"flex min-w-0 flex-col gap-10 text-[15px] leading-[1.7]","children":[["$","header",null,{"style":{"viewTransitionName":"vault-detail-head"},"className":"flex items-center justify-between gap-4","children":[["$","h1",null,{"className":"font-semibold text-[var(--text-primary)]","children":"Pixel brushes"}],["$","$L22",null,{"href":"/vault"}]]}],[["$","$L23",null,{"moduleIds":[62832]}],"$L24"],false,["$","div",null,{"style":{"viewTransitionName":"vault-detail-body"},"className":"flex min-w-0 flex-col gap-14","children":[["$","div",null,{"className":"flex flex-col gap-3","children":[["$","p","0",{"className":"text-pretty text-[var(--text-primary)]","children":[["$","$1","0",{"children":"A brush is a small shape stamped over and over along a path, and a handful of numbers turn the same code into a crisp line or a loose spray."}]]}]]}],["$","$L25",null,{"children":[["$","$L26",null,{"playground":"pixel-brush"}],["$","section",null,{"className":"flex min-w-0 flex-col gap-3","children":[["$","header",null,{"className":"flex items-center justify-between gap-3 pb-2 border-b border-[var(--border-line)]","children":[["$","h2",null,{"className":"font-semibold text-[var(--text-primary)]","children":"Code"}],["$","$L27",null,{"text":"$28","label":"Copy prompt","hideIcon":true,"className":"inline-flex h-7 shrink-0 items-center self-start rounded-lg border border-[var(--border-line)] bg-[var(--bg-surface)] px-3 text-[12px] font-medium text-[var(--text-secondary)] transition-colors duration-150 ease-[var(--ease-out)] hover:bg-[var(--bg-hover)] hover:border-[var(--border-ring)] hover:text-[var(--text-primary)] active:scale-[0.98]"}]]}],"$L29"]}],"$L2a","$L2b"]}]]}],"$L2c"]}]]}]
