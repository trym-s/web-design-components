# Text Input

TextInput collects short-form text like names, emails, or search queries. Use it for single-line values where the expected input is brief. Pair it with validation status to guide users through required or formatted fields.

## Classification

- Category: `input` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/TextInput.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: TextInput collects short-form text like names, emails, or search queries.
- Avoid when: Don't use placeholder text as a replacement for a label; placeholders disappear on focus and are not reliably read by screen readers. Don't use TextInput for multi-line content like comments or descriptions; use TextArea instead. Don't mark every field as required; only flag mandatory fields so users are not overwhelmed by validation errors. Don't wrap a disabled TextInput in Tooltip to explain why it's disabled; disabled controls swallow the hover events the wrapper needs. Use the disabledMessage prop instead.
- Provides: Label, Description, Start icon, Placeholder, Clear button, Spinner, Status icon
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: TextInputShowcase, TextInputIcon, TextInputSearch, TextInputSizes, TextInputStates, TextInputStatusVariant, TextInputTypes
- Upstream: Astryx core · Form Controls
- Keywords: textinput, textfield, input, search, clearable, prefix, suffix, adornment, validation

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

- `src/examples/TextInputShowcase.tsx` — Text Input · static: `static/TextInputShowcase.html`
- `src/examples/TextInputIcon.tsx` — TextInput — Icon: Inputs with a leading icon that hints at the expected content. Use when the icon helps users identify the field faster, like a lock for passwords or an envelope for email. · static: `static/TextInputIcon.html`
- `src/examples/TextInputSearch.tsx` — TextInput — Search: Search input with a hidden label, start icon, and clear button. Use for toolbar and header search bars where the icon provides sufficient context. · static: `static/TextInputSearch.html`
- `src/examples/TextInputSizes.tsx` — TextInput — Sizes: Small, medium, and large inputs side by side. Use small in dense UIs like table filters, medium for most forms, and large for prominent single-field pages. · static: `static/TextInputSizes.html`
- `src/examples/TextInputStates.tsx` — TextInput — States: Error, warning, and success validation states with status messages. Use to show users what went wrong and how to fix it. · static: `static/TextInputStates.html`
- `src/examples/TextInputStatusVariant.tsx` — TextInput — Status variant: The statusVariant prop controls whether the status message is attached to the bordered input (default, overlapping directly below) or detached from it (floating below as a separate element with spacing). · static: `static/TextInputStatusVariant.html`
- `src/examples/TextInputTypes.tsx` — TextInput — Types: Text, password, and email types plus field-level features: tooltip, required, optional, description, disabled, and loading. · static: `static/TextInputTypes.html`

## Documentation

### Text Input

TextInput collects short-form text like names, emails, or search queries. Use it for single-line values where the expected input is brief. Pair it with validation status to guide users through required or formatted fields.

**Do**

- Always provide a visible label so users know what the field is for. Only hide the label when surrounding context makes it obvious, like a search bar with a magnifying-glass icon.
- Use validation status with a message to explain what went wrong: "Email must include @" is better than just turning the border red.
- Size the input to match the expected content length so users can gauge how much to type: small for zip codes, medium for names, large for URLs.
- Add a clear button for search and filter inputs so users can quickly reset without selecting all text.

**Don't**

- Don't use placeholder text as a replacement for a label; placeholders disappear on focus and are not reliably read by screen readers.
- Don't use TextInput for multi-line content like comments or descriptions; use TextArea instead.
- Don't mark every field as required; only flag mandatory fields so users are not overwhelmed by validation errors.
- Don't wrap a disabled TextInput in Tooltip to explain why it's disabled; disabled controls swallow the hover events the wrapper needs. Use the disabledMessage prop instead.

**Anatomy**

- Label (required) — Text that identifies the field. Always rendered for accessibility even when visually hidden.
- Description — Helper text between the label and the input that provides additional context or formatting hints.
- Start icon — A leading icon inside the input that hints at the expected content, like a magnifying glass for search.
- Placeholder — Hint text shown when the input is empty. Disappears on focus.
- Clear button — A trailing × button that resets the value and returns focus to the input.
- Spinner — Loading indicator that appears during async actions like server-side validation.
- Status icon — A trailing icon (error, warning, or success) that communicates validation state.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `'text' \| 'password' \| 'email'` | `'text'` | The HTML input type. |
| `label` * | `string` |  | Label text for the input: always rendered for accessibility. |
| `value` * | `string` |  | Current value of the input. |
| `onChange` | `(value: string, e: ChangeEvent<HTMLInputElement>) => void` |  | Callback fired when the input value changes. |
| `changeAction` | `(value: string, e: ChangeEvent<HTMLInputElement>) => void \| Promise<void>` |  | Async action fired after onChange (if not prevented). Triggers optimistic update and shows a loading spinner while pending. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant of the input. |
| `isLabelHidden` | `boolean` | `false` | Visually hides the label while keeping it accessible to screen readers. |
| `description` | `string` |  | Description text displayed between the label and input. |
| `isOptional` | `boolean` | `false` | Displays an "Optional" indicator next to the label. Mutually exclusive with isRequired. |
| `isRequired` | `boolean` | `false` | Displays a "Required" indicator next to the label and sets aria-required. Mutually exclusive with isOptional. |
| `onEnter` | `() => void` |  | Callback fired when the user presses the Enter key. IME-safe: Enter used to commit a Japanese/Chinese/Korean conversion does not fire it. |
| `onKeyDown` | `(e: KeyboardEvent<HTMLInputElement>) => void` |  | Callback fired on keydown events on the input. |
| `isDisabled` | `boolean` | `false` | Disables the input, preventing interaction and dimming the element. |
| `isReadOnly` | `boolean` | `false` | Makes the input read-only: the value is shown at full opacity and still submits with the form, but cannot be edited. Unlike isDisabled, a read-only input is not dimmed and stays in the tab order. isDisabled takes precedence when both are set. |
| `disabledMessage` | `string` |  | Explains why the input is disabled. With isDisabled, shows a tooltip on hover/keyboard focus and keeps the input focusable via aria-disabled (the field becomes read-only). Use this instead of wrapping a disabled TextInput in Tooltip. Disabled controls swallow the hover events an external Tooltip needs. |
| `isLoading` | `boolean` | `false` | Puts the input in a loading state, showing a spinner and setting aria-busy. |
| `placeholder` | `string` |  | Placeholder text shown when the input is empty. |
| `labelTooltip` | `string` |  | Tooltip text displayed in an info icon at the end of the label. |
| `startIcon` | `IconType` |  | SVG icon component displayed at the start of the input. See `astryx docs icons` for valid semantic names. |
| `status` | `{type: 'error' \| 'warning' \| 'success', message?: string}` |  | Validation status: applies a colored border and status icon. If message is provided, displays a floating message below the input. Error type also sets aria-invalid. |
| `statusVariant` | `'attached' \| 'detached' \| 'tooltip'` | `'attached'` | How the status message is placed relative to the input. attached overlaps directly below the input (bordered treatment); detached floats below as a separate element with spacing; tooltip hides the message box and surfaces it in a tooltip on the status icon. |
| `hasClear` | `boolean` | `false` | Shows a clear (×) button when the input has a value. Clicking it clears the value and returns focus to the input. |
| `hasAutoFocus` | `boolean` | `false` | Automatically focuses the input on mount. |
| `htmlName` | `string` |  | The HTML name attribute for the input, useful for form submissions. |
| `width` | `SizeValue` |  | Width of the field (number = pixels, string used as-is, e.g. "100%"). Sizes the whole field (label, control, and status) so they stay aligned. |
| `autoComplete` | `string` |  | The native autocomplete attribute, forwarded to the input unchanged. Does not affect the controlled value. |

Styling hook class: `.astryx-text-input`

### Text Input

TextInput collects short-form text like names, emails, or search queries. Use it for single-line values where the expected input is brief. Pair it with validation status to guide users through required or formatted fields.

**Do**

- Always provide a visible label so users know what the field is for. Only hide the label when surrounding context makes it obvious, like a search bar with a magnifying-glass icon.
- Use validation status with a message to explain what went wrong: "Email must include @" is better than just turning the border red.
- Size the input to match the expected content length so users can gauge how much to type: small for zip codes, medium for names, large for URLs.
- Add a clear button for search and filter inputs so users can quickly reset without selecting all text.

**Don't**

- Don't use placeholder text as a replacement for a label; placeholders disappear on focus and are not reliably read by screen readers.
- Don't use TextInput for multi-line content like comments or descriptions; use TextArea instead.
- Don't mark every field as required; only flag mandatory fields so users are not overwhelmed by validation errors.
- Don't wrap a disabled TextInput in Tooltip to explain why it's disabled; disabled controls swallow the hover events the wrapper needs. Use the disabledMessage prop instead.

**Anatomy**

- Label (required) — Text that identifies the field. Always rendered for accessibility even when visually hidden.
- Description — Helper text between the label and the input that provides additional context or formatting hints.
- Start icon — A leading icon inside the input that hints at the expected content, like a magnifying glass for search.
- Placeholder — Hint text shown when the input is empty. Disappears on focus.
- Clear button — A trailing × button that resets the value and returns focus to the input.
- Spinner — Loading indicator that appears during async actions like server-side validation.
- Status icon — A trailing icon (error, warning, or success) that communicates validation state.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `'text' \| 'password' \| 'email'` | `'text'` | HTML 输入框类型。 |
| `label` * | `string` |  | 输入框的标签文本：始终渲染以确保无障碍性。 |
| `value` * | `string` |  | 输入框的当前值。 |
| `onChange` | `(value: string, e: ChangeEvent<HTMLInputElement>) => void` |  | 输入框值变化时触发的回调。 |
| `changeAction` | `(value: string, e: ChangeEvent<HTMLInputElement>) => void \| Promise<void>` |  | 在 onChange 之后（如果未被阻止）触发的异步操作。触发乐观更新并在挂起时显示加载旋转器。 |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 输入框的尺寸变体。 |
| `isLabelHidden` | `boolean` | `false` | 视觉上隐藏标签，同时保持屏幕阅读器的无障碍性。 |
| `description` | `string` |  | 显示在标签和输入框之间的描述文本。 |
| `isOptional` | `boolean` | `false` | 在标签旁显示"可选"指示器。与 isRequired 互斥。 |
| `isRequired` | `boolean` | `false` | 在标签旁显示"必填"指示器并设置 aria-required。与 isOptional 互斥。 |
| `isDisabled` | `boolean` | `false` | 禁用输入框，阻止交互并使元素变暗。 |
| `isReadOnly` | `boolean` | `false` | 将输入框设为只读：值以完整不透明度显示并仍随表单提交，但无法编辑。与 isDisabled 不同，只读输入框不会变暗，并保留在 Tab 顺序中。同时设置时 isDisabled 优先。 |
| `disabledMessage` | `string` |  | 说明输入框被禁用的原因。与 isDisabled 一起使用时，在悬停/键盘聚焦时显示工具提示，并通过 aria-disabled 保持输入框可聚焦（字段变为只读）。请使用此属性，而不是用 Tooltip 包裹已禁用的 TextInput——已禁用的控件会吞掉外部 Tooltip 所需的悬停事件。 |
| `isLoading` | `boolean` | `false` | 使输入框进入加载状态，显示旋转器并设置 aria-busy。 |
| `placeholder` | `string` |  | 输入框为空时显示的占位符文本。 |
| `labelTooltip` | `string` |  | 在标签末尾的信息图标中显示的工具提示文本。 |
| `startIcon` | `IconType` |  | 显示在输入框起始位置的 SVG 图标组件（例如来自 heroicons 或 lucide）。 |
| `status` | `{type: 'error' \| 'warning' \| 'success', message?: string}` |  | 验证状态：应用彩色边框和状态图标。如果提供了 message，在输入框下方显示浮动消息。错误类型还会设置 aria-invalid。 |
| `statusVariant` | `'attached' \| 'detached' \| 'tooltip'` | `'attached'` | 状态消息相对于输入框的放置方式。attached 直接叠加在输入框下方（带边框处理）；detached 作为独立元素浮于下方并留有间距；tooltip 隐藏消息框，并在状态图标上以提示气泡形式显示。 |
| `hasClear` | `boolean` | `false` | 输入有值时显示清除 (×) 按鈕。点击后清空值并将焦点返回输入框。 |
| `hasAutoFocus` | `boolean` | `false` | 挂载时自动聚焦输入框。 |
| `htmlName` | `string` |  | 输入框的 HTML name 属性，用于表单提交。 |
| `autoComplete` | `string` |  | 原生 autocomplete 属性，原样转发给输入框。不影响受控的值。 |

Styling hook class: `.astryx-text-input`

## Files

- `src/TextInput.doc.mjs`
- `src/TextInput.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/TextInput
