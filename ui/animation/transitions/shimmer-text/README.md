# Shimmer Text

A loading / "thinking" label that shimmers — streaming status, "Generating…", any in-progress copy that should feel alive without a spinner.

## Classification

- Category: `animation` — decorative
- Medium: React + TypeScript + CSS transitions (Tailwind v4 for layout)
- Entry point: `reference.tsx`
- Nature: decorative; reuse the highlight sweep

## Files

- `src/` — copy-paste component, hand-derived from `reference.tsx` and `styles.css`
- `reference.tsx` — upstream capture and dashboard entry point
- `styles.css` — the upstream transition CSS
- `preview.png` — capture from the original site

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens. It imports only `react`, `clsx` and `tailwind-merge` (through `lib/utils.ts`). `shimmer-text.css` is the upstream transition CSS with colours moved to tokens: every timing, distance and easing is a custom property on `:root` — override it globally or on the element. `src/demo.tsx` is sample wiring only.

### Shimmer — `shimmer-text.tsx`

- Props: `children` (a string — it is duplicated into the highlight layer), `className`.
- Structure: an inline-block span in `--shimmer-base` (`--muted-foreground`); a `::before` copy of the text is clipped to a
  gradient: transparent, then `--shimmer-highlight` (`--foreground`) at 50 %, transparent again, sized `--shimmer-band`
  (400 %) wide.
- Motion: the band sweeps across the text from right to left every `--shimmer-dur` (2000 ms), `linear`, forever. Reduced
  motion: static base colour.
- Keyboard: none (status text).
