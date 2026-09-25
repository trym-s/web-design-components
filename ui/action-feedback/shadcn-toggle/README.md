# Toggle

A two-state button that can be either on or off.

## Classification

- Category: `action-feedback` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `upstream/ui/toggle.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: A two-state button that can be either on or off.
- Provides: toggle with 5 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: toggle-demo, toggle-outline, toggle-text, toggle-sizes, toggle-disabled
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add toggle`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/toggle.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `upstream/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `toggle-demo` — `upstream/examples/toggle-demo.tsx`, `static/toggle-demo.html`

## Installation

```bash
npx shadcn@latest add toggle
```

- Install the following dependencies:

```bash
npm install radix-ui
```

- Copy and paste the following code into your project.

Source: `components/ui/toggle.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx
import { Toggle } from "@/components/ui/toggle"
```

```tsx
<Toggle>Toggle</Toggle>
```

## Outline

Use `variant="outline"` for an outline style.

> Example `toggle-outline` — `upstream/examples/toggle-outline.tsx`, `static/toggle-outline.html`

## With Text

> Example `toggle-text` — `upstream/examples/toggle-text.tsx`, `static/toggle-text.html`

## Size

Use the `size` prop to change the size of the toggle.

> Example `toggle-sizes` — `upstream/examples/toggle-sizes.tsx`, `static/toggle-sizes.html`

## Disabled

> Example `toggle-disabled` — `upstream/examples/toggle-disabled.tsx`, `static/toggle-disabled.html`

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `toggle-rtl` — `upstream/examples/toggle-rtl.tsx`, `static/toggle-rtl.html`

## API Reference

See the [Radix Toggle](https://www.radix-ui.com/docs/primitives/components/toggle#api-reference) documentation.

## Files

- `upstream/ui/toggle.tsx` — the ui file as the registry installs it
- `upstream/examples/toggle-demo.tsx`
- `upstream/examples/toggle-outline.tsx`
- `upstream/examples/toggle-text.tsx`
- `upstream/examples/toggle-sizes.tsx`
- `upstream/examples/toggle-disabled.tsx`
- `upstream/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/toggle
