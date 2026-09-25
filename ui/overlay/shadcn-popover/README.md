# Popover

Displays rich content in a portal, triggered by a button.

## Classification

- Category: `overlay` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `src/ui/popover.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: Displays rich content in a portal, triggered by a button.
- Provides: popover with 4 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: popover-demo, popover-basic, popover-alignments, popover-form
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add popover`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/popover.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `src/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `popover-demo` — `src/examples/popover-demo.tsx`, `static/popover-demo.html`

## Installation

```bash
npx shadcn@latest add popover
```

- Install the following dependencies:

```bash
npm install radix-ui
```

- Copy and paste the following code into your project.

Source: `components/ui/popover.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx showLineNumbers
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
```

```tsx showLineNumbers
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open Popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>Title</PopoverTitle>
      <PopoverDescription>Description text here.</PopoverDescription>
    </PopoverHeader>
  </PopoverContent>
</Popover>
```

## Composition

Use the following composition to build a `Popover`:

```text
Popover
├── PopoverTrigger
└── PopoverContent
```

## Basic

A simple popover with a header, title, and description.

> Example `popover-basic` — `src/examples/popover-basic.tsx`, `static/popover-basic.html`

## Align

Use the `align` prop on `PopoverContent` to control the horizontal alignment.

> Example `popover-alignments` — `src/examples/popover-alignments.tsx`, `static/popover-alignments.html`

## With Form

A popover with form fields inside.

> Example `popover-form` — `src/examples/popover-form.tsx`, `static/popover-form.html`

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `popover-rtl` — `src/examples/popover-rtl.tsx`, `static/popover-rtl.html`

## API Reference

See the [Radix UI Popover](https://www.radix-ui.com/docs/primitives/components/popover#api-reference) documentation.

## Files

- `src/ui/popover.tsx` — the ui file as the registry installs it
- `src/examples/popover-demo.tsx`
- `src/examples/popover-basic.tsx`
- `src/examples/popover-alignments.tsx`
- `src/examples/popover-form.tsx`
- `src/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/popover
