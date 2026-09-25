# Separator

Visually or semantically separates content.

## Classification

- Category: `layout` — structural
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `upstream/ui/separator.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: Visually or semantically separates content.
- Provides: separator with 4 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: separator-demo, separator-vertical, separator-menu, separator-list
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add separator`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/separator.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `upstream/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `separator-demo` — `upstream/examples/separator-demo.tsx`, `static/separator-demo.html`

## Installation

```bash
npx shadcn@latest add separator
```

- Install the following dependencies:

```bash
npm install radix-ui
```

- Copy and paste the following code into your project.

Source: `components/ui/separator.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx showLineNumbers
import { Separator } from "@/components/ui/separator"
```

```tsx showLineNumbers
<Separator />
```

## Vertical

Use `orientation="vertical"` for a vertical separator.

> Example `separator-vertical` — `upstream/examples/separator-vertical.tsx`, `static/separator-vertical.html`

## Menu

Vertical separators between menu items with descriptions.

> Example `separator-menu` — `upstream/examples/separator-menu.tsx`, `static/separator-menu.html`

## List

Horizontal separators between list items.

> Example `separator-list` — `upstream/examples/separator-list.tsx`, `static/separator-list.html`

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `separator-rtl` — `upstream/examples/separator-rtl.tsx`, `static/separator-rtl.html`

## API Reference

See the [Radix UI Separator](https://www.radix-ui.com/docs/primitives/components/separator#api-reference) documentation.

## Files

- `upstream/ui/separator.tsx` — the ui file as the registry installs it
- `upstream/examples/separator-demo.tsx`
- `upstream/examples/separator-vertical.tsx`
- `upstream/examples/separator-menu.tsx`
- `upstream/examples/separator-list.tsx`
- `upstream/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/separator
