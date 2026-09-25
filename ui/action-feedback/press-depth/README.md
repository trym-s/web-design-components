# Press Depth

The feeling that the press landed.

## Classification

- Category: `action-feedback` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/press-depth.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/press-depth.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/press-depth

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--card`, `--primary`, `--ring`, …). It imports only `react` and `motion` (`motion/react`). It declares `--press-depth-highlight` on the face's highlight layer (light: `inset 0 1.5px 0 oklch(1 0 0 / 0.95), inset 0 -1px 0 oklch(0.216 0.006 56 / 0.06)`; dark: `inset 0 1.5px 0 oklch(1 0 0 / 0.09)`). `src/demo.tsx` is sample data and wiring only.

### PressDepth — `press-depth.tsx`

- Props: `children`, `depth` (4 px of travel), `tilt` (7° maximum lean), `disabled`, `type` (`"button"`), `onClick`, `className` (applied to the face), `aria-label`. The file also exports `usePressDepth({ disabled, onPressStart, onPressEnd })` → `{ pressed, origin, ref, bind }`.
- Structure: a `<button>` with `padding-bottom: depth` holding two layers: a base slab (`--foreground` at 10 %, radius `calc(var(--radius) - 1px)`, starting `depth` px from the top) and the face on top (36 px high, `px-3.5`, 13 px medium `--foreground` text, 1 px `--border`, `--card` fill, same radius) with a top-highlight overlay using `--press-depth-highlight`. The face is rendered in 3D with `perspective: 340px`. `data-pressed` is set while down.
- States: pressed → the face moves down `depth` px and tilts toward the press point (`rotateX = -y × tilt`, `rotateY = x × tilt`, where x/y are −1…1 across the button) while the highlight fades out; spring stiffness 520, damping 34, mass 0.45. Keyboard presses sink without tilt. Focus-visible: 2 px `--ring` ring on the face. Disabled: 50 % opacity. Reduced motion: instant sink, no tilt.
- Interactions: primary-pointer press sinks the face; dragging outside the button raises it, dragging back in sinks it again; pointer up/cancel, window blur or a hidden tab release it. `touch-action: manipulation`, no tap highlight.
- Keyboard: Space / Enter held down sinks the face (repeat ignored); key up (or Escape) raises it; native activation fires `onClick`.
