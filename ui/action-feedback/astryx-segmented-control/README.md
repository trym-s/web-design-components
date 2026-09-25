# Segmented Control

A segmented button group that allows users to make a single selection from a small set of mutually exclusive options. Use SegmentedControl when all options should be visible at once and the selection controls a value or mode, not page navigation.

## Classification

- Category: `action-feedback` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/SegmentedControl.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: A segmented button group that allows users to make a single selection from a small set of mutually exclusive options.
- Avoid when: Use for page-level navigation; use TabList instead. TabList is a navigation component, while SegmentedControl is an input that always has exactly one selected option. Use for simple on/off states; use ToggleButton instead. ToggleButton can be toggled on or off independently, while SegmentedControl enforces a single selection from a group. Wrap a disabled SegmentedControl in Tooltip to explain why it is disabled; disabled controls swallow the hover events the wrapper needs. Use the disabledMessage prop instead.
- Provides: Control, Segment, Label, Icon
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: SegmentedControlItemShowcase, SegmentedControlShowcase, SegmentedControlDisabledItem, SegmentedControlFillLayout, SegmentedControlIconOnly, SegmentedControlItemBasic, SegmentedControlWithIcons
- Upstream: Astryx core · Action
- Keywords: radio, tabs, toggle, toggle-group, pill, button-group, switch, segment, control

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

- `upstream/examples/SegmentedControlItemShowcase.tsx` — Segmented Control Item: Segmented control items with text labels and icons, including a disabled item. · static: `static/SegmentedControlItemShowcase.html`
- `upstream/examples/SegmentedControlShowcase.tsx` — Segmented Control · static: `static/SegmentedControlShowcase.html`
- `upstream/examples/SegmentedControlDisabledItem.tsx` — SegmentedControl — Disabled Item: Segmented control with an individually disabled option for unavailable choices. · static: `static/SegmentedControlDisabledItem.html`
- `upstream/examples/SegmentedControlFillLayout.tsx` — SegmentedControl — Fill Layout: Segmented control that stretches segments equally to fill the available width, useful for fixed-width containers. · static: `static/SegmentedControlFillLayout.html`
- `upstream/examples/SegmentedControlIconOnly.tsx` — SegmentedControl — Icon Only: Compact segmented control with hidden labels, showing only icons for space-constrained layouts. · static: `static/SegmentedControlIconOnly.html`
- `upstream/examples/SegmentedControlItemBasic.tsx` — SegmentedControlItem — Basic: Label-only options inside a SegmentedControl. Each item declares a value; the parent control holds the selected value and change handler. · static: `static/SegmentedControlItemBasic.html`
- `upstream/examples/SegmentedControlWithIcons.tsx` — SegmentedControl — With Icons: Segmented control with icon and label pairs for a view mode switcher. · static: `static/SegmentedControlWithIcons.html`

## Documentation

### Segmented Control

A segmented button group that allows users to make a single selection from a small set of mutually exclusive options. Use SegmentedControl when all options should be visible at once and the selection controls a value or mode, not page navigation.

**Do**

- Use for switching between 2–5 mutually exclusive views or modes where all options should be visible.
- Provide a descriptive label for the control to ensure the group is accessible to screen readers.

**Don't**

- Use for page-level navigation; use TabList instead. TabList is a navigation component, while SegmentedControl is an input that always has exactly one selected option.
- Use for simple on/off states; use ToggleButton instead. ToggleButton can be toggled on or off independently, while SegmentedControl enforces a single selection from a group.
- Wrap a disabled SegmentedControl in Tooltip to explain why it is disabled; disabled controls swallow the hover events the wrapper needs. Use the disabledMessage prop instead.

**Anatomy**

- Control (required) — Container for the mutually exclusive segment choices.
- Segment (required) — Individual choice within the control.
- Label — Visible text identifying a segment when its label is not hidden.
- Icon — Optional caller-supplied icon shown inside a segment.

**Accessibility**

- Text label — WCAG 1.4.3 Contrast (Minimum) (4.5:1): Each label must have at least 4.5:1 contrast with its segment background. Check unselected, Hover, Pointer down, and selected colors as they appear on screen. For Hover and Pointer down, measure the final background after the overlay is applied.
- Essential icon — WCAG 1.4.11 Non-text Contrast (3:1): When a segment has no visible label, its icon must have at least 3:1 contrast with the segment background. An icon beside a visible label does not need its own check.
- Selected state indicator — WCAG 1.4.11 Non-text Contrast (3:1 if relied upon): The selected background must reach 3:1 only when users need it to tell selected from unselected. Label color and weight also show selection.
- Visible control boundary — WCAG 1.4.11 Non-text Contrast (3:1 if needed): The control edge or segment borders need at least 3:1 contrast when users need them to see the choices.
- Keyboard focus indicator — WCAG 1.4.11 Non-text Contrast (3:1): The focus outline must have at least 3:1 contrast with the area around the segment. Check it on the track and selected background.
- Disabled appearance — WCAG 1.4.3 and 1.4.11 exceptions (Not required): Disabled controls do not need to meet these contrast ratios.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` * | `string` |  | The currently selected value (controlled). |
| `onChange` * | `(value: string) => void` |  | Callback fired when a segment is selected. |
| `label` * | `string` |  | Accessible label for the radio group (used as aria-label, never rendered visually). |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant for the control. |
| `layout` | `'hug' \| 'fill'` | `'hug'` | Layout mode. hug (default) sizes segments to content; fill stretches them equally to fill the container. |
| `isDisabled` | `boolean` | `false` | Whether the entire control is disabled. |
| `disabledMessage` | `string` |  | Explains why the control is disabled. Applies to the whole-group disabled state (isDisabled), not per segment. With isDisabled, shows a tooltip on hover/keyboard focus and keeps the control focusable via aria-disabled (selection stays blocked). Use this instead of wrapping a disabled SegmentedControl in Tooltip. Disabled controls swallow the hover events an external Tooltip needs. |
| `children` * | `ReactNode` |  | SegmentedControlItem children. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value: not an inline style object like style={{}}. |

Styling hook class: `.astryx-segmented-control`, `.astryx-segmented-control-item`

### Segmented Control Item

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` * | `string` |  | Unique value for this segment, matched against the parent value. |
| `label` * | `string` |  | Accessible label for this segment. Rendered as visible text unless isLabelHidden is true. |
| `isLabelHidden` | `boolean` | `false` | Whether the label is visually hidden. When true, only the icon is displayed and label is used as aria-label. |
| `icon` | `ReactNode` |  | Icon element displayed before the label. |
| `isDisabled` | `boolean` | `false` | Whether this individual item is disabled. |

### Segmented Control Item

### Segmented Control Item

## Files

- `upstream/SegmentedControl.doc.mjs`
- `upstream/SegmentedControl.spec.md`
- `upstream/SegmentedControl.tsx`
- `upstream/SegmentedControlContext.ts`
- `upstream/SegmentedControlItem.doc.mjs`
- `upstream/SegmentedControlItem.tsx`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/SegmentedControl
