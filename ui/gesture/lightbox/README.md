# Lightbox

Zoom that returns where it started.

## Classification

- Category: `gesture` — interactive
- Medium: React + TypeScript + Tailwind CSS + Motion
- Entry point: `upstream/lightbox.tsx`
- Nature: interactive; reuse the behavior and adapt its literal visual values to the target project.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `upstream/lightbox.tsx` — self-contained hook and styled component
- `upstream/demo.tsx` — upstream replayable documentation demo
- `reference.tsx` — dashboard entry point

Upstream page: https://www.interior.dev/docs/lightbox

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--card`, `--border`, `--primary`, `--ring`,
`--foreground`, `--muted-foreground`, `--radius`). It imports only `react`, `react-dom` (`createPortal`) and `motion`
(`motion/react`). The backdrop is a `bg-black/80` scrim, as shadcn's own overlays use black. `src/demo.tsx` is sample data
and wiring only; its photo `src/hillside-castle.jpg` (640 × 400) is sample media from the interior.dev snapshot — replace it
with your own image.

### Lightbox — `lightbox.tsx`

- Props: `open`, `onClose()`, `src`, `alt`, `originRef` (the thumbnail element the image grows out of and returns to),
  `caption` (defaults to `alt`; also the dialog title), `width` / `height` (intrinsic size), `maxScale` (4), `className`.
  `useLightbox({ maxScale, steps, disabled, onDismiss })` is exported: the zoom/pan engine (motion values `scale`, `x`, `y`,
  `bind` handlers, `zoom`, `settledZoom`, `zoomed`, `reset`, `zoomAt(scale, clientX, clientY, animated)`).
- Structure: rendered after mount into `document.body` via a portal: a fixed `z-50` `role="dialog"` `aria-modal` shell with
  `aria-labelledby` → caption; a `bg-black/80` backdrop; a full-screen focusable `role="group"` stage (`touch-action: none`,
  `p-4`, `sm:p-14`) holding the `object-contain` image; top bar (`p-3`, `sm:p-4`) with the caption chip (radius
  `calc(var(--radius) - 1px)`, 1 px `--border`, `--card`, 12.5 px `--foreground`, max 65 % width, truncated) and two 32 px
  icon buttons (zoom in/out with a 15 px magnifier whose "+" bar fades, close ×), each 1 px `--border`, `--card`,
  `--muted-foreground` → `--foreground` on hover. An sr-only hint and a status line "Zoom N times".
- States: open — the image flies from `originRef`'s rect (position, scale, its corner radius → 14 px) with a spring (stiffness
  150 / damping 27 / mass 1) and un-blurs from 6 px over 350 ms; without an origin it rises 10 px from scale 0.97 and fades in.
  Backdrop and chrome fade in (spring 260 / 34 / 0.8). Close — the image unwinds zoom, flies back to the origin with 4 px blur,
  chrome fades out in 200 ms (`cubic-bezier(0.4, 0, 1, 1)`). Zoom range 1…`maxScale`, reported in 8 steps; zoom spring
  520 / 34 / 0.45, returning home uses the 150 / 27 / 1 spring; pan is clamped so the image edges never pass the stage edges.
  Body scroll is locked (scrollbar width compensated) while open. Reduced motion: no fly/blur, instant zoom.
- Interactions: wheel zooms toward the pointer (factor `exp(−deltaY / 140)`); double-click toggles 1× ↔ 2.5× at the pointer;
  drag pans when zoomed; releasing a gesture below 1.05× snaps home; a click (< 8 px movement) on the backdrop outside the
  image while not zoomed closes; zoom button toggles 2.5× around the centre.
- Keyboard: opening focuses the stage, closing restores focus to the previously focused element; Tab / Shift+Tab cycle only
  stage → zoom → close. `+`/`=` zoom ×1.6, `-`/`_` ÷1.6, `0` resets, arrows pan 56 px when zoomed, Escape resets zoom first and
  closes when at 1×. Stage focus-visible: 1 px inset `--ring`; buttons: `--primary` border + 3 px `--primary`/20 ring.
