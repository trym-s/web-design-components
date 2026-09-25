# Checkbox Input

CheckboxInput toggles a single on/off value. Use it for settings like "Enable notifications", terms acceptance, or opt-in choices. For multiple checkboxes in a group, use CheckboxList instead.

## Classification

- Category: `input` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/CheckboxInput.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: CheckboxInput toggles a single on/off value.
- Avoid when: Use a checkbox for mutually exclusive choices; use RadioList when only one option can be selected. Use a checkbox for actions that take effect immediately; use a toggle switch or button instead. Wrap a disabled checkbox in Tooltip to explain why it is disabled; disabled controls swallow the hover events the wrapper needs. Use the disabledMessage prop instead.
- Provides: Checkbox, Label, Description, Status message
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: CheckboxInputShowcase, CheckboxInputBasic, CheckboxInputIndeterminateState, CheckboxInputStatusVariations
- Upstream: Astryx core · Form Controls
- Keywords: checkbox, check, toggle, tick, indeterminate, boolean, tristate

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

- `src/examples/CheckboxInputShowcase.tsx` — Checkbox Input: Interactive checkboxes showing checked, unchecked, and indeterminate states with descriptions. · static: `static/CheckboxInputShowcase.html`
- `src/examples/CheckboxInputBasic.tsx` — CheckboxInput — States: Checkboxes with labels and descriptions in checked, unchecked, and disabled states. Each checkbox controls a single on/off setting. Add a description to explain what the setting does. · static: `static/CheckboxInputBasic.html`
- `src/examples/CheckboxInputIndeterminateState.tsx` — CheckboxInput — Indeterminate: A "select all" checkbox that controls a group of options. When only some options are checked, it shows a dash instead of a checkmark. Clicking it checks or unchecks everything. · static: `static/CheckboxInputIndeterminateState.html`
- `src/examples/CheckboxInputStatusVariations.tsx` — CheckboxInput — Status: Checkboxes with error, warning, and success validation messages. Use the status prop to show feedback after form validation: errors block submission, warnings inform, and success confirms. · static: `static/CheckboxInputStatusVariations.html`

## Documentation

### Checkbox Input

CheckboxInput toggles a single on/off value. Use it for settings like "Enable notifications", terms acceptance, or opt-in choices. For multiple checkboxes in a group, use CheckboxList instead.

**Do**

- Always provide a visible label so the user knows what they are toggling. Use isLabelHidden only when surrounding context makes it obvious.
- Add a description for choices that need extra context, like explaining what "Share usage data" actually shares.
- Use the indeterminate state for "select all" checkboxes when only some items in a group are selected.

**Don't**

- Use a checkbox for mutually exclusive choices; use RadioList when only one option can be selected.
- Use a checkbox for actions that take effect immediately; use a toggle switch or button instead.
- Wrap a disabled checkbox in Tooltip to explain why it is disabled; disabled controls swallow the hover events the wrapper needs. Use the disabledMessage prop instead.

**Anatomy**

- Checkbox (required) — The check box itself: unchecked, checked, or indeterminate.
- Label (required) — Text describing what the checkbox controls. Always present for accessibility.
- Description — Helper text below the label with additional context.
- Status message — An error, warning, or success message below the checkbox.

**Accessibility**

- Checkbox box — WCAG 1.4.11 Non-text Contrast (3:1): The box edge (unchecked) and fill (checked) must have at least 3:1 contrast with the surface behind them. For Hover and Pointer down, measure the final colors after the tint and the pressed overlay are applied.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `ref` | `React.Ref<HTMLInputElement>` |  | Ref forwarded to the underlying <input> element. |
| `label` * | `string` |  | Label text for the checkbox (always rendered for accessibility). |
| `isLabelHidden` | `boolean` | `false` | Whether to visually hide the label (still accessible to screen readers). |
| `description` | `string` |  | Description text displayed below the label. |
| `value` * | `boolean \| 'indeterminate'` |  | Whether the checkbox is checked, unchecked, or indeterminate. |
| `onChange` | `(checked: boolean, e: ChangeEvent<HTMLInputElement>) => void` |  | Callback fired when the checkbox state changes. |
| `changeAction` | `(checked: boolean, e: ChangeEvent<HTMLInputElement>) => void \| Promise<void>` |  | Async action on change. Fires after onChange if not prevented. Shows loading spinner while pending. |
| `isLoading` | `boolean` | `false` | Whether the checkbox is in a loading state. Shows spinner and prevents interaction. |
| `isDisabled` | `boolean` | `false` | Whether the checkbox is disabled. |
| `htmlName` | `string` |  | The HTML name attribute for the underlying checkbox input, useful for form submissions (submits "on" when checked). |
| `disabledMessage` | `string` |  | Explains why the checkbox is disabled. With isDisabled, shows a tooltip on hover/keyboard focus and keeps the checkbox focusable via aria-disabled (toggling stays blocked). Use this instead of wrapping a disabled CheckboxInput in Tooltip. Disabled controls swallow the hover events an external Tooltip needs. |
| `isReadOnly` | `boolean` | `false` | Whether the checkbox is read-only. Displays the current state at full opacity but prevents interaction. Unlike `isDisabled`, read-only checkboxes are not visually dimmed. |
| `isOptional` | `boolean` | `false` | Whether the field is optional. Mutually exclusive with isRequired. |
| `isRequired` | `boolean` | `false` | Whether the checkbox is required. Mutually exclusive with isOptional. |
| `size` | `'sm' \| 'md'` | `'md'` | The size of the checkbox. sm for compact layouts, md for default. |
| `onFocus` | `(e: FocusEvent<HTMLInputElement>) => void` |  | Callback fired when the checkbox receives focus. |
| `onBlur` | `(e: FocusEvent<HTMLInputElement>) => void` |  | Callback fired when the checkbox loses focus. |
| `labelIcon` | `IconType` |  | Icon to display before the label text. See `astryx docs icons` for valid semantic names. |
| `status` | `{ type: 'error' \| 'warning' \| 'success', message: string }` |  | Status indicator. Displays a colored message box below the checkbox and sets aria-invalid for errors. |
| `width` | `SizeValue` |  | Width of the field (number = pixels, string used as-is, e.g. "100%"). Sizes the whole field (label, control, and status) so they stay aligned. |

Styling hook class: `.astryx-checkbox-input`, `.astryx-checkbox-indicator`, `.astryx-checkbox`, `.astryx-checkbox-label`

### Checkbox Input

CheckboxInput toggles a single on/off value. Use it for settings like "Enable notifications", terms acceptance, or opt-in choices. For multiple checkboxes in a group, use CheckboxList instead.

**Do**

- Always provide a visible label so the user knows what they are toggling. Use isLabelHidden only when surrounding context makes it obvious.
- Add a description for choices that need extra context, like explaining what "Share usage data" actually shares.
- Use the indeterminate state for "select all" checkboxes when only some items in a group are selected.

**Don't**

- Use a checkbox for mutually exclusive choices; use RadioList when only one option can be selected.
- Use a checkbox for actions that take effect immediately; use a toggle switch or button instead.
- Wrap a disabled checkbox in Tooltip to explain why it is disabled; disabled controls swallow the hover events the wrapper needs. Use the disabledMessage prop instead.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `ref` | `React.Ref<HTMLInputElement>` |  | 转发至底层 <input> 元素的 ref。 |
| `label` * | `string` |  | 复选框的标签文本（始终为无障碍性而渲染）。 |
| `isLabelHidden` | `boolean` | `false` | 是否视觉隐藏标签（屏幕阅读器仍可访问）。 |
| `description` | `string` |  | 显示在标签下方的描述文本。 |
| `value` * | `boolean \| 'indeterminate'` |  | 复选框是否为选中、未选中或不确定状态。 |
| `onChange` | `(checked: boolean, e: ChangeEvent<HTMLInputElement>) => void` |  | 复选框状态变更时触发的回调。 |
| `changeAction` | `(checked: boolean, e: ChangeEvent<HTMLInputElement>) => void \| Promise<void>` |  | 异步变更操作。在 onChange 之后触发（未被阻止时）。等待期间显示加载旋转器。 |
| `isLoading` | `boolean` | `false` | 复选框是否处于加载状态。显示旋转器并阻止交互。 |
| `isDisabled` | `boolean` | `false` | 复选框是否禁用。 |
| `htmlName` | `string` |  | 底层复选框输入的 HTML name 属性，用于表单提交（勾选时提交 "on"）。 |
| `disabledMessage` | `string` |  | Explains why the checkbox is disabled. With isDisabled, shows a tooltip on hover/keyboard focus and keeps the checkbox focusable via aria-disabled (toggling stays blocked). Use this instead of wrapping a disabled CheckboxInput in Tooltip: disabled controls swallow the hover events an external Tooltip needs. |
| `isReadOnly` | `boolean` | `false` | 复选框是否为只读。以完整不透明度显示当前状态但阻止交互。与 isDisabled 不同，只读复选框不会变暗。 |
| `isOptional` | `boolean` | `false` | 字段是否可选。与 isRequired 互斥。 |
| `isRequired` | `boolean` | `false` | 复选框是否必填。与 isOptional 互斥。 |
| `size` | `'sm' \| 'md'` | `'md'` | 复选框尺寸。sm 用于紧凑布局，md 为默认。 |
| `onFocus` | `(e: FocusEvent<HTMLInputElement>) => void` |  | 复选框获得焦点时触发的回调。 |
| `onBlur` | `(e: FocusEvent<HTMLInputElement>) => void` |  | 复选框失去焦点时触发的回调。 |
| `labelIcon` | `IconType` |  | 标签文本前显示的图标。 |
| `status` | `{ type: 'error' \| 'warning' \| 'success', message: string }` |  | 状态指示器。在复选框下方显示彩色消息框，错误时设置 aria-invalid。 |

Styling hook class: `.astryx-checkbox-input`, `.astryx-checkbox-indicator`, `.astryx-checkbox`, `.astryx-checkbox-label`

## Files

- `src/CheckboxInput.doc.mjs`
- `src/CheckboxInput.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/CheckboxInput
