# Page Side By Side

Sliding between two full pages or screens that live side-by-side: list ↔ detail, step 1 ↔ step 2 in a wizard.

## Classification

- Category: `animation` — interactive
- Medium: React + TypeScript + CSS transitions (Tailwind v4 for layout)
- Entry point: `reference.tsx`
- Nature: interactive; reuse the directional cross-fade between two pages

## Files

- `src/` — copy-paste component, hand-derived from `reference.tsx` and `styles.css`
- `reference.tsx` — upstream capture and dashboard entry point
- `styles.css` — the upstream transition CSS
- `preview.png` — capture from the original site

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens. It imports only `react`, `lucide-react` (demo icons), `clsx` and `tailwind-merge` (through `lib/utils.ts`). `page-side-by-side.css` is the upstream transition CSS with colours moved to tokens: every timing, distance and easing is a custom property on `:root` — override it globally or on the element. `src/demo.tsx` is sample wiring only.

### PageSlide — `page-side-by-side.tsx`

- Props: `page` (1 | 2), `first`, `second` (the two pages), `className` (give it a height — pages are absolutely stacked).
- Structure: a clipped relative box with two absolutely positioned `<section>`s; the inactive one is `inert`.
- Motion: the active page is opacity 1, x 0, blur 0; the inactive one sits `--page-slide-distance` (8 px) toward its own side
  (page 1 to the left, page 2 to the right), blurred `--page-blur` (3 px) and transparent. Switching cross-fades over
  `--page-fade-dur` (250 ms) and slides/blurs over `--page-slide-dur` (250 ms), `cubic-bezier(0.22, 1, 0.36, 1)`, the incoming
  page after `--page-stagger` (0 ms). `--page-exit-enabled: 0` turns off the exit offset and blur.
- Keyboard: the caller's navigation controls; focus stays out of the inert page.
