# Spinner

An indicator that can be used to show a loading state.

## Classification

- Category: `notification` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `src/ui/spinner.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: An indicator that can be used to show a loading state.
- Provides: spinner with 7 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: spinner-demo, spinner-custom, spinner-size, spinner-button, spinner-badge, spinner-input-group, spinner-empty
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add spinner`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/spinner.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `src/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `spinner-demo` — `src/examples/spinner-demo.tsx`, `static/spinner-demo.html`

## Installation

```bash
npx shadcn@latest add spinner
```

- Copy and paste the following code into your project.

Source: `components/ui/spinner.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx
import { Spinner } from "@/components/ui/spinner"
```

```tsx
<Spinner />
```

## Customization

You can replace the default spinner icon with any other icon by editing the `Spinner` component.

> Example `spinner-custom` — `src/examples/spinner-custom.tsx`, `static/spinner-custom.html`

```tsx showLineNumbers title="components/ui/spinner.tsx"
import { cn } from "cn"
import { LoaderIcon } from "lucide-react"

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}

export { Spinner }
```

## Size

Use the `size-*` utility class to change the size of the spinner.

> Example `spinner-size` — `src/examples/spinner-size.tsx`, `static/spinner-size.html`

## Button

Add a spinner to a button to indicate a loading state. Place the `<Spinner />` before the label with `data-icon="inline-start"` for a start position, or after the label with `data-icon="inline-end"` for an end position.

> Example `spinner-button` — `src/examples/spinner-button.tsx`, `static/spinner-button.html`

## Badge

Add a spinner to a badge to indicate a loading state. Place the `<Spinner />` before the label with `data-icon="inline-start"` for a start position, or after the label with `data-icon="inline-end"` for an end position.

> Example `spinner-badge` — `src/examples/spinner-badge.tsx`, `static/spinner-badge.html`

## Input Group

> Example `spinner-input-group` — `src/examples/spinner-input-group.tsx`, `static/spinner-input-group.html`

## Empty

> Example `spinner-empty` — `src/examples/spinner-empty.tsx`, `static/spinner-empty.html`

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `spinner-rtl` — `src/examples/spinner-rtl.tsx`, `static/spinner-rtl.html`

## Files

- `src/ui/spinner.tsx` — the ui file as the registry installs it
- `src/examples/spinner-demo.tsx`
- `src/examples/spinner-custom.tsx`
- `src/examples/spinner-size.tsx`
- `src/examples/spinner-button.tsx`
- `src/examples/spinner-badge.tsx`
- `src/examples/spinner-input-group.tsx`
- `src/examples/spinner-empty.tsx`
- `src/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/spinner
