# Sheet

Extends the Dialog component to display content that complements the main content of the screen.

## Classification

- Category: `overlay` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `src/ui/sheet.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: Extends the Dialog component to display content that complements the main content of the screen.
- Provides: sheet with 3 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: sheet-demo, sheet-side, sheet-no-close-button
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add sheet`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/sheet.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `src/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `sheet-demo` — `src/examples/sheet-demo.tsx`, `static/sheet-demo.html`

## Installation

```bash
npx shadcn@latest add sheet
```

- Install the following dependencies:

```bash
npm install radix-ui
```

- Copy and paste the following code into your project.

Source: `components/ui/sheet.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx showLineNumbers
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
```

```tsx showLineNumbers
<Sheet>
  <SheetTrigger>Open</SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Are you absolutely sure?</SheetTitle>
      <SheetDescription>This action cannot be undone.</SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>
```

## Composition

Use the following composition to build a `Sheet`:

```text
Sheet
├── SheetTrigger
└── SheetContent
    ├── SheetHeader
    │   ├── SheetTitle
    │   └── SheetDescription
    └── SheetFooter
```

## Side

Use the `side` prop on `SheetContent` to set the edge of the screen where the sheet appears. Values are `top`, `right`, `bottom`, or `left`.

> Example `sheet-side` — `src/examples/sheet-side.tsx`, `static/sheet-side.html`

## No Close Button

Use `showCloseButton={false}` on `SheetContent` to hide the close button.

> Example `sheet-no-close-button` — `src/examples/sheet-no-close-button.tsx`, `static/sheet-no-close-button.html`

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `sheet-rtl` — `src/examples/sheet-rtl.tsx`, `static/sheet-rtl.html`

## API Reference

See the [Radix UI Dialog](https://www.radix-ui.com/docs/primitives/components/dialog#api-reference) documentation.

## Files

- `src/ui/sheet.tsx` — the ui file as the registry installs it
- `src/examples/sheet-demo.tsx`
- `src/examples/sheet-side.tsx`
- `src/examples/sheet-no-close-button.tsx`
- `src/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/sheet
