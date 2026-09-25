# Empty State

EmptyState shows a placeholder when a content area has no data. Use it for empty lists, zero search results, first-time setups, or cleared inboxes. Always include a title and a next step so the user is not stuck.

## Classification

- Category: `content` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/EmptyState.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: EmptyState shows a placeholder when a content area has no data.
- Avoid when: Leave an empty state without guidance; always explain what happened and what the user can do next. Use a generic message like "No data"; be specific about what is empty and why. Use an EmptyState for error messages that require immediate action; use a Banner instead.
- Provides: Icon, Title, Description, Actions
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: EmptyStateShowcase, EmptyStateActions, EmptyStateCompact, EmptyStateContainer
- Upstream: Astryx core · Content
- Keywords: emptystate, empty, placeholder, nodata, blank, noresults, illustration, blankslate

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

- `upstream/examples/EmptyStateShowcase.tsx` — Empty State: A no-results empty state with an icon, descriptive message, and a call-to-action button. · static: `static/EmptyStateShowcase.html`
- `upstream/examples/EmptyStateActions.tsx` — EmptyState — Actions: Full empty state with icon, message, and action buttons. Use when a search returns no results, a filter clears all items, or a list has been emptied. The buttons give the user a way forward: go back, clear filters, or try a different query. · static: `static/EmptyStateActions.html`
- `upstream/examples/EmptyStateCompact.tsx` — EmptyState — Compact: Smaller empty state with reduced spacing for constrained areas. Use inside sidebar panels, card widgets, or notification drawers where a full-size empty state would overwhelm the layout. · static: `static/EmptyStateCompact.html`
- `upstream/examples/EmptyStateContainer.tsx` — EmptyState — Container: Empty state wrapped in a Card for first-time setup or onboarding. Use when the user has not created any items yet, like a project list, team roster, or dashboard widget that will fill with data once they take action. · static: `static/EmptyStateContainer.html`

## Documentation

### Empty State

EmptyState shows a placeholder when a content area has no data. Use it for empty lists, zero search results, first-time setups, or cleared inboxes. Always include a title and a next step so the user is not stuck.

**Do**

- Include a clear title and a call-to-action button so users know how to proceed.
- Use an illustration or icon that reinforces the context of the empty state.
- Use the compact variant inside cards or sidebars where space is limited.

**Don't**

- Leave an empty state without guidance; always explain what happened and what the user can do next.
- Use a generic message like "No data"; be specific about what is empty and why.
- Use an EmptyState for error messages that require immediate action; use a Banner instead.

**Anatomy**

- Icon — A visual cue above the title that reinforces the context, like a search icon for no results.
- Title (required) — Primary message explaining what is empty: "No projects yet" not "No data".
- Description — Additional context explaining why it is empty or what the user can do.
- Actions — One or two buttons guiding the user to a next step, like "Create project" or "Clear filters".

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` * | `string` |  | Primary message rendered as an <h3> heading inside the empty state. |
| `description` | `string` |  | Optional secondary text providing additional context below the title. |
| `icon` | `ReactNode` |  | Optional icon or illustration displayed above the title; rendered as decorative (aria-hidden="true"). |
| `actions` | `ReactNode` |  | Optional action buttons displayed below the description, laid out horizontally by default and stacked vertically when isCompact is true. |
| `headingLevel` | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | `3` | Controls only the rendered HTML heading tag (h1-h6) so the title fits the document outline. This is a semantic change for accessibility and does not change the visual size of the title, which stays fixed regardless of level. |
| `isCompact` | `boolean` | `false` | Enables the compact variant with reduced spacing for constrained content areas. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value, not an inline style object like style={{}}. |

Styling hook class: `.astryx-empty-state`, `.astryx-empty-state-title`, `.astryx-empty-state-description`

### Empty State

EmptyState shows a placeholder when a content area has no data. Use it for empty lists, zero search results, first-time setups, or cleared inboxes. Always include a title and a next step so the user is not stuck.

**Do**

- Include a clear title and a call-to-action button so users know how to proceed.
- Use an illustration or icon that reinforces the context of the empty state.
- Use the compact variant inside cards or sidebars where space is limited.

**Don't**

- Leave an empty state without guidance; always explain what happened and what the user can do next.
- Use a generic message like "No data"; be specific about what is empty and why.
- Use an EmptyState for error messages that require immediate action; use a Banner instead.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` * | `string` |  | 在空状态内部渲染为 <h3> 标题的主要信息。 |
| `description` | `string` |  | 可选的辅助文本，在标题下方提供额外上下文。 |
| `icon` | `ReactNode` |  | 可选的图标或插图，显示在标题上方；渲染为装饰性元素（aria-hidden="true"）。 |
| `actions` | `ReactNode` |  | 可选的操作按钮，显示在描述下方，默认水平排列，isCompact 为 true 时垂直堆叠。 |
| `headingLevel` | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | `3` | 仅控制渲染的 HTML 标题标签（h1-h6），使标题适配文档大纲。这是用于无障碍的语义变化，不会改变标题的视觉大小，标题大小始终固定，与级别无关。 |
| `isCompact` | `boolean` | `false` | 启用紧凑变体，减少间距，适用于空间受限的内容区域。 |
| `xstyle` | `StyleXStyles` |  | 用于布局自定义（外边距、定位、尺寸）的 StyleX 样式。必须是 stylex.create() 的值，而非内联样式对象如 style={{}}。 |

Styling hook class: `.astryx-empty-state`, `.astryx-empty-state-title`, `.astryx-empty-state-description`

## Files

- `upstream/EmptyState.doc.mjs`
- `upstream/EmptyState.tsx`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/EmptyState
