# Calendar

Calendar lets the user pick a date or date range from a month grid. Use it in booking flows, scheduling UIs, date filters, or anywhere the user needs to see surrounding dates for context.

## Classification

- Category: `input` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/Calendar.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Calendar lets the user pick a date or date range from a month grid.
- Avoid when: Use a calendar for dates far in the past or future like a birth date. A text input is faster for open-ended entry. Disable large blocks of dates without context. The user should understand why dates are unavailable.
- Provides: Month header, Day grid, Selected day, Today marker
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: CalendarShowcase, CalendarConstraints, CalendarRangeWithValue, CalendarSingle, CalendarTwoMonths
- Upstream: Astryx core · Form Controls
- Keywords: calendar, datepicker, date picker, rangepicker, date range, monthview, daypicker

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

- `upstream/examples/CalendarShowcase.tsx` — Calendar: An interactive single-date calendar with a selected date. Click any day to change the selection. · static: `static/CalendarShowcase.html`
- `upstream/examples/CalendarConstraints.tsx` — Calendar — Constraints: Limit which dates can be selected using min/max bounds and custom rules like weekdays only. Use for scheduling UIs where certain dates are unavailable. · static: `static/CalendarConstraints.html`
- `upstream/examples/CalendarRangeWithValue.tsx` — Calendar — Range: Pick a start and end date with the range highlighted between them. Use for booking dates, time-off requests, or report filters. · static: `static/CalendarRangeWithValue.html`
- `upstream/examples/CalendarSingle.tsx` — Calendar — Single: Pick one date from a month grid. Use for appointment dates, due dates, or any field that needs a single date. · static: `static/CalendarSingle.html`
- `upstream/examples/CalendarTwoMonths.tsx` — Calendar — Two Months: Two months side by side for selecting ranges that span a month boundary. Use in booking or travel UIs where check-in and check-out often fall in different months. · static: `static/CalendarTwoMonths.html`

## Documentation

### Calendar

Calendar lets the user pick a date or date range from a month grid. Use it in booking flows, scheduling UIs, date filters, or anywhere the user needs to see surrounding dates for context.

**Do**

- Set min and max dates to limit selection to a valid window, like only future dates for a booking or the current quarter for a report.
- Use range mode when the user needs to pick a start and end date, like a trip or a time-off request.
- Use dateConstraints to disable specific dates like weekends or holidays, and explain why they are unavailable.
- Show two months side by side when the user frequently selects dates that span a month boundary.

**Don't**

- Use a calendar for dates far in the past or future like a birth date. A text input is faster for open-ended entry.
- Disable large blocks of dates without context. The user should understand why dates are unavailable.

**Anatomy**

- Month header (required) — The month name and year with navigation arrows to move between months. The arrows mirror automatically under dir="rtl".
- Day grid (required) — A 7-column grid of days with column headers for the day names.
- Selected day — The currently selected date, highlighted. In range mode, the start and end dates plus the days between them.
- Today marker — A subtle indicator on the current date for orientation.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `mode` | `'single' \| 'range'` | `'single'` | Selection mode. |
| `value` | `ISODateString \| DateRange` |  | Controlled selected value. |
| `defaultValue` | `ISODateString \| DateRange` |  | Uncontrolled default value. |
| `onChange` | `Function` |  | Selection callback. |
| `numberOfMonths` | `1 \| 2` | `1` | Number of months to display. |
| `min` | `ISODateString` |  | Minimum selectable date. |
| `max` | `ISODateString` |  | Maximum selectable date. |
| `dateConstraints` | `Array<(date: Date) => boolean>` |  | Custom constraint functions. |
| `maxRangeSpan` | `number` |  | Range mode: max days a range may span, both endpoints counted (7 = a 7-day window). Caps the window from the picked start; before a start is picked every day stays selectable. |
| `minRangeSpan` | `number` |  | Range mode: min days a range must span, both endpoints counted (2 forbids a single-day range). Clicking the start again commits a one-day range when allowed, or cancels the in-progress selection when the minimum is longer. Default 1. |
| `focusDate` | `ISODateString` |  | Controlled visible month. Unset, the calendar opens on the selected date, else on today clamped into the min/max window. |
| `onFocusDateChange` | `(focusDate: ISODateString) => void` |  | Navigation callback. |
| `handleRef` | `React.Ref<CalendarHandle>` |  | Imperative handle for calendar navigation, including navigateTo(). |
| `hasOutsideDays` | `boolean` | `true` | Show days from adjacent months. |
| `hasWeekNumbers` | `boolean` | `false` | Show ISO week numbers. |
| `hasVariableRowCount` | `boolean` | `false` | Variable vs fixed 6-row grid. |
| `weekStartsOn` | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 'sun' \| 'mon' \| 'tue' \| 'wed' \| 'thu' \| 'fri' \| 'sat'` | `0` | First day of week. Accepts a number (0=Sunday) or a three-letter day name (e.g. "mon"). |

Styling hook class: `.astryx-calendar`, `.astryx-calendar-nav`, `.astryx-calendar-day`

### Calendar

Calendar lets the user pick a date or date range from a month grid. Use it in booking flows, scheduling UIs, date filters, or anywhere the user needs to see surrounding dates for context.

**Do**

- Set min and max dates to limit selection to a valid window, like only future dates for a booking or the current quarter for a report.
- Use range mode when the user needs to pick a start and end date, like a trip or a time-off request.
- Use dateConstraints to disable specific dates like weekends or holidays, and explain why they are unavailable.
- Show two months side by side when the user frequently selects dates that span a month boundary.

**Don't**

- Use a calendar for dates far in the past or future like a birth date. A text input is faster for open-ended entry.
- Disable large blocks of dates without context. The user should understand why dates are unavailable.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `mode` | `'single' \| 'range'` | `'single'` | 选择模式。 |
| `value` | `ISODateString \| DateRange` |  | 受控选中值。 |
| `defaultValue` | `ISODateString \| DateRange` |  | 非受控默认值。 |
| `onChange` | `Function` |  | 选择回调函数。 |
| `numberOfMonths` | `1 \| 2` | `1` | 显示的月份数量。 |
| `min` | `ISODateString` |  | 可选择的最早日期。 |
| `max` | `ISODateString` |  | 可选择的最晚日期。 |
| `dateConstraints` | `Array<(date: Date) => boolean>` |  | 自定义约束函数。 |
| `maxRangeSpan` | `number` |  | 范围模式：范围最多可跨越的天数，含首尾两端（7 = 7 天窗口）。选定起始日后限制窗口大小。 |
| `minRangeSpan` | `number` |  | 范围模式：范围最少需跨越的天数，含首尾两端（2 表示禁止单日范围）。再次点击开始日期时，若最小范围允许则提交单日范围；否则取消进行中的选择。默认为 1。 |
| `focusDate` | `ISODateString` |  | 受控可见月份。未设置时，日历打开时显示已选日期所在月份；若无选中值，则显示今天，并将其限制在 min/max 范围内。 |
| `onFocusDateChange` | `(focusDate: ISODateString) => void` |  | 导航回调函数。 |
| `handleRef` | `React.Ref<CalendarHandle>` |  | 日历导航的命令式句柄，包括 navigateTo()。 |
| `hasOutsideDays` | `boolean` | `true` | 显示相邻月份的日期。 |
| `hasWeekNumbers` | `boolean` | `false` | 显示 ISO 周数。 |
| `hasVariableRowCount` | `boolean` | `false` | 可变行数与固定 6 行网格。 |
| `weekStartsOn` | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 'sun' \| 'mon' \| 'tue' \| 'wed' \| 'thu' \| 'fri' \| 'sat'` | `0` | 每周起始日。可为数字（0=周日）或三字母星期缩写（如 "mon"）。 |

Styling hook class: `.astryx-calendar`, `.astryx-calendar-nav`, `.astryx-calendar-day`

## Files

- `upstream/Calendar.doc.mjs`
- `upstream/Calendar.tsx`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Calendar
