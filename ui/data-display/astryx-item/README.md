# Item

A single, flexible item primitive that unifies the "start content + label + description + end content" pattern across Astryx. Use it wherever you need a structured row: dropdown menus, selectors, contact lists, notifications, file browsers, and activity feeds.

## Classification

- Category: `data-display` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/Item.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: A single, flexible item primitive that unifies the "start content + label + description + end content" pattern across Astryx.
- Avoid when: Don't nest interactive elements (buttons, links) inside an interactive Item; it creates confusing focus and click targets. Don't use Item for navigation between views; use proper navigation components instead. Don't add read/unread or inbox-specific behavior directly; compose a thin wrapper like PreviewItem instead.
- Provides: Marker, Start content, Label, Description, End content
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: ItemShowcase, ItemBasicItem, ItemWithMedia, ItemWithMetadata
- Upstream: Astryx core · Table & List
- Keywords: item, list-item, media-object, row, cell, entity, contact, notification, preview

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

- `src/examples/ItemShowcase.tsx` — Item · static: `static/ItemShowcase.html`
- `src/examples/ItemBasicItem.tsx` — Item — Basic: A basic item with a label, supporting description, and end-aligned timestamp. Use this for simple rows that need consistent text alignment and spacing. · static: `static/ItemBasicItem.html`
- `src/examples/ItemWithMedia.tsx` — Item — Start Content: Items with leading avatars and icons in the startContent slot. Keep start content small so the row stays compact and easy to scan. · static: `static/ItemWithMedia.html`
- `src/examples/ItemWithMetadata.tsx` — Item — Metadata: Items with end-aligned metadata and badges. Use the endContent slot for counts, status, timestamps, and other secondary row information. · static: `static/ItemWithMetadata.html`

## Documentation

### Item

A single, flexible item primitive that unifies the "start content + label + description + end content" pattern across Astryx. Use it wherever you need a structured row: dropdown menus, selectors, contact lists, notifications, file browsers, and activity feeds.

**Do**

- Use named slots (startContent, label, description, endContent) for the common layout. These cover the 80% case.
- Use density="compact" for menus and dense lists, "balanced" for standard rows, and "spacious" for roomier layouts.
- Set labelLines and descriptionLines to control truncation when content length varies.
- Use align="start" when start or end content is taller than a single line of text.

**Don't**

- Don't nest interactive elements (buttons, links) inside an interactive Item; it creates confusing focus and click targets.
- Don't use Item for navigation between views; use proper navigation components instead.
- Don't add read/unread or inbox-specific behavior directly; compose a thin wrapper like PreviewItem instead.

**Anatomy**

- Marker — Optional list bullet/counter rendered before start content.
- Start content — Leading visual: avatar, icon, image, or checkbox.
- Label (required) — Primary text identifying the item.
- Description — Secondary supporting text below the label.
- End content — End-aligned content: badges, timestamps, or action buttons.

Styling hook class: `.astryx-item`

## Files

- `src/Item.doc.mjs`
- `src/Item.tsx`
- `src/ItemDescriptionContext.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Item
