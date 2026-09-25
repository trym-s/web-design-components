# Date Range Input

DateRangeInput lets users select a start and end date from a dual-month calendar popover. Use it for filtering data by time period, report generation, analytics dashboards, and booking flows.

## Classification

- Category: `input` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/DateRangeInput.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: DateRangeInput lets users select a start and end date from a dual-month calendar popover.
- Avoid when: Use DateRangeInput when only a single date is needed; use DateInput instead. Hide the label without surrounding context that makes the purpose obvious. Wrap a disabled DateRangeInput in Tooltip to explain why it is disabled; disabled triggers swallow the hover events the wrapper needs. Use the disabledMessage prop instead.
- Provides: Label, Field surface, Trigger button, Calendar icon, Calendar popover, Preset sidebar, Preset button, Clear button, Status message
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: DateRangeInputShowcase, DateRangeInputWithPresets, DateRangeInputWithValidation
- Upstream: Astryx core · Form Controls
- Keywords: daterangepicker, daterange, range, calendar, filter, analytics, period, schedule

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

- `src/examples/DateRangeInputShowcase.tsx` — Date Range Input: A date range picker with a button trigger and dual-month calendar popover with preset ranges. · static: `static/DateRangeInputShowcase.html`
- `src/examples/DateRangeInputWithPresets.tsx` — DateRangeInput — With Presets: Date range picker with quick-select presets for common periods. Use for analytics dashboards, report filters, or any context where users frequently select standard time windows. · static: `static/DateRangeInputWithPresets.html`
- `src/examples/DateRangeInputWithValidation.tsx` — DateRangeInput — Validation: Date range input in all three status states: error, warning, and success. Use to surface booking conflicts, flag high-demand periods, or confirm an available range. · static: `static/DateRangeInputWithValidation.html`

## Documentation

### Date Range Input

DateRangeInput lets users select a start and end date from a dual-month calendar popover. Use it for filtering data by time period, report generation, analytics dashboards, and booking flows.

**Do**

- Use presets for common ranges like "Last 7 days" to speed up selection.
- Use min/max to constrain selectable dates to valid ranges.
- Keep hasClear enabled (default) so users can reset the filter.
- Provide clear labels and descriptions so users understand what the range controls.

**Don't**

- Use DateRangeInput when only a single date is needed; use DateInput instead.
- Hide the label without surrounding context that makes the purpose obvious.
- Wrap a disabled DateRangeInput in Tooltip to explain why it is disabled; disabled triggers swallow the hover events the wrapper needs. Use the disabledMessage prop instead.

**Anatomy**

- Label (required) — Text above the trigger describing what date range is expected.
- Field surface (required) — Bordered control containing the calendar toggle, range trigger, and end affordances.
- Trigger button (required) — A button showing the formatted range or placeholder. Clicking opens the popover.
- Calendar icon (required) — A trailing icon that also opens the popover.
- Calendar popover (required) — A dual-month calendar grid with range selection and hover preview.
- Preset sidebar — A list of preset range options beside the calendar.
- Preset button — A quick-select action for one preset range, reflecting current and disabled states.
- Clear button — A × button that resets the range to null.
- Status message — An error, warning, or success message below the trigger.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `string` |  | Label text. |
| `isLabelHidden` | `boolean` | `false` | Visually hide the label. |
| `description` | `string` |  | Helper text displayed below the label. |
| `isOptional` | `boolean` | `false` | Show an "(optional)" indicator. |
| `isRequired` | `boolean` | `false` | Mark the field as required. |
| `isDisabled` | `boolean` | `false` | Disable the trigger and picker. |
| `disabledMessage` | `string` |  | Explains why the input is disabled. With isDisabled, shows a tooltip on hover/keyboard focus and keeps the field focusable via aria-disabled (activation stays blocked). Use this instead of wrapping a disabled DateRangeInput in Tooltip. Disabled controls swallow the hover events an external Tooltip needs. |
| `value` * | `DateRange \| null` |  | Selected date range or null. Import the `DateRange` type from `@astryxdesign/core/DateRangeInput`; it is `{start: ISODateString, end: ISODateString}`. Do NOT redeclare your own DateRange type; use the exported one so TypeScript structurally matches. |
| `onChange` * | `(value: DateRange \| null) => void` |  | Callback when the range changes. Called with null on clear. |
| `changeAction` | `(value: DateRange \| null) => void \| Promise<void>` |  | Async action fired after onChange. Drives optimistic UI updates via useTransition. |
| `isLoading` | `boolean` | `false` | Whether the input is in a loading state. Disables interaction and shows a spinner. |
| `min` | `ISODateString` |  | Minimum selectable date. `ISODateString` is a template literal type (`\`${number}${number}${number}${number}-${number}${number}-${number}${number}\``). Pass a string literal like `"2026-01-28"`, not a runtime string variable. Import it from `@astryxdesign/core/Calendar` or use `as ISODateString` if computing the value dynamically. |
| `max` | `ISODateString` |  | Maximum selectable date. Same template literal type as `min`: use a YYYY-MM-DD string literal or cast with `as ISODateString`. |
| `dateConstraints` | `Array<(date: Date) => boolean>` |  | Custom constraint functions to disable specific dates. |
| `maxRangeSpan` | `number` |  | Maximum days a selected range may span, counting both endpoints (`7` = a 7-day window, start + 6). Once a start is picked, days beyond this distance are disabled so the range cannot stretch past the cap. Rolling window relative to the start; for fixed calendar bounds use `min`/`max`. Constrains selection only; it never rewrites a `value` already wider than the cap (flag that with `status`). |
| `minRangeSpan` | `number` |  | Minimum days a selected range must span, counting both endpoints (`2` forbids a single-day range). Once a start is picked, days closer than this are disabled. Clicking the start again commits a one-day range when allowed, or cancels the in-progress selection when the minimum is longer. Defaults to 1 (same-day start and end allowed). |
| `presets` | `Array<DateRangePreset>` |  | Preset ranges shown as quick-select options beside the calendar. A preset is disabled when either endpoint violates min, max, or dateConstraints, or when its span violates minRangeSpan or maxRangeSpan. |
| `hasClear` | `boolean` | `true` | Shows a clear button when a range is selected. |
| `placeholder` | `string` | `'Select date range'` | Placeholder text when no range is selected. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the trigger. |
| `status` | `{type: 'warning' \| 'error' \| 'success', message?: string}` |  | Status indicator for error, warning, or success states. |
| `statusVariant` | `'attached' \| 'detached' \| 'tooltip'` | `'attached'` | How the status message is placed relative to the input. attached overlaps directly below the input (bordered treatment); detached floats below as a separate element with spacing; tooltip hides the message box and surfaces it in a tooltip on the status icon. |
| `labelTooltip` | `string` |  | Tooltip text via info icon at label end. |
| `numberOfMonths` | `1 \| 2` | `2` | Number of months in the calendar. |
| `weekStartsOn` | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 'sun' \| 'mon' \| 'tue' \| 'wed' \| 'thu' \| 'fri' \| 'sat'` | `0` | First day of week in the calendar. A number (0 = Sunday to 6 = Saturday) or a three-letter day name. |
| `width` | `SizeValue` |  | Width of the field (number = pixels, string used as-is, e.g. "100%"). Sizes the whole field (label, control, and status) so they stay aligned. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization. |

Styling hook class: `.astryx-date-range-input`, `.astryx-date-range-input-toggle-icon`, `.astryx-date-range-input-clear-icon`, `.astryx-date-range-input-presets`, `.astryx-date-range-input-preset`

## Files

- `src/DateRangeInput.doc.mjs`
- `src/DateRangeInput.spec.md`
- `src/DateRangeInput.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/DateRangeInput
