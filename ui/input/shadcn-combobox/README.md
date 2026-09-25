# Combobox

Autocomplete input with a list of suggestions.

## Classification

- Category: `input` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `src/ui/combobox.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: Autocomplete input with a list of suggestions.
- Provides: combobox with 21 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: combobox-demo, combobox-basic, combobox-multiple, combobox-clear, combobox-groups, combobox-custom, combobox-invalid, combobox-disabled, combobox-auto-highlight, combobox-popup, combobox-input-group, combobox-auto-highlight, combobox-basic, combobox-clear, combobox-custom, combobox-demo, combobox-disabled, combobox-groups, combobox-invalid, combobox-multiple, combobox-popup
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add combobox`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/combobox.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `src/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `combobox-demo` (base-nova) — `src/examples/combobox-demo.tsx`, `static/combobox-demo.html`

## Installation

```bash
npx shadcn@latest add combobox
```

- Install the following dependencies:

```bash
npm install @base-ui/react
```

- Copy and paste the following code into your project.

Source: `components/ui/combobox.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx showLineNumbers
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
```

```tsx showLineNumbers
const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]

export function ExampleCombobox() {
  return (
    <Combobox items={frameworks}>
      <ComboboxInput placeholder="Select a framework" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
```

## Composition

### Simple

A single-line input and a flat list (see [Basic](#basic)).

```text
Combobox
├── ComboboxInput
└── ComboboxContent
    ├── ComboboxEmpty
    └── ComboboxList
        ├── ComboboxItem
        └── ComboboxItem
```

### With chips

Multi-select with `multiple`, chips, and a chips input (see [Multiple](#multiple)).

```text
Combobox
├── ComboboxChips
│   ├── ComboboxValue
│   │   └── ComboboxChip
│   └── ComboboxChipsInput
└── ComboboxContent
    ├── ComboboxEmpty
    └── ComboboxList
        ├── ComboboxItem
        └── ComboboxItem
```

### With groups and collection

Nested items per group using `ComboboxCollection` inside each `ComboboxGroup`, with a separator between groups (see [Groups](#groups)).

```text
Combobox
├── ComboboxInput
└── ComboboxContent
    ├── ComboboxEmpty
    └── ComboboxList
        ├── ComboboxGroup
        │   ├── ComboboxLabel
        │   └── ComboboxCollection
        │       ├── ComboboxItem
        │       └── ComboboxItem
        ├── ComboboxSeparator
        └── ComboboxGroup
            ├── ComboboxLabel
            └── ComboboxCollection
                ├── ComboboxItem
                └── ComboboxItem
```

## Custom Items

Use `itemToStringValue` when your items are objects.

```tsx showLineNumbers
import * as React from "react"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"

type Framework = {
  label: string
  value: string
}

const frameworks: Framework[] = [
  { label: "Next.js", value: "next" },
  { label: "SvelteKit", value: "sveltekit" },
  { label: "Nuxt", value: "nuxt" },
]

export function ExampleComboboxCustomItems() {
  return (
    <Combobox
      items={frameworks}
      itemToStringValue={(framework) => framework.label}
    >
      <ComboboxInput placeholder="Select a framework" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(framework) => (
            <ComboboxItem key={framework.value} value={framework}>
              {framework.label}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
```

## Multiple Selection

Use `multiple` with chips for multi-select behavior.

```tsx showLineNumbers
import * as React from "react"

import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from "@/components/ui/combobox"

const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]

export function ExampleComboboxMultiple() {
  const [value, setValue] = React.useState<string[]>([])

  return (
    <Combobox
      items={frameworks}
      multiple
      value={value}
      onValueChange={setValue}
    >
      <ComboboxChips>
        <ComboboxValue>
          {value.map((item) => (
            <ComboboxChip key={item}>{item}</ComboboxChip>
          ))}
        </ComboboxValue>
        <ComboboxChipsInput placeholder="Add framework" />
      </ComboboxChips>
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
```

## Basic

A simple combobox with a list of frameworks.

> Example `combobox-basic` (base-nova) — `src/examples/combobox-basic.tsx`, `static/combobox-basic.html`

## Multiple

A combobox with multiple selection using `multiple` and `ComboboxChips`.

> Example `combobox-multiple` (base-nova) — `src/examples/combobox-multiple.tsx`, `static/combobox-multiple.html`

## Clear Button

Use the `showClear` prop to show a clear button.

> Example `combobox-clear` (base-nova) — `src/examples/combobox-clear.tsx`, `static/combobox-clear.html`

## Groups

Use `ComboboxGroup` and `ComboboxSeparator` to group items.

> Example `combobox-groups` (base-nova) — `src/examples/combobox-groups.tsx`, `static/combobox-groups.html`

## Custom Items

You can render a custom component inside `ComboboxItem`.

> Example `combobox-custom` (base-nova) — `src/examples/combobox-custom.tsx`, `static/combobox-custom.html`

## Invalid

Use the `aria-invalid` prop to make the combobox invalid.

> Example `combobox-invalid` (base-nova) — `src/examples/combobox-invalid.tsx`, `static/combobox-invalid.html`

## Disabled

Use the `disabled` prop to disable the combobox.

> Example `combobox-disabled` (base-nova) — `src/examples/combobox-disabled.tsx`, `static/combobox-disabled.html`

## Auto Highlight

Use the `autoHighlight` prop to automatically highlight the first item on filter.

> Example `combobox-auto-highlight` (base-nova) — `src/examples/combobox-auto-highlight.tsx`, `static/combobox-auto-highlight.html`

## Popup

You can trigger the combobox from a button or any other component by using the `render` prop. Move the `ComboboxInput` inside the `ComboboxContent`.

> Example `combobox-popup` (base-nova) — `src/examples/combobox-popup.tsx`, `static/combobox-popup.html`

## Input Group

You can add an addon to the combobox by using the `InputGroupAddon` component inside the `ComboboxInput`.

> Example `combobox-input-group` — `src/examples/combobox-input-group.tsx`, `static/combobox-input-group.html`

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `combobox-rtl` — `src/examples/combobox-rtl.tsx`, `static/combobox-rtl.html`

## API Reference

See the [Base UI](https://base-ui.com/react/components/combobox#api-reference) documentation for more information.

## Files

- `src/ui/combobox.tsx` — the ui file as the registry installs it
- `src/examples/combobox-demo.tsx`
- `src/examples/combobox-basic.tsx`
- `src/examples/combobox-multiple.tsx`
- `src/examples/combobox-clear.tsx`
- `src/examples/combobox-groups.tsx`
- `src/examples/combobox-custom.tsx`
- `src/examples/combobox-invalid.tsx`
- `src/examples/combobox-disabled.tsx`
- `src/examples/combobox-auto-highlight.tsx`
- `src/examples/combobox-popup.tsx`
- `src/examples/combobox-input-group.tsx`
- `src/examples/combobox-auto-highlight.tsx`
- `src/examples/combobox-basic.tsx`
- `src/examples/combobox-clear.tsx`
- `src/examples/combobox-custom.tsx`
- `src/examples/combobox-demo.tsx`
- `src/examples/combobox-disabled.tsx`
- `src/examples/combobox-groups.tsx`
- `src/examples/combobox-invalid.tsx`
- `src/examples/combobox-multiple.tsx`
- `src/examples/combobox-popup.tsx`
- `src/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/combobox
