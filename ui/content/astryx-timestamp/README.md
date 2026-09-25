# Timestamp

Timestamp formats a date or time value into human-readable text. Use it to show when something was created, updated, or is scheduled; picking relative for recency, absolute for precision, or auto to let the component decide.

## Classification

- Category: `content` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/Timestamp.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Timestamp formats a date or time value into human-readable text.
- Avoid when: Don't display raw Unix timestamps or ISO strings to users; always pass them through Timestamp to get a human-readable format. Avoid system_date or system_time formats in user-facing UI; they are meant for developer tools, logs, and machine-readable contexts. Don't disable the hover card on relative timestamps; users expect to hover for the full date when they see "3 hours ago". Don't stack many zones into one card; it is capped at 300px wide and long labelled lines wrap. Two or three entries read well. Don't pass a fixed-offset abbreviation like "EST" as timezoneID; it is a valid identifier but never observes daylight saving, so it reads an hour wrong for half the year. Use the region id, "America/New_York".
- Provides: Formatted text, Hover card, Hover card row, Copy button
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: TimestampShowcase, TimestampAutoFormat, TimestampColors, TimestampFormats, TimestampRelativeFormat, TimestampTimezone, TimestampTooltipTimezones
- Upstream: Astryx core · Content
- Keywords: date, time, datetime, relative, ago, clock, format, duration

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

- `src/examples/TimestampShowcase.tsx` — Timestamp · static: `static/TimestampShowcase.html`
- `src/examples/TimestampAutoFormat.tsx` — Timestamp — Auto: Auto format that shows relative time for recent dates and switches to the full date for older ones. The default choice for most use cases. · static: `static/TimestampAutoFormat.html`
- `src/examples/TimestampColors.tsx` — Timestamp — Colors: Timestamp rendered in each available color variant: primary, secondary, disabled, and active. · static: `static/TimestampColors.html`
- `src/examples/TimestampFormats.tsx` — Timestamp — Formats: All display formats side by side: date, date_time, time, and their system equivalents. Use date and date_time for user-facing UI, system variants for logs and dev tools. · static: `static/TimestampFormats.html`
- `src/examples/TimestampRelativeFormat.tsx` — Timestamp — Relative: Relative time labels from seconds to months ago, with hover tooltips showing the full date. Use in feeds, comment threads, and activity logs. · static: `static/TimestampRelativeFormat.html`
- `src/examples/TimestampTimezone.tsx` — Timestamp — Timezone: Timestamps with the timezone abbreviation appended. Enable isTimezoneShown for audiences across time zones, like audit logs or team calendars. · static: `static/TimestampTimezone.html`
- `src/examples/TimestampTooltipTimezones.tsx` — Timestamp — Tooltip time zones: Hover tooltips that show one instant across several time zones or formats. Use tooltipEntries when readers must compare zones, like an incident log carrying both the reader's time and the event's origin zone. · static: `static/TimestampTooltipTimezones.html`

## Documentation

### Timestamp

Timestamp formats a date or time value into human-readable text. Use it to show when something was created, updated, or is scheduled; picking relative for recency, absolute for precision, or auto to let the component decide.

**Do**

- Use the auto format in feeds and lists so recent items show "2 hours ago" and older items show the full date automatically.
- Keep formatting consistent within the same list or table; mixing relative and absolute timestamps in the same column confuses scanning.
- Enable isTimezoneShown when the audience spans multiple time zones, like a global team calendar or audit log.
- Use tooltipEntries when readers must compare zones, such as an incident log where the reader's time and the event's origin zone both matter.
- Label every entry once a tooltip shows more than one zone; a bare abbreviation is not always recognizable (Tokyo renders as "GMT+9", not "JST").
- Use isLive for active dashboards or real-time feeds so the relative time stays accurate without a page refresh.
- Reach for tooltipEntries when readers need to grab an exact value: an incident log or deploy record where someone pastes the UTC time or Unix seconds elsewhere; configuring entries turns the hover into copy-to-clipboard rows.

**Don't**

- Don't display raw Unix timestamps or ISO strings to users; always pass them through Timestamp to get a human-readable format.
- Avoid system_date or system_time formats in user-facing UI; they are meant for developer tools, logs, and machine-readable contexts.
- Don't disable the hover card on relative timestamps; users expect to hover for the full date when they see "3 hours ago".
- Don't stack many zones into one card; it is capped at 300px wide and long labelled lines wrap. Two or three entries read well.
- Don't pass a fixed-offset abbreviation like "EST" as timezoneID; it is a valid identifier but never observes daylight saving, so it reads an hour wrong for half the year. Use the region id, "America/New_York".

**Anatomy**

- Formatted text (required) — The rendered date, time, or relative label like "2 hours ago" or "Mar 21, 2025".
- Hover card — A copyable hover card showing the full absolute date and time when the display is relative, or the rows configured via tooltipEntries. Its default single row carries the full absolute time.
- Hover card row — One row of the card: an optional label beside the instant rendered in one time zone and format. Rows opt into a copy button via isCopyable.
- Copy button (required) — Per-row copy-to-clipboard button in the hover card; copies that row's formatted value.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` * | `string \| number` |  | The date/time to display. Accepts Unix timestamps (seconds) or ISO 8601 strings. |
| `format` | `'relative' \| 'relative_short' \| 'auto' \| 'date' \| 'date_long' \| 'date_weekday' \| 'date_time' \| 'time' \| 'system_date' \| 'system_date_time' \| 'system_time' \| 'unix_seconds'` | `'auto'` | Display format. 'relative' uses the locale's native long relative-time wording ('2 hours ago' in English), 'relative_short' uses its narrow pattern ('2h ago' in English) for compact surfaces, 'date' shows 'Mar 21, 2025', 'date_long' shows 'March 21, 2025', 'date_weekday' shows 'Wed, Mar 21, 2025', 'date_time' shows 'Mar 21, 2025, 2:51 PM', 'time' shows '2:51 PM', 'system_*' variants use ISO-style formatting, 'unix_seconds' shows the Unix time in whole seconds since the epoch (an absolute, zone-independent value), 'auto' switches from relative to date_time based on recency. |
| `autoThreshold` | `number` | `604800` | Threshold in seconds for 'auto' format to switch from relative to date_time. |
| `hasTooltip` | `boolean` | `true` | Whether to show a copyable hover card with the full date/time on hover. Applies to relative timestamps and to any format once tooltipEntries is configured. |
| `tooltipEntries` | `ReadonlyArray<{timezoneID?: string; format?: TimestampTooltipFormat; label?: string; isCopyable?: boolean}>` |  | Lines to show on hover, so one instant can be read (and optionally copied) in several time zones and/or formats at once. Each entry is one line, in the order given. Omit timezoneID (or pass 'local') for the viewer's own zone; format defaults to the full absolute style and also accepts 'full' alongside every non-relative TimestampFormat. Rows are read-only unless they set isCopyable (default false); copyable rows show a copy button in a dedicated trailing action column so buttons align, and the column is only present when some row is copyable. With no entries the card shows a single default row with the full absolute time, which is copyable. Configuring entries also attaches the surface to absolute formats, which otherwise have none. |
| `isTimezoneShown` | `boolean` | `false` | Whether to append the timezone abbreviation to the visible text. Applies to the date_time and time formats; system_* formats stay machine-readable and never carry one. Use tooltipEntries to control the tooltip's time zones. |
| `isLive` | `boolean` | `false` | Whether the relative time should update live (e.g. "2 min ago" → "3 min ago"). |
| `type` | `'body' \| 'large' \| 'label' \| 'supporting' \| 'code' \| 'display-1' \| 'display-2' \| 'display-3' \| 'inherit'` | `'supporting'` | Semantic text type from Text. Determines size, weight, and line-height. |
| `size` | `'4xs' \| '3xs' \| '2xs' \| 'xsm' \| 'sm' \| 'base' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| '4xl'` |  | Explicit font size override. Overrides the size from type. |
| `color` | `'primary' \| 'secondary' \| 'disabled' \| 'placeholder' \| 'accent' \| 'inherit'` | `'secondary'` | Text color. |
| `weight` | `'normal' \| 'medium' \| 'semibold' \| 'bold'` |  | Font weight override. |

Styling hook class: `.astryx-timestamp`, `.astryx-timestamp-copy-button`

## Files

- `src/Timestamp.doc.mjs`
- `src/Timestamp.tsx`
- `src/TimestampHoverCard.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Timestamp
