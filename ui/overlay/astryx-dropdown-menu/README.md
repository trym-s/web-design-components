# Dropdown Menu

A dropdown menu that displays a list of actionable items in a popup triggered by a button. Use to present action options as a next step in a process, or to offer contextual actions without cluttering the interface.

## Classification

- Category: `overlay` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/DropdownMenu.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: A dropdown menu that displays a list of actionable items in a popup triggered by a button.
- Avoid when: Use a DropdownMenu for navigation; use a navigation component instead. Place more than 10–12 items in a single menu without grouping them into sections.
- Provides: Trigger button, Trigger indicator icon, Pointer menu surface, Pointer action row, Icon-rendered item icon, Caller-rendered item start content, Checkbox indicator, Radio indicator, Pointer section heading, Pointer divider, Pointer submenu indicator icon, Touch sheet frame, Touch menu surface, Touch heading, Touch action list, Touch action row, Touch divider
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: DropdownMenuItemShowcase, DropdownMenuShowcase, DropdownMenuActions, DropdownMenuBottomSheet, DropdownMenuItemBasic, DropdownMenuNoChevron, DropdownMenuWithDisabledItems, DropdownMenuWithSections, DropdownMenuWithSubmenu
- Upstream: Astryx core · Action
- Keywords: dropdown, menu, popover, select, actions, contextmenu, overflow, kebab, menubutton

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

- `upstream/examples/DropdownMenuItemShowcase.tsx` — Dropdown Menu Item: Dropdown menu with custom-rendered items using DropdownMenuItem for icons and descriptions. · static: `static/DropdownMenuItemShowcase.html`
- `upstream/examples/DropdownMenuShowcase.tsx` — Dropdown Menu: A button that opens a dropdown menu with action items. The menu starts open for preview. · static: `static/DropdownMenuShowcase.html`
- `upstream/examples/DropdownMenuActions.tsx` — DropdownMenu — Actions: Action menu with dividers separating safe and destructive operations. Use for row-level actions on items like documents, projects, or records. · static: `static/DropdownMenuActions.html`
- `upstream/examples/DropdownMenuBottomSheet.tsx` — DropdownMenu — Adaptive presentation: Chooses a bottom sheet for compact touch surfaces and an anchored popover otherwise. The media query is product policy, while DropdownMenu owns both presentations. · static: `static/DropdownMenuBottomSheet.html`
- `upstream/examples/DropdownMenuItemBasic.tsx` — DropdownMenuItem — Basic: Dropdown menu items with labels and secondary descriptions. Use DropdownMenuItem to render custom menu entries with consistent styling. · static: `static/DropdownMenuItemBasic.html`
- `upstream/examples/DropdownMenuNoChevron.tsx` — DropdownMenu — Icon Trigger: Overflow menu triggered by an icon-only button with no chevron or label text. Use for row-level actions in tables, cards, or lists where a text button would take too much space. · static: `static/DropdownMenuNoChevron.html`
- `upstream/examples/DropdownMenuWithDisabledItems.tsx` — DropdownMenu — Disabled: Menu with selectively disabled items based on permissions. Use when some actions require higher privileges, like admin-only operations. · static: `static/DropdownMenuWithDisabledItems.html`
- `upstream/examples/DropdownMenuWithSections.tsx` — DropdownMenu — Sections: Menu items organized into titled sections for easy scanning. Use when you have 6+ actions that fall into distinct categories, like Create vs Manage. · static: `static/DropdownMenuWithSections.html`
- `upstream/examples/DropdownMenuWithSubmenu.tsx` — DropdownMenu — Submenu: Action menu with a nested submenu. Hover or Right arrow opens the flyout; Left arrow / Escape closes it. Use to group related destinations or secondary actions without crowding the top level. · static: `static/DropdownMenuWithSubmenu.html`

## Documentation

### Dropdown Menu

A dropdown menu that displays a list of actionable items in a popup triggered by a button. Use to present action options as a next step in a process, or to offer contextual actions without cluttering the interface.

**Do**

- Keep menu items concise and action-oriented so users can scan options quickly.
- Use sections and dividers to group related actions when the menu has many items.
- For a short, flat action set, use presentation="bottom-sheet" when product policy calls for a modal touch surface.
- Use presentation="adaptive" when the same short action set should remain anchored on pointer layouts and become a BottomSheet on compact coarse-pointer layouts.
- For a hierarchy that cannot fit as adjacent flyouts on a compact touch surface, a product may explicitly use a drill-in interaction with a Back action.
- Choose presentation explicitly in product code. A compact, coarse-pointer, hover-free media query is one useful policy, but DropdownMenu does not impose a universal device breakpoint.
- When the content is no longer a short list of immediate actions, reevaluate the interaction and choose a component that matches the actual task; content traits alone do not determine the component.

**Don't**

- Use a DropdownMenu for navigation; use a navigation component instead.
- Place more than 10–12 items in a single menu without grouping them into sections.

**Anatomy**

- Trigger button (required) — Button that opens and closes the selected menu presentation.
- Trigger indicator icon — Optional trailing chevron shown by a labeled trigger when hasChevron is enabled.
- Pointer menu surface — Anchored top-level or nested menu panel used by the pointer presentation.
- Pointer action row — Action, selectable option, or submenu trigger row in an anchored menu.
- Icon-rendered item icon — Optional semantic or component icon rendered through Icon at the start of an action row.
- Caller-rendered item start content — Optional arbitrary React content rendered directly at the start of an action row.
- Checkbox indicator — Decorative shared checkbox indicator for a checkbox action row.
- Radio indicator — Decorative shared radio indicator with an additional menu-owned target.
- Pointer section heading — Heading that labels a data-driven section in an anchored menu.
- Pointer divider — Divider between groups in an anchored menu.
- Pointer submenu indicator icon — Trailing chevron that identifies an action row as a nested flyout trigger.
- Touch sheet frame — BottomSheet panel, content area, handle, and optional scrim that host touch actions.
- Touch menu surface — Menu-owned content panel rendered inside the touch sheet frame.
- Touch heading — Current action-sheet title, updated when a nested action view is opened.
- Touch action list — Spacious List that groups actions in the touch presentation.
- Touch action row — ListItem button used for an action or drill-in entry in the touch presentation.
- Touch divider — Divider between action groups in the touch presentation.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `button` | `DropdownMenuButtonProps` | `{ label: 'Menu' }` | Props for the trigger button (Button props except onClick). |
| `items` * | `DropdownMenuOption[]` |  | Array of menu entries. Each entry is one of: an action item `{label, onClick?, icon?, description?, endContent?, isDisabled?, variant?, hasCloseOnSelect?, id?}` (variant `"destructive"` renders it in the error color; `endContent` holds trailing content such as a keyboard-shortcut hint; `id` is the row's stable React key, needed only when the array reorders or filters), a divider `{type: "divider"}`, or a section `{type: "section", title?, id?, items: [...action items]}`. |
| `presentation` | `'popover' \| 'bottom-sheet' \| 'adaptive'` | `'popover'` | Presentation surface for data-driven items. 'popover' stays anchored, 'bottom-sheet' always renders the actions in a modal BottomSheet, and 'adaptive' uses a BottomSheet on compact coarse-pointer layouts while remaining anchored elsewhere. Compound children currently support popover only. |
| `isMenuOpen` | `boolean` |  | Controlled open state for the menu. Mounting with true renders the menu open without moving focus into it; focus moves to the first item only when the menu opens after mount. |
| `onOpenChange` | `(isOpen: boolean) => void` |  | Callback fired when the open state changes. |
| `menuWidth` | `number \| string` |  | Minimum width for the popover presentation. Length values may grow for content; intrinsic and CSS-wide keywords select the preferred inline size. Every form is capped to the available viewport space. Defaults to matching the trigger width up to that cap. |
| `placement` | `'above' \| 'below' \| 'start' \| 'end'` | `'below'` | Popover placement relative to the trigger. Ignored by the bottom-sheet presentation. Logical: start/end resolve against the menu's own inherited direction (RTL mirrors). |
| `alignment` | `'start' \| 'center' \| 'end'` | `'start'` | Popover alignment along the placement axis. Ignored by the bottom-sheet presentation. Logical: start/end follow the menu's own inherited direction (RTL mirrors). |
| `onClick` | `() => void` |  | Callback fired for accepted trigger activation. The trailing click from the same press that light-dismissed the menu is ignored. |
| `hasChevron` | `boolean` | `true` | Whether to show a chevron icon on the trigger button. Set to false for icon-only triggers. |
| `children` | `ReactNode` |  | Compound-mode menu content: DropdownMenuItem, DropdownMenuDivider, DropdownMenuSubMenu, and the selectable items. Mutually exclusive with `items`. |

Styling hook class: `.astryx-dropdown-menu`, `.astryx-dropdown-menu-item`, `.astryx-dropdown-menu-radio`, `.astryx-dropdown-menu-section-heading`, `.astryx-dropdown-menu-divider`, `.astryx-dropdown-menu-indicator-icon`

### Dropdown Menu Checkbox Item

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `ReactNode` |  | Primary label text identifying the item. |
| `description` | `ReactNode` |  | Secondary description text displayed below the label. |
| `icon` | `IconType` |  | Icon to display before the label. See `npx astryx docs icons` for valid semantic names. |
| `value` | `boolean` |  | Whether the item is checked. Controlled; pair with onChange. |
| `onChange` | `(checked: boolean) => void` |  | Callback fired with the next checked state when the item is toggled. |
| `isDisabled` | `boolean` | `false` | Whether the item is disabled. Disabled items stay focusable (via aria-disabled) so they remain discoverable by keyboard and assistive technology, but activation is blocked. |
| `hasCloseOnSelect` | `boolean` | `false` | Whether toggling the item closes the menu. Checkbox items default to staying open so several can be toggled in a single session. |
| `endContent` | `ReactNode` |  | Content to render after the label and description, such as a keyboard shortcut hint or badge. |

### Dropdown Menu Checkbox Item

### Dropdown Menu Checkbox Item

### Dropdown Menu Divider

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `xstyle` | `StyleXStyles` |  | StyleX styles applied after the menu spacing. Must be a stylex.create() value: not an inline style object like style={{}}. |

Styling hook class: `.astryx-dropdown-menu-divider`

### Dropdown Menu Divider

### Dropdown Menu Item

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` | `IconType` |  | Icon to display before the label. See `astryx docs icons` for valid semantic names. |
| `label` | `ReactNode` |  | Primary label text. |
| `description` | `ReactNode` |  | Secondary description text displayed below the label. |
| `endContent` | `ReactNode` |  | Additional content rendered after the label and description. |
| `hasCloseOnSelect` | `boolean` | `true` | Whether activating the item closes the menu. Set false for an action that reports its result on the item itself. |
| `variant` | `'default' \| 'destructive'` | `'default'` | Visual variant. 'destructive' renders the label, description, and icon in the error color for dangerous actions (e.g. Delete). |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value: not an inline style object like style={{}}. |

### Dropdown Menu Item

### Dropdown Menu Item

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` | `IconType` |  | 显示在标签前的图标。 |
| `label` | `ReactNode` |  | 主标签文本。 |
| `description` | `ReactNode` |  | 显示在标签下方的次要描述文本。 |
| `endContent` | `ReactNode` |  | 在标签和描述之后渲染的附加内容。 |
| `hasCloseOnSelect` | `boolean` | `true` | 激活该项时是否关闭菜单。若操作要在该项上就地反馈结果，请设为 false。 |
| `variant` | `'default' \| 'destructive'` | `'default'` | 视觉变体。'destructive' 会以错误色渲染标签、描述和图标，用于危险操作（如删除）。 |
| `xstyle` | `StyleXStyles` |  | 根容器的 StyleX 样式。 |

### Dropdown Menu Radio Group

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string \| undefined` |  | The currently selected value in the group. Pass undefined when nothing is selected yet. |
| `onChange` | `(value: string) => void` |  | Callback fired when the selected value changes. |
| `label` | `string` |  | Accessible name for the group, applied as aria-label so screen readers announce the radios as a named set, e.g. "Sort by". Required. Pass aria-labelledby (via base props) instead when the name already exists as a visible element. |
| `hasCloseOnSelect` | `boolean` | `true` | Whether selecting a value closes the menu. Radio items default to closing on selection (a single-choice commit). |
| `children` | `ReactNode` |  | The DropdownMenuRadioItems that make up the group. |

### Dropdown Menu Radio Group

### Dropdown Menu Radio Group

### Dropdown Menu Radio Item

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` |  | The value this item represents within its group. The group's value matches against this to determine the checked state. |
| `label` | `ReactNode` |  | Primary label text identifying the option. |
| `description` | `ReactNode` |  | Secondary description text displayed below the label. |
| `icon` | `IconType` |  | Icon to display before the label. See `npx astryx docs icons` for valid semantic names. |
| `isDisabled` | `boolean` | `false` | Whether this individual radio item is disabled. Disabled items stay focusable (via aria-disabled) so they remain discoverable by keyboard and assistive technology, but selection is blocked. |
| `endContent` | `ReactNode` |  | Content to render after the label and description, such as a badge or metadata. |

### Dropdown Menu Radio Item

### Dropdown Menu Radio Item

### Dropdown Menu Submenu

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `ReactNode` |  | Primary label text for the trigger row. |
| `icon` | `IconType` |  | Icon to display before the label. See `astryx docs icons` for valid semantic names. |
| `description` | `ReactNode` |  | Secondary description text displayed below the label. |
| `children` | `ReactNode` |  | The flyout menu items: the same components used at the top level (DropdownMenuItem, nested DropdownMenuSubMenu, selectable items). |
| `isDisabled` | `boolean` | `false` | A disabled submenu renders its trigger row but never opens the flyout. |
| `hasSpinner` | `boolean` | `false` | Show a spinner in place of the caret, e.g. while a lazy submenu's children are loading. |
| `menuWidth` | `number \| string` |  | Minimum flyout width. The flyout may grow for its content, but it is capped to the available viewport space. Defaults to intrinsic sizing (min 160px). |
| `onOpenChange` | `(isOpen: boolean) => void` |  | Called when the flyout opens or closes. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for the trigger row. Must be a stylex.create() value: not an inline style object like style={{}}. |

### Dropdown Menu Submenu

## Files

- `upstream/DropdownMenu.doc.mjs`
- `upstream/DropdownMenu.spec.md`
- `upstream/DropdownMenu.tsx`
- `upstream/DropdownMenuCheckboxItem.doc.mjs`
- `upstream/DropdownMenuCheckboxItem.tsx`
- `upstream/DropdownMenuContext.tsx`
- `upstream/DropdownMenuDivider.doc.mjs`
- `upstream/DropdownMenuDivider.tsx`
- `upstream/DropdownMenuItem.doc.mjs`
- `upstream/DropdownMenuItem.tsx`
- `upstream/DropdownMenuRadioGroup.doc.mjs`
- `upstream/DropdownMenuRadioGroup.tsx`
- `upstream/DropdownMenuRadioItem.doc.mjs`
- `upstream/DropdownMenuRadioItem.tsx`
- `upstream/DropdownMenuSubMenu.doc.mjs`
- `upstream/DropdownMenuSubMenu.tsx`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/DropdownMenu
