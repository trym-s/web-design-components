# Tree View

Disclosure the arrow keys can walk.

## Classification

- Category: `navigation` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/tree-view.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/tree-view.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/tree-view

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--card`, `--primary`, `--border`, `--ring`, …). It imports only `react` and `motion` (`motion/react`); colours follow the table in `ui/_sources/interior-dev/SOURCE.md`. `src/demo.tsx` is sample data and wiring only. Springs are written as stiffness / damping / mass; `prefers-reduced-motion` turns every transition into an instant change.

### TreeView — `tree-view.tsx`

- Props: `nodes` (`{ id, label, meta?, children? }[]`), `label` (the tree's name), `expanded` / `defaultExpanded` /
  `onExpandedChange(ids)`, `selected` / `defaultSelected` / `onSelectedChange(id)`, `className`. Also exports
  `useTreeView(options)` (flattened visible rows, `toggle`, `select`, `handleKey`, roving `tabStop`).
- Structure: a `--card` box (radius `--radius + 3px`, 1 px `--border`, 5 px padding, `shadow-sm`) holding a `role="tree"` list.
  Rows are 28 px `role="treeitem"`s (radius `--radius − 2px`, 6 px side padding): a 16 px caret slot (10 px chevron for
  branches, empty for leaves), the 12.5 px label (truncated) and an optional mono 10.5 px meta. Children are indented 13 px
  behind a 1 px `--border` guide line with 7 px padding.
- States / motion: selected row `--muted` at 80 % with `--foreground` medium text; others `--muted-foreground`, hover
  `--accent`; focus-visible 1 px `--primary` inset ring. Carets rotate 90° when open (spring 700 / 46 / 0.5). Groups open
  with height 280 ms + opacity 180 ms (`cubic-bezier(0.23, 1, 0.32, 1)`) and close with height 200 ms + opacity 140 ms
  (`cubic-bezier(0.4, 0, 1, 1)`).
- Interactions: clicking a row selects and focuses it; on a branch it also toggles.
- Keyboard (WAI-ARIA tree): one tab stop (the focused / selected / first row). ArrowDown / ArrowUp move through visible rows;
  ArrowRight opens a closed branch or moves into an open one; ArrowLeft closes an open branch or moves to the parent; Home /
  End jump to the first / last row; Enter / Space select (and toggle branches); typing a letter jumps to the next row whose
  label starts with it. Rows carry `aria-level`, `aria-posinset`, `aria-setsize`, `aria-expanded`, `aria-selected`, and a
  hidden description of these keys.
