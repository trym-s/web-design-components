# Canvas Editor

Layered artboard workspace: document tabs over a layer rail, a fixed-size frame you zoom on a muted backdrop, and an inspector of position, type, and filter fields that retargets to the selected layer. Objects hold a coordinate rather than reflowing, so moving one never moves another. Design tool, artboard, poster, graphic, image, or slide editor.

## Classification

- Category: `page` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS snapshot
- Framework: react
- Entry point: `src/page.tsx`
- Nature: structural; reuse the page composition, hierarchy and density, not its sample data.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Layered artboard workspace: document tabs over a layer rail, a fixed-size frame you zoom on a muted backdrop, and an inspector of position, type, and filter fields that retargets to the selected layer.
- Provides: full-page layout composed from 25 Astryx components
- Requires: React 19 with `@astryxdesign/core` and a theme, or `static/page.html` with `ui/_sources/astryx/frame.css`
- Variants: default
- Upstream: Astryx template · Tools - Canvas Editor

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

## Components used

- AspectRatio
- Card
- Center
- Divider
- DropdownMenu
- Icon
- IconButton
- Item
- Layout
- List
- NumberInput
- Popover
- Resizable
- Section
- SegmentedControl
- Selector
- Slider
- Text
- TextArea
- TextInput
- Thumbnail
- Toolbar
- TreeList
- hooks
- theme

## Files

- `src/page.tsx`
- `src/template.doc.mjs`
- `static/page.html` — rendered markup
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/templates/canvas-editor
