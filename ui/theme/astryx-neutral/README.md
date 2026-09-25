# Neutral theme

Restrained warm grays. Minimal and quiet, so the content stays the focus.

## Classification

- Category: `theme` — decorative
- Medium: CSS custom properties (built) + TypeScript theme source
- Framework: css
- Entry point: `upstream/theme.css`
- Nature: decorative; supplies look-and-feel only — never lift layout or interaction from it.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Restrained warm grays.
- Provides: color, typography, radius, elevation and motion tokens scoped to `[data-astryx-theme="neutral"]`
- Requires: `upstream/theme.css` after `ui/_sources/astryx/css/astryx.css`, and a `data-astryx-theme="neutral"` ancestor
- Variants: default

## How an agent uses this reference

- Any stack: link `upstream/theme.css` (or `ui/_sources/astryx/css/themes/neutral.css`) and put
  `data-astryx-theme="neutral"` on the root; every Astryx token (`--color-*`, `--text-*`, `--radius-*`,
  `--shadow-*`) resolves to this theme. To take the palette only, copy the token values.
- React: `<Theme theme={neutralTheme}>` from `@astryxdesign/theme-neutral/built`.
- Fonts are local in `ui/_sources/astryx/fonts/`.

## Key tokens

- `--font-family-body`: `Figtree, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`
- `--font-family-heading`: `Figtree, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`
- `--font-family-code`: `ui-monospace, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace`
- `--radius-element`: `0.625rem`
- `--radius-container`: `0.75rem`
- `--color-accent`: `light-dark(#1b1b1b, #f1f1f1)`
- `--color-background-body`: `light-dark(#f1f1f1, #1b1b1b)`
- `--color-text-primary`: `light-dark(#000000, #ffffff)`

## Files

- `upstream/icons.tsx`
- `upstream/neutralPaletteRefs.generated.ts`
- `upstream/neutralPalettes.generated.receipt.json`
- `upstream/neutralPalettes.generated.ts`
- `upstream/neutralPalettes.ts`
- `upstream/neutralTheme.ts`
- `upstream/palette.config.json`
- `upstream/theme.css`
- `upstream/demo.tsx` — the Theme Showcase template rendered in this theme

Upstream page: https://astryx.atmeta.com/themes?theme=neutral
