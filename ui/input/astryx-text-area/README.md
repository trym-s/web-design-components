# Text Area

TextArea is a multi-line text input for collecting longer-form content like comments, descriptions, or messages. Use it when the expected input spans multiple lines. For shorter, single-line values, use TextInput.

## Classification

- Category: `input` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/TextArea.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: TextArea is a multi-line text input for collecting longer-form content like comments, descriptions, or messages.
- Avoid when: Avoid using TextArea for short, single-line values like names or emails; use TextInput instead. Don't rely solely on placeholder text to communicate the purpose of the field; placeholders disappear on focus and are not accessible labels. Don't show a status message without also setting the status type; the colored border and icon are what draw the user's attention to the message. Don't wrap a disabled TextArea in Tooltip to explain why it's disabled; disabled controls swallow the hover events the wrapper needs. Use the disabledMessage prop instead.
- Provides: Label, Description, Input container, Text area, Placeholder, Start icon, Custom start content, Spinner, Status icon, Character counter, Field status message, Tooltip status message
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: TextAreaShowcase, TextAreaCharacterCount, TextAreaStates, TextAreaValidation, TextAreaWithIcon
- Upstream: Astryx core · Form Controls
- Keywords: textarea, textfield, multiline, comment, message, autoresize, autosize, charlimit

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

- `upstream/examples/TextAreaShowcase.tsx` — Text Area: A text area with placeholder text. · static: `static/TextAreaShowcase.html`
- `upstream/examples/TextAreaCharacterCount.tsx` — TextArea — Character Count: Textareas with maxLength and a live character counter. The counter turns red when the limit is exceeded. · static: `static/TextAreaCharacterCount.html`
- `upstream/examples/TextAreaStates.tsx` — TextArea — States: Required, disabled, and loading textareas side by side. Shows the interactive states the component supports. · static: `static/TextAreaStates.html`
- `upstream/examples/TextAreaValidation.tsx` — TextArea — Validation: All three status variants (error, warning, and success) with status messages, plus error without a message. Use to show inline validation feedback as the user types. · static: `static/TextAreaValidation.html`
- `upstream/examples/TextAreaWithIcon.tsx` — TextArea — Icon: Textareas with a leading icon that hints at the expected content, like a chat bubble for messages or a pencil for notes. · static: `static/TextAreaWithIcon.html`

## Documentation

### Text Area

TextArea is a multi-line text input for collecting longer-form content like comments, descriptions, or messages. Use it when the expected input spans multiple lines. For shorter, single-line values, use TextInput.

**Do**

- Provide a visible label so users know what to enter. If the label must be hidden, set isLabelHidden with a descriptive label for screen readers.
- Set maxLength with a character counter when there is a defined limit; it helps users stay within bounds before they submit.
- Use the status prop to surface validation feedback inline: show success when input is valid, warning for soft limits, and error for hard failures.
- Add a description or placeholder to clarify expected content, like "Describe the issue in detail," but never rely on placeholder alone as the only label.

**Don't**

- Avoid using TextArea for short, single-line values like names or emails; use TextInput instead.
- Don't rely solely on placeholder text to communicate the purpose of the field; placeholders disappear on focus and are not accessible labels.
- Don't show a status message without also setting the status type; the colored border and icon are what draw the user's attention to the message.
- Don't wrap a disabled TextArea in Tooltip to explain why it's disabled; disabled controls swallow the hover events the wrapper needs. Use the disabledMessage prop instead.

**Anatomy**

- Label (required) — Text identifying the multi-line field.
- Description — Helper text between the label and the input.
- Input container (required) — Painted boundary containing the text area and its overlays.
- Text area (required) — Multi-line control that displays and edits the value.
- Placeholder — Hint text shown inside the empty text area.
- Start icon — Astryx Icon rendered at the start when startIcon is a semantic name or icon component.
- Custom start content — Caller-provided ReactNode rendered at the start instead of an Astryx Icon.
- Spinner — Loading indicator shown at the end of the input container.
- Status icon — Error, warning, or success icon shown inside the input.
- Character counter — Current and maximum character counts shown inside the input container.
- Field status message — Attached or detached error, warning, or success message associated with the field.
- Tooltip status message — Tooltip surface presenting the status message for the tooltip variant.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `ref` | `React.Ref<HTMLTextAreaElement>` |  | Ref forwarded to the underlying <textarea> element. |
| `label` * | `string` |  | Label text for the textarea. Always rendered for accessibility. |
| `value` * | `string` |  | Current value of the textarea. |
| `onChange` | `(value: string, e: ChangeEvent<HTMLTextAreaElement>) => void` |  | Callback fired when the textarea value changes. |
| `changeAction` | `(value: string, e: ChangeEvent<HTMLTextAreaElement>) => void \| Promise<void>` |  | Async action fired after onChange inside a React transition. Enables optimistic updates via useOptimistic. |
| `isLabelHidden` | `boolean` | `false` | Visually hides the label while keeping it accessible to screen readers. |
| `description` | `string` |  | Helper text displayed between the label and textarea. |
| `isOptional` | `boolean` | `false` | Displays an "Optional" indicator next to the label. Mutually exclusive with isRequired. |
| `isRequired` | `boolean` | `false` | Displays a "Required" indicator next to the label and sets aria-required. Mutually exclusive with isOptional. |
| `isDisabled` | `boolean` | `false` | Disables the textarea, preventing interaction. |
| `isReadOnly` | `boolean` | `false` | Makes the textarea read-only: the value is shown at full opacity and still submits with the form, but cannot be edited. Unlike isDisabled, a read-only textarea is not dimmed and stays in the tab order. isDisabled takes precedence when both are set. |
| `disabledMessage` | `string` |  | Explains why the textarea is disabled. With isDisabled, shows a tooltip on hover/keyboard focus and keeps the textarea focusable via aria-disabled (the field becomes read-only). Use this instead of wrapping a disabled TextArea in Tooltip. Disabled controls swallow the hover events an external Tooltip needs. |
| `isLoading` | `boolean` | `false` | Puts the textarea in a loading state, showing a spinner inside the input. |
| `placeholder` | `string` |  | Placeholder text shown when the textarea is empty. |
| `rows` | `number` | `3` | Number of visible text rows. |
| `maxLength` | `number` |  | Maximum number of characters allowed, counted as user-perceived characters: an emoji or flag sequence counts as one. When set, a character counter (current/max) is displayed inside the input container, anchored to the bottom-right beneath the text. Does not enforce the limit natively; when exceeded the counter turns red and shows a warning icon (a non-color cue), and screen-reader users hear the remaining/over-limit count announced. Consumers validating the limit should count with characterCount (exported from the package) so enforcement matches the displayed count. |
| `status` | `{ type: 'warning' \| 'error' \| 'success'; message?: string }` |  | Status indicator that applies a colored border and icon. An optional message is displayed in a floating box below the textarea. |
| `statusVariant` | `'attached' \| 'detached' \| 'tooltip'` | `'attached'` | How the status message is placed relative to the input. attached overlaps directly below the input (bordered treatment); detached floats below as a separate element with spacing; tooltip hides the message box and surfaces it in a tooltip on the status icon. |
| `labelTooltip` | `string` |  | Tooltip text displayed in an info icon at the end of the label. |
| `startIcon` | `IconType` |  | Icon component rendered inside the leading edge of the textarea wrapper. See `astryx docs icons` for valid semantic names. |
| `hasSpellCheck` | `boolean` | `true` | Enables or disables browser spell checking. |
| `hasAutoFocus` | `boolean` | `false` | Automatically focuses the textarea on mount. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the textarea, affecting internal padding. Height is controlled by rows, not size. |
| `onPaste` | `(e: ClipboardEvent<HTMLTextAreaElement>) => void` |  | Callback fired when content is pasted into the textarea. |
| `htmlName` | `string` |  | HTML name attribute for the textarea element, useful for form submissions. |
| `width` | `SizeValue` |  | Width of the field (number = pixels, string used as-is, e.g. "100%"). Sizes the whole field (label, control, and status) so they stay aligned. |
| `onFocus` | `(e: FocusEvent<HTMLTextAreaElement>) => void` |  | Callback fired when the textarea receives focus. |
| `onBlur` | `(e: FocusEvent<HTMLTextAreaElement>) => void` |  | Callback fired when the textarea loses focus. |
| `autoComplete` | `string` |  | The native autocomplete attribute, forwarded to the textarea unchanged. Does not affect the controlled value. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value, not an inline style object like style={{}}. |

Styling hook class: `.astryx-text-area`, `.astryx-text-area-control`, `.astryx-text-area-counter`, `.astryx-textarea`

### Text Area

TextArea is a multi-line text input for collecting longer-form content like comments, descriptions, or messages. Use it when the expected input spans multiple lines. For shorter, single-line values, use TextInput.

**Do**

- Provide a visible label so users know what to enter. If the label must be hidden, set isLabelHidden with a descriptive label for screen readers.
- Set maxLength with a character counter when there is a defined limit; it helps users stay within bounds before they submit.
- Use the status prop to surface validation feedback inline: show success when input is valid, warning for soft limits, and error for hard failures.
- Add a description or placeholder to clarify expected content, like "Describe the issue in detail," but never rely on placeholder alone as the only label.

**Don't**

- Avoid using TextArea for short, single-line values like names or emails; use TextInput instead.
- Don't rely solely on placeholder text to communicate the purpose of the field; placeholders disappear on focus and are not accessible labels.
- Don't show a status message without also setting the status type; the colored border and icon are what draw the user's attention to the message.
- Don't wrap a disabled TextArea in Tooltip to explain why it's disabled; disabled controls swallow the hover events the wrapper needs. Use the disabledMessage prop instead.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `ref` | `React.Ref<HTMLTextAreaElement>` |  | 转发至底层 <textarea> 元素的 ref。 |
| `label` * | `string` |  | 文本域的标签文本：始终渲染以确保无障碍性。 |
| `value` * | `string` |  | 文本域的当前值。 |
| `onChange` | `(value: string, e: ChangeEvent<HTMLTextAreaElement>) => void` |  | 文本域值变化时触发的回调。 |
| `changeAction` | `(value: string, e: ChangeEvent<HTMLTextAreaElement>) => void \| Promise<void>` |  | 在 React transition 内于 onChange 之后触发的异步操作。通过 useOptimistic 启用乐观更新。 |
| `isLabelHidden` | `boolean` | `false` | 视觉上隐藏标签，同时保持屏幕阅读器的无障碍性。 |
| `description` | `string` |  | 显示在标签和文本域之间的辅助文本。 |
| `isOptional` | `boolean` | `false` | 在标签旁显示"可选"指示器。与 isRequired 互斥。 |
| `isRequired` | `boolean` | `false` | 在标签旁显示"必填"指示器并设置 aria-required。与 isOptional 互斥。 |
| `isDisabled` | `boolean` | `false` | 禁用文本域，阻止交互。 |
| `isReadOnly` | `boolean` | `false` | 将文本域设为只读：值以完整不透明度显示并仍随表单提交，但无法编辑。与 isDisabled 不同，只读文本域不会变暗，并保留在 Tab 顺序中。同时设置时 isDisabled 优先。 |
| `disabledMessage` | `string` |  | 说明文本域被禁用的原因。与 isDisabled 一起使用时，在悬停/键盘聚焦时显示工具提示，并通过 aria-disabled 保持文本域可聚焦（字段变为只读）。请使用此属性，而不是用 Tooltip 包裹已禁用的 TextArea。 |
| `isLoading` | `boolean` | `false` | 使文本域进入加载状态，在输入框内显示旋转器。 |
| `placeholder` | `string` |  | 文本域为空时显示的占位符文本。 |
| `rows` | `number` | `3` | 可见文本行数。 |
| `maxLength` | `number` |  | 允许的最大字符数。设置后，在文本域下方显示字符计数器（当前/最大）。不原生强制限制：超出时计数器显示错误样式。 |
| `status` | `{ type: 'warning' \| 'error' \| 'success'; message?: string }` |  | 应用彩色边框和图标的状态指示器。可选消息显示在文本域下方的浮动框中。 |
| `statusVariant` | `'attached' \| 'detached' \| 'tooltip'` | `'attached'` | 状态消息相对于输入框的放置方式。attached 直接叠加在输入框下方（带边框处理）；detached 作为独立元素浮于下方并留有间距；tooltip 隐藏消息框，并在状态图标上以提示气泡形式显示。 |
| `labelTooltip` | `string` |  | 在标签末尾的信息图标中显示的工具提示文本。 |
| `startIcon` | `IconType` |  | 在文本域包装器前端内部渲染的图标组件。 |
| `hasSpellCheck` | `boolean` | `true` | 启用或禁用浏览器拼写检查。 |
| `hasAutoFocus` | `boolean` | `false` | 挂载时自动聚焦文本域。 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 文本域的尺寸，影响内部填充。高度由 rows 控制，而非 size。 |
| `onPaste` | `(e: ClipboardEvent<HTMLTextAreaElement>) => void` |  | 内容粘贴到文本域时触发的回调。 |
| `htmlName` | `string` |  | 文本域元素的 HTML name 属性，用于表单提交。 |
| `onFocus` | `(e: FocusEvent<HTMLTextAreaElement>) => void` |  | 文本域获得焦点时触发的回调。 |
| `onBlur` | `(e: FocusEvent<HTMLTextAreaElement>) => void` |  | 文本域失去焦点时触发的回调。 |
| `autoComplete` | `string` |  | 原生 autocomplete 属性，原样转发给文本域。不影响受控的值。 |
| `xstyle` | `StyleXStyles` |  | StyleX 样式，用于布局自定义（边距、定位、尺寸）。必须是 stylex.create() 的值，而非内联样式对象。 |

Styling hook class: `.astryx-text-area`, `.astryx-text-area-control`, `.astryx-text-area-counter`, `.astryx-textarea`

## Files

- `upstream/TextArea.doc.mjs`
- `upstream/TextArea.spec.md`
- `upstream/TextArea.tsx`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/TextArea
