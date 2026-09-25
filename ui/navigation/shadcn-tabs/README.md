# Tabs

A set of layered sections of content—known as tab panels—that are displayed one at a time.

## Classification

- Category: `navigation` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `src/ui/tabs.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: A set of layered sections of content—known as tab panels—that are displayed one at a time.
- Provides: tabs with 5 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: tabs-demo, tabs-line, tabs-vertical, tabs-disabled, tabs-icons
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add tabs`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/tabs.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `src/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `tabs-demo` — `src/examples/tabs-demo.tsx`, `static/tabs-demo.html`

## Installation

```bash
npx shadcn@latest add tabs
```

- Install the following dependencies:

```bash
npm install radix-ui
```

- Copy and paste the following code into your project.

Source: `components/ui/tabs.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx showLineNumbers
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
```

```tsx showLineNumbers
<Tabs defaultValue="account" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Make changes to your account here.</TabsContent>
  <TabsContent value="password">Change your password here.</TabsContent>
</Tabs>
```

## Composition

Use the following composition to build `Tabs`:

```text
Tabs
├── TabsList
│   ├── TabsTrigger
│   └── TabsTrigger
├── TabsContent
└── TabsContent
```

## Line

Use the `variant="line"` prop on `TabsList` for a line style.

> Example `tabs-line` — `src/examples/tabs-line.tsx`, `static/tabs-line.html`

## Vertical

Use `orientation="vertical"` for vertical tabs.

> Example `tabs-vertical` — `src/examples/tabs-vertical.tsx`, `static/tabs-vertical.html`

## Disabled

> Example `tabs-disabled` — `src/examples/tabs-disabled.tsx`, `static/tabs-disabled.html`

## Icons

> Example `tabs-icons` — `src/examples/tabs-icons.tsx`, `static/tabs-icons.html`

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `tabs-rtl` — `src/examples/tabs-rtl.tsx`, `static/tabs-rtl.html`

## API Reference

See the [Radix Tabs](https://www.radix-ui.com/docs/primitives/components/tabs#api-reference) documentation.

## Files

- `src/ui/tabs.tsx` — the ui file as the registry installs it
- `src/examples/tabs-demo.tsx`
- `src/examples/tabs-line.tsx`
- `src/examples/tabs-vertical.tsx`
- `src/examples/tabs-disabled.tsx`
- `src/examples/tabs-icons.tsx`
- `src/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/tabs
