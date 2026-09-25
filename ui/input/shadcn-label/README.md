# Label

Renders an accessible label associated with controls.

## Classification

- Category: `input` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `upstream/ui/label.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: Renders an accessible label associated with controls.
- Provides: label with 2 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: label-demo, field-demo
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add label`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/label.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `upstream/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `label-demo` — `upstream/examples/label-demo.tsx`, `static/label-demo.html`

> Note:
  For form fields, use the [Field](/docs/components/radix/field) component which
  includes built-in label, description, and error handling.

## Installation

```bash
npx shadcn@latest add label
```

- Install the following dependencies:

```bash
npm install radix-ui
```

- Copy and paste the following code into your project.

Source: `components/ui/label.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx
import { Label } from "@/components/ui/label"
```

```tsx
<Label htmlFor="email">Your email address</Label>
```

## Label in Field

For form fields, use the [Field](/docs/components/radix/field) component which
includes built-in `FieldLabel`, `FieldDescription`, and `FieldError` components.

```tsx
<Field>
  <FieldLabel htmlFor="email">Your email address</FieldLabel>
  <Input id="email" />
</Field>
```

> Example `field-demo` — `upstream/examples/field-demo.tsx`, `static/field-demo.html`

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `label-rtl` — `upstream/examples/label-rtl.tsx`, `static/label-rtl.html`

## API Reference

See the [Radix UI Label](https://www.radix-ui.com/docs/primitives/components/label#api-reference) documentation for more information.

## Files

- `upstream/ui/label.tsx` — the ui file as the registry installs it
- `upstream/examples/label-demo.tsx`
- `upstream/examples/field-demo.tsx`
- `upstream/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/label
