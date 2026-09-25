# Sankey Chart

Root Sankey container — computes layout and provides context. Parent component; all Sankey marks are children.

## Classification

- Category: `data-visualization` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/SankeyChart.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Root Sankey container — computes layout and provides context.
- Provides: SankeyChart
- Requires: React 19 with `@astryxdesign/lab` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: SankeyChart
- Upstream: Astryx lab (experimental, canary-only upstream) · Data Visualization

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

## Examples

- `upstream/stories/SankeyChart.stories.tsx` — Storybook — SankeyChart

## Documentation

### Sankey Chart

Root Sankey container — computes layout and provides context. Parent component; all Sankey marks are children.

## Files

- `upstream/SankeyChart.doc.mjs`
- `upstream/SankeyChart.tsx`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://facebook.github.io/astryx/storybook/
