# Alert

Displays a callout for user attention.

## Classification

- Category: `notification` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `src/ui/alert.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: Displays a callout for user attention.
- Provides: alert with 5 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: alert-demo, alert-basic, alert-destructive, alert-action, alert-colors
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add alert`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/alert.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `src/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `alert-demo` — `src/examples/alert-demo.tsx`, `static/alert-demo.html`

## Installation

```bash
npx shadcn@latest add alert
```

- Copy and paste the following code into your project.

Source: `components/ui/alert.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx showLineNumbers
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
```

```tsx showLineNumbers
<Alert>
  <InfoIcon />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components and dependencies to your app using the cli.
  </AlertDescription>
  <AlertAction>
    <Button variant="outline">Enable</Button>
  </AlertAction>
</Alert>
```

## Composition

Use the following composition to build an `Alert`:

```text
Alert
├── Icon
├── AlertTitle
├── AlertDescription
└── AlertAction
```

## Basic

A basic alert with an icon, title and description.

> Example `alert-basic` — `src/examples/alert-basic.tsx`, `static/alert-basic.html`

## Destructive

Use `variant="destructive"` to create a destructive alert.

> Example `alert-destructive` — `src/examples/alert-destructive.tsx`, `static/alert-destructive.html`

## Action

Use `AlertAction` to add a button or other action element to the alert.

> Example `alert-action` — `src/examples/alert-action.tsx`, `static/alert-action.html`

## Custom Colors

You can customize the alert colors by adding custom classes such as `bg-amber-50 dark:bg-amber-950` to the `Alert` component.

> Example `alert-colors` — `src/examples/alert-colors.tsx`, `static/alert-colors.html`

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `alert-rtl` — `src/examples/alert-rtl.tsx`, `static/alert-rtl.html`

## API Reference

### Alert

The `Alert` component displays a callout for user attention.

| Prop      | Type                         | Default     |
| --------- | ---------------------------- | ----------- |
| `variant` | `"default" \| "destructive"` | `"default"` |

### AlertTitle

The `AlertTitle` component displays the title of the alert.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `className` | `string` | -       |

### AlertDescription

The `AlertDescription` component displays the description or content of the alert.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `className` | `string` | -       |

### AlertAction

The `AlertAction` component displays an action element (like a button) positioned absolutely in the top-right corner of the alert.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `className` | `string` | -       |

## Files

- `src/ui/alert.tsx` — the ui file as the registry installs it
- `src/examples/alert-demo.tsx`
- `src/examples/alert-basic.tsx`
- `src/examples/alert-destructive.tsx`
- `src/examples/alert-action.tsx`
- `src/examples/alert-colors.tsx`
- `src/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/alert
