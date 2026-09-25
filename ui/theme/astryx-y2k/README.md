# Y2K theme

Hot pinks, lime greens, and Poppins. Bubbly, playful, and unmistakably retro.

## Classification

- Category: `theme` — decorative
- Medium: CSS custom properties (built) + TypeScript theme source
- Framework: css
- Entry point: `upstream/theme.css`
- Nature: decorative; supplies look-and-feel only — never lift layout or interaction from it.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Hot pinks, lime greens, and Poppins.
- Provides: color, typography, radius, elevation and motion tokens scoped to `[data-astryx-theme="y2k"]`
- Requires: `upstream/theme.css` after `ui/_sources/astryx/css/astryx.css`, and a `data-astryx-theme="y2k"` ancestor
- Variants: default

## How an agent uses this reference

- Any stack: link `upstream/theme.css` (or `ui/_sources/astryx/css/themes/y2k.css`) and put
  `data-astryx-theme="y2k"` on the root; every Astryx token (`--color-*`, `--text-*`, `--radius-*`,
  `--shadow-*`) resolves to this theme. To take the palette only, copy the token values.
- React: `<Theme theme={y2kTheme}>` from `@astryxdesign/theme-y2k/built`.
- Fonts are local in `ui/_sources/astryx/fonts/`.

## Key tokens

- `--font-family-body`: `Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`
- `--font-family-heading`: `Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`
- `--font-family-code`: `"JetBrains Mono", "SF Mono", Monaco, Consolas, monospace`
- `--radius-element`: `0px`
- `--radius-container`: `0px`
- `--color-accent`: `light-dark(#2d241b, #EDEFFC)`
- `--color-background-body`: `light-dark(#CCCFFA, #0e0f1a)`
- `--color-text-primary`: `light-dark(#2d241b, #EDEFFC)`

## Files

- `upstream/icons.tsx`
- `upstream/theme.css`
- `upstream/y2kTheme.ts`
- `upstream/demo.tsx` — the Theme Showcase template rendered in this theme

Upstream page: https://astryx.atmeta.com/themes?theme=y2k
