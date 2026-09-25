# Dialog

A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.

## Classification

- Category: `overlay` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `upstream/ui/dialog.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.
- Provides: dialog with 5 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: dialog-demo, dialog-close-button, dialog-no-close-button, dialog-sticky-footer, dialog-scrollable-content
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add dialog`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/dialog.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `upstream/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `dialog-demo` — `upstream/examples/dialog-demo.tsx`, `static/dialog-demo.html`

## Installation

```bash
npx shadcn@latest add dialog
```

- Install the following dependencies:

```bash
npm install radix-ui
```

- Copy and paste the following code into your project.

Source: `components/ui/dialog.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx showLineNumbers
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
```

```tsx showLineNumbers
<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
```

## Composition

Use the following composition to build a `Dialog`:

```text
Dialog
├── DialogTrigger
└── DialogContent
    ├── DialogHeader
    │   ├── DialogTitle
    │   └── DialogDescription
    └── DialogFooter
```

## Custom Close Button

Replace the default close control with your own button.

> Example `dialog-close-button` — `upstream/examples/dialog-close-button.tsx`, `static/dialog-close-button.html`

## No Close Button

Use `showCloseButton={false}` to hide the close button.

> Example `dialog-no-close-button` — `upstream/examples/dialog-no-close-button.tsx`, `static/dialog-no-close-button.html`

## Sticky Footer

Keep actions visible while the content scrolls.

> Example `dialog-sticky-footer` — `upstream/examples/dialog-sticky-footer.tsx`, `static/dialog-sticky-footer.html`

## Scrollable Content

Long content can scroll while the header stays in view.

> Example `dialog-scrollable-content` — `upstream/examples/dialog-scrollable-content.tsx`, `static/dialog-scrollable-content.html`

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `dialog-rtl` — `upstream/examples/dialog-rtl.tsx`, `static/dialog-rtl.html`

## API Reference

See the [Radix UI](https://www.radix-ui.com/docs/primitives/components/dialog#api-reference) documentation for more information.

## Files

- `upstream/ui/dialog.tsx` — the ui file as the registry installs it
- `upstream/examples/dialog-demo.tsx`
- `upstream/examples/dialog-close-button.tsx`
- `upstream/examples/dialog-no-close-button.tsx`
- `upstream/examples/dialog-sticky-footer.tsx`
- `upstream/examples/dialog-scrollable-content.tsx`
- `upstream/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/dialog
