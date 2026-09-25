# Typeahead

A searchable input for selecting a single item from a large or dynamic dataset. Results appear as the user types, with support for async data sources, debounced search, and custom item rendering. Use it when the option list is too large for a Selector dropdown.

## Classification

- Category: `input` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/Typeahead.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: A searchable input for selecting a single item from a large or dynamic dataset.
- Avoid when: Use for short, static option lists; use Selector for better discoverability. Use for multi-selection; use Tokenizer instead. Place multiple Typeaheads adjacent to each other without clear labels differentiating them. Wrap a disabled Typeahead in Tooltip to explain why it is disabled; disabled triggers swallow the hover events the wrapper needs. Use the disabledMessage prop instead.
- Provides: Field, Input surface, Icon-rendered start icon, Caller-rendered start content, Selected token, Spinner, Clear button, Dropdown, Empty state, Result row, Default item content, Caller-rendered item content, Result group heading, Selected result state
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: BaseTypeaheadShowcase, TypeaheadItemShowcase, TypeaheadShowcase, BaseTypeaheadCustomSearch, TypeaheadItemBasic, TypeaheadLimitedResults, TypeaheadSearchField, TypeaheadWithHelperText, TypeaheadWithValidation
- Upstream: Astryx core · Form Controls
- Keywords: typeahead, autocomplete, combobox, searchbox, autosuggest, select, dropdown, lookup, searchable, suggestion, picker

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

- `src/examples/BaseTypeaheadShowcase.tsx` — Base Typeahead: A custom result renderer that adds supporting metadata while BaseTypeahead retains option semantics and keyboard behavior. · static: `static/BaseTypeaheadShowcase.html`
- `src/examples/TypeaheadItemShowcase.tsx` — Typeahead Item: Typeahead with custom item rendering using TypeaheadItem for avatars and descriptions. · static: `static/TypeaheadItemShowcase.html`
- `src/examples/TypeaheadShowcase.tsx` — Typeahead · static: `static/TypeaheadShowcase.html`
- `src/examples/BaseTypeaheadCustomSearch.tsx` — BaseTypeahead — Custom Search Bar: BaseTypeahead embedded inside a custom-styled wrapper. The wrapper provides its own border and icon chrome; anchorRef positions the dropdown relative to it. Use this pattern when Typeahead's built-in field layout does not fit your composition. · static: `static/BaseTypeaheadCustomSearch.html`
- `src/examples/TypeaheadItemBasic.tsx` — TypeaheadItem — Basic: A typeahead whose results are rendered with TypeaheadItem, adding a secondary description below each label. Use inside renderItem to keep custom results visually consistent. · static: `static/TypeaheadItemBasic.html`
- `src/examples/TypeaheadLimitedResults.tsx` — Typeahead — Limited Results: Typeahead with a capped dropdown showing at most three results. · static: `static/TypeaheadLimitedResults.html`
- `src/examples/TypeaheadSearchField.tsx` — Typeahead — Search Field: Search input with icon and suggestions on focus. · static: `static/TypeaheadSearchField.html`
- `src/examples/TypeaheadWithHelperText.tsx` — Typeahead — With Helper Text: Typeahead with a description below the label. · static: `static/TypeaheadWithHelperText.html`
- `src/examples/TypeaheadWithValidation.tsx` — Typeahead — With Validation: Typeahead with an error validation message. · static: `static/TypeaheadWithValidation.html`

## Documentation

### Typeahead

A searchable input for selecting a single item from a large or dynamic dataset. Results appear as the user types, with support for async data sources, debounced search, and custom item rendering. Use it when the option list is too large for a Selector dropdown.

**Do**

- Provide descriptive placeholder text that hints at what users can search for.
- Show suggestions on focus when users benefit from seeing popular or recent options before typing.
- Add a search delay for remote data sources to avoid excessive network requests.
- Use inside InputGroup when the typeahead needs a single-line prefix or suffix addon.

**Don't**

- Use for short, static option lists; use Selector for better discoverability.
- Use for multi-selection; use Tokenizer instead.
- Place multiple Typeaheads adjacent to each other without clear labels differentiating them.
- Wrap a disabled Typeahead in Tooltip to explain why it is disabled; disabled triggers swallow the hover events the wrapper needs. Use the disabledMessage prop instead.

**Anatomy**

- Field — Standalone Field shell that provides the label and optional supporting content; omitted inside InputGroup.
- Input surface (required) — Painted control surface containing the editable input or the selected token.
- Icon-rendered start icon — Optional leading semantic icon or icon component rendered through Icon.
- Caller-rendered start content — Optional arbitrary React content rendered directly at the start of the input surface.
- Selected token — Token that presents the selected item while the control is not in edit mode.
- Spinner — Loading indicator shown at the end of the input surface while a search is in flight.
- Clear button — Shared clear action that removes the selected item when hasClear is enabled.
- Dropdown — Anchored listbox surface containing the current search results.
- Empty state — Message shown after a completed search returns no results.
- Result row — Stable option wrapper that owns highlight, selection, pointer, and keyboard behavior.
- Default item content — Standard TypeaheadItem label and supporting content rendered inside a result row when renderItem and item.element are absent.
- Caller-rendered item content — Caller-owned result content supplied through renderItem or item.element inside the stable result row.
- Result group heading — Visible heading for a labeled group of result rows.
- Selected result state — Selected styling and trailing check presented on the current result row.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `string` |  | Accessible label for the input. |
| `searchSource` * | `SearchSource<T>` |  | Data source providing search and bootstrap methods for populating the dropdown. |
| `value` * | `T \| null` |  | Currently selected item, or null if nothing is selected. |
| `onChange` * | `(item: T \| null) => void` |  | Called when the selection changes. |
| `placeholder` | `string` |  | Input placeholder text. |
| `hasEntriesOnFocus` | `boolean` | `false` | Show bootstrap results on focus before typing. |
| `hasClear` | `boolean` | `true` | Show clear button to deselect the current value. |
| `isDisabled` | `boolean` | `false` | Disables the input. |
| `disabledMessage` | `string` |  | Explains why the input is disabled. With isDisabled, shows a tooltip on hover/keyboard focus and keeps the field focusable via aria-disabled (activation stays blocked). Use this instead of wrapping a disabled Typeahead in Tooltip. Disabled controls swallow the hover events an external Tooltip needs. |
| `maxMenuItems` | `number` | `10` | Maximum number of dropdown items to display. |
| `minQueryLength` | `number` | `1` | Minimum query length before the search source is queried. Below it no search runs and the menu stays closed. |
| `status` | `{type: 'warning' \| 'error' \| 'success', message?: string}` |  | Validation status object with type and message for error/warning/success states. |
| `statusVariant` | `'attached' \| 'detached'` | `'attached'` | How the status message is placed relative to the input. attached overlaps directly below the input (bordered treatment); detached floats below as a separate element with spacing. |
| `renderItem` | `(item: T) => ReactNode` |  | Custom render function for dropdown items. Default renders TypeaheadItem. |
| `isLabelHidden` | `boolean` | `false` | Visually hides the label while keeping it accessible. |
| `description` | `string` |  | Helper text displayed below the label. |
| `isRequired` | `boolean` | `false` | Marks the field as required. |
| `isOptional` | `boolean` | `false` | Shows an optional indicator on the label. |
| `labelTooltip` | `string` |  | Tooltip text shown on the label. |
| `emptySearchResultsText` | `string` | `'No results found'` | Text shown when search returns no results. |
| `hasAutoFocus` | `boolean` | `false` | Auto-focus the input on mount. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Input and token size. |
| `debounceMs` | `number` | `150` | Debounce delay in ms before triggering search. Set to 0 for synchronous sources. |
| `onChangeQuery` | `(query: string) => void` |  | Callback fired when the search query text changes. |
| `onOpenChange` | `(isOpen: boolean) => void` |  | Callback when the dropdown opens or closes. |
| `width` | `SizeValue` |  | Width of the field (number = pixels, string used as-is, e.g. "100%"). Sizes the whole field (label, control, and status) so they stay aligned. |
| `startIcon` | `IconType \| ReactNode` |  | SVG icon component displayed at the start of the input. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value: not an inline style object like style={{}}. |

Styling hook class: `.astryx-typeahead`, `.astryx-typeahead-dropdown`, `.astryx-typeahead-empty-state`, `.astryx-typeahead-item`

### Base Typeahead

Composable combobox engine providing a bare input, search, keyboard navigation, and a styled result dropdown. It renders no input wrapper, border, or selected-value token. Typeahead and Tokenizer compose it for standard fields.

**Do**

- Use Typeahead or Tokenizer for standard fields; they wrap BaseTypeahead with input chrome and selected-value rendering it intentionally omits.
- Provide your own visible label or aria-label and custom input wrapper so the bare combobox has an accessible name, focus treatment, border, and layout.
- Pass anchorRef pointing to your wrapper so the dropdown positions against your custom input chrome, not just the bare input element.

**Don't**

- Expect input chrome or selected-value rendering. BaseTypeahead is an engine; the caller owns those visible parts.
- Use BaseTypeahead when Typeahead or Tokenizer would suffice; the extra wrapper and styling work is only justified for truly custom compositions.
- Treat Escape as cancellation of pending source work. It hides the current popup, but a late response can reopen it.

**Anatomy**

- Input (required) — Bare combobox input. The caller supplies its visible field chrome and accessible name.
- Loading status — Named Spinner shown beside the input while an asynchronous source is pending, unless a composed owner takes over the busy indicator lane.
- Dropdown — Anchored listbox surface containing current search or bootstrap results.
- Empty state — Disabled listbox option shown after a completed search returns no results.
- Result group heading — Visible label for a group of result options.
- Result row — Option wrapper that owns highlight, selection, pointer, and keyboard behavior.
- Default item content — TypeaheadItem label and optional supporting content rendered inside a result row.
- Caller-rendered item content — Caller content supplied through renderItem or item.element inside the stable result row.
- Selected result state — Selected row weight and trailing check shown when a result matches value.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `searchSource` * | `SearchSource<T>` |  | Data source providing search and bootstrap methods. |
| `value` * | `T \| null` |  | Currently selected item. |
| `onChange` * | `(item: T \| null) => void` |  | Called when the selection changes. |
| `renderItem` | `(item: T) => ReactNode` |  | Custom render function for dropdown items. |
| `placeholder` | `string` | `'Search…'` | Input placeholder text. |
| `hasEntriesOnFocus` | `boolean` | `false` | Show bootstrap results on focus before typing. |
| `maxMenuItems` | `number` | `10` | Maximum dropdown items to display. |
| `menuWidth` | `number` |  | Requested dropdown width in pixels before viewport clamping. |
| `minQueryLength` | `number` | `1` | Minimum query length before the search source is queried. Below it no search runs and the menu stays closed. |
| `emptySearchResultsText` | `string` | `'No results found'` | Text shown when search returns no results. |
| `isDisabled` | `boolean` | `false` | Whether the input is disabled. |
| `isFocusableDisabled` | `boolean` | `false` | Keep a disabled input focusable with aria-disabled and readOnly so a caller-owned disabled reason remains discoverable. It blocks text entry, but when applied after results are already open, Enter can still select the highlighted option. |
| `hasAutoFocus` | `boolean` | `false` | Auto-focus the input on mount. |
| `debounceMs` | `number` | `150` | Debounce delay in ms before triggering search. Set to 0 for synchronous sources. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size used to scale dropdown option padding. |
| `anchorRef` | `RefObject<HTMLElement \| null>` |  | Ref to the anchor element for dropdown positioning. If not provided, the input itself is used. |
| `inputXStyle` | `StyleXStyles` |  | Additional StyleX styles for the input element. |
| `xstyle` | `StyleXStyles` |  | Standard BaseProps StyleX styles applied to the input. Must be a stylex.create() value, not an inline style object. |
| `inputTabIndex` | `number` |  | Legacy input-specific alias for native tabIndex. When provided, it takes precedence; otherwise native tabIndex is preserved. |
| `onKeyDown` | `(e: React.KeyboardEvent<HTMLInputElement>) => void` |  | Additional keydown handler called before internal keyboard navigation. Call e.preventDefault() to skip internal handling. |
| `onChangeQuery` | `(query: string) => void` |  | Callback fired when the search query text changes. |
| `onOpenChange` | `(isOpen: boolean) => void` |  | Callback when the dropdown opens or closes. |
| `inputId` | `string` |  | Legacy input-specific alias for native id. When provided, it takes precedence; otherwise native id is preserved. |
| `ariaDescribedBy` | `string` |  | Legacy input-specific alias for native aria-describedby. When provided, it takes precedence; otherwise the native attribute is preserved. |
| `ariaLabelledBy` | `string` |  | Legacy input-specific alias for native aria-labelledby. When provided, it takes precedence; otherwise the native attribute is preserved. |

### Base Typeahead

**Do**

- Use Typeahead or Tokenizer for standard fields; they add the input chrome and selected-value rendering BaseTypeahead omits.
- Provide a visible label or aria-label plus a custom wrapper with focus treatment, border, and layout.
- Pass anchorRef to your wrapper so the dropdown positions against your input chrome, not the bare input.

**Don't**

- Expect input chrome or selected-value rendering. The caller owns those visible parts.
- Use BaseTypeahead when Typeahead or Tokenizer suffice; extra work only pays off for custom compositions.
- Treat Escape as pending-work cancellation. It hides the popup, but a late response can reopen it.

### Base Typeahead

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `searchSource` * | `SearchSource<T>` |  | 提供搜索和引导方法的数据源。 |
| `value` * | `T \| null` |  | 当前选中的项目。 |
| `onChange` * | `(item: T \| null) => void` |  | 选择变更时调用。 |
| `renderItem` | `(item: T) => ReactNode` |  | 下拉列表项的自定义渲染函数。 |
| `placeholder` | `string` | `'Search…'` | 输入框占位文本。 |
| `hasEntriesOnFocus` | `boolean` | `false` | 聚焦时在输入前显示引导结果。 |
| `maxMenuItems` | `number` | `10` | 下拉列表显示的最大项目数。 |
| `menuWidth` | `number` |  | 视口限制前请求的下拉菜单像素宽度。 |
| `minQueryLength` | `number` | `1` | 查询搜索源前的最小查询长度。低于该长度不会发起搜索，菜单保持关闭。 |
| `emptySearchResultsText` | `string` | `'No results found'` | 搜索无结果时显示的文本。 |
| `isDisabled` | `boolean` | `false` | 输入框是否被禁用。 |
| `isFocusableDisabled` | `boolean` | `false` | 使用 aria-disabled 和只读状态保持禁用输入框可聚焦，以便访问调用方提供的禁用原因。它会阻止文本输入，但如果结果已打开，按 Enter 仍可选择高亮选项。 |
| `hasAutoFocus` | `boolean` | `false` | 挂载时自动聚焦输入框。 |
| `debounceMs` | `number` | `150` | 触发搜索前的防抖延迟（毫秒）。同步数据源设置为 0。 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 用于调整下拉选项内边距的尺寸。 |
| `anchorRef` | `RefObject<HTMLElement \| null>` |  | 用于下拉列表定位的锚点元素引用。未提供时使用输入框本身。 |
| `inputXStyle` | `StyleXStyles` |  | 输入元素的附加 StyleX 样式。 |
| `xstyle` | `StyleXStyles` |  | 应用于输入元素的标准 BaseProps StyleX 样式。 |
| `inputTabIndex` | `number` |  | 原生 tabIndex 的旧输入专用别名。提供时优先；未提供时保留原生属性。 |
| `onKeyDown` | `(e: React.KeyboardEvent<HTMLInputElement>) => void` |  | 在内部键盘导航之前调用的附加 keydown 处理函数。调用 e.preventDefault() 可跳过内部处理。 |
| `onChangeQuery` | `(query: string) => void` |  | 搜索查询文本变更时触发的回调。 |
| `onOpenChange` | `(isOpen: boolean) => void` |  | 下拉列表打开或关闭时的回调。 |
| `inputId` | `string` |  | 原生 id 的旧输入专用别名。提供时优先；未提供时保留原生属性。 |
| `ariaDescribedBy` | `string` |  | 原生 aria-describedby 的旧输入专用别名。提供时优先；未提供时保留原生属性。 |
| `ariaLabelledBy` | `string` |  | 原生 aria-labelledby 的旧输入专用别名。提供时优先；未提供时保留原生属性。 |

### Typeahead Item

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `item` * | `SearchableItem` |  | The search result item to render. |
| `icon` | `ReactNode` |  | Icon or avatar to display before the label. |
| `description` | `string` |  | Description text displayed below the label. |
| `isDisabled` | `boolean` | `false` | Whether this item is visually disabled. |
| `group` | `string` |  | Group label for grouping items visually. |

### Typeahead Item

### Typeahead Item

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `item` * | `SearchableItem` |  | 要渲染的搜索结果项。 |
| `icon` | `ReactNode` |  | 在标签前显示的图标或头像。 |
| `description` | `string` |  | 显示在标签下方的描述文本。 |
| `isDisabled` | `boolean` | `false` | 此项是否在视觉上被禁用。 |
| `group` | `string` |  | 用于视觉分组的分组标签。 |

## Files

- `src/BaseTypeahead.doc.mjs`
- `src/BaseTypeahead.spec.md`
- `src/BaseTypeahead.tsx`
- `src/Typeahead.doc.mjs`
- `src/Typeahead.spec.md`
- `src/Typeahead.tsx`
- `src/TypeaheadItem.doc.mjs`
- `src/TypeaheadItem.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Typeahead
