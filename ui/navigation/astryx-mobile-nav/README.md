# Mobile Nav

A slide-out drawer for mobile navigation. MobileNav is the mobile counterpart to SideNav and accepts the same children. Use it on narrow viewports where a persistent sidebar is not practical. Inside AppShell, use MobileNavToggle as the trigger; it reads state from context automatically.

## Classification

- Category: `navigation` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/MobileNav.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: A slide-out drawer for mobile navigation.
- Avoid when: Use MobileNav on desktop: use a persistent SideNav instead.
- Provides: Navigation overlay, Drawer, Header, Content, Close button, Toggle button
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: MobileNavShowcase, MobileNavToggleShowcase, MobileNavBasicMobileNav, MobileNavEndSideMobileNav, MobileNavToggleBasic, MobileNavWithoutTitleMobileNav
- Upstream: Astryx core · Navigation
- Keywords: mobilenav, drawer, sidebar, navigation, hamburger, menu, offcanvas, slideout, navdrawer, toggle

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

- `src/examples/MobileNavShowcase.tsx` — Mobile Nav · static: `static/MobileNavShowcase.html`
- `src/examples/MobileNavToggleShowcase.tsx` — Mobile Nav Toggle: Demonstrates MobileNavToggle as a standalone hamburger button for opening the mobile navigation drawer. · static: `static/MobileNavToggleShowcase.html`
- `src/examples/MobileNavBasicMobileNav.tsx` — MobileNav — Basic Drawer: Mobile navigation drawer with sectioned nav items triggered by a menu button · static: `static/MobileNavBasicMobileNav.html`
- `src/examples/MobileNavEndSideMobileNav.tsx` — MobileNav — End Side Drawer: Navigation drawer that slides in from the right side of the screen · static: `static/MobileNavEndSideMobileNav.html`
- `src/examples/MobileNavToggleBasic.tsx` — MobileNavToggle — Basic: A nav toggle with a custom icon and accessible label instead of the default hamburger. It opens a MobileNav drawer via the AppShell mobile context, which AppShell provides automatically. · static: `static/MobileNavToggleBasic.html`
- `src/examples/MobileNavWithoutTitleMobileNav.tsx` — MobileNav — Without Title: Mobile navigation drawer without a title header · static: `static/MobileNavWithoutTitleMobileNav.html`

## Documentation

### Mobile Nav

A slide-out drawer for mobile navigation. MobileNav is the mobile counterpart to SideNav and accepts the same children. Use it on narrow viewports where a persistent sidebar is not practical. Inside AppShell, use MobileNavToggle as the trigger; it reads state from context automatically.

**Do**

- Share the same nav items between MobileNav and SideNav by extracting them into a variable.
- Provide a header when the drawer's purpose is not obvious from its content.
- Inside AppShell, use MobileNavToggle to open the drawer; it reads state from context. Do not pass isOpen/onOpenChange to the toggle.

**Don't**

- Use MobileNav on desktop: use a persistent SideNav instead.

**Anatomy**

- Navigation overlay (required) — Full-viewport dialog overlay that hosts the mobile navigation drawer.
- Drawer (required) — Painted panel that slides in from the resolved viewport edge.
- Header (required) — Fixed row containing optional header content and the close button.
- Content (required) — Scrollable region containing the navigation content.
- Close button (required) — Button that closes the navigation drawer.
- Toggle button — AppShell-aware Button that opens or closes the drawer on mobile viewports.

Styling hook class: `.astryx-mobile-nav`

### Mobile Nav

A slide-out drawer for mobile navigation. MobileNav is the mobile counterpart to SideNav and accepts the same children. Use it on narrow viewports where a persistent sidebar is not practical.

**Do**

- Share the same nav items between MobileNav and SideNav by extracting them into a variable.
- Provide a header when the drawer's purpose is not obvious from its content.
- Inside AppShell, use MobileNavToggle to open the drawer; it reads state from context. Do not pass isOpen/onOpenChange to the toggle.

**Don't**

- Use MobileNav on desktop: use a persistent SideNav instead.

**Anatomy**

- Navigation overlay (required) — Full-viewport dialog overlay that hosts the mobile navigation drawer.
- Drawer (required) — Painted panel that slides in from the resolved viewport edge.
- Header (required) — Fixed row containing optional header content and the close button.
- Content (required) — Scrollable region containing the navigation content.
- Close button (required) — Button that closes the navigation drawer.
- Toggle button — AppShell-aware Button that opens or closes the drawer on mobile viewports.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `isOpen` * | `boolean` |  | 抽屉是否打开。 |
| `onOpenChange` * | `(isOpen: boolean) => void` |  | 当抽屉可见性变化时调用（点击背景遮罩、按 Escape 键或点击关闭按钮）。 |
| `children` * | `ReactNode` |  | 抽屉内容，通常是 SideNavSection/SideNavItem 或任何 ReactNode。 |
| `header` | `ReactNode` |  | 抽屉的头部内容。渲染在关闭按钮旁边。传入字符串作为简单文本标题，或传入 ReactNode 作为自定义内容。 |
| `width` | `number` | `320` | 抽屉宽度（像素）。上限为 85vw 以防止在小屏幕上溢出。 |
| `side` | `'start' \| 'end' \| 'auto'` | `'auto'` | 抽屉滑出的方向。在 LTR 布局中 start 为左侧，在 RTL 布局中为右侧。auto 根据触发元素的位置自动选择方向。 |

Styling hook class: `.astryx-mobile-nav`

## Files

- `src/MobileNav.doc.mjs`
- `src/MobileNav.spec.md`
- `src/MobileNav.tsx`
- `src/MobileNavToggle.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/MobileNav
