# Audio UI

- Site: https://audio-ui.xyz
- Repository: https://github.com/ouestlabs/audio-ui
- Captured commit: `aeba2d5efaa0ffbc21e334bac0817cc3060289ef`
- Primitives: `@audio-ui/react` 0.1.2 (npm, installed in the bank)
- License: MIT — `LICENSE.md`
- Captured: 2026-09-25T08:37:12Z
- Importer: `node tools/import-audio-ui.mjs <audio-ui checkout>`, then `node tools/capture-bank.mjs --source audio-ui --static --previews`

## Contents

- `registry-audio/`, `registry/` — the site modules the demos reach, same paths as `apps/www/src/`: the audio
  elements, hooks and stores, and the shadcn Base UI components they build on
- `shims/icon-placeholder.tsx` — lucide-only replacement for the site's icon-library switch
- `styles.css` — Tailwind v4 build of `tailwind.css` (the site's `styles/globals.css`, Nova style) over this snapshot
- `frame.tsx` — bank-only React harness; `manifest.json` — every captured entry; `fonts/` — the site's fonts

## Counts

- Component families: 9 (42 demos)
- Blocks: 21

## Excluded

- nothing
- The seven other shadcn styles and the Radix base: the docs render Base UI + Nova by default.
