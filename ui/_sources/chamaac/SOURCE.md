# Chamaac UI

- Site: https://www.chamaac.com
- Repository: https://github.com/amarnathdhumal/chamaacui
- Captured commit: `345d79b1b1d4c89c2394a5c23ac12a9861c383c2`
- License: MIT — `LICENSE.md`
- Captured: 2026-09-25T08:24:04Z
- Importer: `node tools/import-chamaac.mjs <chamaacui checkout>`, then `node tools/capture-bank.mjs --source chamaac --static --previews`
- Animated icons: the `chamaac-icons` icon set (`tools/import-animated-icons.mjs`)

## Contents

- `registry/chamaac/`, `app/`, `components/` — the repository modules the demos reach, same paths as upstream
- `styles.css` — Tailwind v4 build of `tailwind.css` (the site's `app/globals.css`) over this snapshot
- `frame.tsx` — bank-only React harness; `manifest.json` — every captured entry
- `public/`, `fonts/` — the images the components use, and the site's fonts, localized

## Counts

- On the site: 26
- In progress (`app/in-progress/`): 8
- Registry source only, no demo: 6

## Excluded

- `emissive-dot-grid` — the whole file is commented out upstream; exports no component
- `marching-waves` — the whole file is commented out upstream; exports no component
