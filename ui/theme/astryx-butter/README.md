# Butter theme

Warm, creamy yellows with a friendly blue accent. Playful enough for consumer surfaces, soft enough to stay readable.

## Classification

- Category: `theme` — decorative
- Medium: CSS custom properties (built) + TypeScript theme source
- Framework: css
- Entry point: `src/theme.css`
- Nature: decorative; supplies look-and-feel only — never lift layout or interaction from it.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Warm, creamy yellows with a friendly blue accent.
- Provides: color, typography, radius, elevation and motion tokens scoped to `[data-astryx-theme="butter"]`
- Requires: `src/theme.css` after `ui/_sources/astryx/css/astryx.css`, and a `data-astryx-theme="butter"` ancestor
- Variants: default

## How an agent uses this reference

- Any stack: link `src/theme.css` (or `ui/_sources/astryx/css/themes/butter.css`) and put
  `data-astryx-theme="butter"` on the root; every Astryx token (`--color-*`, `--text-*`, `--radius-*`,
  `--shadow-*`) resolves to this theme. To take the palette only, copy the token values.
- React: `<Theme theme={butterTheme}>` from `@astryxdesign/theme-butter/built`.
- Fonts are local in `ui/_sources/astryx/fonts/`.

## Key tokens

- `--font-family-body`: `Outfit, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`
- `--font-family-heading`: `Outfit, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`
- `--font-family-code`: `"JetBrains Mono", "SF Mono", Monaco, Consolas, monospace`
- `--radius-element`: `0.5rem`
- `--radius-container`: `0.75rem`
- `--color-accent`: `light-dark(#225BFF, #FDEE8C)`
- `--color-background-body`: `light-dark(#FDFBE4, #261A13)`
- `--color-text-primary`: `light-dark(#1d1c11, #f3f2e2)`

## Files

- `src/butterTheme.ts`
- `src/icons.tsx`
- `src/theme.css`
- `src/demo.tsx` — the Theme Showcase template rendered in this theme

Upstream page: https://astryx.atmeta.com/themes?theme=butter
