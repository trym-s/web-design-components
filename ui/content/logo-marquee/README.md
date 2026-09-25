# Logo Marquee

Stops when you look at it.

## Classification

- Category: `content` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/logo-marquee.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/logo-marquee.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/logo-marquee

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--card`, `--border`, `--primary`, `--foreground`,
`--muted-foreground`, `--radius`). It imports only `react` and `motion` (`motion/react`, for `useReducedMotion` and
`useIsomorphicLayoutEffect`). `src/demo.tsx` is sample data and wiring only (six brand marks as inline SVG paths).

### LogoMarquee — `logo-marquee.tsx`

- Props: `items` (`{ id, label, href?, mark? }[]`; `mark` is any node shown instead of the text label, with `label` kept for
  screen readers), `label` (the section's `aria-label`, "Logos"), `speed` (px/s, 44), `direction` (`left` | `right`), `gap`
  (px between items, 40), `paused`, `onSelect(item)` (renders buttons when there is no `href`), `className`.
  `useLogoMarquee({ speed, direction, gap, paused })` is exported and returns refs, `copies`, `paused`, `reduced`, `bind`.
- Structure: a `<section>` card — `rounded-[calc(var(--radius)+4px)]`, 1 px `--border`, `--card` fill, `shadow-sm`, `overflow-hidden` —
  holding a viewport (`py-2`) and a `w-max` flex track moved with `translate3d`. The track repeats the item list in 4–14
  copies (enough to cover the viewport width + 3); only copy #1 is interactive and exposed, the others are `aria-hidden`
  plain faces. Each face: `h-10` (40 px), `px-3`, 13 px medium, tracking −0.01em, `--muted-foreground`, radius `calc(var(--radius) - 1px)`.
  Links/buttons: hover → `--foreground`; focus-visible → `--primary` at 6 % fill with a 1 px inset `--primary` ring.
  40 px edge fades on both sides go from `--card` to transparent.
- States: moving; held (pointer over it, touch down, or focus inside) — speed eases to 0 and back with an exponential
  ramp (time constant 190 ms); `paused` prop stops it the same way; off-screen (IntersectionObserver, 96 px margin) the loop
  does not run. Reduced motion: a single static copy, the viewport becomes horizontally scrollable (`overflow-x: auto`,
  `tabIndex=0`) instead of animating.
- Interactions: hover or press pauses; `onSelect` or `href` per item. Frame delta is capped at 50 ms; offset wraps by the
  width of one copy + `gap`.
- Keyboard: Tab moves through the live copy's links/buttons; focusing an item pauses the marquee and nudges the track
  (spring-like settle, time constant 160 ms) so the focused item sits at least 12 px inside the viewport.
