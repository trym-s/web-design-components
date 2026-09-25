# Text States Swap

Swapping the text of a status indicator in place — "Processing…" → "Done", "Save" → "Saved".

## Classification

- Category: `animation` — decorative
- Medium: React + TypeScript + CSS transitions (Tailwind v4 for layout)
- Entry point: `reference.tsx`
- Nature: decorative; reuse the exit-up / enter-from-below swap

## Files

- `src/` — copy-paste component, hand-derived from `reference.tsx` and `styles.css`
- `reference.tsx` — upstream capture and dashboard entry point
- `styles.css` — the upstream transition CSS
- `preview.png` — capture from the original site

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens. It imports only `react`, `clsx` and `tailwind-merge` (through `lib/utils.ts`). `text-states-swap.css` is the upstream transition CSS with colours moved to tokens: every timing, distance and easing is a custom property on `:root` — override it globally or on the element. `src/demo.tsx` is sample wiring only.

### TextStatesSwap — `text-states-swap.tsx`

- Props: `text` (change it to swap), `className`.
- Structure: an inline-block `aria-live="polite"` span.
- Motion: on change the old text exits upward (−`--text-swap-translate-y` 4 px) with blur `--text-swap-blur` (2 px) and fade
  over `--text-swap-dur` (150 ms); then the new text is placed 4 px below, blurred and transparent without a transition and
  rises to rest over another 150 ms; `ease-in-out`. Reduced motion: instant swap.
- Keyboard: none.
