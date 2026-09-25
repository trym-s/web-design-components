# Top Nav

TopNav is a horizontal navigation bar for product-level navigation in application headers. Use TopNav for 5 or fewer always-visible navigation items, or minimal navigation paired with search and controls. For complex navigation hierarchies, use a sidebar; to filter content, use tabs or filter buttons instead.

## Classification

- Category: `navigation` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/TopNav.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: TopNav is a horizontal navigation bar for product-level navigation in application headers.
- Avoid when: Avoid using TopNav to filter page content; use Tabs or filter controls instead. Avoid deeply nested navigation hierarchies; keep menus to one level of depth.
- Provides: Product icon and name, Navigation items, More menu, Flex area
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: TopNavHeadingShowcase, TopNavItemShowcase, TopNavMegaMenuFeaturedCardShowcase, TopNavMegaMenuItemShowcase, TopNavMegaMenuShowcase, TopNavMenuShowcase, TopNavShowcase, TopNavCenteredNavigation, TopNavEnterpriseDashboard, TopNavHeadingBasic, TopNavHoverMenu, TopNavItemBasic, TopNavMegaMenu, TopNavMegaMenuBasic, TopNavMegaMenuFeaturedCardBasic, TopNavMegaMenuItemBasic, TopNavMenuBasic, TopNavMultipleDropdowns, TopNavWithLogo
- Upstream: Astryx core · Navigation
- Keywords: topnav, navbar, appbar, header, toolbar, navigation, menubar, topbar

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

- `upstream/examples/TopNavHeadingShowcase.tsx` — Top Nav Heading: Demonstrates TopNavHeading with a logo and text, both as a plain display and as a clickable link. · static: `static/TopNavHeadingShowcase.html`
- `upstream/examples/TopNavItemShowcase.tsx` — Top Nav Item: Demonstrates TopNavItem with selected, icon, disabled, and default states. · static: `static/TopNavItemShowcase.html`
- `upstream/examples/TopNavMegaMenuFeaturedCardShowcase.tsx` — Top Nav Mega Menu Featured Card: Demonstrates TopNavMegaMenuFeaturedCard with a title, description, and CTA link inside a mega menu. · static: `static/TopNavMegaMenuFeaturedCardShowcase.html`
- `upstream/examples/TopNavMegaMenuItemShowcase.tsx` — Top Nav Mega Menu Item: Demonstrates TopNavMegaMenuItem with icons, titles, and descriptions inside a mega menu. · static: `static/TopNavMegaMenuItemShowcase.html`
- `upstream/examples/TopNavMegaMenuShowcase.tsx` — Top Nav Mega Menu: Demonstrates TopNavMegaMenu with items and a featured card in the mega menu panel. · static: `static/TopNavMegaMenuShowcase.html`
- `upstream/examples/TopNavMenuShowcase.tsx` — Top Nav Menu: Demonstrates TopNavMenu with a hover-triggered dropdown containing items with icons and descriptions. · static: `static/TopNavMenuShowcase.html`
- `upstream/examples/TopNavShowcase.tsx` — Top Nav · static: `static/TopNavShowcase.html`
- `upstream/examples/TopNavCenteredNavigation.tsx` — TopNav — Centered Navigation: Navigation layout with center-aligned nav items flanked by a logo heading and end actions. · static: `static/TopNavCenteredNavigation.html`
- `upstream/examples/TopNavEnterpriseDashboard.tsx` — TopNav — Enterprise Dashboard: Full-featured navigation bar with icon-labeled nav items, search, notifications, and a primary CTA. · static: `static/TopNavEnterpriseDashboard.html`
- `upstream/examples/TopNavHeadingBasic.tsx` — TopNavHeading — Basic: A product heading with a logo inside a TopNav, linked to the home page. Use as the leading brand element of a top navigation bar. · static: `static/TopNavHeadingBasic.html`
- `upstream/examples/TopNavHoverMenu.tsx` — TopNav — Hover Menu: Navigation bar with a hover-triggered dropdown menu showing product items with icons and descriptions. · static: `static/TopNavHoverMenu.html`
- `upstream/examples/TopNavItemBasic.tsx` — TopNavItem — Basic: Navigation links inside a TopNav with one item marked as selected. Use for top-level pages of an application. · static: `static/TopNavItemBasic.html`
- `upstream/examples/TopNavMegaMenu.tsx` — TopNav — Mega Menu: Marketing-style navigation with a full-width mega menu featuring product items and a promotional featured card. · static: `static/TopNavMegaMenu.html`
- `upstream/examples/TopNavMegaMenuBasic.tsx` — TopNavMegaMenu — Basic: A mega menu trigger inside a TopNav that opens a panel of rich link items. Use when a navigation section has multiple destinations worth describing. · static: `static/TopNavMegaMenuBasic.html`
- `upstream/examples/TopNavMegaMenuFeaturedCardBasic.tsx` — TopNavMegaMenuFeaturedCard — Basic: A promotional card with a title, description, and call-to-action link. Pass it to the featured slot of a TopNavMegaMenu to highlight announcements. · static: `static/TopNavMegaMenuFeaturedCardBasic.html`
- `upstream/examples/TopNavMegaMenuItemBasic.tsx` — TopNavMegaMenuItem — Basic: Rich link items with an icon, title, and description. Use inside the items slot of a TopNavMegaMenu to describe each destination. · static: `static/TopNavMegaMenuItemBasic.html`
- `upstream/examples/TopNavMenuBasic.tsx` — TopNavMenu — Basic: A dropdown menu inside a TopNav built from an items array with icons and descriptions. Use to group related destinations under a single trigger. · static: `static/TopNavMenuBasic.html`
- `upstream/examples/TopNavMultipleDropdowns.tsx` — TopNav — Multiple Dropdowns: Navigation bar with multiple hover-triggered dropdown menus that auto-close when switching between them. · static: `static/TopNavMultipleDropdowns.html`
- `upstream/examples/TopNavWithLogo.tsx` — TopNav — With Logo: Navigation bar with a branded logo icon, heading link, nav items, and a profile action. · static: `static/TopNavWithLogo.html`

## Documentation

### Top Nav

TopNav is a horizontal navigation bar for product-level navigation in application headers. Use TopNav for 5 or fewer always-visible navigation items, or minimal navigation paired with search and controls. For complex navigation hierarchies, use a sidebar; to filter content, use tabs or filter buttons instead.

**Do**

- Include a product logo and name in the heading slot to clearly identify the application.
- Limit primary navigation items to 5 or fewer for quick scanning and minimal cognitive load.

**Don't**

- Avoid using TopNav to filter page content; use Tabs or filter controls instead.
- Avoid deeply nested navigation hierarchies; keep menus to one level of depth.

**Anatomy**

- Product icon and name (required) — Identifies the product in the navigation bar.
- Navigation items (required) — Primary links for product-level destinations.
- More menu — Overflow menu for additional navigation items.
- Flex area — Flexible region for search, primary action buttons, or other controls.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `heading` | `ReactNode` |  | Heading slot content (logo, brand): positioned at the left edge of the nav bar. |
| `startContent` | `ReactNode` |  | Start content slot for navigation items or breadcrumbs: positioned after the heading, left-aligned. |
| `children` | `ReactNode` |  | Alias for startContent. Prefer startContent when composing with heading, centerContent, or endContent; children keeps the common React nav-item pattern from silently dropping items. |
| `centerContent` | `ReactNode` |  | Center content slot (tabs, search bar, primary navigation): when provided, switches the layout to a three-column CSS grid for true horizontal centering. |
| `endContent` | `ReactNode` |  | End content slot for search, icons, or user profile: positioned at the right edge. |
| `label` | `string` | `'Top navigation'` | Accessible label for the navigation landmark, applied as aria-label on the <nav> element. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value: not an inline style object like style={{}}. |

Styling hook class: `.astryx-top-nav`, `.astryx-top-nav-item`, `.astryx-top-nav-heading`, `.astryx-top-nav-mega-menu`, `.astryx-top-nav-mega-menu-item`, `.astryx-top-nav-mega-menu-featured-card`, `.astryx-top-nav-menu`

### Top Nav Heading

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `logo` | `ReactNode` |  | Logo element to display before the heading text. Can be an image, NavIcon, or any ReactNode. |
| `heading` | `string` |  | Product/app name displayed as the primary heading text. |
| `headingHref` | `string` |  | Link for the heading text (e.g. product home). When no menu is present and this is the only href, the whole heading becomes one clickable link. |
| `superheading` | `string` |  | Text above the heading (e.g. suite name). Rendered in a smaller secondary style. |
| `superheadingHref` | `string` |  | Link for the superheading text (e.g. suite home). When provided alongside a menu, renders as an independent inline link. |
| `subheading` | `string` |  | Text below the heading (e.g. account context). Rendered in a smaller secondary style. |
| `subheadingHref` | `string` |  | Link for the subheading text. When provided alongside a menu, renders as an independent inline link. |
| `headerEndContent` | `ReactNode` |  | Content rendered at the trailing edge of the heading row (e.g. a badge or status indicator). |
| `menu` | `ReactNode` |  | Menu content shown in a popover dropdown. When provided, a chevron indicator appears automatically. Interaction boundary is determined by the presence of hrefs: no hrefs means the whole header is the trigger; with hrefs, links are independent and the chevron area is the trigger. |
| `as` | `LinkComponentType` |  | Custom component to render instead of <a>. Overrides the provider-level default set by LinkProvider. Must accept href, className, style, and children props. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization. Must be a stylex.create() value. |

### Top Nav Heading

### Top Nav Heading

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `logo` | `ReactNode` |  | 在标题文本前显示的标志元素。可以是图片、NavIcon 或任何 ReactNode。 |
| `heading` | `string` |  | 作为主标题文本显示的产品/应用名称。 |
| `headingHref` | `string` |  | 标题文本的链接（如产品首页）。当没有菜单且这是唯一的 href 时，整个标题变为一个可点击链接。 |
| `superheading` | `string` |  | 标题上方的文本（如套件名称）。以较小的次要样式渲染。 |
| `superheadingHref` | `string` |  | 上标题文本的链接（如套件首页）。与菜单一起提供时，渲染为独立的内联链接。 |
| `subheading` | `string` |  | 标题下方的文本（如账户上下文）。以较小的次要样式渲染。 |
| `subheadingHref` | `string` |  | 下标题文本的链接。与菜单一起提供时，渲染为独立的内联链接。 |
| `headerEndContent` | `ReactNode` |  | 在标题行尾部渲染的内容（如徽章或状态指示器）。 |
| `menu` | `ReactNode` |  | 在弹出层下拉菜单中显示的菜单内容。提供时自动显示箭头指示器。交互边界由 href 的存在决定：没有 href 时整个标题为触发器；有 href 时链接独立，箭头区域为触发器。 |
| `as` | `LinkComponentType` |  | 用于替代 <a> 的自定义链接组件。覆盖 LinkProvider 设置的默认组件。必须接受 href、className、style 和 children 属性。 |
| `xstyle` | `StyleXStyles` |  | 用于布局自定义的 StyleX 样式。必须是 stylex.create() 的值。 |

### Top Nav Item

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `string` |  | Accessible label for the nav item. Rendered as visible text by default. When isIconOnly is true, used as aria-label instead. |
| `href` | `string` |  | Navigation target URL. |
| `isSelected` | `boolean` | `false` | Whether this nav item is currently selected. Sets aria-current="page" and applies highlighted styles. |
| `isDisabled` | `boolean` | `false` | Whether the nav item is disabled. Sets aria-disabled, drops href/target so the item cannot navigate, and prevents interaction. |
| `isIconOnly` | `boolean` | `false` | Renders the item as a square icon-only element. When true, label becomes the aria-label and visible text is hidden. Requires icon to be set. |
| `icon` | `ReactNode` |  | Optional icon to display before the label. |
| `children` | `ReactNode` |  | Custom content to render instead of the label text. |
| `as` | `LinkComponentType` |  | Custom component to render instead of <a>. Overrides the provider-level default set by LinkProvider. Must accept href, className, style, and children props. |

### Top Nav Item

### Top Nav Item

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `string` |  | 导航项的无障碍标签。用作可见文本，或作为仅图标项的 aria-label。 |
| `href` | `string` |  | 导航目标 URL。 |
| `isSelected` | `boolean` | `false` | 此导航项是否为当前选中状态。设置 aria-current="page" 并应用高亮样式。 |
| `isDisabled` | `boolean` | `false` | 导航项是否被禁用。设置 aria-disabled，移除 href/target 使其无法导航，并阻止交互。 |
| `icon` | `ReactNode` |  | 在标签前显示的可选图标。如果在没有子元素的情况下提供，项目变为仅图标模式。 |
| `children` | `ReactNode` |  | 替代标签文本渲染的自定义内容。省略且提供了图标时，项目变为仅图标模式。 |
| `as` | `LinkComponentType` |  | 替代 <a> 渲染的自定义组件。覆盖 LinkProvider 设置的提供者级别默认值。必须接受 href、className、style 和 children 属性。 |

### Top Nav Mega Menu

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `string` |  | Visible label for the trigger button. |
| `items` | `ReactNode` |  | Menu items slot: typically TopNavMegaMenuItem components, but accepts any ReactNode. |
| `featured` | `ReactNode` |  | Featured content slot: rendered in the right panel on desktop, below items in the mobile drawer. |
| `delay` | `number` | `150` | Delay in milliseconds before showing the menu on hover. |
| `hideDelay` | `number` | `250` | Delay in milliseconds before hiding the menu after the mouse leaves. |
| `onOpenChange` | `(isOpen: boolean) => void` |  | Callback fired when the mega menu opens or closes. Useful for coordinating wrapper styles. |

### Top Nav Mega Menu

### Top Nav Mega Menu

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `string` |  | 触发按钮的可见标签。 |
| `items` | `ReactNode` |  | 菜单项插槽，通常为 TopNavMegaMenuItem 组件，但接受任何 ReactNode。 |
| `featured` | `ReactNode` |  | 特色内容插槽，桌面端显示在右侧面板，移动抽屉中显示在项目下方。 |
| `delay` | `number` | `150` | 悬停时显示菜单前的延迟（毫秒）。 |
| `hideDelay` | `number` | `250` | 鼠标离开后隐藏菜单的延迟（毫秒）。 |
| `onOpenChange` | `(isOpen: boolean) => void` |  | 超级菜单打开或关闭时触发的回调。用于协调包装器样式。 |

### Top Nav Mega Menu Featured Card

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` * | `string` |  | Card title. |
| `description` | `string` |  | Description text below the title. |
| `image` | `string` |  | Optional image URL displayed above the body. |
| `imageAlt` | `string` |  | Alt text for the image. When omitted, the image is explicitly decorative (alt="", role="presentation", aria-hidden), usually correct since the card already has a visible title. Provide it only when the image conveys information beyond the title and description. |
| `linkLabel` | `string` |  | CTA link text. |
| `linkHref` | `string` |  | CTA link URL. |
| `children` | `ReactNode` |  | Custom content rendered below the standard body. |

### Top Nav Mega Menu Featured Card

### Top Nav Mega Menu Featured Card

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` * | `string` |  | 卡片标题。 |
| `description` | `string` |  | 标题下方的描述文本。 |
| `image` | `string` |  | 正文上方显示的可选图片 URL。 |
| `imageAlt` | `string` |  | 图片的替代文本。省略时图片会被显式标记为装饰性（alt=""、role="presentation"、aria-hidden）——由于卡片已有可见标题，这通常是正确的。仅当图片传达标题和描述之外的信息时才提供。 |
| `linkLabel` | `string` |  | CTA 链接文本。 |
| `linkHref` | `string` |  | CTA 链接 URL。 |
| `children` | `ReactNode` |  | 标准正文下方渲染的自定义内容。 |

### Top Nav Mega Menu Item

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` * | `string` |  | Display title for the menu item. |
| `description` | `string` |  | Optional description text displayed below the title. |
| `icon` | `ReactNode` |  | Optional icon element displayed to the left. |
| `href` | `string` |  | URL to navigate to when clicked. |
| `onClick` | `() => void` |  | Callback when item is clicked. |
| `as` | `LinkComponentType` |  | Custom component to render instead of <a> for link items. Overrides the provider-level default set by LinkProvider. |

### Top Nav Mega Menu Item

### Top Nav Mega Menu Item

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` * | `string` |  | 菜单项的显示标题。 |
| `description` | `string` |  | 标题下方的可选描述文本。 |
| `icon` | `ReactNode` |  | 左侧显示的可选图标元素。 |
| `href` | `string` |  | 点击时导航的 URL。 |
| `onClick` | `() => void` |  | 点击项目时的回调。 |
| `as` | `LinkComponentType` |  | 用于替代 <a> 的自定义链接组件。覆盖 LinkProvider 设置的默认组件。 |

### Top Nav Menu

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `string` |  | Visible label for the trigger button. |
| `items` * | `TopNavMenuItemData[]` |  | Menu items to display in the hover popover. Item href values follow the shared navigation rule described on Link; rejected destinations remain visible without navigation. |
| `delay` | `number` | `150` | Delay in milliseconds before showing the menu on hover. |
| `hideDelay` | `number` | `200` | Delay in milliseconds before hiding the menu after the mouse leaves. |

### Top Nav Menu

### Top Nav Menu

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `string` |  | 触发按钮的可见标签。 |
| `items` * | `TopNavMenuItemData[]` |  | 在悬停弹出框中显示的菜单项。 |
| `delay` | `number` | `150` | 悬停时显示菜单前的延迟（毫秒）。 |
| `hideDelay` | `number` | `200` | 鼠标离开后隐藏菜单的延迟（毫秒）。 |

## Files

- `upstream/TopNav.doc.mjs`
- `upstream/TopNav.tsx`
- `upstream/TopNavContext.ts`
- `upstream/TopNavHeading.doc.mjs`
- `upstream/TopNavHeading.tsx`
- `upstream/TopNavItem.doc.mjs`
- `upstream/TopNavItem.tsx`
- `upstream/TopNavMegaMenu.doc.mjs`
- `upstream/TopNavMegaMenu.tsx`
- `upstream/TopNavMegaMenuFeaturedCard.doc.mjs`
- `upstream/TopNavMegaMenuFeaturedCard.tsx`
- `upstream/TopNavMegaMenuItem.doc.mjs`
- `upstream/TopNavMegaMenuItem.tsx`
- `upstream/TopNavMenu.doc.mjs`
- `upstream/TopNavMenu.tsx`
- `upstream/TopNavMobileContentContext.ts`
- `upstream/TopNavRenderContext.ts`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/TopNav
