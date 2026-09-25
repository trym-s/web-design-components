# Dropdown

Active highlight travels between items.

## Classification

- Category: `overlay` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/dropdown.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/dropdown.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/dropdown

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--card`, `--primary`, `--border`, `--ring`, …). It imports only `react` and `motion` (`motion/react`); colours follow the table in `ui/_sources/interior-dev/SOURCE.md`. `src/demo.tsx` is sample data and wiring only. Springs are written as stiffness / damping / mass; `prefers-reduced-motion` turns every transition into an instant change.

### Dropdown — `dropdown.tsx`

- Props: `items` (`{ value, label, hint?, disabled? }[]`), `value` / `defaultValue` / `onChange(value)`, `label` ("Options" — shown on
  the trigger), `placeholder` ("Select an option", read with the label by screen readers when nothing is chosen), `disabled`,
  `defaultOpen`, `emptyLabel` ("Nothing to choose"), `className`. Also exports `useDropdown(options)`.
- Structure: a 36 px trigger button (radius `--radius − 1px`, 1 px `--border`, `--card`, 13 px medium, `shadow-sm`, 12 px chevron)
  and, 6 px below its left edge, a panel (min 224 px, `--popover`, radius `--radius + 1px`, `--border`, `shadow-lg`, 5 px padding)
  holding a `role="listbox"` (max 216 px, scrolls) of 32 px options: label, optional mono 10.5 px hint, and a 14 px check on the
  selected option.
- States / motion: the panel drops in from y −8 px, scale 0.94 (spring 620 / 38 / 0.6, fade 120 ms) growing from the top-left,
  and exits to y −6 px / 0.97 in 120 ms. One `--accent` highlight slides between rows (spring 700 / 46 / 0.5); the chevron turns
  180°; the check pops from scale 0.7 (spring 520 / 34 / 0.45). Trigger: hover / focus raise the shadow to `shadow-md`
  (focus border `--ring`); open it looks pressed (inner shadow). Disabled options are 70 % muted and skipped.
- Keyboard: on the trigger, ArrowDown / Enter / Space open at the selected (or first) option and ArrowUp at the last. In the
  list: ArrowDown / ArrowUp (wrapping over enabled options), Home / End, type-ahead (600 ms buffer), Enter / Space select and
  close, Escape and Tab close; focus returns to the trigger. The list uses `aria-activedescendant`; outside pointer-down or
  window blur close it.
