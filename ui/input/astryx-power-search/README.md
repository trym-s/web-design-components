# Power Search

PowerSearch is a structured filter bar where each token represents a field, operator, and value. Use it for complex multi-dimensional filtering when users need to combine multiple search criteria. For simple single-field search, use a text input instead.

## Classification

- Category: `input` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/PowerSearch.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: PowerSearch is a structured filter bar where each token represents a field, operator, and value.
- Avoid when: Use PowerSearch for simple keyword searches; a standard text input is more appropriate for single-field lookups. Wrap a disabled PowerSearch in Tooltip to explain why it is disabled; disabled controls swallow the hover events the wrapper needs. Use the disabledMessage prop instead.
- Provides: PowerSearch, PowerSearch
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: PowerSearchShowcase, PowerSearchContentSearch, PowerSearchFullFeatured, PowerSearchPresetFilters, PowerSearchSearchWithTable
- Upstream: Astryx core · Form Controls
- Keywords: powersearch, search, searchbar, filter, filterbar, faceted, querybuilder, structured, omnibar

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

- `upstream/examples/PowerSearchShowcase.tsx` — Power Search: Token-based filter bar with enum and text fields, pre-populated with sample filters. · static: `static/PowerSearchShowcase.html`
- `upstream/examples/PowerSearchContentSearch.tsx` — PowerSearch — Content Search: Power search with contentSearchFieldKey so free-text input maps to a title field automatically. · static: `static/PowerSearchContentSearch.html`
- `upstream/examples/PowerSearchFullFeatured.tsx` — PowerSearch — Full Featured: Power search with multiple field types: enum, multi-select, entity, and text filters. · static: `static/PowerSearchFullFeatured.html`
- `upstream/examples/PowerSearchPresetFilters.tsx` — PowerSearch — Preset Filters: Power search initialized with pre-set filter tokens for status and priority. · static: `static/PowerSearchPresetFilters.html`
- `upstream/examples/PowerSearchSearchWithTable.tsx` — PowerSearch — Search with Table: Composition of PowerSearch with Table using usePowerSearchConfig to auto-generate config and filter data. · static: `static/PowerSearchSearchWithTable.html`

## Documentation

### Power Search

PowerSearch is a structured filter bar where each token represents a field, operator, and value. Use it for complex multi-dimensional filtering when users need to combine multiple search criteria. For simple single-field search, use a text input instead.

**Do**

- Define clear, descriptive field names and aliases so users can quickly find the filter they need.
- Provide a result count to give users feedback on how their filters affect the data set.

**Don't**

- Use PowerSearch for simple keyword searches; a standard text input is more appropriate for single-field lookups.
- Wrap a disabled PowerSearch in Tooltip to explain why it is disabled; disabled controls swallow the hover events the wrapper needs. Use the disabledMessage prop instead.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `config` * | `PowerSearchConfig` |  | Configuration defining available fields, operators, and their value types. |
| `filters` * | `ReadonlyArray<PowerSearchFilter>` |  | Currently active filters. |
| `onChange` * | `(filters: ReadonlyArray<PowerSearchFilter>, changeType: 'add' \| 'edit' \| 'remove', index: number) => void` |  | Called when filters change. changeType is 'add', 'edit', or 'remove'. index is the affected filter's position. |
| `label` | `string` | `'Search'` | Accessible label for the search input. |
| `isLabelHidden` | `boolean` | `true` | Visually hides the label while keeping it accessible. |
| `placeholder` | `string` | `'Search...'` | Placeholder text shown when no filters are selected. |
| `hasAutoFocus` | `boolean` | `false` | Auto-focus the input on mount. |
| `hasClear` | `boolean` | `true` | Show a clear-all button for removing all filters. |
| `isReadOnly` | `boolean` | `false` | Prevent adding, editing, or removing filters. |
| `isDisabled` | `boolean` | `false` | Disables the entire component. |
| `disabledMessage` | `string` |  | Explains why the search is disabled. With isDisabled, shows a tooltip on hover/keyboard focus and keeps the input focusable via aria-disabled (input stays blocked). Use this instead of wrapping a disabled PowerSearch in Tooltip. Disabled controls swallow the hover events an external Tooltip needs. |
| `status` | `{type: 'warning' \| 'error' \| 'success', message?: string}` |  | Validation status object with type and optional message. |
| `startIcon` | `ReactNode \| IconType` |  | Icon to display at the start of the input, before any filter tokens. Forwarded to the internal Tokenizer. Accepts a semantic icon name, an SVG icon component, or a ReactNode directly. |
| `statusVariant` | `'attached' \| 'detached'` | `'attached'` | How the status message is placed relative to the input. attached overlaps directly below the input (bordered treatment); detached floats below as a separate element with spacing. |
| `maxTokenLength` | `number` | `40` | Max character length for filter value display in tokens. |
| `maxOperatorMenuItems` | `number` | `10` | Maximum suggestions shown in string and entity value typeaheads. Does not affect the main field search menu or enum value menus. |
| `maxSearchResults` | `number` | `10` | Max ranked results for a non-empty query. Does not affect a field value editor. Browsing with an empty query shows up to 1,000 fields. |
| `menuWidth` | `number` |  | Width in pixels for the main field/search menu. Does not affect field value editors. |
| `popoverSaveButtonLabel` | `string` | `'Apply'` | Label for the save button in the edit popover. |
| `timezoneID` | `string` |  | Timezone ID for date formatting (e.g. "America/New_York"). |
| `handleRef` | `Ref<PowerSearchHandle>` |  | Imperative handle with focusTypeahead() and blurTypeahead() methods. |
| `endContent` | `ReactNode` |  | Content to display at the end of the input row. Useful for action buttons or other controls. |
| `resultCount` | `number \| string` |  | Number of results matching the current filters. When a number, formatted as "N results". When a string, displayed as-is. Changes are announced to screen readers via a polite live region. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the search input and tokens. |
| `menuWidth` | `number` |  | Maximum width for the operator/value dropdown menu in pixels. |
| `maxOperatorMenuItems` | `number` |  | Maximum number of items displayed in the operator dropdown. |
| `tokenOverflowBehavior` | `'none' \| 'unfocusedInline' \| 'unfocusedLayer'` | `'none'` | Controls how tokens overflow when the container is too narrow. Forwarded to Tokenizer. |
| `onFocus` | `(e: React.FocusEvent) => void` |  | Fires when focus enters the search input. |
| `onBlur` | `(e: React.FocusEvent) => void` |  | Fires when focus leaves the search input. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization. Must be a stylex.create() value. |

Styling hook class: `.astryx-power-search`

### Power Search

PowerSearch is a structured filter bar where each token represents a field, operator, and value. Use it for complex multi-dimensional filtering when users need to combine multiple search criteria. For simple single-field search, use a text input instead.

**Do**

- Define clear, descriptive field names and aliases so users can quickly find the filter they need.
- Provide a result count to give users feedback on how their filters affect the data set.

**Don't**

- Use PowerSearch for simple keyword searches; a standard text input is more appropriate for single-field lookups.
- Wrap a disabled PowerSearch in Tooltip to explain why it is disabled; disabled controls swallow the hover events the wrapper needs. Use the disabledMessage prop instead.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `config` * | `PowerSearchConfig` |  | 定义可用字段、运算符及其值类型的配置。 |
| `filters` * | `ReadonlyArray<PowerSearchFilter>` |  | 当前活跃的过滤器。 |
| `onChange` * | `(filters: ReadonlyArray<PowerSearchFilter>, changeType: 'add' \| 'edit' \| 'remove', index: number) => void` |  | 当过滤器变更时调用。changeType 为 'add'、'edit' 或 'remove'。index 为受影响的过滤器位置。 |
| `label` | `string` | `'Search'` | 搜索输入框的无障碍标签。 |
| `isLabelHidden` | `boolean` | `true` | 视觉上隐藏标签，同时保持无障碍性。 |
| `placeholder` | `string` | `'Search...'` | 未选择过滤器时显示的占位文本。 |
| `hasAutoFocus` | `boolean` | `false` | 挂载时自动聚焦输入框。 |
| `hasClear` | `boolean` | `true` | 显示清除全部按钮以移除所有过滤器。 |
| `isReadOnly` | `boolean` | `false` | 阻止添加、编辑或移除过滤器。 |
| `isDisabled` | `boolean` | `false` | 禁用整个组件。 |
| `disabledMessage` | `string` |  | Explains why the search is disabled. With isDisabled, shows a tooltip on hover/keyboard focus and keeps the input focusable via aria-disabled (input stays blocked). Use this instead of wrapping a disabled PowerSearch in Tooltip. Disabled controls swallow the hover events an external Tooltip needs. |
| `status` | `{type: 'warning' \| 'error' \| 'success', message?: string}` |  | 带有类型和可选消息的验证状态对象。 |
| `startIcon` | `ReactNode \| IconType` |  | 在输入框开头（筛选 token 之前）显示的图标，转发给内部的 Tokenizer。接受语义图标名称、SVG 图标组件或直接传入 ReactNode。 |
| `statusVariant` | `'attached' \| 'detached'` | `'attached'` | 状态消息相对于输入框的放置方式。attached 直接叠加在输入框下方（带边框处理）；detached 作为独立元素浮于下方并留有间距。 |
| `maxTokenLength` | `number` | `40` | 令牌中过滤器值显示的最大字符长度。 |
| `maxOperatorMenuItems` | `number` | `10` | 字符串和实体值预输入菜单中显示的最大建议数。不影响主字段搜索菜单或枚举值菜单。 |
| `maxSearchResults` | `number` | `10` | 非空查询的最大排名结果数。不影响字段值编辑器。使用空查询浏览时最多显示 1,000 个字段。 |
| `menuWidth` | `number` |  | 主字段/搜索菜单的像素宽度。不影响字段值编辑器。 |
| `popoverSaveButtonLabel` | `string` | `'Apply'` | 编辑弹出窗口中保存按钮的标签。 |
| `timezoneID` | `string` |  | 用于日期格式化的时区 ID（例如 "America/New_York"）。 |
| `handleRef` | `Ref<PowerSearchHandle>` |  | 提供 focusTypeahead() 和 blurTypeahead() 方法的命令式句柄。 |
| `endContent` | `ReactNode` |  | 显示在输入行末尾的内容。适用于操作按钮或其他控件。 |
| `resultCount` | `number \| string` |  | 匹配当前过滤器的结果数量。数字类型时格式化为"N results"。字符串类型时按原样显示。数量变化会通过 polite 实时区域向屏幕阅读器播报。 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 搜索输入框和标记的尺寸。 |
| `xstyle` | `StyleXStyles` |  | 用于布局自定义的 StyleX 样式。必须是 stylex.create() 值。 |

## Files

- `upstream/PowerSearch.doc.mjs`
- `upstream/PowerSearch.spec.md`
- `upstream/PowerSearch.tsx`
- `upstream/PowerSearchEditPopover.tsx`
- `upstream/PowerSearchFilterEditor.tsx`
- `upstream/PowerSearchToken.tsx`
- `upstream/PowerSearchValueEditor.tsx`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/PowerSearch
