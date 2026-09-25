# Layer

Layer utilities provide the app-level provider used by overlay systems. Use LayerProvider at the app root for toast/layer configuration; use higher-level Popover, HoverCard, or Tooltip APIs for most overlay UI.

## Classification

- Category: `utility` — functional
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/LayerContext.ts`
- Nature: functional; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Layer utilities provide the app-level provider used by overlay systems.
- Avoid when: Add nested LayerProvider instances: nested providers are ignored and add unnecessary tree depth.
- Provides: Layer
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: family demo (hooks/astryx-use-layer)
- Upstream: Astryx core · Utility
- Keywords: layer, overlay, popover, positioning, anchor, floating, dropdown, popper, popup, portal

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

- None of its own upstream; the demo is its family's: `ui/hooks/astryx-use-layer`.

## Documentation

### Layer

Layer utilities provide the app-level provider used by overlay systems. Use LayerProvider at the app root for toast/layer configuration; use higher-level Popover, HoverCard, or Tooltip APIs for most overlay UI.

**Do**

- Use LayerProvider once near the app root when you need shared toast/layer configuration.
- Build on higher-level components like Popover, HoverCard, and Tooltip for common overlay patterns.

**Don't**

- Add nested LayerProvider instances: nested providers are ignored and add unnecessary tree depth.

## Files

- `upstream/Layer.doc.mjs`
- `upstream/LayerContext.ts`
- `upstream/LayerDepthContext.tsx`
- `upstream/LayerProvider.tsx`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Layer
