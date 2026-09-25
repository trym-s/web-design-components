# Breadcrumbs

Breadcrumbs show a trail of links from the root to the current page. Use them at the top of detail pages, settings panels, or anywhere the user needs to see where they are and navigate back up.

## Classification

- Category: `navigation` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/Breadcrumbs.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Breadcrumbs show a trail of links from the root to the current page.
- Avoid when: Use breadcrumbs as the primary navigation. They supplement a sidebar or top nav, not replace it. Show breadcrumbs on top-level pages that have no parent; they add clutter without helping the user. Let the trail grow beyond 5 levels. If you need more, consider simplifying the page hierarchy instead. Mirror a separator the bidi algorithm already mirrors. An angle-quote glyph such as › is Bidi_Mirrored, so it flips under RTL on its own and rtlStyles.mirror would flip it back. An arrow glyph such as → and any Icon separator are not, so those do need rtlStyles.mirror through xstyle.
- Provides: Trail, Item, Separator, Icon
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: BreadcrumbItemShowcase, BreadcrumbsShowcase, BreadcrumbItemBasic, BreadcrumbsCustomSeparator, BreadcrumbsDeepHierarchy, BreadcrumbsMenuItem, BreadcrumbsSupportingVariant, BreadcrumbsWithIcons
- Upstream: Astryx core · Navigation
- Keywords: breadcrumbs, breadcrumb, navigation, nav, crumbs, trail, path, hierarchy, wayfinding, steps

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

- `src/examples/BreadcrumbItemShowcase.tsx` — Breadcrumb Item: BreadcrumbItem represents a single step in a breadcrumb trail, supporting links, icons, current-page markers, and custom link components. · static: `static/BreadcrumbItemShowcase.html`
- `src/examples/BreadcrumbsShowcase.tsx` — Breadcrumbs: A breadcrumb trail showing page hierarchy with linked ancestors and a current page. · static: `static/BreadcrumbsShowcase.html`
- `src/examples/BreadcrumbItemBasic.tsx` — BreadcrumbItem — Basic: Breadcrumb links inside a Breadcrumbs trail. Ancestor pages get an href; mark the last item with isCurrent to render it as plain text for the current page. · static: `static/BreadcrumbItemBasic.html`
- `src/examples/BreadcrumbsCustomSeparator.tsx` — Breadcrumbs — Separators: Swap the default "/" for a different character like chevrons, arrows, or dots. Use when the visual style of the page calls for a different separator. · static: `static/BreadcrumbsCustomSeparator.html`
- `src/examples/BreadcrumbsDeepHierarchy.tsx` — Breadcrumbs — Deep Path: A 5-level breadcrumb trail for deeply nested content. Use in e-commerce, file browsers, or any UI with several levels of hierarchy. · static: `static/BreadcrumbsDeepHierarchy.html`
- `src/examples/BreadcrumbsMenuItem.tsx` — Breadcrumbs — Menu item: Give a mid-trail crumb a `menu` prop to turn it into a menu trigger for switching between sibling destinations. It reuses the same item API as DropdownMenu, so an existing option array (or composed item children) drops in verbatim. · static: `static/BreadcrumbsMenuItem.html`
- `src/examples/BreadcrumbsSupportingVariant.tsx` — Breadcrumbs — Variants: Compare the default and supporting variants side by side. Use the supporting variant in dense UIs like admin panels where the breadcrumb should be subtle. · static: `static/BreadcrumbsSupportingVariant.html`
- `src/examples/BreadcrumbsWithIcons.tsx` — Breadcrumbs — Icons: Add icons before breadcrumb labels for quick recognition. Use a home icon on the root item and contextual icons on key sections. · static: `static/BreadcrumbsWithIcons.html`

## Documentation

### Breadcrumbs

Breadcrumbs show a trail of links from the root to the current page. Use them at the top of detail pages, settings panels, or anywhere the user needs to see where they are and navigate back up.

**Do**

- Place breadcrumbs above the page heading so the user sees their location before reading the content.
- Keep labels short and match the page titles they link to: "Settings" not "Application Settings Page".
- Use the supporting variant in dense UIs like admin panels or sidebars where the breadcrumb should be subtle.
- Make the last item plain text, not a link; it represents the current page. The component does this automatically when you set isCurrent.
- The component implements the WAI-ARIA APG Breadcrumb pattern: a labelled nav landmark wrapping an ordered list, with aria-current="page" on the current item. A crumb with a menu additionally implements the APG Menu Button pattern, opening on Enter, Space or ArrowDown and closing on Escape.
- Give each trail its own label when a page renders more than one, so the nav landmarks stay distinguishable in a screen reader landmark list.
- The built-in slash separator mirrors automatically in RTL. For a custom separator, leave Unicode-mirrored angle quotes such as › alone; mirror arrows and Icon separators once with rtlStyles.mirror.

**Don't**

- Use breadcrumbs as the primary navigation. They supplement a sidebar or top nav, not replace it.
- Show breadcrumbs on top-level pages that have no parent; they add clutter without helping the user.
- Let the trail grow beyond 5 levels. If you need more, consider simplifying the page hierarchy instead.
- Mirror a separator the bidi algorithm already mirrors. An angle-quote glyph such as › is Bidi_Mirrored, so it flips under RTL on its own and rtlStyles.mirror would flip it back. An arrow glyph such as → and any Icon separator are not, so those do need rtlStyles.mirror through xstyle.

**Anatomy**

- Trail (required) — The ordered list of links from root to current page.
- Item (required) — A single step in the trail. Renders as a link or plain text for the current page.
- Separator (required) — The character between items. Defaults to "/" but can be customized.
- Icon — An optional icon before an item label, like a home icon on the first item.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` * | `ReactNode` |  | BreadcrumbItem elements to render inside the breadcrumb trail. |
| `separator` | `ReactNode` | `'/'` | Separator rendered between breadcrumb items. The built-in slash mirrors automatically in RTL. |
| `variant` | `'default' \| 'supporting'` | `'default'` | Visual variant: supporting is smaller with secondary text styling. |
| `label` | `string` | `'Breadcrumb'` | Accessible label for the nav landmark (aria-label). |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value: not an inline style object like style={{}}. |

Styling hook class: `.astryx-breadcrumb-item`, `.astryx-breadcrumb-item-menu-trigger`, `.astryx-breadcrumb-menu`, `.astryx-breadcrumbs`

### Breadcrumb Item

BreadcrumbItem represents one destination, action, current location, or sibling-menu trigger inside a Breadcrumbs trail.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` * | `ReactNode` |  | Label content for the breadcrumb item. |
| `href` | `string` |  | URL the breadcrumb links to; omit for non-navigable items. |
| `onClick` | `(e: MouseEvent) => void` |  | Click handler for the breadcrumb item. |
| `isCurrent` | `boolean` |  | Marks this item as the current page, applying aria-current="page". When omitted, the last item is auto-detected if no item is explicitly current; pass false to opt out. |
| `startIcon` | `ReactNode` |  | Icon rendered before the item label. |
| `menu` | `DropdownMenuOption[] \| ReactNode` |  | Menu opened when the item is activated, using the same item API as DropdownMenu/MoreMenu/ContextMenu (a DropdownMenuOption[] array or composed DropdownMenuItem children). Renders a link-styled menu trigger with a chevron and aria-haspopup="menu". Takes precedence over href/onClick. |
| `menuSize` | `'sm' \| 'md' \| 'lg'` |  | Size passed to the menu items. Defaults from the breadcrumb variant ('supporting' → 'sm', otherwise 'md'). |
| `as` | `LinkComponentType` |  | Custom link component to render instead of <a>. Overrides the provider-level default from LinkProvider. Only applies to non-current items. |

### Breadcrumb Item

### Breadcrumb Item

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` * | `ReactNode` |  | 面包屑项的标签内容。 |
| `href` | `string` |  | 面包屑链接的 URL；不可导航的项目请省略。 |
| `onClick` | `(e: MouseEvent) => void` |  | 面包屑项的点击处理函数。 |
| `isCurrent` | `boolean` |  | 将此项标记为当前页面，应用 aria-current="page"。省略时，如果没有显式的当前项，则自动将最后一项标记为当前项；传入 false 可退出自动检测。 |
| `startIcon` | `ReactNode` |  | 在项目标签前渲染的图标。 |
| `menu` | `DropdownMenuOption[] \| ReactNode` |  | 激活项目时打开的菜单，使用与 DropdownMenu/MoreMenu/ContextMenu 相同的项目 API（DropdownMenuOption[] 数组或组合的 DropdownMenuItem 子元素）。渲染为带 chevron 和 aria-haspopup="menu" 的链接样式触发器。优先于 href/onClick。 |
| `menuSize` | `'sm' \| 'md' \| 'lg'` |  | 传递给菜单项的尺寸。默认根据面包屑变体推断（'supporting' → 'sm'，否则 'md'）。 |
| `as` | `LinkComponentType` |  | 自定义链接组件，代替 <a> 渲染。覆盖 LinkProvider 设置的默认值。仅适用于非当前项。 |

## Files

- `src/BreadcrumbItem.doc.mjs`
- `src/BreadcrumbItem.spec.md`
- `src/BreadcrumbItem.tsx`
- `src/Breadcrumbs.doc.mjs`
- `src/Breadcrumbs.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Breadcrumbs
