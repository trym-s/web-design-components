# Command Palette

Results reorder as you type.

## Classification

- Category: `overlay` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/command-palette.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/command-palette.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/command-palette

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--card`, `--primary`, `--border`, `--ring`, …). It imports only `react` and `motion` (`motion/react`), `react-dom` (`createPortal`); colours follow the table in `ui/_sources/interior-dev/SOURCE.md`. `src/demo.tsx` is sample data and wiring only. Springs are written as stiffness / damping / mass; `prefers-reduced-motion` turns every transition into an instant change.

### CommandPalette — `command-palette.tsx`

- Props: `items` (`{ id, label, hint?, keywords?, shortcut?: string[] }[]`), `onSelect(item)`, `onDismiss()`, `open` (when set, the
  palette renders as a modal layer in a portal; when omitted, inline), `placeholder` ("Search commands"), `emptyLabel` ("No command
  matches"), `label` ("Command palette"), `maxRows` (6 — fixes the list height), `autoFocus`, `className`. Also exports
  `useCommandPalette(options)`.
- Ranking: a fuzzy subsequence match on the label (or `keywords`, 3 points less): 2 points per matched character, +4 per
  consecutive character, +12 when a match is at the very start, +8 after a word boundary (space - _ / . :), minus 0.05 per label
  character; ties keep the original order; an empty query lists everything in order.
- Structure: a `--popover` surface (radius `--radius + 4px`, 1 px `--border`; modal: max 520 px, `shadow-2xl`). Header: 44 px row
  with a 14 px magnifier, the 13.5 px combobox input and a mono 9.5 px result count, over a `--border` rule. List: fixed height
  (5 px padding, 36 px rows, 2 px gaps), rows show the label (13 px medium), an optional hint (11.5 px, hidden on narrow
  screens) and key caps (18 px, mono 9.5 px, `--border`). Empty state centred in 12.5 px `--muted-foreground`.
- States / motion: the active row gets a `--muted` background that cross-fades (spring 260 / 34 / 0.8); rows re-order with a
  position layout spring (520 / 34 / 0.45). Modal: a `bg-black/50` scrim fades in 200 ms / out 150 ms; the panel rises from
  scale 0.96, y 12 px (spring 420 / 36 / 0.9) and exits to 0.98 / 6 px; page scrolling is locked (scrollbar gutter preserved).
  The first result is active by default; the query resets whenever `open` becomes true.
- Keyboard / pointer: typing filters; ArrowDown / ArrowUp move (wrapping) and keep the row scrolled into view; Home / End jump;
  Enter runs the active item; Escape calls `onDismiss` (captured at document level in modal mode). The pointer activates a row
  only when it actually moves (so keyboard scrolling under a resting cursor does not steal focus); click runs it; a click that
  starts and ends outside the panel dismisses. The input is a `combobox` with `aria-activedescendant`; a status announces the
  result count 400 ms after it changes.
