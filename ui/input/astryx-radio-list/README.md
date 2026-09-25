# Radio List

A group of options where only one can be selected at a time. All options are visible at once, making it easy to compare choices. Use it when users need to pick one option from a small set.

## Classification

- Category: `input` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/RadioList.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: A group of options where only one can be selected at a time.
- Avoid when: Use when multiple selections are needed; use CheckboxList instead. Use for long lists; use Selector for better discoverability. Use horizontal layout with more than 4 options; it wraps awkwardly. Wrap a disabled RadioList in Tooltip to explain why it is disabled; disabled controls swallow the hover events the wrapper needs. Use the disabledMessage prop instead.
- Provides: Header, Children, Label/Value
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: RadioListItemShowcase, RadioListShowcase, RadioListHorizontalLayout, RadioListItemBasic, RadioListPricingTier, RadioListWithDescriptions, RadioListWithValidation
- Upstream: Astryx core · Form Controls
- Keywords: radiolist, radio, radiogroup, radiobutton, optionlist, singlechoice, choicelist

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

- `src/examples/RadioListItemShowcase.tsx` — Radio List Item: Radio list items with labels, descriptions, and different states including disabled. · static: `static/RadioListItemShowcase.html`
- `src/examples/RadioListShowcase.tsx` — Radio List · static: `static/RadioListShowcase.html`
- `src/examples/RadioListHorizontalLayout.tsx` — RadioList — Horizontal Layout: Radio list with horizontal orientation for compact selections. · static: `static/RadioListHorizontalLayout.html`
- `src/examples/RadioListItemBasic.tsx` — RadioListItem — Basic: Radio items with labels and descriptions inside a controlled RadioList. Use for single-choice option groups like shipping methods. · static: `static/RadioListItemBasic.html`
- `src/examples/RadioListPricingTier.tsx` — RadioList — Pricing Tier: Radio list with pricing info in end content for plan selection. · static: `static/RadioListPricingTier.html`
- `src/examples/RadioListWithDescriptions.tsx` — RadioList — With Descriptions: Radio list with descriptions on the group and each item. · static: `static/RadioListWithDescriptions.html`
- `src/examples/RadioListWithValidation.tsx` — RadioList — With Validation: Required radio list with an error message when nothing is selected. · static: `static/RadioListWithValidation.html`

## Documentation

### Radio List

A group of options where only one can be selected at a time. All options are visible at once, making it easy to compare choices. Use it when users need to pick one option from a small set.

**Do**

- Keep the number of options small: typically 2 to 7 choices.
- Use clear, concise labels that differentiate each option at a glance.
- Pre-select a default option when there's a sensible default; don't leave the group empty unless the choice is optional.

**Don't**

- Use when multiple selections are needed; use CheckboxList instead.
- Use for long lists; use Selector for better discoverability.
- Use horizontal layout with more than 4 options; it wraps awkwardly.
- Wrap a disabled RadioList in Tooltip to explain why it is disabled; disabled controls swallow the hover events the wrapper needs. Use the disabledMessage prop instead.

**Anatomy**

- Header — Optional heading above the radio list.
- Children (required) — The radio list items rendered as selectable options.
- Label/Value (required) — The text label and associated value for each radio item.

**Accessibility**

- Radio circle — WCAG 1.4.11 Non-text Contrast (3:1): The circle edge (unselected) and fill (selected) must have at least 3:1 contrast with the surface behind them. For Hover and Pointer down, measure the final colors after the tint and the pressed overlay are applied.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `string` |  | Label text for the radio group (always rendered for accessibility). |
| `value` * | `string` |  | The currently selected value. |
| `onChange` * | `(value: string) => void` |  | Callback fired when the selected value changes. |
| `children` * | `ReactNode` |  | RadioListItem elements. |
| `isLabelHidden` | `boolean` | `false` | Whether to visually hide the label. |
| `description` | `string` |  | Description text displayed below the label. |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Layout direction of the radio items. |
| `isDisabled` | `boolean` | `false` | Whether all radio items are disabled. |
| `htmlName` | `string` |  | The HTML name attribute shared by the radio inputs, useful for form submissions. When omitted, a unique internal name still groups the radios. |
| `disabledMessage` | `string` |  | Explains why the group is disabled. Applies to the whole-group disabled state (isDisabled), not per item. With isDisabled, shows a tooltip on hover/keyboard focus and keeps the radios focusable via aria-disabled (selection stays blocked). Use this instead of wrapping a disabled RadioList in Tooltip. Disabled controls swallow the hover events an external Tooltip needs. |
| `isRequired` | `boolean` | `false` | Whether the radio group is required. |
| `isOptional` | `boolean` | `false` | Whether the field is optional (mutually exclusive with isRequired). |
| `status` | `{type: 'warning' \| 'error' \| 'success', message?: string}` |  | Status indicator ({ type, message }). |
| `size` | `'sm' \| 'md'` | `'md'` | Size of the radio controls. |
| `labelTooltip` | `string` |  | Tooltip text for an info icon next to the label. |
| `width` | `SizeValue` |  | Width of the field (number = pixels, string used as-is, e.g. "100%"). Sizes the whole field (label, control, and status) so they stay aligned. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value: not an inline style object like style={{}}. |

Styling hook class: `.astryx-radio-list`, `.astryx-radio-list-item`, `.astryx-radio-indicator`, `.astryx-radio-indicator-dot`, `.astryx-radio`, `.astryx-radio-dot`

### Radio List Item

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `ReactNode` |  | Primary label for the radio item. Rich labels may contain links or buttons, which keep their own behavior without selecting the item. The label text names the radio; use aria-label only when that text is absent, or retain every visible label word in the override. |
| `aria-label` | `string` |  | Plain-text accessible name for the radio, applied to the control rather than the row. It overrides the name derived from the label. Use it when a rich label has no visible text; otherwise retain every visible label word. |
| `value` * | `string` |  | Value of this radio item. |
| `description` | `ReactNode` |  | Secondary content displayed below the label. Links and buttons keep their own click behaviour — the row only delegates clicks from its non-interactive surface to the radio. |
| `isDisabled` | `boolean` | `false` | Whether this individual radio item is disabled. |
| `startContent` | `ReactNode` |  | Content to render before the radio circle. |
| `endContent` | `ReactNode` |  | Content to render after the label. |

### Radio List Item

### Radio List Item

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `ReactNode` |  | 单选选项的主标签。富内容标签可包含链接或按钮，它们保留自身行为且不会选中该选项。标签文本用于命名单选框；仅当可见文本缺失时使用 aria-label，否则覆盖值必须保留全部可见文字。 |
| `aria-label` | `string` |  | 单选框的纯文本无障碍名称，应用于控件本身而非整行。它会覆盖由标签推导出的名称。仅当富标签没有可见文本时才完全替代；否则必须保留全部可见文字。 |
| `value` * | `string` |  | 此单选选项的值。 |
| `description` | `ReactNode` |  | 显示在标签下方的次要内容。链接和按钮保留自身的点击行为——整行仅将非交互区域的点击委派给单选框。 |
| `isDisabled` | `boolean` | `false` | 是否禁用此单个单选选项。 |
| `startContent` | `ReactNode` |  | 在单选圆圈前渲染的内容。 |
| `endContent` | `ReactNode` |  | 在标签后渲染的内容。 |

## Files

- `src/RadioList.doc.mjs`
- `src/RadioList.tsx`
- `src/RadioListItem.doc.mjs`
- `src/RadioListItem.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/RadioList
