# Sonner

An opinionated toast component for React.

## Classification

- Category: `notification` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `upstream/ui/sonner.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: An opinionated toast component for React.
- Provides: sonner with 4 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: sonner-demo, sonner-types, sonner-description, sonner-position
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add sonner`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/sonner.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `upstream/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `sonner-demo` — `upstream/examples/sonner-demo.tsx`, `static/sonner-demo.html`

## About

Sonner is built and maintained by [emilkowalski](https://twitter.com/emilkowalski).

## Installation

- Run the following command:

```bash
npx shadcn@latest add sonner
```

- Add the Toaster component

```tsx title="app/layout.tsx" {1,9} showLineNumbers
import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  )
}
```

- Install the following dependencies:

```bash
npm install sonner next-themes
```

- Copy and paste the following code into your project.

Source: `components/ui/sonner.tsx`

- Add the Toaster component

```tsx showLineNumbers title="app/layout.tsx" {1,8}
import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <Toaster />
        <main>{children}</main>
      </body>
    </html>
  )
}
```

## Usage

```tsx
import { toast } from "sonner"
```

```tsx
toast("Event has been created.")
```

## Types

> Example `sonner-types` — `upstream/examples/sonner-types.tsx`, `static/sonner-types.html`

## Description

> Example `sonner-description` — `upstream/examples/sonner-description.tsx`, `static/sonner-description.html`

## Position

Use the `position` prop to change the position of the toast.

> Example `sonner-position` — `upstream/examples/sonner-position.tsx`, `static/sonner-position.html`

## API Reference

See the [Sonner API Reference](https://sonner.emilkowal.ski/getting-started) for more information.

## Files

- `upstream/ui/sonner.tsx` — the ui file as the registry installs it
- `upstream/examples/sonner-demo.tsx`
- `upstream/examples/sonner-types.tsx`
- `upstream/examples/sonner-description.tsx`
- `upstream/examples/sonner-position.tsx`
- `upstream/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/sonner
