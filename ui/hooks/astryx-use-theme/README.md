# useTheme

Programmatic access to theme tokens for non-CSS consumers like SVG, canvas, Vega, D3, maps, or chart libraries that need values in JavaScript instead of CSS custom property references.

## Classification

- Category: `hooks` — functional
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/useTheme.ts`
- Nature: functional; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Programmatic access to theme tokens for non-CSS consumers like SVG, canvas, Vega, D3, maps, or chart libraries that need values in JavaScript instead of CSS custom property references.
- Avoid when: Hardcode light/dark colors in data visualizations: resolve them through the current theme instead. Assume the hook reflects every CSS cascade override. It resolves tokens for the current Theme mode; local media-surface overrides and arbitrary external CSS may not be represented.
- Provides: useTheme
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: useThemeHookUsage
- Upstream: Astryx core · Utility
- Keywords: theme, tokens, color, mode, dark, light, provider, data visualization, canvas, svg, chart

## How an agent uses this reference

- **React 19 target** — install `@astryxdesign/core` + a theme and copy the example from
  `upstream/examples/` as-is, or read `upstream/` to own the component (upstream calls this "swizzle").
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the
  rendered DOM of each example with every class resolved by the local stylesheets in
  `ui/_sources/astryx/` (`frame.css` pulls fonts, reset, component CSS and all seven themes).
  Keep the markup, the `data-astryx-theme` wrapper and the `--*` tokens; re-implement behavior
  from the Props / Accessibility sections below, never from the minified class names.
- Design rules shared by every component: `ui/_sources/astryx/docs/` (principles, tokens, color,
  spacing, typography, motion, layout).
- Hooks carry behavior only: port the logic, keep the accessibility contract.

## Examples

- `upstream/examples/useThemeHookUsage.tsx` — useTheme — Token Values: Read resolved theme token values with useTheme for non-CSS consumers like SVG charts. · static: `static/useThemeHookUsage.html`

## Documentation

### useTheme

Import: `@astryxdesign/core/theme`

Programmatic access to theme tokens for non-CSS consumers like SVG, canvas, Vega, D3, maps, or chart libraries that need values in JavaScript instead of CSS custom property references.

**Do**

- Use tokens or token(name) when integrating theme colors into SVG attributes, canvas drawing, chart options, or other non-CSS configuration objects inside React components.
- Use resolveThemeTokens(theme, {mode}) for the same token resolution outside React hooks.
- Prefer CSS variables or StyleX tokens for ordinary component styling; use this hook only when JavaScript needs token values.
- Use data visualization tokens such as --color-data-categorical-blue for chart series instead of arbitrary UI colors.

**Don't**

- Hardcode light/dark colors in data visualizations: resolve them through the current theme instead.
- Assume the hook reflects every CSS cascade override. It resolves tokens for the current Theme mode; local media-surface overrides and arbitrary external CSS may not be represented.

**Returns**

```ts
[
  {
    "name": "name",
    "type": "string",
    "description": "Name of the nearest theme, or default when no provider is present."
  },
  {
    "name": "mode",
    "type": "'light' | 'dark'",
    "description": "Resolved effective color mode. system mode is resolved to light or dark."
  },
  {
    "name": "token",
    "type": "(name: string) => string",
    "description": "Resolve a single design token to its current CSS value for the effective mode."
  },
  {
    "name": "tokens",
    "type": "Record<string, string>",
    "description": "All tokens resolved for the current mode, including defaults and theme overrides. Stable until the active theme or mode changes; uses the same resolution logic as resolveThemeTokens(theme, {mode})."
  }
]
```

## Files

- `upstream/useTheme.doc.mjs`
- `upstream/useTheme.ts`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/useTheme
