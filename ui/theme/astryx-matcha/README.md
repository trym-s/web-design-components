# Matcha theme

Earthy greens with a calm, organic feel. Naturalistic and grounded, great for wellness or content-first apps.

## Classification

- Category: `theme` — decorative
- Medium: CSS custom properties (built) + TypeScript theme source
- Framework: css
- Entry point: `upstream/theme.css`
- Nature: decorative; supplies look-and-feel only — never lift layout or interaction from it.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Earthy greens with a calm, organic feel.
- Provides: color, typography, radius, elevation and motion tokens scoped to `[data-astryx-theme="matcha"]`
- Requires: `upstream/theme.css` after `ui/_sources/astryx/css/astryx.css`, and a `data-astryx-theme="matcha"` ancestor
- Variants: default

## How an agent uses this reference

- Any stack: link `upstream/theme.css` (or `ui/_sources/astryx/css/themes/matcha.css`) and put
  `data-astryx-theme="matcha"` on the root; every Astryx token (`--color-*`, `--text-*`, `--radius-*`,
  `--shadow-*`) resolves to this theme. To take the palette only, copy the token values.
- React: `<Theme theme={matchaTheme}>` from `@astryxdesign/theme-matcha/built`.
- Fonts are local in `ui/_sources/astryx/fonts/`.

## Key tokens

- `--font-family-body`: `"DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`
- `--font-family-heading`: `"Playwrite US Trad", Georgia, "Times New Roman", Times, serif`
- `--font-family-code`: `"JetBrains Mono", "SF Mono", Monaco, Consolas, monospace`
- `--radius-element`: `12px`
- `--radius-container`: `18px`
- `--color-accent`: `light-dark(#3E481D, #C0CBA9)`
- `--color-background-body`: `light-dark(#F0F0E0, #12140e)`
- `--color-text-primary`: `light-dark(#3E481D, #C0CBA9)`

## Files

- `upstream/icons.tsx`
- `upstream/matchaTheme.ts`
- `upstream/theme.css`
- `upstream/demo.tsx` — the Theme Showcase template rendered in this theme

Upstream page: https://astryx.atmeta.com/themes?theme=matcha
