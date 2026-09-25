# Icon Swap

Cross-fading two icons in the same slot — hamburger ↔ close, sun ↔ moon, play ↔ pause, expand ↔ collapse.

## Classification

- Category: `animation` — interactive
- Medium: React + TypeScript + CSS transitions (Tailwind v4 for layout)
- Entry point: `reference.tsx`
- Nature: interactive; reuse the stacked cross-fade

## Files

- `src/` — copy-paste component, hand-derived from `reference.tsx` and `styles.css`
- `reference.tsx` — upstream capture and dashboard entry point
- `styles.css` — the upstream transition CSS
- `preview.png` — capture from the original site

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens. It imports only `react`, `lucide-react` (demo icons), `clsx` and `tailwind-merge` (through `lib/utils.ts`). `icon-swap.css` is the upstream transition CSS with colours moved to tokens: every timing, distance and easing is a custom property on `:root` — override it globally or on the element. `src/demo.tsx` is sample wiring only.

### IconSwap — `icon-swap.tsx`

- Props: `iconA`, `iconB`, `state` (`a` | `b`) / `defaultState` / `onStateChange(state)`, `labelA` / `labelB` (accessible name
  while each icon shows — describe what a click does), `className`.
- Structure: a button holding an inline grid; both icons sit in the same cell (`grid-area: 1 / 1`) and stay in the DOM.
- Motion: the visible icon has opacity 1, blur 0, scale 1; the hidden one opacity 0, blur `--icon-swap-blur` (2 px), scale
  `--icon-swap-start-scale` (0.25). Switching cross-fades both over `--icon-swap-dur` (250 ms) `ease-in-out`. Reduced motion:
  instant.
- Keyboard: native button; Enter/Space toggles; `aria-label` follows the state.
