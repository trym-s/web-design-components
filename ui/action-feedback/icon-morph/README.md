# Icon Morph

Play/pause, menu/close as one mechanism.

## Classification

- Category: `action-feedback` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/icon-morph.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/icon-morph.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/icon-morph

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--card`, `--primary`, `--ring`, …). It imports only `react` and `motion` (`motion/react`). `src/demo.tsx` is sample data and wiring only.

### IconMorph — `icon-morph.tsx`

- Props: `preset` (`"menu-close"` default, `"play-pause"`, `"plus-minus"`, `"check-close"`), or custom `shapes` (array of `{ d: string[], rotate? }` in a 24×24 viewBox) with `mode` (`"stroke"` / `"fill"`) and `labels`; `active` (controlled index or boolean) / `defaultActive` (0); `onActiveChange(index)`; `size` (20 px icon); `strokeWidth` (1.75); `showLabel` (false: square button; true: icon + crossfading label); `semantics` (`"label"`: only `aria-label` changes; `"pressed"`: adds `aria-pressed`; `"expanded"`: adds `aria-expanded`); `disabled`; `className`. The file also exports `useIconMorph(options)` and `iconMorphPresets`.
- Structure: a `<button>` 36 px high (`h-9`; 36 px wide without label, `px-3` with), radius `calc(var(--radius) - 1px)`, 1 px `--border`, `--card` fill, `--foreground` text, 13 px medium label. Inside, an SVG with one `<path>` per slot; every shape is normalised to the same slot count (missing slots collapse to the point 12,12 and fade to opacity 0), so each path's `d` interpolates point-for-point to the next shape. The whole icon also rotates to the shape's `rotate` (menu-close: 0° → 90°; plus-minus: 0° → 180°). Paths use `currentColor` as stroke (stroke mode) or fill (fill mode).
- States: index 0 / 1 (presets have two shapes; custom shapes may have more and cycle). Morph and rotation use a spring (stiffness 520, damping 34, mass 0.45); labels crossfade with a 3 px vertical offset (spring stiffness 260, damping 34, mass 0.8). Focus-visible: 2 px `--ring` ring. Disabled: 50 % opacity. Reduced motion (`prefers-reduced-motion`) swaps every transition for an instant change.
- Interactions: click advances to the next shape (wrapping); the button nudges down 1 px while pressed. `aria-label` is the label of the current state (e.g. "Menu" → "Close").
- Keyboard: native button — Enter / Space toggle.
