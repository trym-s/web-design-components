# Stone theme

Warm stone and slate, earthy and understated, with just enough character to feel handcrafted.

## Classification

- Category: `theme` — decorative
- Medium: CSS custom properties (built) + TypeScript theme source
- Framework: css
- Entry point: `src/theme.css`
- Nature: decorative; supplies look-and-feel only — never lift layout or interaction from it.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Warm stone and slate, earthy and understated, with just enough character to feel handcrafted.
- Provides: color, typography, radius, elevation and motion tokens scoped to `[data-astryx-theme="stone"]`
- Requires: `src/theme.css` after `ui/_sources/astryx/css/astryx.css`, and a `data-astryx-theme="stone"` ancestor
- Variants: default

## How an agent uses this reference

- Any stack: link `src/theme.css` (or `ui/_sources/astryx/css/themes/stone.css`) and put
  `data-astryx-theme="stone"` on the root; every Astryx token (`--color-*`, `--text-*`, `--radius-*`,
  `--shadow-*`) resolves to this theme. To take the palette only, copy the token values.
- React: `<Theme theme={stoneTheme}>` from `@astryxdesign/theme-stone/built`.
- Fonts are local in `ui/_sources/astryx/fonts/`.

## Key tokens

- `--font-family-body`: `Figtree, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`
- `--font-family-heading`: `Montserrat, "Figtree", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`
- `--font-family-code`: `"JetBrains Mono", "SF Mono", Monaco, Consolas, monospace`
- `--radius-element`: `0.5rem`
- `--radius-container`: `0.75rem`
- `--color-accent`: `light-dark(#25252a, #f3f3f5)`
- `--color-background-body`: `light-dark(#f3f3f5, #111015)`
- `--color-text-primary`: `light-dark(#25252a, #f3f3f5)`

## Files

- `src/icons.tsx`
- `src/stoneTheme.ts`
- `src/theme.css`
- `src/demo.tsx` — the Theme Showcase template rendered in this theme

Upstream page: https://astryx.atmeta.com/themes?theme=stone
