# Filterable Table

Flat row collection built around progressive filtering: a token bar that escalates into full query syntax, saved views that persist a filter set, column and grouping options, and a resizable detail pane. Table, list, rows, records, grid, search, or filtered dataset.

## Classification

- Category: `page` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS snapshot
- Framework: react
- Entry point: `upstream/page.tsx`
- Nature: structural; reuse the page composition, hierarchy and density, not its sample data.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Flat row collection built around progressive filtering: a token bar that escalates into full query syntax, saved views that persist a filter set, column and grouping options, and a resizable detail pane.
- Provides: full-page layout composed from 36 Astryx components
- Requires: React 19 with `@astryxdesign/core` and a theme, or `static/page.html` with `ui/_sources/astryx/frame.css`
- Variants: default
- Upstream: Astryx template · Table - Filtering

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

## Components used

- AspectRatio
- Avatar
- Badge
- BottomSheet
- Button
- ComplexSelector
- Dialog
- Divider
- EmptyState
- Icon
- IconButton
- Item
- Layout
- Link
- List
- MetadataList
- MultiSelector
- OverflowList
- Popover
- PowerSearch
- ProgressBar
- RadioList
- Resizable
- Section
- Selector
- Skeleton
- Slider
- StatusDot
- TabList
- Table
- Text
- TextInput
- ToggleButton
- Token
- VisuallyHidden
- hooks

## Files

- `upstream/page.tsx`
- `upstream/template.doc.mjs`
- `static/page.html` — rendered markup
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/templates/table-filter
