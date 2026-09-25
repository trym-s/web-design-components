# Toggle Group

A set of two-state buttons that can be toggled on or off.

## Classification

- Category: `action-feedback` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `upstream/ui/toggle-group.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: A set of two-state buttons that can be toggled on or off.
- Provides: toggle-group with 7 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: toggle-group-demo, toggle-group-outline, toggle-group-sizes, toggle-group-spacing, toggle-group-vertical, toggle-group-disabled, toggle-group-font-weight-selector
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add toggle-group`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/toggle-group.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `upstream/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `toggle-group-demo` — `upstream/examples/toggle-group-demo.tsx`, `static/toggle-group-demo.html`

## Installation

```bash
npx shadcn@latest add toggle-group
```

- Install the following dependencies:

```bash
npm install radix-ui
```

- Copy and paste the following code into your project.

Source: `components/ui/toggle-group.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
```

```tsx
<ToggleGroup type="single">
  <ToggleGroupItem value="a">A</ToggleGroupItem>
  <ToggleGroupItem value="b">B</ToggleGroupItem>
  <ToggleGroupItem value="c">C</ToggleGroupItem>
</ToggleGroup>
```

## Composition

Use the following composition to build a `ToggleGroup`:

```text
ToggleGroup
├── ToggleGroupItem
└── ToggleGroupItem
```

## Outline

Use `variant="outline"` for an outline style.

> Example `toggle-group-outline` — `upstream/examples/toggle-group-outline.tsx`, `static/toggle-group-outline.html`

## Size

Use the `size` prop to change the size of the toggle group.

> Example `toggle-group-sizes` — `upstream/examples/toggle-group-sizes.tsx`, `static/toggle-group-sizes.html`

## Spacing

Use `spacing` to add spacing between toggle group items.

> Example `toggle-group-spacing` — `upstream/examples/toggle-group-spacing.tsx`, `static/toggle-group-spacing.html`

## Vertical

Use `orientation="vertical"` for vertical toggle groups.

> Example `toggle-group-vertical` — `upstream/examples/toggle-group-vertical.tsx`, `static/toggle-group-vertical.html`

## Disabled

> Example `toggle-group-disabled` — `upstream/examples/toggle-group-disabled.tsx`, `static/toggle-group-disabled.html`

## Custom

A custom toggle group example.

> Example `toggle-group-font-weight-selector` — `upstream/examples/toggle-group-font-weight-selector.tsx`, `static/toggle-group-font-weight-selector.html`

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `toggle-group-rtl` — `upstream/examples/toggle-group-rtl.tsx`, `static/toggle-group-rtl.html`

## API Reference

See the [Radix Toggle Group](https://www.radix-ui.com/docs/primitives/components/toggle-group#api-reference) documentation.

## Changelog

### 2026-05-17 Default Spacing

Changed the default `spacing` from `0` to `2` so toggle groups render with space between items by default. Use `spacing={0}` for connected items.

## Files

- `upstream/ui/toggle-group.tsx` — the ui file as the registry installs it
- `upstream/examples/toggle-group-demo.tsx`
- `upstream/examples/toggle-group-outline.tsx`
- `upstream/examples/toggle-group-sizes.tsx`
- `upstream/examples/toggle-group-spacing.tsx`
- `upstream/examples/toggle-group-vertical.tsx`
- `upstream/examples/toggle-group-disabled.tsx`
- `upstream/examples/toggle-group-font-weight-selector.tsx`
- `upstream/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/toggle-group
