# List

A vertical collection of items with consistent spacing, dividers, and optional markers. Supports headers, icons, avatars, badges, and interactive items with click or link behavior. Use it to display ordered or unordered groups of related content.

## Classification

- Category: `data-display` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/List.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: A vertical collection of items with consistent spacing, dividers, and optional markers.
- Avoid when: Place interactive elements inside an interactive list item; it creates nested click targets and confusing focus behavior. Use a list for a single item or for laying out unrelated content; lists imply a meaningful collection. Mix clickable and non-clickable items in the same list without clear visual distinction.
- Provides: List title, Description, List items, Item description
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: ListItemShowcase, ListShowcase, ListBasicList, ListBulletedFeatures, ListItemBasicItem, ListItemWithMedia, ListItemWithMetadata, ListMessageList, ListOrderedSteps
- Upstream: Astryx core · Table & List
- Keywords: list, listitem, listbox, menu, collection, items, ul, navlist

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

- `src/examples/ListItemShowcase.tsx` — List Item: List items with icons, descriptions, and end content slots demonstrating the full ListItem API. · static: `static/ListItemShowcase.html`
- `src/examples/ListShowcase.tsx` — List · static: `static/ListShowcase.html`
- `src/examples/ListBasicList.tsx` — List — Basic: Simple list with labels and descriptions for settings-style layouts. · static: `static/ListBasicList.html`
- `src/examples/ListBulletedFeatures.tsx` — List — Bulleted Features: Bulleted list of feature highlights using disc markers. · static: `static/ListBulletedFeatures.html`
- `src/examples/ListItemBasicItem.tsx` — List Item — Basic: Basic list items with labels and descriptions. Use this structure for settings, navigation summaries, and other simple collections. · static: `static/ListItemBasicItem.html`
- `src/examples/ListItemWithMedia.tsx` — List Item — Media: List items with leading avatars and icons. Use startContent for compact visual identifiers that help users scan the collection. · static: `static/ListItemWithMedia.html`
- `src/examples/ListItemWithMetadata.tsx` — List Item — Metadata: List items with end-aligned metadata. Use endContent for badges, counts, timestamps, and compact status details. · static: `static/ListItemWithMetadata.html`
- `src/examples/ListMessageList.tsx` — List — Message List: Chat-style message list with avatars, preview text, and unread badges. · static: `static/ListMessageList.html`
- `src/examples/ListOrderedSteps.tsx` — List — Ordered Steps: Numbered step-by-step instructions using decimal list markers. · static: `static/ListOrderedSteps.html`

## Documentation

### List

A vertical collection of items with consistent spacing, dividers, and optional markers. Supports headers, icons, avatars, badges, and interactive items with click or link behavior. Use it to display ordered or unordered groups of related content.

**Do**

- Provide a header to label the list and give context to screen readers.
- Use start and end content slots to add icons, avatars, or badges to each item.

**Don't**

- Place interactive elements inside an interactive list item; it creates nested click targets and confusing focus behavior.
- Use a list for a single item or for laying out unrelated content; lists imply a meaningful collection.
- Mix clickable and non-clickable items in the same list without clear visual distinction.

**Anatomy**

- List title (required) — Heading that labels the list.
- Description — Supplementary text below the title.
- List items (required) — Individual entries, which may include icons or images.
- Item description — Additional detail for an individual list item.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` |  | List items (ListItem components). |
| `density` | `'compact' \| 'balanced' \| 'spacious'` | `'balanced'` | Spacing density for items. |
| `hasDividers` | `boolean` | `false` | Show dividers between items. |
| `header` | `ReactNode` |  | Header content, associated with the list via aria-labelledby. |
| `listStyle` | `'none' \| 'disc' \| 'decimal' \| 'circle'` | `'none'` | List marker style. 'decimal' renders an <ol> element instead of <ul>. |
| `start` | `number` | `1` | Starting number for ordered lists (listStyle='decimal'). Sets the CSS counter to begin at this value. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value: not an inline style object like style={{}}. |

Styling hook class: `.astryx-list`, `.astryx-list-item`

### List Item

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `string` |  | Primary text. |
| `description` | `ReactNode` |  | Secondary content below the label. A plain string gets single-line truncation automatically; a ReactNode lets child components control their own wrapping and line-clamp behavior. |
| `startContent` | `ReactNode` |  | Content rendered before the label area (e.g. icon, avatar). |
| `endContent` | `ReactNode` |  | Content rendered after the label area (e.g. badge, chevron). |
| `onClick` | `(e: MouseEvent) => void` |  | Click handler; enables the invisible button pattern. |
| `interactiveRef` | `RefObject<HTMLElement \| null>` |  | Ref to a nested control (e.g. a checkbox in startContent) that owns the item's keyboard access and action. The row becomes an enlarged click/tap target that delegates surface clicks to it (useClickableContainer) and renders no invisible button/anchor, so the row adds no second tab stop (WCAG 4.1.2). Mutually exclusive with onClick/href; those are ignored when set. |
| `href` | `string` |  | Link URL; enables the invisible anchor pattern. The destination follows the shared navigation rule described on the Link `href` prop. |
| `target` | `string` |  | Link target attribute, only applicable when href is provided. target="_blank" automatically adds noopener noreferrer. |
| `rel` | `string` |  | Link relationship tokens. noopener noreferrer are merged automatically for target="_blank". |
| `isDisabled` | `boolean` | `false` | Disabled state; sets aria-disabled on the item. |
| `isSelected` | `boolean` | `false` | Selected state; sets aria-selected on the item. |

### List Item

### List Item

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `string` |  | 主要文本。 |
| `description` | `ReactNode` |  | 标签下方的次要内容。纯字符串会自动应用单行截断；ReactNode 允许子组件自行控制换行和多行截断行为。 |
| `startContent` | `ReactNode` |  | 在标签区域之前渲染的内容（如图标、头像）。 |
| `endContent` | `ReactNode` |  | 在标签区域之后渲染的内容（如徽章、箭头）。 |
| `onClick` | `(e: MouseEvent) => void` |  | 点击处理函数；启用隐形按钮模式。 |
| `interactiveRef` | `RefObject<HTMLElement \| null>` |  | 指向嵌套控件（如 startContent 中的复选框）的 ref，该控件承载项目的键盘访问和操作。行成为更大的点击/触摸目标，将表面点击委托给该控件（useClickableContainer），且不渲染不可见按钮/锚点，因此行不会增加第二个 Tab 停留点（WCAG 4.1.2）。与 onClick/href 互斥——设置后二者将被忽略。 |
| `href` | `string` |  | 链接 URL；启用隐形锚点模式。 |
| `target` | `string` |  | 链接 target 属性，仅在提供 href 时适用。target="_blank" 会自动添加 noopener noreferrer。 |
| `rel` | `string` |  | 链接关系标记。target="_blank" 会自动合并 noopener noreferrer。 |
| `isDisabled` | `boolean` | `false` | 禁用状态；在项目上设置 aria-disabled。 |
| `isSelected` | `boolean` | `false` | 选中状态；在项目上设置 aria-selected。 |

## Files

- `src/List.doc.mjs`
- `src/List.spec.md`
- `src/List.tsx`
- `src/ListContext.tsx`
- `src/ListItem.doc.mjs`
- `src/ListItem.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/List
