<!-- Verbatim "Copy prompt" payload from emboss; includes the full source inline. -->

You are given the complete source for a self-contained web visual: "Realistic emboss".

What it is:
- Really liked the emboss effect people do, so I replicated it in web.
- Type your own word or drop an SVG, then play with the depth, the light, and the surface until it feels right. The presets are good places to start.

How to use this code:
- It is a React + TypeScript component tree (Next.js App Router) that renders to an HTML canvas; the entry point is the playground component.
- Drop the files into a project under the same relative paths, mount the playground component, and it runs as-is. No external assets beyond what's inline.
- To adapt it: change the resolved word/logo, the color controls, or the experiment parameters. Ask me to modify, explain, or port any part.

The full source follows, one file per block:

### emboss/params.ts
```ts
// The editable emboss parameters + presets. Each preset is a distinct bevel character
// (relief, bevel width, soften, light, highlight/shadow) paired with its own tint and
// plaster slice. The playground edits an EmbossParams; the card renders three fixed
// ones. One source of truth for both.

export type EmbossParams = {
  // bevel
  depth: number; // relief strength      (~0.4..1.9)
  size: number; // bevel width in px @ the 620px card height
  soften: number; // extra edge softening
  // light
  angle: number; // degrees
  altitude: number; // degrees (low = raking)
  highlight: number; // 0..1 highlight opacity
  shadow: number; // 0..1 shadow opacity
  // surface
  contrast: number; // plaster grain punch
  bright: number; // panel brightness
  tint: [number, number, number];
  texOffset: [number, number]; // which plaster region
  texScale: number; // plaster zoom
};

// Map a raw bevel spec (relief %, bevel size, soften, light, hi/sh) to EmbossParams,
// normalizing the ranges to this WebGL model. Size is capped so a wide bevel stays
// crisp rather than going soft/blobby.
function fromSpec(a: {
  depth: number;
  size: number;
  soften: number;
  angle: number;
  alt: number;
  hi: number;
  sh: number;
}): Omit<EmbossParams, "tint" | "texOffset" | "texScale" | "contrast" | "bright"> {
  return {
    depth: 0.55 + (Math.min(a.depth, 1000) / 1000) * 1.2,
    // cap at 6px: past that the bevel goes soft/blobby in this model, so the wide
    // specs (size 15-20) are clamped to a crisp edge.
    size: Math.min(6, Math.max(1, (a.size / 4.17) * 2.2)),
    soften: Math.min(2, a.soften / 4.17),
    angle: a.angle,
    altitude: a.alt,
    highlight: a.hi / 100,
    shadow: a.sh / 100,
  };
}

export type Preset = { id: string; name: string; params: EmbossParams };

// Shared grain; bright ~2 so tints read as vivid colored walls. Each preset overrides
// tint AND texture (region + zoom), so presets cycle bold color AND surface variety.
const SURFACE = { contrast: 0.32, bright: 2.0 };
type RGB = [number, number, number];
type XY = [number, number];

// Nine presets, each a genuinely distinct hue (spread across the wheel: red, orange,
// yellow, green, teal, blue, indigo, violet, magenta) + its own texture slice.
export const PRESETS: Preset[] = [
  { id: "sharp", name: "Sharp",
    params: { ...fromSpec({ depth: 188, size: 1, soften: 1, angle: 73, alt: 21, hi: 15, sh: 10 }), ...SURFACE, tint: [1.0, 0.42, 0.42] as RGB, texOffset: [0.0, 0.0] as XY, texScale: 1.35 } }, // red
  { id: "press", name: "Press",
    params: { ...fromSpec({ depth: 188, size: 5, soften: 3, angle: 73, alt: 21, hi: 20, sh: 20 }), ...SURFACE, tint: [1.0, 0.62, 0.24] as RGB, texOffset: [0.4, 0.15] as XY, texScale: 1.0 } }, // orange
  { id: "brutal", name: "Brutal",
    params: { ...fromSpec({ depth: 1000, size: 20, soften: 10, angle: 73, alt: 21, hi: 25, sh: 20 }), ...SURFACE, tint: [0.98, 0.85, 0.2] as RGB, texOffset: [0.6, 0.55] as XY, texScale: 1.9 } }, // yellow
  { id: "soft", name: "Soft",
    params: { ...fromSpec({ depth: 188, size: 15, soften: 7, angle: 73, alt: 21, hi: 12, sh: 8 }), ...SURFACE, tint: [0.42, 0.9, 0.42] as RGB, texOffset: [0.2, 0.7] as XY, texScale: 0.7 } }, // green
  { id: "wide", name: "Wide",
    params: { ...fromSpec({ depth: 469, size: 20, soften: 5, angle: 90, alt: 30, hi: 10, sh: 10 }), ...SURFACE, tint: [0.2, 0.85, 0.75] as RGB, texOffset: [0.75, 0.1] as XY, texScale: 1.5 } }, // teal
  { id: "deep", name: "Deep",
    params: { ...fromSpec({ depth: 1000, size: 12, soften: 12, angle: 90, alt: 30, hi: 10, sh: 6 }), ...SURFACE, tint: [0.34, 0.62, 1.0] as RGB, texOffset: [0.1, 0.4] as XY, texScale: 2.2 } }, // blue
  { id: "crisp", name: "Crisp",
    params: { ...fromSpec({ depth: 1000, size: 2, soften: 3, angle: 90, alt: 30, hi: 20, sh: 10 }), ...SURFACE, tint: [0.55, 0.45, 1.0] as RGB, texOffset: [0.55, 0.8] as XY, texScale: 1.15 } }, // indigo
  { id: "highkey", name: "High key",
    params: { ...fromSpec({ depth: 646, size: 4, soften: 4, angle: 90, alt: 30, hi: 25, sh: 25 }), ...SURFACE, tint: [0.82, 0.42, 1.0] as RGB, texOffset: [0.3, 0.25] as XY, texScale: 0.85 } }, // violet
  { id: "pillow", name: "Pillow",
    params: { ...fromSpec({ depth: 1000, size: 5, soften: 16, angle: 73, alt: 21, hi: 10, sh: 10 }), ...SURFACE, tint: [1.0, 0.42, 0.78] as RGB, texOffset: [0.85, 0.6] as XY, texScale: 0.6 } }, // magenta
];

export function defaultParams(): EmbossParams {
  return { ...PRESETS[1].params }; // Press
}

// A tasteful random surface (tint + texture region/zoom) for Remix. Tints are kept
// light + soft (mixed toward white) so the plaster always reads as a real wall.
function randomSurface(): Pick<
  EmbossParams,
  "tint" | "texOffset" | "texScale" | "contrast" | "bright"
> {
  // Bold BUT bright tint: a saturated hue mixed partway toward white so no channel is
  // ever near 0 (pure red/indigo would multiply the wall to near-black). This keeps
  // every color vivid AND light enough to read the press.
  const hue = Math.random() * 360;
  const s = 0.55 + Math.random() * 0.2; // saturated, not extreme
  const c = s;
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
  const seg = [
    [c, x, 0], [x, c, 0], [0, c, x], [0, x, c], [x, 0, c], [c, 0, x],
  ][Math.floor(hue / 60) % 6];
  // lift toward white so the darkest channel stays >= ~0.55 (vivid but not dark)
  const lift = 0.55;
  const tint: [number, number, number] = [
    seg[0] * (1 - lift) + lift,
    seg[1] * (1 - lift) + lift,
    seg[2] * (1 - lift) + lift,
  ];
  return {
    tint,
    texOffset: [Math.random(), Math.random()],
    texScale: 0.85 + Math.random() * 0.9, // avoid extreme zoom
    contrast: 0.25 + Math.random() * 0.2, // low grain
    bright: 1.85 + Math.random() * 0.2,
  };
}

// Remix: a random preset's bevel, plus a fresh random surface. Returns a full
// EmbossParams. Remix ALWAYS produces a crisp, tight press: the wide/soft presets
// (size 15-20, soften 7-16) read as a big blurry mush, so we force a small size and
// low soften every time. Only the light + surface really vary between remixes.
export function remixParams(): EmbossParams {
  const preset = PRESETS[Math.floor(Math.random() * PRESETS.length)];
  const surf = randomSurface();
  return {
    ...preset.params,
    ...surf,
    highlight: Math.max(preset.params.highlight, 0.22),
    shadow: Math.max(preset.params.shadow, 0.3),
    // a good crisp relief, not a faint one
    depth: Math.max(preset.params.depth, 1.0),
    // ALWAYS a tight, sharp edge: small size + low soften. This is the single biggest
    // thing that made remixes look bad (a soft 6px bevel reads as a blurry blob).
    size: 1 + Math.random() * 1.5,      // 1.0 - 2.5px
    soften: Math.random() * 0.6,        // 0 - 0.6px
  };
}

```

### emboss/content-mask.ts
```ts
// Rasterizes the pressed CONTENT (a word and/or an SVG shape, composed together) into
// a height field for the emboss shader. Blurs once on the CPU at the bevel radius.
// Packed: R = crisp coverage, G = blurred height. Async because an SVG is drawn via an
// <img> that must load.

export type Content = {
  word: string; // pressed word (empty in image mode)
  svg: string | null; // raw SVG markup (null in text mode)
};

export async function makeContentField(
  content: Content,
  blurPx: number,
  w: number,
  h: number,
  fontFamily: string,
): Promise<HTMLCanvasElement> {
  const W = Math.max(1, Math.round(w));
  const H = Math.max(1, Math.round(h));

  const crisp = document.createElement("canvas");
  crisp.width = W;
  crisp.height = H;
  const cx = crisp.getContext("2d")!;
  cx.clearRect(0, 0, W, H);

  // One mode at a time: a centered word, or a centered SVG.
  if (content.svg && content.svg.trim()) {
    await drawSvg(cx, content.svg, W, H, 0.5, 0.5, 0.52);
  } else if (content.word.trim()) {
    drawWord(cx, content, W, H, fontFamily, 0.5, 0.36);
  }

  const soft = document.createElement("canvas");
  soft.width = W;
  soft.height = H;
  const sx = soft.getContext("2d")!;
  sx.filter = `blur(${Math.max(0.5, blurPx).toFixed(2)}px)`;
  sx.drawImage(crisp, 0, 0);
  sx.filter = "none";

  const out = document.createElement("canvas");
  out.width = W;
  out.height = H;
  const ox = out.getContext("2d")!;
  const c = cx.getImageData(0, 0, W, H).data;
  const s = sx.getImageData(0, 0, W, H).data;
  const packed = ox.createImageData(W, H);
  const p = packed.data;
  for (let i = 0; i < p.length; i += 4) {
    p[i] = c[i + 3];
    p[i + 1] = s[i + 3];
    p[i + 2] = 0;
    p[i + 3] = 255;
  }
  ox.putImageData(packed, 0, 0);
  return out;
}

function drawWord(
  ctx: CanvasRenderingContext2D,
  content: Content,
  W: number,
  H: number,
  fontFamily: string,
  cyFrac: number,
  capFrac: number,
) {
  const text = content.word;
  if (!text) return;
  const cx = W / 2;
  const cy = H * cyFrac;
  const maxW = W * 0.82;

  let size = H * capFrac;
  ctx.font = `800 ${size}px ${fontFamily}`;
  const wWidth = ctx.measureText(text).width;
  if (wWidth > maxW) {
    size *= maxW / wWidth;
    ctx.font = `800 ${size}px ${fontFamily}`;
  }
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, cx, cy);
}

// Draw an SVG (as a white silhouette) centered at (cxFrac,cyFrac), sized to a
// fraction of the card. We force the fill to white via a wrapper so any SVG becomes
// a clean coverage mask regardless of its own colors.
async function drawSvg(
  ctx: CanvasRenderingContext2D,
  svg: string,
  W: number,
  H: number,
  cxFrac: number,
  cyFrac: number,
  sizeFrac: number,
): Promise<void> {
  // Force every fill/stroke white so ANY svg (incl. colored uploads) becomes a clean
  // white-on-transparent coverage mask (the shader reads alpha, so color is moot).
  const forced = svg.replace(
    /<svg([^>]*)>/i,
    `<svg$1><style>*{fill:#fff!important;stroke:#fff!important}</style>`,
  );
  const blob = new Blob([forced], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  try {
    const img = await loadImage(url);
    const target = H * sizeFrac;
    const ar = img.width / Math.max(1, img.height);
    let dh = target;
    let dw = target * ar;
    const maxW = W * 0.82;
    if (dw > maxW) {
      dw = maxW;
      dh = dw / ar;
    }
    ctx.drawImage(img, W * cxFrac - dw / 2, H * cyFrac - dh / 2, dw, dh);
  } catch {
    // invalid SVG -> draw nothing (playground stays usable)
  } finally {
    URL.revokeObjectURL(url);
  }
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = src;
  });
}

// Built-in marks users can drop in. Bold, solid, medium-complexity shapes read best
// as a press (fine detail gets lost in the bevel). All draw as a white silhouette.
export const BUILTIN_SVGS: { id: string; name: string; svg: string }[] = [
  {
    id: "sparkle",
    name: "Sparkle",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 4 C54 34 66 46 96 50 C66 54 54 66 50 96 C46 66 34 54 4 50 C34 46 46 34 50 4 Z"/></svg>`,
  },
  {
    id: "star",
    name: "Star",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 4 L61 38 L97 38 L68 60 L79 94 L50 72 L21 94 L32 60 L3 38 L39 38 Z"/></svg>`,
  },
  {
    id: "heart",
    name: "Heart",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 88 C10 60 8 30 26 20 C40 12 50 24 50 32 C50 24 60 12 74 20 C92 30 90 60 50 88 Z"/></svg>`,
  },
  {
    id: "bolt",
    name: "Bolt",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M58 4 L26 56 L46 56 L40 96 L74 40 L52 40 Z"/></svg>`,
  },
  {
    id: "flower",
    name: "Flower",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g><ellipse cx="50" cy="24" rx="15" ry="22"/><ellipse cx="50" cy="24" rx="15" ry="22" transform="rotate(72 50 50)"/><ellipse cx="50" cy="24" rx="15" ry="22" transform="rotate(144 50 50)"/><ellipse cx="50" cy="24" rx="15" ry="22" transform="rotate(216 50 50)"/><ellipse cx="50" cy="24" rx="15" ry="22" transform="rotate(288 50 50)"/><circle cx="50" cy="50" r="11"/></g></svg>`,
  },
  {
    id: "sun",
    name: "Sun",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g><circle cx="50" cy="50" r="20"/><g stroke-width="0"><rect x="47" y="4" width="6" height="16" rx="3"/><rect x="47" y="80" width="6" height="16" rx="3"/><rect x="4" y="47" width="16" height="6" rx="3"/><rect x="80" y="47" width="16" height="6" rx="3"/><rect x="47" y="4" width="6" height="16" rx="3" transform="rotate(45 50 50)"/><rect x="47" y="80" width="6" height="16" rx="3" transform="rotate(45 50 50)"/><rect x="4" y="47" width="16" height="6" rx="3" transform="rotate(45 50 50)"/><rect x="80" y="47" width="16" height="6" rx="3" transform="rotate(45 50 50)"/></g></g></svg>`,
  },
  {
    id: "flame",
    name: "Flame",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M52 4 C52 26 74 34 70 58 C68 74 60 78 60 78 C64 66 56 60 54 52 C50 62 42 62 44 76 C36 70 30 60 32 46 C34 30 52 30 52 4 Z"/></svg>`,
  },
  {
    id: "blob",
    name: "Blob",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M60 8 C82 12 94 34 88 56 C82 78 60 94 40 88 C18 82 6 58 14 38 C22 18 38 4 60 8 Z"/></svg>`,
  },
  {
    id: "moon",
    name: "Moon",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M64 8 A44 44 0 1 0 64 92 A34 34 0 0 1 64 8 Z"/></svg>`,
  },
  {
    id: "arrow",
    name: "Arrow",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M44 12 L44 62 L26 62 L50 92 L74 62 L56 62 L56 12 Z"/></svg>`,
  },
  {
    id: "target",
    name: "Target",
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="47" y="6" width="6" height="88" rx="3"/><rect x="6" y="47" width="88" height="6" rx="3"/><circle cx="50" cy="50" r="22" fill="none" stroke-width="6"/></svg>`,
  },
];

```

### emboss/pg-shader.ts
```ts
// Single-panel parametric emboss shader for the playground. Same model as the card
// (real plaster surface + Bevel & Emboss from the height-field gradient + grunge
// overlay), but every lever is a live uniform so the controls can drive it. Fills
// the whole canvas (one panel), light follows the cursor.

export const PG_VERT = `
attribute vec2 aPosition;
attribute vec2 aUV;
varying vec2 vUV;
void main(){ vUV = aUV; gl_Position = vec4(aPosition, 0.0, 1.0); }
`;

export const PG_FRAG = `
precision highp float;
varying vec2 vUV;

uniform sampler2D uField;   // R crisp, G blurred height
uniform sampler2D uPlaster;
uniform sampler2D uGrunge;
uniform float uGrungeAmt;
uniform vec2  uTexel;
uniform vec2  uLight;       // from angle + altitude
uniform float uLightZ;
uniform float uDepth;
uniform float uHi;
uniform float uSh;
uniform float uContrast;
uniform float uBright;
uniform vec3  uTint;
uniform vec2  uTexOff;
uniform float uTexScale;
uniform float uReveal;
uniform float uAspect;

void main(){
  vec2 uv = vUV;

  float gs = 1.0;
  float hL = texture2D(uField, uv - vec2(gs,0.0)*uTexel).g;
  float hR = texture2D(uField, uv + vec2(gs,0.0)*uTexel).g;
  float hD = texture2D(uField, uv - vec2(0.0,gs)*uTexel).g;
  float hU = texture2D(uField, uv + vec2(0.0,gs)*uTexel).g;
  float crisp = texture2D(uField, uv).r;
  vec2 slope = vec2(hR-hL, hU-hD) * uDepth * 16.0 * uReveal;
  vec3 N = normalize(vec3(-slope.x, -slope.y, 1.0));
  float bevel = clamp(length(slope), 0.0, 1.0);

  vec3 L = normalize(vec3(uLight, uLightZ));
  float diff = dot(N, L);
  float hi = pow(max(diff,0.0), 1.2) * bevel;
  float sh = pow(max(-diff,0.0), 1.0) * bevel;

  // clamped sub-window of the plaster (zoom + pan, no fract wrap) so there is no
  // seam and the texture never tiles across the panel.
  float zoom = max(1.0, uTexScale);
  vec2 span = vec2(1.0 / zoom);
  vec2 origin = clamp(uTexOff, 0.0, 1.0) * (1.0 - span);
  vec2 puv = origin + uv * span;
  float p = texture2D(uPlaster, puv).r;
  p = clamp((p-0.5)*uContrast + 0.5, 0.0, 1.0);
  vec3 base = uTint * p * uBright;

  float face = smoothstep(0.4, 0.62, crisp);
  base *= mix(1.0, 0.86, face * uReveal);

  vec3 c = base;
  c += hi * uHi * uReveal;
  c -= sh * uSh * uReveal;

  float gr = texture2D(uGrunge, uv).r;
  vec3 ov = mix(2.0*c*gr, 1.0-2.0*(1.0-c)*(1.0-gr), step(0.5, c));
  c = mix(c, ov, uGrungeAmt);

  gl_FragColor = vec4(clamp(c,0.0,1.0), 1.0);
}
`;

```

### emboss/pg-engine.ts
```ts
// Parametric playground engine: one emboss panel filling the canvas, every lever a
// live uniform. The playground calls setParams()/setContent() and it re-renders.
// The height field is rebuilt (async) only when the CONTENT or bevel SIZE changes;
// all other params are cheap per-frame uniforms.

import { PG_VERT, PG_FRAG } from "./pg-shader";
import { makeContentField, type Content } from "./content-mask";
import { mediaUrl } from "../../lib/video-sources";
import type { EmbossParams } from "./params";

const PLASTER_URL = mediaUrl("/vault/emboss-plaster.webp");
const GRUNGE_URL = mediaUrl("/vault/emboss-grunge.webp");
const GRUNGE_AMT = 0.38;

export class EmbossPlayground {
  private host: HTMLElement;
  private canvas: HTMLCanvasElement;
  private gl: WebGLRenderingContext | null = null;
  private prog: WebGLProgram | null = null;
  private loc: Record<string, WebGLUniformLocation | null> = {};
  private field: WebGLTexture | null = null;
  private plaster: WebGLTexture | null = null;
  private grunge: WebGLTexture | null = null;
  private fieldW = 1;
  private fieldH = 1;

  private w = 0;
  private h = 0;
  private dpr = 1;
  private fontFamily = "var(--font-neue-corp), sans-serif";

  private params: EmbossParams;
  private content: Content;
  private lastSize = -1;
  private fieldSeq = 0; // guards against out-of-order async field builds

  private raf = 0;
  private running = false;
  private fieldReady = false; // the height field has been built at least once
  private painted = false; // canvas revealed after its first real frame
  ok = false;

  constructor(host: HTMLElement, params: EmbossParams, content: Content) {
    this.host = host;
    this.params = params;
    this.content = content;
    this.canvas = document.createElement("canvas");
    Object.assign(this.canvas.style, {
      position: "absolute", inset: "0", width: "100%", height: "100%", display: "block",
      // Hidden until the first real frame, so the white host shows instead of a black
      // undrawn canvas (matches the emboss card; avoids a black flash on mount).
      opacity: "0",
    });
    host.appendChild(this.canvas);

    const gl = this.canvas.getContext("webgl", { alpha: false, antialias: false, premultipliedAlpha: false });
    if (!gl) return;
    this.gl = gl;
    gl.clearColor(1, 1, 1, 1); // white, not the default black
    try { this.prog = this.build(PG_VERT, PG_FRAG); } catch { this.gl = null; return; }

    for (const u of [
      "uField", "uPlaster", "uGrunge", "uGrungeAmt", "uTexel", "uLight", "uLightZ",
      "uDepth", "uHi", "uSh", "uContrast", "uBright", "uTint", "uTexOff", "uTexScale",
      "uReveal", "uAspect",
    ]) this.loc[u] = gl.getUniformLocation(this.prog!, u);

    const aPos = gl.getAttribLocation(this.prog!, "aPosition");
    const aUV = gl.getAttribLocation(this.prog!, "aUV");
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1,-1,0,1, 1,-1,1,1, -1,1,0,0, 1,1,1,0,
    ]), gl.STATIC_DRAW);
    gl.useProgram(this.prog);
    gl.enableVertexAttribArray(aPos); gl.vertexAttribPointer(aPos,2,gl.FLOAT,false,16,0);
    gl.enableVertexAttribArray(aUV); gl.vertexAttribPointer(aUV,2,gl.FLOAT,false,16,8);

    this.field = gl.createTexture();
    this.plaster = this.placeholder([128,128,128,255]);
    this.grunge = this.placeholder([128,128,128,255]);
    this.loadTex(PLASTER_URL, () => this.plaster, false); // CLAMP (sub-window, no wrap)
    this.loadTex(GRUNGE_URL, () => this.grunge, false);

    this.resize();
    void this.rebuildField();
    this.ok = true;
  }

  private build(vs: string, fs: string): WebGLProgram {
    const gl = this.gl!;
    const c = (t: number, s: string) => {
      const sh = gl.createShader(t)!; gl.shaderSource(sh, s); gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh) || "compile");
      return sh;
    };
    const p = gl.createProgram()!;
    gl.attachShader(p, c(gl.VERTEX_SHADER, vs)); gl.attachShader(p, c(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p) || "link");
    return p;
  }

  private placeholder(rgba: number[]): WebGLTexture | null {
    const gl = this.gl; if (!gl) return null;
    const t = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,1,1,0,gl.RGBA,gl.UNSIGNED_BYTE,new Uint8Array(rgba));
    return t;
  }

  private loadTex(url: string, target: () => WebGLTexture | null, repeat: boolean) {
    const img = new Image(); img.crossOrigin = "anonymous";
    img.onload = () => {
      const g = this.gl, tex = target(); if (!g || !tex) return;
      g.bindTexture(g.TEXTURE_2D, tex);
      g.pixelStorei(g.UNPACK_FLIP_Y_WEBGL, true);
      g.texImage2D(g.TEXTURE_2D,0,g.RGBA,g.RGBA,g.UNSIGNED_BYTE,img);
      const w = repeat ? g.REPEAT : g.CLAMP_TO_EDGE;
      g.texParameteri(g.TEXTURE_2D,g.TEXTURE_WRAP_S,w);
      g.texParameteri(g.TEXTURE_2D,g.TEXTURE_WRAP_T,w);
      g.texParameteri(g.TEXTURE_2D,g.TEXTURE_MIN_FILTER,g.LINEAR);
      g.texParameteri(g.TEXTURE_2D,g.TEXTURE_MAG_FILTER,g.LINEAR);
      g.pixelStorei(g.UNPACK_FLIP_Y_WEBGL, false);
      this.renderOnce();
    };
    img.src = url;
  }

  setFont(f: string) { this.fontFamily = f; void this.rebuildField(); }

  setParams(p: EmbossParams) {
    const sizeChanged = p.size !== this.params.size || p.soften !== this.params.soften;
    this.params = p;
    if (sizeChanged) void this.rebuildField();
    else this.renderOnce();
  }

  setContent(c: Content) { this.content = c; void this.rebuildField(); }

  private async rebuildField() {
    const gl = this.gl; if (!gl) return;
    // Cap the mask width (was DPR x2 supersample -> ~5000px on retina, a
    // multi-hundred-ms CPU build). ~1500px is plenty: crispness is from the pre-blur.
    const MAX_W = 1500;
    const mw = Math.max(2, Math.min(MAX_W, Math.round(this.w * this.dpr)));
    const mh = Math.max(2, Math.round(mw * (this.h / Math.max(1, this.w))));
    // bevel width (px @ card) -> field-space blur, plus the soften amount
    const blur = Math.max(1, (this.params.size + this.params.soften) * this.dpr * 1.2);
    this.lastSize = this.params.size;
    const seq = ++this.fieldSeq;
    const art = await makeContentField(this.content, blur, mw, mh, this.fontFamily);
    if (seq !== this.fieldSeq || !this.gl) return; // superseded
    gl.bindTexture(gl.TEXTURE_2D, this.field);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, art);
    this.fieldW = art.width; this.fieldH = art.height;
    this.fieldReady = true;
    this.renderOnce();
  }

  resize() {
    const r = this.host.getBoundingClientRect();
    this.dpr = Math.min(2, window.devicePixelRatio || 1);
    this.w = r.width; this.h = r.height;
    const cw = Math.max(1, Math.round(this.w * this.dpr));
    const ch = Math.max(1, Math.round(this.h * this.dpr));
    if (this.canvas.width !== cw || this.canvas.height !== ch) {
      this.canvas.width = cw; this.canvas.height = ch;
      this.gl?.viewport(0, 0, cw, ch);
      void this.rebuildField();
    }
  }

  private renderOnce() {
    if (this.raf) return;
    this.raf = requestAnimationFrame(() => { this.raf = 0; this.render(); });
  }

  private render() {
    const gl = this.gl, p = this.params; if (!gl || !this.prog) return;
    // Don't draw until the field is built (else a fieldless frame flashes / a black
    // canvas shows before the press). The white host shows through until then.
    if (!this.fieldReady) return;
    // light from the params' angle/altitude (no cursor interaction)
    const a = (p.angle * Math.PI) / 180;
    const lx = Math.cos(a);
    const ly = Math.sin(a);
    const lz = Math.max(0.25, Math.sin((p.altitude * Math.PI) / 180) + 0.3);
    gl.useProgram(this.prog);
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, this.field); gl.uniform1i(this.loc.uField, 0);
    gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, this.plaster); gl.uniform1i(this.loc.uPlaster, 1);
    gl.activeTexture(gl.TEXTURE2); gl.bindTexture(gl.TEXTURE_2D, this.grunge); gl.uniform1i(this.loc.uGrunge, 2);
    gl.uniform1f(this.loc.uGrungeAmt, GRUNGE_AMT);
    gl.uniform2f(this.loc.uTexel, 1 / this.fieldW, 1 / this.fieldH);
    gl.uniform2f(this.loc.uLight, lx, ly);
    gl.uniform1f(this.loc.uLightZ, lz);
    gl.uniform1f(this.loc.uDepth, p.depth);
    gl.uniform1f(this.loc.uHi, p.highlight);
    gl.uniform1f(this.loc.uSh, p.shadow);
    gl.uniform1f(this.loc.uContrast, p.contrast);
    gl.uniform1f(this.loc.uBright, p.bright);
    gl.uniform3f(this.loc.uTint, p.tint[0], p.tint[1], p.tint[2]);
    gl.uniform2f(this.loc.uTexOff, p.texOffset[0], p.texOffset[1]);
    gl.uniform1f(this.loc.uTexScale, p.texScale);
    gl.uniform1f(this.loc.uReveal, 1);
    gl.uniform1f(this.loc.uAspect, this.w / Math.max(1, this.h));
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    if (!this.painted) { this.painted = true; this.canvas.style.opacity = "1"; }
  }

  destroy() {
    if (this.raf) cancelAnimationFrame(this.raf);
    const gl = this.gl;
    if (gl) {
      [this.field, this.plaster, this.grunge].forEach((t) => t && gl.deleteTexture(t));
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    }
    this.canvas.remove();
  }
}

```

### emboss/playground.tsx
```tsx
"use client";

// Emboss playground — the detail-page editor. One live panel you press a word AND/OR
// an SVG into, with full control over the bevel (depth/size/soften), light
// (angle/altitude/highlight+shadow), and surface (texture/contrast/tint). Load one of
// the presets as a starting point, then tweak. Built from the shared Vault control kit
// so it matches the site.

import { useEffect, useMemo, useRef, useState } from "react";
import { EmbossPlayground } from "./pg-engine";
import { defaultParams, remixParams, type EmbossParams } from "./params";
import { BUILTIN_SVGS, type Content } from "./content-mask";
import {
  PG_PREVIEW, PG_PANEL, Slider, ColorControl, GhostButton, SegmentedControl, Select,
} from "../swirl/controls";
import { SectionLabel } from "../section-label";
import { hapticTap } from "../../lib/haptics";

const LABEL = "text-[12px] text-[var(--text-tertiary)]";

// rgb 0..1 <-> #hex for the ColorControl (which speaks hex)
const toHex = (c: [number, number, number]) =>
  "#" + c.map((v) => Math.round(v * 255).toString(16).padStart(2, "0")).join("");
const fromHex = (h: string): [number, number, number] => {
  const n = h.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2) || "0", 16) / 255) as [number, number, number];
};

export function EmbossPlayground_() {
  const hostRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<EmbossPlayground | null>(null);

  const [params, setParams] = useState<EmbossParams>(() => defaultParams());
  const [mode, setMode] = useState<"text" | "image">("text");
  const [word, setWord] = useState("emboss");
  const [shapeId, setShapeId] = useState(BUILTIN_SVGS[0].id);
  const [svg, setSvg] = useState<string | null>(BUILTIN_SVGS[0].svg);
  const fileRef = useRef<HTMLInputElement>(null);

  // In text mode only the word presses; in image mode only the SVG presses.
  const content: Content = useMemo(
    () => (mode === "text" ? { word, svg: null } : { word: "", svg }),
    [mode, word, svg],
  );

  // Mount the engine only when the playground scrolls into view. On the detail page
  // the emboss hero card is already spinning up its own WebGL build during the
  // view-transition morph; deferring the (also heavy) playground build until it is
  // actually near the viewport keeps the morph smooth and avoids two CPU height-field
  // builds racing at once.
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let raf = 0;
    let started = false;
    const build = () => {
      if (started) return;
      started = true;
      raf = requestAnimationFrame(() => {
        const eng = new EmbossPlayground(host, params, content);
        if (!eng.ok) return;
        engineRef.current = eng;
        // warm Neue Corp then refresh
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
        if (es[0]?.isIntersecting) {
          io.disconnect();
          build();
        }
      },
      { rootMargin: "200px" }, // start just before it scrolls in
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

  // push params/content to the engine
  useEffect(() => { engineRef.current?.setParams(params); }, [params]);
  useEffect(() => { engineRef.current?.setContent(content); }, [content]);

  const patch = (p: Partial<EmbossParams>) => setParams((prev) => ({ ...prev, ...p }));

  const remix = () => {
    hapticTap();
    setParams(remixParams());
  };

  // Shape dropdown: the built-ins plus an "Upload SVG…" entry that opens the picker.
  const shapeOptions = [
    ...BUILTIN_SVGS.map((s) => ({ id: s.id, label: s.name })),
    { id: "upload", label: "Upload SVG…" },
  ];
  const pickShape = (id: string) => {
    if (id === "upload") {
      fileRef.current?.click();
      return;
    }
    const s = BUILTIN_SVGS.find((b) => b.id === id);
    if (s) { setShapeId(id); setSvg(s.svg); }
  };
  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      hapticTap();
      setShapeId("upload");
      setSvg(String(reader.result || ""));
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <SectionLabel
        action={<GhostButton onClick={remix}>Remix</GhostButton>}
      >
        Playground
      </SectionLabel>

      {/* live preview */}
      <div className={`${PG_PREVIEW} aspect-[1344/620] w-full`}>
        <div ref={hostRef} data-canvas-card className="absolute inset-0 h-full w-full" />
      </div>

      {/* controls */}
      <div className={PG_PANEL}>
        {/* content: stacks on mobile (label above, controls full-width); on sm+ it's
            one row with the toggle + input/dropdown pushed to the right. */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <span className={`${LABEL} shrink-0`}>Content</span>
          <div className="flex items-center gap-2 sm:ml-auto">
            <div className="w-[130px] shrink-0 sm:w-[140px]">
              <SegmentedControl
                activeId={mode}
                onPick={(id) => setMode(id as "text" | "image")}
                options={[
                  { id: "text", label: "Text" },
                  { id: "image", label: "Image" },
                ]}
              />
            </div>
            {mode === "text" ? (
              <input
                value={word}
                onChange={(e) => setWord(e.target.value)}
                placeholder="type a word"
                maxLength={16}
                className="h-8 min-w-0 flex-1 rounded-lg border border-[var(--border-line)] bg-[var(--bg-page)] px-3 text-[12px] text-[var(--text-primary)] outline-none transition-colors duration-150 ease-[var(--ease-out)] placeholder:text-[var(--text-tertiary)] hover:border-[var(--border-ring)] focus:border-[var(--border-ring)] sm:w-[150px] sm:flex-none"
              />
            ) : (
              <div className="min-w-0 flex-1 sm:w-[150px] sm:flex-none">
                <Select
                  activeId={shapeId}
                  onPick={pickShape}
                  options={shapeOptions}
                  ariaLabel="Shape"
                />
                <input
                  ref={fileRef}
                  type="file"
                  accept=".svg,image/svg+xml"
                  onChange={onUpload}
                  className="hidden"
                />
              </div>
            )}
          </div>
        </div>

        {/* two columns: Bevel+Light | Surface */}
        <div className="grid grid-cols-1 items-start gap-x-6 gap-y-5 sm:grid-cols-2">
          <div className="flex flex-col gap-3 self-start">
            <span className={LABEL}>Bevel</span>
            <Slider label="Depth" value={params.depth} min={0.2} max={2} step={0.01}
              format={(v) => v.toFixed(2)} onChange={(v) => patch({ depth: v })} />
            <Slider label="Size" value={params.size} min={1} max={24} step={0.5}
              format={(v) => `${v.toFixed(1)}px`} onChange={(v) => patch({ size: v })} />
            <Slider label="Soften" value={params.soften} min={0} max={12} step={0.5}
              format={(v) => `${v.toFixed(1)}px`} onChange={(v) => patch({ soften: v })} />
          </div>

          <div className="flex flex-col gap-3">
            <span className={LABEL}>Light</span>
            <Slider label="Angle" value={params.angle} min={0} max={360} step={1}
              format={(v) => `${v | 0}°`} onChange={(v) => patch({ angle: v })} />
            <Slider label="Altitude" value={params.altitude} min={0} max={90} step={1}
              format={(v) => `${v | 0}°`} onChange={(v) => patch({ altitude: v })} />
            <Slider label="Highlight" value={params.highlight} min={0} max={0.6} step={0.01}
              format={(v) => `${(v * 100) | 0}%`} onChange={(v) => patch({ highlight: v })} />
            <Slider label="Shadow" value={params.shadow} min={0} max={0.6} step={0.01}
              format={(v) => `${(v * 100) | 0}%`} onChange={(v) => patch({ shadow: v })} />
          </div>

          <div className="flex flex-col gap-3 sm:col-span-2">
            <span className={LABEL}>Surface</span>
            <div className="grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              <Slider label="Brightness" value={params.bright} min={0.8} max={2.4} step={0.01}
                format={(v) => v.toFixed(2)} onChange={(v) => patch({ bright: v })} />
              <Slider label="Grain" value={params.contrast} min={0} max={1.4} step={0.01}
                format={(v) => v.toFixed(2)} onChange={(v) => patch({ contrast: v })} />
              <Slider label="Texture zoom" value={params.texScale} min={0.4} max={2.4} step={0.01}
                format={(v) => `${v.toFixed(2)}×`} onChange={(v) => patch({ texScale: v })} />
              <ColorControl
                label="Tint"
                value={toHex(params.tint)}
                onChange={(hex) => patch({ tint: fromHex(hex) })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

```18:["$","div",null,{"className":"py-24","children":[["$","script",null,{"type":"application/ld+json","suppressHydrationWarning":true,"dangerouslySetInnerHTML":{"__html":"[{\"@context\":\"https://schema.org\",\"@type\":\"TechArticle\",\"headline\":\"Realistic emboss\",\"url\":\"https://arlan.me/vault/emboss\",\"image\":\"/vault/emboss-plaster.webp\",\"datePublished\":\"Jul 13, 2026\",\"about\":\"Study\",\"keywords\":\"WebGL, Emboss, Texture\",\"author\":{\"@type\":\"Person\",\"name\":\"Arlan Marat\",\"url\":\"https://arlan.me\"},\"isPartOf\":{\"@type\":\"CollectionPage\",\"name\":\"Vault\",\"url\":\"https://arlan.me/vault\"}},{\"@context\":\"https://schema.org\",\"@type\":\"BreadcrumbList\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Vault\",\"item\":\"https://arlan.me/vault\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Realistic emboss\",\"item\":\"https://arlan.me/vault/emboss\"}]}]"}}],["$","article",null,{"className":"flex min-w-0 flex-col gap-10 text-[15px] leading-[1.7]","children":[["$","header",null,{"style":{"viewTransitionName":"vault-detail-head"},"className":"flex items-center justify-between gap-4","children":[["$","h1",null,{"className":"font-semibold text-[var(--text-primary)]","children":"Realistic emboss"}],["$","$L22",null,{"href":"/vault"}]]}],[["$","$L23",null,{"moduleIds":[41417]}],"$L24"],false,["$","div",null,{"style":{"viewTransitionName":"vault-detail-body"},"className":"flex min-w-0 flex-col gap-14","children":[["$","div",null,{"className":"flex flex-col gap-3","children":[["$","p","0",{"className":"text-pretty text-[var(--text-primary)]","children":[["$","$1","0",{"children":"Really liked the emboss effect people do, so I replicated it in web."}]]}],["$","p","1",{"className":"text-pretty text-[var(--text-primary)]","children":[["$","$1","0",{"children":"Type your own word or drop an SVG, then play with the depth, the light, and the surface until it feels right. The presets are good places to start."}]]}]]}],["$","$L25",null,{"children":[["$","$L26",null,{"playground":"emboss"}],["$","section",null,{"className":"flex min-w-0 flex-col gap-3","children":[["$","header",null,{"className":"flex items-center justify-between gap-3 pb-2 border-b border-[var(--border-line)]","children":[["$","h2",null,{"className":"font-semibold text-[var(--text-primary)]","children":"Code"}],["$","$L27",null,{"text":"$28","label":"Copy prompt","hideIcon":true,"className":"inline-flex h-7 shrink-0 items-center self-start rounded-lg border border-[var(--border-line)] bg-[var(--bg-surface)] px-3 text-[12px] font-medium text-[var(--text-secondary)] transition-colors duration-150 ease-[var(--ease-out)] hover:bg-[var(--bg-hover)] hover:border-[var(--border-ring)] hover:text-[var(--text-primary)] active:scale-[0.98]"}]]}],"$L29"]}],"$L2a","$L2b"]}]]}],"$L2c"]}]]}]
