# Value Flash

Marks what just changed.

## Classification

- Category: `data` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/value-flash.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/value-flash.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/value-flash

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--foreground`, `--destructive`, `--radius`). It
imports only `react` and `motion` (`motion/react`). The root declares `--success` for rises, default
`oklch(0.596 0.145 163.2)` (dark: `oklch(0.765 0.177 163.2)`); falls use `--destructive`. `src/demo.tsx` is sample data and
wiring only (buttons that step the value).

### ValueFlash — `value-flash.tsx`

- Props: `value` (number), `format(value)` (display string), `label` (prefix for the announcement), `hold` (ms the flash lasts,
  900), `announceAfter` (ms of quiet before the live region updates, 700), `className` (e.g. a font size — every size is in
  `em`). `useValueFlash(value, { hold, compare })` is exported (generic; `compare(next, prev)` gives the sign for non-numbers)
  and returns `{ direction: up|down|null, from, changeId, flashing }`.
- Structure: an `inline-grid` pill (`px-1.5 py-[3px]`, radius `calc(var(--radius) - 4px)`, 13 px medium `tabular-nums`) with an
  absolutely placed tint layer, the number in an `overflow-hidden` slot, and a 1 em slot for a 0.68 em triangle glyph (up or down).
- States: on each change the text turns `--success` (up) or `--destructive` (down) with a 12 % tint of that colour behind it
  (tint in: spring 520 / 34 / 0.45; out: 160 ms `cubic-bezier(0.4, 0, 1, 1)`), the pill lifts to scale 1.05 (spring 380 / 26 /
  0.7) and settles back (spring 260 / 34 / 0.8) after `hold`. The new number rolls in from 0.85 em below (up) or above (down)
  with `blur(5px)` → 0 (spring 460 / 32 / 0.55) while the old one leaves 0.7 em the other way with `blur(4px)` in 140 ms; the
  triangle pops in from scale 0.4 (spring 640 / 22 / 0.7). Colour transitions over 200 ms. Reduced motion: opacity-only swaps,
  no scale or roll.
- Interactions: none; driven by `value`.
- Keyboard: none. A polite sr-only live region reads "<label>: <value>" once the value has been still for `announceAfter`.
