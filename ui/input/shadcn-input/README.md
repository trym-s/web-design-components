# Input

A text input component for forms and user data entry with built-in styling and accessibility features.

## Classification

- Category: `input` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `src/ui/input.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: A text input component for forms and user data entry with built-in styling and accessibility features.
- Provides: input with 14 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: input-demo, input-basic, input-field, input-fieldgroup, input-disabled, input-invalid, input-file, input-inline, input-grid, input-required, input-badge, input-input-group, input-button-group, input-form
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add input`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/input.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `src/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `input-demo` — `src/examples/input-demo.tsx`, `static/input-demo.html`

## Installation

```bash
npx shadcn@latest add input
```

- Copy and paste the following code into your project.

Source: `components/ui/input.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx
import { Input } from "@/components/ui/input"
```

```tsx
<Input />
```

## Basic

> Example `input-basic` — `src/examples/input-basic.tsx`, `static/input-basic.html`

## Field

Use `Field`, `FieldLabel`, and `FieldDescription` to create an input with a
label and description.

> Example `input-field` — `src/examples/input-field.tsx`, `static/input-field.html`

## Field Group

Use `FieldGroup` to show multiple `Field` blocks and to build forms.

> Example `input-fieldgroup` — `src/examples/input-fieldgroup.tsx`, `static/input-fieldgroup.html`

## Disabled

Use the `disabled` prop to disable the input. To style the disabled state, add the `data-disabled` attribute to the `Field` component.

> Example `input-disabled` — `src/examples/input-disabled.tsx`, `static/input-disabled.html`

## Invalid

Use the `aria-invalid` prop to mark the input as invalid. To style the invalid state, add the `data-invalid` attribute to the `Field` component.

> Example `input-invalid` — `src/examples/input-invalid.tsx`, `static/input-invalid.html`

## File

Use the `type="file"` prop to create a file input.

> Example `input-file` — `src/examples/input-file.tsx`, `static/input-file.html`

## Inline

Use `Field` with `orientation="horizontal"` to create an inline input.
Pair with `Button` to create a search input with a button.

> Example `input-inline` — `src/examples/input-inline.tsx`, `static/input-inline.html`

## Grid

Use a grid layout to place multiple inputs side by side.

> Example `input-grid` — `src/examples/input-grid.tsx`, `static/input-grid.html`

## Required

Use the `required` attribute to indicate required inputs.

> Example `input-required` — `src/examples/input-required.tsx`, `static/input-required.html`

## Badge

Use `Badge` in the label to highlight a recommended field.

> Example `input-badge` — `src/examples/input-badge.tsx`, `static/input-badge.html`

## Input Group

To add icons, text, or buttons inside an input, use the `InputGroup` component. See the [Input Group](/docs/components/input-group) component for more examples.

> Example `input-input-group` — `src/examples/input-input-group.tsx`, `static/input-input-group.html`

## Button Group

To add buttons to an input, use the `ButtonGroup` component. See the [Button Group](/docs/components/button-group) component for more examples.

> Example `input-button-group` — `src/examples/input-button-group.tsx`, `static/input-button-group.html`

## Form

A full form example with multiple inputs, a select, and a button.

> Example `input-form` — `src/examples/input-form.tsx`, `static/input-form.html`

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `input-rtl` — `src/examples/input-rtl.tsx`, `static/input-rtl.html`

## Files

- `src/ui/input.tsx` — the ui file as the registry installs it
- `src/examples/input-demo.tsx`
- `src/examples/input-basic.tsx`
- `src/examples/input-field.tsx`
- `src/examples/input-fieldgroup.tsx`
- `src/examples/input-disabled.tsx`
- `src/examples/input-invalid.tsx`
- `src/examples/input-file.tsx`
- `src/examples/input-inline.tsx`
- `src/examples/input-grid.tsx`
- `src/examples/input-required.tsx`
- `src/examples/input-badge.tsx`
- `src/examples/input-input-group.tsx`
- `src/examples/input-button-group.tsx`
- `src/examples/input-form.tsx`
- `src/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/input
