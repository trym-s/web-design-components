# App Shell

AppShell is the page shell for an application. It provides slots for top navigation, side navigation, banners, and main content. Use it as the root wrapper for every page. It handles responsive mobile navigation and skip-to-content automatically. Configure side nav collapse on SideNav with its collapsible prop.

## Classification

- Category: `layout` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/AppShell.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: AppShell is the page shell for an application.
- Avoid when: Nest one AppShell inside another; it's the outermost layout frame. Use for sub-page layouts; use Layout for content areas within AppShell. Add your own skip link or <main> element. AppShell already renders both, and a second main landmark makes the first ambiguous.
- Provides: Page shell, Skip link, Banner, Top navigation, Side navigation, Main content, Mobile nav drawer
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: AppShellShowcase, AppShellContentOnly, AppShellSideNavOnly, AppShellTopNavOnly, AppShellTopNavWithSideNav, AppShellWithBanner
- Upstream: Astryx core · Layout
- Keywords: appshell, layout, scaffold, sidebar, sidenav, topnav, header, navigation, dashboard, shell, page, frame

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

- `src/examples/AppShellShowcase.tsx` — App Shell: A basic app shell with content padding. · static: `static/AppShellShowcase.html`
- `src/examples/AppShellContentOnly.tsx` — AppShell — Content Only: Minimal shell with no navigation, useful for full-bleed pages, auth screens, or embedded views. · static: `static/AppShellContentOnly.html`
- `src/examples/AppShellSideNavOnly.tsx` — AppShell — Side Nav Only: App shell with SideNav header providing app identity, no TopNav needed. · static: `static/AppShellSideNavOnly.html`
- `src/examples/AppShellTopNavOnly.tsx` — AppShell — Top Nav Only: Simple layout with TopNav and no side navigation, suitable for landing pages. · static: `static/AppShellTopNavOnly.html`
- `src/examples/AppShellTopNavWithSideNav.tsx` — AppShell — Top Nav with Side Nav: The most common layout with TopNav for app identity and SideNav for page-level navigation. · static: `static/AppShellTopNavWithSideNav.html`
- `src/examples/AppShellWithBanner.tsx` — AppShell — With Banner: Full layout with TopNav, SideNav, and a dismissable info banner between the nav and content. · static: `static/AppShellWithBanner.html`

## Documentation

### App Shell

AppShell is the page shell for an application. It provides slots for top navigation, side navigation, banners, and main content. Use it as the root wrapper for every page. It handles responsive mobile navigation and skip-to-content automatically. Configure side nav collapse on SideNav with its collapsible prop.

**Do**

- Choose the right height: use "fill" for dashboards with internal scrolling and "auto" for pages that grow with content.
- Set `contentPadding` based on content type: 4 for forms and settings, 0 for tables and dashboards.
- Give every nav slot an accessible name. AppShell renders TopNav and SideNav as separate navigation landmarks, and a screen reader lists them by name, so pass `label` to each one.
- Start the page heading inside `children`. AppShell owns the skip link, the banner landmark and the main landmark, but it renders no heading, so the first heading in the content area is the page h1.

**Don't**

- Nest one AppShell inside another; it's the outermost layout frame.
- Use for sub-page layouts; use Layout for content areas within AppShell.
- Add your own skip link or <main> element. AppShell already renders both, and a second main landmark makes the first ambiguous.

**Anatomy**

- Page shell (required) — Outermost application frame that owns page-level navigation, responsive shell behavior, and the main content landmark.
- Skip link (required) — First focusable element on the page. Visually hidden until focused, then moves focus to the main content area.
- Banner — The banner slot, for system-wide announcements. Renders above the top nav, inside the banner landmark.
- Top navigation — The topNav slot, typically TopNav. Below the mobile breakpoint it becomes a compact bar carrying the nav toggle.
- Side navigation — The sideNav slot, typically SideNav. Inline above the breakpoint, moved into the mobile drawer below it.
- Main content (required) — children, rendered in the main landmark. Scrolls internally when height is fill, and with the page when it is auto.
- Mobile nav drawer — Generated below the breakpoint from the nav slots unless mobileNav disables or replaces it. A modal dialog: it traps focus and returns focus to the toggle on close.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` |  | Main content area, rendered inside a <main> element. |
| `contentPadding` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` | `0` | Padding for the main content area. Set based on the dominant content pattern: 4 (16px) for forms/settings/text, 0 for dashboards/maps/tables. Override individual sections with Section. |
| `topNav` | `ReactNode` |  | Top navigation slot, typically TopNav. |
| `sideNav` | `ReactNode` |  | Side navigation slot, typically SideNav. |
| `mobileNav` | `ReactNode` |  | Mobile navigation configuration. Accepts false (disable), a config object (tune auto behavior), or ReactNode (full custom drawer). The config object is {hasToggle?: boolean, isOpen?: boolean, onOpenChange?: (isOpen: boolean) => void, content?: ReactNode, breakpoint?: 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'none', defaultIsMobile?: boolean}; breakpoint defaults to 'md', resolves through the nearest Theme's widthBreakpoints, and switches to the wider layout at equality. 'none' is always non-mobile and ignores defaultIsMobile. |
| `banner` | `ReactNode` |  | Banner slot for system-wide announcements, placed above the topNav. |
| `height` | `'fill' \| 'auto'` | `'fill'` | Height behavior: 'fill' makes the shell fill the viewport (100dvh) with independent scroll containers; 'auto' lets the shell grow with content and uses sticky positioning for nav. |
| `variant` | `'wash' \| 'surface' \| 'section' \| 'elevated'` | `'elevated'` | Navigation background style controlling how nav areas contrast with content. 'wash' uses wash background, 'surface' uses surface background, 'section' adds dividers between nav and content, 'elevated' uses wash nav with elevated surface content and border radius. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value, not an inline style object like style={{}}. |

Styling hook class: `.astryx-app-shell`, `.astryx-app-shell-header`, `.astryx-app-shell-sidenav`

### App Shell

AppShell is the page shell for an application. It provides slots for top navigation, side navigation, banners, and main content. Use it as the root wrapper for every page. It handles responsive mobile navigation and skip-to-content automatically. Configure side nav collapse on SideNav with its collapsible prop.

**Do**

- Choose the right height: use "fill" for dashboards with internal scrolling and "auto" for pages that grow with content.
- Set `contentPadding` based on content type: 4 for forms and settings, 0 for tables and dashboards.

**Don't**

- Nest one AppShell inside another; it's the outermost layout frame.
- Use for sub-page layouts; use Layout for content areas within AppShell.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` |  | 主内容区域，渲染在 <main> 元素内部。 |
| `contentPadding` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` | `0` | 主内容区域的内边距。根据页面主要内容模式设置：4（16px）适用于表单/设置/文本页面，0 适用于仪表盘/地图/表格。可通过 Section 覆盖个别区域。 |
| `topNav` | `ReactNode` |  | 顶部导航插槽，通常为 TopNav。 |
| `sideNav` | `ReactNode` |  | 侧边导航插槽，通常为 SideNav。 |
| `mobileNav` | `ReactNode` |  | 移动端导航配置。接受 false（禁用）、配置对象（调整自动行为）或 ReactNode（完全自定义抽屉）。配置对象为 {hasToggle?, isOpen?, onOpenChange?, content?, breakpoint?: 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'none', defaultIsMobile?}；breakpoint 默认为 'md'，从最近 Theme 的 widthBreakpoints 解析，并在等于断点时切换到较宽布局；'none' 始终使用非移动端布局并忽略 defaultIsMobile。 |
| `banner` | `ReactNode` |  | 横幅插槽，用于全局公告，放置在 topNav 上方。 |
| `height` | `'fill' \| 'auto'` | `'fill'` | 高度行为：'fill' 使外壳填满视口（100dvh），各区域拥有独立的滚动容器；'auto' 使外壳随内容增长，导航使用 sticky 定位。 |
| `variant` | `'wash' \| 'surface' \| 'section' \| 'elevated'` | `'elevated'` | 导航背景样式，控制导航区域与内容之间的对比。'wash' 使用 wash 背景，'surface' 使用 surface 背景，'section' 在导航和内容之间添加分隔线，'elevated' 使用 wash 导航配合凸起的 surface 内容区域和圆角。 |
| `xstyle` | `StyleXStyles` |  | 用于布局自定义的 StyleX 样式（外边距、定位、尺寸）。必须是 stylex.create() 的值，不能是 style={{}} 形式的内联样式对象。 |

Styling hook class: `.astryx-app-shell`, `.astryx-app-shell-header`, `.astryx-app-shell-sidenav`

## Files

- `src/AppShell.doc.mjs`
- `src/AppShell.tsx`
- `src/AppShellMobileContext.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/AppShell
