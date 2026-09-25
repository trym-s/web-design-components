# Slider

An input where the user selects a value from within a given range.

## Classification

- Category: `input` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `upstream/ui/slider.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: An input where the user selects a value from within a given range.
- Provides: slider with 6 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: slider-demo, slider-range, slider-multiple, slider-vertical, slider-controlled, slider-disabled
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add slider`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/slider.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `upstream/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `slider-demo` — `upstream/examples/slider-demo.tsx`, `static/slider-demo.html`

## Installation

```bash
npx shadcn@latest add slider
```

- Install the following dependencies:

```bash
npm install radix-ui
```

- Copy and paste the following code into your project.

Source: `components/ui/slider.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx
import { Slider } from "@/components/ui/slider"
```

```tsx
<Slider defaultValue={[33]} max={100} step={1} />
```

## Range

Use an array with two values for a range slider.

> Example `slider-range` — `upstream/examples/slider-range.tsx`, `static/slider-range.html`

## Multiple Thumbs

Use an array with multiple values for multiple thumbs.

> Example `slider-multiple` — `upstream/examples/slider-multiple.tsx`, `static/slider-multiple.html`

## Vertical

Use `orientation="vertical"` for a vertical slider.

> Example `slider-vertical` — `upstream/examples/slider-vertical.tsx`, `static/slider-vertical.html`

## Controlled

> Example `slider-controlled` — `upstream/examples/slider-controlled.tsx`, `static/slider-controlled.html`

## Disabled

Use the `disabled` prop to disable the slider.

> Example `slider-disabled` — `upstream/examples/slider-disabled.tsx`, `static/slider-disabled.html`

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `slider-rtl` — `upstream/examples/slider-rtl.tsx`, `static/slider-rtl.html`

## API Reference

See the [Radix UI Slider](https://www.radix-ui.com/docs/primitives/components/slider#api-reference) documentation.

## Files

- `upstream/ui/slider.tsx` — the ui file as the registry installs it
- `upstream/examples/slider-demo.tsx`
- `upstream/examples/slider-range.tsx`
- `upstream/examples/slider-multiple.tsx`
- `upstream/examples/slider-vertical.tsx`
- `upstream/examples/slider-controlled.tsx`
- `upstream/examples/slider-disabled.tsx`
- `upstream/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/slider
