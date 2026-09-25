# Date Picker

A date picker component with range and presets.

## Classification

- Category: `input` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `upstream/examples/date-picker-demo.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: A date picker component with range and presets.
- Provides: composition pattern with 7 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: date-picker-demo, date-picker-basic, date-picker-range, date-picker-dob, date-picker-input, date-picker-time, date-picker-natural-language
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add date-picker`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/date-picker.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `upstream/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `date-picker-demo` — `upstream/examples/date-picker-demo.tsx`, `static/date-picker-demo.html`

## Installation

The Date Picker is built using a composition of the `<Popover />` and the `<Calendar />` components.

See installation instructions for the [Popover](/docs/components/radix/popover#installation) and the [Calendar](/docs/components/radix/calendar#installation) components.

## Usage

```tsx showLineNumbers title="components/example-date-picker.tsx"
"use client"

import * as React from "react"
import { cn } from "cn"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="w-[280px] justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </PopoverContent>
    </Popover>
  )
}
```

See the [React DayPicker](https://react-day-picker.js.org) documentation for more information.

## Composition

A date picker is built from `Popover` and `Calendar` (there is no `DatePicker` root component):

```text
Popover
├── PopoverTrigger
└── PopoverContent
    └── Calendar
```

## Basic

A basic date picker component.

> Example `date-picker-basic` — `upstream/examples/date-picker-basic.tsx`, `static/date-picker-basic.html`

## Range Picker

A date picker component for selecting a range of dates.

> Example `date-picker-range` — `upstream/examples/date-picker-range.tsx`, `static/date-picker-range.html`

## Date of Birth

A date picker component for selecting a date of birth. This component includes a dropdown caption layout for date and month selection.

> Example `date-picker-dob` — `upstream/examples/date-picker-dob.tsx`, `static/date-picker-dob.html`

## Input

A date picker component with an input field for selecting a date.

> Example `date-picker-input` — `upstream/examples/date-picker-input.tsx`, `static/date-picker-input.html`

## Time Picker

A date picker component with a time input field for selecting a time.

> Example `date-picker-time` — `upstream/examples/date-picker-time.tsx`, `static/date-picker-time.html`

## Natural Language Picker

This component uses the `chrono-node` library to parse natural language dates.

> Example `date-picker-natural-language` — `upstream/examples/date-picker-natural-language.tsx`, `static/date-picker-natural-language.html`

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `date-picker-rtl` — `upstream/examples/date-picker-rtl.tsx`, `static/date-picker-rtl.html`

## Files

- `upstream/examples/date-picker-demo.tsx`
- `upstream/examples/date-picker-basic.tsx`
- `upstream/examples/date-picker-range.tsx`
- `upstream/examples/date-picker-dob.tsx`
- `upstream/examples/date-picker-input.tsx`
- `upstream/examples/date-picker-time.tsx`
- `upstream/examples/date-picker-natural-language.tsx`
- `upstream/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/date-picker
