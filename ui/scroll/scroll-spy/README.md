# Scroll Spy

The section you are actually in.

## Classification

- Category: `scroll` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/scroll-spy.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/scroll-spy.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/scroll-spy

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--card`, `--primary`, `--border`, `--ring`, …). It imports only `react` and `motion` (`motion/react`); colours follow the table in `ui/_sources/interior-dev/SOURCE.md`. `src/demo.tsx` is sample data and wiring only. Springs are written as stiffness / damping / mass; `prefers-reduced-motion` turns every transition into an instant change.

### ScrollSpy — `scroll-spy.tsx`

- Props: `sections` (`{ id, label }[]` — ids of elements in the page), `offset` (96 px — where the reading line starts below the
  top), `root` (ref of a scroll container; default the window), `onChange(id)`, `label` ("On this page"), `className`. Also exports
  `useScrollSpy(options)` → `activeId`, `activeIndex`, `scrollTo(id)`, `getLinkProps(id)`, `announce`.
- Which section is active: a reading line that starts `offset` px below the top and slides toward the bottom of the viewport as
  the page scrolls from top to end (so short final sections still become active); the active section is the last one whose top
  is above that line, and the last section once the scroller reaches the end.
- Structure: a `<nav>` with a horizontally scrolling strip (`--muted` at 80 %, inner shadow, radius `--radius`, 4 px padding,
  4 px gaps, hidden scrollbar) of 28 px chips (12.5 px, width reserved for the medium weight) linking `#id`. A single `--primary`
  thumb (radius `--radius − 4px`) sits behind the active chip, whose text turns `--primary-foreground` medium.
- States / motion: the thumb moves between chips with a shared-layout spring 520 / 34 / 0.45; the active chip scrolls itself into
  view. Clicking a chip scrolls to its section (smooth unless reduced motion), focuses the section, and holds that chip active
  for up to 900 ms or until the scroll arrives (a wheel or touch cancels the hold). A polite live region announces the section
  420 ms after it settles.
- Keyboard: chips are links (Tab / Enter); modified clicks (Cmd / Ctrl / Shift) keep the browser's default; the active link has
  `aria-current="location"`.
