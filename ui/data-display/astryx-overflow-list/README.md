# Overflow List

A horizontal list that automatically hides items when they exceed the available width. Use OverflowList for breadcrumbs, toolbars, tag lists, or any row that needs to collapse gracefully at smaller sizes.

## Classification

- Category: `data-display` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/OverflowList.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: A horizontal list that automatically hides items when they exceed the available width.
- Avoid when: Use OverflowList for a vertical stack; horizontal multi-row wrap is supported via maxRows, but items still flow left-to-right, not top-to-bottom.
- Provides: List, Items, Overflow indicator
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: OverflowListShowcase, OverflowListCappedToolbar, OverflowListCollapseFromStartList, OverflowListMultiRowTags, OverflowListOverflowBadges, OverflowListOverflowDropdownActions
- Upstream: Astryx core · Table & List
- Keywords: overflow, truncate, collapse, breadcrumb, toolbar, tag-list, pill-list, more, clamp, responsive

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

- `upstream/examples/OverflowListShowcase.tsx` — Overflow List: A list of buttons that collapses overflowing items into a +N indicator. · static: `static/OverflowListShowcase.html`
- `upstream/examples/OverflowListCappedToolbar.tsx` — OverflowList — Capped Toolbar: maxVisibleItems caps the row at three actions even when more would fit; the rest move to a dropdown · static: `static/OverflowListCappedToolbar.html`
- `upstream/examples/OverflowListCollapseFromStartList.tsx` — OverflowList — Collapse From Start: Overflow list that hides items from the start, keeping the latest visible · static: `static/OverflowListCollapseFromStartList.html`
- `upstream/examples/OverflowListMultiRowTags.tsx` — OverflowList — Multi-row Tags: Tags wrap onto up to two rows with maxRows, then collapse the rest into a count badge · static: `static/OverflowListMultiRowTags.html`
- `upstream/examples/OverflowListOverflowBadges.tsx` — OverflowList — Badge Tags: Resizable row of badges that collapses into a count badge on overflow · static: `static/OverflowListOverflowBadges.html`
- `upstream/examples/OverflowListOverflowDropdownActions.tsx` — OverflowList — Dropdown Actions: Action toolbar that collapses overflow buttons into a dropdown menu · static: `static/OverflowListOverflowDropdownActions.html`

## Documentation

### Overflow List

A horizontal list that automatically hides items when they exceed the available width. Use OverflowList for breadcrumbs, toolbars, tag lists, or any row that needs to collapse gracefully at smaller sizes.

**Do**

- Provide a meaningful overflowRenderer: a "+N more" badge, a dropdown, or a count indicator.
- When the row already has its own menu, use onOverflowChange to feed the collapsed items into it instead of adding a second anchor with overflowRenderer.
- Set minVisibleItems to keep key items visible, and maxVisibleItems to cap the row at a fixed count regardless of available width.
- Use maxRows to let items wrap onto a bounded number of rows (e.g. a two-row tag cloud) before collapsing the rest into the indicator.

**Don't**

- Use OverflowList for a vertical stack; horizontal multi-row wrap is supported via maxRows, but items still flow left-to-right, not top-to-bottom.

**Anatomy**

- List (required) — Visible horizontal list container for the currently shown content.
- Items (required) — Caller-supplied items selected for visible display by the current width and count limits.
- Overflow indicator — Optional caller-rendered indicator for items collapsed by width or count limits.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` * | `ReactNode` |  | Items to render. Each child should be a single element. |
| `overflowRenderer` | `(overflowItems: OverflowItem[]) => ReactNode` |  | Render function for the overflow indicator. Receives the list of hidden items (each with child and index). Only called when items are overflowing. |
| `onOverflowChange` | `(overflowItems: OverflowItem[]) => void` |  | Called whenever the collapsed set changes: with the collapsed items once something collapses, and with an empty array once the row widens back out. Membership and order changes report even when the count stays the same; unrelated re-renders and callback identity changes do not. Silent while nothing overflows, including on mount. Use stable React keys for dynamic items. |
| `gap` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` | `2` | Gap between items as a spacing token step (0, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 8, 10). |
| `minVisibleItems` | `number` | `0` | Minimum number of items to always show, even when overflowing. |
| `maxVisibleItems` | `number` | `undefined (no cap)` | Maximum number of items to ever show, even when they all fit. The ceiling partner to minVisibleItems; extra items collapse into the overflow indicator. If less than minVisibleItems, the floor wins. |
| `maxRows` | `number` | `undefined (single line)` | Wrap items across up to this many rows before collapsing the rest into the overflow indicator. A number, not a boolean. Leave undefined (or set 1) for single-line behavior. Assumes uniform row height. |
| `collapseFrom` | `'start' \| 'end'` | `'end'` | Which end to collapse items from when overflow occurs. |
| `behavior` | `'observeSelf' \| 'observeParent'` | `'observeSelf'` | Controls which element is measured for available width. 'observeSelf' uses the container's own width. 'observeParent' observes the parent element, useful when the list should stay content-sized while still detecting available space. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value, not an inline style object. |

Styling hook class: `.astryx-overflow-list`

### Overflow List

A horizontal list that automatically hides items when they exceed the available width. Use OverflowList for breadcrumbs, toolbars, tag lists, or any row that needs to collapse gracefully at smaller sizes.

**Do**

- Provide a meaningful overflowRenderer: a "+N more" badge, a dropdown, or a count indicator.
- When the row already has its own menu, use onOverflowChange to feed the collapsed items into it instead of adding a second anchor with overflowRenderer.
- Set minVisibleItems to keep key items visible, and maxVisibleItems to cap the row at a fixed count regardless of available width.
- Use maxRows to let items wrap onto a bounded number of rows (e.g. a two-row tag cloud) before collapsing the rest into the indicator.

**Don't**

- Use OverflowList for a vertical stack; horizontal multi-row wrap is supported via maxRows, but items still flow left-to-right, not top-to-bottom.

**Anatomy**

- List (required) — Visible horizontal list container for the currently shown content.
- Items (required) — Caller-supplied items selected for visible display by the current width and count limits.
- Overflow indicator — Optional caller-rendered indicator for items collapsed by width or count limits.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` * | `ReactNode` |  | 要渲染的项目，每个子元素应为单一元素。 |
| `overflowRenderer` | `(overflowItems: OverflowItem[]) => ReactNode` |  | 溢出指示器的渲染函数。接收隐藏项目列表（每项包含 child 和 index）。仅在有溢出项时调用。 |
| `onOverflowChange` | `(overflowItems: OverflowItem[]) => void` |  | 折叠项集合变化时调用：发生折叠时传入折叠项，行重新变宽、全部放得下时传入空数组。没有溢出时（包括挂载时）不会调用。用于将折叠项交给周围界面已有的菜单，避免列表再挂载一个自己的指示器。 |
| `gap` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` | `2` | 项目间距，使用间距步进值（0、0.5、1、1.5、2、3、4、5、6、8、10）。 |
| `minVisibleItems` | `number` | `0` | 溢出时始终显示的最小项目数。 |
| `maxVisibleItems` | `number` | `undefined（无上限）` | 始终显示的最大项目数（即使全部都能放下）。它是 minVisibleItems 的上限伙伴；多余项目会折叠进溢出指示器。若小于 minVisibleItems，则以下限为准。 |
| `maxRows` | `number` | `undefined（单行）` | 在将其余项目折叠进溢出指示器之前，允许项目换行到的最大行数。是数字而非布尔值。留空（或设为 1）表示单行。假定行高一致。 |
| `collapseFrom` | `'start' \| 'end'` | `'end'` | 溢出时从哪一端开始折叠项目。 |
| `behavior` | `'observeSelf' \| 'observeParent'` | `'observeSelf'` | 控制测量可用宽度的元素。'observeSelf' 使用容器自身宽度；'observeParent' 观察父元素，适用于需要内容尺寸但仍检测可用空间的场景。 |
| `xstyle` | `StyleXStyles` |  | 用于布局自定义的 StyleX 样式（外边距、定位、尺寸）。必须使用 stylex.create() 的值，而非内联样式对象。 |

## Files

- `upstream/OverflowList.doc.mjs`
- `upstream/OverflowList.spec.md`
- `upstream/OverflowList.tsx`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/OverflowList
