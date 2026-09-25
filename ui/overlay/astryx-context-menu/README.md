# Context Menu

A right-click context menu that appears at the cursor position. Use to provide contextual actions for specific elements or regions without cluttering the UI with visible buttons.

## Classification

- Category: `overlay` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/ContextMenu.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: A right-click context menu that appears at the cursor position.
- Avoid when: Use a ContextMenu as the only way to access important actions; not all users know to right-click. Place more than 10–12 items in a single menu without grouping them into sections.
- Provides: Trigger area, Pointer menu surface, Pointer action row, Touch sheet frame, Touch menu surface, Touch action list, Touch action row
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: ContextMenuItemShowcase, ContextMenuShowcase, ContextMenuBasic, ContextMenuBottomSheet, ContextMenuItemBasic
- Upstream: Astryx core · Action
- Keywords: contextmenu, right-click, menu, popover, actions, context

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

- `upstream/examples/ContextMenuItemShowcase.tsx` — Context Menu Item: Context menu with custom-rendered items using ContextMenuItem for icons and descriptions. · static: `static/ContextMenuItemShowcase.html`
- `upstream/examples/ContextMenuShowcase.tsx` — Context Menu: An adaptive context area that supports long-press on compact touch screens and right-click elsewhere. · static: `static/ContextMenuShowcase.html`
- `upstream/examples/ContextMenuBasic.tsx` — ContextMenu — Basic: An adaptive context area: long-press opens a BottomSheet on compact touch screens, while right-click opens a cursor-positioned menu elsewhere. · static: `static/ContextMenuBasic.html`
- `upstream/examples/ContextMenuBottomSheet.tsx` — ContextMenu — Bottom Sheet: A ContextMenu using the explicit BottomSheet presentation. Long-press the target on touch devices or right-click it with a pointer. Keep a visible menu trigger for important mobile actions. · static: `static/ContextMenuBottomSheet.html`
- `upstream/examples/ContextMenuItemBasic.tsx` — ContextMenuItem — Basic: Context menu items with labels and secondary descriptions. Use ContextMenuItem to render custom menu entries with consistent styling. · static: `static/ContextMenuItemBasic.html`

## Documentation

### Context Menu

A right-click context menu that appears at the cursor position. Use to provide contextual actions for specific elements or regions without cluttering the UI with visible buttons.

**Do**

- Keep menu items concise and action-oriented; users expect quick access to contextual actions.
- Use sections and dividers to group related actions when the menu has many items.
- Use `presentation="adaptive"` when right-click should remain cursor-positioned on desktop while long-press opens a reachable BottomSheet on compact touch devices.
- Ensure all context menu actions are also accessible via other UI elements for keyboard-only users.
- Keep a visible MoreMenu or equivalent trigger for important mobile actions; long-press must not be the only route.

**Don't**

- Use a ContextMenu as the only way to access important actions; not all users know to right-click.
- Place more than 10–12 items in a single menu without grouping them into sections.

**Anatomy**

- Trigger area (required) — Caller-provided region that accepts right-click, keyboard context-menu, and long-press input.
- Pointer menu surface — Cursor-positioned menu panel used by the pointer presentation.
- Pointer action row — DropdownMenu-owned action, selectable option, or submenu row in the pointer presentation.
- Touch sheet frame — BottomSheet panel, content area, handle, and optional scrim that host touch actions.
- Touch menu surface — ContextMenu-owned content panel rendered inside the touch sheet frame.
- Touch action list — Spacious List that groups data-driven touch actions.
- Touch action row — ListItem button used for a data-driven action or drill-in entry in the touch presentation.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` * | `ReactNode` |  | The trigger area: right-click on this content to open the menu. |
| `items` * | `ContextMenuOption[]` |  | Array of menu entries. Each entry is one of: an action item `{label, onClick?, icon?, isDisabled?, variant?, items?}` (nested `items` open a flyout in popover presentation and drill into a new view in bottom-sheet presentation; variant `"destructive"` renders it in the error color), a divider `{type: "divider"}`, or a section `{type: "section", title?, items: [...action items]}`. |
| `menuContent` | `ReactNode` |  | Custom JSX menu content for compound mode. Use instead of items for dynamic or stateful menus. |
| `menuWidth` | `number \| string` | `'160px'` | Custom menu width. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of menu items: controls padding density. |
| `label` | `string` | `'Context menu'` | Accessible name for the menu surface, announced when it opens. |
| `onOpenChange` | `(isOpen: boolean) => void` |  | Callback fired when the menu opens or closes. |
| `presentation` | `'popover' \| 'bottom-sheet' \| 'adaptive'` | `'popover'` | Presentation policy. `popover` opens at the pointer position, `bottom-sheet` always uses an action sheet, and `adaptive` uses the BottomSheet at 768px and below when the primary pointer is coarse. |
| `isDisabled` | `boolean` | `false` | When true, right-click shows the native browser context menu instead. |

Styling hook class: `.astryx-context-menu`

### Context Menu Item

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` | `IconType` |  | Icon to display before the label. |
| `label` | `ReactNode` |  | Primary label text. |
| `description` | `ReactNode` |  | Secondary description text displayed below the label. |
| `endContent` | `ReactNode` |  | Additional content rendered after the label and description. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization. |

### Context Menu Item

### Context Menu Item

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` | `IconType` |  | 显示在标签前的图标。 |
| `label` | `ReactNode` |  | 主标签文本。 |
| `description` | `ReactNode` |  | 显示在标签下方的次要描述文本。 |
| `endContent` | `ReactNode` |  | 在标签和描述之后渲染的附加内容。 |
| `xstyle` | `StyleXStyles` |  | 根容器的 StyleX 样式。 |

## Files

- `upstream/ContextMenu.doc.mjs`
- `upstream/ContextMenu.spec.md`
- `upstream/ContextMenu.tsx`
- `upstream/ContextMenuItem.doc.mjs`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/ContextMenu
