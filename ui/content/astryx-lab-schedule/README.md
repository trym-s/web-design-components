# Schedule

Schedule is a read-only calendar surface that renders events as a month grid, a day or week time grid, or a list grouped by day: the layout comes from a view object you pass in. It handles timezone-aware date math, paging between ranges, and async event loading, and exposes header slots that plugins fill with navigation controls. Use it to display an existing schedule; it has no event selection, creation, or editing affordances.

## Classification

- Category: `content` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/Schedule.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Schedule is a read-only calendar surface that renders events as a month grid, a day or week time grid, or a list grouped by day: the layout comes from a view object you pass in.
- Avoid when: Reach for Schedule when the user has to pick a date. It has no selection model; use DateInput, DateRangeInput, or Calendar instead. Rely on event color alone to carry meaning. Only ten colors exist, so they repeat on larger category sets; the accessible label already announces title, category, and time. Pass a custom plugins array without re-adding the pagination plugin unless you deliberately want no navigation controls; a custom array replaces the default set rather than extending it.
- Provides: Header start slot, Header title, Loading spinner, Header end slot, View body, Event, Current time line
- Requires: React 19 with `@astryxdesign/lab` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: Schedule
- Upstream: Astryx lab (experimental, canary-only upstream) · Content

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

- `src/stories/Schedule.stories.tsx` — Storybook — Schedule

## Documentation

### Schedule

Schedule is a read-only calendar surface that renders events as a month grid, a day or week time grid, or a list grouped by day: the layout comes from a view object you pass in. It handles timezone-aware date math, paging between ranges, and async event loading, and exposes header slots that plugins fill with navigation controls. Use it to display an existing schedule; it has no event selection, creation, or editing affordances.

**Do**

- Hold the rendered date in state and wire onChangeDate to it. Schedule never advances the date itself, so without that handler the built-in previous/Today/next controls render but nothing moves.
- Match the view to the density of the data: a month grid for at-a-glance load, a day or week time grid when start and end times matter, a list when the schedule is sparse.
- Wrap Schedule in InternationalizationProvider to choose the language, numbering, and field order used by its date and time labels. Schedule date values and calendar arithmetic remain Gregorian for every locale.
- Give each event a category string that matches a categories entry so its color is meaningful and screen readers announce the category name. An unmatched name still renders, but always in blue.

**Don't**

- Reach for Schedule when the user has to pick a date. It has no selection model; use DateInput, DateRangeInput, or Calendar instead.
- Rely on event color alone to carry meaning. Only ten colors exist, so they repeat on larger category sets; the accessible label already announces title, category, and time.
- Pass a custom plugins array without re-adding the pagination plugin unless you deliberately want no navigation controls; a custom array replaces the default set rather than extending it.

**Anatomy**

- Header start slot — Leading header region filled by plugins. The default plugin set renders a previous / Today / next button group here.
- Header title (required) — A level-2 heading naming the range on screen, e.g. "May 2026". The same text is the accessible name of the schedule region.
- Loading spinner — Sits beside the title while an async events loader is still pending, labelled "Loading events".
- Header end slot — Trailing header region, empty by default. The view selector plugin renders its menu here.
- View body (required) — Whatever the view renders: a month grid, a day/week time grid with an hour gutter and an all-day row, or a list grouped under day headings. Grid views expose ARIA grid, columnheader, and gridcell roles and are marked aria-readonly.
- Event — One pill (grid views) or row with a color dot (list view) per event, tinted by its category and dimmed once it is in the past.
- Current time line — A line across the day or week time grid at the current time, on the current day only. It ticks once a minute and is absent during server rendering.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `view` * | `ScheduleView<Options>` |  | The view object that owns the layout and the date range each page covers. Build one with createScheduleMonthlyView, createScheduleWeeklyView, createScheduleDayView, or createScheduleListView; each factory takes its own options (weekStartsOn, minHour/maxHour/hourHeight, days). |
| `events` * | `ReadonlyArray<CalendarEvent> \| ((start: Instant, end: Instant) => Promise<ReadonlyArray<CalendarEvent>>)` |  | Either a static array, filtered to the events overlapping the rendered range and sorted by start, or a loader called with that range's start and end epoch milliseconds. A loader suspends while pending; the header shows a spinner and the view renders empty. Results are cached per loader identity and range, so keep the loader reference stable (useCallback) or every re-render refetches. |
| `categories` | `ReadonlyArray<{label: string, color: 'red' \| 'orange' \| 'yellow' \| 'green' \| 'teal' \| 'cyan' \| 'blue' \| 'purple' \| 'pink' \| 'gray'}>` | `[]` | Category definitions matched to each event by label === event.category. The match supplies the event's color and the category name in its accessible label. An event whose category names no entry keeps that name but falls back to blue; an event with no category is announced as "Event" in blue. |
| `date` * | `Instant` |  | Unix epoch milliseconds anywhere inside the range to render; the view expands it to a full month, week, day, or list window. Fully controlled; Schedule never changes it, so pair it with onChangeDate. |
| `focusDate` | `Instant` | `Date.now() at mount` | Unix epoch milliseconds marking the day treated as "today": in the month, week, and day views that cell gets aria-current="date" and the highlighted styling. The list view ignores it. When omitted it is captured once at mount and never advances afterwards. |
| `onChangeDate` | `(date: Instant) => void` |  | Called with the epoch milliseconds to render next when a pagination plugin pages backward or forward, or when Today is pressed. Paging preserves the time of day; Today passes the current time. This is the component's only callback; there is no event-level interaction. |
| `timezoneID` | `string` | `Intl.DateTimeFormat().resolvedOptions().timeZone` | IANA timezone ID (e.g. "America/Los_Angeles") used for every date calculation and every formatted label, so the same events regroup across days when it changes. |
| `plugins` | `ReadonlyArray<SchedulePlugin>` | `defaultSchedulePlugins` | Header plugins, applied in order; each may wrap or replace the start, center, and end header content. Supplying an array replaces the default pagination controls; compose useSchedulePaginationPlugin and useScheduleViewSelectorPlugin to keep both. |
| `headingLevel` | `2 \| 3 \| 4 \| 5 \| 6` | `3` | Heading level for sub-headings inside the schedule (the weekday and day column headers in the grid views, and the day headings in the list view), so the schedule nests correctly under the surrounding page outline. The header range title is always a level-2 heading. |

## Files

- `src/Schedule.doc.mjs`
- `src/Schedule.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://facebook.github.io/astryx/storybook/
