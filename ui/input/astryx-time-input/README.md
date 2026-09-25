# Time Input

TimeInput uses a browser/OS time picker on coarse pointers by default and Astryx's typed field on fine pointers. It converts values to a standard format and supports arrow-key adjustment on the typed surface. Use it in forms, scheduling flows, or any interface where users need to select a specific time.

## Classification

- Category: `input` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/TimeInput.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: TimeInput uses a browser/OS time picker on coarse pointers by default and Astryx's typed field on fine pointers.
- Avoid when: Don't use TimeInput for combined date-and-time selection; pair it with a separate DateInput instead. Don't hide the label; even when space is tight, keep the label visible or provide a description so the purpose is clear. Wrap a disabled TimeInput in Tooltip to explain why it is disabled; disabled triggers swallow the hover events the wrapper needs. Use the disabledMessage prop instead.
- Provides: Clock icon, Time control, Clear button, Status icon, Spinner
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: TimeInputShowcase, TimeInputConstrained, TimeInputFormats, TimeInputIncrement, TimeInputStates
- Upstream: Astryx core · Form Controls
- Keywords: timeinput, timepicker, time, clock, hour, minute, ampm, timeselect, timefield, schedule

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

- `src/examples/TimeInputShowcase.tsx` — Time Input: A time input that uses the browser/OS picker on touch by default and Astryx typed entry on fine pointers. · static: `static/TimeInputShowcase.html`
- `src/examples/TimeInputConstrained.tsx` — TimeInput — Constrained: Time inputs with min/max constraints limiting selection to specific windows. Use to prevent out-of-bounds selections for appointments, reservations, or shift scheduling. · static: `static/TimeInputConstrained.html`
- `src/examples/TimeInputFormats.tsx` — TimeInput — Formats: 12-hour, 24-hour, and seconds formats side by side. Use 12h for US-centric UIs, 24h for international or technical contexts, and seconds for precise timing. · static: `static/TimeInputFormats.html`
- `src/examples/TimeInputIncrement.tsx` — TimeInput — Increment: Time input with a custom step increment. Arrow keys jump by the specified interval (e.g. 15 minutes) for quick slot-based scheduling. · static: `static/TimeInputIncrement.html`
- `src/examples/TimeInputStates.tsx` — TimeInput — States: Default, disabled, error, warning, and success states. Use status messages to give users clear feedback about their time selection. · static: `static/TimeInputStates.html`

## Documentation

### Time Input

TimeInput uses a browser/OS time picker on coarse pointers by default and Astryx's typed field on fine pointers. It converts values to a standard format and supports arrow-key adjustment on the typed surface. Use it in forms, scheduling flows, or any interface where users need to select a specific time.

**Do**

- Choose the hour format (12h or 24h) that matches your audience's locale: 12-hour with AM/PM for US-centric UIs, 24-hour for international or technical contexts.
- Set min and max constraints when the context has a valid range, like business hours or event windows, so users cannot submit an out-of-bounds time.
- Provide a description or placeholder that hints at the expected format or purpose, like "Business hours: 9 AM – 5 PM".
- Use the status prop to surface validation errors inline: show a message like "Time must be during business hours" so users know exactly what to fix.
- Enable hasClear when the field is optional, so users can remove a previously selected time.
- Place TimeInput inside InputGroup when the time needs a single-line prefix or suffix addon, like a start/end label or timezone marker.

**Don't**

- Don't use TimeInput for combined date-and-time selection; pair it with a separate DateInput instead.
- Don't hide the label; even when space is tight, keep the label visible or provide a description so the purpose is clear.
- Wrap a disabled TimeInput in Tooltip to explain why it is disabled; disabled triggers swallow the hover events the wrapper needs. Use the disabledMessage prop instead.

**Anatomy**

- Clock icon — A leading clock icon that identifies the field and opens the browser/OS picker in native mode.
- Time control (required) — A real input type=time in native modes, or Astryx's editable text field for fine pointers, nativePicker="never", seconds, and custom increments.
- Clear button — A trailing button to reset the value, shown when hasClear is true and a value is set.
- Status icon — A trailing icon indicating error, warning, or success state.
- Spinner — Replaces trailing content during loading to show an async action is in progress.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `string` |  | Label text for the input (required for accessibility). |
| `isLabelHidden` | `boolean` | `false` | Visually hides the label while keeping it accessible to screen readers. |
| `description` | `string` |  | Description text displayed between the label and input. |
| `isOptional` | `boolean` | `false` | Shows an "(optional)" indicator next to the label. Mutually exclusive with isRequired. |
| `isRequired` | `boolean` | `false` | Marks the field as required and sets aria-required. Mutually exclusive with isOptional. |
| `isDisabled` | `boolean` | `false` | Disables the input and suppresses interactions. |
| `disabledMessage` | `string` |  | Explains why the input is disabled. With isDisabled, shows a tooltip on hover/keyboard focus and keeps the field focusable via aria-disabled (activation stays blocked). Use this instead of wrapping a disabled TimeInput in Tooltip. Disabled controls swallow the hover events an external Tooltip needs. |
| `value` | `ISOTimeString` |  | Controlled time value in ISO format (HH:MM or HH:MM:SS). |
| `onChange` | `(value: ISOTimeString \| undefined) => void` |  | Callback fired when the time changes. Receives undefined when the input is cleared. |
| `changeAction` | `(value: ISOTimeString \| undefined) => void \| Promise<void>` |  | Async action fired after onChange. Wrapped in a React transition to provide optimistic UI; triggers the loading spinner while pending. |
| `isLoading` | `boolean` | `false` | Puts the input into a loading state, displaying a spinner. |
| `min` | `ISOTimeString` |  | Minimum selectable time in ISO format. Values outside the range are rejected. |
| `max` | `ISOTimeString` |  | Maximum selectable time in ISO format. Values outside the range are rejected. |
| `hasSeconds` | `boolean` | `false` | Includes seconds in the time display and parsing. |
| `hasClear` | `boolean` | `false` | Shows a clear button when a value is set and the input is not disabled. |
| `hourFormat` | `'12h' \| '24h'` | `'12h'` | Controls the display format. '12h' shows AM/PM (e.g. '2:30 PM'); '24h' uses 24-hour notation (e.g. '14:30'). |
| `increment` | `number` | `1` | Number of minutes to add or subtract when the user presses the up or down arrow key. |
| `nativePicker` | `'touch' \| 'always' \| 'never'` | `'touch'` | Which surface selects the time. 'touch' (the default) uses the browser/OS input type=time on a coarse pointer and Astryx's typed field on a fine pointer; 'always' requests the native control on every pointer; 'never' keeps Astryx's typed field everywhere. Native mode forwards min/max and enforces them on commit. hasSeconds or increment other than 1 automatically retains the typed field because iOS has no seconds wheel and treats step as validation rather than picker cadence. hourFormat formats the closed value; the open OS picker follows the device locale. |
| `placeholder` | `string` | `'Select a time'` | Placeholder text shown when no time is selected. When the input is focused and empty, a format hint overrides this text. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Controls the height of the input element. |
| `status` | `{type: 'warning' \| 'error' \| 'success', message?: string}` |  | Status indicator that colors the border and displays an icon. When a message is provided it is rendered below the input. |
| `statusVariant` | `'attached' \| 'detached' \| 'tooltip'` | `'attached'` | How the status message is placed relative to the input. attached overlaps directly below the input (bordered treatment); detached floats below as a separate element with spacing; tooltip hides the message box and surfaces it in a tooltip on the status icon. |
| `labelTooltip` | `string` |  | Tooltip text rendered as an info icon at the end of the label row. |
| `width` | `SizeValue` |  | Width of the field (number = pixels, string used as-is, e.g. "100%"). Sizes the whole field (label, control, and status) so they stay aligned. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value, not an inline style object like style={{}}. |

Styling hook class: `.astryx-time-input`

### Time Input

TimeInput 默认在粗指针设备上使用浏览器/操作系统的时间选择器，在精细指针设备上使用 Astryx 文本字段。它将时间转换为标准格式，并在文本字段界面支持方向键调整。适用于表单、排期流程和其他时间选择场景。

**Do**

- Choose the hour format (12h or 24h) that matches your audience's locale: 12-hour with AM/PM for US-centric UIs, 24-hour for international or technical contexts.
- Set min and max constraints when the context has a valid range, like business hours or event windows, so users cannot submit an out-of-bounds time.
- Provide a description or placeholder that hints at the expected format or purpose, like "Business hours: 9 AM – 5 PM".
- Use the status prop to surface validation errors inline: show a message like "Time must be during business hours" so users know exactly what to fix.
- Enable hasClear when the field is optional, so users can remove a previously selected time.

**Don't**

- Don't use TimeInput for combined date-and-time selection; pair it with a separate DateInput instead.
- Don't hide the label; even when space is tight, keep the label visible or provide a description so the purpose is clear.
- Wrap a disabled TimeInput in Tooltip to explain why it is disabled; disabled triggers swallow the hover events the wrapper needs. Use the disabledMessage prop instead.

**Anatomy**

- Clock icon — 用于识别时间字段的前置时钟图标；在原生模式下也可打开浏览器/操作系统选择器。
- Time control (required) — 原生模式下使用真正的 input type=time；精细指针、nativePicker="never"、秒或自定义步进场景使用 Astryx 可编辑文本字段。
- Clear button — A trailing button to reset the value, shown when hasClear is true and a value is set.
- Status icon — A trailing icon indicating error, warning, or success state.
- Spinner — Replaces trailing content during loading to show an async action is in progress.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `string` |  | 输入框的标签文本（无障碍性所必需）。 |
| `isLabelHidden` | `boolean` | `false` | 视觉上隐藏标签，同时保持屏幕阅读器的无障碍性。 |
| `description` | `string` |  | 显示在标签和输入框之间的描述文本。 |
| `isOptional` | `boolean` | `false` | 在标签旁显示"（可选）"指示器。与 isRequired 互斥。 |
| `isRequired` | `boolean` | `false` | 将字段标记为必填并设置 aria-required。与 isOptional 互斥。 |
| `isDisabled` | `boolean` | `false` | 禁用输入框并抑制交互。 |
| `disabledMessage` | `string` |  | 说明输入框为何被禁用。与 isDisabled 一起使用时，在悬停/键盘聚焦时显示提示，并通过 aria-disabled 保持输入框可聚焦（仍阻止输入和调整）。请使用此属性，而不是用 Tooltip 包裹已禁用的 TimeInput。 |
| `value` | `ISOTimeString` |  | ISO 格式的受控时间值（HH:MM 或 HH:MM:SS）。 |
| `onChange` | `(value: ISOTimeString \| undefined) => void` |  | 时间变化时触发的回调。输入被清除时接收 undefined。 |
| `changeAction` | `(value: ISOTimeString \| undefined) => void \| Promise<void>` |  | 在 onChange 之后触发的异步操作。包装在 React transition 中以提供乐观 UI；挂起时触发加载旋转器。 |
| `isLoading` | `boolean` | `false` | 使输入框进入加载状态，显示旋转器。 |
| `min` | `ISOTimeString` |  | ISO 格式的最小可选时间。超出范围的值将被拒绝。 |
| `max` | `ISOTimeString` |  | ISO 格式的最大可选时间。超出范围的值将被拒绝。 |
| `hasSeconds` | `boolean` | `false` | 在时间显示和解析中包含秒。 |
| `hasClear` | `boolean` | `false` | 当有值且输入框未被禁用时显示清除按钮。 |
| `hourFormat` | `'12h' \| '24h'` | `'12h'` | 控制显示格式。'12h' 显示 AM/PM（例如 '2:30 PM'）；'24h' 使用 24 小时制（例如 '14:30'）。 |
| `increment` | `number` | `1` | 用户按上或下方向键时增加或减少的分钟数。 |
| `nativePicker` | `'touch' \| 'always' \| 'never'` | `'touch'` | 选择时间所用的界面。'touch'（默认）在粗指针设备上使用浏览器/操作系统的 input type=time，在精细指针设备上使用 Astryx 文本字段；'always' 在所有指针类型上请求原生控件；'never' 始终使用 Astryx 文本字段。原生模式会传递 min/max 并在提交时强制校验。hasSeconds 或 increment 不为 1 时会自动保留文本字段，因为 iOS 没有秒滚轮，并且只把 step 当作校验规则而非选择器步进。hourFormat 控制关闭状态的显示；打开的系统选择器遵循设备区域设置。 |
| `placeholder` | `string` | `'Select a time'` | 未选择时间时显示的占位符文本。当输入框聚焦且为空时，格式提示会覆盖此文本。 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 控制输入框元素的高度。 |
| `status` | `{type: 'warning' \| 'error' \| 'success', message?: string}` |  | 为边框着色并显示图标的状态指示器。当提供消息时，消息渲染在输入框下方。 |
| `statusVariant` | `'attached' \| 'detached' \| 'tooltip'` | `'attached'` | 状态消息相对于输入框的放置方式。attached 直接叠加在输入框下方（带边框处理）；detached 作为独立元素浮于下方并留有间距；tooltip 隐藏消息框，并在状态图标上以提示气泡形式显示。 |
| `labelTooltip` | `string` |  | 在标签行末尾以信息图标形式渲染的工具提示文本。 |
| `xstyle` | `StyleXStyles` |  | StyleX 样式，用于布局自定义（边距、定位、尺寸）。必须是 stylex.create() 的值，而非内联样式对象如 style={{}}。 |

Styling hook class: `.astryx-time-input`

## Files

- `src/TimeInput.doc.mjs`
- `src/TimeInput.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/TimeInput
