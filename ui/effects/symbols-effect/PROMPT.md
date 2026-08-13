<!-- Verbatim "Copy prompt" payload from sandbox; includes the full source inline. -->

You are given the complete source for a self-contained web visual: "Symbols effect".

What it is:
- Drop in an image or a video and it gets cut into four brightness bands. Each band is stamped with a tiny symbol, tinted with its own colour, so the picture is rebuilt out of little marks. It all runs on the GPU, so video plays through it live.
- The symbols, the colours and where the bands split are yours to change. When it looks right you can save a still as a PNG or record the whole thing as a video.
- It runs entirely in the browser, nothing gets uploaded, and you can grab the code below and drop the renderer into your own project.

How to use this code:
- It is a React + TypeScript component tree (Next.js App Router) that renders to an HTML canvas; the entry point is the playground component.
- Drop the files into a project under the same relative paths, mount the playground component, and it runs as-is. No external assets beyond what's inline.
- To adapt it: change the resolved word/logo, the color controls, or the experiment parameters. Ask me to modify, explain, or port any part.

The full source follows, one file per block:

### sandbox/shaders.ts
```ts
// Symbols effect shader — authored from first principles. A photo or video frame is
// pixelated into a grid of cells; each cell's luminance is bucketed into one of four
// brightness bands; and that band's symbol glyph (tiled once per cell) is stamped,
// tinted with the band's colour over a white ground. The result is a halftone built
// out of little marks.

export const SANDBOX_VERT = /* glsl */ `
precision highp float;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const SANDBOX_FRAG = /* glsl */ `
precision highp float;
varying vec2 vUv;

uniform sampler2D src;
uniform vec2 resolution;
uniform vec2 srcScale;     // cover-crop of the source (<=1 on the cropped axis)
uniform float zoom;        // user zoom: >1 scales the source up, <1 shrinks it
uniform vec3 bgColor;      // colour shown around a shrunk source (the background)
uniform float cell;        // pixel cell size (px)

uniform vec3 bandColor[4];  // current colour per brightness band (the "to" preset)
uniform vec3 bandColorB[4]; // previous colour per band (the "from" preset)
uniform float bandLo[4];    // band lower bound (inclusive)
uniform float bandHi[4];    // band upper bound (inclusive)
uniform sampler2D glyph[4];  // current symbol per band
uniform sampler2D glyphB[4]; // previous symbol per band
uniform float morphT;        // 0 = fully previous, 1 = fully current (crossfade)

float lum(vec3 c) { return dot(c, vec3(0.2126, 0.7152, 0.0722)); }

// map a full-frame uv into the COVER-cropped + user-zoomed source (centred). zoom
// >1 magnifies; zoom <1 shrinks the source so background shows around it.
vec2 cover(vec2 uv) {
  return (uv - 0.5) * srcScale / zoom + 0.5;
}

// snap a uv to the centre of its cell, so a whole cell reads one source colour
vec2 cellUV(vec2 step) {
  return floor(vUv / step) * step + step * 0.5;
}

vec4 sampleGlyph(int i, vec2 uv) {
  if (i == 0) return texture2D(glyph[0], uv);
  if (i == 1) return texture2D(glyph[1], uv);
  if (i == 2) return texture2D(glyph[2], uv);
  return texture2D(glyph[3], uv);
}
vec4 sampleGlyphB(int i, vec2 uv) {
  if (i == 0) return texture2D(glyphB[0], uv);
  if (i == 1) return texture2D(glyphB[1], uv);
  if (i == 2) return texture2D(glyphB[2], uv);
  return texture2D(glyphB[3], uv);
}

void main() {
  vec3 paper = vec3(1.0);
  vec2 step = vec2(cell) / resolution;

  // sample the source at this cell's centre. If the sample falls outside the source
  // — including a 1px inset to avoid the clamped edge column that smears into a thin
  // line, and the area around a shrunk/zoomed source — fill with the background
  // colour instead of black, so a scaled-down video sits on a clean ground.
  vec2 suv = cover(cellUV(step));
  vec2 inset = 1.0 / resolution;
  if (suv.x < inset.x || suv.x > 1.0 - inset.x ||
      suv.y < inset.y || suv.y > 1.0 - inset.y) {
    gl_FragColor = vec4(bgColor, 1.0);
    return;
  }
  float l = lum(texture2D(src, suv).rgb);

  gl_FragColor = vec4(paper, 1.0);
  for (int i = 0; i < 4; i++) {
    if (l >= bandLo[i] && l <= bandHi[i]) {
      vec2 gUv = mod(vUv / step, vec2(1.0));   // glyph repeats once per cell
      // crossfade the glyph alpha AND the band colour from the previous preset
      // (B) to the current one, by morphT — so a remix dissolves smoothly.
      vec4 gA = sampleGlyph(i, gUv);
      vec4 gB = sampleGlyphB(i, gUv);
      float a = mix(gB.a, gA.a, morphT);
      vec3 gcol = mix(gB.rgb, gA.rgb, morphT);
      vec3 col = mix(bandColorB[i], bandColor[i], morphT);
      vec3 sym = mix(paper, gcol, a);          // glyph over paper
      float k = smoothstep(0.0, 1.0, lum(sym));
      gl_FragColor = vec4(mix(col, paper, k), 1.0);
    }
  }
}
`;

```

### sandbox/glyphs.ts
```ts
// A small set of geometric symbol glyphs, drawn from scratch as 2D-canvas paths on
// a 32x32 grid. Used by the "symbols" effect: each brightness band stamps one of
// these tiled across the image, tinted with the band's colour. Authored here (not
// imported) so the set is fully self-contained and easy to extend.

export type GlyphDraw = (ctx: CanvasRenderingContext2D, s: number) => void;

const C = 16; // centre of the 32 grid (scaled to `s` at draw time)

// Each glyph is a function that paints a black shape on a transparent square. The
// caller scales the context so coordinates are in the 0..32 design space.
export const GLYPHS: { name: string; draw: GlyphDraw }[] = [
  { name: "empty", draw: () => {} },

  {
    name: "dot",
    draw: (ctx) => {
      ctx.beginPath();
      ctx.arc(C, C, 5, 0, Math.PI * 2);
      ctx.fill();
    },
  },
  {
    name: "ring",
    draw: (ctx) => {
      ctx.beginPath();
      ctx.arc(C, C, 9, 0, Math.PI * 2);
      ctx.arc(C, C, 5.5, 0, Math.PI * 2, true);
      ctx.fill("evenodd");
    },
  },
  {
    name: "square",
    draw: (ctx) => {
      ctx.fillRect(C - 7, C - 7, 14, 14);
    },
  },
  {
    name: "frame",
    draw: (ctx) => {
      ctx.beginPath();
      ctx.rect(C - 9, C - 9, 18, 18);
      ctx.rect(C - 5, C - 5, 10, 10);
      ctx.fill("evenodd");
    },
  },
  {
    name: "diagonal",
    draw: (ctx) => {
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(6, 26);
      ctx.lineTo(26, 6);
      ctx.stroke();
    },
  },
  {
    name: "cross",
    draw: (ctx) => {
      ctx.lineWidth = 5;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(7, 7);
      ctx.lineTo(25, 25);
      ctx.moveTo(25, 7);
      ctx.lineTo(7, 25);
      ctx.stroke();
    },
  },
  {
    name: "plus",
    draw: (ctx) => {
      ctx.fillRect(C - 2.5, 5, 5, 22);
      ctx.fillRect(5, C - 2.5, 22, 5);
    },
  },
  {
    name: "chevron",
    draw: (ctx) => {
      ctx.lineWidth = 5;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(8, 10);
      ctx.lineTo(C, 22);
      ctx.lineTo(24, 10);
      ctx.stroke();
    },
  },
  {
    name: "triangle",
    draw: (ctx) => {
      ctx.beginPath();
      ctx.moveTo(C, 6);
      ctx.lineTo(26, 25);
      ctx.lineTo(6, 25);
      ctx.closePath();
      ctx.fill();
    },
  },
  {
    name: "diamond",
    draw: (ctx) => {
      ctx.beginPath();
      ctx.moveTo(C, 5);
      ctx.lineTo(27, C);
      ctx.lineTo(C, 27);
      ctx.lineTo(5, C);
      ctx.closePath();
      ctx.fill();
    },
  },
  {
    name: "bars",
    draw: (ctx) => {
      ctx.fillRect(7, 6, 4, 20);
      ctx.fillRect(14, 6, 4, 20);
      ctx.fillRect(21, 6, 4, 20);
    },
  },
  {
    name: "hexagon",
    draw: (ctx) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i - Math.PI / 6;
        const x = C + Math.cos(a) * 11;
        const y = C + Math.sin(a) * 11;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
    },
  },
  {
    name: "star",
    draw: (ctx) => {
      ctx.beginPath();
      for (let i = 0; i < 10; i++) {
        const r = i % 2 === 0 ? 12 : 5;
        const a = (Math.PI / 5) * i - Math.PI / 2;
        const x = C + Math.cos(a) * r;
        const y = C + Math.sin(a) * r;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
    },
  },
  {
    name: "heart",
    draw: (ctx) => {
      ctx.beginPath();
      ctx.moveTo(16, 26);
      ctx.bezierCurveTo(2, 16, 6, 6, 16, 12);
      ctx.bezierCurveTo(26, 6, 30, 16, 16, 26);
      ctx.closePath();
      ctx.fill();
    },
  },
  {
    name: "drop",
    draw: (ctx) => {
      ctx.beginPath();
      ctx.moveTo(16, 5);
      ctx.bezierCurveTo(24, 15, 26, 20, 16, 27);
      ctx.bezierCurveTo(6, 20, 8, 15, 16, 5);
      ctx.closePath();
      ctx.fill();
    },
  },
  {
    name: "flower",
    draw: (ctx) => {
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i;
        ctx.beginPath();
        ctx.ellipse(C + Math.cos(a) * 7, C + Math.sin(a) * 7, 4.5, 4.5, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    },
  },
  {
    name: "asterisk",
    draw: (ctx) => {
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      for (let i = 0; i < 3; i++) {
        const a = (Math.PI / 3) * i;
        ctx.beginPath();
        ctx.moveTo(C - Math.cos(a) * 11, C - Math.sin(a) * 11);
        ctx.lineTo(C + Math.cos(a) * 11, C + Math.sin(a) * 11);
        ctx.stroke();
      }
    },
  },
  {
    name: "spark",
    draw: (ctx) => {
      ctx.beginPath();
      const pts = [
        [16, 3], [19, 13], [29, 16], [19, 19],
        [16, 29], [13, 19], [3, 16], [13, 13],
      ];
      pts.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
      ctx.closePath();
      ctx.fill();
    },
  },
  {
    name: "pentagon",
    draw: (ctx) => {
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const a = (Math.PI * 2 / 5) * i - Math.PI / 2;
        const x = C + Math.cos(a) * 11;
        const y = C + Math.sin(a) * 11;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
    },
  },
  {
    name: "donut",
    draw: (ctx) => {
      ctx.beginPath();
      ctx.arc(C, C, 11, 0, Math.PI * 2);
      ctx.arc(C, C, 4, 0, Math.PI * 2, true);
      ctx.fill("evenodd");
    },
  },
  {
    name: "halfmoon",
    draw: (ctx) => {
      ctx.beginPath();
      ctx.arc(C, C, 11, 0, Math.PI * 2);
      ctx.arc(C + 6, C - 3, 10, 0, Math.PI * 2, true);
      ctx.fill("evenodd");
    },
  },
  {
    name: "arrow",
    draw: (ctx) => {
      ctx.lineWidth = 4;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(7, 16);
      ctx.lineTo(23, 16);
      ctx.moveTo(16, 9);
      ctx.lineTo(23, 16);
      ctx.lineTo(16, 23);
      ctx.stroke();
    },
  },
  {
    name: "wave",
    draw: (ctx) => {
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(5, 16);
      ctx.quadraticCurveTo(11, 7, 16, 16);
      ctx.quadraticCurveTo(21, 25, 27, 16);
      ctx.stroke();
    },
  },
];

// Render a glyph to an offscreen canvas (black shape, transparent ground) so it can
// become a repeating texture.
export function glyphCanvas(index: number, size = 64): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  ctx.clearRect(0, 0, size, size);
  const g = GLYPHS[index];
  if (g) {
    const scale = size / 32;
    ctx.save();
    ctx.scale(scale, scale);
    ctx.fillStyle = "#000";
    ctx.strokeStyle = "#000";
    g.draw(ctx, 32);
    ctx.restore();
  }
  return c;
}

```

### sandbox/standalone/SymbolsEffect.ts
```ts
// A minimal, self-contained version of the Symbols effect renderer — the core idea
// with none of the playground machinery (no preset pool, preloading, remix
// crossfade, or recording). This is what's shown in the Code tabs so the effect
// reads clearly; the live playground uses a fuller version of the same shader.
//
// Build a full-frame quad, sample the source per cell, bucket its luminance into a
// band, and stamp that band's glyph tinted with its colour over white paper.

import * as THREE from "three";
import { SANDBOX_VERT, SANDBOX_FRAG } from "../shaders";
import { glyphCanvas } from "../glyphs";

export interface SymbolsParams {
  cell: number; // pixel cell size
  bandColors: string[]; // 4 hex colours, dark band → light band
  bandStops: number[]; // 5 stops → 4 luminance bands
  bandGlyphs: number[]; // 4 glyph indices (0 = empty)
  zoom?: number; // source zoom (1 = fill)
  bg?: string; // background colour around a shrunk source
}

export class SymbolsEffect {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  private uniforms: Record<string, { value: unknown }>;
  private canvas: HTMLCanvasElement;
  private srcAspect = 1;
  private video: HTMLVideoElement | null = null;
  private raf = 0;
  private reqCell: number; // requested cell size (CSS px @ the 600px ref width)

  constructor(canvas: HTMLCanvasElement, p: SymbolsParams) {
    this.canvas = canvas;
    this.reqCell = p.cell;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    this.renderer.setClearColor(new THREE.Color(p.bg ?? "#ffffff"), 1);

    const glyph = (i: number) => {
      const t = new THREE.CanvasTexture(glyphCanvas(i));
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      return t;
    };
    const col = p.bandColors.map((h) => new THREE.Color(h));

    this.uniforms = {
      src: { value: new THREE.Texture() },
      resolution: { value: new THREE.Vector2(1, 1) },
      srcScale: { value: new THREE.Vector2(1, 1) },
      zoom: { value: p.zoom ?? 1 },
      bgColor: { value: new THREE.Color(p.bg ?? "#ffffff") },
      cell: { value: p.cell },
      bandColor: { value: col },
      bandColorB: { value: col.map((c) => c.clone()) },
      bandLo: { value: [p.bandStops[0], p.bandStops[1], p.bandStops[2], p.bandStops[3]] },
      bandHi: { value: [p.bandStops[1], p.bandStops[2], p.bandStops[3], p.bandStops[4]] },
      glyph: { value: p.bandGlyphs.map(glyph) },
      glyphB: { value: p.bandGlyphs.map(glyph) },
      morphT: { value: 1 },
    };

    const mat = new THREE.ShaderMaterial({
      vertexShader: SANDBOX_VERT,
      fragmentShader: SANDBOX_FRAG,
      uniforms: this.uniforms,
    });
    this.scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat));
    this.resize();
  }

  // COVER fit: the quad always fills the frame; we crop the SOURCE sampling instead
  // (a uv scale) so there are never black bars.
  private fit() {
    const r = this.canvas.getBoundingClientRect();
    const ca = r.width / Math.max(1, r.height);
    let ux = 1;
    let uy = 1;
    if (this.srcAspect > ca) ux = ca / this.srcAspect;
    else uy = this.srcAspect / ca;
    (this.uniforms.srcScale.value as THREE.Vector2).set(ux, uy);
  }

  resize = () => {
    const r = this.canvas.getBoundingClientRect();
    const w = Math.max(1, r.width);
    const h = Math.max(1, r.height);
    this.renderer.setSize(w, h, false);
    (this.uniforms.resolution.value as THREE.Vector2).set(w, h);
    // scale the cell with the card width (ref 600px) so a narrow mobile card keeps
    // roughly the same cell density as a wide desktop one, not chunkier cells.
    this.uniforms.cell.value = Math.max(2, this.reqCell * (w / 600));
    this.fit();
    this.render();
  };

  render = () => this.renderer.render(this.scene, this.camera);

  setImage(url: string) {
    new THREE.TextureLoader().load(url, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      this.uniforms.src.value = tex;
      this.srcAspect = tex.image.width / tex.image.height;
      this.video = null;
      this.fit();
      this.render();
    });
  }

  setVideo(url: string) {
    const v = document.createElement("video");
    v.src = url;
    v.loop = v.muted = v.playsInline = true;
    const tex = new THREE.VideoTexture(v);
    tex.colorSpace = THREE.SRGBColorSpace;
    v.addEventListener("loadeddata", () => {
      this.uniforms.src.value = tex;
      this.srcAspect = v.videoWidth / v.videoHeight || 1;
      this.video = v;
      this.fit();
      v.play();
      this.loop();
    });
    v.load();
  }

  private loop = () => {
    if (!this.video) return;
    this.render();
    this.raf = requestAnimationFrame(this.loop);
  };

  dispose() {
    cancelAnimationFrame(this.raf);
    this.video?.pause();
    this.renderer.dispose();
  }
}

```18:["$","div",null,{"className":"py-24","children":[["$","script",null,{"type":"application/ld+json","suppressHydrationWarning":true,"dangerouslySetInnerHTML":{"__html":"[{\"@context\":\"https://schema.org\",\"@type\":\"TechArticle\",\"headline\":\"Symbols effect\",\"url\":\"https://arlan.me/vault/sandbox\",\"image\":\"/vault/sandbox.svg\",\"datePublished\":\"Jun 28, 2026\",\"about\":\"Personal\",\"keywords\":\"WebGL, Halftone, Shaders\",\"author\":{\"@type\":\"Person\",\"name\":\"Arlan Marat\",\"url\":\"https://arlan.me\"},\"isPartOf\":{\"@type\":\"CollectionPage\",\"name\":\"Vault\",\"url\":\"https://arlan.me/vault\"}},{\"@context\":\"https://schema.org\",\"@type\":\"BreadcrumbList\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Vault\",\"item\":\"https://arlan.me/vault\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Symbols effect\",\"item\":\"https://arlan.me/vault/sandbox\"}]}]"}}],["$","article",null,{"className":"flex min-w-0 flex-col gap-10 text-[15px] leading-[1.7]","children":[["$","header",null,{"style":{"viewTransitionName":"vault-detail-head"},"className":"flex items-center justify-between gap-4","children":[["$","h1",null,{"className":"font-semibold text-[var(--text-primary)]","children":"Symbols effect"}],["$","$L22",null,{"href":"/vault"}]]}],null,false,["$","div",null,{"style":{"viewTransitionName":"vault-detail-body"},"className":"flex min-w-0 flex-col gap-14","children":[["$","div",null,{"className":"flex flex-col gap-3","children":[["$","p","0",{"className":"text-pretty text-[var(--text-primary)]","children":[["$","$1","0",{"children":"Drop in an image or a video and it gets cut into four brightness bands. Each band is stamped with a tiny symbol, tinted with its own colour, so the picture is rebuilt out of little marks. It all runs on the GPU, so video plays through it live."}]]}],["$","p","1",{"className":"text-pretty text-[var(--text-primary)]","children":[["$","$1","0",{"children":"The symbols, the colours and where the bands split are yours to change. When it looks right you can save a still as a PNG or record the whole thing as a video."}]]}],["$","p","2",{"className":"text-pretty text-[var(--text-primary)]","children":[["$","$1","0",{"children":"It runs entirely in the browser, nothing gets uploaded, and you can grab the code below and drop the renderer into your own project."}]]}]]}],["$","$L23",null,{"children":[["$","$L24",null,{"playground":"sandbox"}],["$","section",null,{"className":"flex min-w-0 flex-col gap-3","children":[["$","header",null,{"className":"flex items-center justify-between gap-3 pb-2 border-b border-[var(--border-line)]","children":[["$","h2",null,{"className":"font-semibold text-[var(--text-primary)]","children":"Code"}],["$","$L25",null,{"text":"$26","label":"Copy prompt","hideIcon":true,"className":"inline-flex h-7 shrink-0 items-center self-start rounded-lg border border-[var(--border-line)] bg-[var(--bg-surface)] px-3 text-[12px] font-medium text-[var(--text-secondary)] transition-colors duration-150 ease-[var(--ease-out)] hover:bg-[var(--bg-hover)] hover:border-[var(--border-ring)] hover:text-[var(--text-primary)] active:scale-[0.98]"}]]}],"$L27"]}],"$L28","$L29"]}]]}],"$L2a"]}]]}]
