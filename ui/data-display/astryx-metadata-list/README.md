# Metadata List

MetadataList displays key-value pairs for object attributes like quality, condition, and status, in a structured layout. Use it for detail panels, settings summaries, and record information.

## Classification

- Category: `data-display` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/MetadataList.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: MetadataList displays key-value pairs for object attributes like quality, condition, and status, in a structured layout.
- Avoid when: Use for extensive form input; use a form layout instead. Use for data that doesn't have a clear key-value structure.
- Provides: Title, Label, Metadata, Disclosure
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: MetadataListItemShowcase, MetadataListShowcase, MetadataListBasicMetadata, MetadataListCollapsibleMetadata, MetadataListHorizontalMetadata, MetadataListItemBasic, MetadataListMultiColumnMetadata
- Upstream: Astryx core · Table & List
- Keywords: metadata, description, definition, keyvalue, properties, details, attributes, summary

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

- `src/examples/MetadataListItemShowcase.tsx` — Metadata List Item: Metadata list items displaying labeled values in various formats including text, badges, and links. · static: `static/MetadataListItemShowcase.html`
- `src/examples/MetadataListShowcase.tsx` — Metadata List · static: `static/MetadataListShowcase.html`
- `src/examples/MetadataListBasicMetadata.tsx` — MetadataList — Basic: Single-column key-value metadata list. · static: `static/MetadataListBasicMetadata.html`
- `src/examples/MetadataListCollapsibleMetadata.tsx` — MetadataList — Collapsible: Metadata list with a show-more toggle after a set number of items. · static: `static/MetadataListCollapsibleMetadata.html`
- `src/examples/MetadataListHorizontalMetadata.tsx` — MetadataList — Horizontal: Horizontal metadata items for compact inline display. · static: `static/MetadataListHorizontalMetadata.html`
- `src/examples/MetadataListItemBasic.tsx` — MetadataListItem — Basic: Labeled key-value rows inside a MetadataList. Values accept any content, from plain text to components like Badge. · static: `static/MetadataListItemBasic.html`
- `src/examples/MetadataListMultiColumnMetadata.tsx` — MetadataList — Multi-Column: Multi-column metadata grid with token tags. · static: `static/MetadataListMultiColumnMetadata.html`

## Documentation

### Metadata List

MetadataList displays key-value pairs for object attributes like quality, condition, and status, in a structured layout. Use it for detail panels, settings summaries, and record information.

**Do**

- Choose label position based on content: "start" for short values, "top" for long or complex values.
- Collapse long lists with `maxNumOfItems` to keep the page scannable.

**Don't**

- Use for extensive form input; use a form layout instead.
- Use for data that doesn't have a clear key-value structure.

**Anatomy**

- Title — Optional title for the metadata list.
- Label (required) — The key label for each metadata entry.
- Metadata (required) — The value displayed in various formats.
- Disclosure — Collapse/expand control for the list.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` * | `ReactNode` |  | Metadata items (MetadataListItem components). |
| `columns` | `'multi' \| 'single' \| number` | `'single'` | Column layout mode. |
| `label` | `{ position?: 'start' \| 'top', width?: number \| string }` | `{ position: 'start' } (single-column) / { position: 'top' } (multi-column)` | Label display configuration. position controls label placement, width sets a custom label column width. Defaults to { position: 'top' } for multi-column layouts. |
| `maxNumOfItems` | `number` |  | Maximum items to show before collapsing with a show more/less toggle. |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout orientation. Horizontal mode flows items in a row with flex-wrap. |
| `title` | `ReactNode` |  | Optional title or heading above the list. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization. Must be a stylex.create() value. |

Styling hook class: `.astryx-metadata-list`, `.astryx-metadata-list-item`

### Metadata List Item

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` * | `ReactNode` |  | Content value for this metadata item. |
| `label` * | `string` |  | Label text for this metadata item. |
| `icon` | `ReactNode` |  | Icon rendered before the label text. |

### Metadata List Item

### Metadata List Item

## Files

- `src/MetadataList.doc.mjs`
- `src/MetadataList.tsx`
- `src/MetadataListContext.tsx`
- `src/MetadataListItem.doc.mjs`
- `src/MetadataListItem.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/MetadataList
