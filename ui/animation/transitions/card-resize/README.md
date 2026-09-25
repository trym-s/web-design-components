# Card Resize

Tweening a container's width or height when its layout state changes (compact ↔ expanded card, collapsing panel, list row toggling extra detail).

## Classification

- Category: `animation` — interactive
- Medium: React + TypeScript + CSS transitions (Tailwind v4 for layout)
- Entry point: `reference.tsx`
- Nature: interactive; reuse the width/height tween

## Files

- `src/` — copy-paste component, hand-derived from `reference.tsx` and `styles.css`
- `reference.tsx` — upstream capture and dashboard entry point
- `styles.css` — the upstream transition CSS
- `preview.png` — capture from the original site

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens. It imports only `react`, `clsx` and `tailwind-merge` (through `lib/utils.ts`). `card-resize.css` is the upstream transition CSS with colours moved to tokens: every timing, distance and easing is a custom property on `:root` — override it globally or on the element. `src/demo.tsx` is sample wiring only.

### CardResize — `card-resize.tsx`

- Props: `width` and `height` (px — changing either tweens), `children`, `className`.
- Structure: a box with inline `width`/`height`; content inside is laid out normally (clip or let it reflow).
- Motion: width and height transition over `--resize-dur` (300 ms) on `--resize-ease` `cubic-bezier(0.22, 1, 0.36, 1)`;
  pure CSS, the caller only changes the numbers. Reduced motion: instant.
- Keyboard: none.
