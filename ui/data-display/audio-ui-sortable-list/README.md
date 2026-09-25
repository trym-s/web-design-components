# Sortable List

A drag-and-drop sortable list component built with dnd-kit.

## Classification

- Category: `data-display` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (shadcn Base UI, Nova style, `@audio-ui/react` primitives); static HTML
- Framework: react
- Entry point: `ui/_sources/audio-ui/registry-audio/bases/base/audio/sortable-list.tsx`
- Nature: interactive; reuse the control, its interaction model and layout, adapt literal values to the target project.
- Added: 2026-09-25T08:37:12Z
- Curation: pending
- Use when: A drag-and-drop sortable list component built with dnd-kit.
- Provides: Sortable List with 1 documented example
- Requires: React, Tailwind v4 with the shadcn tokens and a shadcn style (`cn-*` slots), `@audio-ui/react` 0.1.2
- Variants: sortable-list-demo
- Upstream: Audio UI · sortable-list, ui
- Preferred install: `npx shadcn@latest add @audio/sortable-list`
- Local source fallback: `ui/_sources/audio-ui/registry-audio/bases/base/audio/sortable-list.tsx`

## How an agent uses this reference

- **React + Tailwind v4 + shadcn tokens** — copy `src/` as-is (it vendors the `@audio-ui/react` primitives it needs and
  imports only allowlisted packages); `src/demo.tsx` shows the wiring with sample data. See `## Usage`.
- **React + shadcn target** — add the `@audio` registry (`https://audio-ui.xyz/docs/registry`) and install as above; the demos in
  `upstream/examples/` show the exact usage. The elements live in `ui/_sources/audio-ui/registry-audio/bases/base/audio/`.
- **Any other stack** — `static/<example>.html` is the rendered DOM against `ui/_sources/audio-ui/styles.css` (the
  site's Tailwind build with the Nova style); keep the markup, re-implement drag/keyboard behavior from the docs.

## Examples

- `upstream/examples/sortable-list-demo.tsx` — Sortable list component examples · static: `static/sortable-list-demo.html`

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `ui/_sources/audio-ui/registry-audio/bases/base/audio/sortable-list.tsx` — the element as the registry installs it
- `upstream/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://audio-ui.xyz/docs/components/base/sortable-list

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--primary`, `--ring`, …).
It imports only `react`, `@base-ui/react`, `class-variance-authority`, `clsx`, `tailwind-merge` and `lucide-react`. `src/ui/` holds the shadcn/ui
components it builds on; point those imports at the target's own copies when it has them. `src/demo.tsx` is sample
data and wiring only.

### Sortable list — `sortable-list.tsx`

- Parts: `SortableList` (`items: { id }[]`, `onChange(items)` with the new order, `renderItem(item, index)`, `className`),
  `SortableItem` (`id`; wraps one row in an `<li>`), `SortableDragHandle` (the grip button that starts a drag).
- Structure: a plain `<ul>`; the row being moved drops to 40 % opacity with a shadow and a `--ring` outline; a visually
  hidden `aria-live` region announces pick-up, moves and drop.
- Interactions: drag the grip; the list reorders live as the row passes the nearest neighbour (distance to row centres,
  so it also works in grids).
- Keyboard (grip focused): Space / Enter lifts the row, arrow keys move it one place, Space / Enter drops it, Escape
  restores the order from before the lift.
