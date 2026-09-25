# Field

Field is a low-level wrapper for custom, native, or third-party controls that do not already provide field label, description, and status UI. Use it when you need the Field shell around a control you own; use styled Astryx inputs like TextInput, Typeahead, and Select directly when they already expose label, description, and validation props.

## Classification

- Category: `input` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/Field.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Field is a low-level wrapper for custom, native, or third-party controls that do not already provide field label, description, and status UI.
- Avoid when: Nest Field around styled inputs such as TextInput, Typeahead, Select, DateInput, or TextArea; those components already render their own Field shell. Use the attached status variant on non-bordered controls such as sliders, switches, or checkboxes; use detached so the message does not overlap the control. Set both isOptional and isRequired on the same field. Hide the label without providing an alternative way for the user to understand the field purpose.
- Provides: Label, Description, Control slot, Status message, Optional/Required indicator, Label tooltip
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: FieldLabelShowcase, FieldShowcase, FieldLabelBasic, FieldRequired, FieldStatusVariants, FieldWithDescription
- Upstream: Astryx core · Form Controls
- Keywords: field, formfield, formgroup, formcontrol, label, input, required, optional, helpertext, hint

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

- `src/examples/FieldLabelShowcase.tsx` — Field Label: Standalone field labels demonstrating required, optional, tooltip, and icon variations. · static: `static/FieldLabelShowcase.html`
- `src/examples/FieldShowcase.tsx` — Field: A form field wrapping a text input with a label, description, and validation status. · static: `static/FieldShowcase.html`
- `src/examples/FieldLabelBasic.tsx` — FieldLabel — Basic: Standalone labels with required and optional indicators and a helper description. Use when labeling a custom control that does not render its own label. · static: `static/FieldLabelBasic.html`
- `src/examples/FieldRequired.tsx` — Field — Required & Optional: Required and optional field indicators side by side. Use isRequired on fields the user must fill in, and isOptional to clarify which fields can be skipped. · static: `static/FieldRequired.html`
- `src/examples/FieldStatusVariants.tsx` — Field — Validation States: All three validation states: error, warning, and success. Use error for invalid input, warning for potential issues like reserved names, and success to confirm valid entries like API keys. · static: `static/FieldStatusVariants.html`
- `src/examples/FieldWithDescription.tsx` — Field — Description: Fields with helper text below the label. Use descriptions to explain format requirements, constraints, or what happens with the data, like "At least 8 characters" or "We will send a confirmation link". · static: `static/FieldWithDescription.html`

## Documentation

### Field

Field is a low-level wrapper for custom, native, or third-party controls that do not already provide field label, description, and status UI. Use it when you need the Field shell around a control you own; use styled Astryx inputs like TextInput, Typeahead, and Select directly when they already expose label, description, and validation props.

**Do**

- Wrap custom controls, native inputs, or third-party widgets that need labeling, helper text, optional/required indicators, or validation status.
- Always provide a label for accessibility, even if visually hidden with isLabelHidden.
- Use inputID and descriptionID to connect the label and description to the inner control with htmlFor and aria-describedby.

**Don't**

- Nest Field around styled inputs such as TextInput, Typeahead, Select, DateInput, or TextArea; those components already render their own Field shell.
- Use the attached status variant on non-bordered controls such as sliders, switches, or checkboxes; use detached so the message does not overlap the control.
- Set both isOptional and isRequired on the same field.
- Hide the label without providing an alternative way for the user to understand the field purpose.

**Anatomy**

- Label (required) — Text identifying the field. Always rendered for accessibility, optionally hidden visually.
- Description — Helper text between the label and input explaining what to enter.
- Control slot (required) — A custom, native, or third-party control that does not already render a field shell.
- Status message — Inline validation feedback showing error, warning, or success with a message.
- Optional/Required indicator — Badge next to the label showing whether the field is optional or required.
- Label tooltip — Info icon at the end of the label with a tooltip explaining the field.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `string` |  | Label text for the field (always rendered for accessibility). |
| `inputID` * | `string` |  | ID for the input element (used for the label htmlFor attribute). |
| `labelID` | `string` |  | ID applied to the label element itself for group accessibility. |
| `isGroupLabel` | `boolean` | `false` | Renders the label as a span for control groups (radiogroup, checkbox list). |
| `children` * | `ReactNode` |  | The input or control to render. |
| `isLabelHidden` | `boolean` | `false` | Visually hide the label (still accessible to screen readers). |
| `isDisabled` | `boolean` | `false` | Whether the associated input is disabled. Propagates disabled styling to the label. |
| `description` | `string` |  | Description text displayed between the label and input. |
| `descriptionID` | `string` |  | ID for the description element (use for aria-describedby on the input). |
| `isOptional` | `boolean` | `false` | Whether the field is optional (mutually exclusive with isRequired). |
| `isRequired` | `boolean` | `false` | Whether the field is required (mutually exclusive with isOptional). |
| `labelIcon` | `IconType` |  | Icon to display before the label text. See `astryx docs icons` for valid semantic names. |
| `labelTooltip` | `string` |  | Tooltip text to display in an info icon at the end of the label. |
| `status` | `{type: 'warning' \| 'error' \| 'success', message?: string, messageID?: string}` |  | Status indicator with type and optional message. When message is set, displays a colored status box. messageID is for wiring aria-describedby on the input. |
| `statusVariant` | `'attached' \| 'detached'` | `'attached'` | How the status message renders relative to the input. Attached overlaps the input border; detached floats below. |
| `width` | `SizeValue` |  | Width of the field (number = pixels, string used as-is, e.g. "100%"). Sizes the whole field (label, control, and status) so they stay aligned. Prefer this over setting width via xstyle/className/style, which only size the inner control box. |
| `ref` | `React.Ref<HTMLDivElement>` |  | Ref forwarded to the root element. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value: not an inline style object like style={{}}. |
| `className` | `string` |  | CSS class name(s) appended to the root element. Prefer xstyle for StyleX deduplication. |
| `style` | `React.CSSProperties` |  | Inline styles applied to the root element. Takes priority over StyleX inline styles. |

Styling hook class: `.astryx-field`, `.astryx-field-label`, `.astryx-field-status`, `.astryx-input-status-icon`, `.astryx-input-clear-button`, `.astryx-input-clear-icon`

**Example — Wrap a custom control**

```tsx

function CustomSliderField() {
  return (
    <Field
      label="Confidence"
      inputID="confidence-slider"
      description="Choose how strict the review should be."
      descriptionID="confidence-help"
      status={{type: 'success', message: 'Recommended default'}}
      statusVariant="detached">
      <input
        id="confidence-slider"
        type="range"
        min={0}
        max={100}
        defaultValue={60}
        aria-describedby="confidence-help"
      />
    </Field>
  );
}

```

### Field Label

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `string` |  | Label text. |
| `inputID` * | `string` |  | ID of the input this label is for. |
| `isLabelHidden` | `boolean` | `false` | Visually hide the label. |
| `isDisabled` | `boolean` | `false` | Whether the associated input is disabled. |
| `isOptional` | `boolean` | `false` | Show "Optional" indicator. |
| `isRequired` | `boolean` | `false` | Show "Required" indicator. |
| `labelIcon` | `IconType` |  | Icon before the label text. See `astryx docs icons` for valid semantic names. |
| `labelTooltip` | `string` |  | Tooltip text for info icon at end of label. |

### Field Label

### Field Label

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `string` |  | 标签文本。 |
| `inputID` * | `string` |  | 此标签关联的输入框 ID。 |
| `isLabelHidden` | `boolean` | `false` | 视觉隐藏标签。 |
| `isDisabled` | `boolean` | `false` | 关联的输入框是否禁用。 |
| `isOptional` | `boolean` | `false` | 显示"Optional"指示器。 |
| `isRequired` | `boolean` | `false` | 显示"Required"指示器。 |
| `labelIcon` | `IconType` |  | 标签文本前的图标。 |
| `labelTooltip` | `string` |  | 标签末尾信息图标的工具提示文本。 |

## Files

- `src/Field.doc.mjs`
- `src/Field.tsx`
- `src/FieldLabel.doc.mjs`
- `src/FieldLabel.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Field
