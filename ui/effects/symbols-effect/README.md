# Symbols effect

- Drop in an image or a video and it gets cut into four brightness bands. Each band is stamped with a tiny symbol, tinted with its own colour, so the picture is rebuilt out of little marks. It all runs on the GPU, so video plays through it live.
- The symbols, the colours and where the bands split are yours to change. When it looks right you can save a still as a PNG or record the whole thing as a video.
- It runs entirely in the browser, nothing gets uploaded, and you can grab the code below and drop the renderer into your own project.

## Classification

- Category: `effects` — decorative
- Medium: WebGL shader
- Entry point: `upstream/sandbox/standalone/SymbolsEffect.ts`
- Nature: visual-only; it carries no UX flow of its own. Reuse the look, not the layout.

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`
- `upstream/sandbox/shaders.ts`
- `upstream/sandbox/glyphs.ts`
- `upstream/sandbox/standalone/SymbolsEffect.ts`

## Use in an agent run

`PROMPT.md` is the upstream "Copy prompt" payload: intro plus every file inline. Hand it to an
agent verbatim when you want the effect ported into a target project. Read `upstream/` directly when
you only need the technique.

Upstream page: https://www.arlan.me/vault/sandbox

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens. It imports only `react` and `three`;
`symbols-effect.ts` (renderer), `shaders.ts` and `glyphs.ts` are the upstream standalone files, with colours parsed from any
CSS colour. `src/demo.tsx` feeds it a generated grayscale image (no network, no asset).

### SymbolsCanvas — `symbols-canvas.tsx`

- Props: `image` (URL or data URL) or `video` (URL; plays muted, looped, live through the effect), `cell` (cell size in CSS px
  at a 600 px wide canvas, scaled with the width), `bandStops` (five luminance stops 0–1 → four bands, dark → light),
  `bandGlyphs` (glyph index per band from `GLYPHS` in `glyphs.ts`: 0 empty, 1 dot, 2 ring, 3 square, 4 frame, 5 diagonal,
  6 cross, …), `zoom` (1 = cover), `aria-label`, `className`.
- Structure: a `role="img"` canvas filling its parent. A full-frame quad samples the source per cell (cover-fit by cropping
  the source, never letterboxing), buckets the cell's luminance into a band and stamps that band's glyph (a 64 px repeating
  texture) tinted with the band colour over the paper. Colours: `--symbols-band-1…4` (defaults `--chart-3`, `--chart-2`,
  `--chart-1`, `--chart-4`) and `--symbols-bg` (`--background`), declared on the canvas and read when it mounts.
- Motion: static for images; video re-renders every frame. Resizes re-render.
- Interactions / keyboard: none (decorative).
