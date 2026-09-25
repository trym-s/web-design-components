# Tooltip

A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.

## Classification

- Category: `overlay` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `upstream/ui/tooltip.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.
- Provides: tooltip with 4 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: tooltip-demo, tooltip-sides, tooltip-keyboard, tooltip-disabled
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add tooltip`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/tooltip.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `upstream/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `tooltip-demo` — `upstream/examples/tooltip-demo.tsx`, `static/tooltip-demo.html`

## Installation

- Run the following command:

```bash
npx shadcn@latest add tooltip
```

- Add the `TooltipProvider` to the root of your app.

```tsx title="app/layout.tsx" showLineNumbers {1,7}
import { TooltipProvider } from "@/components/ui/tooltip"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  )
}
```

- Install the following dependencies:

```bash
npm install radix-ui
```

- Copy and paste the following code into your project.

Source: `components/ui/tooltip.tsx`

- Update the import paths to match your project setup.

- Add the `TooltipProvider` to the root of your app.

```tsx title="app/layout.tsx" showLineNumbers {1,7}
import { TooltipProvider } from "@/components/ui/tooltip"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  )
}
```

## Usage

```tsx showLineNumbers
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
```

```tsx showLineNumbers
<Tooltip>
  <TooltipTrigger>Hover</TooltipTrigger>
  <TooltipContent>
    <p>Add to library</p>
  </TooltipContent>
</Tooltip>
```

## Composition

Use the following composition to build a `Tooltip`:

```text
Tooltip
├── TooltipTrigger
└── TooltipContent
```

## Side

Use the `side` prop to change the position of the tooltip.

> Example `tooltip-sides` — `upstream/examples/tooltip-sides.tsx`, `static/tooltip-sides.html`

## With Keyboard Shortcut

> Example `tooltip-keyboard` — `upstream/examples/tooltip-keyboard.tsx`, `static/tooltip-keyboard.html`

## Disabled Button

Show a tooltip on a disabled button by wrapping it with a span.

> Example `tooltip-disabled` — `upstream/examples/tooltip-disabled.tsx`, `static/tooltip-disabled.html`

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `tooltip-rtl` — `upstream/examples/tooltip-rtl.tsx`, `static/tooltip-rtl.html`

## API Reference

See the [Radix Tooltip](https://www.radix-ui.com/docs/primitives/components/tooltip#api-reference) documentation.

## Files

- `upstream/ui/tooltip.tsx` — the ui file as the registry installs it
- `upstream/examples/tooltip-demo.tsx`
- `upstream/examples/tooltip-sides.tsx`
- `upstream/examples/tooltip-keyboard.tsx`
- `upstream/examples/tooltip-disabled.tsx`
- `upstream/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/tooltip
