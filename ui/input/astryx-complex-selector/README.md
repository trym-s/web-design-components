# Complex Selector

Use ComplexSelector when a selection needs richer custom content than a Selector option row. It is intentionally one component: ComplexSelector owns the field, trigger, popover, focus restore, and changeAction flow, while the content render prop owns the selector-specific accessible structure.

## Classification

- Category: `input` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/ComplexSelector.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Use ComplexSelector when a selection needs richer custom content than a Selector option row.
- Avoid when: Do not rebuild trigger ARIA, popover focus management, or changeAction handling in product code. Do not use ComplexSelector for a plain single-column text list; use Selector instead.
- Provides: Field, Trigger, Icon-rendered start icon, Caller-rendered start content, Indicator icon, Popup
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: ComplexSelectorShowcase, ComplexSelectorDeadlinePicker, ComplexSelectorTreeSearch
- Upstream: Astryx core · Form Controls
- Keywords: selector, picker, popover, dialog, custom, rich, matrix, grid

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

- `src/examples/ComplexSelectorShowcase.tsx` — Complex Selector: A two-axis picker: choose a fruit and a ripeness level from one control. ComplexSelector owns the trigger, popover, and focus restore while the custom grid owns its keyboard semantics. · static: `static/ComplexSelectorShowcase.html`
- `src/examples/ComplexSelectorDeadlinePicker.tsx` — Complex Selector — Deadline Picker: A multi-step deadline field: pick a preset like Today or Next week, or switch to a custom date and time before applying. The popup stays open until the user commits, so the content owns the Apply action. · static: `static/ComplexSelectorDeadlinePicker.html`
- `src/examples/ComplexSelectorTreeSearch.tsx` — Complex Selector — Tree Search: A destination picker that combines a search field with a TreeList hierarchy. TreeList owns tree keyboard navigation; ComplexSelector owns the trigger, popover, and focus restore. Selecting a folder closes the popup. · static: `static/ComplexSelectorTreeSearch.html`

## Documentation

### Complex Selector

Use ComplexSelector when a selection needs richer custom content than a Selector option row. It is intentionally one component: ComplexSelector owns the field, trigger, popover, focus restore, and changeAction flow, while the content render prop owns the selector-specific accessible structure.

**Do**

- Use variant="ghost" with a startIcon when the selector is triggered from a toolbar. Use alignment="end" when a wide surface should align its end edge to the trigger.
- For staged editors, keep draft state in the composed content and call the provided onChange helper only from Apply. Cancel or dismiss without committing.
- Compose the dialog content from the appropriate accessible structure for the job: RadioList for a simple choice, Calendar/date inputs for date picking, TreeList or a searchable list for hierarchy, or a custom grid when two-dimensional arrow navigation is useful.
- Use the provided onChange helper from children; it already calls both onChange and changeAction and updates optimistic busy state.
- Call close() from custom content when a selection should dismiss the popup. Keep it open for multi-step content or freeform entry flows.
- Use Astryx focus hooks for custom content: useGridFocus for two-dimensional grids, useTreeFocus through TreeList for hierarchies, and useListFocus for custom linear collections.
- Evaluate custom content against WCAG 2.2: keyboard operation, focus visible/not obscured, names and roles, labels/instructions, target size, and contrast/non-text contrast are especially relevant for selector popovers.

**Don't**

- Do not rebuild trigger ARIA, popover focus management, or changeAction handling in product code.
- Do not use ComplexSelector for a plain single-column text list; use Selector instead.

**Anatomy**

- Field (required) — Field shell that provides the label and optional supporting field content.
- Trigger (required) — Control that displays the current value or placeholder and opens the popup.
- Icon-rendered start icon — Optional leading semantic icon or icon component rendered through Icon.
- Caller-rendered start content — Optional arbitrary React content rendered directly at the start of the trigger.
- Indicator icon (required) — Trailing chevron that rotates to reflect whether the popup is open.
- Popup (required) — Mounted dialog surface that is painted and shown while open and hidden while closed.

Styling hook class: `.astryx-complex-selector`, `.astryx-complex-selector-indicator-icon`, `.astryx-complex-selector-popup`

## Files

- `src/ComplexSelector.doc.mjs`
- `src/ComplexSelector.spec.md`
- `src/ComplexSelector.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/ComplexSelector
