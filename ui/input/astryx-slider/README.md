# Slider

A draggable control for selecting a numeric value or range within defined bounds. Supports single value and range selection, tick marks, custom value formatting, and vertical orientation. Use it when users need to explore a continuous range, such as volume, price, or percentage.

## Classification

- Category: `input` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/Slider.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: A draggable control for selecting a numeric value or range within defined bounds.
- Avoid when: Use for precise numeric entry; pair with a text input or use NumberInput instead. Set a step size so large that only a few positions are possible; use SegmentedControl or radio buttons instead. Wrap a disabled slider in Tooltip to explain why it is disabled; disabled controls swallow the hover events the wrapper needs. Use the disabledMessage prop instead.
- Provides: Label, Description, Slider, Interactive control, Track, Filled range, Tick mark, Mark label, Thumb, Value display, Value tooltip, Status message
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: SliderShowcase, SliderFormattedValue, SliderRangeSlider, SliderWithMarks, SliderWithStatus
- Upstream: Astryx core · Form Controls
- Keywords: slider, range, slidebar, trackbar, scrubber, knob, thumb, rangeslider

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

- `src/examples/SliderShowcase.tsx` — Slider: A slider control set to 50%. · static: `static/SliderShowcase.html`
- `src/examples/SliderFormattedValue.tsx` — Slider — Formatted Value: Slider with custom formatting showing temperature in Fahrenheit. · static: `static/SliderFormattedValue.html`
- `src/examples/SliderRangeSlider.tsx` — Slider — Range: Range slider for selecting a value range like price bounds. · static: `static/SliderRangeSlider.html`
- `src/examples/SliderWithMarks.tsx` — Slider — With Marks: Slider with labeled tick marks at fixed intervals. · static: `static/SliderWithMarks.html`
- `src/examples/SliderWithStatus.tsx` — Slider — Validation States: Sliders with error, warning, and success validation states. · static: `static/SliderWithStatus.html`

## Documentation

### Slider

A draggable control for selecting a numeric value or range within defined bounds. Supports single value and range selection, tick marks, custom value formatting, and vertical orientation. Use it when users need to explore a continuous range, such as volume, price, or percentage.

**Do**

- Always provide a label, even if visually hidden, so the slider is accessible to screen readers.
- Format values with meaningful units like "$50" or "75%" instead of raw numbers.

**Don't**

- Use for precise numeric entry; pair with a text input or use NumberInput instead.
- Set a step size so large that only a few positions are possible; use SegmentedControl or radio buttons instead.
- Wrap a disabled slider in Tooltip to explain why it is disabled; disabled controls swallow the hover events the wrapper needs. Use the disabledMessage prop instead.

**Anatomy**

- Label (required) — Text identifying the numeric setting controlled by the slider.
- Description — Helper text between the label and the slider control.
- Slider (required) — Control row containing the track, thumb or thumbs, and optional text value.
- Interactive control (required) — Pointer and keyboard interaction surface containing the rail, fill, marks, and thumbs.
- Track (required) — Background rail representing the available numeric range.
- Filled range (required) — Accent segment from the minimum to a single value, or between two range values.
- Tick mark — Position marker supplied through the marks collection.
- Mark label — Optional text displayed beside a tick mark.
- Thumb (required) — Draggable value indicator; range mode renders a minimum and maximum thumb.
- Value display — Formatted current value shown beside the slider when valueDisplay is text.
- Value tooltip — Formatted current value shown in a tooltip when valueDisplay is tooltip.
- Status message — Error, warning, or success message below the slider.

**Accessibility**

- Thumb — WCAG 1.4.11 Non-text Contrast (3:1): The thumb must have at least 3:1 contrast with the track and the surface behind it. Pointer down is the whole drag: measure the thumb with the pressed overlay applied.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `string` |  | Label text (always rendered for accessibility). |
| `value` * | `number \| [number, number]` |  | Current value: a `number` for single thumb mode or `[number, number]` for range mode. |
| `onChange` | `(value: number) => void \| (value: [number, number]) => void` |  | Callback fired on value change during drag. |
| `onChangeEnd` | `(value: number) => void \| (value: [number, number]) => void` |  | Callback fired when drag ends. |
| `min` | `number` | `0` | Minimum value. |
| `max` | `number` | `100` | Maximum value. |
| `step` | `number` | `1` | Step increment. |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Orientation of the slider. |
| `formatValue` | `(value: number) => string` |  | Custom value formatting function used for display and `aria-valuetext`. |
| `valueDisplay` | `'tooltip' \| 'text' \| 'none'` | `'tooltip'` | How the current value is displayed. |
| `marks` | `Array<{ value: number; label?: string }>` |  | Tick marks at specified positions with optional labels. Unfilled marks use the track color; marks inside the filled region (at or behind the thumb, or between the thumbs in range mode) use the fill color. |
| `minStepsBetweenThumbs` | `number` | `0` | Minimum number of steps between thumbs in range mode; prevents thumbs from overlapping. |
| `isDisabled` | `boolean` | `false` | Whether the slider is disabled. |
| `htmlName` | `string` |  | The HTML name attribute for form submissions. Renders hidden inputs carrying the current value (two entries in range mode). |
| `disabledMessage` | `string` |  | Explains why the slider is disabled. With isDisabled, shows a tooltip on hover/keyboard focus and keeps the thumb focusable via aria-disabled (value changes stay blocked). Use this instead of wrapping a disabled Slider in Tooltip. Disabled controls swallow the hover events an external Tooltip needs. |
| `isOptional` | `boolean` | `false` | Whether the field is optional. |
| `isRequired` | `boolean` | `false` | Whether the field is required. |
| `isLabelHidden` | `boolean` | `false` | Whether to visually hide the label. |
| `description` | `string` |  | Description text rendered below the label. |
| `status` | `{type: 'warning' \| 'error' \| 'success', message?: string}` |  | Status indicator object (`{ type, message }`) for validation feedback. |
| `labelTooltip` | `string` |  | Tooltip text for an info icon displayed next to the label. |
| `width` | `SizeValue` |  | Width of the field (number = pixels, string used as-is, e.g. "100%"). Sizes the whole field (label, control, and status) so they stay aligned. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value, not an inline style object like style={{}}. |

Styling hook class: `.astryx-slider`, `.astryx-slider-control`, `.astryx-slider-track`, `.astryx-slider-thumb`

### Slider

A draggable control for selecting a numeric value or range within defined bounds. Supports single value and range selection, tick marks, custom value formatting, and vertical orientation. Use it when users need to explore a continuous range, such as volume, price, or percentage.

**Do**

- Always provide a label, even if visually hidden, so the slider is accessible to screen readers.
- Format values with meaningful units like "$50" or "75%" instead of raw numbers.

**Don't**

- Use for precise numeric entry; pair with a text input or use NumberInput instead.
- Set a step size so large that only a few positions are possible; use SegmentedControl or radio buttons instead.
- Wrap a disabled slider in Tooltip to explain why it is disabled; disabled controls swallow the hover events the wrapper needs. Use the disabledMessage prop instead.

**Anatomy**

- Label (required) — Text identifying the numeric setting controlled by the slider.
- Description — Helper text between the label and the slider control.
- Slider (required) — Control row containing the track, thumb or thumbs, and optional text value.
- Interactive control (required) — Pointer and keyboard interaction surface containing the rail, fill, marks, and thumbs.
- Track (required) — Background rail representing the available numeric range.
- Filled range (required) — Accent segment from the minimum to a single value, or between two range values.
- Tick mark — Position marker supplied through the marks collection.
- Mark label — Optional text displayed beside a tick mark.
- Thumb (required) — Draggable value indicator; range mode renders a minimum and maximum thumb.
- Value display — Formatted current value shown beside the slider when valueDisplay is text.
- Value tooltip — Formatted current value shown in a tooltip when valueDisplay is tooltip.
- Status message — Error, warning, or success message below the slider.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `string` |  | 标签文本（始终渲染以确保无障碍可访问性）。 |
| `value` * | `number \| [number, number]` |  | 当前值——`number` 用于单滑块模式，`[number, number]` 用于范围模式。 |
| `onChange` | `(value: number) => void \| (value: [number, number]) => void` |  | 拖拽过程中值变更时触发的回调。 |
| `onChangeEnd` | `(value: number) => void \| (value: [number, number]) => void` |  | 拖拽结束时触发的回调。 |
| `min` | `number` | `0` | 最小值。 |
| `max` | `number` | `100` | 最大值。 |
| `step` | `number` | `1` | 步进增量。 |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | 滑块的方向。 |
| `formatValue` | `(value: number) => string` |  | 自定义值格式化函数，用于显示和 `aria-valuetext`。 |
| `valueDisplay` | `'tooltip' \| 'text' \| 'none'` | `'tooltip'` | 当前值的显示方式。 |
| `marks` | `Array<{ value: number; label?: string }>` |  | 在指定位置的刻度标记，带可选标签。未填充区域的标记使用轨道颜色；填充区域内的标记使用强调色。 |
| `minStepsBetweenThumbs` | `number` | `0` | 范围模式下滑块之间的最小步数；防止滑块重叠。 |
| `isDisabled` | `boolean` | `false` | 是否禁用滑块。 |
| `htmlName` | `string` |  | 用于表单提交的 HTML name 属性。渲染携带当前值的隐藏输入（范围模式下为两个条目）。 |
| `disabledMessage` | `string` |  | Explains why the slider is disabled. With isDisabled, shows a tooltip on hover/keyboard focus and keeps the thumb focusable via aria-disabled (value changes stay blocked). Use this instead of wrapping a disabled Slider in Tooltip. Disabled controls swallow the hover events an external Tooltip needs. |
| `isOptional` | `boolean` | `false` | 字段是否为可选。 |
| `isRequired` | `boolean` | `false` | 字段是否为必填。 |
| `isLabelHidden` | `boolean` | `false` | 是否在视觉上隐藏标签。 |
| `description` | `string` |  | 标签下方渲染的描述文本。 |
| `status` | `{type: 'warning' \| 'error' \| 'success', message?: string}` |  | 验证反馈的状态指示器对象（`{ type, message }`）。 |
| `labelTooltip` | `string` |  | 标签旁信息图标的提示文本。 |
| `xstyle` | `StyleXStyles` |  | 用于布局自定义的 StyleX 样式（边距、定位、尺寸）。必须是 stylex.create() 的值，而非内联样式对象如 style={{}}。 |

Styling hook class: `.astryx-slider`, `.astryx-slider-control`, `.astryx-slider-track`, `.astryx-slider-thumb`

## Files

- `src/Slider.doc.mjs`
- `src/Slider.spec.md`
- `src/Slider.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Slider
