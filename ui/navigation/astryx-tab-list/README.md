# Tab List

TabList provides tab-style navigation for organizing content into categorized sections. Use it to let users switch between related views without leaving the page, with overflow items handled by a built-in "more" menu.

## Classification

- Category: `navigation` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/TabList.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: TabList provides tab-style navigation for organizing content into categorized sections.
- Avoid when: Use tabs for sequential steps or workflows; use a stepper or wizard pattern instead. Place more than 6–8 visible tabs before the overflow menu; prioritize the most important categories. Confuse TabList with SegmentedControl or ToggleButton. TabList is for navigation between views. SegmentedControl and ToggleButton are input controls: SegmentedControl always has exactly one selected option, while ToggleButton can be toggled on or off.
- Provides: Left Content, Center-Fill Content, Right Content
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: TabListShowcase, TabMenuShowcase, TabShowcase, TabListTabsFillLayout, TabListTabsWithActions, TabListTabsWithBadge, TabListTabsWithIcons, TabListTabsWithMenu, TabListTabsWithStatusDot, TabMenuBasic, TabWithSelectedIcon
- Upstream: Astryx core · Navigation
- Keywords: tabs, tabbar, tabstrip, navigation, tabpanel, tabgroup, segmented, navtabs, tab

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

- `src/examples/TabListShowcase.tsx` — Tab List · static: `static/TabListShowcase.html`
- `src/examples/TabMenuShowcase.tsx` — Tab Menu: TabMenu is an overflow menu within a TabList that groups additional tab options into a dropdown, showing the selected option's label as the trigger text. · static: `static/TabMenuShowcase.html`
- `src/examples/TabShowcase.tsx` — Tab: Tab is an individual tab item within a TabList, supporting labels, icons, selected icons, and end content slots. · static: `static/TabShowcase.html`
- `src/examples/TabListTabsFillLayout.tsx` — TabList — Fill Layout: Tabs that stretch to fill the available width with a bottom divider. · static: `static/TabListTabsFillLayout.html`
- `src/examples/TabListTabsWithActions.tsx` — TabList — With Actions: Page header pattern with tabs on the left and action buttons pushed to the right. When hasDivider is true, match the Button size to the TabList size so the tabs and actions align to a shared baseline above the divider. · static: `static/TabListTabsWithActions.html`
- `src/examples/TabListTabsWithBadge.tsx` — TabList — With Badge: Tabs with notification badge counts rendered via endContent. Uses error variant for urgent counts and neutral for informational ones. · static: `static/TabListTabsWithBadge.html`
- `src/examples/TabListTabsWithIcons.tsx` — TabList — With Icons: Tabs with leading icons alongside text labels. · static: `static/TabListTabsWithIcons.html`
- `src/examples/TabListTabsWithMenu.tsx` — TabList — With Overflow Menu: Tab list with a dropdown menu for additional items that do not fit inline. · static: `static/TabListTabsWithMenu.html`
- `src/examples/TabListTabsWithStatusDot.tsx` — TabList — With Status Dot: Tabs with status dot indicators rendered via endContent to show live environment health at a glance. · static: `static/TabListTabsWithStatusDot.html`
- `src/examples/TabMenuBasic.tsx` — TabMenu — Basic: An overflow menu at the end of a TabList that collects secondary tabs behind a dropdown. Use it when there are more tabs than fit comfortably inline. · static: `static/TabMenuBasic.html`
- `src/examples/TabWithSelectedIcon.tsx` — Tab — Selected Icon: A tab that changes its icon when selected. · static: `static/TabWithSelectedIcon.html`

## Documentation

### Tab List

TabList provides tab-style navigation for organizing content into categorized sections. Use it to let users switch between related views without leaving the page, with overflow items handled by a built-in "more" menu.

**Do**

- Keep tab labels short and descriptive so users can quickly scan available sections.
- Leave overflow handling on: a strip narrower than its tabs scrolls, and the selected tab is kept in view. Use TabMenu when you want a curated group of extra options rather than a scrolling strip.
- When using hasDivider with action buttons alongside tabs, match the Button size to the TabList size (both md, both sm); the divided tab strip reserves space so tabs and same-size buttons align to a shared baseline above the rail.
- Reach for role="tablist" when the strip switches panels in place, and give each tab a panelId pointing at the panel it opens: that link is how a screen reader gets from a tab to its content. Leave it off for navigation between views.
- Set isFullBleed to stretch a tab bar inside a padded LayoutHeader, Card, or Section to the container's inline content edges, instead of reaching for negative-margin CSS.

**Don't**

- Use tabs for sequential steps or workflows; use a stepper or wizard pattern instead.
- Place more than 6–8 visible tabs before the overflow menu; prioritize the most important categories.
- Confuse TabList with SegmentedControl or ToggleButton. TabList is for navigation between views. SegmentedControl and ToggleButton are input controls: SegmentedControl always has exactly one selected option, while ToggleButton can be toggled on or off.

**Anatomy**

- Left Content — Most important area; hugs content width.
- Center-Fill Content — Stretches to fill available space.
- Right Content — Hugs content width.

**Accessibility**

- Tab label — WCAG 1.4.3 Contrast (Minimum) (4.5:1): Each label must have at least 4.5:1 contrast with the tab surface behind it. For Hover and Pointer down, measure the final background after the overlay layer is applied.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` * | `string` |  | The currently selected tab value. |
| `onChange` * | `(value: string) => void` |  | Callback fired when a tab is selected. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant applied to all child tabs. |
| `layout` | `'hug' \| 'fill'` | `'hug'` | Layout mode for tab sizing. 'hug': each tab hugs its content width. 'fill': tabs stretch equally to fill the container width. |
| `hasDivider` | `boolean` | `false` | Whether to show a bottom border divider under the tab list. |
| `isFullBleed` | `boolean` | `false` | Makes the tab strip escape its parent's container padding, extending to the container's content edges (cancels the nearest padded Layout container's --container-padding-* custom properties with negative margins). The inner strip pads back by the portion of the container inset that is not already supplied by the first or last tab stop, keeping edge labels aligned while a hasDivider underline spans the full content width. Matches Divider's isFullBleed: inline (start/end) edges only; block-edge docking stays with the surrounding layout. |
| `role` | `AriaRole` |  | ARIA role for the strip. 'tablist' asks for the WAI-ARIA tabs pattern: role="tablist" / role="tab" and aria-selected, with each tab pointing at the panel it controls via its panelId; only tabs may live in a tablist strip, and an href on a tab is ignored there. Left unset, the strip is a nav landmark marking the current tab with aria-current. Any other value is passed through to the element unchanged. |
| `overflow` | `'auto' \| 'scroll' \| 'visible'` | `'auto'` | What happens when the tabs are wider than the strip. 'auto' lets the component choose, which today always scrolls. 'scroll' scrolls the tabs horizontally, with edge fades and arrow affordances for pointers that can hover. 'visible' turns overflow handling off and lets the tabs spill out of the strip. The selected tab is always scrolled back into view. |
| `children` * | `ReactNode` |  | Tab and TabMenu items to render inside the strip. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value: not an inline style object like style={{}}. |

Styling hook class: `.astryx-tab-list`, `.astryx-tab-strip`, `.astryx-tab-scroll-button`, `.astryx-tab`, `.astryx-tab-indicator`, `.astryx-tab-menu`, `.astryx-tab-menu-dropdown`, `.astryx-tab-menu-item`

### Tab

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` * | `string` |  | Unique value for this tab, matched against TabListContext.value. |
| `label` * | `string` |  | Accessible label for this tab. Used as visible text by default, or as aria-label when isLabelHidden is true. |
| `isLabelHidden` | `boolean` | `false` | Whether the label is visually hidden. When true, only the icon and endContent are displayed, and label is used as aria-label for accessibility. |
| `href` | `string` |  | URL to navigate to; when provided, the tab renders as an anchor element. Ignored in a TabList given an explicit role="tablist". |
| `panelId` | `string` |  | Id of the panel this tab controls, wired up as aria-controls where the TabList speaks the tabs pattern. Put the same id on the panel element. No effect under the navigation pattern, and a development warning says so. |
| `as` | `LinkComponentType` |  | Custom component to render instead of <a> for link tabs. Overrides the LinkProvider default. Only applies when href is provided. |
| `icon` | `ReactNode` |  | Icon element shown when the tab is not selected. |
| `selectedIcon` | `ReactNode` |  | Icon element shown when the tab is selected; falls back to icon if not provided. |
| `endContent` | `ReactNode` |  | Content rendered after the label, such as a badge count or status dot. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value: not an inline style object like style={{}}. |

### Tab

### Tab

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` * | `string` |  | 此标签的唯一值，与 TabListContext.value 进行匹配。 |
| `label` * | `string` |  | 此标签的无障碍标签。默认作为可见文本使用；当 isLabelHidden 为 true 时用作 aria-label。 |
| `isLabelHidden` | `boolean` | `false` | 是否在视觉上隐藏标签。为 true 时，仅显示图标和 endContent，并将 label 用作无障碍 aria-label。 |
| `href` | `string` |  | 要导航到的 URL；提供时，标签渲染为锚点元素。 |
| `panelId` | `string` |  | Id of the panel this tab controls, wired up as aria-controls where the TabList speaks the tabs pattern. Put the same id on the panel element. No effect under the navigation pattern, and a development warning says so. |
| `as` | `LinkComponentType` |  | 用于替代 <a> 渲染链接标签的自定义组件。覆盖 LinkProvider 的默认值。仅在提供 href 时生效。 |
| `icon` | `ReactNode` |  | 标签未选中时显示的图标元素。 |
| `selectedIcon` | `ReactNode` |  | 标签选中时显示的图标元素；未提供时回退到 icon。 |
| `endContent` | `ReactNode` |  | 在标签文本之后渲染的内容，例如徽章计数或状态点。 |
| `xstyle` | `StyleXStyles` |  | StyleX 样式，用于布局自定义（边距、定位、尺寸）。必须是 stylex.create() 的值，而非内联样式对象如 style={{}}。 |

### Tab Menu

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `string` |  | Label for the trigger button (shown when no option is selected) and the dropdown heading divider. |
| `options` * | `TabMenuOption[]` |  | Array of menu options rendered in the dropdown. |

### Tab Menu

### Tab Menu

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `string` |  | 触发器按钮的标签（无选项选中时显示）以及下拉菜单标题分隔线的文本。 |
| `options` * | `TabMenuOption[]` |  | 在下拉菜单中渲染的菜单选项数组。 |

## Files

- `src/Tab.doc.mjs`
- `src/Tab.tsx`
- `src/TabList.doc.mjs`
- `src/TabList.spec.md`
- `src/TabList.tsx`
- `src/TabListContext.ts`
- `src/TabMenu.doc.mjs`
- `src/TabMenu.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/TabList
