# Layout

Layout is a general five-slot primitive for arranging header, start, content, end, and footer regions within a page or bounded container. AppShell owns the page shell and app-wide navigation behavior; use HStack or VStack for simple directional stacking.

## Classification

- Category: `layout` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/Layout.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Layout is a general five-slot primitive for arranging header, start, content, end, and footer regions within a page or bounded container.
- Avoid when: Use Layout for simple stacking layouts; use HStack or VStack instead. Use Layout as the page shell or for app-wide navigation; use AppShell for that responsibility.
- Provides: Layout container, Header, Panel, Content area, Footer
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: LayoutContentShowcase, LayoutFooterShowcase, LayoutHeaderShowcase, LayoutPanelShowcase, LayoutShowcase, LayoutBasicCardLayout, LayoutContentBasic, LayoutContentOnlyLayout, LayoutContentWidth, LayoutDualPanelLayout, LayoutFooterActions, LayoutFullBleedContent, LayoutHeaderWithActions, LayoutPanelNavigation, LayoutSidebarLayout
- Upstream: Astryx core · Layout
- Keywords: layout, container, content, flex, box, wrapper, page, regions

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

- `src/examples/LayoutContentShowcase.tsx` — Layout Content: LayoutContent is the scrollable main content area within a Layout, providing automatic padding and scroll containment between the header and footer. · static: `static/LayoutContentShowcase.html`
- `src/examples/LayoutFooterShowcase.tsx` — Layout Footer: LayoutFooter is a fixed footer slot within a Layout, pinned to the bottom for persistent actions like form buttons or navigation. · static: `static/LayoutFooterShowcase.html`
- `src/examples/LayoutHeaderShowcase.tsx` — Layout Header: LayoutHeader is a fixed header slot within a Layout, pinned to the top for titles, navigation, and action buttons. · static: `static/LayoutHeaderShowcase.html`
- `src/examples/LayoutPanelShowcase.tsx` — Layout Panel: LayoutPanel is a sidebar slot within a Layout, used for navigation, detail views, or secondary content alongside the main content area. · static: `static/LayoutPanelShowcase.html`
- `src/examples/LayoutShowcase.tsx` — Layout · static: `static/LayoutShowcase.html`
- `src/examples/LayoutBasicCardLayout.tsx` — Layout — Basic Card: A card layout with header, scrollable content area, and footer with action buttons. · static: `static/LayoutBasicCardLayout.html`
- `src/examples/LayoutContentBasic.tsx` — LayoutContent — Basic: A scrollable main content area below a fixed header. Use LayoutContent inside Layout to get automatic padding and scroll containment for the primary content. · static: `static/LayoutContentBasic.html`
- `src/examples/LayoutContentOnlyLayout.tsx` — Layout — Content Only: A minimal layout with just a content area inside a card, without header or footer. · static: `static/LayoutContentOnlyLayout.html`
- `src/examples/LayoutContentWidth.tsx` — Layout — Content Width: A layout using contentWidth to constrain and center content while keeping dividers full-bleed. · static: `static/LayoutContentWidth.html`
- `src/examples/LayoutDualPanelLayout.tsx` — Layout — Dual Panel: A file browser style layout with start panel for folders, main content for files, and end panel for details. · static: `static/LayoutDualPanelLayout.html`
- `src/examples/LayoutFooterActions.tsx` — LayoutFooter — Actions: A fixed footer with end-aligned action buttons below scrollable content. Use LayoutFooter inside Layout for persistent actions like Save and Cancel. · static: `static/LayoutFooterActions.html`
- `src/examples/LayoutFullBleedContent.tsx` — Layout — Full Bleed Content: A layout where content extends edge-to-edge with zero padding, ideal for tables or images. · static: `static/LayoutFullBleedContent.html`
- `src/examples/LayoutHeaderWithActions.tsx` — LayoutHeader — With Actions: A fixed page header with a title and a primary action, above scrollable content. Use LayoutHeader inside Layout for persistent page-level headers. · static: `static/LayoutHeaderWithActions.html`
- `src/examples/LayoutPanelNavigation.tsx` — LayoutPanel — Navigation: A fixed-width side panel holding a navigation list next to the main content. Use LayoutPanel in the start or end slot of Layout for sidebars. · static: `static/LayoutPanelNavigation.html`
- `src/examples/LayoutSidebarLayout.tsx` — Layout — Sidebar Navigation: A settings page layout with a navigation sidebar panel, content area, header, and footer. · static: `static/LayoutSidebarLayout.html`

## Documentation

### Layout

Layout is a general five-slot primitive for arranging header, start, content, end, and footer regions within a page or bounded container. AppShell owns the page shell and app-wide navigation behavior; use HStack or VStack for simple directional stacking.

**Do**

- Use Layout when content needs named header, start, content, end, or footer regions.
- Use HStack and VStack for simple directional stacking within a content area.

**Don't**

- Use Layout for simple stacking layouts; use HStack or VStack instead.
- Use Layout as the page shell or for app-wide navigation; use AppShell for that responsibility.

**Anatomy**

- Layout container (required) — General layout primitive that places the header, start, content, end, and footer slots.
- Header — Optional LayoutHeader region supplied by the caller, typically in the header slot.
- Panel — Optional LayoutPanel region supplied by the caller in the start or end slot.
- Content area — Optional LayoutContent region supplied by the caller in the content slot.
- Footer — Optional LayoutFooter region supplied by the caller, typically in the footer slot.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `content` | `ReactNode` |  | Content slot (center). Accepts any ReactNode; use LayoutContent when a content region is needed. Children passed to `<Layout>` render here too: `<Layout>{main}</Layout>` is shorthand for `<Layout content={main} />`. |
| `header` | `ReactNode` |  | Header slot. Accepts any ReactNode; use LayoutHeader when a header region is needed. |
| `footer` | `ReactNode` |  | Footer slot. Accepts any ReactNode; use LayoutFooter when a footer region is needed. |
| `start` | `ReactNode` |  | Logical-start slot (left in LTR). Accepts any ReactNode; use LayoutPanel when a panel region is needed. |
| `end` | `ReactNode` |  | Logical-end slot (right in LTR). Accepts any ReactNode; use LayoutPanel when a panel region is needed. |
| `height` | `'fill' \| 'auto'` | `'fill'` | Height behavior: fill the container or grow with content. |
| `contentWidth` | `SizeValue` |  | Maximum width of the aligned content within each slot (header, content, footer, panels), centered when narrower than the available space. Without panels, LayoutContent spans the available width so its scrollbar stays at the outer edge while its children align internally to contentWidth. With exactly one panel, the panel stays aligned to the contentWidth frame while LayoutContent extends to the opposite open edge. With both panels, contentWidth includes the complete middle composition. Percentage widths—including percentage-bearing calc(), min(), max(), and clamp() values—and intrinsic widths, plus bare var(...) values, retain the constrained composition; use calc(var(...)) for a variable guaranteed to resolve to a length. Dividers stay full-bleed. Numbers are treated as pixels, strings are used as-is (e.g. `60ch`). Common page widths: 640 for forms, settings, and text-focused pages; 960 for content pages and wider layouts. |
| `padding` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` |  | Padding at the layout's outer edges using the spacing scale. |
| `defaultHasDividers` | `boolean` |  | Default divider visibility for LayoutHeader and LayoutFooter children. Headers and footers that don't pass `hasDivider` use this value; when unset, nested layouts inherit from their parent context. |

Styling hook class: `.astryx-layout`, `.astryx-layout-content`, `.astryx-layout-footer`, `.astryx-layout-header`, `.astryx-layout-panel`

### Layout Content

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` |  | Content. |
| `padding` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` |  | Internal padding using the spacing scale. Overrides the default padding from the layout container. |
| `isScrollable` | `boolean` | `true` | Enable scrollable overflow. With arithmetic contentWidth values, the scrollport spans through every open side while context-aware insets keep children aligned. |
| `label` | `string` |  | Accessible label for the landmark element. |
| `role` | `AriaRole` |  | ARIA landmark role. |

### Layout Content

### Layout Content

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` |  | 内容。 |
| `padding` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` |  | 使用间距比例的内边距。覆盖布局容器的默认内边距。 |
| `isScrollable` | `boolean` | `true` | 启用可滚动溢出。设置可参与算术计算的 contentWidth 时，滚动区域会延伸到所有未被面板占用的边缘，同时根据上下文调整内边距以保持子内容对齐。 |
| `label` | `string` |  | 地标元素的无障碍标签。 |
| `role` | `AriaRole` |  | ARIA 地标角色。 |

### Layout Footer

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` |  | Footer content. |
| `hasDivider` | `boolean` | `false` | Border at top edge. |
| `height` | `SizeValue` |  | Footer height. Numbers are treated as pixels, strings are used as-is. |
| `label` | `string` |  | Accessible label for the landmark element. |
| `role` | `AriaRole` |  | ARIA landmark role. |

### Layout Footer

### Layout Footer

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` |  | 页脚内容。 |
| `hasDivider` | `boolean` | `false` | 顶部边缘的边框。 |
| `height` | `SizeValue` |  | 页脚高度。数字类型会被解释为像素值，字符串类型按原样使用。 |
| `label` | `string` |  | 地标元素的无障碍标签。 |
| `role` | `AriaRole` |  | ARIA 地标角色。 |

### Layout Header

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` |  | Header content. |
| `hasDivider` | `boolean` | `false` | Border at bottom edge. |
| `height` | `SizeValue` |  | Header height. Numbers are treated as pixels, strings are used as-is. |
| `label` | `string` |  | Accessible label for the landmark element. |
| `paddingBlockEnd` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` |  | Block-end (bottom) padding, using the spacing scale. Overrides padding on that edge only; paddingBlockEnd={0} docks the last child on the header bottom edge. |
| `role` | `AriaRole` |  | ARIA landmark role. |

### Layout Header

### Layout Header

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` |  | 页眉内容。 |
| `hasDivider` | `boolean` | `false` | 底部边缘的边框。 |
| `height` | `SizeValue` |  | 页眉高度。数字类型会被解释为像素值，字符串类型按原样使用。 |
| `label` | `string` |  | 地标元素的无障碍标签。 |
| `paddingBlockEnd` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` |  | 块结束（底部）内边距，使用间距刻度。仅在该边上覆盖 padding；paddingBlockEnd={0} 将最后一个子元素停靠在页眉底边。 |
| `role` | `AriaRole` |  | ARIA 地标角色。 |

### Layout Panel

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` |  | Panel content. |
| `hasDivider` | `boolean` | `false` | Border on the appropriate edge. |
| `padding` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` |  | Internal padding using the spacing scale. Overrides the default padding from the layout container. |
| `isScrollable` | `boolean` | `true` | Enable scrollable overflow. |
| `label` | `string` |  | Accessible label for the landmark element. |
| `role` | `AriaRole` |  | ARIA landmark role. |
| `width` | `number \| string` |  | Width of the panel. Numbers are treated as pixels, strings are used as-is. Ignored when resizable is provided; the hook controls width. |
| `resizable` | `ResizableProps` |  | Resize props from useResizable(). When provided, the hook drives the panel width and a ResizeHandle should be placed adjacent to the panel. Carries the region's axis ('horizontal' \| 'vertical'), which must match the adjacent ResizeHandle's direction. |

### Layout Panel

### Layout Panel

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` |  | 面板内容。 |
| `hasDivider` | `boolean` | `false` | 相应边缘的边框。 |
| `padding` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` |  | 使用间距比例的内边距。覆盖布局容器的默认内边距。 |
| `isScrollable` | `boolean` | `true` | 启用可滚动溢出。 |
| `label` | `string` |  | 地标元素的无障碍标签。 |
| `role` | `AriaRole` |  | ARIA 地标角色。 |
| `width` | `number \| string` |  | 面板宽度。数字按像素处理，字符串按原样使用。提供 resizable 时忽略，宽度由 hook 控制。 |
| `resizable` | `ResizableProps` |  | 来自 useResizable() 的调整大小属性。提供时面板宽度由 hook 驱动，应在面板旁放置 ResizeHandle。其中携带区域的轴向（'horizontal' \| 'vertical'），必须与相邻 ResizeHandle 的 direction 一致。 |

## Files

- `src/Layout.doc.mjs`
- `src/Layout.spec.md`
- `src/Layout.tsx`
- `src/LayoutAreaContext.ts`
- `src/LayoutContent.doc.mjs`
- `src/LayoutContent.tsx`
- `src/LayoutDividerContext.ts`
- `src/LayoutFooter.doc.mjs`
- `src/LayoutFooter.tsx`
- `src/LayoutHeader.doc.mjs`
- `src/LayoutHeader.tsx`
- `src/LayoutPanel.doc.mjs`
- `src/LayoutPanel.tsx`
- `src/LayoutSlotsContext.ts`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Layout
