# Coverflow Gallery

A perspective image gallery with card selection, keyboard navigation, and optional autoplay.

## Classification

- Category: `scroll` — interactive
- Medium: React + TypeScript + CSS transforms
- Entry point: `upstream/coverflow-gallery.tsx`
- Nature: interactive; reuse the card hierarchy, perspective treatment, and keyboard controls.
- Added: 2026-08-18T11:23:07+03:00

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`
- `upstream/coverflow-gallery.tsx` — localized source component
- `upstream/demo.tsx` — dashboard demo
- `reference.tsx` — dashboard entry point
- `../../_sources/originkit/media/` — localized image assets

Upstream: Originkit (source supplied by the user).

## Usage

Copy `src/` into a React + Tailwind v4 project. It imports only `react`. `src/demo.tsx` uses token-coloured placeholder
cards (`--chart-1…5`) instead of the upstream portrait photos.

### CoverflowGallery — `coverflow-gallery.tsx`

- Props: `slides` (`{ image?: { src, srcSet?, alt? }, content?, title? }[]`; `title` breaks on `\n`), `active` / `defaultActive` (0)
  / `onActiveChange(index)`, `cardWidth` / `cardHeight` (400), `radius` (3 of 20 → share of half the shorter side), `tilt` (12°),
  `sideTilt` (8°), `gap` (8 → 240 px per step), `opacity` (60 — inactive cards dimmed to 40 %), `transition`
  (`{ duration: 0.6 s, delay: 2.5 s autoplay interval, ease: [0.22, 1, 0.36, 1] }`), `autoplay` (false), `autoplayDirection`
  (`rightToLeft` | `leftToRight`), `showTitle` (true), `titleStyle`, `titlePosition` (`{ position: bottomLeft…, padding… 22/24 px }`),
  `className`, `style`.
- Structure: a focusable `role="group"` carousel (perspective 1600 px). Each card at offset `rel` from the active one:
  translateX `rel × gap × 30`, translateZ `−|rel| × 240`, rotateY `−rel × tilt`, rotateZ `rel × sideTilt`, scale
  `1 − 0.16|rel|`; only |rel| ≤ 2 are visible; indices wrap. Cards have a `--coverflow-card` fill, a scrim gradient toward the
  title corner (`--coverflow-scrim` at 70 %), a 28 px bold title (`--coverflow-title`, −0.02 em, 1.1 line-height) and a scrim
  overlay dimming inactive cards.
- Motion: transform and opacity transition with the given duration/ease; moves are locked for one duration.
- Interactions: click a side card to bring it forward; click the active card to advance. Autoplay steps every `delay`
  seconds and disables clicks.
- Keyboard: focus the carousel, ArrowRight / ArrowLeft step (wrapping).
