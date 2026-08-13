<!-- Verbatim "Copy prompt" payload from vector-editor; includes the full source inline. -->

You are given the complete source for a self-contained web visual: "Figma vector editor".

What it is:
- You know that Figma look everyone copies: the thin blue box around a thing, the little corner squares, the size tag under it, and the dots you grab to bend a shape. I wanted to see if I could build it for the web, so here it is.
- It is two small parts. One draws the blue box and the size tag around anything. The other lets you grab the dots on a shape and drag them to change it, then gives you the new path back. It is pretty raw, just a fun little experiment, but it works and you can take it.

How to use this code:
- It is a React + TypeScript component tree (Next.js App Router) that renders to an HTML canvas; the entry point is the playground component.
- Drop the files into a project under the same relative paths, mount the playground component, and it runs as-is. No external assets beyond what's inline.
- To adapt it: change the resolved word/logo, the color controls, or the experiment parameters. Ask me to modify, explain, or port any part.
- Original inspiration: https://figma.com

The full source follows, one file per block:

### svg-editor/standalone/types.ts
```ts
// The editable vector model. An SVG <path> is broken into ANCHOR points, each
// with up to two bezier control HANDLES (the "in" tangent from the previous
// segment and the "out" tangent toward the next). A path may contain several
// SUBPATHS (the word "arlan" is many glyphs; a shape with a hole is an outer ring
// plus an inner ring). Anchors are kept in ONE flat array; `starts` marks where
// each subpath begins and `closed` is the per-subpath Z flag. Serializing back to
// a path `d` string is lossless for the cubic/line subset we support.

export interface Vec {
  x: number;
  y: number;
}

export interface Anchor {
  /** Anchor position. */
  p: Vec;
  /** Outgoing control handle (toward the next anchor), absolute coords. null = straight. */
  out: Vec | null;
  /** Incoming control handle (from the previous anchor), absolute coords. null = straight. */
  in: Vec | null;
}

export interface VectorPath {
  /** All anchors of every subpath, concatenated. */
  anchors: Anchor[];
  /** Flat index where each subpath begins. `starts[0]` is always 0. Subpath `s`
   *  owns anchors `[starts[s], starts[s+1])` (or to the end for the last). */
  starts: number[];
  /** Per-subpath: does this subpath close back to its first anchor (Z)? */
  closed: boolean[];
}

export const v = (x: number, y: number): Vec => ({ x, y });
export const add = (a: Vec, b: Vec): Vec => ({ x: a.x + b.x, y: a.y + b.y });
export const sub = (a: Vec, b: Vec): Vec => ({ x: a.x - b.x, y: a.y - b.y });
export const dist = (a: Vec, b: Vec): number => Math.hypot(a.x - b.x, a.y - b.y);

/** [begin, end) flat-anchor range of subpath `s`. */
export function subRange(path: VectorPath, s: number): [number, number] {
  const begin = path.starts[s];
  const end = s + 1 < path.starts.length ? path.starts[s + 1] : path.anchors.length;
  return [begin, end];
}

```

### svg-editor/standalone/parse.ts
```ts
// Parse an SVG path `d` string into our editable anchor model, and serialize it
// back. We support the common subset: M/L/H/V/C/S/Q/T/Z (absolute + relative).
// Arcs (A) are not control-point editable, so a path using them is rejected by
// the playground with a friendly message. Everything is normalized to cubic
// beziers internally so the editor only ever deals with anchors + two handles.
//
// Multi-subpath: every `M` opens a new subpath. Anchors stay in one flat array;
// `starts` marks each subpath's first index and `closed` is its per-subpath Z.

import type { Anchor, Vec, VectorPath } from "./types";
import { v, subRange } from "./types";

// Tokenize a `d` string into [command, ...numbers] groups.
function tokenize(d: string): { cmd: string; args: number[] }[] {
  const out: { cmd: string; args: number[] }[] = [];
  const re = /([MmLlHhVvCcSsQqTtAaZz])|(-?\d*\.?\d+(?:e[-+]?\d+)?)/gi;
  let m: RegExpExecArray | null;
  let cur: { cmd: string; args: number[] } | null = null;
  while ((m = re.exec(d))) {
    if (m[1]) {
      cur = { cmd: m[1], args: [] };
      out.push(cur);
    } else if (cur) {
      cur.args.push(parseFloat(m[2]));
    }
  }
  return out;
}

/** Parse a path into the flat multi-subpath model. Throws on unsupported (arc) commands. */
export function parsePath(d: string): VectorPath {
  const tokens = tokenize(d);
  const anchors: Anchor[] = [];
  const starts: number[] = [];
  const closed: boolean[] = [];

  let cur: Vec = v(0, 0);
  let start: Vec = v(0, 0); // current subpath's start point (for Z)
  let prevCtrl: Vec | null = null;
  let prevCmd = "";

  const push = (p: Vec) => anchors.push({ p, out: null, in: null });
  const last = () => anchors[anchors.length - 1];

  // Drop the duplicate trailing anchor a closed subpath often repeats, folding
  // its `in` handle onto the subpath's first anchor (matches old single-ring code).
  const dedupClose = () => {
    if (!starts.length) return;
    const si = starts[starts.length - 1];
    if (anchors.length - si > 1) {
      const a = anchors[si].p;
      const z = anchors[anchors.length - 1].p;
      if (Math.abs(a.x - z.x) < 0.01 && Math.abs(a.y - z.y) < 0.01) {
        anchors[si].in = anchors[anchors.length - 1].in;
        anchors.pop();
      }
    }
  };

  for (const { cmd, args } of tokens) {
    const rel = cmd === cmd.toLowerCase();
    const C = cmd.toUpperCase();
    let i = 0;
    const num = () => args[i++];
    const pt = (): Vec => {
      const x = num();
      const y = num();
      return rel ? { x: cur.x + x, y: cur.y + y } : { x, y };
    };

    switch (C) {
      case "M": {
        // A new M opens a NEW subpath. Finalize the previous one (dedup if it was
        // closed by a Z) before starting fresh.
        if (starts.length && closed[closed.length - 1]) dedupClose();
        cur = pt();
        start = cur;
        starts.push(anchors.length);
        closed.push(false);
        push(cur);
        // extra coordinate pairs after M are implicit L
        while (i < args.length) {
          cur = pt();
          push(cur);
        }
        prevCtrl = null;
        break;
      }
      case "L": {
        while (i < args.length) { cur = pt(); push(cur); }
        prevCtrl = null;
        break;
      }
      case "H": {
        while (i < args.length) {
          const x = num();
          cur = { x: rel ? cur.x + x : x, y: cur.y };
          push(cur);
        }
        prevCtrl = null;
        break;
      }
      case "V": {
        while (i < args.length) {
          const y = num();
          cur = { x: cur.x, y: rel ? cur.y + y : y };
          push(cur);
        }
        prevCtrl = null;
        break;
      }
      case "C": {
        while (i < args.length) {
          const c1 = pt();
          const c2 = pt();
          const end = pt();
          last().out = c1;
          push(end);
          last().in = c2;
          cur = end;
          prevCtrl = c2;
        }
        break;
      }
      case "S": {
        while (i < args.length) {
          const c1: Vec =
            prevCmd === "C" || prevCmd === "S"
              ? { x: 2 * cur.x - (prevCtrl?.x ?? cur.x), y: 2 * cur.y - (prevCtrl?.y ?? cur.y) }
              : cur;
          const c2 = pt();
          const end = pt();
          last().out = c1;
          push(end);
          last().in = c2;
          cur = end;
          prevCtrl = c2;
        }
        break;
      }
      case "Q": {
        while (i < args.length) {
          const qc = pt();
          const end = pt();
          const c1 = { x: cur.x + (2 / 3) * (qc.x - cur.x), y: cur.y + (2 / 3) * (qc.y - cur.y) };
          const c2 = { x: end.x + (2 / 3) * (qc.x - end.x), y: end.y + (2 / 3) * (qc.y - end.y) };
          last().out = c1;
          push(end);
          last().in = c2;
          cur = end;
          prevCtrl = qc;
        }
        break;
      }
      case "T": {
        while (i < args.length) {
          const qc: Vec =
            prevCmd === "Q" || prevCmd === "T"
              ? { x: 2 * cur.x - (prevCtrl?.x ?? cur.x), y: 2 * cur.y - (prevCtrl?.y ?? cur.y) }
              : cur;
          const end = pt();
          const c1 = { x: cur.x + (2 / 3) * (qc.x - cur.x), y: cur.y + (2 / 3) * (qc.y - cur.y) };
          const c2 = { x: end.x + (2 / 3) * (qc.x - end.x), y: end.y + (2 / 3) * (qc.y - end.y) };
          last().out = c1;
          push(end);
          last().in = c2;
          cur = end;
          prevCtrl = qc;
        }
        break;
      }
      case "Z": {
        if (closed.length) closed[closed.length - 1] = true;
        cur = start;
        prevCtrl = null;
        break;
      }
      case "A":
        throw new Error("Arc commands (A) aren't supported by the point editor.");
      default:
        throw new Error(`Unsupported path command: ${cmd}`);
    }
    prevCmd = C;
  }

  // Finalize the trailing subpath.
  if (starts.length && closed[closed.length - 1]) dedupClose();

  return { anchors, starts, closed };
}

const n = (x: number) => {
  // trim to 2 decimals, drop trailing zeros
  const r = Math.round(x * 100) / 100;
  return String(r);
};

/** Serialize the flat model back to a path `d` string (one M…(Z) run per subpath). */
export function serializePath(path: VectorPath): string {
  const { anchors, starts, closed } = path;
  if (!anchors.length || !starts.length) return "";
  const parts: string[] = [];

  for (let s = 0; s < starts.length; s++) {
    const [begin, end] = subRange(path, s);
    const count = end - begin;
    if (count === 0) continue;
    const isClosed = closed[s];

    parts.push(`M ${n(anchors[begin].p.x)} ${n(anchors[begin].p.y)}`);
    const segCount = isClosed ? count : count - 1;
    for (let k = 0; k < segCount; k++) {
      const a = anchors[begin + k];
      const b = anchors[begin + ((k + 1) % count)];
      if (a.out || b.in) {
        const c1 = a.out ?? a.p;
        const c2 = b.in ?? b.p;
        parts.push(`C ${n(c1.x)} ${n(c1.y)} ${n(c2.x)} ${n(c2.y)} ${n(b.p.x)} ${n(b.p.y)}`);
      } else {
        parts.push(`L ${n(b.p.x)} ${n(b.p.y)}`);
      }
    }
    if (isClosed) parts.push("Z");
  }
  return parts.join(" ");
}

/** Axis-aligned bounding box over all anchors + handles of every subpath. */
export function bounds(path: VectorPath): { x: number; y: number; w: number; h: number } {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  const eat = (p: Vec) => {
    if (p.x < minX) minX = p.x;
    if (p.y < minY) minY = p.y;
    if (p.x > maxX) maxX = p.x;
    if (p.y > maxY) maxY = p.y;
  };
  for (const a of path.anchors) {
    eat(a.p);
    if (a.in) eat(a.in);
    if (a.out) eat(a.out);
  }
  if (!isFinite(minX)) return { x: 0, y: 0, w: 0, h: 0 };
  return { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
}

```

### svg-editor/standalone/FigmaFrame.tsx
```tsx
"use client";

// FigmaFrame — the "selected layer" chrome you see in Figma/Framer: a thin
// accent border that draws itself open, four corner handles that pop in one by
// one, and a live W×H dimension badge under the box. Drop it around ANY element
// and it tracks that element's size with a ResizeObserver, so the badge stays
// honest as the content reflows or you drag points inside it.
//
// Everything visual is prop-driven (accent, handle size/color, border width,
// badge on/off) so a playground can restyle it live.

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

export interface FrameStyle {
  accent: string;        // selection color (Figma blue by default)
  handleSize: number;    // px, the little corner squares
  handleFill: string;    // usually white
  borderWidth: number;   // px
  showHandles: boolean;
  showBadge: boolean;
  badgeBg: string;
  badgeText: string;
  /** Replay the open animation whenever this value changes. */
  animateKey?: string | number;
}

export const DEFAULT_FRAME: FrameStyle = {
  accent: "#0d99ff",
  handleSize: 8,
  handleFill: "#ffffff",
  borderWidth: 1,
  showHandles: true,
  showBadge: true,
  badgeBg: "#0d99ff",
  badgeText: "#ffffff",
};

export function FigmaFrame({
  children,
  style = DEFAULT_FRAME,
  /** Override the measured size with explicit numbers (e.g. the SVG viewBox). */
  width,
  height,
}: {
  children: ReactNode;
  style?: FrameStyle;
  width?: number;
  height?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  // true only on the very first render → the intro animation plays once
  const [firstMount, setFirstMount] = useState(true);
  useEffect(() => {
    const id = setTimeout(() => setFirstMount(false), 900);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (width != null && height != null) {
      setSize({ w: width, h: height });
      return;
    }
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect();
      setSize({ w: Math.round(r.width), h: Math.round(r.height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [width, height]);

  const w = width ?? size.w;
  const h = height ?? size.h;

  const s = style;
  const half = s.handleSize / 2;
  const handle = (pos: CSSProperties, intro: boolean, delay: number): CSSProperties => ({
    position: "absolute",
    zIndex: 10,
    width: s.handleSize,
    height: s.handleSize,
    backgroundColor: s.handleFill,
    border: `1px solid ${s.accent}`,
    borderRadius: 1,
    // set the shorthand + delay together, or neither — never mix one set with one
    // removed across renders (React warns about shorthand/non-shorthand conflicts)
    ...(intro ? { animation: `bbox-handle 0.25s ease-out both`, animationDelay: `${delay}s` } : {}),
    ...pos,
  });

  // Play the draw-open / pop-in animation only on the FIRST mount. On a remix the
  // box must not disappear and redraw — it just resizes to track the new shape,
  // which it does smoothly because width/height come straight from the viewBox.
  const intro = firstMount;

  return (
    <div ref={ref} className="relative inline-block">
      {/* the selection border — animates open once, then just tracks the size */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          border: `${s.borderWidth}px solid ${s.accent}`,
          transformOrigin: "top left",
          animation: intro ? `bbox-open 0.6s var(--ease-expo) both` : undefined,
        }}
      />

      {s.showHandles && (
        <>
          <span style={handle({ top: -half, left: -half }, intro, 0.18)} />
          <span style={handle({ top: -half, right: -half }, intro, 0.28)} />
          <span style={handle({ bottom: -half, right: -half }, intro, 0.38)} />
          <span style={handle({ bottom: -half, left: -half }, intro, 0.48)} />
        </>
      )}

      {s.showBadge && (
        <span
          className="pointer-events-none absolute left-1/2 z-10 whitespace-nowrap rounded-[4px] px-2 py-0.5 text-[11px] tabular-nums"
          style={{
            bottom: -30,
            backgroundColor: s.badgeBg,
            color: s.badgeText,
            transform: "translateX(-50%)",
            ...(intro ? { animation: `bbox-badge 0.25s ease-out both`, animationDelay: "0.2s" } : {}),
          }}
        >
          {w} × {h}
        </span>
      )}

      {children}
    </div>
  );
}

```

### svg-editor/standalone/VectorEditor.tsx
```tsx
"use client";

// VectorEditor — a live SVG bezier editor. It draws the path and overlays the
// editable rig on top: every ANCHOR is a draggable dot, every bezier HANDLE is a
// draggable diamond joined to its anchor by a thin "arm" line (exactly the rig
// Figma/Framer show when you enter a vector shape). Drag an anchor to move it
// (its handles come along); drag a handle to reshape the curve. By default the
// two handles of an anchor stay mirrored (smooth point) — hold Alt while
// dragging a handle to break the tangent and make a corner.
//
// Pure pointer math, no deps. Coordinates are the SVG's own user units; we map
// screen → user space through the live CTM so it stays correct at any size.

import { useRef, type PointerEvent as RPointerEvent } from "react";
import type { Anchor, Vec, VectorPath } from "./types";
import { serializePath } from "./parse";
import { sub, add } from "./types";

// How an anchor's two bezier handles relate while you drag one (matches Figma's
// Mirroring setting). Hold Alt while dragging to momentarily force "none".
export type Mirror = "none" | "angle" | "angle-length";

export interface EditorStyle {
  accent: string;
  arm: string;        // tangent-line color
  anchorR: number;    // anchor dot radius (user units)
  handleR: number;    // handle diamond half-size (user units)
  pointFill: string;  // dot/diamond fill
  fill: string;       // path fill
  fillOpacity: number;
  stroke: string;     // path stroke
  strokeWidth: number;
  showRig: boolean;   // hide all points → just the shape
  fillRule: "nonzero" | "evenodd"; // evenodd cuts holes from inner subpaths
}

export const DEFAULT_EDITOR: EditorStyle = {
  accent: "#0d99ff",
  arm: "#9bb7d4",
  anchorR: 4,
  handleR: 3.2,
  pointFill: "#ffffff",
  fill: "#0d99ff",
  fillOpacity: 0.08,
  stroke: "#0d99ff",
  strokeWidth: 1.5,
  showRig: true,
  fillRule: "evenodd",
};

type Drag =
  | { kind: "anchor"; i: number }
  | { kind: "handle"; i: number; side: "in" | "out"; mirror: Mirror };

export function VectorEditor({
  path,
  onChange,
  style = DEFAULT_EDITOR,
  mirror = "angle-length",
  viewBox,
  width,
  height,
  className,
}: {
  path: VectorPath;
  onChange: (next: VectorPath) => void;
  style?: EditorStyle;
  /** Default handle-mirroring mode; Alt-drag temporarily forces "none". */
  mirror?: Mirror;
  /** [minX, minY, width, height] of the SVG viewBox. */
  viewBox: [number, number, number, number];
  /** Rendered pixel size. Defaults to the viewBox's own width/height. */
  width?: number;
  height?: number;
  className?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const drag = useRef<Drag | null>(null);
  // latest path (so a coalesced rAF reads current state, not a stale closure)
  const pathRef = useRef(path);
  pathRef.current = path;
  const pending = useRef<Vec | null>(null);
  const rafMove = useRef(0);

  // map a pointer event to SVG user-space coordinates via the live screen CTM
  function toUser(e: { clientX: number; clientY: number }): Vec {
    const svg = svgRef.current!;
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const u = pt.matrixTransform(ctm.inverse());
    return { x: u.x, y: u.y };
  }

  function startAnchor(e: RPointerEvent, i: number) {
    e.stopPropagation();
    (e.target as Element).setPointerCapture(e.pointerId);
    drag.current = { kind: "anchor", i };
  }
  function startHandle(e: RPointerEvent, i: number, side: "in" | "out") {
    e.stopPropagation();
    (e.target as Element).setPointerCapture(e.pointerId);
    // Alt overrides the active mode to a free corner.
    drag.current = { kind: "handle", i, side, mirror: e.altKey ? "none" : mirror };
  }

  // Apply a drag at user-space point u against the current path → next path.
  function applyDrag(d: Drag, u: Vec): VectorPath {
    const anchors = pathRef.current.anchors.map((a) => ({
      p: { ...a.p },
      in: a.in ? { ...a.in } : null,
      out: a.out ? { ...a.out } : null,
    })) as Anchor[];

    if (d.kind === "anchor") {
      const a = anchors[d.i];
      const delta = sub(u, a.p);
      a.p = u;
      if (a.in) a.in = add(a.in, delta);
      if (a.out) a.out = add(a.out, delta);
    } else {
      const a = anchors[d.i];
      if (d.side === "out") a.out = u;
      else a.in = u;
      const other = d.side === "out" ? a.in : a.out;
      if (d.mirror !== "none" && other) {
        const rel = sub(u, a.p);
        const relLen = Math.hypot(rel.x, rel.y) || 1;
        const len =
          d.mirror === "angle-length" ? relLen : Math.hypot(other.x - a.p.x, other.y - a.p.y);
        const opp = { x: a.p.x - (rel.x / relLen) * len, y: a.p.y - (rel.y / relLen) * len };
        if (d.side === "out") a.in = opp;
        else a.out = opp;
      }
    }
    return { anchors, starts: pathRef.current.starts, closed: pathRef.current.closed };
  }

  // Coalesce rapid pointermove events to ONE commit per animation frame, so a
  // fast drag doesn't fire dozens of re-renders between paints.
  function onMove(e: RPointerEvent) {
    if (!drag.current) return;
    pending.current = toUser(e);
    if (rafMove.current) return;
    rafMove.current = requestAnimationFrame(() => {
      rafMove.current = 0;
      const d = drag.current;
      const u = pending.current;
      if (!d || !u) return;
      onChange(applyDrag(d, u));
    });
  }

  function endDrag(e: RPointerEvent) {
    if (drag.current) {
      // flush any pending coalesced move so the final position isn't dropped
      if (rafMove.current) {
        cancelAnimationFrame(rafMove.current);
        rafMove.current = 0;
        const u = pending.current;
        if (u) onChange(applyDrag(drag.current, u));
      }
      try {
        (e.target as Element).releasePointerCapture(e.pointerId);
      } catch {
        /* capture may already be gone */
      }
      drag.current = null;
      pending.current = null;
    }
  }

  const s = style;
  const d = serializePath(path);

  // tangent arm segments to draw (anchor → handle)
  const arms: { ax: number; ay: number; hx: number; hy: number }[] = [];
  if (s.showRig) {
    for (const a of path.anchors) {
      if (a.out) arms.push({ ax: a.p.x, ay: a.p.y, hx: a.out.x, hy: a.out.y });
      if (a.in) arms.push({ ax: a.p.x, ay: a.p.y, hx: a.in.x, hy: a.in.y });
    }
  }

  return (
    <svg
      ref={svgRef}
      viewBox={viewBox.join(" ")}
      width={width ?? viewBox[2]}
      height={height ?? viewBox[3]}
      className={className}
      style={{ display: "block", touchAction: "none", userSelect: "none", overflow: "visible" }}
      onPointerMove={onMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      {/* the shape itself */}
      <path d={d} fill={s.fill} fillRule={s.fillRule} fillOpacity={s.fillOpacity} stroke={s.stroke} strokeWidth={s.strokeWidth} />

      {s.showRig && (
        <g>
          {/* tangent arms */}
          <g stroke={s.arm} strokeWidth={Math.max(0.75, s.strokeWidth * 0.6)}>
            {arms.map((a, k) => (
              <line key={k} x1={a.ax} y1={a.ay} x2={a.hx} y2={a.hy} />
            ))}
          </g>

          {/* bezier handles (diamonds) */}
          {path.anchors.map((a, i) => (
            <g key={`h-${i}`}>
              {a.out && (
                <Diamond
                  cx={a.out.x}
                  cy={a.out.y}
                  r={s.handleR}
                  fill={s.pointFill}
                  stroke={s.accent}
                  onPointerDown={(e) => startHandle(e, i, "out")}
                />
              )}
              {a.in && (
                <Diamond
                  cx={a.in.x}
                  cy={a.in.y}
                  r={s.handleR}
                  fill={s.pointFill}
                  stroke={s.accent}
                  onPointerDown={(e) => startHandle(e, i, "in")}
                />
              )}
            </g>
          ))}

          {/* anchors on top so they win the hit-test */}
          {path.anchors.map((a, i) => (
            <g key={`a-${i}`} style={{ cursor: "grab" }} onPointerDown={(e) => startAnchor(e, i)}>
              {/* fat invisible hit target */}
              <circle cx={a.p.x} cy={a.p.y} r={s.anchorR * 3} fill="transparent" />
              <circle cx={a.p.x} cy={a.p.y} r={s.anchorR} fill={s.pointFill} stroke={s.accent} strokeWidth={1.25} />
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}

function Diamond({
  cx,
  cy,
  r,
  fill,
  stroke,
  onPointerDown,
}: {
  cx: number;
  cy: number;
  r: number;
  fill: string;
  stroke: string;
  onPointerDown: (e: RPointerEvent) => void;
}) {
  return (
    <g style={{ cursor: "grab" }} onPointerDown={onPointerDown}>
      <circle cx={cx} cy={cy} r={r * 3.5} fill="transparent" />
      <rect
        x={cx - r}
        y={cy - r}
        width={r * 2}
        height={r * 2}
        fill={fill}
        stroke={stroke}
        strokeWidth={1.1}
        style={{ transform: "rotate(45deg)", transformOrigin: "50% 50%", transformBox: "fill-box" }}
      />
    </g>
  );
}

```18:["$","div",null,{"className":"py-24","children":[["$","script",null,{"type":"application/ld+json","suppressHydrationWarning":true,"dangerouslySetInnerHTML":{"__html":"[{\"@context\":\"https://schema.org\",\"@type\":\"TechArticle\",\"headline\":\"Figma vector editor\",\"url\":\"https://arlan.me/vault/vector-editor\",\"image\":\"/vault/figma-frame.svg\",\"datePublished\":\"Jun 25, 2026\",\"about\":\"Figma\",\"keywords\":\"SVG, Bezier, Editor\",\"author\":{\"@type\":\"Person\",\"name\":\"Arlan Marat\",\"url\":\"https://arlan.me\"},\"isPartOf\":{\"@type\":\"CollectionPage\",\"name\":\"Vault\",\"url\":\"https://arlan.me/vault\"}},{\"@context\":\"https://schema.org\",\"@type\":\"BreadcrumbList\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Vault\",\"item\":\"https://arlan.me/vault\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Figma vector editor\",\"item\":\"https://arlan.me/vault/vector-editor\"}]}]"}}],["$","article",null,{"className":"flex min-w-0 flex-col gap-10 text-[15px] leading-[1.7]","children":[["$","header",null,{"style":{"viewTransitionName":"vault-detail-head"},"className":"flex items-center justify-between gap-4","children":[["$","h1",null,{"className":"font-semibold text-[var(--text-primary)]","children":"Figma vector editor"}],["$","$L22",null,{"href":"/vault"}]]}],[["$","$L23",null,{"moduleIds":[40560]}],"$L24"],false,["$","div",null,{"style":{"viewTransitionName":"vault-detail-body"},"className":"flex min-w-0 flex-col gap-14","children":[["$","div",null,{"className":"flex flex-col gap-3","children":[["$","p","0",{"className":"text-pretty text-[var(--text-primary)]","children":[["$","$1","0",{"children":"You know that Figma look everyone copies: the thin blue box around a thing, the little corner squares, the size tag under it, and the dots you grab to bend a shape. I wanted to see if I could build it for the web, so here it is."}]]}],["$","p","1",{"className":"text-pretty text-[var(--text-primary)]","children":[["$","$1","0",{"children":"It is two small parts. One draws the blue box and the size tag around anything. The other lets you grab the dots on a shape and drag them to change it, then gives you the new path back. It is pretty raw, just a fun little experiment, but it works and you can take it."}]]}]]}],["$","$L25",null,{"children":[["$","$L26",null,{"playground":"svg-editor"}],["$","section",null,{"className":"flex min-w-0 flex-col gap-3","children":[["$","header",null,{"className":"flex items-center justify-between gap-3 pb-2 border-b border-[var(--border-line)]","children":[["$","h2",null,{"className":"font-semibold text-[var(--text-primary)]","children":"Code"}],["$","$L27",null,{"text":"$28","label":"Copy prompt","hideIcon":true,"className":"inline-flex h-7 shrink-0 items-center self-start rounded-lg border border-[var(--border-line)] bg-[var(--bg-surface)] px-3 text-[12px] font-medium text-[var(--text-secondary)] transition-colors duration-150 ease-[var(--ease-out)] hover:bg-[var(--bg-hover)] hover:border-[var(--border-ring)] hover:text-[var(--text-primary)] active:scale-[0.98]"}]]}],"$L29"]}],"$L2a","$L2b"]}]]}],"$L2c"]}]]}]
