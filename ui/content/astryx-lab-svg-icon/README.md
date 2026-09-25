# SVG Icon

CSS-variable-driven SVG icon with role-aware rendering and mask-based gaps. Core implementation for the lab SVG icon system.

## Classification

- Category: `content` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/SVGIcon.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: CSS-variable-driven SVG icon with role-aware rendering and mask-based gaps.
- Provides: SVGIcon
- Requires: React 19 with `@astryxdesign/lab` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: SVGIcon, SVGIconRegistry, XIFSpec
- Upstream: Astryx lab (experimental, canary-only upstream) · Content

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

- `src/stories/SVGIcon.stories.tsx` — Storybook — SVGIcon
- `src/stories/SVGIconRegistry.stories.tsx` — Storybook — SVGIconRegistry
- `src/stories/XIFSpec.stories.tsx` — Storybook — XIFSpec

## Documentation

### SVG Icon

CSS-variable-driven SVG icon with role-aware rendering and mask-based gaps. Core implementation for the lab SVG icon system.

## Files

- `src/SVGIcon.doc.mjs`
- `src/SVGIcon.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://facebook.github.io/astryx/storybook/
