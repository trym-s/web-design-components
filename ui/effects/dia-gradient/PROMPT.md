<!-- Verbatim "Copy prompt" payload from dia-gradient; includes the full source inline. -->

You are given the complete source for a self-contained web visual: "Dia Browser's gradient".

What it is:
- Dia Browser has a soft glow at the bottom of the screen. A row of blurry colour bars, short on the sides and tall in the middle, going from dark up through blue, white, yellow, red and pink, then fading out at the top. It grows up from the floor when the page loads.
- It is simpler than it looks. Just a few tall rectangles in one small SVG, all painted with the same rainbow and blurred a lot so they melt together. It starts flat at the bottom and scales up to full height, so it looks like it rises from the floor. Below you can change the bars, the blur, the curve and the colours.

How to use this code:
- It is a React + TypeScript component tree (Next.js App Router) that renders to an HTML canvas; the entry point is the playground component.
- Drop the files into a project under the same relative paths, mount the playground component, and it runs as-is. No external assets beyond what's inline.
- To adapt it: change the resolved word/logo, the color controls, or the experiment parameters. Ask me to modify, explain, or port any part.
- Original inspiration: https://www.diabrowser.com

The full source follows, one file per block:

### dia-gradient/standalone/DiaGradient.tsx
```tsx
"use client";

// Dia Browser's signature gradient — a self-contained drop-in.
//
// A row of N tall, heavily-blurred columns share one vertical rainbow gradient
// and are arranged in a symmetric bell curve (short at the edges, tallest in the
// middle). The whole field is anchored to the bottom and RISES UP on mount via a
// scaleY(0) → 1 transform (transform-origin: bottom), so it unfurls from the
// floor like an aurora. It's one inline <svg> — no canvas, no per-frame work.
//
// Usage:
//   <div className="fixed inset-x-0 bottom-0 h-[55vh] pointer-events-none -z-10">
//     <DiaGradient />
//   </div>

import { useEffect, useState } from "react";

type Stop = { offset: number; color: string };

// Dia's stops, bottom (0) → top (1): dark ember → blue → near-white → yellow →
// red-orange → magenta → transparent pink.
const DIA_STOPS: Stop[] = [
  { offset: 0, color: "#340B05" },
  { offset: 0.1827, color: "#0358F7" },
  { offset: 0.2837, color: "#5092C7" },
  { offset: 0.4135, color: "#E1ECFE" },
  { offset: 0.5866, color: "#FFD400" },
  { offset: 0.6827, color: "#FA3D1D" },
  { offset: 0.8029, color: "#FD02F5" },
  { offset: 1, color: "#FFC0FD00" },
];

const VBW = 1271;
const VBH = 599;

// Height curve fitted to the real Dia footer: a gentle power falloff (not a
// cosine bell), giving the flatter, pyramid-like rise of the original.
function bellHeights(n: number, peak: number, valley: number): number[] {
  const out: number[] = [];
  const mid = (n - 1) / 2;
  for (let i = 0; i < n; i++) {
    const t = mid === 0 ? 0 : Math.abs(i - mid) / mid; // 0 center → 1 edge
    const eased = 1 - Math.pow(t, 1.24); // 1 at center → 0 at edge
    out.push(peak * VBH * (valley + (1 - valley) * eased));
  }
  return out;
}

export function DiaGradient({
  bars = 9,
  blur = 15,
  peak = 0.98,
  valley = 0.55,
  stops = DIA_STOPS,
  riseMs = 1100,
}: {
  bars?: number;
  blur?: number;
  peak?: number;
  valley?: number;
  stops?: Stop[];
  riseMs?: number;
}) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setShown(true)),
    );
    return () => cancelAnimationFrame(id);
  }, []);

  const heights = bellHeights(bars, peak, valley);
  const colW = VBW / bars;

  return (
    <div
      aria-hidden
      style={{
        height: "100%",
        width: "100%",
        transformOrigin: "bottom",
        transform: shown ? "scaleY(1)" : "scaleY(0)",
        transition: `transform ${riseMs}ms cubic-bezier(0.16, 1, 0.3, 1)`,
        willChange: "transform",
      }}
    >
      <svg
        style={{ height: "100%", width: "100%" }}
        viewBox={`0 0 ${VBW} ${VBH}`}
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* objectBoundingBox units (default): the gradient maps to each rect's
              own box, so every bar shows the full rainbow over its own height —
              a field of full-rainbow columns, the way the real Dia footer does it. */}
          <linearGradient id="dia-grad" x1="0" y1="1" x2="0" y2="0">
            {stops.map((s, i) => (
              <stop key={i} offset={s.offset} stopColor={s.color} />
            ))}
          </linearGradient>
          <filter id="dia-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={blur} />
          </filter>
        </defs>
        {heights.map((h, i) => (
          <g key={i} filter="url(#dia-blur)">
            <rect
              x={i * colW}
              y={VBH - h}
              width={colW * 1.23}
              height={h}
              fill="url(#dia-grad)"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

```

### dia-gradient/standalone/PeakedGradient.tsx
```tsx
"use client";

// A second take on the Dia glow, the "peaked" way: instead of discrete bars, stack
// a few smooth bezier PEAK shapes — light at the front, dark behind — each blurred,
// so they read as one soft mountain of colour rising from the bottom. A `pointiness`
// control sharpens or rounds the peak. Same rise-up reveal as the bars version.

import { useEffect, useRef, useState, type CSSProperties } from "react";

const VBW = 1271;
const VBH = 599;

// One quadratic-bezier arch: bottom-left → peak → bottom-right, closed along an
// extended bottom (so the blur never clips). pointiness 0 = round, 1 = sharp.
function peakPath(widthFrac: number, heightFrac: number, pointiness: number): string {
  const w = widthFrac * VBW;
  const startX = (VBW - w) / 2;
  const endX = startX + w;
  const peakX = VBW / 2;
  const peakY = VBH - heightFrac * VBH;
  const spread = (1 - pointiness) * (w / 2); // wide control pts = rounder
  const ext = VBH * 0.6; // extend bottom past the viewBox
  return [
    `M ${startX} ${VBH}`,
    `Q ${peakX - spread} ${peakY}, ${peakX} ${peakY}`,
    `Q ${peakX + spread} ${peakY}, ${endX} ${VBH}`,
    `L ${endX} ${VBH + ext}`,
    `L ${startX} ${VBH + ext}`,
    "Z",
  ].join(" ");
}

export interface PeakedGradientProps {
  /** Front-to-back colours (lightest first looks best). */
  colors?: string[];
  /** Peak height as a fraction of the viewBox (0..1). */
  peak?: number;
  /** 0 = round dome, 1 = sharp point. */
  pointiness?: number;
  /** Blur in viewBox units. */
  blur?: number;
  reveal?: "mount" | "scroll" | "none";
  riseMs?: number;
  replayKey?: number;
  className?: string;
  style?: CSSProperties;
}

const DEFAULT_COLORS = ["#E1ECFE", "#FFD400", "#FA3D1D", "#FD02F5", "#0358F7", "#340B05"];

export function PeakedGradient({
  colors = DEFAULT_COLORS,
  peak = 0.92,
  pointiness = 0.5,
  blur = 26,
  reveal = "mount",
  riseMs = 1100,
  replayKey = 0,
  className,
  style,
}: PeakedGradientProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scaleY, setScaleY] = useState(reveal === "none" ? 1 : 0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reveal === "none" || reduced) {
      setScaleY(1);
      return;
    }
    if (reveal === "mount") {
      setScaleY(0);
      const id = requestAnimationFrame(() =>
        requestAnimationFrame(() => setScaleY(1)),
      );
      return () => cancelAnimationFrame(id);
    }
    let ticking = false;
    const measure = () => {
      ticking = false;
      const el = wrapRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      setScaleY(Math.max(0, Math.min(1, (vh - r.top) / (vh * 0.65))));
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(measure);
      }
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reveal, replayKey]);

  const fid = `peak-blur-${replayKey}`;
  // back (darkest, widest, lowest) → front (lightest, narrowest, tallest), so
  // the layers nest into one shaded mountain.
  const layers = colors
    .slice()
    .reverse()
    .map((color, i, arr) => {
      const t = arr.length === 1 ? 1 : i / (arr.length - 1); // 0 back → 1 front
      const heightFrac = peak * (0.55 + 0.45 * t);
      const widthFrac = 1.05 - 0.45 * t;
      return { color, d: peakPath(widthFrac, heightFrac, pointiness) };
    });

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className={className}
      style={{
        transformOrigin: "bottom",
        transform: `scaleY(${scaleY})`,
        transition:
          reveal === "mount"
            ? `transform ${riseMs}ms cubic-bezier(0.16, 1, 0.3, 1)`
            : undefined,
        willChange: "transform",
        ...style,
      }}
    >
      <svg
        className="h-full w-full"
        viewBox={`0 0 ${VBW} ${VBH}`}
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id={fid} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={blur} />
          </filter>
        </defs>
        <g filter={`url(#${fid})`}>
          {layers.map((l, i) => (
            <path key={i} d={l.d} fill={l.color} />
          ))}
        </g>
      </svg>
    </div>
  );
}

```

### dia-gradient/standalone/DodgeGradient.tsx
```tsx
"use client";

// The "color-dodge" gradient — a self-contained drop-in. One full-bleed block whose
// background stacks a vertical black → off-white fade, color-dodge-blended over a
// horizontal full rainbow. The dodge
// brightens the rainbow where the fade is light, so it reads dark at the floor and
// blooms into saturated rainbow toward the top. Rises on a scaleY reveal.
//
// Usage (on a dark stage so the bloom reads):
//   <div className="fixed inset-x-0 bottom-0 h-[40vh] bg-black pointer-events-none -z-10">
//     <DodgeGradient />
//   </div>

import { useEffect, useState } from "react";

const BLEND = "color-dodge, normal";
const RAINBOW = ["#FF0000", "#FFFF00", "#00FF00", "#00FFFF", "#0000FF", "#FF00FF"];

export function DodgeGradient({
  colors = RAINBOW,
  riseMs = 1100,
}: {
  colors?: string[];
  riseMs?: number;
}) {
  // loop the band back to its first colour so the dodge zones repeat seamlessly
  const band = (colors.length ? colors : RAINBOW).concat(colors[0] ?? RAINBOW[0]);
  const BACKGROUND =
    "linear-gradient(0deg, #000000 0%, #f7f7f7 100%), " +
    `linear-gradient(90deg, ${band.join(", ")})`;

  const [shown, setShown] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setShown(true)),
    );
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      aria-hidden
      style={{
        height: "100%",
        width: "100%",
        transformOrigin: "bottom",
        transform: shown ? "scaleY(1)" : "scaleY(0)",
        transition: `transform ${riseMs}ms cubic-bezier(0.16, 1, 0.3, 1)`,
        willChange: "transform",
      }}
    >
      <div
        style={{
          height: "100%",
          width: "100%",
          background: BACKGROUND,
          backgroundBlendMode: BLEND,
          // arch the rainbow into a soft dome rising from the floor (radial mask
          // anchored bottom-centre) instead of a flat rectangle
          WebkitMaskImage:
            "radial-gradient(75% 170% at 50% 100%, #000 38%, transparent 78%)",
          maskImage:
            "radial-gradient(75% 170% at 50% 100%, #000 38%, transparent 78%)",
        }}
      />
    </div>
  );
}

```18:["$","div",null,{"className":"py-24","children":[["$","script",null,{"type":"application/ld+json","suppressHydrationWarning":true,"dangerouslySetInnerHTML":{"__html":"[{\"@context\":\"https://schema.org\",\"@type\":\"TechArticle\",\"headline\":\"Dia Browser's gradient\",\"url\":\"https://arlan.me/vault/dia-gradient\",\"image\":\"/vault/dia.webp\",\"datePublished\":\"Jun 26, 2026\",\"about\":\"Dia Browser\",\"keywords\":\"SVG, Gradient, Reveal\",\"author\":{\"@type\":\"Person\",\"name\":\"Arlan Marat\",\"url\":\"https://arlan.me\"},\"isPartOf\":{\"@type\":\"CollectionPage\",\"name\":\"Vault\",\"url\":\"https://arlan.me/vault\"}},{\"@context\":\"https://schema.org\",\"@type\":\"BreadcrumbList\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Vault\",\"item\":\"https://arlan.me/vault\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Dia Browser's gradient\",\"item\":\"https://arlan.me/vault/dia-gradient\"}]}]"}}],["$","article",null,{"className":"flex min-w-0 flex-col gap-10 text-[15px] leading-[1.7]","children":[["$","header",null,{"style":{"viewTransitionName":"vault-detail-head"},"className":"flex items-center justify-between gap-4","children":[["$","h1",null,{"className":"font-semibold text-[var(--text-primary)]","children":"Dia Browser's gradient"}],["$","$L22",null,{"href":"/vault"}]]}],["$","$L23",null,{"src":"/vault/dia","poster":"/vault/dia.webp","viewTransitionName":"vault-dia-gradient"}],false,["$","div",null,{"style":{"viewTransitionName":"vault-detail-body"},"className":"flex min-w-0 flex-col gap-14","children":[["$","div",null,{"className":"flex flex-col gap-3","children":[["$","p","0",{"className":"text-pretty text-[var(--text-primary)]","children":[["$","$1","0",{"children":"Dia Browser has a soft glow at the bottom of the screen. A row of blurry colour bars, short on the sides and tall in the middle, going from dark up through blue, white, yellow, red and pink, then fading out at the top. It grows up from the floor when the page loads."}]]}],["$","p","1",{"className":"text-pretty text-[var(--text-primary)]","children":[["$","$1","0",{"children":"It is simpler than it looks. Just a few tall rectangles in one small SVG, all painted with the same rainbow and blurred a lot so they melt together. It starts flat at the bottom and scales up to full height, so it looks like it rises from the floor. Below you can change the bars, the blur, the curve and the colours."}]]}]]}],["$","$L24",null,{"children":[["$","$L25",null,{"playground":"dia"}],["$","section",null,{"className":"flex min-w-0 flex-col gap-3","children":[["$","header",null,{"className":"flex items-center justify-between gap-3 pb-2 border-b border-[var(--border-line)]","children":[["$","h2",null,{"className":"font-semibold text-[var(--text-primary)]","children":"Code"}],["$","$L26",null,{"text":"$27","label":"Copy prompt","hideIcon":true,"className":"inline-flex h-7 shrink-0 items-center self-start rounded-lg border border-[var(--border-line)] bg-[var(--bg-surface)] px-3 text-[12px] font-medium text-[var(--text-secondary)] transition-colors duration-150 ease-[var(--ease-out)] hover:bg-[var(--bg-hover)] hover:border-[var(--border-ring)] hover:text-[var(--text-primary)] active:scale-[0.98]"}]]}],"$L28"]}],"$L29","$L2a"]}]]}],"$L2b"]}]]}]
