# Collapsible

An interactive component which expands/collapses a panel.

## Classification

- Category: `navigation` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `src/ui/collapsible.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: An interactive component which expands/collapses a panel.
- Provides: collapsible with 4 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: collapsible-demo, collapsible-basic, collapsible-settings, collapsible-file-tree
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add collapsible`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/collapsible.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `src/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `collapsible-demo` — `src/examples/collapsible-demo.tsx`, `static/collapsible-demo.html`

## Installation

```bash
npx shadcn@latest add collapsible
```

- Install the following dependencies:

```bash
npm install radix-ui
```

- Copy and paste the following code into your project.

Source: `components/ui/collapsible.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx showLineNumbers
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
```

```tsx showLineNumbers
<Collapsible>
  <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
  <CollapsibleContent>
    Yes. Free to use for personal and commercial projects. No attribution
    required.
  </CollapsibleContent>
</Collapsible>
```

## Composition

Use the following composition to build a `Collapsible`:

```text
Collapsible
├── CollapsibleTrigger
└── CollapsibleContent
```

## Controlled State

Use the `open` and `onOpenChange` props to control the state.

```tsx showLineNumbers
import * as React from "react"

export function Example() {
  const [open, setOpen] = React.useState(false)

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger>Toggle</CollapsibleTrigger>
      <CollapsibleContent>Content</CollapsibleContent>
    </Collapsible>
  )
}
```

## Basic

> Example `collapsible-basic` — `src/examples/collapsible-basic.tsx`, `static/collapsible-basic.html`

## Settings Panel

Use a trigger button to reveal additional settings.

> Example `collapsible-settings` — `src/examples/collapsible-settings.tsx`, `static/collapsible-settings.html`

## File Tree

Use nested collapsibles to build a file tree.

> Example `collapsible-file-tree` — `src/examples/collapsible-file-tree.tsx`, `static/collapsible-file-tree.html`

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `collapsible-rtl` — `src/examples/collapsible-rtl.tsx`, `static/collapsible-rtl.html`

## API Reference

See the [Radix UI](https://www.radix-ui.com/docs/primitives/components/collapsible#api-reference) documentation for more information.

## Files

- `src/ui/collapsible.tsx` — the ui file as the registry installs it
- `src/examples/collapsible-demo.tsx`
- `src/examples/collapsible-basic.tsx`
- `src/examples/collapsible-settings.tsx`
- `src/examples/collapsible-file-tree.tsx`
- `src/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/collapsible
