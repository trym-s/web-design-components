<!-- Verbatim "Copy prompt" payload from chroma-glow; includes the full source inline. -->

You are given the complete source for a self-contained web visual: "Chromatic glow".

What it is:
- I wanted light that blooms out soft and pulls the colors apart at the edges.
- The word gets blurred at a few sizes and added back together, so it glows for real. Then it splits into a warm copy and a cool copy that drift a little the opposite way, and that gap is the rainbow edge. Move over it and the split leans toward your cursor. Type your own word and pick the two colors below.

How to use this code:
- It is a React + TypeScript component tree (Next.js App Router) that renders to an HTML canvas; the entry point is the playground component.
- Drop the files into a project under the same relative paths, mount the playground component, and it runs as-is. No external assets beyond what's inline.
- To adapt it: change the resolved word/logo, the color controls, or the experiment parameters. Ask me to modify, explain, or port any part.

The full source follows, one file per block:

### chroma/params.ts
```ts
// Chromatic Glow presets + Remix. Each preset is its own colour world (a distinct
// background paired with a matching warm/cool/fringe palette). Remix keeps the RGB-split
// mechanic but rolls a fresh warm/cool pair, a matching background, and a split amount.

import { CHROMA_DEFAULTS, type ChromaParams } from "./engine";

export type ChromaPreset = { id: string; name: string; params: Partial<ChromaParams> };

// Each preset is its OWN world: a distinct background hue paired with a matching but
// unique glow palette (warm / cool / fringe) and its own split + bloom feel. No two share
// a background family. The first stays the default (the card renders it).
export const CHROMA_PRESETS: ChromaPreset[] = [
  {
    id: "peachsteel",
    name: "Peach / Steel",
    // soft PEACH vs. cool STEEL-BLUE, with a rose fringe, on a deep dusk-blue wall (a lifted
    // indigo, clearly a colour and not black). Editorial, unexpected — the default.
    params: { warm: [1.0, 0.66, 0.5], cool: [0.42, 0.6, 0.95], red: [1.0, 0.42, 0.6], split: 9.0, bloom: 1.62, core: 1.06, noise: 0.15, spectral: 0.6, bg: [0.11, 0.13, 0.2] },
  },
  {
    id: "chartviolet",
    name: "Chartreuse / Violet",
    // acid CHARTREUSE vs. deep VIOLET with an electric-blue fringe, on a rich PLUM wall
    // (clearly purple, not black) — a high-tension art-book combo, wide rainbow rim.
    params: { warm: [0.78, 0.95, 0.2], cool: [0.55, 0.3, 1.0], red: [0.3, 0.7, 1.0], split: 10.5, bloom: 1.52, core: 1.04, noise: 0.17, spectral: 0.85, bg: [0.15, 0.08, 0.19] },
  },
  {
    id: "pinkamber",
    name: "Hot Pink / Amber",
    // HOT PINK vs. warm AMBER (two warms held in tension by the split), gold fringe, on a
    // deep AUBERGINE wall (a lifted wine, reads as colour) — a neon-sign look that works.
    params: { warm: [1.0, 0.22, 0.62], cool: [1.0, 0.72, 0.24], red: [1.0, 0.5, 0.85], split: 8.0, bloom: 1.55, core: 1.05, noise: 0.16, spectral: 0.5, bg: [0.19, 0.08, 0.15] },
  },
  {
    id: "rustmint",
    name: "Rust / Mint",
    // burnt RUST vs. cool MINT with a teal fringe, on a deep PINE-GREEN wall (clearly green,
    // not black) — a muted, grown-up pairing (terracotta against seafoam), tight fringe.
    params: { warm: [0.92, 0.42, 0.22], cool: [0.5, 0.95, 0.78], red: [0.3, 0.85, 0.7], split: 7.5, bloom: 1.5, core: 1.02, noise: 0.13, spectral: 0.45, bg: [0.07, 0.16, 0.13] },
  },
  {
    id: "sandcobalt",
    name: "Sand / Cobalt",
    // LIGHT mode: warm SAND wall, dark word, a deep COBALT + rose split haze — a paper-and-
    // ink editorial feel with a cold shadow.
    params: { warm: [1.0, 0.55, 0.42], cool: [0.24, 0.36, 0.95], red: [0.95, 0.34, 0.5], split: 9.0, bloom: 1.5, core: 1.0, noise: 0.09, spectral: 0.6, bg: [0.95, 0.9, 0.8], invert: true },
  },
  {
    id: "blushsky",
    name: "Blush / Sky",
    // LIGHT mode: pale BLUSH wall, dark word, a SKY-BLUE + coral split haze — soft, airy,
    // a little vaporwave.
    params: { warm: [1.0, 0.44, 0.5], cool: [0.34, 0.72, 1.0], red: [0.6, 0.5, 1.0], split: 9.5, bloom: 1.52, core: 1.0, noise: 0.09, spectral: 0.7, bg: [0.97, 0.9, 0.92], invert: true },
  },
];

export function defaultChromaParams(): ChromaParams {
  return { ...CHROMA_DEFAULTS, ...CHROMA_PRESETS[0].params };
}

// The hero card cycles these funny words, each paired with its own colour world, joined
// by the chromatic glitch-slide. Words + palettes are index-matched (they loop together).
export const HERO_CYCLE: { word: string; params: Partial<ChromaParams> }[] = [
  { word: "boom", params: CHROMA_PRESETS[0].params },   // peach / steel
  { word: "poof", params: CHROMA_PRESETS[3].params },   // rust / mint
  { word: "zap",  params: CHROMA_PRESETS[1].params },   // chartreuse / violet
  { word: "pow",  params: CHROMA_PRESETS[2].params },   // hot pink / amber
  { word: "yeet", params: CHROMA_PRESETS[5].params },   // blush / sky (light)
  { word: "oof",  params: CHROMA_PRESETS[4].params },   // sand / cobalt (light)
];

// Silly sound-effect words the playground Remix rolls from.
export const SFX_WORDS = [
  "boom", "poop", "pow", "zap", "yeet", "oof", "bruh", "meep",
  "honk", "blip", "splat", "womp", "boing", "poof", "zoom", "womp",
];

// rgb 0..1 <-> #hex for the ColorControl (which speaks hex)
export const toHex = (c: [number, number, number]) =>
  "#" + c.map((v) => Math.round(Math.min(1, Math.max(0, v)) * 255).toString(16).padStart(2, "0")).join("");
export const fromHex = (h: string): [number, number, number] => {
  const n = h.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2) || "0", 16) / 255) as [number, number, number];
};

// A vivid, glowy random colour: a saturated hue lifted a little so it never reads dim
// on black. Returns rgb 0..1.
function vividHue(hue: number, lift = 0.15): [number, number, number] {
  const c = 1;
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
  const seg = [
    [c, x, 0], [x, c, 0], [0, c, x], [0, x, c], [x, 0, c], [c, 0, x],
  ][Math.floor(hue / 60) % 6];
  return [seg[0] * (1 - lift) + lift, seg[1] * (1 - lift) + lift, seg[2] * (1 - lift) + lift];
}

// A background tint that SUITS a glow palette: take the warm+cool average hue, keep a
// touch of that colour, but crush it very dark + low-saturation so it always reads as a
// deep neutral wall the glow can sit on (never a bright or clashing panel).
function suitedBg(warm: [number, number, number], cool: [number, number, number]): [number, number, number] {
  // Average the two glow colours, boost that hue's saturation, then set it to a low
  // (dark) value. The result is a clearly-tinted deep wall (navy / wine / plum / moss),
  // not a flat near-black — but still dark enough for the glow to read.
  const avg = [(warm[0] + cool[0]) / 2, (warm[1] + cool[1]) / 2, (warm[2] + cool[2]) / 2];
  const max = Math.max(avg[0], avg[1], avg[2], 0.001);
  const floor = 0.05; // darkest channel never goes fully black
  const peak = 0.17;  // brightest channel of the wall (keeps it dark)
  // normalize to push saturation up, then scale into [floor, peak]
  return [0, 1, 2].map((i) => floor + (avg[i] / max) * (peak - floor)) as unknown as [number, number, number];
}

// Remix: a fresh complementary warm/cool pair (opposite sides of the wheel), a random
// third fringe, a matching dark background, and varied split/bloom.
export function remixChromaParams(): Partial<ChromaParams> {
  const h = Math.random() * 360;
  const warm = vividHue(h);
  const cool = vividHue((h + 150 + Math.random() * 60) % 360);
  const red = vividHue((h + 40 + Math.random() * 40) % 360, 0.1);
  // ~1 in 3 remixes is a LIGHT-mode variant: a light wall (a pale tint of the palette
  // hue) with the word pressed in dark. Otherwise the usual dark wall + glowing word.
  const invert = Math.random() < 0.34;
  const bg = invert ? suitedLightBg(warm, cool) : suitedBg(warm, cool);
  return {
    word: SFX_WORDS[Math.floor(Math.random() * SFX_WORDS.length)], // a fresh silly word
    warm,
    cool,
    red,
    bg,
    invert,
    split: 4 + Math.random() * 8,   // 4 - 12 px
    bloom: 1.0 + Math.random() * 0.4,
    noise: 0.06 + Math.random() * 0.14,
    spectral: 0.3 + Math.random() * 0.6,  // varied rainbow-rim strength per remix
  };
}

// A LIGHT wall that suits the palette: a very pale tint of the average glow hue (mostly
// white, a hint of colour) so the dark pressed word + coloured fringe read cleanly.
function suitedLightBg(warm: [number, number, number], cool: [number, number, number]): [number, number, number] {
  const avg = [(warm[0] + cool[0]) / 2, (warm[1] + cool[1]) / 2, (warm[2] + cool[2]) / 2];
  const max = Math.max(avg[0], avg[1], avg[2], 0.001);
  // mostly white (~0.9), with ~8% of the normalized hue mixed in
  return [0, 1, 2].map((i) => 0.88 + (avg[i] / max) * 0.08) as unknown as [number, number, number];
}

```

### chroma/text-mask.ts
```ts
// Rasterizes ONE word into a white-on-transparent coverage mask for the chromatic
// glow. The shader treats the white silhouette as the glow SOURCE — it's the bright
// shape the bloom spreads out from. No blur here — the bloom is built on the GPU.

export async function makeWordMask(
  word: string,
  w: number,
  h: number,
  fontFamily: string,
): Promise<HTMLCanvasElement> {
  const W = Math.max(1, Math.round(w));
  const H = Math.max(1, Math.round(h));

  const out = document.createElement("canvas");
  out.width = W;
  out.height = H;
  const ctx = out.getContext("2d")!;
  ctx.clearRect(0, 0, W, H);

  const text = (word || "").trim();
  if (!text) return out;

  const cx = W / 2;
  const cy = H * 0.5;
  const maxW = W * 0.78; // leave room for the bloom + split to spread past the letters

  // A big, bold cap height; shrink to fit the width if the word is long.
  let size = H * 0.42;
  ctx.font = `800 ${size}px ${fontFamily}`;
  const measured = ctx.measureText(text).width;
  if (measured > maxW) {
    size *= maxW / measured;
    ctx.font = `800 ${size}px ${fontFamily}`;
  }

  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // A touch of letter spacing so the glow between letters breathes.
  const ls = size * 0.02;
  const chars = [...text];
  const widths = chars.map((c) => ctx.measureText(c).width);
  const total = widths.reduce((a, b) => a + b, 0) + ls * (chars.length - 1);
  let x = cx - total / 2;
  ctx.textAlign = "left";
  for (let i = 0; i < chars.length; i++) {
    ctx.fillText(chars[i], x, cy);
    x += widths[i] + ls;
  }
  return out;
}

```

### chroma/shaders.ts
```ts
// Chromatic Glow shaders (raw WebGL1). The look:
//   1. a white silhouette of the word = the glow source
//   2. a BLOOM = the sum of several Gaussian blurs at growing radii -> a tight core +
//      a huge soft halo
//   3. CHROMATIC ABERRATION = the bloom sampled a few times, each tinted (warm, cool,
//      and a third fringe) and offset a few px in a different direction -> a glowing RGB
//      split fringe
//   4. LO-FI NOISE grain over the top.
// The bloom is built as a downsample chain (progressively smaller framebuffers, each
// blurred cheaply and summed) — the standard real-time way to get a smooth wide halo.

// A full-screen triangle used by every pass.
export const FULL_VERT = `
attribute vec2 aPosition;
varying vec2 vUv;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

// ── BLUR pass ────────────────────────────────────────────────────────────────
// Separable 9-tap Gaussian. Run once horizontally, once vertically per chain level.
// uDir is (texelX, 0) or (0, texelY) scaled by the level's blur radius.
export const BLUR_FRAG = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uTex;
uniform vec2 uDir;   // per-tap step (texel * radius) along one axis

void main() {
  // 9-tap Gaussian weights (sigma ~ 2), normalized.
  float w0 = 0.2270270270;
  float w1 = 0.1945945946;
  float w2 = 0.1216216216;
  float w3 = 0.0540540541;
  float w4 = 0.0162162162;
  vec4 c = texture2D(uTex, vUv) * w0;
  c += texture2D(uTex, vUv + uDir * 1.0) * w1;
  c += texture2D(uTex, vUv - uDir * 1.0) * w1;
  c += texture2D(uTex, vUv + uDir * 2.0) * w2;
  c += texture2D(uTex, vUv - uDir * 2.0) * w2;
  c += texture2D(uTex, vUv + uDir * 3.0) * w3;
  c += texture2D(uTex, vUv - uDir * 3.0) * w3;
  c += texture2D(uTex, vUv + uDir * 4.0) * w4;
  c += texture2D(uTex, vUv - uDir * 4.0) * w4;
  gl_FragColor = c;
}
`;

// ── COMPOSITE pass ───────────────────────────────────────────────────────────
// Takes the crisp mask + up to 4 blurred bloom levels and builds the final image:
// the summed bloom, split into tinted channels each offset by uSplit, over black,
// with lo-fi noise grain and a soft vignette. Every knob is a uniform so the same
// shader drives the card and the playground.
export const COMPOSITE_FRAG = `
precision highp float;
varying vec2 vUv;

uniform sampler2D uMask;    // crisp white silhouette (the core)
uniform sampler2D uB0;      // bloom level 0 (tightest)
uniform sampler2D uB1;
uniform sampler2D uB2;
uniform sampler2D uB3;      // bloom level 3 (widest halo)
uniform vec2  uSplit;       // chromatic aberration offset (uv units), cursor/auto driven
uniform float uBloom;       // overall bloom gain
uniform vec3  uWarm;        // warm/yellow tint  (yellow/blue preset)
uniform vec3  uCool;        // cool/blue tint
uniform vec3  uRed;         // red/cyan fringe tint
uniform float uCore;        // brightness of the crisp white core
uniform vec3  uBg;          // background tint (dark wall, or light wall if inverted)
uniform float uInvert;      // 0 = dark wall + glowing word, 1 = light wall + dark press
uniform float uNoise;       // grain amount 0..1
uniform float uTime;        // for animated grain
uniform float uAspect;      // w/h, to keep the split + vignette round
uniform vec2  uResolution;
uniform float uSpectral;    // 0..1 how much true prism rainbow rides over the base split
uniform vec2  uCursor;      // pointer position in uv (0..1)
uniform float uCursorOn;    // 0..1 eased cursor presence over the card
uniform float uDisperse;    // 0..1 cycle transition: blooms the word out into a soft haze

// cheap hash noise for the lo-fi grain
float hash(vec2 p) {
  p = fract(p * vec2(123.34, 345.45));
  p += dot(p, p + 34.345);
  return fract(p.x * p.y);
}

// smooth value noise (bilinear-interpolated hash) — soft blotches, not per-pixel dither.
float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f); // smoothstep the cell
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

// a minimal but richer wall texture, centred around 0. Kept very subtle — just enough that
// the dark background reads as a soft, lit surface with depth instead of flat grain:
//   - 3-octave fbm gives gentle cloudy mottling (large soft blotches + a little fine break-up)
//   - a slow, large-scale diagonal drift so the surface feels hand-finished, not tiled
// The amplitude is low; the caller scales it down further. No hard edges, no obvious pattern.
float wallTex(vec2 uv, vec2 res) {
  vec2 p = uv * vec2(res.x / res.y, 1.0);        // square the domain so blotches aren't stretched
  float fbm =
      vnoise(p * 2.4) * 0.55 +
      vnoise(p * 5.1 + 11.0) * 0.30 +
      vnoise(p * 11.7 + 3.0) * 0.15;
  // a broad, slowly-varying sheen across the panel (one very low-freq octave), so one side
  // of the wall sits a touch lighter — a soft raking light rather than uniform fill.
  float sheen = vnoise(p * 0.9 + 5.0);
  return (fbm - 0.5) * 0.8 + (sheen - 0.5) * 0.5;
}

// the summed multi-radius bloom sampled at an offset (one "channel"). CONCENTRATED:
// the tight core levels carry most of the weight; the wide halo is only a faint skirt,
// so the glow hugs the letters instead of washing the whole card out.
float bloomAt(vec2 uv) {
  float b = 0.0;
  b += texture2D(uB0, uv).r * 0.85;  // tightest -> most of the glow
  b += texture2D(uB1, uv).r * 0.55;
  b += texture2D(uB2, uv).r * 0.22;
  b += texture2D(uB3, uv).r * 0.10;  // widest halo -> just a faint skirt
  return b;
}

// A palette-anchored spectral ramp: 0 = warm end, 1 = cool end, with the fringe tint
// as the midpoint. Instead of 3 hard tints this gives a smooth colour walk across the
// halo, so the split reads as a soft rainbow edge rather than a flat colour cast.
vec3 spectralTint(float u) {
  u = clamp(u, 0.0, 1.0);
  if (u < 0.5) return mix(uWarm, uRed, u * 2.0);
  return mix(uRed, uCool, (u - 0.5) * 2.0);
}

// TRUE prism dispersion, kept MINIMAL: the aberration grows with distance from the word
// centre (real glass fans outward), and we take a few taps across the spectrum along the
// split direction. Small radius + few taps => a refined rainbow rim, not a busy smear.
vec3 spectralFringe(vec2 uv, vec2 split) {
  // radial gain: ~1 near centre, a touch more toward the edges (clamped so it stays soft)
  vec2 fromC = (uv - 0.5) * vec2(uAspect, 1.0);
  float disp = 0.6 + 0.9 * clamp(length(fromC), 0.0, 1.0);
  vec2 step = split * disp;
  vec3 acc = vec3(0.0);
  // 5 evenly-spaced taps from -1 (warm) to +1 (cool); the fringe colour sits in the middle
  const int N = 5;
  for (int i = 0; i < N; i++) {
    float f = float(i) / float(N - 1);        // 0..1
    float off = (f - 0.5) * 2.0;              // -1..1
    float b = bloomAt(uv + step * off);
    acc += spectralTint(f) * b;
  }
  return acc / float(N);
}

void main() {
  // LIQUID-CHROME SHIMMER: a whisper-amplitude uv warp driven by slow noise, so the word
  // and its glow gently wobble like molten metal instead of a dead silhouette. The warp
  // is domain-distorted (noise of noise) for an organic, non-directional ripple and kept
  // extremely small (~0.15% of the frame) so it never smears the letters.
  vec2 uv = vUv;
  float wx = vnoise(uv * 4.0 + vec2(uTime * 0.13, uTime * 0.05));
  float wy = vnoise(uv * 4.0 + vec2(7.0 - uTime * 0.06, 3.0 + uTime * 0.11));
  uv += (vec2(wx, wy) - 0.5) * 0.0016;

  // ---- CYCLE DISPERSE & RE-FORM: the transition is made entirely of the effect's OWN
  // language — bloom + split — not a glitch. uDisperse (0 at rest, 1 at mid-swap) spreads
  // the chromatic split WIDE so the warm/cool copies pull far apart, melts the crisp core,
  // and lifts the bloom, so the old word blooms out into a soft coloured haze; at the peak
  // the word swaps under the cloud; then uDisperse falls and the new word condenses back
  // out of the light as the split collapses to rest. Smooth, glowy, in-style. ----
  vec2 s = uSplit;
  float disp = uDisperse;                         // 0..1 dispersion strength this frame
  // spread the split RADIALLY outward from centre (a prism blooming apart), plus a slow
  // swirl so the haze has a little organic drift rather than a pure zoom.
  vec2 fromMid = (uv - 0.5) * vec2(uAspect, 1.0);
  float rr = length(fromMid) + 0.0001;
  vec2 radial = fromMid / rr;
  float ang = uTime * 0.6;
  vec2 swirl = vec2(radial.x * cos(ang) - radial.y * sin(ang),
                    radial.x * sin(ang) + radial.y * cos(ang));
  // during dispersion the split grows (copies drift apart) and gains the radial/swirl
  // direction, so the word softens into a gentle rainbow haze instead of tearing. Kept
  // WEAK — the word stays put and just breathes, it never flies far out.
  s += mix(radial, swirl, 0.5) * disp * 0.022;
  s *= 1.0 + disp * 0.9;
  // no per-channel tear anymore — the split alone carries the whole transition.
  vec2 tearW = vec2(0.0), tearC = vec2(0.0), tearR = vec2(0.0);

  // CURSOR POOL: a soft aspect-correct falloff around the pointer. It does NOT move the
  // word — it just brightens the bloom + widens the rainbow locally, so the light lifts
  // where you hover and settles back when you leave. Gentle radius, eased by presence.
  vec2 cAsp = vec2(uAspect, 1.0);
  vec2 toCur = uv * cAsp - uCursor * cAsp;
  float cd = length(toCur);
  float pool = smoothstep(0.34, 0.0, cd) * uCursorOn;   // 1 at cursor -> 0 by ~0.34

  // HOVER LIFE: near the pointer the light behaves like a disturbed liquid, not just a
  // brighter spot. Two small touches, both fading out with the pool:
  //  1. a soft concentric RIPPLE pushes the sampled uv in/out radially around the cursor,
  //     so the glow ripples as if the pointer pressed into it.
  //  2. the split gains a component that leans ALONG the cursor->centre direction, so the
  //     rainbow tilts toward where you are (felt, but it never drags the whole word).
  if (pool > 0.001) {
    vec2 rdir = toCur / max(cd, 0.0001);
    float ripple = sin(cd * 46.0 - uTime * 5.0) * pool * 0.0022;
    uv += (rdir / cAsp) * ripple;
    s += (rdir / cAsp) * pool * 0.010;                  // split leans toward the cursor
  }

  // Chromatic aberration: sample the bloom three times, each pushed a different way, so
  // the tinted copies pull apart at the edges:
  //   warm  ->  +split
  //   cool  ->  -split
  //   fringe -> perpendicular split (a second, weaker fringe)
  // These are SCALAR intensities per channel, tinted then blended below.
  float bw = bloomAt(uv + s + tearW);
  float bc = bloomAt(uv - s + tearC);
  float br = bloomAt(uv + vec2(-s.y, s.x) * 0.6 + tearR);

  // Coloured glow, tone-mapped with a soft rolloff so the letter bodies don't clip to
  // flat white. 1 - exp(-x) saturates gently toward the tint's own colour. A small
  // amount of the TRUE spectral fringe (radial prism, multi-tap) is mixed into the raw
  // energy so the halo edge gains a soft rainbow without changing the overall colour.
  vec3 baseRaw = (uWarm * bw + uCool * bc + uRed * br);
  // near the cursor, widen the rainbow (more spectral) and lift the glow (more energy).
  // during dispersion gently widen the spectral rainbow + lift the bloom a touch, so the
  // word softly breathes rather than blowing into a big cloud. Kept weak.
  float specAmt = clamp(uSpectral + pool * 0.4 + disp * 0.25, 0.0, 1.0);
  vec3 raw = mix(baseRaw, spectralFringe(uv, s), specAmt * 0.55) * uBloom * (1.0 + pool * 0.9 + disp * 0.45);
  vec3 glow = vec3(1.0) - exp(-raw);
  // the crisp white core softens as the word disperses (loses its hard edge into the bloom)
  // but never fully vanishes, so it stays readable while it re-forms.
  float core = texture2D(uMask, uv).r * (1.0 - disp * 0.75);

  // shared: vignette + a minimal plaster grain so the wall reads as a real surface
  vec2 vc = (uv - 0.5) * vec2(uAspect, 1.0);
  float vig = smoothstep(1.05, 0.35, length(vc));
  float tex = wallTex(uv, uResolution);
  float g = hash(uv * uResolution * 0.5 + uTime);

  // LIVING WALL: a very slow caustic drift so the dark background breathes instead of
  // sitting dead. Two counter-scrolling low-freq noise fields beat against each other;
  // the result is tiny (a few % of the wall value) and tinted by the palette below.
  float ca = vnoise(uv * vec2(uAspect, 1.0) * 2.3 + vec2(uTime * 0.012, uTime * 0.008));
  float cb = vnoise(uv * vec2(uAspect, 1.0) * 3.7 - vec2(uTime * 0.009, uTime * 0.014));
  float caustic = (ca * cb - 0.25);   // centred-ish, mostly small

  // ---- DARK mode: dark wall + glowing word (additive) ----
  vec3 rimC = vec3(uCore) * smoothstep(0.35, 0.55, core) * (1.0 - smoothstep(0.6, 0.9, core));
  vec3 glowD = glow;
  glowD += rimC;
  glowD += (g - 0.5) * uNoise * (0.4 + 0.6 * length(glowD));
  glowD *= mix(0.82, 1.0, vig);
  // base wall + a soft mottle/sheen: multiply for the darker blotches, plus a gentle additive
  // lift on the bright side of the sheen so the surface has light on it (not only shadow).
  vec3 wallD = uBg * mix(0.82, 1.08, vig) * (1.0 + tex * 0.35) + uBg * max(tex, 0.0) * 0.25;
  // palette-tinted caustic light on the wall (stronger toward the darker outer field, so it
  // never fights the glow): the wall clearly shimmers in the word's own colours instead of
  // sitting as a flat near-black panel.
  vec3 causticTint = normalize(uWarm + uCool + 0.0001);
  wallD += causticTint * caustic * 0.09 * (1.0 - vig * 0.4);
  vec3 outD = wallD + glowD;

  // ---- LIGHT mode: dark word with the SAME soft bloom, as a dark tinted haze ----
  // This is dark mode's look inverted: the same soft multi-radius bloom (bw/bc/br) drives
  // everything, so the word carries the same blurry glow — but here it DARKENS the light
  // wall toward each split colour instead of adding light. Because we use the soft bloom
  // (not the crisp mask), the edges are soft + glowy, and the warm/cool offsets give the
  // coloured chromatic haze. A crisp dark core sits under it so the letters stay legible.
  vec3 wallL = uBg * mix(1.0, 0.94, 1.0 - vig);       // light wall, faintly darker at edges
  wallL += tex * 0.018;                               // faint mottle/sheen (subtle on paper)

  // the soft bloom, tinted + split, as a "darken amount" per channel (same tone-map as
  // dark mode). glowL is bright/coloured near the word, ~0 out on the wall.
  vec3 rawL = mix(baseRaw, spectralFringe(uv, s), specAmt * 0.55) * uBloom * (1.0 + pool * 0.9);
  vec3 glowL = vec3(1.0) - exp(-rawL);
  // darken the wall toward the COMPLEMENT of the glow colour, weighted by how strong the
  // glow is here -> a soft warm haze on one side, cool on the other, fading into the wall.
  vec3 pressed = wallL * (vec3(1.0) - glowL * 0.9);

  // a crisp dark core so the letters read solid (the soft bloom alone is too faint to be
  // legible as text). Uses the plain mask, pressed to near-black.
  float ink = smoothstep(0.4, 0.62, core);
  pressed *= mix(1.0, 0.1, ink);
  pressed += (g - 0.5) * uNoise * 0.4;                // grain
  vec3 outL = pressed;

  vec3 outc = mix(outD, outL, uInvert);
  gl_FragColor = vec4(outc, 1.0);
}
`;

```

### chroma/engine.ts
```ts
// Chromatic Glow engine (raw WebGL1). Renders ONE word as a bright chromatic bloom on
// a dark card. Pipeline per frame:
//   1. the word's white mask is the glow source (uploaded once)
//   2. BLOOM = a downsample chain: the mask is blurred + shrunk into 4 progressively
//      smaller framebuffers, each Gaussian-blurred (H then V). Small buffers = a huge,
//      smooth halo for almost no cost.
//   3. COMPOSITE = the 4 bloom levels sampled 3× with per-tint offsets (warm/cool/
//      fringe) -> the RGB chromatic-aberration fringe, + noise grain + vignette
// Motion: an autonomous drift starts on load and gently pushes the split + bloom; the
// cursor overrides it and intensifies the split when you move over the card.

import { FULL_VERT, BLUR_FRAG, COMPOSITE_FRAG } from "./shaders";
import { makeWordMask } from "./text-mask";

export type ChromaParams = {
  word: string;
  bloom: number;    // overall glow gain
  split: number;    // chromatic aberration distance (px @ 620h)
  core: number;     // crisp white core brightness
  noise: number;    // grain amount
  spectral: number; // 0..1 how much true prism rainbow rides over the base split
  warm: [number, number, number];
  cool: [number, number, number];
  red: [number, number, number];
  bg: [number, number, number]; // background tint (dark wall, or light wall if invert)
  invert: boolean;              // true = LIGHT wall + DARK pressed word (glow as fringe)
};

// Defaults: soft PEACH vs. cool STEEL-BLUE on a deep dusk-blue wall (the peach/steel world).
export const CHROMA_DEFAULTS: ChromaParams = {
  word: "chrome",
  bloom: 1.62,   // gain into the tone-map (1 - exp(-x)); high enough to read, can't clip
  split: 9.0,
  core: 1.06,    // thin rim brightness only (not a full white fill anymore)
  noise: 0.15,
  spectral: 0.6, // a soft real-rainbow rim rides over the warm/cool split

  warm: [1.0, 0.66, 0.5],   // soft peach
  cool: [0.42, 0.6, 0.95],  // steel blue
  red: [1.0, 0.42, 0.6],    // rose fringe
  bg: [0.11, 0.13, 0.2],    // deep dusk-blue wall (a lifted indigo, clearly a colour)
  invert: false,
};

// The downsample chain: each level is a fraction of the canvas, with a blur radius (in
// its own texels). Growing scale-down + radius reproduces the 5/25/50/80/190px ladder.
const LEVELS = [
  { scale: 0.5, radius: 1.5 },
  { scale: 0.25, radius: 2.0 },
  { scale: 0.125, radius: 2.5 },
  { scale: 0.0625, radius: 3.0 },
];

type Target = { fb: WebGLFramebuffer; tex: WebGLTexture; w: number; h: number };

export class ChromaGlow {
  private host: HTMLElement;
  private canvas: HTMLCanvasElement;
  private gl: WebGLRenderingContext | null = null;

  private blurProg: WebGLProgram | null = null;
  private compProg: WebGLProgram | null = null;
  private quad: WebGLBuffer | null = null;
  private blurLoc: Record<string, WebGLUniformLocation | null> = {};
  private compLoc: Record<string, WebGLUniformLocation | null> = {};

  private mask: WebGLTexture | null = null;
  private maskW = 1;
  private maskH = 1;
  // per level: the bloom target + a scratch target for the separable blur
  private levels: { out: Target; tmp: Target }[] = [];

  private raf = 0;
  private running = false;
  private awake = false;
  private startT = 0;

  private w = 0;
  private h = 0;
  private dpr = 1;
  private fontFamily = "var(--font-neue-corp), sans-serif";
  private params: ChromaParams;

  // rebuild guards (mask is the only expensive CPU step)
  private builtW = 0;
  private builtH = 0;
  private builtWord = "";
  private builtFont = "";
  private buildScheduled = 0;
  private destroyed = false;
  private painted = false;

  // motion: eased split target (cursor) + autonomous flick + hover intensity
  private px = 0;       // pointer x in -1..1 from center
  private py = 0;
  private tpx = 0;
  private tpy = 0;
  private active = 0;   // eased 0..1, 1 while cursor over the card
  private tActive = 0;
  // autonomous motion: a smoothly-followed position that wanders the word fast on a few
  // layered sines (the LEGO virtual-cursor style), non-circular + non-linear. fx/fy.
  private fx = 0;
  private fy = 0;

  // ---- cycle mode: the hero card walks a list of funny words + colour worlds, joined by
  // a chromatic glitch-slide. Off by default (the playground never cycles). ----
  private cycle = false;
  private cycleWords: string[] = [];
  private cyclePalettes: Partial<ChromaParams>[] = [];
  private cycleIdx = 0;
  private cyclePhase: "hold" | "out" | "in" = "hold";
  private cyclePhaseT = 0;      // seconds into the current phase
  private holdDur = 1.15;       // seconds a word rests before the next transition
  private outDur = 0.24;        // bloom out into haze
  private inDur = 0.32;         // condense back into the new word
  private disperse = 0;         // 0..1 transition dispersion (bloom-out), driven by phase
  private nextPending = false;  // set at the out->in swap point
  private lastNow = 0;          // for real-dt cycle stepping
  // palette tween: we lerp the colour uniforms from `palFrom` to `palTo` across a swap so
  // the world changes smoothly under the glitch instead of popping.
  private palFrom: Partial<ChromaParams> | null = null;
  private palTo: Partial<ChromaParams> | null = null;
  private palMix = 1;           // 0..1, eased across the transition

  ok = false;

  constructor(host: HTMLElement, params?: Partial<ChromaParams>) {
    this.host = host;
    this.params = { ...CHROMA_DEFAULTS, ...params };
    this.canvas = document.createElement("canvas");
    Object.assign(this.canvas.style, {
      position: "absolute",
      inset: "0",
      width: "100%",
      height: "100%",
      display: "block",
      // Hidden until the first real frame so the dark host shows (and gets captured by
      // the view-transition) instead of an undrawn black canvas flashing.
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
      this.blurProg = this.build(FULL_VERT, BLUR_FRAG);
      this.compProg = this.build(FULL_VERT, COMPOSITE_FRAG);
    } catch {
      this.gl = null;
      return;
    }

    for (const u of ["uTex", "uDir"]) {
      this.blurLoc[u] = gl.getUniformLocation(this.blurProg, u);
    }
    for (const u of [
      "uMask", "uB0", "uB1", "uB2", "uB3", "uSplit", "uBloom", "uWarm", "uCool",
      "uRed", "uCore", "uBg", "uInvert", "uNoise", "uTime", "uAspect", "uResolution",
      "uSpectral", "uCursor", "uCursorOn", "uDisperse",
    ]) {
      this.compLoc[u] = gl.getUniformLocation(this.compProg, u);
    }

    // full-screen triangle
    this.quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

    // clear to the current bg tint so any pre-composite frame matches the wall (no flash)
    gl.clearColor(this.params.bg[0], this.params.bg[1], this.params.bg[2], 1);

    this.resize();
    void this.buildMaskNow();

    this.canvas.addEventListener("pointermove", this.onMove);
    this.canvas.addEventListener("pointerenter", this.onEnter);
    this.canvas.addEventListener("pointerleave", this.onLeave);
    this.ok = true;
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

  private makeTarget(w: number, h: number): Target {
    const gl = this.gl!;
    const tex = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    const fb = gl.createFramebuffer()!;
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    return { fb, tex, w, h };
  }

  private allocLevels() {
    const gl = this.gl;
    if (!gl) return;
    this.freeLevels();
    const cw = this.canvas.width;
    const ch = this.canvas.height;
    this.levels = LEVELS.map((l) => {
      const w = Math.max(2, Math.round(cw * l.scale));
      const h = Math.max(2, Math.round(ch * l.scale));
      return { out: this.makeTarget(w, h), tmp: this.makeTarget(w, h) };
    });
  }

  private freeLevels() {
    const gl = this.gl;
    if (!gl) return;
    for (const lv of this.levels) {
      gl.deleteFramebuffer(lv.out.fb);
      gl.deleteTexture(lv.out.tex);
      gl.deleteFramebuffer(lv.tmp.fb);
      gl.deleteTexture(lv.tmp.tex);
    }
    this.levels = [];
  }

  setFont(family: string) {
    if (family === this.fontFamily) return;
    this.fontFamily = family;
    this.scheduleBuild();
  }

  setParams(p: Partial<ChromaParams>) {
    const wordChanged = p.word !== undefined && p.word !== this.params.word;
    this.params = { ...this.params, ...p };
    if (wordChanged) this.scheduleBuild();
    else if (!this.running) this.renderOnce();
  }

  /**
   * Turn on hero cycle mode: walk `words` paired with `palettes` (a colour world each),
   * swapping every few seconds with a chromatic glitch-slide. The first pair is applied
   * immediately. The playground never calls this, so it stays a single static word.
   */
  enableCycle(words: string[], palettes: Partial<ChromaParams>[]) {
    if (!words.length) return;
    this.cycle = true;
    this.cycleWords = words;
    this.cyclePalettes = palettes;
    this.cycleIdx = 0;
    this.cyclePhase = "hold";
    this.cyclePhaseT = 0;
    this.palMix = 1;
    this.palFrom = palettes[0] ?? null;
    this.palTo = palettes[0] ?? null;
    this.params = { ...this.params, word: words[0], ...(palettes[0] ?? {}) };
    this.scheduleBuild();
  }

  // lerp helpers for the palette tween
  private lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
  private lerp3(
    a: [number, number, number], b: [number, number, number], t: number,
  ): [number, number, number] {
    return [this.lerp(a[0], b[0], t), this.lerp(a[1], b[1], t), this.lerp(a[2], b[2], t)];
  }

  // Resolve the currently-displayed palette by easing palFrom -> palTo by palMix. Falls
  // back to the live params for any field a palette omits.
  private tweenedPalette(): ChromaParams {
    const base = this.params;
    if (!this.palFrom || !this.palTo || this.palMix >= 1) {
      const to = this.palTo ?? {};
      return { ...base, ...to };
    }
    const f = { ...base, ...this.palFrom };
    const g = { ...base, ...this.palTo };
    const t = this.palMix;
    return {
      ...base,
      warm: this.lerp3(f.warm, g.warm, t),
      cool: this.lerp3(f.cool, g.cool, t),
      red: this.lerp3(f.red, g.red, t),
      bg: this.lerp3(f.bg, g.bg, t),
      split: this.lerp(f.split, g.split, t),
      bloom: this.lerp(f.bloom, g.bloom, t),
      core: this.lerp(f.core, g.core, t),
      noise: this.lerp(f.noise, g.noise, t),
      spectral: this.lerp(f.spectral, g.spectral, t),
      // invert can't tween; switch it at the midpoint (when the glitch hides the pop)
      invert: t < 0.5 ? f.invert : g.invert,
    };
  }

  private onMove = (e: PointerEvent) => {
    const r = this.canvas.getBoundingClientRect();
    this.tpx = ((e.clientX - r.left) / r.width) * 2 - 1;
    this.tpy = -(((e.clientY - r.top) / r.height) * 2 - 1);
    this.tActive = 1;
    this.wake();
  };
  private onEnter = () => {
    this.tActive = 1;
    this.wake();
  };
  private onLeave = () => {
    this.tActive = 0;
    this.tpx = 0;
    this.tpy = 0;
    this.wake();
  };

  private wake() {
    if (this.awake && !this.running) this.start();
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
      this.allocLevels();
      this.scheduleBuild();
    } else if (this.levels.length === 0) {
      this.allocLevels();
    }
  }

  // cap the mask resolution so the (CPU) rasterize stays cheap; the bloom smooths it.
  private maskSize(): [number, number] {
    const MAX_W = 1400;
    const mw = Math.max(2, Math.min(MAX_W, Math.round(this.w * this.dpr)));
    const mh = Math.max(2, Math.round(mw * (this.h / Math.max(1, this.w))));
    return [mw, mh];
  }

  private scheduleBuild() {
    if (!this.gl || this.destroyed) return;
    const [mw, mh] = this.maskSize();
    if (
      mw === this.builtW && mh === this.builtH &&
      this.params.word === this.builtWord && this.fontFamily === this.builtFont
    ) return;
    if (this.buildScheduled) return;
    const run = () => {
      this.buildScheduled = 0;
      void this.buildMaskNow();
    };
    const ric = (window as unknown as {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
    }).requestIdleCallback;
    this.buildScheduled = ric ? ric(run, { timeout: 200 }) : window.setTimeout(run, 0);
  }

  private async buildMaskNow() {
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
    this.builtW = mw;
    this.builtH = mh;
    this.builtWord = this.params.word;
    this.builtFont = this.fontFamily;
    const art = await makeWordMask(this.params.word, mw, mh, this.fontFamily);
    if (!this.gl || this.destroyed) return;
    if (!this.mask) this.mask = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.mask);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, art);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
    this.maskW = art.width;
    this.maskH = art.height;
    if (!this.running) this.renderOnce();
  }

  start() {
    if (!this.ok) return;
    this.awake = true;
    if (this.running) return;
    this.running = true;
    this.resize();
    if (!this.startT) this.startT = performance.now();
    const loop = (now: number) => {
      if (!this.running) return;
      this.frame(now);
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }

  /** Stop and forbid waking (offscreen / hidden). */
  stop() {
    this.awake = false;
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  private renderOnce() {
    if (this.raf) return;
    this.raf = requestAnimationFrame((t) => {
      this.raf = 0;
      this.render(t);
    });
  }

  private frame(now: number) {
    // ease pointer + active toward targets (cursor stays smooth, no overshoot)
    const k = 0.08;
    this.px += (this.tpx - this.px) * k;
    this.py += (this.tpy - this.py) * k;
    this.active += (this.tActive - this.active) * 0.06;

    // Autonomous motion = the same organic wander the LEGO card's virtual cursor uses
    // (a few sine/cosine harmonics at different frequencies, so it roams the word in a
    // smooth non-circular, non-linear path), but MUCH faster here. Ease the actual
    // position toward it so it always stays silky, never snappy.
    const t = (now - (this.startT || now)) / 1000;
    const T = t * 3.2; // faster than LEGO's wander
    const ax =
      0.16 * Math.sin(T * 1.15) +
      0.09 * Math.sin(T * 2.6 + 1.0) +
      0.05 * Math.cos(T * 4.1 + 0.4);
    const ay =
      0.13 * Math.cos(T * 0.95 + 2.1) +
      0.07 * Math.sin(T * 2.2 + 0.5) +
      0.04 * Math.cos(T * 3.7 + 1.7);
    this.fx += (ax - this.fx) * 0.2; // smooth follow
    this.fy += (ay - this.fy) * 0.2;

    if (this.cycle) {
      // real elapsed seconds (clamped) so the cycle runs at a steady wall-clock speed and
      // never lags or jumps when frames are uneven.
      const dt = this.lastNow ? Math.min(0.05, (now - this.lastNow) / 1000) : 1 / 60;
      this.stepCycle(dt);
    }
    this.lastNow = now;

    this.render(now);
  }

  // Advance the hero cycle clock with a real dt so it runs at steady wall-clock speed.
  // The transition is a DISPERSE & RE-FORM built from the effect's own bloom+split:
  //   HOLD  — the word rests (disperse = 0)
  //   OUT   — disperse rises: the split spreads wide, the core melts, the word blooms out
  //           into a soft coloured haze; palette crossfades halfway
  //   IN    — disperse falls: the new word condenses back out of the light as the split
  //           collapses; palette finishes. The word + invert swap at the OUT->IN peak,
  //           when it's a formless cloud, so the change is invisible.
  private stepCycle(dt: number) {
    this.cyclePhaseT += dt;
    // ease so the haze blooms open quickly then re-forms gently (easeOut on the way in).
    const easeIn = (x: number) => x * x;
    const easeOut = (x: number) => 1 - (1 - x) * (1 - x);

    if (this.cyclePhase === "hold") {
      this.disperse += (0 - this.disperse) * Math.min(1, dt * 12);
      if (this.cyclePhaseT >= this.holdDur) {
        // begin the transition: palette tween toward the NEXT world
        this.palFrom = this.cyclePalettes[this.cycleIdx] ?? null;
        const nextIdx = (this.cycleIdx + 1) % this.cycleWords.length;
        this.palTo = this.cyclePalettes[nextIdx] ?? this.palFrom;
        this.palMix = 0;
        this.nextPending = true;
        this.cyclePhase = "out";
        this.cyclePhaseT = 0;
      }
    } else if (this.cyclePhase === "out") {
      const k = Math.min(1, this.cyclePhaseT / this.outDur);
      this.disperse = easeIn(k);          // bloom out into haze
      this.palMix = 0.5 * k;
      if (k >= 1) {
        // PEAK: the word is a formless cloud -> swap word + invert now (hidden by the haze)
        if (this.nextPending) {
          this.nextPending = false;
          this.cycleIdx = (this.cycleIdx + 1) % this.cycleWords.length;
          this.params = { ...this.params, word: this.cycleWords[this.cycleIdx] };
          void this.buildMaskNow();        // rebuild mask for the new word
        }
        this.cyclePhase = "in";
        this.cyclePhaseT = 0;
      }
    } else {
      // IN: the new word condenses back out of the light; palette settles.
      const k = Math.min(1, this.cyclePhaseT / this.inDur);
      this.disperse = 1 - easeOut(k);     // haze collapses back to a sharp word
      this.palMix = 0.5 + 0.5 * k;
      if (k >= 1) {
        this.disperse = 0;
        this.palMix = 1;
        this.cyclePhase = "hold";
        this.cyclePhaseT = 0;
      }
    }
  }

  private render(now: number) {
    const gl = this.gl;
    if (!gl || !this.compProg || !this.blurProg) return;
    if (!this.mask || this.levels.length === 0) return;

    const t = (now - this.startT) / 1000;

    // ---- build the bloom chain ----
    // Level 0 blurs the mask; each next level blurs the previous level's output. Each
    // level is separable (H then V). Smaller buffers = a wider effective blur.
    gl.useProgram(this.blurProg);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.quad);
    const aPos = gl.getAttribLocation(this.blurProg, "aPosition");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    for (let i = 0; i < this.levels.length; i++) {
      const lv = this.levels[i];
      const src = i === 0 ? this.mask : this.levels[i - 1].out.tex;
      const r = LEVELS[i].radius;
      // H pass: src -> tmp
      gl.bindFramebuffer(gl.FRAMEBUFFER, lv.tmp.fb);
      gl.viewport(0, 0, lv.tmp.w, lv.tmp.h);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, src);
      gl.uniform1i(this.blurLoc.uTex, 0);
      gl.uniform2f(this.blurLoc.uDir, r / lv.tmp.w, 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      // V pass: tmp -> out
      gl.bindFramebuffer(gl.FRAMEBUFFER, lv.out.fb);
      gl.viewport(0, 0, lv.out.w, lv.out.h);
      gl.bindTexture(gl.TEXTURE_2D, lv.tmp.tex);
      gl.uniform2f(this.blurLoc.uDir, 0, r / lv.out.h);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    // ---- composite to screen ----
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    gl.useProgram(this.compProg);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.quad);
    const aPos2 = gl.getAttribLocation(this.compProg, "aPosition");
    gl.enableVertexAttribArray(aPos2);
    gl.vertexAttribPointer(aPos2, 2, gl.FLOAT, false, 0, 0);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.mask);
    gl.uniform1i(this.compLoc.uMask, 0);
    for (let i = 0; i < 4; i++) {
      gl.activeTexture(gl.TEXTURE1 + i);
      gl.bindTexture(gl.TEXTURE_2D, this.levels[i]?.out.tex ?? this.mask);
      gl.uniform1i(this.compLoc[`uB${i}`], 1 + i);
    }

    // ---- motion: autonomous wander drives the split; the cursor lights up LOCALLY ----
    // In cycle mode the colour world is the eased tween palFrom->palTo; otherwise it's the
    // live params (playground). Everything below reads from `p`.
    const p = this.cycle ? this.tweenedPalette() : this.params;
    const splitUv = p.split / 620; // base split in uv units (px @ 620h -> uv)
    // The split itself is driven purely by the card's own gentle wander (fx/fy) — the
    // cursor does NOT drag it around (that felt wrong). Instead the pointer position is
    // handed to the shader, which swells the bloom + rainbow in a soft pool right under
    // the cursor. So moving over it lights the word up where you are, and leaving lets it
    // settle back — no sliding, no whole-word shove.
    const sx = this.fx * 2.4 * splitUv;
    const sy = this.fy * 2.4 * splitUv;
    gl.uniform2f(this.compLoc.uSplit, sx, sy);
    // cursor uv (0..1) + eased strength; the shader makes a glow pool around it.
    gl.uniform2f(this.compLoc.uCursor, this.px * 0.5 + 0.5, this.py * 0.5 + 0.5);
    gl.uniform1f(this.compLoc.uCursorOn, this.active);
    gl.uniform1f(this.compLoc.uDisperse, this.disperse);

    const bloomPulse = p.bloom * (0.94 + 0.06 * Math.sin(t * 0.7));
    gl.uniform1f(this.compLoc.uBloom, bloomPulse);
    gl.uniform3f(this.compLoc.uWarm, p.warm[0], p.warm[1], p.warm[2]);
    gl.uniform3f(this.compLoc.uCool, p.cool[0], p.cool[1], p.cool[2]);
    gl.uniform3f(this.compLoc.uRed, p.red[0], p.red[1], p.red[2]);
    gl.uniform1f(this.compLoc.uCore, p.core);
    gl.uniform1f(this.compLoc.uSpectral, p.spectral);
    gl.uniform3f(this.compLoc.uBg, p.bg[0], p.bg[1], p.bg[2]);
    gl.uniform1f(this.compLoc.uInvert, p.invert ? 1 : 0);
    gl.uniform1f(this.compLoc.uNoise, p.noise);
    gl.uniform1f(this.compLoc.uTime, t);
    gl.uniform1f(this.compLoc.uAspect, this.w / Math.max(1, this.h));
    gl.uniform2f(this.compLoc.uResolution, this.canvas.width, this.canvas.height);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    if (!this.painted) {
      this.painted = true;
      this.canvas.style.opacity = "1";
    }
  }

  /** One static frame for reduced-motion. */
  renderStill() {
    this.resize();
    void this.buildMaskNow();
    this.startT = performance.now();
    this.render(performance.now());
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
    this.canvas.removeEventListener("pointerenter", this.onEnter);
    this.canvas.removeEventListener("pointerleave", this.onLeave);
    const gl = this.gl;
    if (gl) {
      this.freeLevels();
      if (this.mask) gl.deleteTexture(this.mask);
      if (this.quad) gl.deleteBuffer(this.quad);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    }
    this.canvas.remove();
  }
}

```

### chroma/playground.tsx
```tsx
"use client";

// Chromatic Glow playground — the detail-page editor. Type a word and it blooms with
// the RGB chromatic split live. Sliders drive the bloom, the split distance, the noise
// grain, and the three tint colours (warm / cool / fringe). Remix rolls a fresh pair.
// Built on the same ChromaGlow engine the card uses, from the shared Vault control kit
// so it matches the site.

import { useEffect, useMemo, useRef, useState } from "react";
import { ChromaGlow, type ChromaParams } from "./engine";
import {
  defaultChromaParams, remixChromaParams, toHex, fromHex,
} from "./params";
import { PG_PREVIEW, PG_PANEL, Slider, ColorControl, GhostButton } from "../swirl/controls";
import { SectionLabel } from "../section-label";
import { hapticTap } from "../../lib/haptics";

const LABEL = "text-[12px] text-[var(--text-tertiary)]";

export function ChromaGlowPlayground() {
  const hostRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<ChromaGlow | null>(null);

  const [params, setParams] = useState<ChromaParams>(() => defaultChromaParams());
  const [word, setWord] = useState("chrome");

  const full = useMemo<ChromaParams>(() => ({ ...params, word }), [params, word]);

  // Mount the engine only when the playground scrolls into view, so the detail hero
  // card and the playground don't both spin up WebGL during the view-transition morph.
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let raf = 0;
    let started = false;
    let onScreen = true;
    const sync = () => {
      const eng = engineRef.current;
      if (!eng) return;
      if (onScreen) eng.start();
      else eng.stop();
    };
    const build = () => {
      if (started) return;
      started = true;
      raf = requestAnimationFrame(() => {
        const eng = new ChromaGlow(host, full);
        if (!eng.ok) return;
        engineRef.current = eng;
        eng.start();
        if (document.fonts?.load) {
          const probe = document.createElement("span");
          probe.style.cssText = "position:absolute;visibility:hidden;font-family:var(--font-neue-corp)";
          probe.textContent = "Ag";
          document.body.appendChild(probe);
          const fam = getComputedStyle(probe).fontFamily.split(",")[0].replace(/["']/g, "").trim();
          document.body.removeChild(probe);
          document.fonts.load(`800 1em "${fam}"`).then(() => eng.setFont(`"${fam}", sans-serif`), () => {});
        }
      });
    };
    const io = new IntersectionObserver(
      (es) => {
        onScreen = es[0]?.isIntersecting ?? false;
        if (onScreen) build();
        sync();
      },
      { rootMargin: "200px" },
    );
    io.observe(host);
    const onResize = () => engineRef.current?.resize();
    window.addEventListener("resize", onResize);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      engineRef.current?.destroy();
      engineRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // push params/word to the engine
  useEffect(() => { engineRef.current?.setParams(full); }, [full]);

  const patch = (p: Partial<ChromaParams>) => setParams((prev) => ({ ...prev, ...p }));
  const remix = () => {
    hapticTap();
    // keep the user's typed word — Remix only rolls a fresh colour world, so you can apply
    // different presets to the same text.
    const { word: _drop, ...colours } = remixChromaParams();
    void _drop;
    setParams((prev) => ({ ...prev, ...colours }));
  };

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <SectionLabel action={<GhostButton onClick={remix}>Remix</GhostButton>}>
        Playground
      </SectionLabel>

      {/* live preview */}
      <div className={`${PG_PREVIEW} aspect-[1344/620] w-full bg-[#1c2133]`}>
        <div ref={hostRef} data-canvas-card className="absolute inset-0 h-full w-full" />
      </div>

      {/* controls */}
      <div className={PG_PANEL}>
        {/* word */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <span className={`${LABEL} shrink-0`}>Word</span>
          <input
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="type a word"
            maxLength={14}
            className="h-8 min-w-0 flex-1 rounded-lg border border-[var(--border-line)] bg-[var(--bg-page)] px-3 text-[12px] text-[var(--text-primary)] outline-none transition-colors duration-150 ease-[var(--ease-out)] placeholder:text-[var(--text-tertiary)] hover:border-[var(--border-ring)] focus:border-[var(--border-ring)] sm:ml-auto sm:w-[180px] sm:flex-none"
          />
        </div>

        {/* two columns: Glow | Colours */}
        <div className="grid grid-cols-1 items-start gap-x-6 gap-y-5 sm:grid-cols-2">
          <div className="flex flex-col gap-3 self-start">
            <span className={LABEL}>Glow</span>
            <Slider label="Bloom" value={params.bloom} min={0.4} max={2} step={0.01}
              format={(v) => v.toFixed(2)} onChange={(v) => patch({ bloom: v })} />
            <Slider label="Split" value={params.split} min={0} max={20} step={0.5}
              format={(v) => `${v.toFixed(1)}px`} onChange={(v) => patch({ split: v })} />
            <Slider label="Core" value={params.core} min={0} max={1.4} step={0.01}
              format={(v) => v.toFixed(2)} onChange={(v) => patch({ core: v })} />
            <Slider label="Spectral" value={params.spectral} min={0} max={1} step={0.01}
              format={(v) => v.toFixed(2)} onChange={(v) => patch({ spectral: v })} />
            <Slider label="Grain" value={params.noise} min={0} max={0.4} step={0.01}
              format={(v) => v.toFixed(2)} onChange={(v) => patch({ noise: v })} />
          </div>

          <div className="flex flex-col gap-3">
            <span className={LABEL}>Colours</span>
            <ColorControl label="Warm" value={toHex(params.warm)}
              onChange={(hex) => patch({ warm: fromHex(hex) })} />
            <ColorControl label="Cool" value={toHex(params.cool)}
              onChange={(hex) => patch({ cool: fromHex(hex) })} />
            <ColorControl label="Fringe" value={toHex(params.red)}
              onChange={(hex) => patch({ red: fromHex(hex) })} />
            <ColorControl label="Background" value={toHex(params.bg)}
              onChange={(hex) => patch({ bg: fromHex(hex) })} />
          </div>
        </div>
      </div>
    </div>
  );
}

```18:["$","div",null,{"className":"py-24","children":[["$","script",null,{"type":"application/ld+json","suppressHydrationWarning":true,"dangerouslySetInnerHTML":{"__html":"[{\"@context\":\"https://schema.org\",\"@type\":\"TechArticle\",\"headline\":\"Chromatic glow\",\"url\":\"https://arlan.me/vault/chroma-glow\",\"image\":\"/vault/emboss-plaster.webp\",\"datePublished\":\"Jul 14, 2026\",\"about\":\"Study\",\"keywords\":\"WebGL, Glow, Bloom\",\"author\":{\"@type\":\"Person\",\"name\":\"Arlan Marat\",\"url\":\"https://arlan.me\"},\"isPartOf\":{\"@type\":\"CollectionPage\",\"name\":\"Vault\",\"url\":\"https://arlan.me/vault\"}},{\"@context\":\"https://schema.org\",\"@type\":\"BreadcrumbList\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Vault\",\"item\":\"https://arlan.me/vault\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Chromatic glow\",\"item\":\"https://arlan.me/vault/chroma-glow\"}]}]"}}],["$","article",null,{"className":"flex min-w-0 flex-col gap-10 text-[15px] leading-[1.7]","children":[["$","header",null,{"style":{"viewTransitionName":"vault-detail-head"},"className":"flex items-center justify-between gap-4","children":[["$","h1",null,{"className":"font-semibold text-[var(--text-primary)]","children":"Chromatic glow"}],["$","$L22",null,{"href":"/vault"}]]}],[["$","$L23",null,{"moduleIds":[68753]}],"$L24"],false,["$","div",null,{"style":{"viewTransitionName":"vault-detail-body"},"className":"flex min-w-0 flex-col gap-14","children":[["$","div",null,{"className":"flex flex-col gap-3","children":[["$","p","0",{"className":"text-pretty text-[var(--text-primary)]","children":[["$","$1","0",{"children":"I wanted light that blooms out soft and pulls the colors apart at the edges."}]]}],["$","p","1",{"className":"text-pretty text-[var(--text-primary)]","children":[["$","$1","0",{"children":"The word gets blurred at a few sizes and added back together, so it glows for real. Then it splits into a warm copy and a cool copy that drift a little the opposite way, and that gap is the rainbow edge. Move over it and the split leans toward your cursor. Type your own word and pick the two colors below."}]]}]]}],["$","$L25",null,{"children":[["$","$L26",null,{"playground":"chroma-glow"}],["$","section",null,{"className":"flex min-w-0 flex-col gap-3","children":[["$","header",null,{"className":"flex items-center justify-between gap-3 pb-2 border-b border-[var(--border-line)]","children":[["$","h2",null,{"className":"font-semibold text-[var(--text-primary)]","children":"Code"}],["$","$L27",null,{"text":"$28","label":"Copy prompt","hideIcon":true,"className":"inline-flex h-7 shrink-0 items-center self-start rounded-lg border border-[var(--border-line)] bg-[var(--bg-surface)] px-3 text-[12px] font-medium text-[var(--text-secondary)] transition-colors duration-150 ease-[var(--ease-out)] hover:bg-[var(--bg-hover)] hover:border-[var(--border-ring)] hover:text-[var(--text-primary)] active:scale-[0.98]"}]]}],"$L29"]}],"$L2a","$L2b"]}]]}],"$L2c"]}]]}]
