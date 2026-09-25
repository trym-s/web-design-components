# Switch

A control that allows the user to toggle between checked and not checked.

## Classification

- Category: `input` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `src/ui/switch.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: A control that allows the user to toggle between checked and not checked.
- Provides: switch with 6 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: switch-demo, switch-description, switch-choice-card, switch-disabled, switch-invalid, switch-sizes
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add switch`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/switch.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `src/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `switch-demo` — `src/examples/switch-demo.tsx`, `static/switch-demo.html`

## Installation

```bash
npx shadcn@latest add switch
```

- Install the following dependencies:

```bash
npm install radix-ui
```

- Copy and paste the following code into your project.

Source: `components/ui/switch.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx
import { Switch } from "@/components/ui/switch"
```

```tsx
<Switch />
```

## Description

> Example `switch-description` — `src/examples/switch-description.tsx`, `static/switch-description.html`

## Choice Card

Card-style selection where `FieldLabel` wraps the entire `Field` for a clickable card pattern.

> Example `switch-choice-card` — `src/examples/switch-choice-card.tsx`, `static/switch-choice-card.html`

## Disabled

Add the `disabled` prop to the `Switch` component to disable the switch. Add the `data-disabled` prop to the `Field` component for styling.

> Example `switch-disabled` — `src/examples/switch-disabled.tsx`, `static/switch-disabled.html`

## Invalid

Add the `aria-invalid` prop to the `Switch` component to indicate an invalid state. Add the `data-invalid` prop to the `Field` component for styling.

> Example `switch-invalid` — `src/examples/switch-invalid.tsx`, `static/switch-invalid.html`

## Size

Use the `size` prop to change the size of the switch.

> Example `switch-sizes` — `src/examples/switch-sizes.tsx`, `static/switch-sizes.html`

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `switch-rtl` — `src/examples/switch-rtl.tsx`, `static/switch-rtl.html`

## API Reference

See the [Radix Switch](https://www.radix-ui.com/docs/primitives/components/switch#api-reference) documentation.

## Files

- `src/ui/switch.tsx` — the ui file as the registry installs it
- `src/examples/switch-demo.tsx`
- `src/examples/switch-description.tsx`
- `src/examples/switch-choice-card.tsx`
- `src/examples/switch-disabled.tsx`
- `src/examples/switch-invalid.tsx`
- `src/examples/switch-sizes.tsx`
- `src/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/switch
