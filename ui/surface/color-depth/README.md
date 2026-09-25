# The art of color depth

- Buttons that feel like real objects, glossy glass or brushed metal or a soft cushion. They look expensive and slow to make. They are neither.
- The depth is just layers stacked on one button: a gradient body, inset shadows for the bevel and glow, a brighter layer that fades in on hover, and a soft bar of light along the top. Below is one button built ten different ways, by technique, not by color. Switch and grab the CSS you want.

## Classification

- Category: `surface` — decorative
- Medium: pure CSS
- Entry point: `upstream/color-depth/standalone/color-depth.html`
- Nature: visual-only; it carries no UX flow of its own. Reuse the look, not the layout.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/color-depth/standalone/color-depth.css`
- `upstream/color-depth/standalone/color-depth.html`
- `upstream/color-depth/standalone/color-depth.js`
- `upstream/color-depth/standalone/color-depth.html`

## Use in an agent run

`PROMPT.md` is the upstream "Copy prompt" payload: intro plus every file inline. Hand it to an
agent verbatim when you want the effect ported into a target project. Read `upstream/` directly when
you only need the technique.

Upstream page: https://www.arlan.me/vault/color-depth

## Usage

Copy `src/` into a React + Tailwind v4 project. It imports only `react`, `clsx` and `tailwind-merge` (through
`src/lib/utils.ts`). `color-depth.css` is the upstream stylesheet with every colour turned into a declared variable
(upstream value in oklch) and alpha variants written as `color-mix(in srgb, var(--…) N%, transparent)`: shared
`--depth-white`, `--depth-black`, `--depth-knob-dark`, `--depth-slate`, `--depth-slate-deep` on `.depth-btn`, and
numbered per-material variables (`--depth-glossy-1…7`, `--depth-glow-1…12`, `--depth-metal-1…5`, `--depth-inset-1…3`,
`--depth-glass-1`, `--depth-foil-1…18`, `--depth-neon-1…3`, `--depth-duotone-1…8`, `--depth-satin-1…4`, numbered in
order of first use, so `-1`/`-2` are usually the body gradient) on each material class. Neon's ring colour is
`--neon`. The font is `--font-sans`; the icon radius is `--radius + 4px`. `src/demo.tsx` is sample wiring only.
Without React, use the CSS with the markup below and reproduce the two behaviours listed under Interactions.

### DepthButton — `depth-button.tsx`

- Props: `material` (`glossy` | `glow` | `metal` | `layered` | `inset` | `glass` | `neon` | `duotone` | `satin` |
  `foil`), `shape` (`pill` default | `icon`), `children` (label or icon), plus any `<button>` attribute (`type`
  defaults to `button`). `DEPTH_MATERIALS` lists the ten.
- Structure: `<button class="depth-btn depth-<material> [depth-icon]"><span class="depth-label">…</span></button>`.
  Pill: 44 px tall, 22 px side padding, fully rounded, 500 15 px/1 text, 0.01 em tracking, `overflow: hidden`,
  `isolation: isolate`; `::before` / `::after` are inset layers (z 1) under the label (z 2). Icon: 44 × 44.
  Foil wraps the label in five layers: `depth-foil-base`, `-film`, `-pearl` (under), `-shine`, `-glare` (over).
  Glass also renders `GlassFilter`, the `#liquid-glass-filter` SVG (feImage displacement map → three per-channel
  `feDisplacementMap`s at −14/−13/−12 → screen blend → 0.4 blur) that `.depth-glass` uses as `backdrop-filter`
  (falls back to `blur(2px)` where url() backdrop filters are unsupported); put glass over something colourful.
- Materials: Glossy — orange gradient body, inner rim light, bottom weight, blurred white bar overhanging the top
  (hover: bar 0.7 → 0.9 opacity, top −5 → −3 px, 0.3 s). Glow — dark-to-violet body with inset glows; `::before`
  brighter layer fades in on hover (0.2 s). Metal — brushed 1 px streaks over a cool bevelled gradient; `::after`
  glint at `--pointer-x`. Layered — translucent black body + top sheen (`::before` 0.1 → 0.15 on hover, 0 on press) +
  hairline rim; works over any fill. Inset — recessed into a light page (top inner shadow, bottom highlight, 1 px lit
  lip below); hover deepens, press flattens. Glass — refraction + gradient ring + diagonal shine + top edge line.
  Neon — 1 px `--neon` ring with a faint inner glow on near-black; hover firms it. Duotone — extruded key from
  stacked 1 px hard shadows (6 px side); hover −1 px, press +5 px (0.12 s `cubic-bezier(0.22, 1, 0.36, 1)`).
  Satin — flat pastel with a soft radial dome; hover `brightness(1.03)`, press inset shade. Foil — silver base with a
  drifting rainbow band (7 s) and film blobs (9 s, alternate), pearl sheen, shine band and glare dot that follow the
  pointer; drift stops under reduced motion.
- Interactions: Metal and Foil track the pointer — on `pointermove` (coalesced to one write per animation frame) set
  `--pointer-x/y` and `--glare-x/y` to the pointer position in % of the box and `--shine-angle` to
  `110 + (x − 0.5) × 50` deg; on `pointerleave` reset to 50 %. The CSS transitions (0.12 s linear) smooth it. Disabled
  under `prefers-reduced-motion: reduce`.
- Keyboard: a native `<button>` (Tab to focus, Enter/Space to activate).

### DepthToggle — `depth-button.tsx`

- Props: `material` (any except `foil`), `checked`, `onCheckedChange(next)`, plus `<button>` attributes (give it an
  `aria-label`).
- Structure: `<button role="switch" aria-checked class="depth-btn depth-toggle depth-<material>" data-on>` 76 × 44
  holding a `depth-knob`: 30 px circle at 7 px inset with a top highlight / bottom shade and a hairline rim, white
  (`--knob`) or `--depth-knob-dark` on the pale materials (inset, satin, metal, glass).
- States: `data-on="true"` → knob `translateX(32px)` (0.28 s `cubic-bezier(0.22, 1, 0.36, 1)`);
  `data-on="false"` → track `saturate(0.6) brightness(0.94)`.
- Interactions / Keyboard: click, Enter or Space calls `onCheckedChange(!checked)`.
