# Modal

Backdrop, scroll lock, focus trap.

## Classification

- Category: `overlay` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/modal.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/modal.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/modal

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--card`, `--primary`, `--border`, `--ring`, …). It imports only `react` and `motion` (`motion/react`), `react-dom` (`createPortal`); colours follow the table in `ui/_sources/interior-dev/SOURCE.md`. `src/demo.tsx` is sample data and wiring only. Springs are written as stiffness / damping / mass; `prefers-reduced-motion` turns every transition into an instant change.

### Modal — `modal.tsx`

- Props: `open`, `onClose()`, `title`, `description`, `children`, `footer` (right-aligned actions), `closeLabel` ("Close dialog"),
  `showClose` (true), `closeOnEscape` (true), `closeOnBackdrop` (true), `lockScroll` (true), `initialFocusRef`, `container`
  (portal target, default `document.body`), `maxWidth` (440 px), `maxHeight` ("min(78vh, 620px)"), `className`. Also exports
  `useModal(options)` (overlay / panel prop bags, ids, `close`).
- Structure: a fixed full-screen grid (16 px padding, 24 px from `sm`) with a `bg-black/50` scrim and a centred `role="dialog"`
  `aria-modal` panel (`--popover`, radius `--radius + 4px`, 1 px `--border`, `shadow-2xl`): header (16 px padding) with a 15 px
  medium title (−0.01 em) and a 12.5 px relaxed description, a 28 px × button; a scrolling body (13 px relaxed); an optional
  footer above a `--border` rule.
- States / motion: the scrim fades in 200 ms (`cubic-bezier(0.23, 1, 0.32, 1)`) and out 150 ms; the panel rises from scale 0.96,
  y 12 px (spring 420 / 36 / 0.9, opacity 160 ms) and exits to 0.98 / 6 px in 150 ms (`cubic-bezier(0.4, 0, 1, 1)`). While
  open: body scroll locked with the scrollbar gap padded (reference-counted across modals), every sibling of the overlay made
  `inert`, focus kept inside (a focus escaping the panel is pulled back).
- Keyboard: on open, focus goes to `initialFocusRef`, else the first focusable element, else the panel; Tab / Shift+Tab cycle
  inside; Escape closes only the top-most open modal; closing restores focus to the previously focused element. A backdrop
  click closes only when the press also started outside the panel.
