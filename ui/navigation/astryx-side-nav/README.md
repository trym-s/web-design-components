# Side Nav

A sidebar navigation component for organizing application pages with sections, nested items, and icons. Use SideNav as the primary navigation when an app has 5 or more destinations or requires hierarchical grouping.

## Classification

- Category: `navigation` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/SideNav.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: A sidebar navigation component for organizing application pages with sections, nested items, and icons.
- Avoid when: Include a SideNavHeading when a TopNav is already providing app identity; this duplicates branding. Use for filtering content; use tabs or filter buttons instead.
- Provides: Product icon and name, Navigation items, Collapse/expand toggle
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: SideNavCollapseButtonShowcase, SideNavHeadingShowcase, SideNavItemShowcase, SideNavSectionShowcase, SideNavShowcase, SideNavCollapseButtonBasic, SideNavEndContent, SideNavHeadingBasic, SideNavItemBasic, SideNavNestedItems, SideNavSectionBasic, SideNavWithHeaderMenu
- Upstream: Astryx core · Navigation
- Keywords: sidenav, sidebar, navigation, drawer, menu, nav, aside, sidemenu, navmenu, sider, treeview

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

- `upstream/examples/SideNavCollapseButtonShowcase.tsx` — Side Nav Collapse Button: Demonstrates SideNavCollapseButton inside a collapsible SideNav. · static: `static/SideNavCollapseButtonShowcase.html`
- `upstream/examples/SideNavHeadingShowcase.tsx` — Side Nav Heading: Demonstrates SideNavHeading with an app name, logo icon, superheading, and subheading. · static: `static/SideNavHeadingShowcase.html`
- `upstream/examples/SideNavItemShowcase.tsx` — Side Nav Item: Demonstrates SideNavItem with selected, icon, disabled, and nested states. · static: `static/SideNavItemShowcase.html`
- `upstream/examples/SideNavSectionShowcase.tsx` — Side Nav Section: Demonstrates SideNavSection with titled groups of navigation items. · static: `static/SideNavSectionShowcase.html`
- `upstream/examples/SideNavShowcase.tsx` — Side Nav · static: `static/SideNavShowcase.html`
- `upstream/examples/SideNavCollapseButtonBasic.tsx` — SideNavCollapseButton — Basic: Place a collapse button in the SideNav footer to let users toggle the rail between expanded and collapsed states. Disable the built-in button via collapsible={{hasButton: false}} when positioning it yourself. · static: `static/SideNavCollapseButtonBasic.html`
- `upstream/examples/SideNavEndContent.tsx` — SideNav — End Content: Side navigation items with badges, counts, and context menus as trailing content. · static: `static/SideNavEndContent.html`
- `upstream/examples/SideNavHeadingBasic.tsx` — SideNavHeading — Basic: A SideNav header with an app icon and a linked title. Pass it to the SideNav header prop to identify the product or workspace at the top of the navigation rail. · static: `static/SideNavHeadingBasic.html`
- `upstream/examples/SideNavItemBasic.tsx` — SideNavItem — Basic: Navigation links inside a SideNav, each with a label, an icon, and an href. Mark the item for the current page with isSelected. · static: `static/SideNavItemBasic.html`
- `upstream/examples/SideNavNestedItems.tsx` — SideNav — Nested Items: Side navigation with collapsible nested items for settings or hierarchical menus. · static: `static/SideNavNestedItems.html`
- `upstream/examples/SideNavSectionBasic.tsx` — SideNavSection — Basic: Group related SideNavItems under titled sections. Use sections to organize longer navigation lists into scannable clusters like Overview and Account. · static: `static/SideNavSectionBasic.html`
- `upstream/examples/SideNavWithHeaderMenu.tsx` — SideNav — Header with Menu: Side navigation with an account switcher dropdown in the header for multi-account apps. · static: `static/SideNavWithHeaderMenu.html`

## Documentation

### Side Nav

A sidebar navigation component for organizing application pages with sections, nested items, and icons. Use SideNav as the primary navigation when an app has 5 or more destinations or requires hierarchical grouping.

**Do**

- Use sections to group related navigation items and help users scan for their destination.
- Pair outline and filled icon variants so the selected state is visually distinct.
- Mark the current page with isSelected: it sets aria-current="page", so the current destination is announced rather than carried by color alone.
- SideNav renders a navigation landmark, and a collapsible item follows the WAI-ARIA APG Disclosure pattern (https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/): the toggle carries aria-expanded and aria-controls, and the group it owns is inert while collapsed. Keep item labels short; they name icon-only items unless a meaningful aria-label supplies more context.
- While the nav is collapsed, an item with children shows them in a submenu flyout. On a device that can hover, pointing at the item opens it after a short delay and moving away closes it; a flyout opened by clicking stays open until it is dismissed. On touch, it opens on tap. Do not put an action in there that has no other route to it.

**Don't**

- Include a SideNavHeading when a TopNav is already providing app identity; this duplicates branding.
- Use for filtering content; use tabs or filter buttons instead.

**Anatomy**

- Product icon and name — Branding area at the top of the nav.
- Navigation items (required) — Sections and groups of navigable links.
- Collapse/expand toggle — Toggle to collapse or expand the side nav.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `header` | `ReactNode` |  | Header area (typically SideNavHeading). Sticky. |
| `topContent` | `ReactNode` |  | Content below the header, e.g., a create button. |
| `children` | `ReactNode` |  | Navigation sections and items. Scrollable. |
| `footer` | `ReactNode` |  | Footer area above the icon bar. |
| `footerIcons` | `ReactNode` |  | Footer icon bar. The row cascades a 'sm' size to the interactive children it contains, so its icons and the built-in collapse button come out one height; pass an explicit size on a child to opt out. |
| `collapsible` | `boolean \| { defaultIsCollapsed?: boolean; isCollapsed?: boolean; onCollapsedChange?: (isCollapsed: boolean) => void; hasButton?: boolean; buttonLabel?: string }` | `false` | Enables collapse behavior. true for uncontrolled with default toggle button, or an object for controlled mode and advanced config (defaultIsCollapsed, isCollapsed + onCollapsedChange, hasButton, buttonLabel). A controlled config can also be passed to a SideNavCollapseButton rendered outside this SideNav, so both share one state. |
| `resizable` | `boolean \| { defaultWidth?: number; minWidth?: number; maxWidth?: number; autoSaveId?: string; onWidthChange?: (width: number) => void; defaultIsCollapsed?: boolean; isCollapsed?: boolean; onCollapseChange?: (isCollapsed: boolean) => void }` | `false` | Enables a resize handle at the inline-end edge. true for defaults (260px initial, 180-480px range), or a ResizableConfig object (defaultWidth, minWidth, maxWidth, autoSaveId for localStorage persistence of width and collapse state, onWidthChange). It can also own collapse state (defaultIsCollapsed, isCollapsed + onCollapseChange); when both props carry collapse state, resizable wins and a dev warning names the conflicting keys. The handle is hidden while collapsed. |
| `handleRef` | `Ref<SideNavImperativeCollapseHandle>` |  | Deprecated. Imperative collapse handle for SideNavCollapseButton instances rendered outside this SideNav; hand both the same controlled collapsible config instead. Separate from `ref`, which continues to expose the root HTMLElement. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value: not an inline style object like style={{}}. |

Styling hook class: `.astryx-side-nav`, `.astryx-side-nav-heading`, `.astryx-side-nav-item`, `.astryx-side-nav-section`

### Side Nav Collapse Button

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `collapsible` | `{isCollapsed: boolean, onCollapsedChange: (isCollapsed: boolean) => void}` |  | The same controlled collapsible config passed to SideNav. Only needed when the button is rendered outside the sidenav, where collapse context cannot reach it. |
| `handleRef` | `RefObject<SideNavImperativeCollapseHandle \| null>` |  | Deprecated. Imperative collapse handle from SideNav; pass collapsible instead. |
| `label` | `string` |  | Custom button label. When provided, renders as a text button with chevron. When omitted, renders icon-only. |
| `size` | `'sm' \| 'md' \| 'lg'` |  | Button size. Defaults to the size its container cascades ('sm' inside a SideNav footer) and to 'md' with no container. Set it when the button sits outside a sized container and has to match its neighbours. |
| `children` | `ReactNode` |  | Custom button content. Overrides the default chevron icon and label. |

### Side Nav Collapse Button

### Side Nav Collapse Button

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `collapsible` | `{isCollapsed: boolean, onCollapsedChange: (isCollapsed: boolean) => void}` |  | 与 SideNav 相同的受控 collapsible 配置。仅在按钮渲染在侧边栏外部、无法读取折叠上下文时需要。 |
| `handleRef` | `RefObject<SideNavImperativeCollapseHandle \| null>` |  | 已废弃。来自 SideNav 的命令式折叠句柄；请改用 collapsible。 |
| `label` | `string` |  | 自定义按钮标签。提供时渲染为带箭头的文本按钮。省略时渲染为仅图标按钮。 |
| `size` | `'sm' \| 'md' \| 'lg'` |  | 按钮尺寸。默认使用容器级联的尺寸（SideNav 页脚内为 'sm'），无容器时为 'md'。当按钮位于已设定尺寸的容器之外且需要与相邻元素保持一致时显式设置。 |
| `children` | `ReactNode` |  | 自定义按钮内容。覆盖默认的箭头图标和标签。 |

### Side Nav Heading

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `heading` * | `string` |  | Product/app name. |
| `icon` | `ReactNode` |  | Product/app icon. |
| `headingHref` | `string` |  | Link for the heading. |
| `superheading` | `string` |  | Text above the heading. |
| `superheadingHref` | `string` |  | Link for the superheading. |
| `subheading` | `string` |  | Text below the heading. |
| `subheadingHref` | `string` |  | Link for the subheading. |
| `menu` | `ReactNode` |  | Menu content rendered inside a popover. |
| `headerEndContent` | `ReactNode` |  | Content rendered at the trailing edge of the heading row, between text and chevron. Useful for badges, status indicators, or compact action buttons. Hidden when collapsed. |

### Side Nav Heading

### Side Nav Heading

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `heading` * | `string` |  | 产品/应用名称。 |
| `icon` | `ReactNode` |  | 产品/应用图标。 |
| `headingHref` | `string` |  | 标题的链接。 |
| `superheading` | `string` |  | 标题上方的文本。 |
| `superheadingHref` | `string` |  | 上方标题的链接。 |
| `subheading` | `string` |  | 标题下方的文本。 |
| `subheadingHref` | `string` |  | 下方标题的链接。 |
| `menu` | `ReactNode` |  | 在弹出框内渲染的菜单内容。 |
| `headerEndContent` | `ReactNode` |  | 在标题行尾部渲染的内容，位于文本和箭头之间。适用于徽章、状态指示器或紧凑操作按钮。折叠时隐藏。 |

### Side Nav Item

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `string` |  | Item label. |
| `as` | `LinkComponentType` |  | Custom link component. |
| `icon` | `IconType` |  | Icon displayed in the outline (unselected) variant. See `astryx docs icons` for valid semantic names. |
| `selectedIcon` | `IconType` |  | Icon displayed when the item is selected (filled variant). See `astryx docs icons` for valid semantic names. |
| `isSelected` | `boolean` | `false` | Marks this item as the current page. |
| `isDisabled` | `boolean` | `false` | Disabled state. |
| `href` | `string` |  | Navigation URL. |
| `onClick` | `(e: MouseEvent) => void` |  | Click handler. |
| `endContent` | `ReactNode` |  | Passive right-side content only (badges, counts). Interactive controls go in actions. |
| `actions` | `ReactNode` |  | Row-level secondary controls (icon buttons, menus) rendered as siblings of the primary element at the trailing edge of the row: after the expand/collapse toggle, before any nested children in DOM and focus order. Each control owns its accessible name and behavior. Controls inherit the row control size through SizeContext, so an unsized icon button matches the built-in expand/collapse toggle; an explicit size still wins. Hidden while the SideNav rail is collapsed. Use endContent for passive content (badges, counts); use actions for anything interactive. |
| `children` | `ReactNode` |  | Sub-items for nesting. |
| `collapsible` | `boolean \| { defaultIsCollapsed?: boolean, isCollapsed?: boolean, onCollapsedChange?: (isCollapsed: boolean) => void }` | `false` | Enables collapse behavior for items with children. Pass true for uncontrolled (starts expanded), or an object for controlled mode. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant for the nav item row. |

### Side Nav Item

### Side Nav Item

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `string` |  | 项目标签。 |
| `as` | `LinkComponentType` |  | 自定义链接组件。 |
| `icon` | `IconType` |  | 轮廓（未选中）变体中显示的图标。 |
| `selectedIcon` | `IconType` |  | 选中时显示的图标（填充变体）。 |
| `isSelected` | `boolean` | `false` | 将此项标记为当前页面。 |
| `isDisabled` | `boolean` | `false` | 禁用状态。 |
| `href` | `string` |  | 导航 URL。 |
| `onClick` | `(e: MouseEvent) => void` |  | 点击处理函数。 |
| `endContent` | `ReactNode` |  | 仅用于被动右侧内容（徽章、计数）。交互控件请使用 actions。 |
| `actions` | `ReactNode` |  | 行级次要控件（图标按钮、菜单），作为主元素的同级节点渲染在行尾——位于展开/折叠切换按钮之后、任何嵌套子项之前（DOM 与焦点顺序一致）。每个控件自行负责其无障碍名称与行为。控件通过 SizeContext 继承行内控件尺寸，因此未指定尺寸的图标按钮会与内置的展开/折叠切换按钮保持同一尺寸；显式指定的 size 优先。侧边栏折叠为图标栏时隐藏。被动内容（徽章、计数）请使用 endContent；交互内容请使用 actions。 |
| `children` | `ReactNode` |  | 用于嵌套的子项。 |
| `collapsible` | `boolean \| { defaultIsCollapsed?: boolean, isCollapsed?: boolean, onCollapsedChange?: (isCollapsed: boolean) => void }` | `false` | 启用带子项的折叠行为。传 true 为非受控模式（默认展开），或传对象用于受控模式。 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 导航项的尺寸变体。 |

### Side Nav Section

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` * | `string` |  | Section title. |
| `subtitle` | `string` |  | Section subtitle. |
| `children` | `ReactNode` |  | Section items. |
| `endContent` | `ReactNode` |  | Right-side content in the section header. |
| `isHeaderHidden` | `boolean` | `false` | Visually hides the section header while keeping it accessible to screen readers. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value: not an inline style object like style={{}}. |

### Side Nav Section

### Side Nav Section

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` * | `string` |  | 分组标题。 |
| `subtitle` | `string` |  | 分组副标题。 |
| `children` | `ReactNode` |  | 分组项目。 |
| `endContent` | `ReactNode` |  | 分组头部的右侧内容。 |
| `isHeaderHidden` | `boolean` | `false` | 视觉上隐藏分组头部，同时保持屏幕阅读器可访问。 |

## Files

- `upstream/SideNav.doc.mjs`
- `upstream/SideNav.tsx`
- `upstream/SideNavCollapseButton.doc.mjs`
- `upstream/SideNavCollapseButton.tsx`
- `upstream/SideNavCollapseContext.ts`
- `upstream/SideNavHeading.doc.mjs`
- `upstream/SideNavHeading.tsx`
- `upstream/SideNavItem.doc.mjs`
- `upstream/SideNavItem.tsx`
- `upstream/SideNavRenderContext.ts`
- `upstream/SideNavSection.doc.mjs`
- `upstream/SideNavSection.tsx`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/SideNav
