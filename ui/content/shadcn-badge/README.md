# Badge

Displays a badge or a component that looks like a badge.

## Classification

- Category: `content` — structural
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `src/ui/badge.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: Displays a badge or a component that looks like a badge.
- Provides: badge with 6 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: badge-demo, badge-variants, badge-icon, badge-spinner, badge-link, badge-colors
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add badge`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/badge.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `src/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `badge-demo` — `src/examples/badge-demo.tsx`, `static/badge-demo.html`

## Installation

```bash
npx shadcn@latest add badge
```

- Copy and paste the following code into your project.

Source: `components/ui/badge.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx
import { Badge } from "@/components/ui/badge"
```

```tsx
<Badge variant="default | outline | secondary | destructive">Badge</Badge>
```

## Variants

Use the `variant` prop to change the variant of the badge.

> Example `badge-variants` — `src/examples/badge-variants.tsx`, `static/badge-variants.html`

## With Icon

You can render an icon inside the badge. Use `data-icon="inline-start"` to render the icon on the left and `data-icon="inline-end"` to render the icon on the right.

> Example `badge-icon` — `src/examples/badge-icon.tsx`, `static/badge-icon.html`

## With Spinner

You can render a spinner inside the badge. Remember to add the `data-icon="inline-start"` or `data-icon="inline-end"` prop to the spinner.

> Example `badge-spinner` — `src/examples/badge-spinner.tsx`, `static/badge-spinner.html`

## Link

Use the `asChild` prop to render a link as a badge.

> Example `badge-link` — `src/examples/badge-link.tsx`, `static/badge-link.html`

## Custom Colors

You can customize the colors of a badge by adding custom classes such as `bg-green-50 dark:bg-green-800` to the `Badge` component.

> Example `badge-colors` — `src/examples/badge-colors.tsx`, `static/badge-colors.html`

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `badge-rtl` — `src/examples/badge-rtl.tsx`, `static/badge-rtl.html`

## API Reference

### Badge

The `Badge` component displays a badge or a component that looks like a badge.

| Prop        | Type                                                                          | Default     |
| ----------- | ----------------------------------------------------------------------------- | ----------- |
| `variant`   | `"default" \| "secondary" \| "destructive" \| "outline" \| "ghost" \| "link"` | `"default"` |
| `className` | `string`                                                                      | -           |

## Files

- `src/ui/badge.tsx` — the ui file as the registry installs it
- `src/examples/badge-demo.tsx`
- `src/examples/badge-variants.tsx`
- `src/examples/badge-icon.tsx`
- `src/examples/badge-spinner.tsx`
- `src/examples/badge-link.tsx`
- `src/examples/badge-colors.tsx`
- `src/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/badge
