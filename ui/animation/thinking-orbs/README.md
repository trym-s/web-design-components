# thinking-orbs

Dotted thought-orb loading indicators for AI & agent UIs. Nine hand-tuned animated states, each shipped at two purpose-tuned sizes, rendered on a plain 2D canvas — no WebGL, no filters, works identically in Chrome, Safari and Firefox.

[Live demo](https://orbs.jakubantalik.com) · [Repository](https://github.com/Jakubantalik/thinking-orbs) · [Report an issue](https://github.com/Jakubantalik/thinking-orbs/issues)

## Install

```bash
npm install thinking-orbs
```

## Quick start

```tsx
import { ThinkingOrb } from 'thinking-orbs';

function Status() {
  return <ThinkingOrb state="searching" size={64} />;
}
```

## States

Nine verbs an agent can be doing, each a distinct animation:

```tsx
<ThinkingOrb state="working" />     {/* particles on tilted orbits */}
<ThinkingOrb state="searching" />   {/* a scan meridian sweeps a dotted globe */}
<ThinkingOrb state="solving" />     {/* bands scramble, then click back solved */}
<ThinkingOrb state="listening" />   {/* a waveform rolls through the rings */}
<ThinkingOrb state="connecting" />  {/* a constellation wires itself */}
<ThinkingOrb state="weaving" />     {/* three strands plait around the sphere */}
<ThinkingOrb state="composing" />   {/* an undulating multi-band sash */}
<ThinkingOrb state="breathing" />   {/* a ring slowly morphing */}
<ThinkingOrb state="shaping" />     {/* dotted outline: circle → triangle → square */}
```

## Sizes

Two tuned presets — separate designs, not a scale factor. `64` for chat-avatar scale, `20` for inline-text scale. Each carries its own dot count, dot size and speed tuning:

```tsx
<ThinkingOrb state="working" size={64} />
<ThinkingOrb state="working" size={20} />
```

## Theme

Strictly monochrome — light ink for dark backgrounds, dark ink for light backgrounds — with the mode picked automatically from the host project:

```tsx
<ThinkingOrb theme="auto" />   {/* default — detects from the project */}
<ThinkingOrb theme="dark" />   {/* pin: light dots for dark backgrounds */}
<ThinkingOrb theme="light" />  {/* pin: dark dots for light backgrounds */}
```

`auto` resolves in three layers and updates live when any of them change:

1. an ancestor `data-theme="dark|light"` attribute or `dark`/`light` class (the Tailwind / shadcn convention), watched via `MutationObserver`;
2. otherwise `prefers-color-scheme`, subscribed for live OS theme switches;
3. SSR-safe — the canvas paints only on the client, after the theme has resolved.

## Other props

```tsx
<ThinkingOrb
  state="solving"
  size={20}
  speed={1.5}          // multiplier on the preset's baked speed
  paused={false}       // freeze on the current frame
  aria-label="Analysing repository…"  // overrides the per-state default
/>
```

All other `<canvas>` props (`className`, `style`, `data-*`, …) pass through.

## Accessibility & performance

- `role="img"` with a sensible per-state `aria-label` out of the box.
- `prefers-reduced-motion: reduce` renders a static representative frame — no animation — and still follows the live theme.
- Every instance pauses automatically when scrolled offscreen (`IntersectionObserver`) or when the tab is hidden, and resumes in phase — all instances share one clock.
- Plain 2D canvas arcs only: no `ctx.filter`, no SVG filters, no WebGL — the same pixels everywhere, cheap on low-end devices. Device-pixel-ratio capped at 2.

## License

MIT © Jakub Antalik

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens. It imports only `react`; `src/engine/` and
`presets.ts` are the unchanged thinking-orbs 0.2.0 draw modes (MIT, `src/LICENSE`) except that dots are mixed between the
theme's `--foreground` and `--background` instead of fixed grey, so the upstream `theme` prop and its dark/light detection
are gone. `src/demo.tsx` shows all nine states at both sizes.

### ThinkingOrb — `thinking-orb.tsx`

- Props: `state` (`working` | `searching` | `solving` | `listening` | `connecting` | `weaving` | `composing` | `breathing` |
  `shaping`), `size` (64 or 20 — two separately tuned presets), `speed` (×1), `paused`, `aria-label` (defaults to "Working…",
  "Searching…", … "Thinking…" for breathing), plus any canvas attribute and `style`.
- Structure: one `role="img"` canvas, `size`×`size` CSS px (DPR ≤ 2). Each state draws depth-sorted dots (and, for
  connecting, lines) whose ink value maps near → `--foreground`, far → `--background`; see `types.ts` for what each state
  draws (orbits, scanned globe, scrambling bands, waveform rings, constellation, braid, sash, breathing ring, morphing shape).
- Motion: time comes from a shared `performance.now()` clock so all orbs stay in phase; the loop pauses offscreen
  (IntersectionObserver) and on hidden tabs; `prefers-reduced-motion` renders one static frame. Theme changes (class,
  `data-theme`, `style` on any element, or the OS scheme) re-read the tokens.
- Keyboard: none (status indicator; give it a meaningful `aria-label`).
