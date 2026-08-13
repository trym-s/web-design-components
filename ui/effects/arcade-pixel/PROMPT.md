<!-- Verbatim "Copy prompt" payload from arcade-pixel; includes the full source inline. -->

You are given the complete source for a self-contained web visual: "Arcade pixel".

What it is:
- The letters look pixelated, but there is no pixel grid anywhere: the word is just drawn tiny and blown up, so every little pixel becomes a big square.
- Type your own word below and drag the two sliders that make the whole thing work.

How to use this code:
- It is a React + TypeScript component tree (Next.js App Router) that renders to an HTML canvas; the entry point is the playground component.
- Drop the files into a project under the same relative paths, mount the playground component, and it runs as-is. No external assets beyond what's inline.
- To adapt it: change the resolved word/logo, the color controls, or the experiment parameters. Ask me to modify, explain, or port any part.

The full source follows, one file per block:

### arcade/params.ts
```ts
// Arcade pixel type — the colourways and the numbers that define the effect.
//
// Reverse-engineered from a Photoshop template (4500x3000, RGB/8). The whole
// stack in that file is five things:
//
//   Background        solid #EB0809
//   Effect/Layer      the word, as a smart object
//   Effect/Threshold  150, blending as COLOR BURN   <- the entire effect
//   Textures/         two gradients + Noise (hard light) + Dust (screen)
//                     + Noise (linear light 70%)
//   Settings/         Vibrance +20, Levels in 5->230 gamma 1.00
//
// Every number below was measured off that file rather than eyeballed.

export type Colorway = {
  name: string;
  /** The ground the word is burnt into. */
  ground: [number, number, number];
  /** The dark ink. Measured at #050605 in the source — NOT pure black, which is
   *  worth keeping: a hair of blue in the shadow stops the poster reading as a
   *  flat two-bit stencil. */
  ink: [number, number, number];
  /** The light face of the letters. */
  paper: [number, number, number];
  /** Tint of the coloured speckle along the quantised edges. */
  fringe: [number, number, number];
};

/** The measured original first — it is the card's resting identity. */
export const COLORWAYS: Colorway[] = [
  {
    // Straight off the PSD: a hot, almost pure red.
    name: "Arcade Red",
    ground: [0.922, 0.031, 0.035], // #EB0809
    ink: [0.02, 0.024, 0.02], // #050605
    paper: [1, 1, 1],
    fringe: [0.35, 1, 0.9],
  },
  {
    name: "Acid",
    ground: [0.804, 1, 0.05],
    ink: [0.04, 0.06, 0.02],
    paper: [1, 1, 0.96],
    fringe: [1, 0.2, 0.75],
  },
  {
    name: "Cyanide",
    ground: [0.04, 0.85, 0.92],
    ink: [0.01, 0.05, 0.08],
    paper: [0.96, 1, 1],
    fringe: [1, 0.35, 0.2],
  },
  {
    name: "Monochrome",
    // The one restrained colourway. With no hue to carry the poster, the
    // quantisation itself has to do all the work — which is the best possible
    // demonstration that the effect is the threshold and not the palette.
    ground: [0.9, 0.89, 0.87],
    ink: [0.04, 0.04, 0.05],
    paper: [1, 1, 1],
    fringe: [0.5, 0.55, 0.6],
  },
  {
    name: "Ultraviolet",
    ground: [0.36, 0.05, 0.85],
    ink: [0.03, 0.01, 0.08],
    paper: [0.95, 0.92, 1],
    fringe: [1, 0.85, 0.2],
  },
  {
    name: "Ember",
    ground: [1, 0.42, 0.02],
    ink: [0.08, 0.02, 0.0],
    paper: [1, 0.97, 0.9],
    fringe: [0.2, 0.7, 1],
  },
];

export interface ArcadeParams {
  word: string;
  /**
   * Where the quantised edge lands, 0..1. The PSD's Threshold is 150/255.
   *
   * This is HALF the effect. Moving it does not just brighten the letters — it
   * slides the cut along the blur ramp, so the staircase steps land in different
   * places and the letterforms visibly gain and lose blocks.
   */
  threshold: number;
  /**
   * Cells ACROSS the low-res grid. THIS IS THE BLOCK SIZE.
   *
   * Measured on the source: its smart object is 3750px wide and every edge in
   * both axes falls on an exact 25px boundary, so the art is a 150-cell grid
   * scaled up 25x. Lower is chunkier.
   *
   * Not a blur radius. Thresholding a smooth blur was an earlier attempt and it
   * does not step an edge at all, it only moves it — the blocks have to come
   * from real low resolution.
   */
  cols: number;
  /** White halo width in CELLS. Source: a 73px outside stroke / 25px = ~3. */
  halo: number;
  /** Black keyline width in CELLS. Source: 103px / 25px = ~4. It is WIDER than
   *  the halo, which is why the black shows as a band beyond the white. */
  keyline: number;
  /** How far the black keyline is pushed, in CELLS, as [dx, dy]. The source is
   *  symmetric ([0,0]); offsetting turns the outline into a hard drop shadow. */
  keylineOffset: [number, number];
  /** The source's type is a faux-italic Alternate Gothic. */
  italic: boolean;
  /** Surface strength, scaling all three real plates together.
   *
   *  1.0 is the full print. The blend amounts in the shader are already tuned so
   *  that 1.0 gives roughly the same swing on the red ground, the white letter
   *  faces and the black keyline (~0.48 each), which is what the reference does
   *  — its white faces are every bit as printed as its background. */
  texture: number;
  /** C2: the drop shadow follows the pointer. */
  magnet: boolean;
  /** How far the magnetic shadow can travel beyond its resting offset, in CELLS. */
  magnetReach: number;
  /** How far the face/halo/keyline drift toward the pointer, in uv. Small — the
   *  layers should breathe, not slide. */
  parallax: number;
  /** Magnetism: how far the whole word leans toward the pointer, in uv. */
  pull: number;
  /** S3: how hard the cursor rotates one moire grating against the other. */
  swim: number;
  /** Per-channel offset on the moire, as print misregistration. */
  separation: number;
  /** Colourway index. */
  colorway: number;
}

export const DEFAULTS: ArcadeParams = {
  word: "arcade",
  // 150/255 = 0.588, straight from the file.
  // 150/255 = 0.588, straight from the file.
  threshold: 0.588,
  // The source's own grid. At a 1344px-wide card this is a ~9px block.
  cols: 150,
  halo: 3,
  // 3, not 4. The keyline is a band BEYOND the white halo, so its width and its
  // offset compound — a 4-cell band pushed 2 cells reads as a slab behind the
  // word rather than an edge on it.
  keyline: 3,
  // ONE cell, down and right. Two cells detached the shadow from the letter —
  // at this grid a cell is ~9px, so a 2-cell offset throws the shadow 18px clear
  // of a letter whose stroke is only a few cells thick, and the two stop reading
  // as one object. One cell is a hairline of depth, which is all this needs.
  keylineOffset: [1, 1],
  italic: true,
  // A QUARTER. The moire, grain and dust plates are lifted from the PSD and at
  // anything near full strength they are the loudest thing on the card — the
  // interference pattern starts reading as the subject and the type becomes the
  // background it sits on. At 0.25 the surface is still plainly there (the
  // printed-poster feel survives, which is the whole reason the plates exist)
  // but it stays a texture ON the letters rather than a pattern competing WITH
  // them. The slider still runs past 1 for anyone who wants it heavier.
  texture: 0.25,
  magnet: true,
  // The magnet swings the shadow much less far now. At 3 cells the shadow
  // travelled far enough to sit beside the word rather than under it, which
  // undid the point of shrinking the resting offset.
  magnetReach: 1,
  swim: 1,
  // ~0.9% of the frame at full reach, so the shadow travels about 12px and the
  // face about 4px. Past ~0.02 the layers visibly come apart and the letter
  // stops looking like one object.
  parallax: 0.009,
  // ~1.6% of the frame at most, so the word shifts about 20px when the cursor is
  // right beside it. Deliberately more than the parallax: the lean is the thing
  // you notice, the layer separation is the thing that makes it convincing.
  pull: 0.016,
  separation: 1,
  colorway: 0,
};

/** Stripe angle of the noise texture, in degrees.
 *
 *  Measured at ~80.5deg off the source — very close to vertical but deliberately
 *  NOT vertical. A true 90 reads as a screen artefact or a broken display; a few
 *  degrees of lean reads as a printing pass. */
export const TEXTURE_ANGLE = 80.5;

/** Stripe period as a fraction of card width. ~29px at 4500 wide. */
export const TEXTURE_PERIOD = 0.0065;

/** Levels from the source: input 5..230, gamma 1.00 (a pure contrast crush with
 *  no midtone shift), and Vibrance +20. */
export const LEVELS_IN = [5 / 255, 230 / 255] as const;
export const VIBRANCE = 0.2;

/** The face. The site's heaviest shipped weight — the effect needs fat letters,
 *  because a thin stroke does not survive being quantised into blocks. */
export const FONT_CSS = "var(--font-neue-montreal)";
export const FONT_WEIGHT = 600;

```

### arcade/text-mask.ts
```ts
// Rasterises the word into the three-channel field the shader paints.
//
//   R = the letter FACE      (dark ink)
//   G = the WHITE halo       (face dilated ~3 blocks)
//   B = the BLACK keyline    (face dilated ~4 blocks)
//
// ── WHAT THE SOURCE ACTUALLY DOES ───────────────────────────────────────────
//
// This was rebuilt after decoding the real PSD, and almost every guess made from
// the layer NAMES turned out to be wrong. What is actually in the file:
//
//   The word lives in an embedded smart object (Edit Content.psb) whose group
//   carries TWO Photoshop stroke effects, both position "outside":
//       73px  solid WHITE
//      103px  solid #1F1E1C (near-black)
//   The black is WIDER, so it shows as a band beyond the white — that is the
//   halo-then-keyline you see, and it is two real strokes rather than anything
//   derived from a threshold.
//
//   THE ART IS ALREADY PIXELATED BEFORE ANY ADJUSTMENT RUNS. Rendering the smart
//   object on its own — no Threshold, no textures — gives blocky letters AND
//   blocky strokes. Measured on that render: every run length and every edge in
//   both axes falls on an exact 25px boundary, in a 3750x975 object. So the
//   source is a 150 x 39 bitmap scaled up 25x, and the strokes were applied at
//   that low resolution, which is why they staircase in perfect register with
//   the glyph instead of rounding their own corners.
//
//   The Threshold 150 in color-burn on top is therefore NOT the effect. It only
//   crushes what antialiasing survives the upscale. My first two builds treated
//   it as the whole mechanism and produced soft round letters, because
//   thresholding a smooth ramp MOVES an edge without ever stepping it.
//
// So: rasterise small, dilate the strokes IN CELLS, then scale up with nearest
// neighbour. Everything quantises together because everything is computed on the
// same tiny grid.

import { FONT_WEIGHT as WEIGHT } from "./params";

export interface FieldOpts {
  word: string;
  /** Cells across the low-res grid. The source is 150 for a 3750px object. */
  cols: number;
  /** White halo width, in CELLS. Source: 73px / 25px = ~3. */
  halo: number;
  /** Black keyline width, in CELLS. Source: 103px / 25px = ~4. */
  keyline: number;
  /** How far the keyline is pushed, in CELLS, as [dx, dy].
   *
   *  The source's stroke is symmetric — it rings the letter evenly. Offsetting it
   *  turns the same shape into a hard DROP SHADOW, which is the arcade-cabinet
   *  read: a sticker printed slightly out of register, or a marquee letter with a
   *  block shadow behind it. In cells rather than pixels so the shadow lands
   *  exactly on the lattice and staircases in step with the letter instead of
   *  sliding half a block out of register. */
  keylineOffset: [number, number];
  /** Italic, like the source's faux-italic Alternate Gothic. */
  italic: boolean;
  w: number;
  h: number;
  fontFamily: string;
}

/** Grow a mask by `cells` in every direction, on the low-res grid.
 *
 *  A real morphological dilate on a handful of thousand cells — cheap, and
 *  exact. Doing this with a blur + threshold instead (the obvious shortcut)
 *  rounds the corners, and rounded corners on a blocky letter is precisely the
 *  thing that makes a rebuild of this look wrong. */
function dilate(
  src: Uint8Array,
  cols: number,
  rows: number,
  cells: number,
): Uint8Array {
  let cur = src;
  for (let pass = 0; pass < cells; pass++) {
    const out = new Uint8Array(cols * rows);
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const i = y * cols + x;
        if (cur[i]) {
          out[i] = 1;
          continue;
        }
        // 4-neighbourhood: grows a square, which is what a pixel-grid stroke
        // looks like. An 8-neighbourhood grows a diamond-ish blob and softens
        // the corners the whole effect depends on.
        if (
          (x > 0 && cur[i - 1]) ||
          (x < cols - 1 && cur[i + 1]) ||
          (y > 0 && cur[i - cols]) ||
          (y < rows - 1 && cur[i + cols])
        ) {
          out[i] = 1;
        }
      }
    }
    cur = out;
  }
  return cur;
}

/** SYNCHRONOUS on purpose. It is pure canvas work — a rasterise, a threshold and
 *  two dilates over ~10k cells, well under a millisecond — and the resolution
 *  animation calls it straight from the frame loop. An async signature would
 *  force that caller to await a promise that never actually yields, which lands
 *  the new mask a frame late and makes the collapse stutter. */
export function makeArcadeField(o: FieldOpts): HTMLCanvasElement {
  const W = Math.max(1, Math.round(o.w));
  const H = Math.max(1, Math.round(o.h));

  // ── 1. the LOW-RES grid ───────────────────────────────────────────────────
  const cols = Math.max(24, Math.round(o.cols));
  const rows = Math.max(8, Math.round(cols * (H / W)));

  const low = document.createElement("canvas");
  low.width = cols;
  low.height = rows;
  const lx = low.getContext("2d", { willReadFrequently: true })!;
  lx.clearRect(0, 0, cols, rows);

  const text = (o.word || "").trim();
  if (text) {
    // Leave room for the keyline: the strokes grow OUTWARD, so a word sized to
    // the full width loses its outline off the edge of the card.
    const pad = o.keyline + 2;
    // The source's cap height is ~746px of a 975px object = 0.765, and its type
    // is set in Alternate Gothic — a very condensed face. Ours is not condensed,
    // so it is sized to fit the width and the height is what it is.
    let size = rows * 0.46;
    const fit = (s: number) => {
      lx.font = `${o.italic ? "italic " : ""}${WEIGHT} ${s}px ${o.fontFamily}`;
      return lx.measureText(text).width;
    };
    // Well inside the frame. The word used to run nearly edge to edge, which
    // left the poster no ground to be a poster — the surface texture and the
    // drop shadow both need open colour around the type to read at all.
    const maxW = (cols - pad * 2) * 0.72;
    if (fit(size) > maxW) size *= maxW / fit(size);
    lx.font = `${o.italic ? "italic " : ""}${WEIGHT} ${size}px ${o.fontFamily}`;
    lx.fillStyle = "#fff";
    lx.textAlign = "center";
    lx.textBaseline = "middle";
    lx.fillText(text, cols / 2, rows * 0.5);
  }

  // ── 2. hard-quantise to a boolean grid ────────────────────────────────────
  // The rasteriser antialiases; the source has no grey at all. Cut at 50% so a
  // cell is either ink or it is not, which is what makes the dilate below
  // produce clean square growth.
  const src = lx.getImageData(0, 0, cols, rows).data;
  const face = new Uint8Array(cols * rows);
  for (let i = 0, c = 0; i < src.length; i += 4, c++) {
    face[c] = src[i + 3] > 127 ? 1 : 0;
  }

  // ── 3. the two strokes, grown in CELLS ────────────────────────────────────
  const halo = dilate(face, cols, rows, o.halo);
  // The keyline is dilated FIRST and shifted after, not the other way round:
  // shifting the source and then growing it would spread the shadow evenly
  // around the moved shape, which is the same symmetric ring again just in the
  // wrong place. Growing then translating keeps the band tight to the letter and
  // puts all of the extra weight on one side, which is what a cast shadow does.
  const keyGrown = dilate(face, cols, rows, o.keyline);
  const [odx, ody] = o.keylineOffset;
  const key =
    odx === 0 && ody === 0
      ? keyGrown
      : (() => {
          const out = new Uint8Array(cols * rows);
          for (let y = 0; y < rows; y++) {
            const sy = y - ody;
            if (sy < 0 || sy >= rows) continue;
            for (let x = 0; x < cols; x++) {
              const sx = x - odx;
              if (sx < 0 || sx >= cols) continue;
              out[y * cols + x] = keyGrown[sy * cols + sx];
            }
          }
          // The letter must still be fully enclosed: a pure translation leaves
          // the trailing edge bare, so the shadow reads as a shape sitting
          // BESIDE the letter rather than behind it. Union with the unshifted
          // grow so the keyline still rings the glyph, just heavier on one side.
          for (let i = 0; i < out.length; i++) if (keyGrown[i]) out[i] = 1;
          return out;
        })();

  // ── 4. pack and scale up with NO smoothing ────────────────────────────────
  // imageSmoothingEnabled = false is the entire reason this stays blocky: with
  // it on the browser bilinearly interpolates and hands back exactly the soft
  // ramp the effect is trying to avoid.
  const packLow = document.createElement("canvas");
  packLow.width = cols;
  packLow.height = rows;
  const px = packLow.getContext("2d")!;
  const img = px.createImageData(cols, rows);
  for (let c = 0; c < cols * rows; c++) {
    img.data[c * 4] = face[c] ? 255 : 0;
    img.data[c * 4 + 1] = halo[c] ? 255 : 0;
    img.data[c * 4 + 2] = key[c] ? 255 : 0;
    img.data[c * 4 + 3] = 255;
  }
  px.putImageData(img, 0, 0);

  const out = document.createElement("canvas");
  out.width = W;
  out.height = H;
  const ox = out.getContext("2d")!;
  ox.imageSmoothingEnabled = false;
  ox.drawImage(packLow, 0, 0, W, H);
  return out;
}

```

### arcade/shaders.ts
```ts
// Arcade pixel type — the shader.
//
// The geometry is already decided by the time we get here: the mask carries the
// letter face, the white halo and the black keyline as three channels, all
// quantised on the same low-res grid (see text-mask.ts). This pass paints them,
// then puts the poster's surface on top.
//
// WHAT THE SOURCE PSD ACTUALLY CONTAINS, since two earlier builds got this wrong
// by reading the layer names instead of the pixels:
//
//   Background            solid #EB0809
//   Effect/Layer          the word, as a smart object that is ALREADY PIXELATED
//                         (a 150x39 bitmap scaled 25x, measured), carrying two
//                         outside strokes: 73px white, then 103px #1F1E1C
//   Effect/Threshold 150  in COLOR BURN — crushes the leftover antialiasing,
//                         it is NOT what makes the blocks
//   Textures/             two gradients, Noise (hard light 30%), Dust (screen
//                         20%), Noise (linear light 70%)
//
// THE TEXTURES ARE REAL IMAGES, NOT PROCEDURAL NOISE, and this is worth stating
// because generating them was the obvious shortcut and it looks nothing like the
// source. Pulling the actual layer pixels out of the PSD:
//   - the "Noise" on HARD LIGHT is a MOIRE INTERFERENCE PATTERN — two curved
//     line gratings beating against each other (measured: ~28.5px at ~28deg and
//     ~41px at ~4deg, and the angle swings across the frame, so the gratings are
//     genuinely curved rather than straight). It is the thing that gives the
//     flat ground its woven, screen-printed shimmer.
//   - the "Noise" on LINEAR LIGHT is fine per-pixel monochrome grain.
//   - "Dust" on SCREEN is sparse bright specks (mean 9/255).
// The moire in particular cannot be faked with a hash: it is structured, and a
// random field in its place reads as television static, which is exactly how the
// first build looked.
//   Settings/             Vibrance +20, Levels in 5..230 gamma 1.00
//
// The two things worth keeping in mind: the ground SURVIVES (the threshold sits
// on a smart object only as big as the word, so there is nothing to burn out on
// the open poster — burning the whole frame drives every pixel to black), and
// the blocks come from RESOLUTION, never from thresholding a blur.

export const FULL_VERT = `
attribute vec2 aPosition;
varying vec2 vUv;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

export const ARCADE_FRAG = `
// highp requested, but plenty of mobile GPUs quietly hand back mediump in the
// fragment stage. Every hash folds its input into a small range first, so the
// texture survives on a phone instead of collapsing into flat bands.
precision highp float;

varying vec2 vUv;

uniform sampler2D uField;       // R = face, G = white halo, B = black keyline
uniform vec2  uResolution;
uniform float uAspect;
uniform float uTime;

uniform sampler2D uMoire;   // the real moire interference plate, tiled
uniform sampler2D uGrain;   // the real fine-grain plate
uniform sampler2D uDust;    // the real dust specks, tiled
uniform float uTexture;     // surface strength
uniform float uSeparation;  // per-channel moire offset — print misregistration
uniform vec2  uCursor;      // pointer in uv
uniform float uCursorOn;    // eased presence, 0..1
uniform float uSwim;        // S3: cursor-driven counter-rotation of the moire
uniform float uParallax;    // how far the plates drift toward the pointer, in uv
uniform float uPull;        // magnetism: how hard the whole word leans in
uniform vec2  uMoireScale;  // how many times the plate tiles across the card
uniform vec2  uGrainScale;
uniform vec2  uDustScale;
uniform float uThreshold;   // the source's Threshold, as a crush on the ground

uniform vec3  uGround;
uniform vec3  uInk;
uniform vec3  uPaper;
uniform vec3  uFringe;

uniform vec2  uLevels;      // input black / white points
uniform float uVibrance;

// Still needed for the final dither only — the surface itself is now sampled
// from the real PSD plates rather than generated.
float hash(vec2 p){
  p = mod(p, 137.0);
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}
// ── Photoshop blend modes, written out exactly ──────────────────────────────
// Not approximated with a mix(): these curves are the difference between
// "looks a bit like the reference" and "is the reference".
float hardLight(float base, float blend){
  return blend < 0.5
    ? 2.0 * base * blend
    : 1.0 - 2.0 * (1.0 - base) * (1.0 - blend);
}
float linearLight(float base, float blend){
  return clamp(base + 2.0 * blend - 1.0, 0.0, 1.0);
}

// Levels with gamma 1.0 — the source has no midtone shift, so this is a pure
// contrast crush and there is no pow() to pay for.
vec3 levels(vec3 c, float lo, float hi){
  return clamp((c - lo) / max(hi - lo, 0.0001), 0.0, 1.0);
}

// Vibrance, not saturation: it lifts muted channels far harder than saturated
// ones, so a hot ground gains almost nothing while the fringe gains a lot. Plain
// saturation clips the ground to a flat primary and kills the printed quality.
vec3 vibrance(vec3 c, float amt){
  float mx = max(c.r, max(c.g, c.b));
  float mn = min(c.r, min(c.g, c.b));
  float sat = mx - mn;
  float lum = dot(c, vec3(0.2126, 0.7152, 0.0722));
  return mix(vec3(lum), c, 1.0 + amt * (1.0 - sat));
}

void main() {
  vec2 uv = vUv;
  vec2 p = uv * vec2(uAspect, 1.0);

  // ── PARALLAX ──────────────────────────────────────────────────────────────
  // The three plates drift toward the pointer at DIFFERENT rates, so the letter,
  // its white halo and its shadow separate slightly and the type reads as a
  // stack of layers rather than one flat print.
  //
  // THE UV IS SHIFTED, THE MASK IS NOT REBUILT, and that distinction is the
  // whole reason this can be smooth. The letters live on a fixed lattice, so
  // moving them WITHIN the grid means either resampling the block edges
  // (soft, shimmering staircase) or snapping in whole 9px cells (a visible
  // lurch). Sliding the sample point instead moves the entire rasterised plate
  // as one rigid sheet: every block keeps the exact shape it was built with, and
  // the motion is free of the grid because nothing is re-quantised.
  //
  // Tiny on purpose — a couple of pixels at most. Enough that the layers breathe
  // when you move; small enough that the poster never looks like it is sliding.
  // MAGNETISM. The word as a whole leans toward the pointer, strongest when the
  // cursor is near it and relaxing as you move away — so it reads as attraction
  // rather than as the card tracking your mouse everywhere.
  //
  // Measured from the FRAME CENTRE, not per pixel: a per-pixel pull would warp
  // the letterforms (near cells dragged further than far ones), and warping is
  // the one thing a lattice cannot survive. One vector for the whole plate keeps
  // every block rigid and just moves the sheet.
  vec2 fromMid = uCursor - vec2(0.5, 0.5);
  float grip = 1.0 - smoothstep(0.0, 0.75, length(fromMid * vec2(uAspect, 1.0)));
  vec2 pull = fromMid * uPull * grip * uCursorOn;

  vec2 toCur = (uCursor - uv) * uCursorOn * uParallax + pull;
  // The shadow moves most, the face least: the further a layer is from the
  // surface, the more a viewpoint change should shift it.
  float face = texture2D(uField, uv - toCur * 0.35).r;
  float halo = texture2D(uField, uv - toCur * 0.70).g;
  float key  = texture2D(uField, uv - toCur * 1.00).b;

  // ── THE GROUND SURVIVES ───────────────────────────────────────────────────
  vec3 col = uGround;

  // ── THE THRESHOLD, doing its real job ─────────────────────────────────────
  // In the source this is a Threshold 150 in color burn, and it only deepens the
  // ground where the print is already dark — it does not create the letterforms.
  // Modelled as a mild darkening of the ground's own shadows.
  float lum = dot(col, vec3(0.2126, 0.7152, 0.0722));
  col *= mix(1.0, 0.86, smoothstep(uThreshold, uThreshold - 0.35, lum));

  // ── THE LETTERS, painted back to front ────────────────────────────────────
  // Widest first, exactly as the two stroke effects stack: the black keyline is
  // 103px where the white halo is 73px, so the black shows as a band beyond the
  // white rather than sitting under it.
  col = mix(col, uInk, key);
  col = mix(col, uPaper, halo);
  col = mix(col, uInk, face);

  // ── THE SURFACE, OVER EVERYTHING ──────────────────────────────────────────
  // The three real texture layers from the PSD, in their own blend modes.
  //
  // THIS RUNS AFTER THE LETTERS, and the order is not a detail. In the source
  // the Textures group sits ABOVE the Effect group, so the surface falls across
  // the whole poster — the white halo and the black keyline included. Applying
  // it to the ground and then painting clean type on top leaves the letters
  // looking like flat vector laid on a printed background, and the most obvious
  // tell in the reference is that the white faces are just as printed as the red.
  //
  // The plates are sampled at a scale that keeps the moire's measured pitch
  // (~28px at 4500 wide, so ~0.6% of the width) rather than stretching the image
  // to fit — stretch it and the interference pattern changes frequency, which is
  // the one property that makes it read as moire at all.
  // ── S3 — THE MOIRE SWIMS ──────────────────────────────────────────────────
  // The plate is TWO curved gratings beating against each other, and that is
  // what makes this worth doing: interference is enormously sensitive to the
  // angle between its gratings. Sampling the plate a second time, rotated by a
  // fraction of a degree around the cursor, and taking the darker of the two
  // shifts the beat pattern across the whole surface. A rotation far too small
  // to see as a rotation produces a visible change in where the bands land.
  //
  // Rotating the WHOLE surface instead would just spin the texture, which reads
  // as the poster turning. Beating two nearly-identical samples is what makes
  // the pattern itself move while the print stays put.
  vec2 mUV = uv * uMoireScale;
  vec2 dUV = uv * uDustScale;

  float swimD = length((uv - uCursor) * vec2(uAspect, 1.0));
  // Falls off with distance, so the surface churns under your hand and is still
  // out at the edges — a local disturbance rather than a global animation.
  // A TIGHT falloff. At 0.55 the disturbance covered most of the card, which is
  // what made it read as a shape following the cursor rather than as the surface
  // reacting where you touch it.
  float swimAmt = smoothstep(0.22, 0.0, swimD) * uCursorOn * uSwim;
  float a = swimAmt * 0.055;                       // radians: ~3 degrees at most
  float cs = cos(a), sn = sin(a);
  vec2 about = uCursor * uMoireScale;
  vec2 rel = mUV - about;
  vec2 mUV2 = about + vec2(rel.x * cs - rel.y * sn, rel.x * sn + rel.y * cs);
  // ── COLOUR SEPARATION ─────────────────────────────────────────────────────
  // The moire sampled three times, one per channel, each offset by a fraction of
  // a tile along the stripe direction. A print out of register — and because the
  // offset is tied to the plate rather than the screen, the fringe rides the
  // interference pattern instead of floating over it.
  //
  // Small: at more than a texel or two this stops reading as registration drift
  // and starts reading as a 3D-glasses effect.
  vec2 sep = vec2(0.0022, 0.0009) * uSeparation;
  // BLEND BETWEEN THE TWO SAMPLES — DO NOT take min() of them.
  //
  // min() was the first attempt, on the reasoning that two overlaid physical
  // screens both block light. That reasoning is wrong in a way that is obvious
  // in hindsight: the minimum of two draws from the same distribution is
  // systematically DARKER than either draw (about 0.05 lower for this plate), so
  // it does not merely move the interference, it drops the brightness of the
  // whole region. With a wide falloff that paints a large dark disc under the
  // pointer — a grey blob that has nothing to do with moire.
  //
  // Mixing keeps the mean exactly where it was. The rotated sample still shifts
  // where the bands fall, which is the entire effect, but the surface does not
  // get darker for being disturbed.
  float mA = texture2D(uMoire, mUV).r;
  float mB = texture2D(uMoire, mUV2).r;
  float moire = mix(mA, mB, swimAmt);
  vec3 moireRGB = vec3(
    mix(texture2D(uMoire, mUV + sep).r, texture2D(uMoire, mUV2 + sep).r, swimAmt),
    moire,
    mix(texture2D(uMoire, mUV - sep).r, texture2D(uMoire, mUV2 - sep).r, swimAmt)
  );
  // The fine grain is its OWN plate from the PSD (the linear-light layer), not a
  // resample of the moire. They are genuinely different images — one is
  // structured interference, the other is per-pixel noise — and standing one in
  // for the other was a shortcut that showed.
  float grain = texture2D(uGrain, uv * uGrainScale).r;
  float dust  = texture2D(uDust, dUV).r;

  float t = uTexture;
  // 1) the moire, HARD LIGHT. The PSD layer is 30% opacity, but that is 30% of a
  //    plate composited in Photoshop's own colour pipeline — here it sits over a
  //    fully saturated ground where a 30% mix only swings the value by ~0.07,
  //    which is on the edge of visible at 8-bit. Taken up to where the print
  //    actually reads.
  vec3 h1 = vec3(
    hardLight(col.r, moireRGB.r),
    hardLight(col.g, moireRGB.g),
    hardLight(col.b, moireRGB.b)
  );
  col = mix(col, h1, 0.72 * t);

  // 2) the fine grain, LINEAR LIGHT.
  vec3 l2 = vec3(linearLight(col.r, grain), linearLight(col.g, grain), linearLight(col.b, grain));
  col = mix(col, l2, 0.55 * t);

  // A SIGNED GRAIN on top, because both blend modes go nearly silent on white.
  // Hard light and linear light CLIP at 1.0, so on a white letter face every
  // value above 0.5 does nothing and the paper can only ever darken — the grain
  // lands about half as strong on the type as on the ground, which is the
  // opposite of the reference, where the white faces are the most obviously
  // printed part of the poster.
  col += (grain - 0.5) * 0.16 * t;
  col += (moire - 0.5) * 0.10 * t;

  // 3) the dust, SCREEN
  col = 1.0 - (1.0 - col) * (1.0 - dust * 0.45 * t);

  // ── EDGE FRINGE ───────────────────────────────────────────────────────────
  // The coloured speckle the source shows along the quantised boundary — a
  // registration artefact of the print. Confined to the band between the halo
  // and the face, so it clings to the block edges rather than dusting the frame.
  float rim = clamp(halo - face, 0.0, 1.0);
  float speck = step(0.62, hash(floor(p * uResolution.y * 0.6) + 3.0));
  col += uFringe * rim * speck * 0.22 * uTexture;

  // ── FINISH ────────────────────────────────────────────────────────────────
  col = levels(col, uLevels.x, uLevels.y);
  col = vibrance(col, uVibrance);
  col += (hash(uv * 1024.0 + fract(uTime)) - 0.5) * (1.5 / 255.0);

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

```

### arcade/engine.ts
```ts
"use client";

// Arcade pixel type — the engine.
//
// Framework-free WebGL1 class: owns the context, the mask upload, the rAF loop
// and the eased pointer. React never touches a uniform. Same shape as the chrome
// and chroma engines, and forked from their lifecycle: idle-deferred CPU build,
// pause offscreen, reveal-on-first-paint so the card never flashes an empty
// canvas.

import { mediaUrl } from "../../lib/video-sources";
import { ARCADE_FRAG, FULL_VERT } from "./shaders";
import { makeArcadeField } from "./text-mask";
import {
  COLORWAYS,
  DEFAULTS,
  FONT_CSS,
  LEVELS_IN,
  VIBRANCE,
  type ArcadeParams,
  type Colorway,
} from "./params";
import {
  SEQUENCE,
  cellsAt,
  nextPhase,
  phaseMs,
  type Phase,
} from "./cycle";

/** Flatten a colourway to 12 floats so two of them can be lerped as plain
 *  numbers rather than re-parsed every frame. */
function toFloats(c: Colorway): number[] {
  return [...c.ground, ...c.ink, ...c.paper, ...c.fringe];
}

const UNIFORMS = [
  "uField", "uResolution", "uAspect", "uTime",
  "uThreshold", "uTexture", "uMoire", "uGrain", "uDust", "uSeparation", "uCursor", "uCursorOn", "uSwim", "uParallax", "uPull",
  "uMoireScale", "uGrainScale", "uDustScale",
  "uGround", "uInk", "uPaper", "uFringe",
  "uLevels", "uVibrance",
] as const;

export class Arcade {
  private host: HTMLElement;
  private canvas: HTMLCanvasElement;
  private gl: WebGLRenderingContext | null = null;
  private prog: WebGLProgram | null = null;
  private loc: Record<string, WebGLUniformLocation | null> = {};
  private quad: WebGLBuffer | null = null;
  private tex: WebGLTexture | null = null;

  /** The two real texture plates lifted out of the PSD. */
  private moire: WebGLTexture | null = null;
  private grain: WebGLTexture | null = null;
  private dust: WebGLTexture | null = null;

  readonly params: ArcadeParams = { ...DEFAULTS };

  private w = 0;
  private h = 0;
  private dpr = 1;
  private fontFamily = `${FONT_CSS}, sans-serif`;

  /** The live colourway.
   *
   *  NOT crossfaded any more. The resolution collapse IS the transition, and a
   *  smooth colour fade running at the same time is a second transition fighting
   *  the first — you end up watching a wash instead of a collapse. The colour now
   *  switches instantly at the coarsest frame, where the field is a handful of
   *  huge squares and there is nothing legible for the change to interrupt. */
  private cur = toFloats(COLORWAYS[0]);

  /** The autonomous resolution cycle. Only the card runs it; the playground
   *  stays wherever you put the sliders. */
  /** Pointer in uv, its eased presence, and the eased shadow offset.
   *
   *  THE SHADOW IS EASED AS A FLOAT AND USED AS AN INTEGER. The keyline lives on
   *  the lattice, so its offset has to be whole cells or the shadow lands half a
   *  block out of register and the whole point of the grid is lost. But snapping
   *  the RAW pointer to cells makes the shadow jump the instant you cross a cell
   *  boundary, which reads as a glitch. Easing a float and rounding only at the
   *  moment of use gives a shadow that moves in clean whole-cell steps at a pace
   *  the eye reads as weight. */
  private cx = 0.5;
  private cy = 0.5;
  private on = 0;
  private onTarget = 0;
  private shX = 0;
  private shY = 0;

  private cycling = false;
  private phase: Phase = "hold";
  private phaseT = 0;
  private idx = 0;
  private wordIdx = 0;
  /** The cell count currently uploaded, so the frame loop only rebuilds the mask
   *  when the QUANTISED value actually changes. Tweening 150 -> 16 continuously
   *  would rebuild ~60x a second for maybe 40 visually distinct steps. */
  private builtCols = -1;
  /** The keyline offset actually baked into the current mask, in whole cells. */
  private liveShadow: [number, number] = [0, 0];

  private raf = 0;
  private running = false;
  private awake = false;
  private painted = false;
  private destroyed = false;
  private t0 = performance.now();
  private last = 0;

  private builtW = 0;
  private builtH = 0;
  private builtWord = "";
  private builtKey = "";
  private builtFont = "";
  private buildScheduled = 0;

  ok = false;

  constructor(host: HTMLElement, fontFamily?: string) {
    this.host = host;
    if (fontFamily) this.fontFamily = fontFamily;
    this.canvas = document.createElement("canvas");
    Object.assign(this.canvas.style, {
      position: "absolute",
      inset: "0",
      width: "100%",
      height: "100%",
      display: "block",
      opacity: "0",
    });
    host.appendChild(this.canvas);

    const gl = this.canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      premultipliedAlpha: false,
    });
    if (!gl) return;
    this.gl = gl;

    try {
      this.prog = this.build(FULL_VERT, ARCADE_FRAG);
    } catch {
      this.gl = null;
      return;
    }
    for (const u of UNIFORMS) {
      this.loc[u] = gl.getUniformLocation(this.prog, u);
    }

    this.quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.quad);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(this.prog, "aPosition");
    gl.useProgram(this.prog);
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    // The two real PSD plates. Served from /public in dev and R2 in prod via
    // mediaUrl(), the same as the grunge scans and the holo photo.
    this.loadPlate(mediaUrl("/vault/arcade-moire.webp"), "moire");
    this.loadPlate(mediaUrl("/vault/arcade-grain.webp"), "grain");
    this.loadPlate(mediaUrl("/vault/arcade-dust.webp"), "dust");

    this.resize();
    void this.buildFieldNow();

    this.canvas.addEventListener("pointermove", this.onMove);
    this.canvas.addEventListener("pointerleave", this.onLeave);

    this.ok = true;
  }

  /** Load one of the PSD plates and upload it as a REPEATing texture.
   *
   *  gl.REPEAT is the whole reason these are power-of-two-friendly and sampled
   *  by scale rather than stretched to the card: tiling preserves the moire's
   *  measured pitch, where fitting the image to the frame would change its
   *  frequency and stop it reading as interference. */
  private loadPlate(url: string, onto: "moire" | "grain" | "dust") {
    const gl = this.gl;
    if (!gl) return;
    const img = new Image();
    // R2 is a different origin, and an un-CORS'd image taints the context the
    // moment it is uploaded as a texture.
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (!this.gl || this.destroyed) return;
      // WEBGL1 REQUIRES POWER-OF-TWO FOR gl.REPEAT, and this is the trap that
      // silently blanked the whole surface once already: a NPOT texture with
      // REPEAT wrapping is INCOMPLETE, so texture2D() returns solid black with
      // no warning, no console error and no visible failure — the card just
      // renders a flat ground and looks like the texture "did not load".
      // The plates are exported 512x512 for exactly this reason; fall back to
      // CLAMP if one ever is not, so a bad asset degrades instead of vanishing.
      const pot = (n: number) => (n & (n - 1)) === 0;
      const repeatOk = pot(img.width) && pot(img.height);
      const t = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, t);
      const wrap = repeatOk ? gl.REPEAT : gl.CLAMP_TO_EDGE;
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrap);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrap);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      this[onto] = t;
      // The plates arrive after the first paint, so redraw once they land or the
      // card sits there flat until something else happens to wake it.
      if (!this.running) this.render();
    };
    img.src = url;
  }

  private build(vs: string, fs: string): WebGLProgram {
    const gl = this.gl!;
    const c = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(sh) || "compile failed");
      }
      return sh;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, c(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, c(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(prog) || "link failed");
    }
    return prog;
  }

  private onMove = (e: PointerEvent) => {
    const r = this.canvas.getBoundingClientRect();
    this.cx = (e.clientX - r.left) / r.width;
    this.cy = 1 - (e.clientY - r.top) / r.height; // uv origin is bottom-left
    this.onTarget = 1;
    this.wake();
  };

  private onLeave = () => {
    this.onTarget = 0;
    this.wake();
  };

  private wake() {
    if (this.awake && !this.running) this.start();
    else if (!this.running) this.render();
  }

  setParams(p: Partial<ArcadeParams>) {
    // The mask bakes the grid, the strokes and the slant, so any of those four
    // needs a rebuild; everything else is a pure uniform change.
    const rebuild =
      (p.word !== undefined && p.word !== this.params.word) ||
      (p.cols !== undefined && p.cols !== this.params.cols) ||
      (p.halo !== undefined && p.halo !== this.params.halo) ||
      (p.keyline !== undefined && p.keyline !== this.params.keyline) ||
      (p.keylineOffset !== undefined &&
        p.keylineOffset.join() !== this.params.keylineOffset.join()) ||
      (p.italic !== undefined && p.italic !== this.params.italic);
    Object.assign(this.params, p);
    if (p.colorway !== undefined) this.setColorway(p.colorway);
    // Only the word and the RAMP need a new mask — the ramp is baked into the
    // blur, so it is the one slider that cannot be a pure uniform change.
    if (rebuild) this.scheduleBuild();
    this.wake();
  }

  /** Switch colourway. Instant — see the note on `cur`. */
  setColorway(i: number) {
    const n = ((i % COLORWAYS.length) + COLORWAYS.length) % COLORWAYS.length;
    this.idx = n;
    this.params.colorway = n;
    this.cur = toFloats(COLORWAYS[n]);
    this.wake();
  }

  /** The gallery card runs the resolution cycle; the playground does not. */
  setCycling(on: boolean) {
    this.cycling = on;
    this.phase = "hold";
    this.phaseT = 0;
  }

  setFont(family: string) {
    if (family === this.fontFamily) return;
    this.fontFamily = family;
    this.scheduleBuild();
  }

  resize() {
    const r = this.host.getBoundingClientRect();
    this.dpr = Math.min(2, window.devicePixelRatio || 1);
    this.w = r.width;
    this.h = r.height;
    const cw = Math.max(1, Math.round(this.w * this.dpr));
    const ch = Math.max(1, Math.round(this.h * this.dpr));
    if (this.canvas.width !== cw || this.canvas.height !== ch) {
      this.canvas.width = cw;
      this.canvas.height = ch;
      this.gl?.viewport(0, 0, cw, ch);
      this.scheduleBuild();
    }
  }

  /** Everything the mask depends on, as one comparable string. */
  private paramKey(): string {
    const p = this.params;
    const sh = p.magnet ? this.liveShadow : p.keylineOffset;
    return `${p.word}|${p.cols}|${p.halo}|${p.keyline}|${sh.join(",")}|${p.italic}`;
  }

  private maskSize(): [number, number] {
    const MAX_W = 1600;
    const mw = Math.max(2, Math.min(MAX_W, Math.round(this.w * this.dpr)));
    const mh = Math.max(2, Math.round(mw * (this.h / Math.max(1, this.w))));
    return [mw, mh];
  }

  private scheduleBuild() {
    if (!this.gl || this.destroyed) return;
    const [mw, mh] = this.maskSize();
    if (
      mw === this.builtW &&
      mh === this.builtH &&
      this.params.word === this.builtWord &&
      this.builtKey === this.paramKey() &&
      this.fontFamily === this.builtFont
    ) {
      return;
    }
    if (this.buildScheduled) return;
    const run = () => {
      this.buildScheduled = 0;
      void this.buildFieldNow();
    };
    const ric = (
      window as unknown as {
        requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      }
    ).requestIdleCallback;
    this.buildScheduled = ric ? ric(run, { timeout: 200 }) : window.setTimeout(run, 0);
  }

  /** Rebuild + upload RIGHT NOW, skipping the idle defer and the dirty check.
   *
   *  The animation drives `cols` frame by frame, so it needs the mask to land in
   *  the same frame it asked for it. scheduleBuild() is still the right path for
   *  word/font/resize changes, where the work is genuinely deferrable and
   *  arriving a beat late costs nothing. */
  buildSync() {
    const gl = this.gl;
    if (!gl || this.destroyed) return;
    const [mw, mh] = this.maskSize();
    this.uploadMask(mw, mh);
  }

  /** Rasterise at the current params and hand the result to GL. */
  private uploadMask(mw: number, mh: number) {
    const gl = this.gl;
    if (!gl || this.destroyed) return;
    this.builtW = mw;
    this.builtH = mh;
    this.builtWord = this.params.word;
    this.builtKey = this.paramKey();
    this.builtFont = this.fontFamily;

    const art = makeArcadeField({
      word: this.params.word,
      cols: this.params.cols,
      halo: this.params.halo,
      keyline: this.params.keyline,
      keylineOffset: this.params.magnet
        ? this.liveShadow
        : this.params.keylineOffset,
      italic: this.params.italic,
      w: mw,
      h: mh,
      fontFamily: this.fontFamily,
    });
    if (!this.tex) this.tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, art);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
  }

  private async buildFieldNow() {
    const gl = this.gl;
    if (!gl || this.destroyed) return;
    if (this.buildScheduled) {
      const cic = (window as unknown as { cancelIdleCallback?: (id: number) => void })
        .cancelIdleCallback;
      if (cic) cic(this.buildScheduled);
      else window.clearTimeout(this.buildScheduled);
      this.buildScheduled = 0;
    }
    const [mw, mh] = this.maskSize();
    this.uploadMask(mw, mh);
    if (!this.running) this.render();
  }

  start() {
    if (!this.ok) return;
    this.awake = true;
    if (this.running) return;
    this.running = true;
    this.last = 0;
    this.resize();
    const loop = (now: number) => {
      if (!this.running) return;
      this.frame(now);
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }

  stop() {
    this.awake = false;
    this.pause();
  }

  private pause() {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  private frame(now: number) {
    const dt = this.last ? Math.min(64, now - this.last) : 16;
    this.last = now;

    this.on += (this.onTarget - this.on) * 0.12;
    this.stepMagnet();

    if (this.cycling) this.stepCycle(dt);

    this.render();
  }

  /**
   * C2 — THE MAGNETIC KEYLINE.
   *
   * The drop shadow follows the pointer, so the light source appears to track
   * your hand and the letters read as lifting off the poster. Only the shadow
   * moves: the face and the halo stay welded to the lattice, which is what keeps
   * this feeling like a light moving rather than the type sliding around.
   *
   * The offset is INVERTED — the shadow falls away from the cursor, because that
   * is where a light in front of the card would throw it.
   */
  private stepMagnet() {
    const p = this.params;
    if (!p.magnet) return;
    const reach = p.keylineOffset[0] + p.magnetReach;
    const tx = -(this.cx - 0.5) * 2 * reach * this.on;
    const ty = (this.cy - 0.5) * 2 * reach * this.on;
    this.shX += (tx - this.shX) * 0.14;
    this.shY += (ty - this.shY) * 0.14;

    // Round to whole cells only at the point of use, and only rebuild when the
    // integer actually changes — otherwise this would rasterise every frame to
    // move the shadow by a fraction of a block nobody can see.
    const base = p.keylineOffset;
    const nx = Math.round(base[0] + this.shX);
    const ny = Math.round(base[1] + this.shY);
    if (nx !== this.liveShadow[0] || ny !== this.liveShadow[1]) {
      this.liveShadow = [nx, ny];
      this.buildSync();
    }
  }

  /** Advance the resolution cycle and rebuild the mask when the grid changes. */
  private stepCycle(dt: number) {
    this.phaseT += dt;
    const dur = phaseMs(this.phase);

    if (this.phaseT >= dur) {
      this.phaseT = 0;
      const prev = this.phase;
      this.phase = nextPhase(this.phase);
      // THE SWAP HAPPENS AT THE BOTTOM. Between collapse and resolve the field
      // is ~16 cells across and completely illegible, so changing the word and
      // the colour here costs nothing visually — the new word simply resolves
      // out of the same squares the old one dissolved into.
      if (prev === "collapse") {
        this.wordIdx = (this.wordIdx + 1) % SEQUENCE.length;
        this.params.word = SEQUENCE[this.wordIdx];
        this.setColorway(this.idx + 1);
      }
    }

    const t = Math.min(1, this.phaseT / phaseMs(this.phase));
    const cols = cellsAt(this.phase, t);
    if (cols !== this.builtCols) {
      this.builtCols = cols;
      this.params.cols = cols;
      this.buildSync();
    }
  }

  renderStill() {
    this.resize();
    void this.buildFieldNow();

    this.canvas.addEventListener("pointermove", this.onMove);
    this.canvas.addEventListener("pointerleave", this.onLeave);
    this.render();
  }

  private render() {
    const gl = this.gl;
    if (!gl || !this.prog || !this.tex) return;
    const p = this.params;

    gl.useProgram(this.prog);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.tex);
    gl.uniform1i(this.loc.uField, 0);
    gl.uniform2f(this.loc.uResolution, this.canvas.width, this.canvas.height);
    gl.uniform1f(this.loc.uAspect, this.w / Math.max(1, this.h));
    gl.uniform1f(this.loc.uTime, (performance.now() - this.t0) / 1000);

    gl.uniform1f(this.loc.uThreshold, p.threshold);

    // ── PLATE SCALE ───────────────────────────────────────────────────────
    // How big the printed surface reads, and the number that has been wrong in
    // both directions already.
    //
    // Tiling the plate 7.5x across the card crushed its ~28px interference pitch
    // to ~1.1px on screen — sub-pixel, so it aliased to flat grey and the whole
    // poster looked like static. Showing it at 1:1 fixed that but left the
    // pattern fine enough to need looking for.
    //
    // The moire plate is now a 1024px crop taken at 1:1 from the source, so its
    // pitch is native. Showing ONE tile across a ~1344px card magnifies it only
    // ~1.3x and lands the pitch near 36px — big enough to read across the room
    // without the texel softness that magnifying a small plate would bring.
    const MOIRE_TILES = 1.0;
    const DUST_TILES = 0.85;
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, this.moire);
    gl.uniform1i(this.loc.uMoire, 1);
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, this.grain);
    gl.uniform1i(this.loc.uGrain, 2);
    gl.activeTexture(gl.TEXTURE3);
    gl.bindTexture(gl.TEXTURE_2D, this.dust);
    gl.uniform1i(this.loc.uDust, 3);
    // The plates are SQUARE, so scaling x by the aspect keeps them unstretched
    // on a 1344x620 card — a stretched moire shears into stripes and stops
    // reading as interference at all.
    const aspect = this.w / Math.max(1, this.h);
    gl.uniform2f(this.loc.uMoireScale, MOIRE_TILES * aspect, MOIRE_TILES);
    // The grain stays FINE. It is per-pixel noise, so unlike the moire it gains
    // nothing from being enlarged — blown up it stops being grain and becomes
    // blotches. Tiled hard so it keeps a tight, printed tooth.
    gl.uniform2f(this.loc.uGrainScale, aspect * 2.6, 2.6);
    gl.uniform2f(this.loc.uDustScale, DUST_TILES * aspect, DUST_TILES);

    gl.uniform1f(this.loc.uTexture, p.texture);
    gl.uniform1f(this.loc.uSeparation, p.separation);
    gl.uniform2f(this.loc.uCursor, this.cx, this.cy);
    gl.uniform1f(this.loc.uCursorOn, this.on);
    gl.uniform1f(this.loc.uSwim, p.swim);
    gl.uniform1f(this.loc.uParallax, p.parallax);
    gl.uniform1f(this.loc.uPull, p.pull);

    const c = this.cur;
    gl.uniform3f(this.loc.uGround, c[0], c[1], c[2]);
    gl.uniform3f(this.loc.uInk, c[3], c[4], c[5]);
    gl.uniform3f(this.loc.uPaper, c[6], c[7], c[8]);
    gl.uniform3f(this.loc.uFringe, c[9], c[10], c[11]);


    gl.uniform2f(this.loc.uLevels, LEVELS_IN[0], LEVELS_IN[1]);
    gl.uniform1f(this.loc.uVibrance, VIBRANCE);

    gl.drawArrays(gl.TRIANGLES, 0, 3);

    if (!this.painted) {
      this.painted = true;
      this.canvas.style.opacity = "1";
    }

    // Idle out once nothing is left to animate. The card is a static poster
    // between colourway changes, so there is no reason to hold a rAF open.
    // Idle out once nothing is left to animate. While cycling there always is,
    // so this only fires for a card that is parked and not being hovered.
    if (
      !this.awake &&
      !this.cycling &&
      Math.abs(this.on - this.onTarget) < 0.002
    ) {
      this.pause();
    }
  }

  destroy() {
    this.destroyed = true;
    if (this.buildScheduled) {
      const cic = (window as unknown as { cancelIdleCallback?: (id: number) => void })
        .cancelIdleCallback;
      if (cic) cic(this.buildScheduled);
      else window.clearTimeout(this.buildScheduled);
      this.buildScheduled = 0;
    }
    this.stop();
    this.canvas.removeEventListener("pointermove", this.onMove);
    this.canvas.removeEventListener("pointerleave", this.onLeave);
    const gl = this.gl;
    if (gl) {
      if (this.tex) gl.deleteTexture(this.tex);
      if (this.moire) gl.deleteTexture(this.moire);
      if (this.grain) gl.deleteTexture(this.grain);
      if (this.dust) gl.deleteTexture(this.dust);
      if (this.quad) gl.deleteBuffer(this.quad);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    }
    this.canvas.remove();
  }
}

```

### arcade/playground.tsx
```tsx
"use client";

// The playground: the same poster, with the two numbers that ARE the effect
// exposed as sliders.
//
// THRESHOLD and RAMP are the whole thing, and they are worth understanding as a
// pair. The ramp is the blur baked into the mask, so it decides how much room
// the edge has to cross the cut — that is the BLOCK SIZE. The threshold decides
// WHERE along that ramp the cut lands, so it slides the staircase in and out and
// the letters gain or lose weight in whole blocks. Neither is a "style" control:
// between them they are the effect.
//
// Everything else here (word, colourway, texture) is dressing on top, which is
// why they sit below the two that matter.

import { useCallback, useEffect, useRef, useState } from "react";
import { GhostButton, PG_PANEL, PG_PREVIEW, Slider } from "../swirl/controls";
import { SectionLabel } from "../section-label";
import { Arcade } from "./engine";
import { COLORWAYS, DEFAULTS, FONT_CSS, FONT_WEIGHT } from "./params";

export function ArcadePlayground() {
  const hostRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Arcade | null>(null);

  const [word, setWord] = useState(DEFAULTS.word);
  const [threshold, setThreshold] = useState(DEFAULTS.threshold);
  const [cols, setCols] = useState(DEFAULTS.cols);
  const [keyline, setKeyline] = useState(DEFAULTS.keyline);
  const [shadow, setShadow] = useState(DEFAULTS.keylineOffset[0]);
  const [separation, setSeparation] = useState(DEFAULTS.separation);
  const [swim, setSwim] = useState(DEFAULTS.swim);
  const [pull, setPull] = useState(DEFAULTS.pull);
  const [magnetReach, setMagnetReach] = useState(DEFAULTS.magnetReach);
  const [texture, setTexture] = useState(DEFAULTS.texture);
  const [colorway, setColorway] = useState(0);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let engine: Arcade | null = null;
    let onScreen = false;
    let hidden = false;
    let started = false;

    const sync = () => {
      if (!engine || reduced) return;
      if (onScreen && !hidden) engine.start();
      else engine.stop();
    };

    const resolveFamily = () => {
      const probe = document.createElement("span");
      probe.style.cssText = "position:absolute;visibility:hidden";
      probe.style.fontFamily = FONT_CSS;
      probe.textContent = "Ag";
      document.body.appendChild(probe);
      const fam = getComputedStyle(probe)
        .fontFamily.split(",")[0]
        .replace(/["']/g, "")
        .trim();
      probe.remove();
      return fam;
    };

    const startEngine = (family?: string) => {
      if (started || !hostRef.current) return;
      started = true;
      engine = new Arcade(host, family ? `"${family}", sans-serif` : undefined);
      engineRef.current = engine;
      if (!engine.ok) return;
      // NO auto-cycling here. The gallery card runs itself because it has to be
      // alive in a grid; a playground that changes colour under you while you
      // are dragging a slider is fighting the person using it.
      if (reduced) engine.renderStill();
      else sync();
    };

    const hasFontApi =
      typeof document !== "undefined" && "fonts" in document && !!document.fonts;
    const raf = requestAnimationFrame(() => {
      if (!hostRef.current) return;
      const fam = hasFontApi ? resolveFamily() : "";
      if (hasFontApi && fam) {
        const to = window.setTimeout(() => startEngine(fam), 350);
        const go = () => {
          window.clearTimeout(to);
          startEngine(fam);
        };
        document.fonts.load(`${FONT_WEIGHT} 1em "${fam}"`).then(go, go);
      } else {
        startEngine();
      }
    });

    const io = new IntersectionObserver(
      (es) => {
        onScreen = es[0]?.isIntersecting ?? false;
        sync();
      },
      { threshold: 0.2 },
    );
    io.observe(host);

    const onVis = () => {
      hidden = document.hidden;
      sync();
    };
    document.addEventListener("visibilitychange", onVis);

    let rt = 0;
    const onResize = () => {
      window.clearTimeout(rt);
      rt = window.setTimeout(() => engine?.resize(), 120);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", onResize);
      window.clearTimeout(rt);
      engine?.destroy();
      engineRef.current = null;
    };
  }, []);

  // Push params down as they change. The engine decides for itself which of
  // these need a new mask (word and ramp do; the rest are pure uniforms).
  useEffect(() => {
    engineRef.current?.setParams({
      word,
      threshold,
      cols,
      keyline,
      keylineOffset: [shadow, shadow],
      texture,
      separation,
      swim,
      pull,
      magnetReach,
    });
  }, [word, threshold, cols, keyline, shadow, texture, separation, swim, pull, magnetReach]);

  const remix = useCallback(() => {
    const next = (colorway + 1) % COLORWAYS.length;
    setColorway(next);
    engineRef.current?.setColorway(next);
  }, [colorway]);

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <SectionLabel action={<GhostButton onClick={remix}>Remix</GhostButton>}>
        Playground
      </SectionLabel>

      <div className="flex min-w-0 flex-col">
        <div ref={hostRef} className={`${PG_PREVIEW} relative aspect-video`} />

        <div className={PG_PANEL}>
          <label className="flex h-8 w-full items-center gap-3 rounded-lg border border-[var(--border-line)] bg-[var(--bg-page)] px-3 text-[12px] text-[var(--text-secondary)]">
            <span className="shrink-0">Word</span>
            <input
              value={word}
              onChange={(e) => setWord(e.target.value.slice(0, 14))}
              spellCheck={false}
              className="min-w-0 flex-1 bg-transparent text-right text-[var(--text-primary)] outline-none"
            />
          </label>

          <div className="flex h-8 w-full items-center rounded-lg border border-[var(--border-line)] bg-[var(--bg-page)] px-3 text-[12px] text-[var(--text-secondary)]">
            <span>Colourway</span>
            <span className="ml-auto text-[var(--text-primary)]">
              {COLORWAYS[colorway].name}
            </span>
          </div>

          {/* The two that matter. */}
          <Slider
            label="Threshold"
            value={threshold}
            min={0.25}
            max={0.85}
            step={0.005}
            onChange={setThreshold}
          />
          {/* The source's own grid is 150 cells across. */}
          <Slider
            label="Grid"
            value={cols}
            min={40}
            max={260}
            step={2}
            format={(v) => `${Math.round(v)} cells`}
            onChange={setCols}
          />
          <Slider
            label="Keyline"
            value={keyline}
            min={0}
            max={8}
            step={1}
            format={(v) => `${Math.round(v)} cells`}
            onChange={setKeyline}
          />
          <Slider
            label="Shadow"
            value={shadow}
            min={0}
            max={6}
            step={1}
            format={(v) => `${Math.round(v)} cells`}
            onChange={setShadow}
          />
          <Slider
            label="Magnet"
            value={magnetReach}
            min={0}
            max={7}
            step={1}
            format={(v) => `${Math.round(v)} cells`}
            onChange={setMagnetReach}
          />
          <Slider
            label="Pull"
            value={pull}
            min={0}
            max={0.04}
            step={0.002}
            format={(v) => v.toFixed(3)}
            onChange={setPull}
          />
          <Slider
            label="Swim"
            value={swim}
            min={0}
            max={2.5}
            step={0.1}
            onChange={setSwim}
          />
          <Slider
            label="Separation"
            value={separation}
            min={0}
            max={3}
            step={0.1}
            onChange={setSeparation}
          />
          <Slider
            label="Texture"
            value={texture}
            min={0}
            max={1.6}
            step={0.02}
            onChange={setTexture}
          />
        </div>
      </div>
    </div>
  );
}

```18:["$","div",null,{"className":"py-24","children":[["$","script",null,{"type":"application/ld+json","suppressHydrationWarning":true,"dangerouslySetInnerHTML":{"__html":"[{\"@context\":\"https://schema.org\",\"@type\":\"TechArticle\",\"headline\":\"Arcade pixel\",\"url\":\"https://arlan.me/vault/arcade-pixel\",\"image\":\"/vault/color-depth.svg\",\"datePublished\":\"Aug 8, 2026\",\"about\":\"Study\",\"keywords\":\"WebGL, Threshold, Type\",\"author\":{\"@type\":\"Person\",\"name\":\"Arlan Marat\",\"url\":\"https://arlan.me\"},\"isPartOf\":{\"@type\":\"CollectionPage\",\"name\":\"Vault\",\"url\":\"https://arlan.me/vault\"}},{\"@context\":\"https://schema.org\",\"@type\":\"BreadcrumbList\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Vault\",\"item\":\"https://arlan.me/vault\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Arcade pixel\",\"item\":\"https://arlan.me/vault/arcade-pixel\"}]}]"}}],["$","article",null,{"className":"flex min-w-0 flex-col gap-10 text-[15px] leading-[1.7]","children":[["$","header",null,{"style":{"viewTransitionName":"vault-detail-head"},"className":"flex items-center justify-between gap-4","children":[["$","h1",null,{"className":"font-semibold text-[var(--text-primary)]","children":"Arcade pixel"}],["$","$L22",null,{"href":"/vault"}]]}],[["$","$L23",null,{"moduleIds":[24068]}],"$L24"],false,["$","div",null,{"style":{"viewTransitionName":"vault-detail-body"},"className":"flex min-w-0 flex-col gap-14","children":[["$","div",null,{"className":"flex flex-col gap-3","children":[["$","p","0",{"className":"text-pretty text-[var(--text-primary)]","children":[["$","$1","0",{"children":"The letters look pixelated, but there is no pixel grid anywhere: the word is just drawn tiny and blown up, so every little pixel becomes a big square."}]]}],["$","p","1",{"className":"text-pretty text-[var(--text-primary)]","children":[["$","$1","0",{"children":"Type your own word below and drag the two sliders that make the whole thing work."}]]}]]}],["$","$L25",null,{"children":[["$","$L26",null,{"playground":"arcade"}],["$","section",null,{"className":"flex min-w-0 flex-col gap-3","children":[["$","header",null,{"className":"flex items-center justify-between gap-3 pb-2 border-b border-[var(--border-line)]","children":[["$","h2",null,{"className":"font-semibold text-[var(--text-primary)]","children":"Code"}],["$","$L27",null,{"text":"$28","label":"Copy prompt","hideIcon":true,"className":"inline-flex h-7 shrink-0 items-center self-start rounded-lg border border-[var(--border-line)] bg-[var(--bg-surface)] px-3 text-[12px] font-medium text-[var(--text-secondary)] transition-colors duration-150 ease-[var(--ease-out)] hover:bg-[var(--bg-hover)] hover:border-[var(--border-ring)] hover:text-[var(--text-primary)] active:scale-[0.98]"}]]}],"$L29"]}],"$L2a","$L2b"]}]]}],"$L2c"]}]]}]
