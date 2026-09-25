# Searchable Table

Flat table of uniform rows under a block of record-level facts, narrowed three ways at once — a full-text search box, a scope toggle, and per-column popovers — with sortable and filterable columns, per-row hover detail, and totals derived from the visible rows that flag themselves as partial while a filter is on. The shape for one homogeneous list, not nested rows or groups with their own columns. Search, filter, sort, table, data table, flat rows, records, dataset, or totals.

## Classification

- Category: `page` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS snapshot
- Framework: react
- Entry point: `src/page.tsx`
- Nature: structural; reuse the page composition, hierarchy and density, not its sample data.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Flat table of uniform rows under a block of record-level facts, narrowed three ways at once — a full-text search box, a scope toggle, and per-column popovers — with sortable and filterable columns, per-row hover detail, and totals derived from the visible rows that flag themselves as partial while a filter is on.
- Provides: full-page layout composed from 13 Astryx components
- Requires: React 19 with `@astryxdesign/core` and a theme, or `static/page.html` with `ui/_sources/astryx/frame.css`
- Variants: default
- Upstream: Astryx template · Table - Basic

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

- Banner
- Button
- Divider
- EmptyState
- HoverCard
- Icon
- Layout
- MetadataList
- PowerSearch
- SegmentedControl
- Table
- Text
- TextInput

## Files

- `src/page.tsx`
- `src/template.doc.mjs`
- `static/page.html` — rendered markup
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/templates/table-page
