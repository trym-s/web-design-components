# Tokenizer

Tokenizer is a multi-select input that lets users search, select, and manage multiple items displayed as removable chips. Use it when users need to build a set of selections from a searchable data source, like adding team members, applying tags, or choosing filters.

## Classification

- Category: `input` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/Tokenizer.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Tokenizer is a multi-select input that lets users search, select, and manage multiple items displayed as removable chips.
- Avoid when: Don't use Tokenizer for single-item selection; use Typeahead instead. Tokenizer is for building sets of two or more items. Avoid applying custom colors to individual tokens inside a Tokenizer; use the default token style for visual consistency across the set. Don't hide the label; every Tokenizer needs a visible label so users understand what they are selecting. Use isLabelHidden only when surrounding context makes the purpose obvious. Wrap a disabled Tokenizer in Tooltip to explain why it is disabled; disabled controls swallow the hover events the wrapper needs. Use the disabledMessage prop instead.
- Provides: Label, Token chips, Search input, Dropdown menu, Spinner, End content, Clear button
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: TokenizerShowcase, TokenizerClear, TokenizerCreatable, TokenizerEndContent, TokenizerIcon, TokenizerMaxEntries, TokenizerOverflow, TokenizerStates
- Upstream: Astryx core · Form Controls
- Keywords: tokenizer, multiselect, multi-select, chips, tags, combobox, autocomplete, taginput, chipinput

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

- `upstream/examples/TokenizerShowcase.tsx` — Tokenizer: A tokenizer with preset tags and search source. · static: `static/TokenizerShowcase.html`
- `upstream/examples/TokenizerClear.tsx` — Tokenizer — Clear: Tokenizer with a built-in clear-all button for bulk removal of all selected tokens. · static: `static/TokenizerClear.html`
- `upstream/examples/TokenizerCreatable.tsx` — Tokenizer — Creatable: Free-text tokenizer for creating custom tags and a combined create-or-search pattern. Use when users need to enter values that may not exist in a predefined list. · static: `static/TokenizerCreatable.html`
- `upstream/examples/TokenizerEndContent.tsx` — Tokenizer — End Content: Tokenizer with an action button in the end slot. Use for inline actions like applying selections alongside the input. · static: `static/TokenizerEndContent.html`
- `upstream/examples/TokenizerIcon.tsx` — Tokenizer — Icon: Tokenizer with a leading search icon to visually reinforce the search behavior. · static: `static/TokenizerIcon.html`
- `upstream/examples/TokenizerMaxEntries.tsx` — Tokenizer — Max Entries: Tokenizer with a maximum selection limit. The input hides automatically when the limit is reached, preventing further additions. · static: `static/TokenizerMaxEntries.html`
- `upstream/examples/TokenizerOverflow.tsx` — Tokenizer — Overflow: Tokenizer with overflow truncation when unfocused. Inline mode pushes content down on expand; layer mode overlays without shifting layout. · static: `static/TokenizerOverflow.html`
- `upstream/examples/TokenizerStates.tsx` — Tokenizer — States: Tokenizer in disabled, error, warning, and success states. Use to communicate validation feedback or lock a selection from editing. · static: `static/TokenizerStates.html`

## Documentation

### Tokenizer

Tokenizer is a multi-select input that lets users search, select, and manage multiple items displayed as removable chips. Use it when users need to build a set of selections from a searchable data source, like adding team members, applying tags, or choosing filters.

**Do**

- Write a placeholder that tells users what they can search for, such as "Search people..." or "Add tags...", so the input is not a blank mystery.
- Set maxEntries when the number of selections should be bounded, like limiting a review to 5 approvers.
- Use hasCreate for free-form tagging where users need to enter values that do not exist in the search source.
- Show validation status with the status prop so users know immediately when a selection is missing or invalid.

**Don't**

- Don't use Tokenizer for single-item selection; use Typeahead instead. Tokenizer is for building sets of two or more items.
- Avoid applying custom colors to individual tokens inside a Tokenizer; use the default token style for visual consistency across the set.
- Don't hide the label; every Tokenizer needs a visible label so users understand what they are selecting. Use isLabelHidden only when surrounding context makes the purpose obvious.
- Wrap a disabled Tokenizer in Tooltip to explain why it is disabled; disabled controls swallow the hover events the wrapper needs. Use the disabledMessage prop instead.

**Anatomy**

- Label (required) — The visible text above the input describing what the user is selecting. Also used as the accessible name.
- Token chips — Removable chips representing each selected item. Each chip shows a label and a remove button.
- Search input (required) — The text input where users type to search the data source. Hides when maxEntries is reached.
- Dropdown menu — The search results list that appears below the input as the user types.
- Spinner — Loading indicator shown at the end of the field while a search is in flight.
- End content — A trailing slot after the input for action buttons, counts, or other controls.
- Clear button — A button that removes all selected tokens at once. Shown when hasClear is true and tokens are present.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `string` |  | Accessible label for the input. |
| `searchSource` * | `SearchSource<T>` |  | Data source providing search and bootstrap methods for populating the dropdown. |
| `value` * | `T[]` |  | Array of currently selected items. |
| `onChange` * | `(items: T[], change: TokenizerChange<T>) => void` |  | Called when selection changes. The change argument includes the affected item and type ('add' \| 'create' \| 'remove' \| 'reorder'). Additions and removals (including Backspace on an empty input) are announced to screen readers via a polite live region. |
| `placeholder` | `string` |  | Input placeholder text. Only shown when no tokens are selected. |
| `maxEntries` | `number` |  | Maximum number of selections allowed. Input is hidden when the limit is reached. |
| `hasClear` | `boolean` | `false` | Show a clear-all button for bulk removal of all tokens. |
| `renderToken` | `(item: T, onRemove: () => void) => ReactNode` |  | Custom render function for selected tokens. Default renders Token with label and onRemove. |
| `renderItem` | `(item: T) => ReactNode` |  | Custom render function for dropdown items. Default renders TypeaheadItem. |
| `isDisabled` | `boolean` | `false` | Disables the input and all token interactions. |
| `htmlName` | `string` |  | The HTML name attribute for form submissions. Renders one hidden input per selected item id. |
| `disabledMessage` | `string` |  | Explains why the tokenizer is disabled. With isDisabled, shows a tooltip on hover/keyboard focus and keeps the input focusable via aria-disabled (input stays blocked). Use this instead of wrapping a disabled Tokenizer in Tooltip. Disabled controls swallow the hover events an external Tooltip needs. |
| `status` | `{type: 'warning' \| 'error' \| 'success', message?: string}` |  | Validation status object with type and message for error/warning/success states. |
| `statusVariant` | `'attached' \| 'detached'` | `'attached'` | How the status message is placed relative to the input. attached overlaps directly below the input (bordered treatment); detached floats below as a separate element with spacing. |
| `isLabelHidden` | `boolean` | `false` | Visually hides the label while keeping it accessible. |
| `description` | `string` |  | Helper text displayed below the label. |
| `isRequired` | `boolean` | `false` | Marks the field as required. |
| `isOptional` | `boolean` | `false` | Shows an optional indicator on the label. |
| `labelTooltip` | `string` |  | Tooltip text shown on the label. |
| `hasEntriesOnFocus` | `boolean` | `false` | Show bootstrap results on focus before typing. |
| `maxMenuItems` | `number` | `10` | Maximum number of search results to display. The hasCreate entry is offered on top of them, so a menu can show one more than this. |
| `menuWidth` | `number` |  | Fixed dropdown width in pixels. The menu never shrinks below its anchor width. |
| `minQueryLength` | `number` | `1` | Minimum query length before the search source is queried. Below it no search runs, and the menu stays closed — unless hasCreate is set, in which case the "Create ..." entry is still offered, being derived from the typed text rather than fetched for it. |
| `emptySearchResultsText` | `string` | `'No results found'` | Text shown when search returns no results. |
| `hasAutoFocus` | `boolean` | `false` | Auto-focus the input on mount. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Input and token size. |
| `debounceMs` | `number` | `150` | Debounce delay in ms before triggering search. Set to 0 for synchronous sources. |
| `hasCreate` | `boolean` | `false` | Allow users to create new tokens from free-text input. When true, a "Create" option appears in the dropdown for typed text that doesn't match existing results. The onChange change type is 'create' for these items. |
| `onChangeQuery` | `(query: string) => void` |  | Callback fired when the search query text changes. |
| `startIcon` | `ReactNode \| IconType` |  | Icon to display at the start of the input, before any tokens. Accepts a semantic icon name, an SVG icon component, or a ReactNode directly. |
| `endContent` | `ReactNode` |  | Content to display at the end of the input row. Useful for buttons, result counts, or other controls. |
| `handleRef` | `React.Ref<TokenizerHandle>` |  | Imperative handle exposing focusInput(), focusFirstToken(), focusLastToken(), clearInput(), and selectAll(). |
| `width` | `SizeValue` |  | Width of the field (number = pixels, string used as-is, e.g. "100%"). Sizes the whole field (label, control, and status) so they stay aligned. |
| `tokenOverflowBehavior` | `'none' \| 'unfocusedInline' \| 'unfocusedLayer'` | `'none'` | Controls how tokens overflow when the container is too narrow. |
| `onFocus` | `(e: FocusEvent<HTMLInputElement>) => void` |  | Fires when focus enters the tokenizer input. |
| `onBlur` | `(e: FocusEvent<HTMLInputElement>) => void` |  | Fires when focus leaves the tokenizer input. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value; not an inline style object like style={{}}. |

Styling hook class: `.astryx-tokenizer`

### Tokenizer

Tokenizer is a multi-select input that lets users search, select, and manage multiple items displayed as removable chips. Use it when users need to build a set of selections from a searchable data source, like adding team members, applying tags, or choosing filters.

**Do**

- Write a placeholder that tells users what they can search for, such as "Search people..." or "Add tags...", so the input is not a blank mystery.
- Set maxEntries when the number of selections should be bounded, like limiting a review to 5 approvers.
- Use hasCreate for free-form tagging where users need to enter values that do not exist in the search source.
- Show validation status with the status prop so users know immediately when a selection is missing or invalid.

**Don't**

- Don't use Tokenizer for single-item selection; use Typeahead instead. Tokenizer is for building sets of two or more items.
- Avoid applying custom colors to individual tokens inside a Tokenizer; use the default token style for visual consistency across the set.
- Don't hide the label; every Tokenizer needs a visible label so users understand what they are selecting. Use isLabelHidden only when surrounding context makes the purpose obvious.
- Wrap a disabled Tokenizer in Tooltip to explain why it is disabled; disabled controls swallow the hover events the wrapper needs. Use the disabledMessage prop instead.

**Anatomy**

- Label (required) — The visible text above the input describing what the user is selecting. Also used as the accessible name.
- Token chips — Removable chips representing each selected item. Each chip shows a label and a remove button.
- Search input (required) — The text input where users type to search the data source. Hides when maxEntries is reached.
- Dropdown menu — The search results list that appears below the input as the user types.
- Spinner — Loading indicator shown at the end of the field while a search is in flight.
- End content — A trailing slot after the input for action buttons, counts, or other controls.
- Clear button — A button that removes all selected tokens at once. Shown when hasClear is true and tokens are present.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `string` |  | 输入框的无障碍标签。 |
| `searchSource` * | `SearchSource<T>` |  | 提供搜索和引导方法的数据源，用于填充下拉列表。 |
| `value` * | `T[]` |  | 当前已选项目的数组。 |
| `onChange` * | `(items: T[], change: TokenizerChange<T>) => void` |  | 选择变更时调用。change 参数包含受影响的项目和类型（'add' \| 'create' \| 'remove' \| 'reorder'）。 |
| `placeholder` | `string` |  | 输入框占位文本。仅在未选择任何标记时显示。 |
| `maxEntries` | `number` |  | 允许的最大选择数量。达到限制时输入框会隐藏。 |
| `hasClear` | `boolean` | `false` | 显示全部清除按钮，用于批量移除所有标记。 |
| `renderToken` | `(item: T, onRemove: () => void) => ReactNode` |  | 已选标记的自定义渲染函数。默认渲染带有 label 和 onRemove 的 Token。 |
| `renderItem` | `(item: T) => ReactNode` |  | 下拉列表项的自定义渲染函数。默认渲染 TypeaheadItem。 |
| `isDisabled` | `boolean` | `false` | 禁用输入框和所有标记交互。 |
| `htmlName` | `string` |  | 用于表单提交的 HTML name 属性。为每个已选项目的 id 渲染一个隐藏输入。 |
| `disabledMessage` | `string` |  | Explains why the tokenizer is disabled. With isDisabled, shows a tooltip on hover/keyboard focus and keeps the input focusable via aria-disabled (input stays blocked). Use this instead of wrapping a disabled Tokenizer in Tooltip. Disabled controls swallow the hover events an external Tooltip needs. |
| `status` | `{type: 'warning' \| 'error' \| 'success', message?: string}` |  | 验证状态对象，包含类型和消息，用于错误/警告/成功状态。 |
| `statusVariant` | `'attached' \| 'detached'` | `'attached'` | 状态消息相对于输入框的放置方式。attached 直接叠加在输入框下方（带边框处理）；detached 作为独立元素浮于下方并留有间距。 |
| `isLabelHidden` | `boolean` | `false` | 视觉隐藏标签，同时保持其可访问性。 |
| `description` | `string` |  | 显示在标签下方的辅助文本。 |
| `isRequired` | `boolean` | `false` | 将字段标记为必填。 |
| `isOptional` | `boolean` | `false` | 在标签上显示可选指示器。 |
| `labelTooltip` | `string` |  | 标签上显示的工具提示文本。 |
| `hasEntriesOnFocus` | `boolean` | `false` | 聚焦时在输入前显示引导结果。 |
| `maxMenuItems` | `number` | `10` | 下拉列表显示的最大搜索结果数。“创建 ...”条目会在此之外额外提供，因此菜单可能比该数量多显示一项。 |
| `menuWidth` | `number` |  | 下拉菜单的固定像素宽度。菜单不会小于其锚点宽度。 |
| `minQueryLength` | `number` | `1` | 查询搜索源前的最小查询长度。低于该长度不会发起搜索，菜单保持关闭；但设置 hasCreate 时仍会提供“创建 ...”条目——该条目由输入的文本推导而来，并非通过搜索获取。 |
| `emptySearchResultsText` | `string` | `'No results found'` | 搜索无结果时显示的文本。 |
| `hasAutoFocus` | `boolean` | `false` | 挂载时自动聚焦输入框。 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 输入框和标记的尺寸。 |
| `debounceMs` | `number` | `150` | 触发搜索前的防抖延迟（毫秒）。同步数据源设置为 0。 |
| `onChangeQuery` | `(query: string) => void` |  | 搜索查询文本变更时触发的回调。 |
| `startIcon` | `ReactNode \| IconType` |  | 在输入框开头（token 之前）显示的图标。接受语义图标名称、SVG 图标组件或直接传入 ReactNode。 |
| `endContent` | `ReactNode` |  | 在输入行末尾显示的内容。适用于按钮、结果计数或其他控件。 |
| `handleRef` | `React.Ref<TokenizerHandle>` |  | 用于 focus() 和 blur() 控制的命令式句柄。 |
| `xstyle` | `StyleXStyles` |  | 用于布局自定义的 StyleX 样式（外边距、定位、尺寸）。必须是 stylex.create() 的值; 不能是内联样式对象如 style={{}}。 |

Styling hook class: `.astryx-tokenizer`

## Files

- `upstream/Tokenizer.doc.mjs`
- `upstream/Tokenizer.spec.md`
- `upstream/Tokenizer.tsx`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Tokenizer
