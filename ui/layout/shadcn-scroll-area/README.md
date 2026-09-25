# Scroll Area

Augments native scroll functionality for custom, cross-browser styling.

## Classification

- Category: `layout` — structural
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `src/ui/scroll-area.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: Augments native scroll functionality for custom, cross-browser styling.
- Provides: scroll-area with 2 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: scroll-area-demo, scroll-area-horizontal-demo
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add scroll-area`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/scroll-area.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `src/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `scroll-area-demo` — `src/examples/scroll-area-demo.tsx`, `static/scroll-area-demo.html`

## Installation

```bash
npx shadcn@latest add scroll-area
```

- Install the following dependencies:

```bash
npm install radix-ui
```

- Copy and paste the following code into your project.

Source: `components/ui/scroll-area.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx showLineNumbers
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
```

```tsx showLineNumbers
<ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
  Your scrollable content here.
</ScrollArea>
```

## Composition

Use the following composition to build a `ScrollArea`:

```text
ScrollArea
└── ScrollBar
```

## Horizontal

Use `ScrollBar` with `orientation="horizontal"` for horizontal scrolling.

> Example `scroll-area-horizontal-demo` — `src/examples/scroll-area-horizontal-demo.tsx`, `static/scroll-area-horizontal-demo.html`

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `scroll-area-rtl` — `src/examples/scroll-area-rtl.tsx`, `static/scroll-area-rtl.html`

## API Reference

See the [Radix UI Scroll Area](https://www.radix-ui.com/docs/primitives/components/scroll-area#api-reference) documentation.

## Files

- `src/ui/scroll-area.tsx` — the ui file as the registry installs it
- `src/examples/scroll-area-demo.tsx`
- `src/examples/scroll-area-horizontal-demo.tsx`
- `src/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/scroll-area
