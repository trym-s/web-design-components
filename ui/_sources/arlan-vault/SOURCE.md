# Source

- Upstream index: https://www.arlan.me/vault
- Captured: 2026-08-12
- Author: Arlan Marat (https://arlan.me)
- License: MIT, stated on the vault index ("free to copy")
- Entries captured: 18 (the full index as of the capture date)
- Extraction method: each entry page is a Next.js RSC payload; the `files` array holds the
  page's own code blocks and the "Copy prompt" button holds an agent-ready prompt containing
  the same source inline. Both were pulled verbatim — nothing rewritten or reformatted.

## What these entries are

Almost every vault entry is a *visual* reference: shaders, canvas engines, CSS material tricks,
type treatments. They carry no product UX flow. Classify and reuse them as look-and-feel
sources, never as interaction patterns.

Each captured directory holds:

- `README.md` — what it is, classification block, entry point, file list
- `SOURCE.md` — per-entry upstream, license, inspiration
- `PROMPT.md` — the verbatim upstream "Copy prompt" payload (intro + full source inline);
  hand this to an agent when porting the effect into a target project
- `src/` — pinned source snapshot at the upstream relative paths
- `reference.tsx` (or `reference.md` for non-React entries) — the `Use when:` line and entry point

## Where they landed

| Category | Entries |
|---|---|
| `ui/effects/` | arcade-pixel, ascii-swirl, chroma-glow, dia-gradient, emboss, holo-card, liquid-ui, pixel-brushes, smear-fade, symbols-effect |
| `ui/surface/` | color-depth, squircle |
| `ui/typography/` | kinetic-tiles, ransom-note, typer |
| `ui/animation/` | ghosty-reveal, hover-video-button |
| `ui/editor/` | vector-editor |

## Previews

Most entries render live on canvas upstream, so no still exists. `preview.png` is present only
for hover-video-button, dia-gradient, and ascii-swirl (converted from the upstream `.webp`).

Keep this snapshot in the private reference bank; the MIT terms allow reuse, but attribute the
author when the effect ships.

## Local runtime assets

- `arcade-pixel` imports `src/arcade/cycle.ts`, but the upstream page did not publish that file.
- `media/` retains the five arcade/emboss textures, the holo-card photograph, all three hover-video
  encodings, and the ransom-note manifest plus all 294 sprite images. Runtime paths point here;
  previews do not depend on the upstream site or R2 bucket.
