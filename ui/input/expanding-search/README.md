# Expanding Search

Icon to field with focus handled.

## Classification

- Category: `input` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/expanding-search.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/expanding-search.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/expanding-search

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--card`, `--primary`, `--border`, `--ring`, …). It imports only `react` and `motion` (`motion/react`); colours follow the table in `ui/_sources/interior-dev/SOURCE.md`. `src/demo.tsx` is sample data and wiring only. Springs are written as stiffness / damping / mass; `prefers-reduced-motion` turns every transition into an instant change.

### ExpandingSearch — `expanding-search.tsx`

- Props: `label` ("Search", the input's and trigger's `aria-label`), `placeholder` ("Search"), `resultCount` (shows a count
  slot and drives the announcement), `align` (`right` default — grows leftward — or `left`), `className`, plus the hook
  options: `value` / `defaultValue` / `onChange(value)`, `onSearch(value)` (debounced by `debounce`, 220 ms), `onSubmit(value)`
  (Enter, flushes the debounce), `open` / `defaultOpen` / `onOpenChange(open)`, `collapseOnBlur` (true), `disabled`. The file
  also exports `useExpandingSearch(options)` returning `open`, `focused`, `query`, `expand`, `collapse(returnFocus)`,
  `toggle`, `clear`, refs and prop bags for the root, trigger and input.
- Structure: a `role="search"` track 40 px high filling its container. A shell (radius `--radius`, 2 px border) grows from
  40 px to the track width; inside: the input (13 px, text starting 34 px from the left), and on the right an optional
  32 px mono 9.5 px result count and a 22 px clear × button. A 40 px magnifier button (15 px icon, `--muted-foreground`) sits
  at the collapsed end and slides with the shell's leading edge. A visually hidden live region announces "N results for q"
  500 ms after typing stops.
- States: resting shell `--border` on `--muted` at 70 % with an inner shadow; focused `--primary` border on `--card`. Closed:
  input transparent and not tabbable; open: input fades in 60 ms after the shell starts. The × appears (opacity, scale
  0.86 → 1) only when there is text. Width uses spring 380 / 38 / 0.7; fades 260 / 34 / 0.8; the × 520 / 34 / 0.45.
- Interactions: click the magnifier (or focus the input) to open; clicking the empty shell refocuses the input; blur with an
  empty query collapses (when `collapseOnBlur`); × clears and refocuses.
- Keyboard: the trigger is tabbable only while closed and the input only while open. In the input, Escape clears a query, or
  collapses and returns focus to the trigger when already empty; Enter submits.
