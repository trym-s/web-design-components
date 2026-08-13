<!-- Verbatim "Copy prompt" payload from squircle; includes the full source inline. -->

You are given the complete source for a self-contained web visual: "Apple's corners".

What it is:
- A normal rounded corner has a tiny kink where it meets the flat edge. You feel it before you can name it. Apple fixes this with a squircle, a corner that eases in smooth. Here is the real one on a live button you can play with.

How to use this code:
- It is a React + TypeScript component tree (Next.js App Router) that renders to an HTML canvas; the entry point is the playground component.
- Drop the files into a project under the same relative paths, mount the playground component, and it runs as-is. No external assets beyond what's inline.
- To adapt it: change the resolved word/logo, the color controls, or the experiment parameters. Ask me to modify, explain, or port any part.
- Original inspiration: https://www.figma.com/blog/desperately-seeking-squircles/

The full source follows, one file per block:

### squircle/superellipse.ts
```ts
// Squircle path generator. A border-radius is one circular arc per corner, and
// the arc meets the straight edge at a hard tangent, so curvature jumps 0→max in
// one step. A squircle is the superellipse |x|ⁿ+|y|ⁿ=1, where curvature ramps in
// continuously and the corner flows into the edge with no kink. We emit it as an
// SVG path and apply it with `clip-path: path(...)`.

export interface SquircleOptions {
  width: number;
  height: number;
  /** Corner radius in px (clamped to half the shorter side). */
  radius: number;
  /** Corner extent along the edge (0..1). 1 = full corner, ~0.6 is a common look. */
  smoothing: number;
  /** Superellipse exponent n: 2 = circle, ~5 = classic squircle, higher = boxier. */
  exponent?: number;
}

const DEFAULT_EXPONENT = 5;

const n = (v: number) => v.toFixed(4);

// A three-cubic-bézier fit of one superellipse corner at the default exponent, on
// a unit box: it starts at the top edge (0,0), ends at the side edge (1,1), and is
// symmetric across the (1,0)-(0,1) diagonal. Each row is [control1, control2, end];
// segment 0 starts at (0,0), each next segment starts where the previous ended.
const CORNER: readonly [number, number][][] = [
  [ [0.3, 0],       [0.473, 0],     [0.619, 0.039] ],
  [ [0.804, 0.088], [0.912, 0.196], [0.961, 0.381] ],
  [ [1, 0.527],     [1, 0.7],       [1, 1] ],
];

// rotate a unit-corner point 90°·k clockwise (k = 0 top-right … 3 top-left)
function rot90([x, y]: [number, number], k: number): [number, number] {
  switch (((k % 4) + 4) % 4) {
    case 1: return [y, -x];
    case 2: return [-x, -y];
    case 3: return [-y, x];
    default: return [x, y];
  }
}

// The three cubic segments for one corner, scaled by `radius`, placed at `start`
// (where the straight edge meets the corner) and rotated by k.
function cornerCubics(sx: number, sy: number, radius: number, k: number): string {
  const put = (p: [number, number]) => {
    const [rx, ry] = rot90(p, k);
    return `${n(sx + rx * radius)} ${n(sy + ry * radius)}`;
  };
  return CORNER.map(([c1, c2, end]) => `C ${put(c1)} ${put(c2)} ${put(end)}`).join(" ");
}

// For any other exponent, sample the superellipse arc directly. In unit-corner
// coords the top-right quarter of |x|ⁿ+|y|ⁿ=1 is x = sin(θ)^(2/n),
// y = 1 - cos(θ)^(2/n) for θ ∈ [0, π/2]; 32 line segments read as smooth.
function cornerSampled(sx: number, sy: number, radius: number, k: number, exponent: number): string {
  const STEPS = 32;
  const e = 2 / exponent;
  const pts: string[] = [];
  for (let i = 1; i <= STEPS; i++) {
    const t = (i / STEPS) * (Math.PI / 2);
    const ux = Math.pow(Math.sin(t), e);
    const uy = 1 - Math.pow(Math.cos(t), e);
    const [rx, ry] = rot90([ux, uy], k);
    pts.push(`L ${n(sx + rx * radius)} ${n(sy + ry * radius)}`);
  }
  return pts.join(" ");
}

// Closed SVG path for a squircle-cornered rectangle. `smoothing` scales how far
// the corner reaches along each edge; `exponent` sets its squareness.
export function squirclePath({ width, height, radius, smoothing, exponent = DEFAULT_EXPONENT }: SquircleOptions): string {
  const budget = Math.min(width, height) / 2;
  const s = Math.max(0, Math.min(1, smoothing));
  const r = Math.max(0, Math.min(radius, budget)) * (0.4 + 0.6 * s);

  if (r <= 0) {
    return `M 0 0 L ${n(width)} 0 L ${n(width)} ${n(height)} L 0 ${n(height)} Z`;
  }

  // The bézier fit is exact at the default exponent; sample for anything else.
  const useBezier = Math.abs(exponent - DEFAULT_EXPONENT) < 0.05;
  const corner = (sx: number, sy: number, k: number) =>
    useBezier ? cornerCubics(sx, sy, r, k) : cornerSampled(sx, sy, r, k, exponent);

  return [
    `M ${n(r)} 0`,
    `L ${n(width - r)} 0`,
    corner(width - r, 0, 0),
    `L ${n(width)} ${n(height - r)}`,
    corner(width, height - r, 3),
    `L ${n(r)} ${n(height)}`,
    corner(r, height, 2),
    `L 0 ${n(r)}`,
    corner(0, r, 1),
    "Z",
  ].join(" ");
}

// The plain border-radius path for the same box (one arc per corner), drawn as a
// dashed reference in compare mode.
export function roundRectPath(w: number, h: number, r: number): string {
  const rr = Math.max(0, Math.min(r, Math.min(w, h) / 2));
  return `M ${rr} 0 L ${w - rr} 0 A ${rr} ${rr} 0 0 1 ${w} ${rr} L ${w} ${h - rr} A ${rr} ${rr} 0 0 1 ${w - rr} ${h} L ${rr} ${h} A ${rr} ${rr} 0 0 1 0 ${h - rr} L 0 ${rr} A ${rr} ${rr} 0 0 1 ${rr} 0 Z`;
}

// Pick the shape path: a plain border-radius when `plain` is set, else the
// squircle. Used so the "Compare" toggle can swap every component to a plain
// rounded rect in one place.
export function shapePath(o: SquircleOptions & { plain?: boolean }): string {
  return o.plain
    ? roundRectPath(o.width, o.height, o.radius)
    : squirclePath(o);
}

// Native one-liner (Chromium-only for now; falls back to plain border-radius).
export function nativeCornerShape(radius: number): { borderRadius: string; cornerShape: string } {
  return { borderRadius: `${radius}px`, cornerShape: "squircle" };
}

```

### squircle/tokens.ts
```ts
// One source of truth for every squircle demo, so they read as a single family
// instead of six independently hand-tuned components.
//
// Two control heights (a default and a small tier), one radius formula tied to
// the element's own height (so a 36px control and a 28px control get
// proportionally identical corners, and stay proportional as the sliders move),
// and shared text/tracking/padding.

/** Default control height (button, input, tabs, dropdown). */
export const CONTROL_H = 36;
/** Small control height (toggle, stepper key). */
export const CONTROL_H_SM = 28;

/** Corner radius as a fixed fraction of the element's own height. */
export function radiusFor(height: number): number {
  return Math.round(height * 0.42);
}

/** Shared label size and tracking, in px. Horizontal padding is `px-3` (12px). */
export const TEXT = 14;
export const TRACKING = -0.3;

```

### squircle/Squircle.tsx
```tsx
"use client";

// Renders content inside a squircle. The body is painted (as an SVG fill or a
// clipped gradient div) and the border is a stroke on the exact outline, so the
// border is never sliced in half the way `clip-path` on the container would do.
// The element measures its own box so the path always matches its size.

import { useId, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { squirclePath, roundRectPath } from "./superellipse";

export interface SquircleProps {
  radius: number;
  smoothing: number;
  /** Superellipse exponent (squareness): 2=circle, 5=squircle, higher=boxier. */
  exponent?: number;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Fill color or CSS gradient for the body. */
  fill?: string;
  /** Border color on the outline. */
  stroke?: string;
  /** Vertical gradient border (top → bottom), 2+ stops; overrides `stroke`. */
  strokeGradient?: string[];
  strokeWidth?: number;
  /** Overlay the plain border-radius outline (dashed) to show the delta. */
  compare?: boolean;
  /** Classes for the content overlay (padding, gap, text); centered by default. */
  contentClassName?: string;
}

export function Squircle({
  radius,
  smoothing,
  exponent,
  children,
  className = "",
  style,
  fill,
  stroke,
  strokeGradient,
  strokeWidth = 1,
  compare = false,
  contentClassName = "",
}: SquircleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/:/g, "");
  const [size, setSize] = useState({ w: 0, h: 0 });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      // Layout size, not getBoundingClientRect (which is scaled by any ancestor
      // transform), so the path stays matched to the box under a `scale()`.
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      setSize((p) => (p.w === w && p.h === h ? p : { w, h }));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { w, h } = size;
  // `compare` swaps the shape to a PLAIN border-radius (a single circular arc per
  // corner), so toggling it shows the ordinary rounded rect vs the squircle.
  const body = w && h
    ? compare
      ? roundRectPath(w, h, radius)
      : squirclePath({ width: w, height: h, radius, smoothing, exponent })
    : "";
  // A CSS gradient can't be an SVG fill, so it's painted on a clipped div instead.
  const isCssGradient = !!fill && /gradient\(/.test(fill);

  return (
    <div ref={ref} className={className} style={{ position: "relative", ...style }}>
      {isCssGradient && w > 0 && h > 0 && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: fill,
            clipPath: `path("${body}")`,
            WebkitClipPath: `path("${body}")`,
            zIndex: 0,
          }}
        />
      )}
      {w > 0 && h > 0 && (
        <svg
          aria-hidden
          width={w}
          height={h}
          viewBox={`0 0 ${w} ${h}`}
          style={{ position: "absolute", inset: 0, pointerEvents: "none", display: "block", zIndex: 0 }}
        >
          {fill && !isCssGradient && <path d={body} fill={fill} />}
        </svg>
      )}
      {/* Content overlay: fills the box and centers by default. */}
      {children != null && (
        <div
          className={`absolute inset-0 flex items-center justify-center ${contentClassName}`}
          style={{ zIndex: 1 }}
        >
          {children}
        </div>
      )}
      {/* Border on top of everything, clipped to the shape so only its inner half
          shows (drawn at 2× so the visible half equals strokeWidth). This keeps
          the hairline uniform on flats and corners and stops any body/shadow layer
          from painting over it. */}
      {(stroke || strokeGradient) && w > 0 && h > 0 && (
        <svg
          aria-hidden
          width={w}
          height={h}
          viewBox={`0 0 ${w} ${h}`}
          style={{ position: "absolute", inset: 0, pointerEvents: "none", display: "block", zIndex: 3 }}
        >
          <clipPath id={`sq-clip-${uid}`}>
            <path d={body} />
          </clipPath>
          {strokeGradient && (
            <linearGradient id={`sq-stroke-${uid}`} x1="0" y1="0" x2="0" y2="1">
              {strokeGradient.map((c, i) => (
                <stop key={i} offset={i / (strokeGradient.length - 1)} stopColor={c} />
              ))}
            </linearGradient>
          )}
          <path
            d={body}
            fill="none"
            stroke={strokeGradient ? `url(#sq-stroke-${uid})` : stroke}
            strokeWidth={strokeWidth * 2}
            clipPath={`url(#sq-clip-${uid})`}
          />
        </svg>
      )}
    </div>
  );
}

```

### squircle/parts.tsx
```tsx
"use client";

// Squircle demo components, all sharing one glossy neutral surface.
//
// GlossySquircle is a deep stack of ~18 very low-opacity greyscale layers, each
// clipped to the squircle so it follows the corner:
//   surface: porcelain gradient · corner vignette · centre glow · fine grain ·
//            brushed streaks · diagonal light sweep · middle sheen band
//   light:   side edge-lights · top sheen · glass rim · bottom counter-sheen ·
//            light lift · grounding shadow
//   edge:    tri-stop bevel border · inner shadow wall · fresnel edge-brighten ·
//            ambient-occlusion ring · corner glints · double outer hairline
// The button, chat bubbles and segmented control are all built on it, so they read
// as one material.

import { useId, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Squircle } from "./Squircle";
import { shapePath } from "./superellipse";
import { CONTROL_H, CONTROL_H_SM, radiusFor, TEXT, TRACKING } from "./tokens";

interface Shape {
  radius: number;
  smoothing: number;
  /** Superellipse exponent (squareness): 2=circle, 5=squircle, higher=boxier. */
  exponent?: number;
  compare?: boolean;
}

// The glossy neutral surface. Pass a fixed size (w/h in px) OR omit them to size to
// content — it measures its own box and clips every gloss layer to the exact
// squircle of that size. Give it the corner params + content.
function GlossySquircle({
  w,
  h,
  radius,
  smoothing,
  exponent,
  compare,
  children,
  className = "",
  contentClassName,
  interactive = true,
}: Shape & {
  w?: number;
  h?: number;
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
  /** press feedback (scale + shimmer). Off for passive surfaces like AI bubbles. */
  interactive?: boolean;
}) {
  const auto = w === undefined || h === undefined;
  const measureRef = useRef<HTMLSpanElement>(null);
  const [size, setSize] = useState({ w: w ?? 0, h: h ?? 0 });
  useLayoutEffect(() => {
    if (!auto) return;
    const el = measureRef.current;
    if (!el) return;
    const m = () => setSize((p) =>
      p.w === el.offsetWidth && p.h === el.offsetHeight ? p : { w: el.offsetWidth, h: el.offsetHeight });
    m();
    const ro = new ResizeObserver(m);
    ro.observe(el);
    return () => ro.disconnect();
  }, [auto]);

  const cw = auto ? size.w : (w as number);
  const ch = auto ? size.h : (h as number);
  const clip = cw && ch ? `path("${shapePath({ width: cw, height: ch, radius, smoothing, exponent, plain: compare })}")` : "none";
  const layer = (style: CSSProperties) => (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{ clipPath: clip, WebkitClipPath: clip, ...style }}
    />
  );

  // double outer hairline only (faint dark contact ring, near-white cut), no shadow
  const HAIRLINE =
    "drop-shadow(0 0 0.5px rgba(0,0,0,0.18)) drop-shadow(0 0.5px 0.5px rgba(255,255,255,0.9))";
  const press = interactive
    ? "active:scale-[0.97] active:brightness-[1.04] transition-[transform,filter] duration-150"
    : "";

  const gloss = (
    <>
      {/* corner vignette */}
      {layer({ background: "radial-gradient(120% 130% at 50% 50%, rgba(0,0,0,0) 62%, rgba(0,0,0,0.045) 100%)" })}
      {/* centre glow */}
      {layer({ background: "radial-gradient(70% 120% at 50% 45%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 70%)" })}
      {/* fine grain */}
      {layer({
        opacity: 0.05,
        mixBlendMode: "overlay",
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      })}
      {/* brushed streaks */}
      {layer({
        opacity: 0.5,
        mixBlendMode: "overlay",
        backgroundImage:
          "repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0px, rgba(0,0,0,0.03) 1px, rgba(255,255,255,0.06) 2px)",
      })}
      {/* diagonal light sweep */}
      {layer({
        mixBlendMode: "screen",
        background: "linear-gradient(115deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.28) 46%, rgba(255,255,255,0) 60%)",
      })}
      {/* middle sheen band */}
      {layer({
        background: "linear-gradient(180deg, rgba(255,255,255,0) 34%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 66%)",
        opacity: 0.45,
      })}
      {/* side edge-lights */}
      {layer({
        background: "linear-gradient(90deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 8%, rgba(255,255,255,0) 92%, rgba(255,255,255,0.5) 100%)",
        opacity: 0.5,
      })}
      {/* top sheen */}
      {layer({ background: "radial-gradient(78% 82% at 50% -34%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.28) 42%, rgba(255,255,255,0) 72%)" })}
      {/* glass rim */}
      {layer({ boxShadow: "inset 0 2px 0 -1px rgba(255,255,255,0.85)" })}
      {/* bottom counter-sheen */}
      {layer({ mixBlendMode: "screen", background: "radial-gradient(90% 60% at 50% 118%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 60%)" })}
      {/* light lift along the bottom */}
      {layer({ mixBlendMode: "screen", boxShadow: "inset 0 -15px 2px -12px rgba(255,255,255,0.25)" })}
      {/* grounding shadow along the bottom */}
      {layer({ mixBlendMode: "color-burn", boxShadow: "inset 0 -6px 5px -2px #d2d2d2" })}
      {/* inner shadow wall */}
      {layer({ boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.06)" })}
      {/* fresnel edge-brighten */}
      {layer({ mixBlendMode: "screen", boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.28)" })}
      {/* ambient occlusion ring */}
      {layer({ boxShadow: "inset 0 0 6px 0 rgba(0,0,0,0.05)" })}
      {/* corner glints */}
      {layer({
        mixBlendMode: "screen",
        background:
          "radial-gradient(6px 5px at 14% 14%, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0) 100%), radial-gradient(6px 5px at 86% 14%, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0) 100%)",
      })}
    </>
  );

  const squircleBg = (extraStyle: CSSProperties) => (
    <Squircle
      radius={radius}
      smoothing={smoothing}
      exponent={exponent}
      compare={compare}
      fill="linear-gradient(180deg, #ffffff 0%, #f4f4f5 52%, #ececed 100%)"
      strokeGradient={["#d3d6db", "#b4b7bd", "#7f8288"]}
      strokeWidth={1}
      style={extraStyle}
    >
      {gloss}
    </Squircle>
  );

  // Fixed size: the Squircle is the box; content is centred inside it.
  if (!auto) {
    return (
      <Squircle
        radius={radius}
        smoothing={smoothing}
        exponent={exponent}
        compare={compare}
        contentClassName={contentClassName}
        fill="linear-gradient(180deg, #ffffff 0%, #f4f4f5 52%, #ececed 100%)"
        strokeGradient={["#d3d6db", "#b4b7bd", "#7f8288"]}
        strokeWidth={1}
        className={`${press} ${className}`}
        style={{ width: w, height: h, filter: HAIRLINE }}
      >
        {gloss}
        {children}
      </Squircle>
    );
  }

  // Auto size: the in-flow content (with its own padding) drives the box size; the
  // Squircle background is absolute and sized to the measured content.
  return (
    <span
      className={`relative inline-flex ${press} ${className}`}
      style={{ filter: HAIRLINE }}
    >
      {cw > 0 && ch > 0 && squircleBg({ position: "absolute", inset: 0 })}
      <span ref={measureRef} className={`relative z-[1] inline-flex items-center justify-center ${contentClassName ?? ""}`}>
        {children}
      </span>
    </span>
  );
}

// Debossed neutral label — two-tone near-black ink, cut into the surface with a
// base-occlusion halo, a bottom highlight, a chiselled top-highlight and a faint
// top shadow. Reused by every demo so text reads consistently.
function InkLabel({
  children,
  size = TEXT,
  tracking = TRACKING,
  className = "",
}: {
  children: ReactNode;
  size?: number;
  tracking?: number;
  className?: string;
}) {
  const ls = `${tracking}px`;
  return (
    <span className={`relative inline-flex items-center justify-center whitespace-nowrap ${className}`}>
      <span
        aria-hidden
        className="pointer-events-none absolute font-medium text-black/20 blur-[2px]"
        style={{ fontSize: size, letterSpacing: ls }}
      >
        {children}
      </span>
      <span
        className="relative z-[2] font-medium"
        style={{
          fontSize: size,
          letterSpacing: ls,
          // a hair of horizontal padding so background-clip:text never clips a glyph edge
          padding: "0 0.5px",
          backgroundImage: "linear-gradient(180deg, #14151a 0%, #33353b 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          filter:
            "drop-shadow(0 1px 1px rgba(255,255,255,0.8)) drop-shadow(0 -0.5px 0.3px rgba(255,255,255,0.5)) drop-shadow(0 -0.5px 0.5px rgba(0,0,0,0.12))",
        }}
      >
        {children}
      </span>
    </span>
  );
}

// ── Demo 1: the glossy button ────────────────────────────────────────────────
export function SquircleGlossyButton({ smoothing, exponent, compare }: Shape & { label?: string }) {
  const h = CONTROL_H;
  return (
    <GlossySquircle w={132} h={h} radius={radiusFor(h)} smoothing={smoothing} exponent={exponent} compare={compare}>
      <InkLabel>Get the app</InkLabel>
    </GlossySquircle>
  );
}

// ── Demo 2: a chat — user bubble → AI (no bubble) → user bubble ───────────────
export function SquircleChat({ smoothing, exponent, compare }: Shape) {
  // radius keyed to the default control height so bubbles match the family
  const br = radiusFor(CONTROL_H);
  const bubble = (text: string) => (
    <div className="flex justify-end">
      <GlossySquircle
        radius={br}
        smoothing={smoothing}
        exponent={exponent}
        compare={compare}
        interactive={false}
        contentClassName="px-3 py-2"
      >
        <InkLabel>{text}</InkLabel>
      </GlossySquircle>
    </div>
  );
  return (
    <div className="flex w-[300px] flex-col gap-2.5">
      {bubble("hey, what’s a squircle?")}
      {/* AI answer — no bubble, just quiet text */}
      <p className="max-w-[86%] text-[14px] leading-[1.5] text-[var(--text-secondary)]">
        A corner that eases into the edge with no kink, like on iOS.
      </p>
      {bubble("love it")}
    </div>
  );
}

// ── Demo 3: an iOS segmented control (glossy squircle thumb slides under active)
export function SquircleTabs({
  smoothing,
  exponent,
  compare,
  active = 0,
  onChange,
}: Shape & { active?: number; onChange?: (i: number) => void }) {
  const items = ["Design", "Code", "Ship"];
  const W = 224;
  const H = CONTROL_H;
  const pad = 3;
  const seg = (W - pad * 2) / items.length;
  const trackR = radiusFor(H); // the track is a squircle too
  const tr = radiusFor(H - pad * 2); // thumb corner keyed to the thumb's height

  const trackClip = `path("${shapePath({ width: W, height: H, radius: trackR, smoothing, exponent, plain: compare })}")`;

  return (
    <div className="relative" style={{ width: W, height: H }}>
      {/* recessed track — a squircle well the thumb sits inside */}
      <span
        aria-hidden
        className="absolute inset-0"
        style={{
          clipPath: trackClip,
          WebkitClipPath: trackClip,
          background: "linear-gradient(180deg, #e9eaec 0%, #f3f4f5 100%)",
          boxShadow: "inset 0 1px 3px rgba(0,0,0,0.12)",
        }}
      />
      {/* sliding glossy thumb under the active segment */}
      <div
        className="absolute transition-[left] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
        style={{ top: pad, left: pad + active * seg, width: seg, height: H - pad * 2 }}
      >
        <GlossySquircle
          w={seg}
          h={H - pad * 2}
          radius={tr}
          smoothing={smoothing}
          exponent={exponent}
          compare={compare}
          interactive={false}
        />
      </div>
      {/* labels — same tracking whether active or not, so they don't shift width */}
      <div className="absolute inset-0 flex items-center" style={{ padding: pad }}>
        {items.map((it, i) => (
          <button
            key={it}
            type="button"
            onClick={() => onChange?.(i)}
            className="relative z-[1] flex h-full flex-1 items-center justify-center font-medium transition-colors"
            style={{
              fontSize: TEXT,
              letterSpacing: `${TRACKING}px`,
              color: i === active ? "transparent" : "var(--text-secondary)",
            }}
          >
            {i === active ? <InkLabel>{it}</InkLabel> : it}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Demo 4: an iOS toggle switch (glossy squircle thumb slides in a squircle track)
export function SquircleToggle({
  smoothing,
  exponent,
  compare,
  on = true,
  onChange,
}: Shape & { on?: boolean; onChange?: (v: boolean) => void }) {
  const H = CONTROL_H_SM;
  const W = Math.round(H * 1.6);
  const pad = 4;
  const thumb = H - pad * 2;
  const trackR = radiusFor(H);
  const thumbR = radiusFor(thumb);
  const trackClip = `path("${shapePath({ width: W, height: H, radius: trackR, smoothing, exponent, plain: compare })}")`;

  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={() => onChange?.(!on)}
      className="relative active:brightness-[1.04] transition-[filter] duration-150"
      style={{ width: W, height: H }}
    >
      {/* track — a squircle well; darker when on, recessed light when off */}
      <span
        aria-hidden
        className="absolute inset-0 transition-[background] duration-300"
        style={{
          clipPath: trackClip,
          WebkitClipPath: trackClip,
          background: on
            ? "linear-gradient(180deg, #4b4d52 0%, #3a3c41 100%)"
            : "linear-gradient(180deg, #e5e6e8 0%, #eef0f1 100%)",
          boxShadow: on
            ? "inset 0 1px 2px rgba(0,0,0,0.35)"
            : "inset 0 1px 2px rgba(0,0,0,0.14)",
        }}
      />
      {/* sliding glossy thumb */}
      <div
        className="absolute transition-[left] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
        style={{ top: pad, left: on ? W - pad - thumb : pad, width: thumb, height: thumb }}
      >
        <GlossySquircle
          w={thumb}
          h={thumb}
          radius={thumbR}
          smoothing={smoothing}
          exponent={exponent}
          compare={compare}
          interactive={false}
        />
      </div>
    </button>
  );
}

// A recessed squircle surface — a light inset well with a real squircle border
// (for input fields / menus). Fixed-size (w/h in px). Content is a child that
// overlays the well; it is NOT clipped, so menu rows never get cut.
function RecessedSquircle({
  w,
  h,
  radius,
  smoothing,
  exponent,
  compare,
  children,
  contentClassName = "",
}: Shape & {
  w: number;
  h: number;
  children?: ReactNode;
  contentClassName?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const path = shapePath({ width: w, height: h, radius, smoothing, exponent, plain: compare });
  const clip = `path("${path}")`;
  return (
    <span className="relative inline-flex" style={{ width: w, height: h }}>
      {/* the recessed well: light fill + inset shadow, clipped to the squircle */}
      <span
        aria-hidden
        className="absolute inset-0"
        style={{
          clipPath: clip,
          WebkitClipPath: clip,
          background: "linear-gradient(180deg, #f5f6f7 0%, #ffffff 100%)",
          boxShadow: "inset 0 1.5px 3px rgba(0,0,0,0.10)",
        }}
      />
      {/* a hairline border on the squircle outline — clipped to itself so only the
          inner half shows (uniform on flats + corners) */}
      <svg
        aria-hidden
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        className="pointer-events-none absolute inset-0 z-[1]"
      >
        <clipPath id={`rec-${uid}`}>
          <path d={path} />
        </clipPath>
        <path d={path} fill="none" stroke="#c7cace" strokeWidth={2} clipPath={`url(#rec-${uid})`} />
      </svg>
      {/* content overlays the well; not clipped */}
      <span className={`relative z-[2] flex w-full ${contentClassName}`}>{children}</span>
    </span>
  );
}

// ── Demo 5: a text input — a recessed squircle field with a placeholder ───────
export function SquircleInput({ smoothing, exponent, compare }: Shape) {
  const h = CONTROL_H;
  return (
    <RecessedSquircle
      w={200}
      h={h}
      radius={radiusFor(h)}
      smoothing={smoothing}
      exponent={exponent}
      compare={compare}
      contentClassName="h-full items-center gap-1.5 px-3"
    >
      {/* search glyph */}
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="shrink-0 text-[var(--text-tertiary)]">
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
        <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="text-[var(--text-tertiary)]" style={{ fontSize: TEXT }}>Search</span>
    </RecessedSquircle>
  );
}

// ── Demo 6: a stepper — − / value / + as glossy squircle keys around a readout ─
export function SquircleStepper({ smoothing, exponent, compare }: Shape) {
  const [n, setN] = useState(3);
  const h = CONTROL_H_SM;
  const key = (label: string, onClick: () => void) => (
    <GlossySquircle
      w={h}
      h={h}
      radius={radiusFor(h)}
      smoothing={smoothing}
      exponent={exponent}
      compare={compare}
      className="cursor-pointer"
    >
      {/* label is non-interactive; the covering button on top takes the click */}
      <span className="pointer-events-none">
        <InkLabel>{label}</InkLabel>
      </span>
      <button type="button" onClick={onClick} className="absolute inset-0 z-[4]" aria-label={label} />
    </GlossySquircle>
  );
  return (
    <div className="flex items-center gap-2">
      {key("−", () => setN((v) => Math.max(0, v - 1)))}
      <span className="w-6 text-center font-medium tabular-nums text-[var(--text-primary)]" style={{ fontSize: TEXT }}>{n}</span>
      {key("+", () => setN((v) => v + 1))}
    </div>
  );
}

// ── Demo 7: a dropdown — a glossy squircle field that opens a squircle menu ────
export function SquircleDropdown({ smoothing, exponent, compare }: Shape) {
  const options = ["Squircle", "Rounded", "Circle"];
  const [open, setOpen] = useState(false);
  const [sel, setSel] = useState(0);
  const W = 180;
  const r = radiusFor(CONTROL_H);
  return (
    <div className="relative">
      <GlossySquircle
        w={W}
        h={CONTROL_H}
        radius={r}
        smoothing={smoothing}
        exponent={exponent}
        compare={compare}
        className="cursor-pointer"
        contentClassName="justify-between px-3 pointer-events-none"
      >
        <InkLabel>{options[sel]}</InkLabel>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="ml-2 shrink-0 text-[var(--text-secondary)]" style={{ transform: open ? "rotate(180deg)" : undefined, transition: "transform .2s" }}>
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {/* the click target, on top of the gloss + label */}
        <button type="button" onClick={() => setOpen((o) => !o)} className="pointer-events-auto absolute inset-0 z-[4]" aria-haspopup="listbox" aria-expanded={open} />
      </GlossySquircle>

      {open && (
        // opens UPWARD (bottom-full) so it isn't clipped by the preview's bottom edge
        <div className="absolute bottom-full left-0 z-10 mb-2" style={{ width: W }}>
          <RecessedSquircle
            w={W}
            h={options.length * 34 + 8}
            radius={r}
            smoothing={smoothing}
            exponent={exponent}
            compare={compare}
            contentClassName="flex-col p-1"
          >
            {options.map((o, i) => (
              <button
                key={o}
                type="button"
                onClick={() => { setSel(i); setOpen(false); }}
                className="flex h-[34px] w-full items-center rounded-lg px-3 text-left transition-colors hover:bg-black/[0.05]"
                style={{ fontSize: TEXT, color: i === sel ? "var(--text-primary)" : "var(--text-secondary)", fontWeight: i === sel ? 600 : 400 }}
              >
                {o}
              </button>
            ))}
          </RecessedSquircle>
        </div>
      )}
    </div>
  );
}

```

### squircle/playground.tsx
```tsx
"use client";

// The squircle on a few real components — a glossy button, a chat, an iOS
// segmented control — all sharing one neutral material. Remix shuffles which one
// is shown; two sliders tune the corner; Compare / Remix sit beside the title.

import { useState } from "react";
import { PG_PREVIEW, PG_PANEL, Slider, GhostButton } from "../swirl/controls";
import { SectionLabel } from "../section-label";
import { hapticTap } from "../../lib/haptics";
import {
  SquircleGlossyButton,
  SquircleChat,
  SquircleTabs,
  SquircleToggle,
  SquircleInput,
  SquircleStepper,
  SquircleDropdown,
} from "./parts";

const DEFAULT_SMOOTHING = 1;
const DEFAULT_EXPONENT = 5;
const RADIUS = 22;
const DEMOS = 7;

export function SquirclePlayground() {
  const [smoothing, setSmoothing] = useState(DEFAULT_SMOOTHING);
  const [exponent, setExponent] = useState(DEFAULT_EXPONENT);
  const [compare, setCompare] = useState(false);
  const [demo, setDemo] = useState(0);
  const [tab, setTab] = useState(0);
  const [toggleOn, setToggleOn] = useState(false);

  // Remix: step to the next demo in order.
  const remix = () => {
    hapticTap();
    setDemo((d) => (d + 1) % DEMOS);
  };

  const shape = { radius: RADIUS, smoothing, exponent, compare };

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <SectionLabel
        action={
          <div className="flex items-center gap-2">
            <GhostButton onClick={() => setCompare((c) => !c)}>
              {compare ? "Compare on" : "Compare"}
            </GhostButton>
            <GhostButton onClick={remix}>Remix</GhostButton>
          </div>
        }
      >
        Playground
      </SectionLabel>

      <div className="flex flex-col">
        <div className={`${PG_PREVIEW} flex min-h-[260px] items-center justify-center px-6 py-12`}>
          {demo === 0 && <SquircleGlossyButton {...shape} />}
          {demo === 1 && <SquircleChat {...shape} />}
          {demo === 2 && <SquircleTabs {...shape} active={tab} onChange={setTab} />}
          {demo === 3 && <SquircleToggle {...shape} on={toggleOn} onChange={setToggleOn} />}
          {demo === 4 && <SquircleInput {...shape} />}
          {demo === 5 && <SquircleStepper {...shape} />}
          {/* nudged down so the upward-opening menu clears the top without growing the stage */}
          {demo === 6 && (
            <div className="translate-y-10">
              <SquircleDropdown {...shape} />
            </div>
          )}
        </div>

        <div className={PG_PANEL}>
          <Slider
            label="Smoothing"
            value={smoothing}
            min={0}
            max={1}
            step={0.01}
            format={(v) =>
              v < 0.005
                ? "0.00 · plain"
                : Math.abs(v - 0.6) < 0.005
                  ? "0.60 · iOS"
                  : v.toFixed(2)
            }
            onChange={setSmoothing}
          />
          <Slider
            label="Squareness"
            value={exponent}
            min={2}
            max={8}
            step={0.1}
            format={(v) =>
              Math.abs(v - 2) < 0.05
                ? "2.0 · circle"
                : Math.abs(v - 5) < 0.05
                  ? "5.0 · iOS"
                  : `n ${v.toFixed(1)}`
            }
            onChange={setExponent}
          />
        </div>
      </div>
    </div>
  );
}

```18:["$","div",null,{"className":"py-24","children":[["$","script",null,{"type":"application/ld+json","suppressHydrationWarning":true,"dangerouslySetInnerHTML":{"__html":"[{\"@context\":\"https://schema.org\",\"@type\":\"TechArticle\",\"headline\":\"Apple's corners\",\"url\":\"https://arlan.me/vault/squircle\",\"image\":\"/vault/color-depth.svg\",\"datePublished\":\"Jul 21, 2026\",\"about\":\"Study\",\"keywords\":\"CSS, SVG, Squircle\",\"author\":{\"@type\":\"Person\",\"name\":\"Arlan Marat\",\"url\":\"https://arlan.me\"},\"isPartOf\":{\"@type\":\"CollectionPage\",\"name\":\"Vault\",\"url\":\"https://arlan.me/vault\"}},{\"@context\":\"https://schema.org\",\"@type\":\"BreadcrumbList\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Vault\",\"item\":\"https://arlan.me/vault\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Apple's corners\",\"item\":\"https://arlan.me/vault/squircle\"}]}]"}}],["$","article",null,{"className":"flex min-w-0 flex-col gap-10 text-[15px] leading-[1.7]","children":[["$","header",null,{"style":{"viewTransitionName":"vault-detail-head"},"className":"flex items-center justify-between gap-4","children":[["$","h1",null,{"className":"font-semibold text-[var(--text-primary)]","children":"Apple's corners"}],["$","$L22",null,{"href":"/vault"}]]}],null,false,["$","div",null,{"style":{"viewTransitionName":"vault-detail-body"},"className":"flex min-w-0 flex-col gap-14","children":[["$","div",null,{"className":"flex flex-col gap-3","children":[["$","p","0",{"className":"text-pretty text-[var(--text-primary)]","children":[["$","$1","0",{"children":"A normal rounded corner has a tiny kink where it meets the flat edge. You feel it before you can name it. Apple fixes this with a squircle, a corner that eases in smooth. Here is the real one on a live button you can play with."}]]}]]}],["$","$L23",null,{"children":[["$","$L24",null,{"playground":"squircle"}],["$","section",null,{"className":"flex min-w-0 flex-col gap-3","children":[["$","header",null,{"className":"flex items-center justify-between gap-3 pb-2 border-b border-[var(--border-line)]","children":[["$","h2",null,{"className":"font-semibold text-[var(--text-primary)]","children":"Code"}],["$","$L25",null,{"text":"$26","label":"Copy prompt","hideIcon":true,"className":"inline-flex h-7 shrink-0 items-center self-start rounded-lg border border-[var(--border-line)] bg-[var(--bg-surface)] px-3 text-[12px] font-medium text-[var(--text-secondary)] transition-colors duration-150 ease-[var(--ease-out)] hover:bg-[var(--bg-hover)] hover:border-[var(--border-ring)] hover:text-[var(--text-primary)] active:scale-[0.98]"}]]}],"$L27"]}],"$L28","$L29"]}]]}],"$L2a"]}]]}]
