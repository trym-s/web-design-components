# Command

Command menu for search and quick actions.

## Classification

- Category: `search` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `upstream/ui/command.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: Command menu for search and quick actions.
- Provides: command with 6 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: command-demo, command-basic, command-shortcuts, command-groups, command-scrollable, command-dialog
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add command`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/command.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `upstream/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `command-demo` — `upstream/examples/command-demo.tsx`, `static/command-demo.html`

## About

The `<Command />` component uses the [`cmdk`](https://github.com/dip/cmdk) component by [Dip](https://www.dip.org/).

## Installation

```bash
npx shadcn@latest add command
```

- Install the following dependencies:

```bash
npm install cmdk
```

- Copy and paste the following code into your project.

Source: `components/ui/command.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx showLineNumbers
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
```

```tsx showLineNumbers
<Command className="max-w-sm rounded-lg border">
  <CommandInput placeholder="Type a command or search..." />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem>Calendar</CommandItem>
      <CommandItem>Search Emoji</CommandItem>
      <CommandItem>Calculator</CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Settings">
      <CommandItem>Profile</CommandItem>
      <CommandItem>Billing</CommandItem>
      <CommandItem>Settings</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
```

## Composition

Use the following composition to build a `Command`:

```text
Command
├── CommandInput
└── CommandList
    ├── CommandEmpty
    ├── CommandGroup
    │   ├── CommandItem
    │   └── CommandItem
    ├── CommandSeparator
    └── CommandGroup
        ├── CommandItem
        └── CommandItem
```

## Basic

A simple command menu in a dialog.

> Example `command-basic` — `upstream/examples/command-basic.tsx`, `static/command-basic.html`

## Shortcuts

> Example `command-shortcuts` — `upstream/examples/command-shortcuts.tsx`, `static/command-shortcuts.html`

## Groups

A command menu with groups, icons and separators.

> Example `command-groups` — `upstream/examples/command-groups.tsx`, `static/command-groups.html`

## Scrollable

Scrollable command menu with multiple items.

> Example `command-scrollable` — `upstream/examples/command-scrollable.tsx`, `static/command-scrollable.html`

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `command-rtl` — `upstream/examples/command-rtl.tsx`, `static/command-rtl.html`

## API Reference

See the [cmdk](https://github.com/dip/cmdk) documentation for more information.

## Files

- `upstream/ui/command.tsx` — the ui file as the registry installs it
- `upstream/examples/command-demo.tsx`
- `upstream/examples/command-basic.tsx`
- `upstream/examples/command-shortcuts.tsx`
- `upstream/examples/command-groups.tsx`
- `upstream/examples/command-scrollable.tsx`
- `upstream/examples/command-dialog.tsx`
- `upstream/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/command
