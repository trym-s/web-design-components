# Drawer

Side panel that keeps its place.

## Classification

- Category: `overlay` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/drawer.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/drawer.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/drawer

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--card`, `--primary`, `--border`, `--ring`, …). It imports only `react` and `motion` (`motion/react`), `react-dom` (`createPortal`); colours follow the table in `ui/_sources/interior-dev/SOURCE.md`. `src/demo.tsx` is sample data and wiring only. Springs are written as stiffness / damping / mass; `prefers-reduced-motion` turns every transition into an instant change.

### Drawer — `drawer.tsx`

- Props: `open`, `onOpenChange(open)`, `title`, `children`, `description`, `footer`, `side` (`right` default | `left`), `width`
  (320 px, at most the container width − 40 px), `container` (`viewport`: portalled, modal, fixed; `parent`: absolutely inside the
  nearest positioned ancestor, non-modal), `closeLabel` ("Close panel"), `dismissOnScrimClick` (true), `className`. Also exports
  `useDrawer({ open, defaultOpen, onOpenChange, side, width, dismissRatio: 0.38, modal })`.
- Structure: a full-cover layer with a `bg-black/50` scrim and the `role="dialog"` panel against the chosen edge (`--popover`,
  1 px `--border` on the inner side, `rounded-xl` on the inner corners, `shadow-2xl`). Header (16 × 12 px padding, bottom
  `--border`): 13 px medium title, 12.5 px description, a 28 px × button; a scrolling body (16 × 12 px padding); optional footer
  above a `--border` rule.
- States / motion: the panel's x runs between 0 and `width + 24` px off-screen on a spring 150 / 27 / 1; the scrim's opacity
  follows the panel's position (fully opaque when in place). While open in modal mode the page scroll is locked (gutter kept)
  and every other `body` child is made `inert`; the closed panel itself is inert.
- Interactions: the header is a drag handle (the × button excluded): dragging toward the edge moves the panel with elastic 1 on
  that side only; releasing past 38 % of the width or faster than 520 px/s closes it, otherwise it springs back. Clicking the
  scrim closes (when allowed).
- Keyboard: opening remembers the focused element and moves focus to the first focusable element in the panel (or the panel);
  Tab / Shift+Tab are trapped inside; Escape closes; closing returns focus to where it was. The panel is labelled by the title
  and described by a hidden hint.
