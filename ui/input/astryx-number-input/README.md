# Number Input

A form input for numeric values with built-in validation, min/max constraints, and step controls. Use NumberInput for quantities, measurements, percentages, and similar inputs.

## Classification

- Category: `input` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/NumberInput.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: A form input for numeric values with built-in validation, min/max constraints, and step controls.
- Avoid when: Use NumberInput for free-form text that happens to contain numbers; use TextInput instead. Set both isOptional and isRequired on the same field. Wrap a disabled NumberInput in Tooltip to explain why it's disabled; disabled controls swallow the hover events the wrapper needs. Use the disabledMessage prop instead.
- Provides: Label, Description, Icon, Placeholder, Number steppers
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: NumberInputShowcase, NumberInputClearableNumberInput, NumberInputRangeNumberInput, NumberInputStatuses, NumberInputWithUnits
- Upstream: Astryx core · Form Controls
- Keywords: numberinput, numberfield, stepper, spinner, counter, increment, decrement, quantity, numberpicker

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

- `src/examples/NumberInputShowcase.tsx` — Number Input: A number input for quantity entry. · static: `static/NumberInputShowcase.html`
- `src/examples/NumberInputClearableNumberInput.tsx` — NumberInput — Clearable: Number input with a clear button, unit suffix, and min/max constraint · static: `static/NumberInputClearableNumberInput.html`
- `src/examples/NumberInputRangeNumberInput.tsx` — NumberInput — Range Constrained: Number input with min/max boundaries and a helper description · static: `static/NumberInputRangeNumberInput.html`
- `src/examples/NumberInputStatuses.tsx` — NumberInput — Status Variants: Number inputs showing error, warning, and success validation states · static: `static/NumberInputStatuses.html`
- `src/examples/NumberInputWithUnits.tsx` — NumberInput — With Units: Number input with a percentage unit suffix and valid range · static: `static/NumberInputWithUnits.html`

## Documentation

### Number Input

A form input for numeric values with built-in validation, min/max constraints, and step controls. Use NumberInput for quantities, measurements, percentages, and similar inputs.

**Do**

- Let people paste formatted numbers: a pasted 1,234,234,234 is read under the field's locale and commits as 1234234234 on blur. Typing is never intercepted.
- Set min, max, and step to guide users toward valid values.
- Show units (e.g. "%" or "GB") so users know what the number represents.
- Set isWheelEnabled={false} when the input appears in a scrolling surface where wheel gestures should always scroll the page.

**Don't**

- Use NumberInput for free-form text that happens to contain numbers; use TextInput instead.
- Set both isOptional and isRequired on the same field.
- Wrap a disabled NumberInput in Tooltip to explain why it's disabled; disabled controls swallow the hover events the wrapper needs. Use the disabledMessage prop instead.

**Anatomy**

- Label (required) — The label for the number input.
- Description — Additional description text below the label.
- Icon — An optional icon within the input.
- Placeholder — Placeholder text shown when the input is empty.
- Number steppers — Optional buttons that increment or decrement by the configured step.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `string` |  | Label text for the input (always rendered for accessibility). |
| `value` * | `number \| null \| undefined` |  | Current value of the input. |
| `onChange` * | `(value: number) => void` |  | Callback fired when a valid text edit commits on blur or Enter, or when a step or clear control changes the value. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant. |
| `isLabelHidden` | `boolean` |  | Visually hide the label (still accessible to screen readers). |
| `description` | `string` |  | Description text displayed between the label and input. |
| `isOptional` | `boolean` |  | Whether the field is optional (mutually exclusive with isRequired). |
| `onKeyDown` | `(e: KeyboardEvent<HTMLInputElement>) => void` |  | Callback fired on keydown events on the input. |
| `isRequired` | `boolean` |  | Whether the field is required (mutually exclusive with isOptional). |
| `isDisabled` | `boolean` |  | Whether the input is disabled. |
| `isReadOnly` | `boolean` | `false` | Makes the input read-only: the value is shown at full opacity and still submits with the form, but cannot be edited. Unlike isDisabled, a read-only input is not dimmed and stays in the tab order. Stepping is off in every form while read-only: arrow keys, the wheel, and the number steppers. isDisabled takes precedence when both are set. |
| `disabledMessage` | `string` |  | Explains why the input is disabled. With isDisabled, shows a tooltip on hover/keyboard focus and keeps the input focusable via aria-disabled (the field becomes read-only). Use this instead of wrapping a disabled NumberInput in Tooltip. |
| `placeholder` | `string` |  | Placeholder text. |
| `labelTooltip` | `string` |  | Tooltip text to display in an info icon at the end of the label. |
| `startIcon` | `IconType` |  | Icon to display at the start of the input. See `astryx docs icons` for valid semantic names. |
| `labelIcon` | `IconType` |  | Icon to display before the label text. See `astryx docs icons` for valid semantic names. |
| `status` | `{type: 'error' \| 'warning' \| 'success', message?: string}` |  | Validation status with optional message. |
| `statusVariant` | `'attached' \| 'detached' \| 'tooltip'` | `'attached'` | How the status message is placed relative to the input. attached overlaps directly below the input (bordered treatment); detached floats below as a separate element with spacing; tooltip hides the message box and surfaces it in a tooltip on the status icon. |
| `min` | `number \| null` |  | Minimum value allowed. A smaller entry commits at this value on blur or Enter. |
| `max` | `number \| null` |  | Maximum value allowed. A larger entry commits at this value on blur or Enter. |
| `step` | `number \| null` | `1` | Step increment for the input. |
| `formatValue` | `(value: number) => string` |  | Formats the committed value while the input is not focused. The raw numeric value is shown on focus for editing and the formatted value is exposed through aria-valuetext. |
| `isWheelEnabled` | `boolean` | `true` | Whether scrolling the wheel over the focused input steps the value. Disable this when page scrolling should always take priority. |
| `hasNumberSteppers` | `boolean` | `false` | Shows increment and decrement buttons at the end of the input. |
| `units` | `string \| null` |  | Units text to display at the end of the input (e.g., "%" or "GB"). |
| `isIntegerOnly` | `boolean` |  | Only allow integer values (no floating point). |
| `hasClear` | `boolean` | `false` | Shows a clear (×) button when the input has a value. When true, the onChange callback also accepts null to signal the user cleared the input. |
| `htmlName` | `string` |  | HTML name attribute for form submissions. |
| `autoComplete` | `string` |  | HTML autocomplete attribute. |
| `width` | `SizeValue` |  | Width of the field (number = pixels, string used as-is, e.g. "100%"). Sizes the whole field (label, control, and status) so they stay aligned. |
| `hasAutoFocus` | `boolean` |  | Whether to focus the input on mount. |
| `onFocus` | `(e: FocusEvent<HTMLInputElement>) => void` |  | Callback fired when the input receives focus. |
| `onBlur` | `(e: FocusEvent<HTMLInputElement>) => void` |  | Callback fired when the input loses focus. |
| `onEnter` | `() => void` |  | Callback fired when the user presses the Enter key. |

Styling hook class: `.astryx-number-input`

### Number Input

A form input for numeric values with built-in validation, min/max constraints, and step controls. Use NumberInput for quantities, measurements, percentages, and similar inputs.

**Do**

- 可以直接粘贴带格式的数字：粘贴 1,234,234,234 会按字段所在区域设置解析，失去焦点时提交为 1234234234。输入过程中不会拦截按键。
- Set min, max, and step to guide users toward valid values.
- Show units (e.g. "%" or "GB") so users know what the number represents.
- Set isWheelEnabled={false} when the input appears in a scrolling surface where wheel gestures should always scroll the page.

**Don't**

- Use NumberInput for free-form text that happens to contain numbers; use TextInput instead.
- Set both isOptional and isRequired on the same field.
- Wrap a disabled NumberInput in Tooltip to explain why it's disabled; disabled controls swallow the hover events the wrapper needs. Use the disabledMessage prop instead.

**Anatomy**

- Label (required) — The label for the number input.
- Description — Additional description text below the label.
- Icon — An optional icon within the input.
- Placeholder — Placeholder text shown when the input is empty.
- Number steppers — Optional buttons that increment or decrement by the configured step.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `string` |  | 输入框的标签文本（始终渲染以确保无障碍访问）。 |
| `value` * | `number \| null \| undefined` |  | 输入框的当前值。 |
| `onChange` * | `(value: number) => void` |  | 有效文本编辑在失焦或按 Enter 时提交；步进或清除控件更改值时也会触发回调。 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸变体。 |
| `isLabelHidden` | `boolean` |  | 视觉隐藏标签（屏幕阅读器仍可访问）。 |
| `description` | `string` |  | 显示在标签和输入框之间的描述文本。 |
| `isOptional` | `boolean` |  | 字段是否可选（与 isRequired 互斥）。 |
| `isRequired` | `boolean` |  | 字段是否必填（与 isOptional 互斥）。 |
| `isDisabled` | `boolean` |  | 输入框是否禁用。 |
| `isReadOnly` | `boolean` | `false` | 将输入框设为只读：值以完整不透明度显示并仍随表单提交，但无法编辑。与 isDisabled 不同，只读输入框不会变暗，并保留在 Tab 顺序中。只读时所有步进方式均被禁用：方向键、滚轮和步进按钮。同时设置时 isDisabled 优先。 |
| `disabledMessage` | `string` |  | 说明输入框被禁用的原因。与 isDisabled 一起使用时，在悬停/键盘聚焦时显示工具提示，并通过 aria-disabled 保持输入框可聚焦（字段变为只读）。请使用此属性，而不是用 Tooltip 包裹已禁用的 NumberInput。 |
| `placeholder` | `string` |  | 占位符文本。 |
| `labelTooltip` | `string` |  | 在标签末尾的信息图标中显示的工具提示文本。 |
| `startIcon` | `IconType` |  | 显示在输入框起始位置的图标。 |
| `labelIcon` | `IconType` |  | 显示在标签文本前的图标。 |
| `status` | `{type: 'error' \| 'warning' \| 'success', message?: string}` |  | 带可选消息的验证状态。 |
| `statusVariant` | `'attached' \| 'detached' \| 'tooltip'` | `'attached'` | 状态消息相对于输入框的放置方式。attached 直接叠加在输入框下方（带边框处理）；detached 作为独立元素浮于下方并留有间距；tooltip 隐藏消息框，并在状态图标上以提示气泡形式显示。 |
| `min` | `number \| null` |  | 允许的最小值。更小的输入会在失焦或按 Enter 时提交为该值。 |
| `max` | `number \| null` |  | 允许的最大值。更大的输入会在失焦或按 Enter 时提交为该值。 |
| `step` | `number \| null` | `1` | 输入框的步进增量。 |
| `formatValue` | `(value: number) => string` |  | 输入框未聚焦时格式化已提交的值。聚焦编辑时显示原始数值，并通过 aria-valuetext 提供格式化值。 |
| `isWheelEnabled` | `boolean` | `true` | 是否允许在已聚焦的输入框上滚动滚轮来步进数值。当页面滚动应始终优先时请禁用。 |
| `hasNumberSteppers` | `boolean` | `false` | 是否在输入框末尾显示递增和递减按钮。 |
| `units` | `string \| null` |  | 在输入框末尾显示的单位文本（例如"%"或"GB"）。 |
| `isIntegerOnly` | `boolean` |  | 仅允许整数值（不允许浮点数）。 |
| `hasClear` | `boolean` | `false` | 输入有值时显示清除 (×) 按鈕。启用后， onChange 回调还接受 null 表示用户已清空输入。 |
| `htmlName` | `string` |  | 用于表单提交的 HTML name 属性。 |
| `autoComplete` | `string` |  | HTML autocomplete 属性。 |
| `hasAutoFocus` | `boolean` |  | 是否在挂载时聚焦输入框。 |
| `onFocus` | `(e: FocusEvent<HTMLInputElement>) => void` |  | 输入框获得焦点时触发的回调。 |
| `onBlur` | `(e: FocusEvent<HTMLInputElement>) => void` |  | 输入框失去焦点时触发的回调。 |
| `onEnter` | `() => void` |  | 用户按下 Enter 键时触发的回调。 |

Styling hook class: `.astryx-number-input`

## Files

- `src/NumberInput.doc.mjs`
- `src/NumberInput.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/NumberInput
