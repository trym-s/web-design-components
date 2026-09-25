# Drawer

A drawer component for React.

## Classification

- Category: `overlay` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `src/ui/drawer.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: A drawer component for React.
- Provides: drawer with 4 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: drawer-demo, drawer-scrollable-content, drawer-sides, drawer-dialog
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add drawer`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/drawer.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `src/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `drawer-demo` — `src/examples/drawer-demo.tsx`, `static/drawer-demo.html`

## About

Drawer is built on top of [Vaul](https://github.com/emilkowalski/vaul) by [emilkowalski](https://twitter.com/emilkowalski).

## Installation

```bash
npx shadcn@latest add drawer
```

- Install the following dependencies:

```bash
npm install vaul
```

- Copy and paste the following code into your project.

Source: `components/ui/drawer.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx showLineNumbers
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
```

```tsx showLineNumbers
<Drawer>
  <DrawerTrigger>Open</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Are you absolutely sure?</DrawerTitle>
      <DrawerDescription>This action cannot be undone.</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <Button>Submit</Button>
      <DrawerClose>
        <Button variant="outline">Cancel</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```

## Composition

Use the following composition to build a `Drawer`:

```text
Drawer
├── DrawerTrigger
└── DrawerContent
    ├── DrawerHeader
    │   ├── DrawerTitle
    │   └── DrawerDescription
    └── DrawerFooter
```

## Scrollable Content

Keep actions visible while the content scrolls.

> Example `drawer-scrollable-content` — `src/examples/drawer-scrollable-content.tsx`, `static/drawer-scrollable-content.html`

## Sides

Use the `direction` prop to set the side of the drawer. Available options are `top`, `right`, `bottom`, and `left`.

> Example `drawer-sides` — `src/examples/drawer-sides.tsx`, `static/drawer-sides.html`

## Responsive Dialog

You can combine the `Dialog` and `Drawer` components to create a responsive dialog. This renders a `Dialog` component on desktop and a `Drawer` on mobile.

> Example `drawer-dialog` — `src/examples/drawer-dialog.tsx`, `static/drawer-dialog.html`

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `drawer-rtl` — `src/examples/drawer-rtl.tsx`, `static/drawer-rtl.html`

## API Reference

See the [Vaul documentation](https://vaul.emilkowal.ski/getting-started) for the full API reference.

## Files

- `src/ui/drawer.tsx` — the ui file as the registry installs it
- `src/examples/drawer-demo.tsx`
- `src/examples/drawer-scrollable-content.tsx`
- `src/examples/drawer-sides.tsx`
- `src/examples/drawer-dialog.tsx`
- `src/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/drawer
