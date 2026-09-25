# Accordion

A disclosure / accordion / collapsible section whose panel grows and shrinks in height when toggled, with the header chevron flipping between a downward "v" and an upward "^".

## Classification

- Category: `animation` — interactive
- Medium: React + TypeScript + CSS transitions (Tailwind v4 for layout)
- Entry point: `reference.tsx`
- Nature: interactive; reuse the grid-rows height animation and chevron flip

## Files

- `src/` — copy-paste component, hand-derived from `reference.tsx` and `styles.css`
- `reference.tsx` — upstream capture and dashboard entry point
- `styles.css` — the upstream transition CSS
- `preview.png` — capture from the original site

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens. It imports only `react`, `clsx` and `tailwind-merge` (through `lib/utils.ts`). `accordion.css` is the upstream transition CSS with colours moved to tokens: every timing, distance and easing is a custom property on `:root` — override it globally or on the element. `src/demo.tsx` is sample wiring only.

### Accordion — `accordion.tsx`

- Props: `title`, `children` (panel content), `open` / `defaultOpen` (false) / `onOpenChange(open)`, `className`.
- Structure: a `--card` box (radius `rounded-xl`, 1 px border, `shadow-sm`) with a 56 px header button (title left, 16 px
  chevron right in `--muted-foreground`) and a panel (`px-6 pb-5`, 14 px `--muted-foreground`). The root carries
  `data-open="true|false"`; the panel is a one-row grid whose inner cell clips overflow.
- States / motion: open → panel `grid-template-rows` 0fr→1fr over `--acc-expand` (250 ms), inner content fades in from
  opacity 0 + 2 px blur; close reverses over `--acc-collapse` (250 ms). The chevron flips with `scaleY(1 → −1)` over
  `--acc-chevron` (250 ms), passing through a flat line; all on `--acc-ease` `cubic-bezier(0.22, 1, 0.36, 1)`. No height is
  measured. Reduced motion: no transitions.
- Keyboard: the header is a native button (`aria-expanded`, `aria-controls` → panel); Enter/Space toggles.
