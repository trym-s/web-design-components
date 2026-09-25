# Menubar

A visually persistent menu common in desktop applications that provides quick access to a consistent set of commands.

## Classification

- Category: `navigation` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `src/ui/menubar.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: A visually persistent menu common in desktop applications that provides quick access to a consistent set of commands.
- Provides: menubar with 5 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: menubar-demo, menubar-checkbox, menubar-radio, menubar-submenu, menubar-icons
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add menubar`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/menubar.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `src/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `menubar-demo` — `src/examples/menubar-demo.tsx`, `static/menubar-demo.html`

## Installation

```bash
npx shadcn@latest add menubar
```

- Install the following dependencies:

```bash
npm install radix-ui
```

- Copy and paste the following code into your project.

Source: `components/ui/menubar.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx showLineNumbers
import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
```

```tsx showLineNumbers
<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarGroup>
        <MenubarItem>
          New Tab <MenubarShortcut>⌘T</MenubarShortcut>
        </MenubarItem>
        <MenubarItem>New Window</MenubarItem>
      </MenubarGroup>
      <MenubarSeparator />
      <MenubarGroup>
        <MenubarItem>Share</MenubarItem>
        <MenubarItem>Print</MenubarItem>
      </MenubarGroup>
    </MenubarContent>
  </MenubarMenu>
</Menubar>
```

## Composition

Use the following composition to build a `Menubar`:

```text
Menubar
├── MenubarMenu
│   ├── MenubarTrigger
│   └── MenubarContent
│       ├── MenubarGroup
│       │   ├── MenubarLabel
│       │   ├── MenubarItem
│       │   └── MenubarItem
│       ├── MenubarSeparator
│       ├── MenubarGroup
│       │   ├── MenubarLabel
│       │   ├── MenubarCheckboxItem
│       │   └── MenubarCheckboxItem
│       ├── MenubarSeparator
│       ├── MenubarGroup
│       │   ├── MenubarLabel
│       │   └── MenubarRadioGroup
│       │       ├── MenubarRadioItem
│       │       └── MenubarRadioItem
│       └── MenubarSub
│           ├── MenubarSubTrigger
│           └── MenubarSubContent
│               └── MenubarGroup
│                   ├── MenubarLabel
│                   ├── MenubarItem
│                   └── MenubarItem
└── MenubarMenu
    ├── MenubarTrigger
    └── MenubarContent
        └── MenubarGroup
            ├── MenubarLabel
            ├── MenubarItem
            └── MenubarItem
```

## Checkbox

Use `MenubarCheckboxItem` for toggleable options.

> Example `menubar-checkbox` — `src/examples/menubar-checkbox.tsx`, `static/menubar-checkbox.html`

## Radio

Use `MenubarRadioGroup` and `MenubarRadioItem` for single-select options.

> Example `menubar-radio` — `src/examples/menubar-radio.tsx`, `static/menubar-radio.html`

## Submenu

Use `MenubarSub`, `MenubarSubTrigger`, and `MenubarSubContent` for nested menus.

> Example `menubar-submenu` — `src/examples/menubar-submenu.tsx`, `static/menubar-submenu.html`

## With Icons

> Example `menubar-icons` — `src/examples/menubar-icons.tsx`, `static/menubar-icons.html`

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `menubar-rtl` — `src/examples/menubar-rtl.tsx`, `static/menubar-rtl.html`

## API Reference

See the [Radix UI Menubar](https://www.radix-ui.com/docs/primitives/components/menubar#api-reference) documentation.

## Files

- `src/ui/menubar.tsx` — the ui file as the registry installs it
- `src/examples/menubar-demo.tsx`
- `src/examples/menubar-checkbox.tsx`
- `src/examples/menubar-radio.tsx`
- `src/examples/menubar-submenu.tsx`
- `src/examples/menubar-icons.tsx`
- `src/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/menubar
