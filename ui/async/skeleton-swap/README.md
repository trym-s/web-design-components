# Skeleton Swap

Skeleton to content with zero layout shift.

## Classification

- Category: `async` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/skeleton-swap.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/skeleton-swap.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/skeleton-swap

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--card`, `--primary`, `--ring`, …). It imports only `react` and `motion` (`motion/react`). `src/demo.tsx` is sample data and wiring only.

### SkeletonSwap — `skeleton-swap.tsx`

- Props: `ready` (content has arrived), `children` (the real content), `lines` (3 skeleton bars), `lineHeight` (21 px per line), `barHeight` (9 px), `reserve` (box height in px; default `lines × lineHeight`), `delay` (120 ms before the skeleton appears — fast loads never flash it), `minVisible` (380 ms minimum skeleton time once shown), `label` (accessible name; also announces "<label> loaded"), `skeleton` (custom placeholder node), `className`. The file also exports `useSkeletonSwap({ ready, delay, minVisible })` → `{ showSkeleton, busy }`.
- Structure: a fixed-height box (`height: reserve`) with `aria-busy={!ready}`, `overflow-y: auto`, `--foreground` text, content and skeleton stacked in one grid cell. Default skeleton: `lines` rows of `lineHeight`, each holding a `barHeight` bar in `--foreground` at 10 %, radius `calc(var(--radius) - 5px)`, widths cycling 100/93/97/88/95/91 % with the last line at 62 %. The box becomes focusable (`tabIndex=0`) only when its content overflows.
- States: skeleton shown → content at opacity 0, scale 0.99, blur 4 px, not clickable; skeleton hidden → content at opacity 1, scale 1, blur 0 (transform origin top-left). The skeleton fades in and fades out with a 3 px blur. All on a spring (stiffness 260, damping 34, mass 0.8). Reduced motion: opacity only, instant.
- Interactions: none beyond scrolling overflowed content.
- Keyboard: Tab reaches the box only when it scrolls.
