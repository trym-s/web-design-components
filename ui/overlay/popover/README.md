# Popover

Knows its origin, flips on collision.

## Classification

- Category: `overlay` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/popover.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/popover.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/popover

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--card`, `--primary`, `--border`, `--ring`, …). It imports only `react` and `motion` (`motion/react`); colours follow the table in `ui/_sources/interior-dev/SOURCE.md`. `src/demo.tsx` is sample data and wiring only. Springs are written as stiffness / damping / mass; `prefers-reduced-motion` turns every transition into an instant change.

### Popover — `popover.tsx`

- Props: `trigger` (button content), `children`, `label` (the dialog's name), `open` / `defaultOpen` / `onOpenChange(open)`, `side`
  (`bottom` default, `top`, `left`, `right`), `align` (`center` default, `start`, `end`), `offset` (10 px), `padding` (8 px from the
  viewport or `boundary`), `arrowSize` (9 px), `boundary` (ref to a clipping element), `triggerClassName`, `className`. Also
  exports `usePopover(options)` — the positioning engine (anchor / floating / panel / content / arrow refs, resolved side).
- Structure: a 36 px trigger button (radius `--radius − 1px`, `--border`, `--card`, 13 px medium) with `aria-haspopup="dialog"`,
  and a fixed-position `role="dialog"` panel (`--popover`, radius `--radius + 1px`, `--border`, `shadow-lg`, 12 px padding) with
  a 9 px rotated-square arrow (two `--border` edges facing out) and a scrolling content area.
- Positioning: placed on `side` at `offset` from the trigger, aligned by `align`, flipped to the opposite side when there is not
  enough room there and more on the other side, clamped inside the padded viewport/boundary; max width = available width (min
  160 px); content max height = available room (min 88 px). The arrow points at the trigger's centre, kept 11 px + half its
  size from the corners, and the panel grows from that point. Re-measured on resize, scroll and content size changes.
- States / motion: opens from opacity 0, scale 0.95 and 6 px toward the trigger (spring 260 / 34 / 0.8, opacity 140 ms); closes to
  scale 0.97 in 130 ms.
- Keyboard: the trigger toggles; opening focuses the panel; Escape closes and returns focus to the trigger; focus moving outside
  the panel and trigger, or an outside pointer-down, closes it.
