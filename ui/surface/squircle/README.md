# Apple's corners

- A normal rounded corner has a tiny kink where it meets the flat edge. You feel it before you can name it. Apple fixes this with a squircle, a corner that eases in smooth. Here is the real one on a live button you can play with.

## Classification

- Category: `surface` — structural
- Medium: SVG path / superellipse
- Entry point: `upstream/squircle/playground.tsx`
- Nature: affects real layout/geometry; safe to adopt as a structural primitive, not just a skin.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/squircle/superellipse.ts`
- `upstream/squircle/tokens.ts`
- `upstream/squircle/Squircle.tsx`
- `upstream/squircle/parts.tsx`
- `upstream/squircle/playground.tsx`

## Use in an agent run

`PROMPT.md` is the upstream "Copy prompt" payload: intro plus every file inline. Hand it to an
agent verbatim when you want the effect ported into a target project. Read `upstream/` directly when
you only need the technique.

Upstream page: https://www.arlan.me/vault/squircle

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens. It imports only `react`, `clsx` and
`tailwind-merge` (through `src/lib/utils.ts`). `superellipse.ts` and `tokens.ts` are the upstream geometry and sizing
unchanged; `squircle.css` declares the glossy material's colours on `.squircle-material` (each part's root) with the
upstream values in oklch: `--sq-hi` / `--sq-lo` (white / black, mixed at low alpha for every sheen and shade),
`--sq-face-top|mid|bottom` (body gradient), `--sq-bevel-top|mid|bottom` (border), `--sq-ground`, `--sq-ink-top|bottom`
(label), `--sq-well-top|bottom` (tabs track), `--sq-switch-on-*` / `--sq-switch-off-*`, `--sq-field-top|bottom|border`
(recessed field). Secondary text uses `--muted-foreground`, values `--foreground`, focus rings `--ring`.
`src/demo.tsx` holds the sample messages, options and slider wiring.

### Geometry — `superellipse.ts`, `tokens.ts`

- `squirclePath({ width, height, radius, smoothing, exponent = 5 })` returns a closed SVG path. The effective corner is
  `min(radius, min(w, h) / 2) × (0.4 + 0.6 × smoothing)`. At exponent 5 each corner is three cubic béziers from a
  unit-corner fit (`[0.3,0] [0.473,0] [0.619,0.039]`, `[0.804,0.088] [0.912,0.196] [0.961,0.381]`,
  `[1,0.527] [1,0.7] [1,1]`, rotated per corner); any other exponent samples `x = sin(θ)^(2/n)`,
  `y = 1 − cos(θ)^(2/n)` in 32 line segments. `roundRectPath` is the plain border-radius equivalent; `shapePath` picks one
  (`plain` = compare mode). Apply the path with `clip-path: path("…")`.
- `CONTROL_H` 36, `CONTROL_H_SM` 28, `radiusFor(h) = round(0.42 × h)`, label `TEXT` 14 px, `TRACKING` −0.3 px.

### Squircle — `squircle.tsx`

- Props: `radius`, `smoothing`, `exponent`, `compare`, `fill` (colour → SVG fill; CSS gradient → clipped div),
  `stroke` or `strokeGradient` (top → bottom stops), `strokeWidth` (1), `children`, `contentClassName`, `className`,
  `style`.
- Structure: a relative box that measures its own layout size (ResizeObserver, `offsetWidth/Height` so transforms do not
  skew it); body layer (z 0), content overlay (absolute, centred flex, z 1), border SVG on top (z 3) — the outline is
  stroked at 2 × `strokeWidth` and clipped to the shape so only the inner half shows.

### Parts — `parts.tsx`

Every part takes the shape props `smoothing` (0..1), `exponent` (2..8), `compare` (plain radius). Corners come from
`radiusFor(height)`.

- `GlossySquircle` — the material. Props `w`/`h` (fixed) or omit to size to content, `radius`, `interactive` (press:
  `scale(0.97)` + `brightness(1.04)`, 150 ms), `className`, `contentClassName`. Structure: body gradient
  (`--sq-face-*`, 0 / 52 / 100 %), 1 px bevel stroke gradient, 16 clipped gloss layers (vignette, centre glow, 5 %
  fractal-noise grain in `overlay`, brushed 2 px streaks, 115° light sweep, middle sheen band, side edge-lights, top
  sheen, 1 px glass rim, bottom counter-sheen, bottom light lift, `color-burn` grounding shadow, 0.5 px inner wall,
  1 px fresnel, 6 px AO ring, two corner glints), and a double hairline `drop-shadow` outside.
- `InkLabel` — debossed text: a 2 px blurred halo in `--sq-lo` at 20 %, then the label with a
  `--sq-ink-top → --sq-ink-bottom` gradient clipped to text and white/black drop-shadows (bottom highlight, chiselled
  top). Props `size` (14), `tracking` (−0.3), `className`.
- `SquircleGlossyButton` — 132 × 36. Props `label` ("Get the app"), `onClick`. A transparent covering `<button>`
  (aria-label = label) takes clicks and focus (2 px `--ring`).
- `SquircleTabs` — segmented control, `role="tablist"`. Props `items`, `active`, `onChange(i)`, `width` (224). A 36 px
  recessed track (`--sq-well-*`, inset shadow) with a glossy thumb 3 px inset under the active tab; the thumb slides
  over 300 ms `cubic-bezier(0.32, 0.72, 0, 1)`. Active label is an `InkLabel`, others `--muted-foreground`. Tabs are
  `role="tab"` buttons with `aria-selected`; Tab moves focus, Enter/Space selects.
- `SquircleToggle` — `role="switch"` button, 45 × 28. Props `on`, `onChange(next)`, `label`. Track gradient
  `--sq-switch-on-*` (dark) or `--sq-switch-off-*`, background transition 300 ms; a 20 px glossy thumb slides between
  4 px insets with the same easing. Enter/Space toggles.
- `RecessedSquircle` — fixed `w`/`h` well (`--sq-field-*`, inset 1.5 px 3 px shadow) with a 1 px inner hairline in
  `--sq-field-border`; content is not clipped.
- `SquircleInput` — 200 × 36 recessed field with a search glyph and a real `type="search"` input. Props `placeholder`
  ("Search"), `value`, `onChange(text)`.
- `SquircleStepper` — two glossy 28 px keys around an `aria-live` readout. Props `value`, `onValueChange`, `min` (0),
  `max`. Keys are buttons labelled "Decrease" / "Increase".
- `SquircleDropdown` — 180 × 36 glossy field with the selected option and a chevron that rotates 180° (200 ms) when
  open. Props `options`, `value` (index), `onValueChange(i)`. Clicking toggles a recessed menu that opens upward
  (8 px gap, 34 px rows, `role="listbox"` / `role="option"`, hover/focus `--foreground` at 5 %, selected row semibold
  `--foreground`); choosing closes it; Escape on the trigger closes it.
- `SquircleChat` — 300 px column. Prop `messages: { from: "user" | "assistant", text }[]`; user messages are glossy
  auto-sized bubbles (12 × 8 px padding, right-aligned, no press), assistant messages plain 14 px / 1.5
  `--muted-foreground` text at 86 % width.
