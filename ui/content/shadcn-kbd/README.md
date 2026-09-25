# Kbd

Used to display textual user input from keyboard.

## Classification

- Category: `content` — structural
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `upstream/ui/kbd.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: Used to display textual user input from keyboard.
- Provides: kbd with 5 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: kbd-demo, kbd-group, kbd-button, kbd-tooltip, kbd-input-group
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add kbd`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/kbd.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `upstream/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `kbd-demo` — `upstream/examples/kbd-demo.tsx`, `static/kbd-demo.html`

## Installation

```bash
npx shadcn@latest add kbd
```

- Copy and paste the following code into your project.

Source: `components/ui/kbd.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx
import { Kbd } from "@/components/ui/kbd"
```

```tsx
<Kbd>Ctrl</Kbd>
```

## Composition

Use the following composition to build `Kbd` and `KbdGroup`:

```text
Kbd
KbdGroup
├── Kbd
└── Kbd
```

## Group

Use the `KbdGroup` component to group keyboard keys together.

> Example `kbd-group` — `upstream/examples/kbd-group.tsx`, `static/kbd-group.html`

## Button

Use the `Kbd` component inside a `Button` component to display a keyboard key inside a button.

> Example `kbd-button` — `upstream/examples/kbd-button.tsx`, `static/kbd-button.html`

## Tooltip

You can use the `Kbd` component inside a `Tooltip` component to display a tooltip with a keyboard key.

> Example `kbd-tooltip` — `upstream/examples/kbd-tooltip.tsx`, `static/kbd-tooltip.html`

## Input Group

You can use the `Kbd` component inside a `InputGroupAddon` component to display a keyboard key inside an input group.

> Example `kbd-input-group` — `upstream/examples/kbd-input-group.tsx`, `static/kbd-input-group.html`

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `kbd-rtl` — `upstream/examples/kbd-rtl.tsx`, `static/kbd-rtl.html`

## API Reference

### Kbd

Use the `Kbd` component to display a keyboard key.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `className` | `string` | ``      |

```tsx
<Kbd>Ctrl</Kbd>
```

### KbdGroup

Use the `KbdGroup` component to group `Kbd` components together.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `className` | `string` | ``      |

```tsx
<KbdGroup>
  <Kbd>Ctrl</Kbd>
  <Kbd>B</Kbd>
</KbdGroup>
```

## Files

- `upstream/ui/kbd.tsx` — the ui file as the registry installs it
- `upstream/examples/kbd-demo.tsx`
- `upstream/examples/kbd-group.tsx`
- `upstream/examples/kbd-button.tsx`
- `upstream/examples/kbd-tooltip.tsx`
- `upstream/examples/kbd-input-group.tsx`
- `upstream/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/kbd
