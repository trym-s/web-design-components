# Chocolate theme

Warm chocolate theme for Astryx — rich brown palette with Fraunces headings, Albert Sans body, and Lucide icons

## Classification

- Category: `theme` — decorative
- Medium: CSS custom properties (built) + TypeScript theme source
- Framework: css
- Entry point: `upstream/theme.css`
- Nature: decorative; supplies look-and-feel only — never lift layout or interaction from it.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Warm chocolate theme for Astryx — rich brown palette with Fraunces headings, Albert Sans body, and Lucide icons
- Provides: color, typography, radius, elevation and motion tokens scoped to `[data-astryx-theme="chocolate"]`
- Requires: `upstream/theme.css` after `ui/_sources/astryx/css/astryx.css`, and a `data-astryx-theme="chocolate"` ancestor
- Variants: default

## How an agent uses this reference

- Any stack: link `upstream/theme.css` (or `ui/_sources/astryx/css/themes/chocolate.css`) and put
  `data-astryx-theme="chocolate"` on the root; every Astryx token (`--color-*`, `--text-*`, `--radius-*`,
  `--shadow-*`) resolves to this theme. To take the palette only, copy the token values.
- React: `<Theme theme={chocolateTheme}>` from `@astryxdesign/theme-chocolate/built`.
- Fonts are local in `ui/_sources/astryx/fonts/`.

## Key tokens

- `--font-family-body`: `"Albert Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`
- `--font-family-heading`: `Fraunces, Georgia, "Times New Roman", Times, serif`
- `--font-family-code`: `"JetBrains Mono", "SF Mono", Monaco, Consolas, monospace`
- `--radius-element`: `0.625rem`
- `--radius-container`: `0.75rem`
- `--color-accent`: `light-dark(#8C5927, #d4a06a)`
- `--color-background-body`: `light-dark(#FFFCF7, #141010)`
- `--color-text-primary`: `light-dark(#4a3520, #EDE4D4)`

## Files

- `upstream/chocolateTheme.ts`
- `upstream/icons.tsx`
- `upstream/theme.css`
- `upstream/demo.tsx` — the Theme Showcase template rendered in this theme

Upstream page: https://astryx.atmeta.com/themes?theme=chocolate
