# Radio Group

A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.

## Classification

- Category: `input` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `upstream/ui/radio-group.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.
- Provides: radio-group with 6 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: radio-group-demo, radio-group-description, radio-group-choice-card, radio-group-fieldset, radio-group-disabled, radio-group-invalid
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add radio-group`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/radio-group.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `upstream/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `radio-group-demo` — `upstream/examples/radio-group-demo.tsx`, `static/radio-group-demo.html`

## Installation

```bash
npx shadcn@latest add radio-group
```

- Install the following dependencies:

```bash
npm install radix-ui
```

- Copy and paste the following code into your project.

Source: `components/ui/radio-group.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx showLineNumbers
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
```

```tsx showLineNumbers
<RadioGroup defaultValue="option-one">
  <div className="flex items-center gap-3">
    <RadioGroupItem value="option-one" id="option-one" />
    <Label htmlFor="option-one">Option One</Label>
  </div>
  <div className="flex items-center gap-3">
    <RadioGroupItem value="option-two" id="option-two" />
    <Label htmlFor="option-two">Option Two</Label>
  </div>
</RadioGroup>
```

## Composition

Use the following composition to build a `RadioGroup`:

```text
RadioGroup
├── RadioGroupItem
└── RadioGroupItem
```

## Description

Radio group items with a description using the `Field` component.

> Example `radio-group-description` — `upstream/examples/radio-group-description.tsx`, `static/radio-group-description.html`

## Choice Card

Use `FieldLabel` to wrap the entire `Field` for a clickable card-style selection.

> Example `radio-group-choice-card` — `upstream/examples/radio-group-choice-card.tsx`, `static/radio-group-choice-card.html`

## Fieldset

Use `FieldSet` and `FieldLegend` to group radio items with a label and description.

> Example `radio-group-fieldset` — `upstream/examples/radio-group-fieldset.tsx`, `static/radio-group-fieldset.html`

## Disabled

Use the `disabled` prop on `RadioGroupItem` to disable individual items.

> Example `radio-group-disabled` — `upstream/examples/radio-group-disabled.tsx`, `static/radio-group-disabled.html`

## Invalid

Use `aria-invalid` on `RadioGroupItem` and `data-invalid` on `Field` to show validation errors.

> Example `radio-group-invalid` — `upstream/examples/radio-group-invalid.tsx`, `static/radio-group-invalid.html`

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `radio-group-rtl` — `upstream/examples/radio-group-rtl.tsx`, `static/radio-group-rtl.html`

## API Reference

See the [Radix UI Radio Group](https://www.radix-ui.com/docs/primitives/components/radio-group#api-reference) documentation.

## Files

- `upstream/ui/radio-group.tsx` — the ui file as the registry installs it
- `upstream/examples/radio-group-demo.tsx`
- `upstream/examples/radio-group-description.tsx`
- `upstream/examples/radio-group-choice-card.tsx`
- `upstream/examples/radio-group-fieldset.tsx`
- `upstream/examples/radio-group-disabled.tsx`
- `upstream/examples/radio-group-invalid.tsx`
- `upstream/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/radio-group
