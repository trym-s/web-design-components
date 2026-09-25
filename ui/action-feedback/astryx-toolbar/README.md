# Toolbar

Toolbar is a horizontal bar with left, center, and right areas. Use it for contextual actions within a content area (above a table, inside a card, or in a panel), not as a page-level header. Set the size once on the toolbar and all buttons, inputs, and tabs inside it match automatically.

## Classification

- Category: `action-feedback` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/Toolbar.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Toolbar is a horizontal bar with left, center, and right areas.
- Avoid when: Put too many actions in one toolbar; move less common items into a MoreMenu. Set size on individual child buttons; set it once on the toolbar and it cascades automatically. Use Toolbar for app-wide navigation like main menu links or sign out; use TopNav or LayoutHeader for that.
- Provides: Outer chrome, Toolbar
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: ToolbarBulkActions, ToolbarCardHeader, ToolbarSizes, ToolbarTableFilter, ToolbarThreeSlot, ToolbarWithTabs
- Upstream: Astryx core · Action
- Keywords: toolbar, nav, bar, actions, buttonbar, header, footer, action-bar, control-bar

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

- `upstream/examples/ToolbarBulkActions.tsx` — Toolbar — Bulk Actions: A compact toolbar with the muted variant for showing bulk selection actions. Use when the user selects multiple items in a list or table and needs quick access to batch operations. · static: `static/ToolbarBulkActions.html`
- `upstream/examples/ToolbarCardHeader.tsx` — Toolbar — Card Header: A toolbar as a card header with a left-aligned title and icon actions on the right. Use Toolbar instead of LayoutHeader when your card header has interactive actions; Toolbar adds start/end slot layout, keyboard navigation, and automatic size cascading. If the header is just a title with no actions, a LayoutHeader or Section is enough. · static: `static/ToolbarCardHeader.html`
- `upstream/examples/ToolbarSizes.tsx` — Toolbar — Sizes: Small, medium, and large toolbars side by side. The size prop cascades to child buttons and inputs automatically. Use small in dense UIs like cards, medium for most cases, and large for spacious layouts. · static: `static/ToolbarSizes.html`
- `upstream/examples/ToolbarTableFilter.tsx` — Toolbar — Table Filter: Filter bar above a table: a search box leads the row, each field beside it is a closed trigger that doubles as its own filter chip — the bare field name unset, the whole clause once set — and the clauses fold from the end into a count as the row narrows, followed by a live result count, a clear all, and a column picker. Use to search, filter, and narrow flat rows of records such as jobs, orders, tickets, or users. · static: `static/ToolbarTableFilter.html`
- `upstream/examples/ToolbarThreeSlot.tsx` — Toolbar — Three Slot: A toolbar with start, center, and end content using the three-column grid layout. Use when you need a centered title or heading with navigation and actions on either side. · static: `static/ToolbarThreeSlot.html`
- `upstream/examples/ToolbarWithTabs.tsx` — Toolbar — Tab Navigation: A toolbar with tabs in the start slot and an action button at the end. Use as a card or section header when content is split into tabs with a primary action alongside. · static: `static/ToolbarWithTabs.html`

## Documentation

### Toolbar

Toolbar is a horizontal bar with left, center, and right areas. Use it for contextual actions within a content area (above a table, inside a card, or in a panel), not as a page-level header. Set the size once on the toolbar and all buttons, inputs, and tabs inside it match automatically.

**Do**

- Put secondary actions like "Back" on the left, and primary actions like "Save" on the right.
- Make temporary toolbars like bulk selection visually distinct so users can tell they're contextual, for example with a background color or border.
- Visually separate the toolbar from the content below it, with a divider, a background variant, or both.
- Use Toolbar as a card header when the header has interactive actions like filter or add; it gives you slot layout, keyboard navigation, and size cascading. If the header is just a title with no actions, a LayoutHeader or Section is enough.

**Don't**

- Put too many actions in one toolbar; move less common items into a MoreMenu.
- Set size on individual child buttons; set it once on the toolbar and it cascades automatically.
- Use Toolbar for app-wide navigation like main menu links or sign out; use TopNav or LayoutHeader for that.

**Anatomy**

- Outer chrome (required) — Section-owned container that supplies the toolbar surface, padding, and selected divider edges.
- Toolbar (required) — Named toolbar row that owns toolbar semantics and the start, optional center, and end layout.

Styling hook class: `.astryx-toolbar`

## Files

- `upstream/Toolbar.doc.mjs`
- `upstream/Toolbar.spec.md`
- `upstream/Toolbar.tsx`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Toolbar
