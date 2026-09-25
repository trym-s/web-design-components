# 3D Scatter GL

WebGL 3D scatter — canvas overlaid outside SVG for sharp DPR rendering. Child of ThreeDChart; reads camera from context (Tier 1).

## Classification

- Category: `data-visualization` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/ThreeDScatterGL.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: WebGL 3D scatter — canvas overlaid outside SVG for sharp DPR rendering.
- Provides: ThreeDScatterGL
- Requires: React 19 with `@astryxdesign/lab` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: family demo (data-visualization/astryx-lab-three-d-chart)
- Upstream: Astryx lab (experimental, canary-only upstream) · Data Visualization

## How an agent uses this reference

- **React 19 target** — install `@astryxdesign/core` + a theme and copy the example from
  `src/examples/` as-is, or read `src/` to own the component (upstream calls this "swizzle").
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the
  rendered DOM of each example with every class resolved by the local stylesheets in
  `ui/_sources/astryx/` (`frame.css` pulls fonts, reset, component CSS and all seven themes).
  Keep the markup, the `data-astryx-theme` wrapper and the `--*` tokens; re-implement behavior
  from the Props / Accessibility sections below, never from the minified class names.
- Design rules shared by every component: `ui/_sources/astryx/docs/` (principles, tokens, color,
  spacing, typography, motion, layout).

## Examples

- None of its own upstream; the demo is its family's: `ui/data-visualization/astryx-lab-three-d-chart`.

## Documentation

### 3D Scatter GL

WebGL 3D scatter — canvas overlaid outside SVG for sharp DPR rendering. Child of ThreeDChart; reads camera from context (Tier 1).

## Files

- `src/ThreeDScatterGL.doc.mjs`
- `src/ThreeDScatterGL.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://facebook.github.io/astryx/storybook/
