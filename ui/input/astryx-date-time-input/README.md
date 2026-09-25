# Date Time Input

DateTimeInput combines date and time selection in one field. With nativePicker="touch" (the default), mouse/trackpad devices use Astryx typed fields and popovers, while coarse-pointer devices use browser/OS date and time controls in the same two-segment field. nativePicker="always" uses both native controls on every pointer; nativePicker="never" keeps Astryx's own surfaces — pointer fields on fine pointers and the coordinated Date/Time bottom sheet on coarse pointers. The closed segments stay side by side when at least 400px is available and wrap into full-width rows below 400px, independent of viewport width. Use it for scheduling, event creation, deadline setting, or any form field that needs a specific datetime.

## Classification

- Category: `input` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/DateTimeInput.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: DateTimeInput combines date and time selection in one field.
- Avoid when: Use DateTimeInput when only a date is needed; use DateInput instead. Use DateTimeInput when only a time is needed; use TimeInput instead. Hide the label without surrounding context that makes the field purpose obvious. Wrap a disabled DateTimeInput in Tooltip to explain why it is disabled; disabled triggers swallow the hover events the wrapper needs. Use the disabledMessage prop instead.
- Provides: Label, Date input, Calendar icon, Date picker, Time input, Time options popover, Clear button, Status message
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: DateTimeInputShowcase, DateTimeInputWithValidation
- Upstream: Astryx core · Form Controls
- Keywords: datetimepicker, datetime, datepicker, timepicker, calendar, schedule, event, deadline, timestamp

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

- `src/examples/DateTimeInputShowcase.tsx` — Date Time Input: A combined date and time picker. Desktop opens a calendar popover with a time input; touch devices open a Date/Time bottom sheet. · static: `static/DateTimeInputShowcase.html`
- `src/examples/DateTimeInputWithValidation.tsx` — DateTimeInput — Validation: DateTimeInput in all three status states: error, warning, and success. Use to surface scheduling conflicts, caution the user about edge cases, or confirm a valid datetime. · static: `static/DateTimeInputWithValidation.html`

## Documentation

### Date Time Input

DateTimeInput combines date and time selection in one field. With nativePicker="touch" (the default), mouse/trackpad devices use Astryx typed fields and popovers, while coarse-pointer devices use browser/OS date and time controls in the same two-segment field. nativePicker="always" uses both native controls on every pointer; nativePicker="never" keeps Astryx's own surfaces — pointer fields on fine pointers and the coordinated Date/Time bottom sheet on coarse pointers. The closed segments stay side by side when at least 400px is available and wrap into full-width rows below 400px, independent of viewport width. Use it for scheduling, event creation, deadline setting, or any form field that needs a specific datetime.

**Do**

- Provide clear labels and descriptions so users understand what datetime is expected.
- Use min and max to restrict selectable datetimes to valid ranges.
- Use hasClear when the datetime is optional so the user can reset it.
- Choose the hour format (12h or 24h) that matches your audience's locale.

**Don't**

- Use DateTimeInput when only a date is needed; use DateInput instead.
- Use DateTimeInput when only a time is needed; use TimeInput instead.
- Hide the label without surrounding context that makes the field purpose obvious.
- Wrap a disabled DateTimeInput in Tooltip to explain why it is disabled; disabled triggers swallow the hover events the wrapper needs. Use the disabledMessage prop instead.

**Anatomy**

- Label (required) — Text above the input describing what datetime is expected.
- Date input (required) — A typed date field with calendar popover on the fine-pointer Astryx surface, a real input type=date in native modes, or a read-only segment opening the Astryx touch sheet when nativePicker is never on a coarse pointer.
- Calendar icon (required) — A button that opens the active date surface: the platform picker, Astryx calendar popover, or Astryx touch sheet.
- Date picker — The browser/OS picker in native modes, an Astryx month-grid popover on a fine pointer, or the Date panel of the Astryx bottom sheet on a coarse pointer with nativePicker="never".
- Time input (required) — A real input type=time for the default minute-precision native mode, a text/combobox time field when seconds, custom increments, or preset options are requested, or a read-only segment opening accessible time wheels when nativePicker is never on a coarse pointer.
- Time options popover — A list of preset times at the timeOptionInterval cadence. Setting the prop retains Astryx's text/combobox time field even when nativePicker otherwise selects native controls; the Astryx touch sheet uses wheels instead.
- Clear button — A × button that resets the datetime value.
- Status message — An error, warning, or success message below the inputs.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `string` |  | Label text. |
| `isLabelHidden` | `boolean` | `false` | Visually hide the label. |
| `description` | `string` |  | Helper text displayed below the label. |
| `isOptional` | `boolean` | `false` | Show an "(optional)" indicator next to the label. |
| `isRequired` | `boolean` | `false` | Mark the field as required. |
| `isDisabled` | `boolean` | `false` | Disable the input and picker. |
| `disabledMessage` | `string` |  | Explains why the input is disabled. With isDisabled, shows a tooltip on hover/keyboard focus and keeps the field focusable via aria-disabled (activation stays blocked). Use this instead of wrapping a disabled DateTimeInput in Tooltip. Disabled controls swallow the hover events an external Tooltip needs. |
| `value` | `ISODateTimeString` |  | Selected datetime in ISO 8601 format (YYYY-MM-DDTHH:MM or YYYY-MM-DDTHH:MM:SS). |
| `onChange` * | `(value: ISODateTimeString \| undefined) => void` |  | Callback invoked when the selected datetime changes. |
| `changeAction` | `(value: ISODateTimeString \| undefined) => void \| Promise<void>` |  | Async action fired after onChange. Drives optimistic UI updates via useTransition. |
| `isLoading` | `boolean` | `false` | Whether the input is in a loading state. Disables interaction and shows a spinner. |
| `min` | `ISODateTimeString` |  | Minimum selectable datetime. Constrains both date and time selection. |
| `max` | `ISODateTimeString` |  | Maximum selectable datetime. Constrains both date and time selection. |
| `dateConstraints` | `Array<(date: Date) => boolean>` |  | Array of custom constraint functions that disable specific dates. |
| `hasSeconds` | `boolean` | `false` | Include seconds in the time portion. Keeps Astryx's time field even when nativePicker selects native surfaces, because iOS has no seconds wheel. |
| `hourFormat` | `'12h' \| '24h'` | `'12h'` | Hour display format. '12h' shows AM/PM; '24h' uses 24-hour notation. |
| `timeIncrement` | `1 \| 5 \| 10 \| 15 \| 30` | `1` | Minute step for arrow keys in Astryx's typed time field. A non-default value keeps the Astryx time field in nativePicker modes because iOS treats native step as validation, not picker cadence. Ignored by the Astryx touch sheet, which uses wheels. |
| `timeOptionInterval` | `5 \| 10 \| 15 \| 30 \| 60` |  | Minute cadence for the preset-time combobox on Astryx's fine-pointer time field. Setting it keeps that Astryx time field even in nativePicker modes because the OS picker has no equivalent preset list. The Astryx touch sheet uses wheels. |
| `hasClear` | `boolean` | `false` | Shows a clear button when a datetime value is set. |
| `placeholder` | `string` | `'Select a date'` | Placeholder text shown in the date portion when no date is selected. |
| `timePlaceholder` | `string` | `'Select a time'` | Placeholder text shown in the time portion when no time is selected. On touch, this appears in the closed time segment before a time is chosen. |
| `timeLabel` | `string` |  | Accessible label for the time portion. Defaults to "{label} time" so it is tied to the field label and localizable. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the input control. |
| `status` | `{type: 'warning' \| 'error' \| 'success', message?: string}` |  | Status indicator object for error, warning, or success states with a message. |
| `labelTooltip` | `string` |  | Tooltip text displayed via an info icon at the end of the label. |
| `numberOfMonths` | `1 \| 2` | `1` | Number of months displayed simultaneously in Astryx's pointer calendar popover. Ignored by native date controls and the mobile touch sheet, whose Date panel always shows one swipe-paged month at a time. |
| `weekStartsOn` | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 'sun' \| 'mon' \| 'tue' \| 'wed' \| 'thu' \| 'fri' \| 'sat'` | `0` | First day of week in Astryx calendars. A number (0 = Sunday to 6 = Saturday) or a three-letter day name. Ignored by native date controls. |
| `nativePicker` | `'touch' \| 'always' \| 'never'` | `'touch'` | Which surfaces draw the date and time pickers. 'touch' (the default) uses browser/OS controls on a coarse primary pointer; 'always' uses them wherever input type=date/time are supported; 'never' keeps Astryx's own surfaces everywhere. The native time control is used only for the default minute-precision contract: hasSeconds, non-default timeIncrement, or timeOptionInterval retain Astryx's time field because iOS cannot express them faithfully. Use 'never' when numberOfMonths, weekStartsOn, or visible dateConstraints behavior matters. Constraints are enforced on commit; min/max are forwarded as hints. hourFormat formats the closed time, while the OS picker follows the user's locale. |
| `width` | `SizeValue` |  | Width of the field (number = pixels, string used as-is, e.g. "100%"). Sizes the whole field (label, control, and status) so they stay aligned. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value, not an inline style object like style={{}}. |

Styling hook class: `.astryx-date-time-input`, `.astryx-date-time-input-date-segment`, `.astryx-date-time-input-time-segment`, `.astryx-date-time-input-toggle-icon`, `.astryx-date-time-input-clock-icon`, `.astryx-date-time-input-time-listbox`, `.astryx-date-time-input-time-option`

### Date Time Input

DateTimeInput combines date and time selection in one field. With nativePicker="touch" (the default), mouse/trackpad devices use Astryx typed fields and popovers, while coarse-pointer devices use browser/OS date and time controls in the same two-segment field. nativePicker="always" uses both native controls on every pointer; nativePicker="never" keeps Astryx's own surfaces — pointer fields on fine pointers and the coordinated Date/Time bottom sheet on coarse pointers. The closed segments stay side by side when at least 400px is available and wrap into full-width rows below 400px, independent of viewport width. Use it for scheduling, event creation, deadline setting, or any form field that needs a specific datetime.

**Do**

- Provide clear labels and descriptions so users understand what datetime is expected.
- Use min and max to restrict selectable datetimes to valid ranges.
- Use hasClear when the datetime is optional so the user can reset it.
- Choose the hour format (12h or 24h) that matches your audience's locale.

**Don't**

- Use DateTimeInput when only a date is needed; use DateInput instead.
- Use DateTimeInput when only a time is needed; use TimeInput instead.
- Hide the label without surrounding context that makes the field purpose obvious.
- Wrap a disabled DateTimeInput in Tooltip to explain why it is disabled; disabled triggers swallow the hover events the wrapper needs. Use the disabledMessage prop instead.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `string` |  | 标签文本。 |
| `isLabelHidden` | `boolean` | `false` | 视觉隐藏标签。 |
| `description` | `string` |  | 显示在标签下方的辅助文本。 |
| `isOptional` | `boolean` | `false` | 在标签旁显示"(optional)"指示器。 |
| `isRequired` | `boolean` | `false` | 将字段标记为必填。 |
| `isDisabled` | `boolean` | `false` | 禁用输入框和选择器。 |
| `disabledMessage` | `string` |  | 说明输入框为何被禁用。与 isDisabled 一起使用时，在悬停/键盘聚焦时显示提示，并通过 aria-disabled 保持日期和时间字段可聚焦（仍阻止输入和激活）。请使用此属性，而不是用 Tooltip 包裹已禁用的 DateTimeInput。 |
| `value` | `ISODateTimeString` |  | 选中的日期时间，ISO 8601 格式。 |
| `onChange` * | `(value: ISODateTimeString \| undefined) => void` |  | 选中日期时间变更时调用的回调。 |
| `changeAction` | `(value: ISODateTimeString \| undefined) => void \| Promise<void>` |  | 在 onChange 之后触发的异步操作。通过 useTransition 驱动乐观更新。 |
| `isLoading` | `boolean` | `false` | 输入框是否处于加载状态。禁用交互并显示加载指示器。 |
| `min` | `ISODateTimeString` |  | 可选择的最早日期时间。同时约束日期和时间选择。 |
| `max` | `ISODateTimeString` |  | 可选择的最晚日期时间。同时约束日期和时间选择。 |
| `dateConstraints` | `Array<(date: Date) => boolean>` |  | 自定义约束函数数组，用于禁用特定日期。 |
| `hasSeconds` | `boolean` | `false` | 在时间部分包含秒。即使 nativePicker 选择原生界面，也会保留 Astryx 时间字段，因为 iOS 没有秒滚轮。 |
| `hourFormat` | `'12h' \| '24h'` | `'12h'` | 控制显示格式。'12h' 显示 AM/PM；'24h' 使用 24 小时制。 |
| `timeIncrement` | `1 \| 5 \| 10 \| 15 \| 30` | `1` | Astryx 可输入时间字段中箭头键的分钟步长。非默认值会在 nativePicker 模式下保留 Astryx 时间字段，因为 iOS 将原生 step 视为验证规则，而不是选择器步长。Astryx 触摸面板使用滚轮。 |
| `hasClear` | `boolean` | `false` | 当有值时显示清除按钮。 |
| `placeholder` | `string` | `'Select a date'` | 日期部分未选择日期时显示的占位符文本。 |
| `timePlaceholder` | `string` | `'Select a time'` | 时间部分未选择时间时显示的占位符文本。在触摸设备上，这会显示在未选择时间的闭合时间段中。 |
| `timeLabel` | `string` |  | 时间部分的无障碍标签。默认为“{label} time”，与字段标签关联且可本地化。 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 输入控件的尺寸。 |
| `status` | `{type: 'warning' \| 'error' \| 'success', message?: string}` |  | 错误、警告或成功状态的状态指示对象，附带消息。 |
| `labelTooltip` | `string` |  | 通过标签末尾的信息图标显示的提示文本。 |
| `numberOfMonths` | `1 \| 2` | `1` | Astryx 指针日历弹出层中同时显示的月份数量。原生日期控件和移动触摸面板会忽略此属性；触摸面板的日期部分一次显示一个可滑动月份。 |
| `weekStartsOn` | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 'sun' \| 'mon' \| 'tue' \| 'wed' \| 'thu' \| 'fri' \| 'sat'` | `0` | Astryx 日历中每周的起始日。可为数字（0=周日……6=周六）或三字母星期缩写。原生日期控件会忽略此属性。 |
| `nativePicker` | `'touch' \| 'always' \| 'never'` | `'touch'` | 选择由哪些界面绘制日期和时间选择器。'touch'（默认）在粗略主指针设备上使用浏览器/操作系统的原生控件；'always' 在支持 input type=date/time 的浏览器中始终使用原生控件；'never' 始终使用 Astryx 自带的界面。原生时间控件仅用于默认的分钟精度：hasSeconds、非默认 timeIncrement 或 timeOptionInterval 会保留 Astryx 时间字段，因为 iOS 无法忠实表达这些行为。需要 numberOfMonths、weekStartsOn 或可见 dateConstraints 行为时请使用 'never'。约束会在提交时执行，min/max 作为提示传给原生控件。hourFormat 格式化关闭状态的时间，而操作系统选择器遵循用户区域设置。 |
| `xstyle` | `StyleXStyles` |  | 用于布局自定义的 StyleX 样式。必须是 stylex.create() 的值。 |

Styling hook class: `.astryx-date-time-input`, `.astryx-date-time-input-date-segment`, `.astryx-date-time-input-time-segment`, `.astryx-date-time-input-toggle-icon`, `.astryx-date-time-input-clock-icon`, `.astryx-date-time-input-time-listbox`, `.astryx-date-time-input-time-option`

## Files

- `src/DateTimeInput.doc.mjs`
- `src/DateTimeInput.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/DateTimeInput
