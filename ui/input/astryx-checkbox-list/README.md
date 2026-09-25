# Checkbox List

CheckboxList shows a small group of checkboxes so users can turn several options on or off at once. Place it in settings pages, filter panels, or forms where every choice should be visible without scrolling. For a single standalone checkbox (like "I agree to the terms"), use CheckboxInput instead. If only one option can be picked, use RadioList. If the list is long enough to need searching or scrolling, use MultiSelector instead.

## Classification

- Category: `input` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/CheckboxList.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: CheckboxList shows a small group of checkboxes so users can turn several options on or off at once.
- Avoid when: Show a CheckboxList when the user can only pick one thing; that is what RadioList is for. Put buttons or links inside the trailing slot (endContent); the whole row is already tappable, so a nested button creates two competing click targets. Wrap a disabled CheckboxList in Tooltip to explain why it is disabled; disabled controls swallow the hover events the wrapper needs. Use the disabledMessage prop instead.
- Provides: Group, Group label, Description, Options list, Option row, Checkbox, Option label, Option description, End content, Spinner, Status message
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: CheckboxListItemShowcase, CheckboxListShowcase, CheckboxListItemBasic, CheckboxListSelectAllPattern, CheckboxListWithEndContent
- Upstream: Astryx core · Form Controls
- Keywords: checkboxlist, checkbox, checkboxgroup, multichoice, multiselect, checklist

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

- `src/examples/CheckboxListItemShowcase.tsx` — Checkbox List Item: Checkbox list items with labels, descriptions, and different states including disabled. · static: `static/CheckboxListItemShowcase.html`
- `src/examples/CheckboxListShowcase.tsx` — Checkbox List · static: `static/CheckboxListShowcase.html`
- `src/examples/CheckboxListItemBasic.tsx` — CheckboxListItem — Basic: Checkbox items with labels and descriptions inside a controlled CheckboxList. Use for multi-select option groups like notification preferences. · static: `static/CheckboxListItemBasic.html`
- `src/examples/CheckboxListSelectAllPattern.tsx` — CheckboxList — Select All With Indeterminate: A "select all" toggle at the top of a checkbox list that switches to an indeterminate dash when only some items are checked, useful for bulk actions like exporting documents or assigning permissions where users often want everything at once. · static: `static/CheckboxListSelectAllPattern.html`
- `src/examples/CheckboxListWithEndContent.tsx` — CheckboxList — With End Content: Badges in the trailing slot show contextual info, like a price or status, next to each option without cluttering the label, so users can compare choices at a glance. · static: `static/CheckboxListWithEndContent.html`

## Documentation

### Checkbox List

CheckboxList shows a small group of checkboxes so users can turn several options on or off at once. Place it in settings pages, filter panels, or forms where every choice should be visible without scrolling. For a single standalone checkbox (like "I agree to the terms"), use CheckboxInput instead. If only one option can be picked, use RadioList. If the list is long enough to need searching or scrolling, use MultiSelector instead.

**Do**

- Keep the list short: three to seven options is the sweet spot. Beyond that, switch to MultiSelector which adds search and scrolling.
- Turn on dividers (hasDividers) when items have helper text underneath; without them the labels and descriptions blur together.
- Write a group label that says what the choices represent: "Export formats" tells users more than "Options".

**Don't**

- Show a CheckboxList when the user can only pick one thing; that is what RadioList is for.
- Put buttons or links inside the trailing slot (endContent); the whole row is already tappable, so a nested button creates two competing click targets.
- Wrap a disabled CheckboxList in Tooltip to explain why it is disabled; disabled controls swallow the hover events the wrapper needs. Use the disabledMessage prop instead.

**Anatomy**

- Group (required) — Container for the labeled checkbox group.
- Group label (required) — Text identifying what the checkbox options represent.
- Description — Helper text below the group label.
- Options list (required) — List containing the available checkbox options.
- Option row (required) — Selectable row containing one option.
- Checkbox (required) — Selection indicator for an option.
- Option label (required) — Primary content identifying an option.
- Option description — Secondary text below an option label.
- End content — Caller-provided content at the end of an option row.
- Spinner — Loading indicator shown inside the pending checkbox.
- Status message — Error, warning, or success message below the group.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `string` |  | Label text for the checkbox group (always rendered for accessibility). |
| `children` * | `ReactNode` |  | CheckboxListItem elements. |
| `value` | `string[]` |  | The currently selected values (collection mode). |
| `onChange` | `(values: string[]) => void` |  | Callback fired when the selected values change. |
| `changeAction` | `(values: string[]) => void \| Promise<void>` |  | Async action on change with optimistic updates. While the promise is pending, the toggled item shows a spinner inside its checkbox and is marked aria-busy. |
| `isLabelHidden` | `boolean` | `false` | Whether to visually hide the label. |
| `description` | `string` |  | Description text displayed below the label. |
| `density` | `'compact' \| 'balanced' \| 'spacious'` | `'balanced'` | Spacing density for list items. |
| `hasDividers` | `boolean` | `false` | Whether to show dividers between items. |
| `isDisabled` | `boolean` | `false` | Whether all checkbox items are disabled. |
| `disabledMessage` | `string` |  | Explains why the group is disabled. Applies to the whole-group disabled state (isDisabled), not per item. With isDisabled, shows a tooltip on hover/keyboard focus and keeps the checkboxes focusable via aria-disabled (toggling stays blocked). Use this instead of wrapping a disabled CheckboxList in Tooltip. Disabled controls swallow the hover events an external Tooltip needs. |
| `status` | `{type: 'warning' \| 'error' \| 'success', message?: string}` |  | Status indicator ({ type, message }). |
| `width` | `SizeValue` |  | Width of the field (number = pixels, string used as-is, e.g. "100%"). Sizes the whole field (label, control, and status) so they stay aligned. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization. Must be a stylex.create() value. |

Styling hook class: `.astryx-checkbox-list`

### Checkbox List Item

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `ReactNode` |  | Primary text label for the item. Rich labels may contain links or buttons, which keep their own behavior without toggling the item. A ReactNode label names the checkbox from its visible text; pass aria-label only when that text is absent, or include all visible label words in the override. |
| `aria-label` | `string` |  | Plain-text accessible name for the checkbox, replacing the one derived from label. Applied to the checkbox control. Use it when a rich label has no visible text; otherwise the value must retain every visible label word. |
| `value` | `string` |  | Identity key (required inside CheckboxList). |
| `description` | `ReactNode` |  | Secondary content below the label. String or ReactNode. Exposed as the checkbox's accessible description through aria-describedby, so assistive technology can tell it is the explanation for that choice. |
| `endContent` | `ReactNode` |  | Content rendered after the label area. |
| `isDisabled` | `boolean` | `false` | Whether this individual item is disabled. |
| `isLoading` | `boolean` | `false` | Whether this item is loading. Shows a spinner inside the checkbox and blocks interaction on this item. In collection mode, the toggled item also shows this automatically while the parent changeAction is pending. |
| `isChecked` | `boolean \| 'indeterminate'` |  | Direct checked state (standalone mode only). |
| `onCheck` | `(checked: boolean) => void` |  | Direct check handler (standalone mode only). |

**Example — Rich label with an overriding aria-label**

```tsx
<CheckboxListItem
  label={<span>Pro plan <Badge label="Recommended" /></span>}
  aria-label="Pro plan Recommended option"
  value="pro"
/>
```

### Checkbox List Item

### Checkbox List Item

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `ReactNode` |  | 选项的主标签。富内容标签可包含链接或按钮，它们保留自身行为且不会切换该选项。ReactNode 标签会以其可见文本为复选框命名；仅当可见文本缺失时使用 aria-label，否则覆盖值必须保留全部可见文字。 |
| `aria-label` | `string` |  | 复选框的纯文本无障碍名称，会替换由 label 推导出的名称。仅当富标签没有可见文本时才完全替代；否则必须保留全部可见文字。 |
| `value` | `string` |  | 标识键（在 CheckboxList 内为必填）。 |
| `description` | `ReactNode` |  | 标签下方的辅助内容。可为字符串或 ReactNode。会通过 aria-describedby 作为复选框的无障碍描述暴露，便于辅助技术识别它是该选项的说明。 |
| `endContent` | `ReactNode` |  | 在标签区域后渲染的内容。 |
| `isDisabled` | `boolean` | `false` | 是否禁用此单个选项。 |
| `isLoading` | `boolean` | `false` | 此选项是否处于加载状态。在复选框内显示加载旋转器并阻止该选项的交互。在集合模式下，当父级 changeAction 处于待定状态时，被切换的选项会自动显示此状态。 |
| `isChecked` | `boolean \| 'indeterminate'` |  | 直接选中状态（仅独立模式）。 |
| `onCheck` | `(checked: boolean) => void` |  | 直接选中处理器（仅独立模式）。 |

## Files

- `src/CheckboxList.doc.mjs`
- `src/CheckboxList.spec.md`
- `src/CheckboxList.tsx`
- `src/CheckboxListContext.tsx`
- `src/CheckboxListItem.doc.mjs`
- `src/CheckboxListItem.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/CheckboxList
