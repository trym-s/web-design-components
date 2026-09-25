# Accordion

A vertically stacked set of interactive headings that each reveal a section of content.

## Classification

- Category: `navigation` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `src/ui/accordion.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: A vertically stacked set of interactive headings that each reveal a section of content.
- Provides: accordion with 6 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: accordion-demo, accordion-basic, accordion-multiple, accordion-disabled, accordion-borders, accordion-card
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add accordion`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/accordion.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `src/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `accordion-demo` — `src/examples/accordion-demo.tsx`, `static/accordion-demo.html`

## Installation

```bash
npx shadcn@latest add accordion
```

- Install the following dependencies:

```bash
npm install radix-ui
```

- Copy and paste the following code into your project.

Source: `components/ui/accordion.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx showLineNumbers
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
```

```tsx showLineNumbers
<Accordion type="single" collapsible defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

## Composition

Use the following composition to build an `Accordion`:

```text
Accordion
├── AccordionItem
│   ├── AccordionTrigger
│   └── AccordionContent
└── AccordionItem
    ├── AccordionTrigger
    └── AccordionContent
```

## Basic

A basic accordion that shows one item at a time. The first item is open by default.

> Example `accordion-basic` — `src/examples/accordion-basic.tsx`, `static/accordion-basic.html`

## Multiple

Use `type="multiple"` to allow multiple items to be open at the same time.

> Example `accordion-multiple` — `src/examples/accordion-multiple.tsx`, `static/accordion-multiple.html`

## Disabled

Use the `disabled` prop on `AccordionItem` to disable individual items.

> Example `accordion-disabled` — `src/examples/accordion-disabled.tsx`, `static/accordion-disabled.html`

## Borders

Add `border` to the `Accordion` and `border-b last:border-b-0` to the `AccordionItem` to add borders to the items.

> Example `accordion-borders` — `src/examples/accordion-borders.tsx`, `static/accordion-borders.html`

## Card

Wrap the `Accordion` in a `Card` component.

> Example `accordion-card` — `src/examples/accordion-card.tsx`, `static/accordion-card.html`

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `accordion-rtl` — `src/examples/accordion-rtl.tsx`, `static/accordion-rtl.html`

## API Reference

See the [Radix UI](https://www.radix-ui.com/primitives/docs/components/accordion#api-reference) documentation for more information.

## Files

- `src/ui/accordion.tsx` — the ui file as the registry installs it
- `src/examples/accordion-demo.tsx`
- `src/examples/accordion-basic.tsx`
- `src/examples/accordion-multiple.tsx`
- `src/examples/accordion-disabled.tsx`
- `src/examples/accordion-borders.tsx`
- `src/examples/accordion-card.tsx`
- `src/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/accordion
