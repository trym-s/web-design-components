# Alert Dialog

A modal dialog that interrupts the user with important content and expects a response.

## Classification

- Category: `overlay` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `src/ui/alert-dialog.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: A modal dialog that interrupts the user with important content and expects a response.
- Provides: alert-dialog with 6 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: alert-dialog-demo, alert-dialog-basic, alert-dialog-small, alert-dialog-media, alert-dialog-small-media, alert-dialog-destructive
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add alert-dialog`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/alert-dialog.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `src/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `alert-dialog-demo` — `src/examples/alert-dialog-demo.tsx`, `static/alert-dialog-demo.html`

## Installation

```bash
npx shadcn@latest add alert-dialog
```

- Install the following dependencies:

```bash
npm install radix-ui
```

- Copy and paste the following code into your project.

Source: `components/ui/alert-dialog.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx showLineNumbers
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
```

```tsx showLineNumbers
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline">Show Dialog</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

## Composition

Use the following composition to build an `AlertDialog`:

```text
AlertDialog
├── AlertDialogTrigger
└── AlertDialogContent
    ├── AlertDialogHeader
    │   ├── AlertDialogMedia
    │   ├── AlertDialogTitle
    │   └── AlertDialogDescription
    └── AlertDialogFooter
        ├── AlertDialogCancel
        └── AlertDialogAction
```

## Basic

A basic alert dialog with a title, description, and cancel and continue buttons.

> Example `alert-dialog-basic` — `src/examples/alert-dialog-basic.tsx`, `static/alert-dialog-basic.html`

## Small

Use the `size="sm"` prop to make the alert dialog smaller.

> Example `alert-dialog-small` — `src/examples/alert-dialog-small.tsx`, `static/alert-dialog-small.html`

## Media

Use the `AlertDialogMedia` component to add a media element such as an icon or image to the alert dialog.

> Example `alert-dialog-media` — `src/examples/alert-dialog-media.tsx`, `static/alert-dialog-media.html`

## Small with Media

Use the `size="sm"` prop to make the alert dialog smaller and the `AlertDialogMedia` component to add a media element such as an icon or image to the alert dialog.

> Example `alert-dialog-small-media` — `src/examples/alert-dialog-small-media.tsx`, `static/alert-dialog-small-media.html`

## Destructive

Use the `AlertDialogAction` component to add a destructive action button to the alert dialog.

> Example `alert-dialog-destructive` — `src/examples/alert-dialog-destructive.tsx`, `static/alert-dialog-destructive.html`

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `alert-dialog-rtl` — `src/examples/alert-dialog-rtl.tsx`, `static/alert-dialog-rtl.html`

## API Reference

### size

Use the `size` prop on the `AlertDialogContent` component to control the size of the alert dialog. It accepts the following values:

| Prop   | Type                | Default     |
| ------ | ------------------- | ----------- |
| `size` | `"default" \| "sm"` | `"default"` |

For more information about the other components and their props, see the [Radix UI documentation](https://www.radix-ui.com/primitives/docs/components/alert-dialog#api-reference).

## Files

- `src/ui/alert-dialog.tsx` — the ui file as the registry installs it
- `src/examples/alert-dialog-demo.tsx`
- `src/examples/alert-dialog-basic.tsx`
- `src/examples/alert-dialog-small.tsx`
- `src/examples/alert-dialog-media.tsx`
- `src/examples/alert-dialog-small-media.tsx`
- `src/examples/alert-dialog-destructive.tsx`
- `src/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/alert-dialog
