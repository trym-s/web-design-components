# Nav Heading Menu

Accessible menu container and items for nav heading popovers. NavHeadingMenu provides role="menu" with keyboard navigation; NavHeadingMenuItem renders individual selectable items. Pass as the menu prop of SideNavHeading or TopNavHeading.

## Classification

- Category: `navigation` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/NavHeadingMenu.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Accessible menu container and items for nav heading popovers.
- Provides: Menu, Item, Icon, Text-rendered item label, Caller-rendered item label, Item description
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: NavHeadingMenuShowcase
- Upstream: Astryx core · Navigation
- Keywords: nav, menu, navigation, heading, menu-item, popover

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

- `upstream/examples/NavHeadingMenuShowcase.tsx` — Nav Heading Menu: NavHeadingMenu passed as the menu prop of SideNavHeading, letting the heading act as a product switcher popover trigger. · static: `static/NavHeadingMenuShowcase.html`

## Documentation

### Nav Heading Menu

Accessible menu container and items for nav heading popovers. NavHeadingMenu provides role="menu" with keyboard navigation; NavHeadingMenuItem renders individual selectable items. Pass as the menu prop of SideNavHeading or TopNavHeading.

**Anatomy**

- Menu (required) — Menu container for nav-heading actions, with menu semantics and keyboard navigation.
- Item (required) — Selectable action or navigation link inside the Menu.
- Icon — Optional Icon-rendered artwork shown before an Item label.
- Text-rendered item label — String Item label rendered through Text.
- Caller-rendered item label — Non-string Item label content rendered directly by the caller.
- Item description — Optional supporting description rendered through Text.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` * | `ReactNode` |  | Menu items. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Controls min-width and item padding. |
| `minWidth` | `number \| string` |  | Minimum width override. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value, not an inline style object like style={{}}. |

Styling hook class: `.astryx-nav-heading-menu`, `.astryx-nav-heading-menu-item`

## Files

- `upstream/NavHeadingMenu.spec.md`
- `upstream/NavHeadingMenu.tsx`
- `upstream/NavHeadingMenuItem.tsx`
- `upstream/NavMenu.doc.mjs`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/NavHeadingMenu
