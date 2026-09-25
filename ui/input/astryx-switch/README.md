# Switch

A toggle control for on/off states that take effect immediately. Supports labels, descriptions, loading states, and validation. Use it for settings or preferences that apply instantly. For changes requiring a form submission, use a checkbox instead.

## Classification

- Category: `input` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/Switch.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: A toggle control for on/off states that take effect immediately.
- Avoid when: Use for options that require a form submission to take effect; use a checkbox instead. Use a switch for multi-state values; it's strictly on/off. Wrap a disabled switch in Tooltip to explain why it is disabled; disabled controls swallow the hover events the wrapper needs. Use the disabledMessage prop instead.
- Provides: Field, Track, Thumb, Label, Description, Spinner, Status message
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: SwitchShowcase, SwitchDisabled, SwitchSettingsPanel, SwitchWithDescription, SwitchWithStatus
- Upstream: Astryx core · Form Controls
- Keywords: switch, toggle, onoff, flipswitch, boolean, toggleswitch

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

- `upstream/examples/SwitchShowcase.tsx` — Switch: A toggle switch for enabling notifications. · static: `static/SwitchShowcase.html`
- `upstream/examples/SwitchDisabled.tsx` — Switch — Disabled: Disabled switch with label and description for gated features. · static: `static/SwitchDisabled.html`
- `upstream/examples/SwitchSettingsPanel.tsx` — Switch — Settings Panel: Settings panel with spread-spaced switches in a card. · static: `static/SwitchSettingsPanel.html`
- `upstream/examples/SwitchWithDescription.tsx` — Switch — With Description: Toggle with a label and supporting description text. · static: `static/SwitchWithDescription.html`
- `upstream/examples/SwitchWithStatus.tsx` — Switch — With Status: Switches with error, warning, and success validation states. · static: `static/SwitchWithStatus.html`

## Documentation

### Switch

A toggle control for on/off states that take effect immediately. Supports labels, descriptions, loading states, and validation. Use it for settings or preferences that apply instantly. For changes requiring a form submission, use a checkbox instead.

**Do**

- Use for settings that apply immediately; the toggle should take effect without a separate save action.
- Pair with a clear, concise label that describes the setting being controlled.

**Don't**

- Use for options that require a form submission to take effect; use a checkbox instead.
- Use a switch for multi-state values; it's strictly on/off.
- Wrap a disabled switch in Tooltip to explain why it is disabled; disabled controls swallow the hover events the wrapper needs. Use the disabledMessage prop instead.

**Anatomy**

- Field (required) — Container arranging the switch, label, and feedback.
- Track (required) — Pill-shaped surface that shows the off or on state.
- Thumb (required) — Indicator that moves across the track when state changes.
- Label (required) — Text identifying the setting controlled by the switch.
- Description — Helper text below the label.
- Spinner — Loading indicator shown inside the thumb while busy.
- Status message — Error, warning, or success message below the switch.

**Accessibility**

- Track and thumb — WCAG 1.4.11 Non-text Contrast (3:1): The on and off tracks must each have at least 3:1 contrast with the surface behind them, and the thumb with its track. For Hover and Pointer down, measure the final colors after the tint and the pressed overlay are applied.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `ref` | `React.Ref<HTMLInputElement>` |  | Ref forwarded to the underlying <input> element. |
| `label` * | `string` |  | Label text for the switch (always rendered for accessibility). |
| `value` * | `boolean` |  | Whether the switch is on or off. |
| `onChange` | `(checked: boolean, e: ChangeEvent<HTMLInputElement>) => void` |  | Callback fired when the switch state changes. |
| `changeAction` | `(checked: boolean, e: ChangeEvent<HTMLInputElement>) => void \| Promise<void>` |  | Async action fired after onChange. Triggers optimistic UI and shows a loading spinner until the promise resolves. |
| `isLoading` | `boolean` | `false` | Whether the switch is in a loading state, showing a spinner inside the thumb. |
| `isLabelHidden` | `boolean` | `false` | Visually hides the label while keeping it accessible to screen readers. |
| `description` | `string` |  | Description text displayed below the label. |
| `isDisabled` | `boolean` | `false` | Whether the switch is disabled. |
| `size` | `'sm' \| 'md'` | `'md'` | Size variant controlling track and thumb dimensions. sm (32x20px) matches sm checkbox/radio vertical rhythm; md (40x24px, default) matches md checkbox/radio vertical rhythm. |
| `htmlName` | `string` |  | The HTML name attribute for the underlying checkbox input, useful for form submissions (submits "on" when the switch is on). |
| `disabledMessage` | `string` |  | Explains why the switch is disabled. With isDisabled, shows a tooltip on hover/keyboard focus and keeps the switch focusable via aria-disabled (toggling stays blocked). Use this instead of wrapping a disabled Switch in Tooltip. Disabled controls swallow the hover events an external Tooltip needs. |
| `isOptional` | `boolean` | `false` | Whether the field is optional. Mutually exclusive with isRequired. |
| `isRequired` | `boolean` | `false` | Whether the switch is required. Mutually exclusive with isOptional. |
| `status` | `{type: 'warning' \| 'error' \| 'success', message?: string}` |  | Status indicator with type and message. Displays a colored message box below the switch and sets aria-invalid when type is "error". |
| `onFocus` | `(e: FocusEvent<HTMLInputElement>) => void` |  | Callback fired when the switch receives focus. |
| `onBlur` | `(e: FocusEvent<HTMLInputElement>) => void` |  | Callback fired when the switch loses focus. |
| `labelIcon` | `IconType` |  | Icon displayed before the label text. See `astryx docs icons` for valid semantic names. |
| `labelTooltip` | `string` |  | Tooltip text shown in an info icon at the end of the label. |
| `labelPosition` | `'start' \| 'end'` | `'end'` | Which side of the switch the label appears on. "start" places the label before the switch. |
| `labelSpacing` | `'hug' \| 'spread'` | `'hug'` | Spacing behavior between label and switch. "hug" places them next to each other; "spread" pushes them to opposite ends of the container (full width). |
| `width` | `SizeValue` |  | Width of the field (number = pixels, string used as-is, e.g. "100%"). Sizes the whole field (label, control, and status) so they stay aligned. |

Styling hook class: `.astryx-switch`, `.astryx-switch-thumb`, `.astryx-switch-field`, `.astryx-switch-label`

### Switch

A toggle control for on/off states that take effect immediately. Supports labels, descriptions, loading states, and validation. Use it for settings or preferences that apply instantly. For changes requiring a form submission, use a checkbox instead.

**Do**

- Use for settings that apply immediately; the toggle should take effect without a separate save action.
- Pair with a clear, concise label that describes the setting being controlled.

**Don't**

- Use for options that require a form submission to take effect; use a checkbox instead.
- Use a switch for multi-state values; it's strictly on/off.
- Wrap a disabled switch in Tooltip to explain why it is disabled; disabled controls swallow the hover events the wrapper needs. Use the disabledMessage prop instead.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `ref` | `React.Ref<HTMLInputElement>` |  | 转发至底层 <input> 元素的 ref。 |
| `label` * | `string` |  | 开关的标签文本（始终渲染以确保无障碍性）。 |
| `value` * | `boolean` |  | 开关是开启还是关闭。 |
| `onChange` | `(checked: boolean, e: ChangeEvent<HTMLInputElement>) => void` |  | 开关状态变化时触发的回调。 |
| `changeAction` | `(checked: boolean, e: ChangeEvent<HTMLInputElement>) => void \| Promise<void>` |  | 在 onChange 之后触发的异步操作。触发乐观 UI 并显示加载旋转器直到 Promise 完成。 |
| `isLoading` | `boolean` | `false` | 开关是否处于加载状态，在滑块内显示旋转器。 |
| `isLabelHidden` | `boolean` | `false` | 视觉上隐藏标签，同时保持屏幕阅读器的无障碍性。 |
| `description` | `string` |  | 显示在标签下方的描述文本。 |
| `isDisabled` | `boolean` | `false` | 开关是否被禁用。 |
| `htmlName` | `string` |  | 底层复选框输入的 HTML name 属性，用于表单提交（开启时提交 "on"）。 |
| `disabledMessage` | `string` |  | Explains why the switch is disabled. With isDisabled, shows a tooltip on hover/keyboard focus and keeps the switch focusable via aria-disabled (toggling stays blocked). Use this instead of wrapping a disabled Switch in Tooltip. Disabled controls swallow the hover events an external Tooltip needs. |
| `isOptional` | `boolean` | `false` | 字段是否为可选。与 isRequired 互斥。 |
| `isRequired` | `boolean` | `false` | 开关是否为必填。与 isOptional 互斥。 |
| `status` | `{type: 'warning' \| 'error' \| 'success', message?: string}` |  | 带类型和消息的状态指示器。在开关下方显示彩色消息框，当类型为 "error" 时设置 aria-invalid。 |
| `onFocus` | `(e: FocusEvent<HTMLInputElement>) => void` |  | 开关获得焦点时触发的回调。 |
| `onBlur` | `(e: FocusEvent<HTMLInputElement>) => void` |  | 开关失去焦点时触发的回调。 |
| `labelIcon` | `IconType` |  | 显示在标签文本前面的图标。 |
| `labelTooltip` | `string` |  | 在标签末尾的信息图标中显示的工具提示文本。 |
| `labelPosition` | `'start' \| 'end'` | `'end'` | 标签出现在开关的哪一侧。"start" 将标签放在开关前面。 |
| `labelSpacing` | `'hug' \| 'spread'` | `'hug'` | 标签和开关之间的间距行为。"hug" 将它们并排放置；"spread" 将它们推到容器的两端（全宽）。"default" 是 "hug" 的已弃用别名。 |

Styling hook class: `.astryx-switch`, `.astryx-switch-thumb`, `.astryx-switch-field`, `.astryx-switch-label`

## Files

- `upstream/Switch.doc.mjs`
- `upstream/Switch.spec.md`
- `upstream/Switch.tsx`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Switch
