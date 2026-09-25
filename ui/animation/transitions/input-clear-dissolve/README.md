# Input Clear Dissolve

Clearing a text field — search box, filter input, any field with a clear (×) button.

## Classification

- Category: `animation` — interactive
- Medium: React + TypeScript + CSS transitions (Tailwind v4 for layout)
- Entry point: `reference.tsx`
- Nature: interactive; reuse the fly-out, word glow and placeholder drop

## Files

- `src/` — copy-paste component, hand-derived from `reference.tsx` and `styles.css`
- `reference.tsx` — upstream capture and dashboard entry point
- `styles.css` — the upstream transition CSS
- `preview.png` — capture from the original site

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens. It imports only `react`, `lucide-react` (the × icon), `clsx` and `tailwind-merge` (through `lib/utils.ts`). `input-clear-dissolve.css` is the upstream transition CSS with colours moved to tokens: every timing, distance and easing is a custom property on `:root` — override it globally or on the element. `src/demo.tsx` is sample wiring only.

### ClearInput — `input-clear-dissolve.tsx`

- Props: `defaultValue`, `placeholder`, `onValueChange(value)`, `onClear()`, `icon` (leading icon, 32 px gutter), `aria-label`,
  `className`.
- Structure: a clipped field wrapper holding the real `<input>` (its text made transparent while it has a value), a mirror
  layer that renders the same text, a fake placeholder layer, a glow layer and a × button shown while there is a value.
- Motion (on ×, total `--clear-dur` 1000 ms): the input empties at once; the mirrored text flies down `--clear-out-fly`
  (12 px), blurs to `--clear-blur` (2 px) and fades over `--clear-out-dur` (400 ms, `cubic-bezier(0.22, 1, 0.36, 1)`); after
  `--glow-delay` (50 ms) a soft streak lights up under each word (a gradient per word, `--glow-spread` 1.5 × word height),
  peaking at `--glow-peak-at` (15 %) of the run at `--glow-opacity` (0.42) and fading out; meanwhile the placeholder drops in
  from −`--clear-in-fly` (12 px) with a 2 px blur over `--clear-in-dur` (400 ms). Focus is kept. Reduced motion: instant clear.
- Keyboard: native input; the × is a button (Enter/Space); clearing is ignored while a clear is already running.
