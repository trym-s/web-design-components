# Presence Avatars

Join and leave as a layout change.

## Classification

- Category: `notification` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/presence-avatars.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/presence-avatars.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/presence-avatars

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--card`, `--primary`, `--border`, `--ring`, …). It imports only `react` and `motion` (`motion/react`); colours follow the table in `ui/_sources/interior-dev/SOURCE.md`. `src/demo.tsx` is sample data and wiring only. Springs are written as stiffness / damping / mass; `prefers-reduced-motion` turns every transition into an instant change.

### PresenceAvatars — `presence-avatars.tsx`

- Props: `people` (`{ id, name, src? }[]` — the caller streams joins/leaves), `max` (5 tiles), `size` (28 px), `overlap` (9 px),
  `label` ("People here"), `announceAfter` (900 ms), `onOverflowSelect(hidden)` (makes the +N chip a button), `className`. Also
  exports `usePresence(options)`: keeps first-seen order stable, splits `visible` / `hidden`, and builds "A, B and n others are
  here".
- Structure: a `role="group"` row whose width animates to fit. Tiles are `size` squares placed `size − overlap` apart, earlier
  people on top: a 3 px `--foreground` 10 % frame (radius `--radius`) around a well (radius `--radius − 3px`, `--muted`,
  initials at 34 % of `size`, `--muted-foreground`) with the photo fading over it when it loads. The overflow chip (`size + 8`
  wide, radius `--radius − 1px`, `--border`, `--card`, mono 10.5 px "+N", capped at 99) follows the last tile. A hidden list of
  every name and a polite status with the summary accompany it.
- States / motion: arriving tiles fade and grow from scale 0.86 into their slot, leaving ones shrink out, others slide to their
  new slot (spring 520 / 34 / 0.45); photos fade in over 240 ms (`cubic-bezier(0.23, 1, 0.32, 1)`), or instantly when cached.
- Keyboard: only the overflow chip is interactive (a button when `onOverflowSelect` is set; focus-visible `--primary` border).
