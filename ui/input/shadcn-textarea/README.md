# Textarea

Displays a form textarea or a component that looks like a textarea.

## Classification

- Category: `input` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `src/ui/textarea.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: Displays a form textarea or a component that looks like a textarea.
- Provides: textarea with 5 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: textarea-demo, textarea-field, textarea-disabled, textarea-invalid, textarea-button
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add textarea`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/textarea.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `src/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `textarea-demo` — `src/examples/textarea-demo.tsx`, `static/textarea-demo.html`

## Installation

```bash
npx shadcn@latest add textarea
```

- Copy and paste the following code into your project.

Source: `components/ui/textarea.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx
import { Textarea } from "@/components/ui/textarea"
```

```tsx
<Textarea />
```

## Field

Use `Field`, `FieldLabel`, and `FieldDescription` to create a textarea with a label and description.

> Example `textarea-field` — `src/examples/textarea-field.tsx`, `static/textarea-field.html`

## Disabled

Use the `disabled` prop to disable the textarea. To style the disabled state, add the `data-disabled` attribute to the `Field` component.

> Example `textarea-disabled` — `src/examples/textarea-disabled.tsx`, `static/textarea-disabled.html`

## Invalid

Use the `aria-invalid` prop to mark the textarea as invalid. To style the invalid state, add the `data-invalid` attribute to the `Field` component.

> Example `textarea-invalid` — `src/examples/textarea-invalid.tsx`, `static/textarea-invalid.html`

## Button

Pair with `Button` to create a textarea with a submit button.

> Example `textarea-button` — `src/examples/textarea-button.tsx`, `static/textarea-button.html`

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `textarea-rtl` — `src/examples/textarea-rtl.tsx`, `static/textarea-rtl.html`

## Files

- `src/ui/textarea.tsx` — the ui file as the registry installs it
- `src/examples/textarea-demo.tsx`
- `src/examples/textarea-field.tsx`
- `src/examples/textarea-disabled.tsx`
- `src/examples/textarea-invalid.tsx`
- `src/examples/textarea-button.tsx`
- `src/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/textarea
