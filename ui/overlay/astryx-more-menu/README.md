# More Menu

MoreMenu is a three-dot button that opens a list of actions. Use it for secondary actions that don't need to be always visible, like in table rows, card headers, or toolbars.

## Classification

- Category: `overlay` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/MoreMenu.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: MoreMenu is a three-dot button that opens a list of actions.
- Avoid when: Hide primary actions inside a MoreMenu; they should be directly visible.
- Provides: Trigger button, Icon-resolved trigger icon, Caller-rendered trigger content, Menu surface, Pointer action row, Touch action row
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: MoreMenuShowcase, MoreMenuBottomSheet, MoreMenuDefaultMoreMenu, MoreMenuWithDividers, MoreMenuWithSections
- Upstream: Astryx core · Action
- Keywords: moremenu, overflow, kebab, dotmenu, threedot, ellipsis, dropdown, contextmenu, actionmenu

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

- `src/examples/MoreMenuShowcase.tsx` — More Menu: A basic three-dot menu with simple action items. · static: `static/MoreMenuShowcase.html`
- `src/examples/MoreMenuBottomSheet.tsx` — MoreMenu — Bottom Sheet: A visible overflow trigger that opens actions in a BottomSheet. Use this presentation for short action sets on compact touch surfaces. · static: `static/MoreMenuBottomSheet.html`
- `src/examples/MoreMenuDefaultMoreMenu.tsx` — MoreMenu — Default: Basic three-dot overflow menu with simple text-only action items. · static: `static/MoreMenuDefaultMoreMenu.html`
- `src/examples/MoreMenuWithDividers.tsx` — MoreMenu — With Dividers: A three-dot menu with a divider separating destructive actions from safe ones. · static: `static/MoreMenuWithDividers.html`
- `src/examples/MoreMenuWithSections.tsx` — MoreMenu — With Sections: A three-dot menu with actions organized into labeled groups. · static: `static/MoreMenuWithSections.html`

## Documentation

### More Menu

MoreMenu is a three-dot button that opens a list of actions. Use it for secondary actions that don't need to be always visible, like in table rows, card headers, or toolbars.

**Do**

- Use for overflow or secondary actions; keep primary actions visible outside the menu.
- Use dividers or sections to group related actions when the menu has many items.
- Use `presentation="adaptive"` when the visible overflow trigger should open a thumb-reachable BottomSheet on compact touch devices.

**Don't**

- Hide primary actions inside a MoreMenu; they should be directly visible.

**Anatomy**

- Trigger button (required) — Icon-only Button that provides the visible overflow-menu entry point.
- Icon-resolved trigger icon — Default semantic three-dot artwork resolved from the active Icon registry.
- Caller-rendered trigger content — Arbitrary React content supplied directly as the trigger icon override.
- Menu surface (required) — DropdownMenu panel that also carries MoreMenu’s current public target.
- Pointer action row — Action or nested-action trigger row rendered by DropdownMenu in the anchored presentation.
- Touch action row — ListItem button rendered by DropdownMenu in the BottomSheet presentation.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` * | `DropdownMenuOption[]` |  | Menu items: data array of actions, dividers, and sections. Same type as DropdownMenu items prop. |
| `label` | `string` | `'More options'` | Accessible label for the trigger button (aria-label) and tooltip text. |
| `variant` | `ButtonVariant` | `'ghost'` | Visual style variant of the trigger button. |
| `size` | `ButtonSize` | `'md'` | Size of the trigger button. |
| `icon` | `ReactNode` |  | Override the default three-dot icon. Accepts any ReactNode. |
| `isDisabled` | `boolean` | `false` | Whether the menu trigger is disabled. |
| `placement` | `'above' \| 'below' \| 'start' \| 'end'` | `'below'` | Position of the menu relative to the trigger. Logical: start/end resolve against the menu's own inherited direction (RTL mirrors). |
| `alignment` | `'start' \| 'center' \| 'end'` | `'start'` | Alignment along the placement axis. Use 'end' to align the menu with the trigger's trailing edge, which is usually what an overflow menu wants. |
| `presentation` | `'popover' \| 'bottom-sheet' \| 'adaptive'` | `'popover'` | Presentation policy forwarded to DropdownMenu. `adaptive` keeps the anchored popover on pointer-based layouts and uses a BottomSheet at 768px and below when the primary pointer is coarse. |
| `onOpenChange` | `(isOpen: boolean) => void` |  | Callback fired when the menu opens or closes. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value, not an inline style object like style={{}}. |

Styling hook class: `.astryx-more-menu`

### More Menu

MoreMenu is a three-dot button that opens a list of actions. Use it for secondary actions that don't need to be always visible, like in table rows, card headers, or toolbars.

**Do**

- Use for overflow or secondary actions; keep primary actions visible outside the menu.
- Use dividers or sections to group related actions when the menu has many items.
- Use `presentation="adaptive"` when the visible overflow trigger should open a thumb-reachable BottomSheet on compact touch devices.

**Don't**

- Hide primary actions inside a MoreMenu; they should be directly visible.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` * | `DropdownMenuOption[]` |  | 菜单项，由操作、分割线和分组组成的数据数组。类型与 DropdownMenu 的 items 属性相同。 |
| `label` | `string` | `'More options'` | 触发按钮的无障碍标签（aria-label）和工具提示文本。 |
| `variant` | `ButtonVariant` | `'ghost'` | 触发按钮的视觉样式变体。 |
| `size` | `ButtonSize` | `'md'` | 触发按钮的尺寸。 |
| `icon` | `ReactNode` |  | 覆盖默认的三点图标。接受任何 ReactNode。 |
| `isDisabled` | `boolean` | `false` | 菜单触发器是否禁用。 |
| `placement` | `'above' \| 'below' \| 'start' \| 'end'` | `'below'` | 菜单相对于触发按钮的位置。逻辑方向：start/end 依据菜单自身继承的书写方向解析（RTL 自动镜像）。 |
| `alignment` | `'start' \| 'center' \| 'end'` | `'start'` | 沿放置轴的对齐方式。使用 'end' 让菜单与触发器的尾部边缘对齐，这通常是溢出菜单所需的效果。 |
| `presentation` | `'popover' \| 'bottom-sheet' \| 'adaptive'` | `'popover'` | 菜单呈现策略。`adaptive` 在指针布局中使用锚定浮层，在主指针为粗略指针且宽度不超过 768px 时使用 BottomSheet。 |
| `xstyle` | `StyleXStyles` |  | 用于布局自定义的 StyleX 样式（边距、定位、尺寸）。必须是 stylex.create() 的值，不能是内联样式对象如 style={{}}。 |

Styling hook class: `.astryx-more-menu`

## Files

- `src/MoreMenu.doc.mjs`
- `src/MoreMenu.spec.md`
- `src/MoreMenu.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/MoreMenu
