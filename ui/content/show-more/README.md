# Show More

Height animates, text does not reflow.

## Classification

- Category: `content` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/show-more.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/show-more.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/show-more

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--foreground`, `--card`, `--border`, `--primary`,
`--muted-foreground`, `--radius`). It imports only `react` and `motion` (`motion/react`). `src/demo.tsx` is sample data and
wiring only (release notes inside a card).

### ShowMore — `show-more.tsx`

- Props: `children` (the text), `lines` (collapsed height in lines, 3), `maxHeight` (px cap when expanded, 320; beyond it the
  region scrolls), `expanded` / `defaultExpanded` / `onExpandedChange(expanded)` (controlled or uncontrolled), `moreLabel`
  ("Show more"), `lessLabel` ("Show less"), `label` (the scroll region's `aria-label`, "Details"), `className`.
  `useShowMore(options)` is exported and returns `{ contentRef, expanded, open, toggle, setExpanded, height, collapsedHeight,
  fullHeight, expandable, capped, scrollable }`.
- Structure: a wrapper (13.5 px, `leading-relaxed`, `--foreground`); a clipping region whose height animates between
  `lineHeight × lines` and `min(scrollHeight, maxHeight)` (measured with a ResizeObserver; before measuring it uses
  `max-height: <lines>lh`); a 36 px bottom fade from `--card` to transparent over the region's foot, shown while collapsed or
  while the expanded region still scrolls; below, an `h-8` button (radius `calc(var(--radius) - 1px)`, 1 px `--border`,
  `--card`, 12.5 px medium) with cross-fading more/less labels and a 12 px chevron in `--muted-foreground` rotating 180°.
  The fade assumes the component sits on `--card`; change `from-card` if it sits on `--background`.
- States: collapsed / expanded; not expandable (content fits in `lines`) → the button is invisible and inert; capped →
  expanded region is `role="region"`, focusable, `overflow-y: auto`, `scrollbar-gutter: stable`. Height spring: stiffness 190,
  damping 30, mass 1; labels/chevron/fade spring: stiffness 700, damping 46, mass 0.5. Reduced motion: instant.
- Interactions: click toggles; collapsing first scrolls the region back to the top.
- Keyboard: the button is a native button with `aria-expanded` and `aria-controls`; the scrollable region takes focus
  (focus-visible: `--primary` 6 % fill + 1 px inset `--primary` ring) and scrolls with arrow keys.
