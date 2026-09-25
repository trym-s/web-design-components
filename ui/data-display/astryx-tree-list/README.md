# Tree List

An expandable tree structure for displaying hierarchical data with branch connector lines. Use it for file explorers, nested category browsers, or any interface that visualizes parent-child relationships.

## Classification

- Category: `data-display` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/TreeList.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: An expandable tree structure for displaying hierarchical data with branch connector lines.
- Avoid when: Nest more than 4–5 levels deep; flatten the structure or use a different pattern. Use a tree for flat, non-hierarchical data; use a List instead.
- Provides: Tree list, Header, Item, Chevron, Chevron glyph, Item label, Item description, Start content, End content, Guide
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: TreeListShowcase, TreeListFileTreeWithIcons, TreeListInteractiveSettings, TreeListMailboxTree, TreeListNavigationTree, TreeListVariants
- Upstream: Astryx core · Table & List
- Keywords: tree, hierarchy, nested, accordion, folder, expand, collapse, treeview, outline

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

- `upstream/examples/TreeListShowcase.tsx` — Tree List · static: `static/TreeListShowcase.html`
- `upstream/examples/TreeListFileTreeWithIcons.tsx` — TreeList — File Tree With Icons: File browser tree with folder and document icons distinguishing directories from files. · static: `static/TreeListFileTreeWithIcons.html`
- `upstream/examples/TreeListInteractiveSettings.tsx` — TreeList — Interactive Settings: Settings tree with clickable items and a documentation link. · static: `static/TreeListInteractiveSettings.html`
- `upstream/examples/TreeListMailboxTree.tsx` — TreeList — Mailbox Tree: Email folder tree with unread badge counts. · static: `static/TreeListMailboxTree.html`
- `upstream/examples/TreeListNavigationTree.tsx` — TreeList — Navigation Tree: Navigation tree with a selected item for the current page. · static: `static/TreeListNavigationTree.html`
- `upstream/examples/TreeListVariants.tsx` — Tree List — Variants: The `variant` prop controls whether hierarchy guide lines are shown: `lineGuides` (default) draws connector lines between parent and child rows, while `noGuides` relies on indentation alone. It is orthogonal to `density`, which controls spacing. · static: `static/TreeListVariants.html`

## Documentation

### Tree List

An expandable tree structure for displaying hierarchical data with branch connector lines. Use it for file explorers, nested category browsers, or any interface that visualizes parent-child relationships.

**Do**

- Provide meaningful labels and icons for each node to make the hierarchy easy to scan.
- Pre-expand important branches so users see key content immediately.
- Leaf rows reserve space for a chevron column whenever the tree has any expandable item to line up under; only a fully flat tree (no expandable items at all) renders its rows flush. Rely on this rather than nudging indentation with custom CSS.

**Don't**

- Nest more than 4–5 levels deep; flatten the structure or use a different pattern.
- Use a tree for flat, non-hierarchical data; use a List instead.

**Anatomy**

- Tree list (required) — Container that presents the hierarchical tree.
- Header — Caller-provided content that visibly names the tree.
- Item (required) — Painted row for one node in the hierarchy.
- Chevron — Expand and collapse control rendered for an Item with children.
- Chevron glyph — Directional symbol rendered by Icon inside a Chevron.
- Item label (required) — Primary content that identifies an Item.
- Item description — Secondary text rendered below an Item label.
- Start content — Caller-provided content rendered before an Item label.
- End content — Caller-provided content rendered after an Item label.
- Guide — Connector line that shows parent-child relationships.

**Theming variables**

- `--tree-list-indent` — Per-level indentation step. Each nesting level indents its rows by this distance, and the guide lines follow it so they stay aligned. Set it on the `tree-list` target to retune the metric (e.g. `var(--spacing-5)` for a wider indent). (default `var(--spacing-4)`)
- `--tree-list-row-gap` — Vertical gap between adjacent rows. Default `2px` (var(--spacing-0-5)) gives a subtle separation; set it on the `tree-list` target to widen or close the gap. The connector guides span the gap automatically (the line stays continuous) and do not overhang the last row, so no guide-height tuning is needed. (default `var(--spacing-0-5)`)

Styling hook class: `.astryx-tree-list`, `.astryx-tree-list-item`, `.astryx-tree-list-chevron`, `.astryx-tree-list-item-label`, `.astryx-tree-list-guide`

### Tree List

An expandable tree structure for displaying hierarchical data with branch connector lines. Use it for file explorers, nested category browsers, or any interface that visualizes parent-child relationships.

**Do**

- Provide meaningful labels and icons for each node to make the hierarchy easy to scan.
- Pre-expand important branches so users see key content immediately.
- Leaf rows reserve space for a chevron column whenever the tree has any expandable item to line up under; only a fully flat tree (no expandable items at all) renders its rows flush. Rely on this rather than nudging indentation with custom CSS.

**Don't**

- Nest more than 4–5 levels deep; flatten the structure or use a different pattern.
- Use a tree for flat, non-hierarchical data; use a List instead.

**Anatomy**

- Tree list (required) — Container that presents the hierarchical tree.
- Header — Caller-provided content that visibly names the tree.
- Item (required) — Painted row for one node in the hierarchy.
- Chevron — Expand and collapse control rendered for an Item with children.
- Chevron glyph — Directional symbol rendered by Icon inside a Chevron.
- Item label (required) — Primary content that identifies an Item.
- Item description — Secondary text rendered below an Item label.
- Start content — Caller-provided content rendered before an Item label.
- End content — Caller-provided content rendered after an Item label.
- Guide — Connector line that shows parent-child relationships.

**Theming variables**

- `--tree-list-indent` — 每级缩进步长。每个嵌套层级的行按此距离缩进，引导线随之对齐。在 `tree-list` 目标上设置以调整该度量（例如用 `var(--spacing-5)` 获得更宽的缩进）。 (default `var(--spacing-4)`)
- `--tree-list-row-gap` — 相邻行之间的垂直间距。默认 `2px`（var(--spacing-0-5)）提供细微的分隔；在 `tree-list` 目标上设置以加宽或关闭间距。连接引导线会自动跨越该间距（线保持连续）且不会超出最后一行，因此无需调整引导线高度。 (default `var(--spacing-0-5)`)

Styling hook class: `.astryx-tree-list`, `.astryx-tree-list-item`, `.astryx-tree-list-chevron`, `.astryx-tree-list-item-label`, `.astryx-tree-list-guide`

## Files

- `upstream/TreeList.doc.mjs`
- `upstream/TreeList.spec.md`
- `upstream/TreeList.tsx`
- `upstream/TreeListBranches.tsx`
- `upstream/TreeListItem.tsx`
- `upstream/TreeListTypes.ts`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/TreeList
