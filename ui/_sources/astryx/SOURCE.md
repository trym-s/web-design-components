# Astryx

- Site: https://astryx.atmeta.com
- Repository: https://github.com/facebook/astryx
- Storybook (lab/charts): https://facebook.github.io/astryx/storybook/
- Captured commit: `e073c9f8df371455086b384a6c221acdcfdcd57c`
- npm build used by live demos: `0.6.3-canary.e073c9f` (canary published from the same commit)
- License: MIT — `LICENSE`
- Captured: 2026-09-24T15:30:00Z
- Importer: `node tools/import-astryx.mjs <astryx checkout>`, then `node tools/capture-astryx.mjs`

## Contents

- `css/` — the published prebuilt CSS: `reset.css`, `astryx.css` (core), `lab.css`, `charts.css`, `themes/*.css`
- `frame.css` — imports all of the above in cascade order plus `fonts.css`; link this one file from static HTML
- `fonts/`, `fonts.css` — theme typefaces from Google Fonts (OFL), latin subset
- `docs/` — the CLI design docs (principles, tokens, color, spacing, typography, motion, layout, theme…)
- `src/{core,lab,charts}/` — full package source without tests, for the internals component files import
- `template-assets/`, `remote/` — images the examples and templates render
- `frame.tsx` — bank-only React harness (Theme provider + example switcher)
- `manifest.json` — every captured entry with its upstream page and examples

## Counts

- Components: 146 (core 108, lab 32, charts 6)
- Hooks: 38
- Block examples: 650; Storybook story files: 34
- Page templates: 54
- Themes: 7

## Excluded

- `@astryxdesign/vega` (Vega-Lite wrapper): a thin adapter over an external charting grammar, no visual design of its own.
- The docsite's own chrome, blog and playground.
