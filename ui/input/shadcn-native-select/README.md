# Native Select

A styled native HTML select element with consistent design system integration.

## Classification

- Category: `input` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `src/ui/native-select.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: A styled native HTML select element with consistent design system integration.
- Provides: native-select with 4 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: native-select-demo, native-select-groups, native-select-disabled, native-select-invalid
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add native-select`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/native-select.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `src/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

import { InfoIcon } from "lucide-react"

> Note:
  For a styled select component, see the [Select](/docs/components/select)
  component.

> Example `native-select-demo` — `src/examples/native-select-demo.tsx`, `static/native-select-demo.html`

## Installation

```bash
npx shadcn@latest add native-select
```

- Copy and paste the following code into your project.

Source: `components/ui/native-select.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx showLineNumbers
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select"
```

```tsx showLineNumbers
<NativeSelect>
  <NativeSelectOption value="">Select a fruit</NativeSelectOption>
  <NativeSelectOption value="apple">Apple</NativeSelectOption>
  <NativeSelectOption value="banana">Banana</NativeSelectOption>
  <NativeSelectOption value="blueberry">Blueberry</NativeSelectOption>
  <NativeSelectOption value="pineapple">Pineapple</NativeSelectOption>
</NativeSelect>
```

## Composition

### Simple

Options placed directly under `NativeSelect` (no `NativeSelectOptGroup`).

```text
NativeSelect
├── NativeSelectOption
├── NativeSelectOption
├── NativeSelectOption
└── NativeSelectOption
```

### With groups

Use `NativeSelectOptGroup` to organize options into categories.

```text
NativeSelect
├── NativeSelectOptGroup
│   ├── NativeSelectOption
│   └── NativeSelectOption
└── NativeSelectOptGroup
    ├── NativeSelectOption
    └── NativeSelectOption
```

## Groups

Use `NativeSelectOptGroup` to organize options into categories.

> Example `native-select-groups` — `src/examples/native-select-groups.tsx`, `static/native-select-groups.html`

## Disabled

Add the `disabled` prop to the `NativeSelect` component to disable the select.

> Example `native-select-disabled` — `src/examples/native-select-disabled.tsx`, `static/native-select-disabled.html`

## Invalid

Use `aria-invalid` to show validation errors and the `data-invalid` attribute to the `Field` component for styling.

> Example `native-select-invalid` — `src/examples/native-select-invalid.tsx`, `static/native-select-invalid.html`

## Native Select vs Select

- Use `NativeSelect` for native browser behavior, better performance, or mobile-optimized dropdowns.
- Use `Select` for custom styling, animations, or complex interactions.

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `native-select-rtl` — `src/examples/native-select-rtl.tsx`, `static/native-select-rtl.html`

## API Reference

### NativeSelect

The main select component that wraps the native HTML select element.

```tsx
<NativeSelect>
  <NativeSelectOption value="option1">Option 1</NativeSelectOption>
  <NativeSelectOption value="option2">Option 2</NativeSelectOption>
</NativeSelect>
```

### NativeSelectOption

Represents an individual option within the select.

| Prop       | Type      | Default |
| ---------- | --------- | ------- |
| `value`    | `string`  |         |
| `disabled` | `boolean` | `false` |

### NativeSelectOptGroup

Groups related options together for better organization.

| Prop       | Type      | Default |
| ---------- | --------- | ------- |
| `label`    | `string`  |         |
| `disabled` | `boolean` | `false` |

```tsx
<NativeSelectOptGroup label="Fruits">
  <NativeSelectOption value="apple">Apple</NativeSelectOption>
  <NativeSelectOption value="banana">Banana</NativeSelectOption>
</NativeSelectOptGroup>
```

## Files

- `src/ui/native-select.tsx` — the ui file as the registry installs it
- `src/examples/native-select-demo.tsx`
- `src/examples/native-select-groups.tsx`
- `src/examples/native-select-disabled.tsx`
- `src/examples/native-select-invalid.tsx`
- `src/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/native-select
