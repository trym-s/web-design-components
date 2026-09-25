# Success Check

Confirming a completed action — payment processed, file uploaded, message sent, form saved.

## Classification

- Category: `animation` — decorative
- Medium: React + TypeScript + CSS transitions (Tailwind v4 for layout)
- Entry point: `reference.tsx`
- Nature: decorative; reuse the rotate-blur-bob entrance and path draw

## Files

- `src/` — copy-paste component, hand-derived from `reference.tsx` and `styles.css`
- `reference.tsx` — upstream capture and dashboard entry point
- `styles.css` — the upstream transition CSS
- `preview.png` — capture from the original site

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens. It imports only `react`, `clsx` and `tailwind-merge` (through `lib/utils.ts`). `success-check.css` is the upstream transition CSS with colours moved to tokens: every timing, distance and easing is a custom property on `:root` — override it globally or on the element. `src/demo.tsx` is sample wiring only.

### SuccessCheck — `success-check.tsx`

- Props: `visible`, `children` (the check mark: an SVG whose `path` is drawn with a 20-unit dash), `className`.
- Structure: an inline-block wrapper with `data-state="in|out"`; hidden (opacity 0) while out.
- Motion: on `in`, four animations run together over 500 ms each: fade to opacity 1, rotate from `--check-rotate-from` (80°)
  to 0, un-blur from `--check-blur-from` (10 px), and bob up from `--check-y-amount` (40 px) on the springy
  `cubic-bezier(0.34, 1.35, 0.64, 1)`; the path draws (`stroke-dashoffset` 20 → 0) over `--check-path-dur` (500 ms) after
  `--check-path-delay` (80 ms). Other curves `cubic-bezier(0.22, 1, 0.36, 1)`. Reduced motion: shown at rest.
- Keyboard: none (status mark — announce success in text).
