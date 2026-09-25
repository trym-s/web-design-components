# Context Menu

Displays a menu of actions triggered by a right click.

## Classification

- Category: `overlay` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `src/ui/context-menu.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: Displays a menu of actions triggered by a right click.
- Provides: context-menu with 10 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: context-menu-demo, context-menu-basic, context-menu-submenu, context-menu-shortcuts, context-menu-groups, context-menu-icons, context-menu-checkboxes, context-menu-radio, context-menu-destructive, context-menu-sides
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add context-menu`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/context-menu.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `src/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `context-menu-demo` — `src/examples/context-menu-demo.tsx`, `static/context-menu-demo.html`

## Installation

```bash
npx shadcn@latest add context-menu
```

- Install the following dependencies:

```bash
npm install radix-ui
```

- Copy and paste the following code into your project.

Source: `components/ui/context-menu.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx showLineNumbers
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
```

```tsx showLineNumbers
<ContextMenu>
  <ContextMenuTrigger>Right click here</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Profile</ContextMenuItem>
    <ContextMenuItem>Billing</ContextMenuItem>
    <ContextMenuItem>Team</ContextMenuItem>
    <ContextMenuItem>Subscription</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>
```

## Composition

Use the following composition to build a `ContextMenu`:

```text
ContextMenu
├── ContextMenuTrigger
└── ContextMenuContent
    ├── ContextMenuGroup
    │   ├── ContextMenuLabel
    │   ├── ContextMenuItem
    │   └── ContextMenuItem
    ├── ContextMenuSeparator
    ├── ContextMenuGroup
    │   ├── ContextMenuLabel
    │   ├── ContextMenuCheckboxItem
    │   └── ContextMenuCheckboxItem
    ├── ContextMenuSeparator
    ├── ContextMenuGroup
    │   ├── ContextMenuLabel
    │   └── ContextMenuRadioGroup
    │       ├── ContextMenuRadioItem
    │       └── ContextMenuRadioItem
    └── ContextMenuSub
        ├── ContextMenuSubTrigger
        └── ContextMenuSubContent
            └── ContextMenuGroup
                ├── ContextMenuItem
                └── ContextMenuItem
```

## Basic

A simple context menu with a few actions.

> Example `context-menu-basic` — `src/examples/context-menu-basic.tsx`, `static/context-menu-basic.html`

## Submenu

Use `ContextMenuSub` to nest secondary actions.

> Example `context-menu-submenu` — `src/examples/context-menu-submenu.tsx`, `static/context-menu-submenu.html`

## Shortcuts

Add `ContextMenuShortcut` to show keyboard hints.

> Example `context-menu-shortcuts` — `src/examples/context-menu-shortcuts.tsx`, `static/context-menu-shortcuts.html`

## Groups

Group related actions and separate them with dividers.

> Example `context-menu-groups` — `src/examples/context-menu-groups.tsx`, `static/context-menu-groups.html`

## Icons

Combine icons with labels for quick scanning.

> Example `context-menu-icons` — `src/examples/context-menu-icons.tsx`, `static/context-menu-icons.html`

## Checkboxes

Use `ContextMenuCheckboxItem` for toggles.

> Example `context-menu-checkboxes` — `src/examples/context-menu-checkboxes.tsx`, `static/context-menu-checkboxes.html`

## Radio

Use `ContextMenuRadioItem` for exclusive choices.

> Example `context-menu-radio` — `src/examples/context-menu-radio.tsx`, `static/context-menu-radio.html`

## Destructive

Use `variant="destructive"` to style the menu item as destructive.

> Example `context-menu-destructive` — `src/examples/context-menu-destructive.tsx`, `static/context-menu-destructive.html`

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `context-menu-rtl` — `src/examples/context-menu-rtl.tsx`, `static/context-menu-rtl.html`

## API Reference

See the [Radix UI](https://www.radix-ui.com/docs/primitives/components/context-menu#api-reference) documentation for more information.

## Files

- `src/ui/context-menu.tsx` — the ui file as the registry installs it
- `src/examples/context-menu-demo.tsx`
- `src/examples/context-menu-basic.tsx`
- `src/examples/context-menu-submenu.tsx`
- `src/examples/context-menu-shortcuts.tsx`
- `src/examples/context-menu-groups.tsx`
- `src/examples/context-menu-icons.tsx`
- `src/examples/context-menu-checkboxes.tsx`
- `src/examples/context-menu-radio.tsx`
- `src/examples/context-menu-destructive.tsx`
- `src/examples/context-menu-sides.tsx`
- `src/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/context-menu
