# Checkbox

A control that allows the user to toggle between checked and not checked.

## Classification

- Category: `input` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `src/ui/checkbox.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: A control that allows the user to toggle between checked and not checked.
- Provides: checkbox with 7 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: checkbox-demo, checkbox-invalid, checkbox-basic, checkbox-description, checkbox-disabled, checkbox-group, checkbox-table
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add checkbox`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/checkbox.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `src/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `checkbox-demo` — `src/examples/checkbox-demo.tsx`, `static/checkbox-demo.html`

## Installation

```bash
npx shadcn@latest add checkbox
```

- Install the following dependencies:

```bash
npm install radix-ui
```

- Copy and paste the following code into your project.

Source: `components/ui/checkbox.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx
import { Checkbox } from "@/components/ui/checkbox"
```

```tsx
<Checkbox />
```

## Checked State

Use `defaultChecked` for uncontrolled checkboxes, or `checked` and
`onCheckedChange` to control the state.

```tsx showLineNumbers
import * as React from "react"

export function Example() {
  const [checked, setChecked] = React.useState(false)

  return <Checkbox checked={checked} onCheckedChange={setChecked} />
}
```

## Invalid State

Set `aria-invalid` on the checkbox and `data-invalid` on the field wrapper to
show the invalid styles.

> Example `checkbox-invalid` — `src/examples/checkbox-invalid.tsx`, `static/checkbox-invalid.html`

## Basic

Pair the checkbox with `Field` and `FieldLabel` for proper layout and labeling.

> Example `checkbox-basic` — `src/examples/checkbox-basic.tsx`, `static/checkbox-basic.html`

## Description

Use `FieldContent` and `FieldDescription` for helper text.

> Example `checkbox-description` — `src/examples/checkbox-description.tsx`, `static/checkbox-description.html`

## Disabled

Use the `disabled` prop to prevent interaction and add the `data-disabled` attribute to the `<Field>` component for disabled styles.

> Example `checkbox-disabled` — `src/examples/checkbox-disabled.tsx`, `static/checkbox-disabled.html`

## Group

Use multiple fields to create a checkbox list.

> Example `checkbox-group` — `src/examples/checkbox-group.tsx`, `static/checkbox-group.html`

## Table

> Example `checkbox-table` — `src/examples/checkbox-table.tsx`, `static/checkbox-table.html`

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `checkbox-rtl` — `src/examples/checkbox-rtl.tsx`, `static/checkbox-rtl.html`

## API Reference

See the [Radix UI](https://www.radix-ui.com/docs/primitives/components/checkbox#api-reference) documentation for more information.

## Files

- `src/ui/checkbox.tsx` — the ui file as the registry installs it
- `src/examples/checkbox-demo.tsx`
- `src/examples/checkbox-invalid.tsx`
- `src/examples/checkbox-basic.tsx`
- `src/examples/checkbox-description.tsx`
- `src/examples/checkbox-disabled.tsx`
- `src/examples/checkbox-group.tsx`
- `src/examples/checkbox-table.tsx`
- `src/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/checkbox
