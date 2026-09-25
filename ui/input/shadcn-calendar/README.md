# Calendar

A calendar component that allows users to select a date or a range of dates.

## Classification

- Category: `input` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `src/ui/calendar.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: A calendar component that allows users to select a date or a range of dates.
- Provides: calendar with 11 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: calendar-demo, calendar-hijri, calendar-basic, calendar-range, calendar-caption, calendar-presets, calendar-time, calendar-booked-dates, calendar-custom-days, calendar-week-numbers, calendar-multiple
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add calendar`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/calendar.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `src/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `calendar-demo` — `src/examples/calendar-demo.tsx`, `static/calendar-demo.html`

## Installation

```bash
npx shadcn@latest add calendar
```

- Install the following dependencies:

```bash
npm install react-day-picker date-fns
```

- Add the `Button` component to your project.

The `Calendar` component uses the `Button` component. Make sure you have it installed in your project.

- Copy and paste the following code into your project.

Source: `components/ui/calendar.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx showLineNumbers
import { Calendar } from "@/components/ui/calendar"
```

```tsx showLineNumbers
const [date, setDate] = React.useState<Date | undefined>(new Date())

return (
  <Calendar
    mode="single"
    selected={date}
    onSelect={setDate}
    className="rounded-lg border"
  />
)
```

See the [React DayPicker](https://react-day-picker.js.org) documentation for more information.

## About

The `Calendar` component is built on top of [React DayPicker](https://react-day-picker.js.org).

## Date Picker

You can use the `<Calendar>` component to build a date picker. See the [Date Picker](/docs/components/radix/date-picker) page for more information.

## Persian / Hijri / Jalali Calendar

To use the Persian calendar, edit `components/ui/calendar.tsx` and replace `react-day-picker` with `react-day-picker/persian`.

```diff
- import { DayPicker } from "react-day-picker"
+ import { DayPicker } from "react-day-picker/persian"
```

> Example `calendar-hijri` — `src/examples/calendar-hijri.tsx`, `static/calendar-hijri.html`

## Selected Date (With TimeZone)

The Calendar component accepts a `timeZone` prop to ensure dates are displayed and selected in the user's local timezone.

```tsx showLineNumbers
export function CalendarWithTimezone() {
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [timeZone, setTimeZone] = React.useState<string | undefined>(undefined)

  React.useEffect(() => {
    setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone)
  }, [])

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      timeZone={timeZone}
    />
  )
}
```

**Note:** If you notice a selected date offset (for example, selecting the 20th highlights the 19th), make sure the `timeZone` prop is set to the user's local timezone.

**Why client-side?** The timezone is detected using `Intl.DateTimeFormat().resolvedOptions().timeZone` inside a `useEffect` to ensure compatibility with server-side rendering. Detecting the timezone during render would cause hydration mismatches, as the server and client may be in different timezones.

## Basic

A basic calendar component. We used `className="rounded-lg border"` to style the calendar.

> Example `calendar-basic` — `src/examples/calendar-basic.tsx`, `static/calendar-basic.html`

## Range Calendar

Use the `mode="range"` prop to enable range selection.

> Example `calendar-range` — `src/examples/calendar-range.tsx`, `static/calendar-range.html`

## Month and Year Selector

Use `captionLayout="dropdown"` to show month and year dropdowns.

> Example `calendar-caption` — `src/examples/calendar-caption.tsx`, `static/calendar-caption.html`

## Presets

> Example `calendar-presets` — `src/examples/calendar-presets.tsx`, `static/calendar-presets.html`

## Date and Time Picker

> Example `calendar-time` — `src/examples/calendar-time.tsx`, `static/calendar-time.html`

## Booked dates

> Example `calendar-booked-dates` — `src/examples/calendar-booked-dates.tsx`, `static/calendar-booked-dates.html`

## Custom Cell Size

> Example `calendar-custom-days` — `src/examples/calendar-custom-days.tsx`, `static/calendar-custom-days.html`

You can customize the size of calendar cells using the `--cell-size` CSS variable. You can also make it responsive by using breakpoint-specific values:

```tsx showLineNumbers
<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-lg border [--cell-size:--spacing(11)] md:[--cell-size:--spacing(12)]"
/>
```

Or use fixed values:

```tsx showLineNumbers
<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-lg border [--cell-size:2.75rem] md:[--cell-size:3rem]"
/>
```

## Week Numbers

Use `showWeekNumber` to show week numbers.

> Example `calendar-week-numbers` — `src/examples/calendar-week-numbers.tsx`, `static/calendar-week-numbers.html`

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

See also the [Hijri Guide](#persian--hijri--jalali-calendar) for enabling the Persian / Hijri / Jalali calendar.

> Example `calendar-rtl` — `src/examples/calendar-rtl.tsx`, `static/calendar-rtl.html`

When using RTL, import the locale from `react-day-picker/locale` and pass both the `locale` and `dir` props to the Calendar component:

```tsx showLineNumbers
import { arSA } from "react-day-picker/locale"

;<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  locale={arSA}
  dir="rtl"
/>
```

## API Reference

See the [React DayPicker](https://react-day-picker.js.org) documentation for more information on the `Calendar` component.

## Changelog

### RTL Support

If you're upgrading from a previous version of the `Calendar` component, you'll need to apply the following updates to add locale support:

- Import the `Locale` type.

Add `Locale` to your imports from `react-day-picker`:

```diff
  import {
    DayPicker,
    getDefaultClassNames,
    type DayButton,
+   type Locale,
  } from "react-day-picker"
```

- Add `locale` prop to the Calendar component.

Add the `locale` prop to the component's props:

```diff
  function Calendar({
    className,
    classNames,
    showOutsideDays = true,
    captionLayout = "label",
    buttonVariant = "ghost",
+   locale,
    formatters,
    components,
    ...props
  }: React.ComponentProps<typeof DayPicker> & {
    buttonVariant?: React.ComponentProps<typeof Button>["variant"]
  }) {
```

- Pass `locale` to DayPicker.

Pass the `locale` prop to the `DayPicker` component:

```diff
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(...)}
      captionLayout={captionLayout}
+     locale={locale}
      formatters={{
        formatMonthDropdown: (date) =>
-         date.toLocaleString("default", { month: "short" }),
+         date.toLocaleString(locale?.code, { month: "short" }),
        ...formatters,
      }}
```

- Update CalendarDayButton to accept locale.

Update the `CalendarDayButton` component signature and pass `locale`:

```diff
  function CalendarDayButton({
    className,
    day,
    modifiers,
+   locale,
    ...props
- }: React.ComponentProps<typeof DayButton>) {
+ }: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
```

- Update date formatting in CalendarDayButton.

Use `locale?.code` in the date formatting:

```diff
    <Button
      variant="ghost"
      size="icon"
-     data-day={day.date.toLocaleDateString()}
+     data-day={day.date.toLocaleDateString(locale?.code)}
      ...
    />
```

- Pass locale to DayButton component.

Update the `DayButton` component usage to pass the `locale` prop:

```diff
      components={{
        ...
-       DayButton: CalendarDayButton,
+       DayButton: ({ ...props }) => (
+         <CalendarDayButton locale={locale} {...props} />
+       ),
        ...
      }}
```

- Update RTL-aware CSS classes.

Replace directional classes with logical properties for better RTL support:

```diff
  // In the day classNames:
- [&:last-child[data-selected=true]_button]:rounded-r-(--cell-radius)
+ [&:last-child[data-selected=true]_button]:rounded-e-(--cell-radius)
- [&:nth-child(2)[data-selected=true]_button]:rounded-l-(--cell-radius)
+ [&:nth-child(2)[data-selected=true]_button]:rounded-s-(--cell-radius)
- [&:first-child[data-selected=true]_button]:rounded-l-(--cell-radius)
+ [&:first-child[data-selected=true]_button]:rounded-s-(--cell-radius)

  // In range_start classNames:
- rounded-l-(--cell-radius) ... after:right-0
+ rounded-s-(--cell-radius) ... after:end-0

  // In range_end classNames:
- rounded-r-(--cell-radius) ... after:left-0
+ rounded-e-(--cell-radius) ... after:start-0

  // In CalendarDayButton className:
- data-[range-end=true]:rounded-r-(--cell-radius)
+ data-[range-end=true]:rounded-e-(--cell-radius)
- data-[range-start=true]:rounded-l-(--cell-radius)
+ data-[range-start=true]:rounded-s-(--cell-radius)
```

After applying these changes, you can use the `locale` prop to provide locale-specific formatting:

```tsx
import { enUS } from "react-day-picker/locale"

;<Calendar mode="single" selected={date} onSelect={setDate} locale={enUS} />
```

## Files

- `src/ui/calendar.tsx` — the ui file as the registry installs it
- `src/examples/calendar-demo.tsx`
- `src/examples/calendar-hijri.tsx`
- `src/examples/calendar-basic.tsx`
- `src/examples/calendar-range.tsx`
- `src/examples/calendar-caption.tsx`
- `src/examples/calendar-presets.tsx`
- `src/examples/calendar-time.tsx`
- `src/examples/calendar-booked-dates.tsx`
- `src/examples/calendar-custom-days.tsx`
- `src/examples/calendar-week-numbers.tsx`
- `src/examples/calendar-multiple.tsx`
- `src/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/calendar
