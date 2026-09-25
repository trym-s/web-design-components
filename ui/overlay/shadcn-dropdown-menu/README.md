# Dropdown Menu

Displays a menu to the user — such as a set of actions or functions — triggered by a button.

## Classification

- Category: `overlay` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `src/ui/dropdown-menu.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: Displays a menu to the user — such as a set of actions or functions — triggered by a button.
- Provides: dropdown-menu with 12 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: dropdown-menu-demo, dropdown-menu-basic, dropdown-menu-submenu, dropdown-menu-shortcuts, dropdown-menu-icons, dropdown-menu-checkboxes, dropdown-menu-checkboxes-icons, dropdown-menu-radio-group, dropdown-menu-radio-icons, dropdown-menu-destructive, dropdown-menu-avatar, dropdown-menu-complex
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add dropdown-menu`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/dropdown-menu.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `src/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `dropdown-menu-demo` — `src/examples/dropdown-menu-demo.tsx`, `static/dropdown-menu-demo.html`

## Installation

```bash
npx shadcn@latest add dropdown-menu
```

- Install the following dependencies:

```bash
npm install radix-ui
```

- Copy and paste the following code into your project.

Source: `components/ui/dropdown-menu.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx showLineNumbers
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
```

```tsx showLineNumbers
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuGroup>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Billing</DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuItem>Team</DropdownMenuItem>
      <DropdownMenuItem>Subscription</DropdownMenuItem>
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>
```

## Composition

Use the following composition to build a `DropdownMenu`:

```text
DropdownMenu
├── DropdownMenuTrigger
└── DropdownMenuContent
    ├── DropdownMenuGroup
    │   ├── DropdownMenuLabel
    │   ├── DropdownMenuItem
    │   └── DropdownMenuItem
    ├── DropdownMenuSeparator
    ├── DropdownMenuGroup
    │   ├── DropdownMenuLabel
    │   ├── DropdownMenuCheckboxItem
    │   └── DropdownMenuCheckboxItem
    ├── DropdownMenuSeparator
    ├── DropdownMenuGroup
    │   ├── DropdownMenuLabel
    │   └── DropdownMenuRadioGroup
    │       ├── DropdownMenuRadioItem
    │       └── DropdownMenuRadioItem
    └── DropdownMenuSub
        ├── DropdownMenuSubTrigger
        └── DropdownMenuSubContent
            └── DropdownMenuGroup
                ├── DropdownMenuLabel
                ├── DropdownMenuItem
                └── DropdownMenuItem
```

## Basic

A basic dropdown menu with labels and separators.

> Example `dropdown-menu-basic` — `src/examples/dropdown-menu-basic.tsx`, `static/dropdown-menu-basic.html`

## Submenu

Use `DropdownMenuSub` to nest secondary actions.

> Example `dropdown-menu-submenu` — `src/examples/dropdown-menu-submenu.tsx`, `static/dropdown-menu-submenu.html`

## Shortcuts

Add `DropdownMenuShortcut` to show keyboard hints.

> Example `dropdown-menu-shortcuts` — `src/examples/dropdown-menu-shortcuts.tsx`, `static/dropdown-menu-shortcuts.html`

## Icons

Combine icons with labels for quick scanning.

> Example `dropdown-menu-icons` — `src/examples/dropdown-menu-icons.tsx`, `static/dropdown-menu-icons.html`

## Checkboxes

Use `DropdownMenuCheckboxItem` for toggles.

> Example `dropdown-menu-checkboxes` — `src/examples/dropdown-menu-checkboxes.tsx`, `static/dropdown-menu-checkboxes.html`

## Checkboxes Icons

Add icons to checkbox items.

> Example `dropdown-menu-checkboxes-icons` — `src/examples/dropdown-menu-checkboxes-icons.tsx`, `static/dropdown-menu-checkboxes-icons.html`

## Radio Group

Use `DropdownMenuRadioGroup` for exclusive choices.

> Example `dropdown-menu-radio-group` — `src/examples/dropdown-menu-radio-group.tsx`, `static/dropdown-menu-radio-group.html`

## Radio Icons

Show radio options with icons.

> Example `dropdown-menu-radio-icons` — `src/examples/dropdown-menu-radio-icons.tsx`, `static/dropdown-menu-radio-icons.html`

## Destructive

Use `variant="destructive"` for irreversible actions.

> Example `dropdown-menu-destructive` — `src/examples/dropdown-menu-destructive.tsx`, `static/dropdown-menu-destructive.html`

## Avatar

An account switcher dropdown triggered by an avatar.

> Example `dropdown-menu-avatar` — `src/examples/dropdown-menu-avatar.tsx`, `static/dropdown-menu-avatar.html`

## Complex

A richer example combining groups, icons, and submenus.

> Example `dropdown-menu-complex` — `src/examples/dropdown-menu-complex.tsx`, `static/dropdown-menu-complex.html`

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `dropdown-menu-rtl` — `src/examples/dropdown-menu-rtl.tsx`, `static/dropdown-menu-rtl.html`

## API Reference

See the [Radix UI documentation](https://www.radix-ui.com/docs/primitives/components/dropdown-menu) for the full API reference.

## Files

- `src/ui/dropdown-menu.tsx` — the ui file as the registry installs it
- `src/examples/dropdown-menu-demo.tsx`
- `src/examples/dropdown-menu-basic.tsx`
- `src/examples/dropdown-menu-submenu.tsx`
- `src/examples/dropdown-menu-shortcuts.tsx`
- `src/examples/dropdown-menu-icons.tsx`
- `src/examples/dropdown-menu-checkboxes.tsx`
- `src/examples/dropdown-menu-checkboxes-icons.tsx`
- `src/examples/dropdown-menu-radio-group.tsx`
- `src/examples/dropdown-menu-radio-icons.tsx`
- `src/examples/dropdown-menu-destructive.tsx`
- `src/examples/dropdown-menu-avatar.tsx`
- `src/examples/dropdown-menu-complex.tsx`
- `src/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/dropdown-menu
