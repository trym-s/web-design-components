# New Items Pill

New content without stealing your scroll.

## Classification

- Category: `notification` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/new-items-pill.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/new-items-pill.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/new-items-pill

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--card`, `--primary`, `--border`, `--ring`, …). It imports only `react` and `motion` (`motion/react`); colours follow the table in `ui/_sources/interior-dev/SOURCE.md`. `src/demo.tsx` is sample data and wiring only. Springs are written as stiffness / damping / mass; `prefers-reduced-motion` turns every transition into an instant change.

### NewItemsPill + useNewItems — `new-items-pill.tsx`

- `useNewItems({ itemCount, anchor, threshold })`: attach `scrollProps` (ref, `tabIndex 0`, `overflow-anchor: none`) to the
  scrolling feed. `anchor` is where new items appear (`top` default, or `bottom` for chat); the reader counts as "pinned" when
  within `threshold` (24 px) of that edge. When `itemCount` grows while pinned, the list follows to the edge; when not pinned,
  the scroll position is held (top-anchored feeds are shifted so the visible content stays put) and `unread` counts up.
  Returns `unread`, `pinned` and `jump()` (focuses the list and scrolls smoothly to the edge, clearing `unread`).
- `NewItemsPill` props: `count` (unread), `onJump()`, `anchor`, `label(n)` ("n new item(s)"), `max` (99 → "99+ new items"),
  `className`. Place it inside the feed's positioned container.
- Structure: a centred 32 px pill 8 px from the anchored edge (radius `--radius − 1px`, 1 px `--border`, `--card`, 12.5 px medium,
  a 14 px arrow pointing toward the edge).
- States / motion: appears when `count > 0` from 10 px outside the edge with scale 0.94 (spring 540 / 34 / 0.5, fade 160 ms) and
  leaves half that distance (160 ms). A polite live region announces the count once it has been stable for 700 ms.
- Keyboard: the pill is a button (Enter / Space jumps); the list itself is focusable so keyboard users can scroll it.
