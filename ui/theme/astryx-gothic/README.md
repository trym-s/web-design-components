# Gothic theme

Deep blue-grays and a signature display serif. Dramatic and editorial, for surfaces that want to be remembered.

## Classification

- Category: `theme` — decorative
- Medium: CSS custom properties (built) + TypeScript theme source
- Framework: css
- Entry point: `src/theme.css`
- Nature: decorative; supplies look-and-feel only — never lift layout or interaction from it.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Deep blue-grays and a signature display serif.
- Provides: color, typography, radius, elevation and motion tokens scoped to `[data-astryx-theme="gothic"]`
- Requires: `src/theme.css` after `ui/_sources/astryx/css/astryx.css`, and a `data-astryx-theme="gothic"` ancestor
- Variants: default

## How an agent uses this reference

- Any stack: link `src/theme.css` (or `ui/_sources/astryx/css/themes/gothic.css`) and put
  `data-astryx-theme="gothic"` on the root; every Astryx token (`--color-*`, `--text-*`, `--radius-*`,
  `--shadow-*`) resolves to this theme. To take the palette only, copy the token values.
- React: `<Theme theme={gothicTheme}>` from `@astryxdesign/theme-gothic/built`.
- Fonts are local in `ui/_sources/astryx/fonts/`.

## Key tokens

- `--font-family-body`: `Fustat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`
- `--font-family-heading`: `Fustat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`
- `--font-family-code`: `"JetBrains Mono", "SF Mono", Monaco, Consolas, monospace`
- `--radius-element`: `0.5rem`
- `--radius-container`: `0.75rem`
- `--color-accent`: `#E8F1F6`
- `--color-background-body`: `#101314`
- `--color-text-primary`: `#E8F1F6`

## Files

- `src/gothicTheme.ts`
- `src/icons.tsx`
- `src/theme.css`
- `src/demo.tsx` — the Theme Showcase template rendered in this theme

Upstream page: https://astryx.atmeta.com/themes?theme=gothic
