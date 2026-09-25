# Select

Displays a list of options for the user to pick from—triggered by a button.

## Classification

- Category: `input` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `upstream/ui/select.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: Displays a list of options for the user to pick from—triggered by a button.
- Provides: select with 6 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: select-demo, select-align-item, select-groups, select-scrollable, select-disabled, select-invalid
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add select`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/select.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `upstream/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `select-demo` — `upstream/examples/select-demo.tsx`, `static/select-demo.html`

## Installation

```bash
npx shadcn@latest add select
```

- Install the following dependencies:

```bash
npm install radix-ui
```

- Copy and paste the following code into your project.

Source: `components/ui/select.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx showLineNumbers
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
```

```tsx showLineNumbers
<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Theme" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectItem value="light">Light</SelectItem>
      <SelectItem value="dark">Dark</SelectItem>
      <SelectItem value="system">System</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```

## Composition

Use the following composition to build a `Select`:

```text
Select
├── SelectTrigger
│   └── SelectValue
└── SelectContent
    ├── SelectGroup
    │   ├── SelectLabel
    │   ├── SelectItem
    │   └── SelectItem
    ├── SelectSeparator
    └── SelectGroup
        ├── SelectLabel
        ├── SelectItem
        └── SelectItem
```

## Align Item With Trigger

Use the `position` prop on `SelectContent` to control alignment. When `position="item-aligned"` (default), the popup positions so the selected item appears over the trigger. When `position="popper"`, the popup aligns to the trigger edge.

> Example `select-align-item` — `upstream/examples/select-align-item.tsx`, `static/select-align-item.html`

## Groups

Use `SelectGroup`, `SelectLabel`, and `SelectSeparator` to organize items.

> Example `select-groups` — `upstream/examples/select-groups.tsx`, `static/select-groups.html`

## Scrollable

A select with many items that scrolls.

> Example `select-scrollable` — `upstream/examples/select-scrollable.tsx`, `static/select-scrollable.html`

## Disabled

> Example `select-disabled` — `upstream/examples/select-disabled.tsx`, `static/select-disabled.html`

## Invalid

Add the `data-invalid` attribute to the `Field` component and the `aria-invalid` attribute to the `SelectTrigger` component to show an error state.

```tsx showLineNumbers /data-invalid/ /aria-invalid/
<Field data-invalid>
  <FieldLabel>Fruit</FieldLabel>
  <SelectTrigger aria-invalid>
    <SelectValue />
  </SelectTrigger>
</Field>
```

> Example `select-invalid` — `upstream/examples/select-invalid.tsx`, `static/select-invalid.html`

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `select-rtl` — `upstream/examples/select-rtl.tsx`, `static/select-rtl.html`

## API Reference

See the [Radix UI Select](https://www.radix-ui.com/docs/primitives/components/select#api-reference) documentation.

## Files

- `upstream/ui/select.tsx` — the ui file as the registry installs it
- `upstream/examples/select-demo.tsx`
- `upstream/examples/select-align-item.tsx`
- `upstream/examples/select-groups.tsx`
- `upstream/examples/select-scrollable.tsx`
- `upstream/examples/select-disabled.tsx`
- `upstream/examples/select-invalid.tsx`
- `upstream/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/select
