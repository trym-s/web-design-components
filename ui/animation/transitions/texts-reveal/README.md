# Texts Reveal

A headline + supporting line that rise into view with staggered blur — hero copy, empty states, onboarding steps.

## Classification

- Category: `animation` — decorative
- Medium: React + TypeScript + CSS transitions (Tailwind v4 for layout)
- Entry point: `reference.tsx`
- Nature: decorative; reuse the staggered blur rise

## Files

- `src/` — copy-paste component, hand-derived from `reference.tsx` and `styles.css`
- `reference.tsx` — upstream capture and dashboard entry point
- `styles.css` — the upstream transition CSS
- `preview.png` — capture from the original site

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens. It imports only `react`, `clsx` and `tailwind-merge` (through `lib/utils.ts`). `texts-reveal.css` is the upstream transition CSS with colours moved to tokens: every timing, distance and easing is a custom property on `:root` — override it globally or on the element. `src/demo.tsx` is sample wiring only.

### StaggerReveal — `texts-reveal.tsx`

- Props: `primary` (semibold `--foreground` line), `secondary` (`--muted-foreground` line), `shown`, `className`.
- Structure: two block lines; `aria-hidden` while not shown.
- Motion: showing, both lines rise from `--stagger-distance` (12 px) below with blur `--stagger-blur` (3 px) and opacity 0 to
  rest over `--stagger-dur` (500 ms, `cubic-bezier(0.22, 1, 0.36, 1)`), the second line `--stagger-stagger` (40 ms) later.
  Hiding simply fades both out in place over 200 ms.
- Keyboard: none.
