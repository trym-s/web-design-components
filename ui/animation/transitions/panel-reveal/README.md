# Panel Reveal

A panel that slides into view inside an existing container — e.g.

## Classification

- Category: `animation` — interactive
- Medium: React + TypeScript + CSS transitions (Tailwind v4 for layout)
- Entry point: `reference.tsx`
- Nature: interactive; reuse the slide-up blur reveal

## Files

- `src/` — copy-paste component, hand-derived from `reference.tsx` and `styles.css`
- `reference.tsx` — upstream capture and dashboard entry point
- `styles.css` — the upstream transition CSS
- `preview.png` — capture from the original site

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens. It imports only `react`, `clsx` and `tailwind-merge` (through `lib/utils.ts`). `panel-reveal.css` is the upstream transition CSS with colours moved to tokens: every timing, distance and easing is a custom property on `:root` — override it globally or on the element. `src/demo.tsx` is sample wiring only.

### PanelReveal — `panel-reveal.tsx`

- Props: `open`, `children`, `id` (for the trigger's `aria-controls`), `className` (the clipping frame), `panelClassName`.
- Structure: an `overflow-hidden` frame holding the panel (`h-full`, `data-open`, `inert` while closed).
- Motion: closed, the panel sits `--panel-translate-y` (100 px) down, transparent and blurred `--panel-blur` (2 px); opening
  slides it up to 0 with opacity 1 and no blur over `--panel-open-dur` (400 ms); closing reverses over `--panel-close-dur`
  (350 ms); `cubic-bezier(0.22, 1, 0.36, 1)`. Reduced motion: instant.
- Keyboard: the caller's trigger (e.g. a button with `aria-expanded` / `aria-controls`); closed content is inert.
