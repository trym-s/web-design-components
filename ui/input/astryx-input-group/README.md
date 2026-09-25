# Input Group

InputGroup connects an input with prefix/suffix addons in a single visual unit. Use it for URL fields, currency inputs, search fields with action buttons, or any input that needs contextual decorations.

## Classification

- Category: `input` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/InputGroup.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: InputGroup connects an input with prefix/suffix addons in a single visual unit.
- Avoid when: Don't put multiple text inputs in one group; use separate fields instead. Don't use InputGroup for unrelated inputs; it's for a single input with decorations. Don't use InputGroup with TextArea, Slider, Switch, CheckboxInput, or RadioList.
- Provides: Label, Prefix addon, Input, Suffix addon, Status message
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: InputGroupShowcase, InputGroupBasic
- Upstream: Astryx core · Form Controls
- Keywords: inputgroup, addon, prefix, suffix, connected, grouped, input

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

- `upstream/examples/InputGroupShowcase.tsx` — Input Group · static: `static/InputGroupShowcase.html`
- `upstream/examples/InputGroupBasic.tsx` — InputGroup — Basic: A currency field with static prefix and suffix addons around a TextInput. Use InputGroupText to clarify units or input format. · static: `static/InputGroupBasic.html`

## Documentation

### Input Group

InputGroup connects an input with prefix/suffix addons in a single visual unit. Use it for URL fields, currency inputs, search fields with action buttons, or any input that needs contextual decorations.

**Do**

- Use text addons to show units, prefixes, or suffixes that clarify the input format (e.g., "$", "kg", "https://").
- Use InputGroupText for static prefixes/suffixes like "$", "kg", or "https://".
- Use InputGroup with compatible single-line inputs: TextInput, NumberInput, TimeInput, DateInput, Typeahead, Selector, and MultiSelector.
- Keep each inner input's label specific; grouped inputs automatically combine the group label with their own label and inherit the group description/status context.

**Don't**

- Don't put multiple text inputs in one group; use separate fields instead.
- Don't use InputGroup for unrelated inputs; it's for a single input with decorations.
- Don't use InputGroup with TextArea, Slider, Switch, CheckboxInput, or RadioList.

**Anatomy**

- Label (required) — Text above the group.
- Prefix addon — Content before the input (text, icon, or button).
- Input (required) — The main input element (TextInput, NumberInput, TimeInput, DateInput, Typeahead, Selector, or MultiSelector).
- Suffix addon — Content after the input (text, icon, or button).
- Status message — An error, warning, or success message below the group.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` * | `ReactNode` |  | InputGroupText and compatible input children: TextInput, NumberInput, TimeInput, DateInput, Typeahead, Selector, or MultiSelector. |
| `label` * | `string` |  | Accessible label for the group. |
| `isLabelHidden` | `boolean` | `false` | Visually hide the label. |
| `description` | `string` |  | Helper text between label and input group. |
| `isDisabled` | `boolean` | `false` | Disable the entire group. |
| `isOptional` | `boolean` | `false` | Show "(optional)" indicator. |
| `isRequired` | `boolean` | `false` | Mark the field as required. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Default size for inputs in the group. |
| `status` | `{type: 'warning' \| 'error' \| 'success', message?: string}` |  | Status indicator applied to the group border. |
| `labelTooltip` | `string` |  | Tooltip text at the end of the label. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization. |
| `data-testid` | `string` |  | Test selector. |

Styling hook class: `.astryx-input-group`, `.astryx-input-group-text`

### Input Group Text

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` * | `ReactNode` |  | Text or icon content. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for customization. |
| `className` | `string` |  | CSS class name(s). |
| `style` | `React.CSSProperties` |  | Inline styles. |

### Input Group Text

## Files

- `upstream/InputGroup.doc.mjs`
- `upstream/InputGroup.tsx`
- `upstream/InputGroupContext.ts`
- `upstream/InputGroupText.doc.mjs`
- `upstream/InputGroupText.tsx`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/InputGroup
