<!-- Verbatim "Copy prompt" payload from ransom-note; includes the full source inline. -->

You are given the complete source for a self-contained web visual: "Ransom note".

What it is:
- I always liked the ransom-note look, where every letter is torn from a different magazine and taped down crooked. So I took a set of real cut-out letters and made it into something you can type with.
- Each character picks a random paper scrap from the set, then gets a small random tilt, bounce and size so the line reads like it was assembled by hand, not typed. Type your own note below, tune how messy it is, and re-roll to shuffle the scraps.

How to use this code:
- It is a React + TypeScript component tree (Next.js App Router) that renders to an HTML canvas; the entry point is the playground component.
- Drop the files into a project under the same relative paths, mount the playground component, and it runs as-is. No external assets beyond what's inline.
- To adapt it: change the resolved word/logo, the color controls, or the experiment parameters. Ask me to modify, explain, or port any part.
- Original inspiration: https://resourceboy.com/

The full source follows, one file per block:

### ransom/manifest.ts
```ts
// Ransom-note cutout manifest + per-character picker. The sprites are real torn/cut-out
// magazine letters (Resource Boy "Ransom Note Letters" pack, royalty-free), trimmed to
// their alpha bbox and downscaled to ~220px tall WebP. Each key (a character) maps to a
// handful of variants; composing a word means picking one cutout per character and
// jittering it a little so it reads like a hand-assembled ransom note.

import { mediaUrl } from "../../lib/video-sources";
import manifestJson from "../../../public/vault/ransom/manifest.json";

export type Variant = { file: string; w: number; h: number };
export type Manifest = Record<string, Variant[]>;

export const RANSOM: Manifest = manifestJson as Manifest;

// where the sprites are served from (R2 in prod, /public in dev)
export const RANSOM_BASE = "/vault/ransom/";
export function spriteUrl(file: string): string {
  return mediaUrl(`${RANSOM_BASE}${file}`);
}

// Characters we have cutouts for. Everything else (space, unknown) is rendered as a gap.
export function hasGlyph(ch: string): boolean {
  return RANSOM[ch] !== undefined;
}

// A small deterministic PRNG (mulberry32) so a given seed reproduces the same note — the
// hero holds a stable composition per phrase, and "Re-roll" just bumps the seed.
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// hash a string to a stable 32-bit seed (so the same phrase defaults to the same note)
export function hashSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export type Placed = {
  kind: "glyph" | "space";
  ch: string;
  variant?: Variant;
  rot: number;      // deg tilt
  dy: number;       // baseline offset, in em of the line height
  scale: number;    // per-letter scale multiplier
  mx: number;       // extra horizontal gap after (em)
  depth: number;    // 0..1 parallax depth (seeded) — far scraps lean less toward the cursor
};

export type JitterConfig = {
  rot: number;    // max |tilt| in deg
  dy: number;     // max baseline bounce (em)
  scale: number;  // scale variance (0.1 => 0.9..1.1)
  gap: number;    // max extra gap between letters (em)
};

export const DEFAULT_JITTER: JitterConfig = {
  rot: 8,     // lively but readable
  dy: 0.06,
  scale: 0.12,
  gap: 0.05,
};

// All cutout variants available for a given character (via its manifest key), or [] if none.
// Used by click-to-swap so a scrap can flip to a *different* scrap of the same letter.
export function variantsFor(ch: string): Variant[] {
  const key = keyFor(ch);
  return key ? RANSOM[key] : [];
}

// Resolve a character to a manifest key. Uppercase/lowercase share a folder in the pack
// (variants already mix cases), so we upcase letters; a few symbols map to shared keys.
function keyFor(ch: string): string | null {
  if (ch === " ") return null;
  const up = ch.toUpperCase();
  if (RANSOM[up]) return up;
  if (RANSOM[ch]) return ch;
  if (ch === "(" || ch === ")") return RANSOM["()"] ? "()" : null;
  if (ch === "." && RANSOM[","]) return null; // no period cutout; render as a small gap
  return null;
}

// Natural rendered width of a composed line at a given letter height (px). Mirrors the
// layout in RansomLine (per-letter width = aspect*scale*lineH, spaces = 0.32em, a small
// inter-item gap of 0.04em, plus each glyph's extra mx gap). Used to fit a line to one row.
export function lineWidth(placed: Placed[], lineH: number): number {
  let w = 0;
  const gap = lineH * 0.04;
  placed.forEach((p, i) => {
    if (i > 0) w += gap;
    if (p.kind === "space") {
      w += lineH * 0.32;
      return;
    }
    const v = p.variant!;
    w += (v.w / v.h) * (lineH * p.scale) + p.mx * lineH;
  });
  return w;
}

// Compose a line of text into placed cutouts using a seed. Deterministic for (text, seed).
export function composeLine(
  text: string,
  seed: number,
  jitter: JitterConfig = DEFAULT_JITTER,
): Placed[] {
  const rnd = mulberry32(seed);
  const out: Placed[] = [];
  for (const ch of text) {
    const key = keyFor(ch);
    if (!key) {
      out.push({ kind: "space", ch, rot: 0, dy: 0, scale: 1, mx: 0, depth: 0 });
      continue;
    }
    const variants = RANSOM[key];
    const v = variants[Math.floor(rnd() * variants.length)];
    out.push({
      kind: "glyph",
      ch,
      variant: v,
      rot: (rnd() * 2 - 1) * jitter.rot,
      dy: (rnd() * 2 - 1) * jitter.dy,
      scale: 1 + (rnd() * 2 - 1) * jitter.scale,
      mx: rnd() * jitter.gap,
      // seeded parallax depth: 0.35..1. Near scraps (→1) lean most toward the cursor,
      // far ones barely move, so the taped collage gets real depth on hover.
      depth: 0.35 + rnd() * 0.65,
    });
  }
  return out;
}

```

### ransom/RansomLine.tsx
```tsx
"use client";

// Renders one composed line of ransom-note cutouts. Each glyph is an <img> of a real
// torn-paper letter, sized to a shared line height (width follows the sprite's aspect),
// tilted / baseline-bounced / scaled per the composition. Spaces become a gap.
//
// Appear vocabulary is "slam & settle": a scrap punches in slightly too big with extra
// tilt and overshoots flat, like it's being pressed / taped onto the page (scale + rotate,
// no vertical drop). `direction` lets the same line animate OUT (fade + shrink) so the card
// can crossfade one phrase into the next with no blank gap.
//
// Each scrap also carries a per-letter parallax `depth` (data-depth) + its resting rotation
// (data-rot) so a cursor engine can lean the whole collage toward the pointer.

import { type CSSProperties, useEffect, useRef, useState } from "react";
import { spriteUrl, variantsFor, type Placed, type Variant } from "./manifest";
import { hapticTap } from "../../lib/haptics";

// Back-out overshoot: scrap springs past its size then settles flat — the "tape-down" snap.
const SLAM_EASE = "cubic-bezier(.34,1.56,.64,1)";
// A calm ease-OUT for the box-width glide. The slam ease overshoots, which on `width` shoved
// neighbors wider-then-back; width should settle monotonically so the row never jitters.
const WIDTH_EASE = "cubic-bezier(.22,.61,.36,1)";
// Switch (phrase→phrase) vertical-pass motion: a soft rise + un-blur in, a quick lift-blur out.
const RISE_EASE = "cubic-bezier(.16,1,.3,1)"; // expo-out — fast start, long glide, no overshoot
const IN_MS = 460; // per-scrap rise-in duration (slower than a slam → smoother, feathered)
const OUT_MS = 240; // lift-blur-out duration (whole line together)
const STAGGER_MS = 26; // left-to-right cascade step on the rise-in
const SWAP_MS = 260; // click-swap flip duration

export function RansomLine({
  placed,
  lineH,
  revealed = true,
  direction = "in",
  staggerStart = 0,
  nowrap = false,
  className = "",
}: {
  placed: Placed[];
  /** cap height of a letter in px (the sprites are 220px tall; width scales to aspect) */
  lineH: number;
  /** when false, letters sit hidden (for an entrance animation) */
  revealed?: boolean;
  /** "in" = slam/settle to rest; "out" = fade + shrink away (for the crossfade) */
  direction?: "in" | "out";
  /** index offset so multiple lines can stagger continuously */
  staggerStart?: number;
  /** keep the whole line on one row (no wrapping) — the caller sizes it to fit */
  nowrap?: boolean;
  className?: string;
}) {
  let gi = staggerStart;
  return (
    <div
      className={`flex items-center justify-center ${nowrap ? "flex-nowrap" : "flex-wrap"} ${className}`}
      style={{ gap: `${lineH * 0.04}px` }}
    >
      {placed.map((p, i) => {
        if (p.kind === "space") {
          return <span key={i} style={{ width: `${lineH * 0.32}px` }} aria-hidden />;
        }
        return (
          <Scrap key={i} p={p} lineH={lineH} revealed={revealed} direction={direction} idx={gi++} />
        );
      })}
    </div>
  );
}

// One cutout letter. Owns two things beyond rendering:
//  • the entrance/exit slam (inner <img> transform, staggered per idx),
//  • click-to-swap — clicking flips the scrap to a DIFFERENT variant of the same character
//    with a quick spin/scale flip (old image flips out, new one slams in over it).
// The outer <span> is the parallax lean layer the cursor engine writes --px/--py/--pr/--ps to.
function Scrap({
  p,
  lineH,
  revealed,
  direction,
  idx,
}: {
  p: Placed;
  lineH: number;
  revealed: boolean;
  direction: "in" | "out";
  idx: number;
}) {
  // A click-chosen override variant, or null to show the composed one. Derived (no effect):
  // when the composition changes (re-roll / phrase switch), p.variant changes identity and
  // the override is dropped so the fresh cutout shows.
  const [override, setOverride] = useState<{ base: Variant; picked: Variant } | null>(null);
  const variant = override && override.base === p.variant ? override.picked : p.variant!;
  // During a swap: `incoming` = the new width target (box glides to it); `outgoing` = the OLD
  // cutout, rendered as an overlay that flips OUT on top of the already-promoted base.
  const [incoming, setIncoming] = useState<Variant | null>(null);
  const [outgoing, setOutgoing] = useState<Variant | null>(null);
  const swapTimer = useRef<number | null>(null);
  useEffect(() => () => {
    if (swapTimer.current) window.clearTimeout(swapTimer.current);
  }, []);

  const h = lineH * p.scale;
  const aspect = (vr: Variant) => (vr.w / vr.h) * h;
  const w = aspect(variant); // width of the currently-shown variant
  // While swapping, the box targets the INCOMING variant's width immediately (on click), so
  // it glides to the real size right away and neighbors slide along with it — no end-of-swap
  // jump. The two images inside keep their own true widths so neither distorts mid-animation.
  const boxW = incoming ? aspect(incoming) : w;

  const baseY = (p.dy * lineH).toFixed(2);
  const leanTransform = `translate(var(--px, 0px), calc(${baseY}px + var(--py, 0px))) rotate(var(--pr, 0deg)) scale(var(--ps, 1))`;
  const restInner = `translateY(0px) rotate(${p.rot}deg) scale(1)`;
  // Switch vocabulary — a soft VERTICAL PASS with a feathered blur (the note re-assembling):
  //   • in  → the scrap rises from just below, un-blurs and settles (staggered L→R);
  //   • out → the scrap lifts up, blurs and fades away (peeled off the board).
  const RISE = Math.max(10, lineH * 0.18);
  const hiddenInner =
    direction === "in"
      ? `translateY(${RISE.toFixed(1)}px) rotate(${(p.rot * 1.25).toFixed(2)}deg) scale(0.96)`
      : `translateY(${(-RISE * 0.8).toFixed(1)}px) rotate(${(p.rot * 0.8).toFixed(2)}deg) scale(0.98)`;
  // drop-shadow is constant (the paper contact); the blur is what animates on the switch.
  const SHADOW = "drop-shadow(0 2px 3px rgba(20,20,25,0.16)) drop-shadow(0 6px 10px rgba(20,20,30,0.10))";
  const blurAmt = revealed ? 0 : direction === "in" ? 3.5 : 5;

  const swap = () => {
    if (incoming) return; // already mid-swap
    const all = variantsFor(p.ch);
    const others = all.filter((v) => v.file !== variant.file);
    if (!others.length) return; // only one cutout for this letter — nothing to swap to
    hapticTap();
    const next = others[Math.floor(Math.random() * others.length)];
    // Promote immediately: the BASE image now shows `next` (fully opaque, at rest), and the
    // OLD variant becomes a transient overlay that flips OUT on top of it. So when the overlay
    // is removed at the end, the base is already the final letter — no empty blink frame.
    setOverride({ base: p.variant!, picked: next });
    setOutgoing(variant); // the letter we're leaving, flips out over the new base
    setIncoming(next); // (kept for the box-width target)
    swapTimer.current = window.setTimeout(() => {
      setOutgoing(null);
      setIncoming(null);
    }, SWAP_MS);
  };

  const outerStyle: CSSProperties = {
    transform: leanTransform,
    // No CSS transition here: the magnetism/drag/breathe hook eases every value per frame in
    // JS, so a CSS transition on top would just add lag and fight the spring. When the hook is
    // inactive (reduced-motion / touch) the vars stay 0 and this is a plain static transform.
    willChange: "transform",
    marginRight: `${p.mx * lineH}px`,
    lineHeight: 0,
    cursor: "grab",
    touchAction: "none", // let the scrap own drag gestures (no scroll hijack fighting)
  };
  const wrapStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    width: `${boxW}px`,
    height: `${h}px`,
    transformOrigin: "center center",
    transform: revealed ? restInner : hiddenInner,
    opacity: revealed ? 1 : 0,
    transition:
      direction === "in"
        ? // rise + un-blur + fade in, per-letter staggered L→R on a smooth ease-out.
          `transform ${IN_MS}ms ${RISE_EASE} ${idx * STAGGER_MS}ms, opacity ${Math.round(IN_MS * 0.7)}ms ease ${idx * STAGGER_MS}ms, filter ${IN_MS}ms ease ${idx * STAGGER_MS}ms, width ${SWAP_MS}ms ${WIDTH_EASE}`
        : // lift + blur + fade out, quick, all letters together (no cascade) so it clears fast.
          `transform ${OUT_MS}ms cubic-bezier(.4,0,.7,1), opacity ${OUT_MS}ms ease, filter ${OUT_MS}ms ease, width ${SWAP_MS}ms ${WIDTH_EASE}`,
    filter: `${SHADOW} blur(${blurAmt}px)`,
    willChange: "transform, opacity, filter, width",
  };

  // Each image keeps its OWN true aspect width (centered in the box) so the animating box
  // width never stretches/distorts a scrap. Both are absolute + centered so they overlap.
  const imgBase = (vr: Variant): CSSProperties => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    width: `${aspect(vr)}px`,
    height: `${h}px`,
    transition: `transform ${SWAP_MS}ms ${SLAM_EASE}, opacity ${SWAP_MS}ms ease`,
  });

  return (
    <span
      style={outerStyle}
      data-depth={p.depth ?? 0.5}
      onPointerDown={(e) => {
        // don't begin a native text selection / image drag when grabbing a scrap
        e.preventDefault();
      }}
      onClick={(e) => {
        // a real drag sets data-dragging on this element (see use-magnetism); a click that
        // follows a drag should NOT swap — only a genuine tap does.
        if (e.currentTarget.dataset.dragging) return;
        swap();
      }}
    >
      <span style={wrapStyle}>
        {/* BASE: always the shown variant, fully at rest. During a swap it's already the NEW
            cutout underneath, so removing the overlay reveals it with no empty frame. */}
        <img
          src={spriteUrl(variant.file)}
          alt={p.ch}
          draggable={false}
          decoding="async"
          className="select-none"
          style={{
            ...imgBase(variant),
            transform: "translate(-50%,-50%)",
            // during a swap the new letter slams in via the overlay, so keep the base itself
            // steady (no reverse transition = no blink); at rest it's just the letter.
            transition: "none",
          }}
        />
        {/* OVERLAY: the OLD cutout, flipping OUT on top of the already-swapped base (spin +
            shrink + fade). When it finishes and unmounts, the new base is simply revealed. */}
        {outgoing && (
          <img
            src={spriteUrl(outgoing.file)}
            alt=""
            aria-hidden
            draggable={false}
            decoding="async"
            className="select-none"
            style={{
              ...imgBase(outgoing),
              animation: `ransom-swap-out ${SWAP_MS}ms ${SLAM_EASE} both`,
            }}
          />
        )}
      </span>
    </span>
  );
}

// A RansomLine that manages its OWN entrance: mounts hidden, then slams in on the next
// frame. Remount it (change its `key`) to replay the slam — used by the playground's
// Re-roll / live edits so a fresh composition punches back in with no shared reveal state.
export function SlammingLine(props: Omit<Parameters<typeof RansomLine>[0], "revealed">) {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    const r = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(r);
  }, []);
  return <RansomLine {...props} revealed={revealed} />;
}

```

### ransom/RansomNoteCard.tsx
```tsx
"use client";

// A live, display-only Vault card: short phrases assembled as a ransom note out of real
// torn-paper cutout letters. Each phrase SLAMS in letter-by-letter (scale + tilt overshoot,
// like it's taped down), holds, then CROSSFADES straight into the next — the outgoing line
// shrinks/fades out while the incoming line is already slamming in over it, so there's no
// blank gap. Moving the cursor magnetizes each scrap toward the pointer by its own proximity
// (near letters lean + lift, far ones stay put). Pauses when offscreen / hidden.

import { useEffect, useMemo, useRef, useState } from "react";
import { RansomLine } from "./RansomLine";
import { useMagnetism } from "./use-magnetism";
import { composeLine, hashSeed, lineWidth, DEFAULT_JITTER, type Placed } from "./manifest";

// kept short so they compose cleanly on one card and stay readable
const PHRASES = ["stay weird", "make stuff", "be kind", "trust me", "keep going", "no rules"];

// cycle timing
const REVEAL_HOLD = 1800; // ms held fully revealed (quicker resting state)
const CROSS_OVERLAP = 150; // ms after the old line lifts off before the new one rises in
const OUT_MS = 260; // how long the outgoing line stays mounted while it lifts + blurs away

type Slot = { key: number; phraseIdx: number; placed: Placed[]; direction: "in" | "out"; revealed: boolean };

export function RansomNoteCard({
  bare = false,
  viewTransitionName,
}: {
  bare?: boolean;
  viewTransitionName?: string;
} = {}) {
  void bare;
  const hostRef = useRef<HTMLDivElement>(null);
  const [avail, setAvail] = useState(900);

  // The card renders 1 or 2 stacked lines: the current one (slamming in / resting) and,
  // briefly during a switch, the outgoing one (fading out underneath). A monotonic key
  // guarantees React remounts each line so its enter transition re-fires. The counter lives
  // in a ref and is only ever bumped inside effects/handlers (never during render).
  const seq = useRef(1);
  const makeSlot = (phraseIdx: number): Slot => ({
    key: seq.current++,
    phraseIdx,
    placed: composeLine(PHRASES[phraseIdx].toUpperCase(), hashSeed(PHRASES[phraseIdx]), DEFAULT_JITTER),
    direction: "in",
    revealed: false,
  });
  // Initial slot built without touching the ref (key 0), so nothing is read during render.
  const [slots, setSlots] = useState<Slot[]>(() => [
    {
      key: 0,
      phraseIdx: 0,
      placed: composeLine(PHRASES[0].toUpperCase(), hashSeed(PHRASES[0]), DEFAULT_JITTER),
      direction: "in",
      revealed: false,
    },
  ]);

  // fit the CURRENT phrase to ONE row: comfortable target height, scaled down if it would
  // overflow the card's usable width (padding leaves ~86% for the letters). The outgoing
  // line reuses this height (it's leaving, exact fit doesn't matter).
  const current = slots[slots.length - 1];
  const lineH = useMemo(() => {
    const usable = avail * 0.86;
    const target = Math.max(34, Math.min(80, Math.round(avail * 0.062)));
    const natural = lineWidth(current.placed, target);
    return natural > usable ? Math.max(30, Math.floor((target * usable) / natural)) : target;
  }, [current.placed, avail]);

  // ── cycle: slam in → hold → crossfade to next ──────────────────────────────
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ro = new ResizeObserver(() => setAvail(host.clientWidth));
    ro.observe(host);

    if (reduced) {
      // static: just show the current phrase revealed, no cycling. Deferred a frame so it
      // isn't a synchronous set in the effect body (avoids a cascading render).
      const raf = requestAnimationFrame(() =>
        setSlots((s) => [{ ...s[s.length - 1], revealed: true }]),
      );
      return () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
      };
    }

    let onScreen = false;
    let hidden = false;
    let hovering = false; // freeze the phrase while the cursor is on the card
    let running = false;
    const timers = new Set<number>();
    const after = (fn: () => void, ms: number) => {
      const id = window.setTimeout(() => {
        timers.delete(id);
        fn();
      }, ms);
      timers.add(id);
      return id;
    };
    const clearTimers = () => {
      for (const id of timers) window.clearTimeout(id);
      timers.clear();
    };

    const revealCurrent = () => {
      // flip the just-mounted line to revealed so it slams in.
      setSlots((s) => s.map((sl, i) => (i === s.length - 1 ? { ...sl, revealed: true } : sl)));
    };

    const toNext = () => {
      if (!running) return;
      setSlots((s) => {
        const cur = s[s.length - 1];
        const nextIdx = (cur.phraseIdx + 1) % PHRASES.length;
        // mark current as leaving (out), add the next as an incoming hidden line on top.
        const leaving: Slot = { ...cur, direction: "out", revealed: false };
        const incoming = makeSlot(nextIdx);
        return [leaving, incoming];
      });
      // drop the outgoing line once it's faded, and slam the incoming one in.
      after(() => setSlots((s) => s.slice(-1)), OUT_MS);
      after(revealCurrent, CROSS_OVERLAP);
      // schedule the next switch.
      after(toNext, CROSS_OVERLAP + REVEAL_HOLD);
    };

    const start = () => {
      if (running) return;
      running = true;
      // reveal whatever's current, then begin the loop.
      revealCurrent();
      after(toNext, REVEAL_HOLD);
    };
    const stop = () => {
      running = false;
      clearTimers();
    };
    // Freeze the auto-cycle while hovering, so a phrase never switches out from under the
    // cursor mid-interaction (the letters you're leaning / dragging stay put). Because a
    // switch only ever fires from a queued timer, stopping before it fires leaves the current
    // phrase fully settled; leaving resumes the loop and the next switch happens then.
    const sync = () => (onScreen && !hidden && !hovering ? start() : stop());

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

    // pause on hover, resume on leave (pointer devices only — a touch has no lingering hover)
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const onEnter = () => {
      hovering = true;
      sync();
      // if a crossfade was mid-flight when the pointer arrived, collapse to a single clean,
      // fully-revealed line so it freezes tidily (no half-faded outgoing scrap left behind).
      setSlots((s) => {
        if (s.length === 1 && s[0].revealed && s[0].direction === "in") return s;
        const cur = s[s.length - 1];
        return [{ ...cur, direction: "in", revealed: true }];
      });
    };
    const onLeave = () => {
      hovering = false;
      sync();
    };
    if (canHover) {
      host.addEventListener("pointerenter", onEnter);
      host.addEventListener("pointerleave", onLeave);
    }

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      host.removeEventListener("pointerenter", onEnter);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  // cursor magnetism: each scrap reacts to the pointer's proximity to ITSELF (near letters
  // lean toward it + lift, far ones stay put) — a per-letter field, not a flat card tilt.
  useMagnetism(hostRef);

  return (
    <div
      ref={hostRef}
      data-canvas-card
      aria-label="Short phrases spelled out as a ransom note from torn-paper cutout letters, revealing one letter at a time."
      style={viewTransitionName ? { viewTransitionName } : undefined}
      className="relative mx-auto flex aspect-[1344/620] w-full select-none items-center justify-center overflow-hidden rounded-[12px] border border-[var(--border-line)] bg-[var(--bg-page)] px-10 sm:px-16"
    >
      {/* Stacked lines: outgoing (leaving) sits under the incoming during a crossfade.
          Absolute so both occupy the same centered box; the current one is last. */}
      {slots.map((sl) => (
        <div key={sl.key} className="absolute inset-0 flex items-center justify-center px-10 sm:px-16">
          <RansomLine
            placed={sl.placed}
            lineH={lineH}
            revealed={sl.revealed}
            direction={sl.direction}
            nowrap
          />
        </div>
      ))}
    </div>
  );
}

```

### ransom/playground.tsx
```tsx
"use client";

// Ransom-note playground — the detail-page editor. Type any text and it composes into a
// note built from real torn-paper cutout letters, with live jitter controls (tilt, bounce,
// scale variance, spacing, size) and a Re-roll that reshuffles which cutouts are used.
// Built on the shared composeLine picker the display card uses.

import { useEffect, useMemo, useRef, useState } from "react";
import { SlammingLine } from "./RansomLine";
import { useMagnetism } from "./use-magnetism";
import { composeLine, hashSeed, lineWidth, type JitterConfig } from "./manifest";
import { PG_PREVIEW, PG_PANEL, Slider, GhostButton } from "../swirl/controls";
import { SectionLabel } from "../section-label";
import { hapticTap } from "../../lib/haptics";

const LABEL = "text-[12px] text-[var(--text-tertiary)]";

export function RansomNotePlayground() {
  const [text, setText] = useState("stay weird");
  const [seed, setSeed] = useState(() => hashSeed("stay weird"));
  const [jit, setJit] = useState<JitterConfig>({ rot: 8, dy: 0.06, scale: 0.12, gap: 0.2 });
  const [size, setSize] = useState(78);
  const stageRef = useRef<HTMLDivElement>(null);
  const [avail, setAvail] = useState(900); // usable inner width of the preview
  // bumps on every Re-roll so the lines remount (via key) and slam back in.
  const [playKey, setPlayKey] = useState(0);

  // split into lines (Enter breaks a line); compose each with a per-line seed so re-roll
  // reshuffles everything at once.
  const lines = useMemo(() => {
    const raw = (text || " ").split("\n");
    return raw.map((ln, i) => composeLine(ln.toUpperCase(), seed + i * 101, jit));
  }, [text, seed, jit]);

  // track the stage width so we can shrink each line to fit on ONE row (never wrap)
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setAvail(el.clientWidth));
    ro.observe(el);
    setAvail(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  // cursor magnetism: each scrap reacts to the pointer's proximity to itself (same per-letter
  // field as the display card), scoped to the preview stage.
  useMagnetism(stageRef);

  // per line: use the Size slider as the max height, but scale down if the line would
  // overflow the stage width, so the whole note always stays on a single row.
  const fittedH = (placed: (typeof lines)[number]) => {
    // small safety factor: tilt expands each letter's box a little beyond its upright width
    const room = avail * 0.94;
    const natural = lineWidth(placed, size);
    if (natural <= room || natural <= 0) return size;
    return Math.max(20, Math.floor((size * room) / natural));
  };

  const reroll = () => {
    hapticTap();
    setSeed((s) => (s + 0x9e3779b1) >>> 0);
    setPlayKey((k) => k + 1); // remount → slam the fresh scraps back in
  };

  return (
    <div className="flex min-w-0 flex-col gap-4">
      <SectionLabel action={<GhostButton onClick={reroll}>Re-roll</GhostButton>}>
        Playground
      </SectionLabel>

      {/* live preview */}
      <div className={`${PG_PREVIEW} aspect-[1344/620] w-full bg-[var(--bg-page)]`}>
        <div
          ref={stageRef}
          className="absolute inset-0 flex flex-col items-center justify-center gap-[3%] overflow-hidden px-[5%]"
        >
          {/* Keyed on playKey only, so Re-roll remounts → slams the fresh scraps in, while
              live typing / slider edits update the same lines in place (no replayed slam). */}
          {lines.map((placed, i) => (
            <SlammingLine key={`${playKey}-${i}`} placed={placed} lineH={fittedH(placed)} nowrap />
          ))}
        </div>
      </div>

      {/* controls */}
      <div className={PG_PANEL}>
        {/* text */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <span className={`${LABEL} shrink-0`}>Text</span>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="type a note"
            maxLength={40}
            className="h-8 min-w-0 flex-1 rounded-lg border border-[var(--border-line)] bg-[var(--bg-page)] px-3 text-[12px] text-[var(--text-primary)] outline-none transition-colors duration-150 ease-[var(--ease-out)] placeholder:text-[var(--text-tertiary)] hover:border-[var(--border-ring)] focus:border-[var(--border-ring)] sm:ml-auto sm:w-[220px] sm:flex-none"
          />
        </div>

        {/* two columns of sliders */}
        <div className="grid grid-cols-1 items-start gap-x-6 gap-y-5 sm:grid-cols-2">
          <div className="flex flex-col gap-3 self-start">
            <span className={LABEL}>Chaos</span>
            <Slider label="Tilt" value={jit.rot} min={0} max={22} step={0.5}
              format={(v) => `${v.toFixed(0)}°`} onChange={(v) => setJit((j) => ({ ...j, rot: v }))} />
            <Slider label="Bounce" value={jit.dy} min={0} max={0.2} step={0.005}
              format={(v) => v.toFixed(2)} onChange={(v) => setJit((j) => ({ ...j, dy: v }))} />
          </div>
          <div className="flex flex-col gap-3 self-start">
            <span className={LABEL}>Layout</span>
            <Slider label="Scale mix" value={jit.scale} min={0} max={0.3} step={0.01}
              format={(v) => v.toFixed(2)} onChange={(v) => setJit((j) => ({ ...j, scale: v }))} />
            <Slider label="Spacing" value={jit.gap} min={0} max={0.25} step={0.01}
              format={(v) => v.toFixed(2)} onChange={(v) => setJit((j) => ({ ...j, gap: v }))} />
            <Slider label="Size" value={size} min={40} max={120} step={1}
              format={(v) => `${v.toFixed(0)}px`} onChange={setSize} />
          </div>
        </div>
      </div>
    </div>
  );
}

```18:["$","div",null,{"className":"py-24","children":[["$","script",null,{"type":"application/ld+json","suppressHydrationWarning":true,"dangerouslySetInnerHTML":{"__html":"[{\"@context\":\"https://schema.org\",\"@type\":\"TechArticle\",\"headline\":\"Ransom note\",\"url\":\"https://arlan.me/vault/ransom-note\",\"image\":\"/vault/ransom-note.webp\",\"datePublished\":\"Jul 16, 2026\",\"about\":\"Study\",\"keywords\":\"Type, Collage, Cutout\",\"author\":{\"@type\":\"Person\",\"name\":\"Arlan Marat\",\"url\":\"https://arlan.me\"},\"isPartOf\":{\"@type\":\"CollectionPage\",\"name\":\"Vault\",\"url\":\"https://arlan.me/vault\"}},{\"@context\":\"https://schema.org\",\"@type\":\"BreadcrumbList\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Vault\",\"item\":\"https://arlan.me/vault\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Ransom note\",\"item\":\"https://arlan.me/vault/ransom-note\"}]}]"}}],["$","article",null,{"className":"flex min-w-0 flex-col gap-10 text-[15px] leading-[1.7]","children":[["$","header",null,{"style":{"viewTransitionName":"vault-detail-head"},"className":"flex items-center justify-between gap-4","children":[["$","h1",null,{"className":"font-semibold text-[var(--text-primary)]","children":"Ransom note"}],["$","$L22",null,{"href":"/vault"}]]}],[["$","$L23",null,{"moduleIds":[67009]}],"$L24"],false,["$","div",null,{"style":{"viewTransitionName":"vault-detail-body"},"className":"flex min-w-0 flex-col gap-14","children":[["$","div",null,{"className":"flex flex-col gap-3","children":[["$","p","0",{"className":"text-pretty text-[var(--text-primary)]","children":[["$","$1","0",{"children":"I always liked the ransom-note look, where every letter is torn from a different magazine and taped down crooked. So I took a set of real cut-out letters and made it into something you can type with."}]]}],["$","p","1",{"className":"text-pretty text-[var(--text-primary)]","children":[["$","$1","0",{"children":"Each character picks a random paper scrap from the set, then gets a small random tilt, bounce and size so the line reads like it was assembled by hand, not typed. Type your own note below, tune how messy it is, and re-roll to shuffle the scraps."}]]}]]}],["$","$L25",null,{"children":[["$","$L26",null,{"playground":"ransom"}],["$","section",null,{"className":"flex min-w-0 flex-col gap-3","children":[["$","header",null,{"className":"flex items-center justify-between gap-3 pb-2 border-b border-[var(--border-line)]","children":[["$","h2",null,{"className":"font-semibold text-[var(--text-primary)]","children":"Code"}],["$","$L27",null,{"text":"$28","label":"Copy prompt","hideIcon":true,"className":"inline-flex h-7 shrink-0 items-center self-start rounded-lg border border-[var(--border-line)] bg-[var(--bg-surface)] px-3 text-[12px] font-medium text-[var(--text-secondary)] transition-colors duration-150 ease-[var(--ease-out)] hover:bg-[var(--bg-hover)] hover:border-[var(--border-ring)] hover:text-[var(--text-primary)] active:scale-[0.98]"}]]}],"$L29"]}],"$L2a","$L2b"]}]]}],"$L2c"]}]]}]
