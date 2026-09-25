# Navigation Menu

A collection of links for navigating websites.

## Classification

- Category: `navigation` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `src/ui/navigation-menu.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: A collection of links for navigating websites.
- Provides: navigation-menu with 1 documented example
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: navigation-menu-demo
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add navigation-menu`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/navigation-menu.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `src/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `navigation-menu-demo` — `src/examples/navigation-menu-demo.tsx`, `static/navigation-menu-demo.html`

## Installation

```bash
npx shadcn@latest add navigation-menu
```

- Install the following dependencies:

```bash
npm install radix-ui
```

- Copy and paste the following code into your project.

Source: `components/ui/navigation-menu.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx showLineNumbers
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
```

```tsx showLineNumbers
<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink>Link</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

## Composition

Use the following composition to build a `NavigationMenu`:

```text
NavigationMenu
├── NavigationMenuList
│   ├── NavigationMenuItem
│   │   ├── NavigationMenuTrigger
│   │   └── NavigationMenuContent
│   │       ├── NavigationMenuLink
│   │       └── NavigationMenuLink
│   └── NavigationMenuItem
│       └── NavigationMenuLink
└── NavigationMenuIndicator
```

## Link Component

Use the `asChild` prop to compose a custom link component such as Next.js `Link`.

```tsx showLineNumbers
import Link from "next/link"

import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function NavigationMenuDemo() {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
        <Link href="/docs">Documentation</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}
```

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `navigation-menu-rtl` — `src/examples/navigation-menu-rtl.tsx`, `static/navigation-menu-rtl.html`

## API Reference

See the [Radix UI Navigation Menu](https://www.radix-ui.com/docs/primitives/components/navigation-menu#api-reference) documentation for more information.

## Files

- `src/ui/navigation-menu.tsx` — the ui file as the registry installs it
- `src/examples/navigation-menu-demo.tsx`
- `src/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/navigation-menu
