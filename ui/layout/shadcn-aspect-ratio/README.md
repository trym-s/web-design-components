# Aspect Ratio

Displays content within a desired ratio.

## Classification

- Category: `layout` — structural
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `src/ui/aspect-ratio.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: Displays content within a desired ratio.
- Provides: aspect-ratio with 3 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: aspect-ratio-demo, aspect-ratio-square, aspect-ratio-portrait
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add aspect-ratio`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/aspect-ratio.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `src/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `aspect-ratio-demo` — `src/examples/aspect-ratio-demo.tsx`, `static/aspect-ratio-demo.html`

## Installation

```bash
npx shadcn@latest add aspect-ratio
```

- Install the following dependencies:

```bash
npm install radix-ui
```

- Copy and paste the following code into your project.

Source: `components/ui/aspect-ratio.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx showLineNumbers
import { AspectRatio } from "@/components/ui/aspect-ratio"
```

```tsx showLineNumbers
<AspectRatio ratio={16 / 9}>
  <Image src="..." alt="Image" className="rounded-md object-cover" />
</AspectRatio>
```

## Square

A square aspect ratio component using the `ratio={1 / 1}` prop. This is useful for displaying images in a square format.

> Example `aspect-ratio-square` — `src/examples/aspect-ratio-square.tsx`, `static/aspect-ratio-square.html`

## Portrait

A portrait aspect ratio component using the `ratio={9 / 16}` prop. This is useful for displaying images in a portrait format.

> Example `aspect-ratio-portrait` — `src/examples/aspect-ratio-portrait.tsx`, `static/aspect-ratio-portrait.html`

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `aspect-ratio-rtl` — `src/examples/aspect-ratio-rtl.tsx`, `static/aspect-ratio-rtl.html`

## API Reference

### AspectRatio

The `AspectRatio` component displays content within a desired ratio.

| Prop        | Type     | Default | Required |
| ----------- | -------- | ------- | -------- |
| `ratio`     | `number` | -       | Yes      |
| `className` | `string` | -       | No       |

For more information, see the [Radix UI documentation](https://www.radix-ui.com/primitives/docs/components/aspect-ratio#api-reference).

## Files

- `src/ui/aspect-ratio.tsx` — the ui file as the registry installs it
- `src/examples/aspect-ratio-demo.tsx`
- `src/examples/aspect-ratio-square.tsx`
- `src/examples/aspect-ratio-portrait.tsx`
- `src/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/aspect-ratio
