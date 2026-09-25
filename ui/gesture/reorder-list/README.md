# Reorder List

The gap the siblings open is the drop target.

## Classification

- Category: `gesture` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/reorder-list.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/reorder-list.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/reorder-list

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--card`, `--border`, `--primary`,
`--muted-foreground`, `--radius`). It imports only `react` and `motion` (`motion/react`, its `Reorder` group). `src/demo.tsx`
is sample data and wiring only (a list kept in state; `onReorder` writes it back).

### ReorderList — `reorder-list.tsx`

- Props: `items`, `getId(item)`, `getLabel(item)` (spoken name), `onReorder(next)` (every move, drag or key — store it),
  `onCommit(next)` (on drop), `disabled`, `children(item)` (row content), `label` (list `aria-label`), `className`.
  `useReorderList(options)` is exported (keyboard grab/move/drop/cancel state machine plus announcements).
- Structure: a `space-y-1.5` list; each row is focusable `role="button"` with `aria-pressed` (grabbed) and a shared sr-only hint,
  `px-3 py-2.5`, `gap-2.5`, radius `calc(var(--radius) - 1px)`, 1 px `--border`, `--card`, `shadow-xs`; a 10 × 14 px six-dot grip
  (`--muted-foreground` at 60 %, full when lifted), an sr-only label and the visual content (`aria-hidden`).
- States: resting — `cursor-grab`; lifted (dragging or grabbed) — `z-10`, `shadow-lg`, grip darker, dragging scales to 1.02;
  grabbed by keyboard — `--primary` border and `--primary` 4 % fill. Rows re-flow with a spring (stiffness 520 / damping 34 /
  mass 0.45). A polite status announces "X grabbed, position N of M", "X, position N of M", "X dropped at position N",
  "Reorder cancelled, original order restored." Reduced motion: instant moves, no lift scale.
- Interactions: drag vertically (`touch-action: pan-x`) to reorder.
- Keyboard: Tab to a row; Space/Enter grabs, ArrowUp/ArrowDown move it one slot, Space/Enter drops (`onCommit`), Escape or
  blur restores the order from before the grab. Focus-visible (not grabbed): `--primary` 6 % fill + 1 px inset `--primary` ring.
