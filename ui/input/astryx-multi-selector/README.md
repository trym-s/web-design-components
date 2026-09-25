# Multi Selector

A checkbox dropdown for selecting multiple values from a list. Selected items can display as a count, labels, or badges. Use it for filtering or when presenting a finite set of options where multiple choices are needed.

## Classification

- Category: `input` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/MultiSelector.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: A checkbox dropdown for selecting multiple values from a list.
- Avoid when: Use for single-value selection; use Selector instead. Show more than ~20 options without enabling search. Wrap a disabled MultiSelector in Tooltip to explain why it is disabled; disabled triggers swallow the hover events the wrapper needs. Use the disabledMessage prop instead.
- Provides: Field, Trigger, Icon-rendered start icon, Caller-rendered start content, Trigger clear button, Status icon, Indicator icon, Search row, Search icon, Search clear button, Option row, Option checkbox indicator, Option divider, Section heading, Empty state, Pointer popup, Touch sheet heading, Touch sheet
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: MultiSelectorShowcase, MultiSelectorBottomSheet, MultiSelectorColumnVisibilitySelector, MultiSelectorForm, MultiSelectorGhostToolbar, MultiSelectorSearchableMultiSelector, MultiSelectorSectionedMultiSelector
- Upstream: Astryx core · Form Controls
- Keywords: multiselect, checkbox, dropdown, multi, picker, checklist, facet, filter, select

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

- `src/examples/MultiSelectorShowcase.tsx` — Multi Selector · static: `static/MultiSelectorShowcase.html`
- `src/examples/MultiSelectorBottomSheet.tsx` — MultiSelector — Bottom Sheet: Keeps a multi-selection list open in a bottom sheet while choices are toggled. · static: `static/MultiSelectorBottomSheet.html`
- `src/examples/MultiSelectorColumnVisibilitySelector.tsx` — MultiSelector — Column Visibility: Column visibility toggle with hidden label, search, select-all, and selection count. · static: `static/MultiSelectorColumnVisibilitySelector.html`
- `src/examples/MultiSelectorForm.tsx` — MultiSelector — Form Composition: Two multi-selectors in a form with required/optional states. · static: `static/MultiSelectorForm.html`
- `src/examples/MultiSelectorGhostToolbar.tsx` — MultiSelector — Ghost Toolbar: Borderless MultiSelector variant composed with ghost buttons in a toolbar. · static: `static/MultiSelectorGhostToolbar.html`
- `src/examples/MultiSelectorSearchableMultiSelector.tsx` — MultiSelector — Searchable: Multi-select with search filtering and select-all. · static: `static/MultiSelectorSearchableMultiSelector.html`
- `src/examples/MultiSelectorSectionedMultiSelector.tsx` — MultiSelector — Sectioned Permissions: Multi-select with options grouped into labeled sections. · static: `static/MultiSelectorSectionedMultiSelector.html`

## Documentation

### Multi Selector

A checkbox dropdown for selecting multiple values from a list. Selected items can display as a count, labels, or badges. Use it for filtering or when presenting a finite set of options where multiple choices are needed.

**Do**

- Use for a moderate, finite set of options where multiple choices are needed.
- Enable search filtering when the list exceeds ~15 options.
- Use renderOption for custom option rows; the checkbox affordance remains owned by MultiSelector.
- Enable select-all when most users will want all or nearly all options selected.
- Use inside InputGroup only when the control needs a short prefix or suffix addon as part of one decorated input surface; prefer count or labels trigger display so the group stays single-line.
- Use variant="ghost" when a multi-selector sits in a toolbar with ghost buttons. If validation status is needed there, prefer statusVariant="tooltip" so the toolbar height stays compact.
- Use presentation="adaptive" when the multi-selector should become a bottom sheet on compact touch screens.

**Don't**

- Use for single-value selection; use Selector instead.
- Show more than ~20 options without enabling search.
- Wrap a disabled MultiSelector in Tooltip to explain why it is disabled; disabled triggers swallow the hover events the wrapper needs. Use the disabledMessage prop instead.

**Anatomy**

- Field — Standalone Field shell that provides the label and optional supporting content; omitted inside InputGroup.
- Trigger (required) — Painted control that displays the current selection or placeholder and opens the selection surface when editable.
- Icon-rendered start icon — Optional leading semantic icon or icon component rendered through Icon.
- Caller-rendered start content — Optional arbitrary React content rendered directly at the start of the trigger.
- Trigger clear button — Shared clear action that removes every selected value when hasClear is enabled.
- Status icon — Status glyph shown in place of the disclosure indicator for attached or tooltip status.
- Indicator icon — Trailing chevron shown when status presentation does not replace it; reflects collapsed or expanded state.
- Search row — Panel header with a borderless search input and optional clear action.
- Search icon — Leading magnifier rendered through Icon inside the search row.
- Search clear button — Shared clear action shown in the search row while a query is present.
- Option row — Selectable row for an option or the optional select-all choice.
- Option checkbox indicator — CheckboxInput indicator that presents each row’s selected, unselected, or indeterminate state.
- Option divider — Divider supplied in the public options data to separate adjacent option groups.
- Section heading — Visible heading for a labeled group of option rows.
- Empty state — Message shown when the shared panel content has no options or no search matches.
- Pointer popup — Anchored painted surface that hosts the shared panel content for popover presentation.
- Touch sheet heading — Heading above the shared panel content in bottom-sheet presentation.
- Touch sheet — BottomSheet surface that hosts the same panel content for bottom-sheet presentation.

Styling hook class: `.astryx-multi-selector`, `.astryx-multi-selector-clear-icon`, `.astryx-multi-selector-empty-state`, `.astryx-multi-selector-search`, `.astryx-multi-selector-section-heading`, `.astryx-multi-selector-indicator-icon`, `.astryx-multi-selector-option`, `.astryx-multi-selector-popup`

## Files

- `src/MultiSelector.doc.mjs`
- `src/MultiSelector.spec.md`
- `src/MultiSelector.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/MultiSelector
