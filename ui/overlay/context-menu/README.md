# Context Menu

Opens from the pointer, not the corner.

## Classification

- Category: `overlay` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/context-menu.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/context-menu.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/context-menu

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--card`, `--primary`, `--border`, `--ring`, …). It imports only `react` and `motion` (`motion/react`), `react-dom` (`createPortal`); colours follow the table in `ui/_sources/interior-dev/SOURCE.md`. `src/demo.tsx` is sample data and wiring only. Springs are written as stiffness / damping / mass; `prefers-reduced-motion` turns every transition into an instant change.

### ContextMenu — `context-menu.tsx`

- Props: `items` (`{ id, label, shortcut?, icon?, disabled?, onSelect?(id) }` or `{ id, type: "separator" }`), `children` (the
  area that owns the menu), `onSelect(id)`, `label` ("Context menu"), `width` (224 px), `disabled`, `className`. Also exports
  `useContextMenu({ items, onSelect, width, margin: 8, holdDuration: 460, moveTolerance: 8, disabled })` with `openAt(x, y)`,
  `close()`, trigger / menu / item prop bags.
- Structure: the trigger is a focusable wrapper around `children` (with a hidden hint "Right-click, or press Shift plus F10,
  for options"). The menu is portalled and fixed at the pointer: `--popover`, radius `--radius + 4px`, 1 px `--border`,
  `shadow-lg`, 5 px padding; 32 px items (radius `--radius − 3px`, 13 px; a 16 px icon column when any item has an icon; mono
  10.5 px shortcut on the right); separators are 9 px rows with a 1 px `--border` rule. The menu flips left / up when it would
  overflow, stays 8 px inside the viewport, scrolls when taller, and grows from the pointer (`transform-origin` at the click).
- States / motion: opens with opacity 0 → 1 and scale 0.96 → 1 (200 ms, `cubic-bezier(0.23, 1, 0.32, 1)`), closes to 0.98
  (140 ms, `cubic-bezier(0.4, 0, 1, 1)`). The active item is `--accent`; disabled items are `--muted-foreground` at 60 % and
  skipped.
- Interactions: right-click opens at the pointer; touch / pen long-press (460 ms, cancelled by 8 px of movement) opens with a
  10 ms vibration and swallows the following click; pointer movement activates items; a click (press and release on the
  same item) selects and closes. Outside pointer-down, outside scroll, window resize or blur close it.
- Keyboard: on the focused trigger, ContextMenu, Shift+F10 or Enter opens it near the trigger's top-left with the first item
  active. In the `role="menu"`: ArrowDown / ArrowUp (wrapping), Home / End, type-ahead (600 ms buffer), Enter / Space on an
  item selects, Escape closes and returns focus to the trigger, Tab closes.
