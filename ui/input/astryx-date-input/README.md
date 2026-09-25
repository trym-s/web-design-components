# Date Input

DateInput lets the user type or pick a date from a calendar popover. Use it for scheduling, deadlines, booking dates, or any form field that needs a specific calendar date.

## Classification

- Category: `input` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/DateInput.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: DateInput lets the user type or pick a date from a calendar popover.
- Avoid when: Use a DateInput for free-form text that does not represent a calendar date. Hide the label without surrounding context that makes the field purpose obvious. Rely on the calendar alone; the text input lets users type dates directly, which is faster for known dates. Wrap a disabled DateInput in Tooltip to explain why it is disabled; disabled triggers swallow the hover events the wrapper needs. Use the disabledMessage prop instead.
- Provides: Label, Text input, Calendar icon, Calendar popover, Clear button, Status message
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: DateInputShowcase, DateInputClearable, DateInputDateRange, DateInputFormats, DateInputWithDescription, DateInputWithValidation
- Upstream: Astryx core · Form Controls
- Keywords: dateinput, datepicker, datefield, calendar, dateselect, dateentry, datechooser

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

- `src/examples/DateInputShowcase.tsx` — Date Input: A date input field with a calendar popover. Type a date or click the calendar icon to pick one. · static: `static/DateInputShowcase.html`
- `src/examples/DateInputClearable.tsx` — DateInput — Clearable: Date input with a clear button that resets the value. Use when the date field is optional and the user may need to undo their selection. · static: `static/DateInputClearable.html`
- `src/examples/DateInputDateRange.tsx` — DateInput — Min/Max Constraints: Date input constrained to a min/max window. Use when only certain dates are valid, like booking availability or a fiscal quarter. · static: `static/DateInputDateRange.html`
- `src/examples/DateInputFormats.tsx` — DateInput — Formats: The format prop reuses Timestamp's format vocabulary to control how the committed value is displayed: date, date_long (default), date_weekday, and system_date, or a function for a fully custom string. Formatting applies only to the committed value, never to text the user is actively typing. · static: `static/DateInputFormats.html`
- `src/examples/DateInputWithDescription.tsx` — DateInput — Description: Date input with helper text below the label explaining what the field expects. Use when the purpose of the date is not obvious from the label alone. · static: `static/DateInputWithDescription.html`
- `src/examples/DateInputWithValidation.tsx` — DateInput — Validation: Date input in all three status states: error, warning, and success. Use to surface validation issues, caution the user, or confirm a valid selection. · static: `static/DateInputWithValidation.html`

## Documentation

### Date Input

DateInput lets the user type or pick a date from a calendar popover. Use it for scheduling, deadlines, booking dates, or any form field that needs a specific calendar date.

**Do**

- Provide clear labels and descriptions so users understand what date is expected.
- Use min, max, and dateConstraints to restrict selectable dates to valid ranges.
- Use hasClear when the date is optional so the user can reset it.
- Show a loading state with changeAction when the date triggers a server-side save.
- Use DateInput inside InputGroup when adding a short static prefix or suffix, such as a due-date hint.

**Don't**

- Use a DateInput for free-form text that does not represent a calendar date.
- Hide the label without surrounding context that makes the field purpose obvious.
- Rely on the calendar alone; the text input lets users type dates directly, which is faster for known dates.
- Wrap a disabled DateInput in Tooltip to explain why it is disabled; disabled triggers swallow the hover events the wrapper needs. Use the disabledMessage prop instead.

**Anatomy**

- Label (required) — Text above the input describing what date is expected.
- Text input (required) — A field where the user can type a date directly. Parses common formats like MM/DD/YYYY.
- Calendar icon (required) — A button that opens the calendar popover for visual date picking.
- Calendar popover — A month grid that appears when the icon is clicked or the input is focused.
- Clear button — A × button that resets the date value. Shown when hasClear is true and a date is set.
- Status message — An error, warning, or success message below the input.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `string` |  | Label text. |
| `isLabelHidden` | `boolean` | `false` | Visually hide the label. |
| `description` | `string` |  | Helper text displayed below the label. |
| `isOptional` | `boolean` | `false` | Show an "(optional)" indicator next to the label. |
| `isRequired` | `boolean` | `false` | Mark the field as required. |
| `isDisabled` | `boolean` | `false` | Disable the input and calendar. |
| `disabledMessage` | `string` |  | Explains why the input is disabled. With isDisabled, shows a tooltip on hover/keyboard focus and keeps the field focusable via aria-disabled (activation stays blocked). Use this instead of wrapping a disabled DateInput in Tooltip. Disabled controls swallow the hover events an external Tooltip needs. |
| `value` | `ISODateString` |  | Selected date in YYYY-MM-DD format. |
| `onChange` | `(value: ISODateString \| undefined) => void` |  | Callback invoked when the selected date changes. |
| `changeAction` | `(value: ISODateString \| undefined) => void \| Promise<void>` |  | Async action fired after onChange. Drives optimistic UI updates via useTransition. |
| `isLoading` | `boolean` | `false` | Whether the input is in a loading state. Disables interaction and shows a spinner. |
| `min` | `ISODateString` |  | Minimum selectable date (YYYY-MM-DD). |
| `max` | `ISODateString` |  | Maximum selectable date (YYYY-MM-DD). |
| `dateConstraints` | `Array<(date: Date) => boolean>` |  | Array of custom constraint functions that disable specific dates. |
| `placeholder` | `string` | `'Select a date'` | Placeholder text shown in the text input. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the input control. |
| `status` | `{type: 'warning' \| 'error' \| 'success', message?: string}` |  | Status indicator object for error, warning, or success states with a message. |
| `statusVariant` | `'attached' \| 'detached' \| 'tooltip'` | `'attached'` | How the status message is placed relative to the input. attached overlaps directly below the input (bordered treatment); detached floats below as a separate element with spacing; tooltip hides the message box and surfaces it in a tooltip on the status icon. |
| `labelTooltip` | `string` |  | Tooltip text displayed via an info icon at the end of the label. |
| `hasClear` | `boolean` | `false` | Shows a clear (×) button when a date value is set. Clicking it clears the value and returns focus to the input. |
| `numberOfMonths` | `1 \| 2` | `1` | Number of months displayed simultaneously in the calendar popover. |
| `weekStartsOn` | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 'sun' \| 'mon' \| 'tue' \| 'wed' \| 'thu' \| 'fri' \| 'sat'` | `0` | First day of week in the calendar popover. A number (0 = Sunday to 6 = Saturday) or a three-letter day name. |
| `format` | `'date' \| 'date_long' \| 'date_weekday' \| 'system_date' \| ((value: ISODateString) => string)` | `'date_long'` | How the committed date value is displayed. Named values are reused from Timestamp's format vocabulary: 'date' shows 'Mar 21, 2026', 'date_long' shows 'March 21, 2026', 'date_weekday' shows 'Wed, Mar 21, 2026', 'system_date' shows '2026-03-21'. A function receives the ISO value and returns a custom string. Applies only to the committed value, never to text being typed. |
| `nativePicker` | `'touch' \| 'always' \| 'never'` | `'touch'` | Which surface draws the date picker. 'touch' (the default) hands a touch device to the browser/OS: the field becomes an input type=date and the platform draws the picker (the iOS wheel, the Android calendar dialog); 'always' does that wherever the browser supports input type=date; 'never' keeps Astryx's own pickers everywhere (the bottom-sheet picker on a finger, the calendar popover on a mouse). Use 'never' for a field that needs weekStartsOn, numberOfMonths or dateConstraints, none of which a native picker can express. format and placeholder still apply in native mode; min and max are forwarded, but a native picker may not show them (on iOS an out-of-range date can be selected and is refused on commit rather than greyed out). |
| `width` | `SizeValue` |  | Width of the field (number = pixels, string used as-is, e.g. "100%"). Sizes the whole field (label, control, and status) so they stay aligned. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value, not an inline style object like style={{}}. |

Styling hook class: `.astryx-date-input`, `.astryx-date-input-toggle-icon`, `.astryx-date-input-clear-icon`

### Date Input

DateInput lets the user type or pick a date from a calendar popover. Use it for scheduling, deadlines, booking dates, or any form field that needs a specific calendar date.

**Do**

- Provide clear labels and descriptions so users understand what date is expected.
- Use min, max, and dateConstraints to restrict selectable dates to valid ranges.
- Use hasClear when the date is optional so the user can reset it.
- Show a loading state with changeAction when the date triggers a server-side save.

**Don't**

- Use a DateInput for free-form text that does not represent a calendar date.
- Hide the label without surrounding context that makes the field purpose obvious.
- Rely on the calendar alone; the text input lets users type dates directly, which is faster for known dates.
- Wrap a disabled DateInput in Tooltip to explain why it is disabled; disabled triggers swallow the hover events the wrapper needs. Use the disabledMessage prop instead.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `string` |  | 标签文本。 |
| `isLabelHidden` | `boolean` | `false` | 视觉隐藏标签。 |
| `description` | `string` |  | 显示在标签下方的辅助文本。 |
| `isOptional` | `boolean` | `false` | 在标签旁显示"(optional)"指示器。 |
| `isRequired` | `boolean` | `false` | 将字段标记为必填。 |
| `isDisabled` | `boolean` | `false` | 禁用输入框和日历。 |
| `disabledMessage` | `string` |  | 说明输入框为何被禁用。与 isDisabled 一起使用时，在悬停/键盘聚焦时显示提示，并通过 aria-disabled 保持输入框可聚焦（仍阻止输入和激活）。请使用此属性，而不是用 Tooltip 包裹已禁用的 DateInput。 |
| `value` | `ISODateString` |  | 选中的日期，YYYY-MM-DD 格式。 |
| `onChange` | `(value: ISODateString \| undefined) => void` |  | 选中日期变更时调用的回调。 |
| `changeAction` | `(value: ISODateString \| undefined) => void \| Promise<void>` |  | 在 onChange 之后触发的异步操作。通过 useTransition 驱动乐观更新。 |
| `isLoading` | `boolean` | `false` | 输入框是否处于加载状态。禁用交互并显示加载指示器。 |
| `min` | `ISODateString` |  | 可选择的最早日期（YYYY-MM-DD）。 |
| `max` | `ISODateString` |  | 可选择的最晚日期（YYYY-MM-DD）。 |
| `dateConstraints` | `Array<(date: Date) => boolean>` |  | 自定义约束函数数组，用于禁用特定日期。 |
| `placeholder` | `string` | `'Select a date'` | 文本输入框中显示的占位符文本。 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 输入控件的尺寸。 |
| `status` | `{type: 'warning' \| 'error' \| 'success', message?: string}` |  | 错误、警告或成功状态的状态指示对象，附带消息。 |
| `statusVariant` | `'attached' \| 'detached' \| 'tooltip'` | `'attached'` | 状态消息相对于输入框的放置方式。attached 直接叠加在输入框下方（带边框处理）；detached 作为独立元素浮于下方并留有间距；tooltip 隐藏消息框，并在状态图标上以提示气泡形式显示。 |
| `labelTooltip` | `string` |  | 通过标签末尾的信息图标显示的提示文本。 |
| `numberOfMonths` | `1 \| 2` | `1` | 日历弹出层中同时显示的月份数量。 |
| `weekStartsOn` | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 'sun' \| 'mon' \| 'tue' \| 'wed' \| 'thu' \| 'fri' \| 'sat'` | `0` | 日历弹出层中每周的起始日。可为数字（0=周日……6=周六）或三字母星期缩写。 |
| `format` | `'date' \| 'date_long' \| 'date_weekday' \| 'system_date' \| ((value: ISODateString) => string)` | `'date_long'` | 已选日期的显示格式。命名值复用 Timestamp 的格式词汇：'date' 显示 'Mar 21, 2026'，'date_long' 显示 'March 21, 2026'，'date_weekday' 显示 'Wed, Mar 21, 2026'，'system_date' 显示 '2026-03-21'。函数接收 ISO 值并返回自定义字符串。仅作用于已提交的值，不影响正在输入的文本。 |
| `nativePicker` | `'touch' \| 'always' \| 'never'` | `'touch'` | 由哪个界面绘制日期选择器。'touch'（默认）在触摸设备上交给浏览器/操作系统：字段变为 input type=date，由平台绘制选择器（iOS 滚轮、Android 日历对话框）；'always' 在所有支持 input type=date 的浏览器上都这样做；'never' 始终使用 Astryx 自带的选择器（触摸设备用底部弹出选择器，鼠标设备用日历弹出层）。需要 weekStartsOn、numberOfMonths 或 dateConstraints 的字段应使用 'never'，原生选择器无法表达这些。原生模式下 format 和 placeholder 仍然生效；min 和 max 会传递给原生控件，但原生选择器可能不会显示这些限制（在 iOS 上仍可选中超出范围的日期，会在提交时被拒绝，而不是变灰）。 |
| `xstyle` | `StyleXStyles` |  | 用于布局自定义的 StyleX 样式（外边距、定位、尺寸）。必须是 stylex.create() 的值，而非内联样式对象如 style={{}}。 |

Styling hook class: `.astryx-date-input`, `.astryx-date-input-toggle-icon`, `.astryx-date-input-clear-icon`

## Files

- `src/DateInput.doc.mjs`
- `src/DateInput.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/DateInput
