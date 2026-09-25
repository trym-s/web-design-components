# Dia Browser's gradient

- Dia Browser has a soft glow at the bottom of the screen. A row of blurry colour bars, short on the sides and tall in the middle, going from dark up through blue, white, yellow, red and pink, then fading out at the top. It grows up from the floor when the page loads.
- It is simpler than it looks. Just a few tall rectangles in one small SVG, all painted with the same rainbow and blurred a lot so they melt together. It starts flat at the bottom and scales up to full height, so it looks like it rises from the floor. Below you can change the bars, the blur, the curve and the colours.

## Classification

- Category: `effects` — decorative
- Medium: SVG + blur
- Entry point: `upstream/dia-gradient/standalone/DiaGradient.tsx`
- Nature: visual-only; it carries no UX flow of its own. Reuse the look, not the layout.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/dia-gradient/standalone/DiaGradient.tsx`
- `upstream/dia-gradient/standalone/PeakedGradient.tsx`
- `upstream/dia-gradient/standalone/DodgeGradient.tsx`

## Use in an agent run

`PROMPT.md` is the upstream "Copy prompt" payload: intro plus every file inline. Hand it to an
agent verbatim when you want the effect ported into a target project. Read `upstream/` directly when
you only need the technique.

Upstream page: https://www.arlan.me/vault/dia-gradient

## Usage

Copy `src/` into a React + Tailwind v4 project. It imports only `react`, `clsx` and `tailwind-merge` (through
`src/lib/utils.ts`). Each component fills its parent: place it in a positioned, sized box anchored to the bottom of a
page or panel (e.g. `absolute inset-x-0 bottom-0 h-[55vh]`). `src/demo.tsx` is sample wiring only.

Colours are CSS variables declared on each component root (upstream hex values in oklch, in `palette.ts`):
`--dia-1` … `--dia-8` (ember `oklch(0.222 0.068 32.2)`, blue `oklch(0.531 0.247 262.2)`, steel
`oklch(0.639 0.105 244.7)`, ice `oklch(0.94 0.027 260.3)`, yellow `oklch(0.881 0.181 94)`, red-orange
`oklch(0.646 0.228 32)`, magenta `oklch(0.693 0.315 330.1)`, transparent pink `oklch(0.884 0.106 327.5 / 0)`), and for
the dodge variant `--dodge-1` … `--dodge-6` (red, yellow, green, cyan, blue, magenta), `--dodge-floor` (black) and
`--dodge-top` (`oklch(0.976 0 0)`). Override with a class, e.g. `className="[--dia-5:var(--chart-4)]"`.

All three rise from the floor on mount: the root starts at `scaleY(0)` with `transform-origin: bottom` and, two
animation frames after mount, transitions to `scaleY(1)` over `riseMs` (1100 ms) with `cubic-bezier(0.16, 1, 0.3, 1)`.
All are `aria-hidden`, `pointer-events: none`, decorative only; no interactions and no keyboard behaviour.

### DiaGradient — `dia-gradient.tsx`

- Props: `bars` (9), `blur` (15, viewBox units), `peak` (0.98 — tallest bar as a fraction of the height), `valley`
  (0.55 — edge bar height relative to the peak), `stops` (`{ offset, color }[]`, default the eight `--dia-*` stops at
  0, 0.1827, 0.2837, 0.4135, 0.5866, 0.6827, 0.8029, 1, bottom → top), `riseMs`, `className`.
- Structure: an SVG with viewBox `0 0 1271 599`, `preserveAspectRatio="none"`. One vertical `linearGradient`
  (bottom → top, bounding-box units so each bar shows the whole rainbow over its own height) and one
  `feGaussianBlur` filter (region −50 %/200 %). `bars` rects: column width `1271 / bars`, each drawn 1.23 × that wide
  so neighbours overlap; bar `i` height = `peak × 599 × (valley + (1 − valley) × (1 − t^1.24))` where
  `t = |i − mid| / mid`, bottom-aligned.
- States: hidden (scaleY 0) → risen.

### PeakedGradient — `peaked-gradient.tsx`

- Props: `colors` (front → back; default ice, yellow, red-orange, magenta, blue, ember), `peak` (0.92), `pointiness`
  (0 round … 1 sharp, 0.5), `blur` (26), `reveal` (`mount` | `scroll` | `none`), `riseMs`, `replayKey` (change to replay),
  `className`, `style` (size it with these; it has no intrinsic size).
- Structure: same viewBox; one blurred group of closed quadratic arches, drawn back (darkest, widest, lowest) to front:
  for layer `t` 0 → 1, width `1.05 − 0.45t` of the box, height `peak × (0.55 + 0.45t)`; control points spread
  `(1 − pointiness) × width / 2` either side of the peak; each path extends 0.6 × the height below the floor.
- States: `mount` → rises once; `scroll` → scaleY = clamp((viewportHeight − top) / (0.65 × viewportHeight)), no
  transition, updated per animation frame on scroll/resize; `none` or reduced motion → always 1.

### DodgeGradient — `dodge-gradient.tsx`

- Props: `colors` (rainbow band, left → right, looped back to the first; default `--dodge-1…6`), `riseMs`, `className`.
- Structure: one block whose background stacks `linear-gradient(0deg, --dodge-floor, --dodge-top)` over
  `linear-gradient(90deg, band…)`, both `in srgb`, with `background-blend-mode: color-dodge, normal`, masked by
  `radial-gradient(75% 170% at 50% 100%, opaque 38%, transparent 78%)` into a dome. Put it on a dark background.
- States: hidden (scaleY 0) → risen.
