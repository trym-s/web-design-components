# Breadcrumb

Displays the path to the current resource using a hierarchy of links.

## Classification

- Category: `navigation` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `upstream/ui/breadcrumb.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: Displays the path to the current resource using a hierarchy of links.
- Provides: breadcrumb with 6 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: breadcrumb-demo, breadcrumb-basic, breadcrumb-separator, breadcrumb-dropdown, breadcrumb-ellipsis, breadcrumb-link
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add breadcrumb`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/breadcrumb.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `upstream/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `breadcrumb-demo` — `upstream/examples/breadcrumb-demo.tsx`, `static/breadcrumb-demo.html`

## Installation

```bash
npx shadcn@latest add breadcrumb
```

- Copy and paste the following code into your project.

Source: `components/ui/breadcrumb.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx showLineNumbers
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
```

```tsx showLineNumbers
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/components">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

## Composition

Use the following composition to build a `Breadcrumb`:

```text
Breadcrumb
└── BreadcrumbList
    ├── BreadcrumbItem
    │   └── BreadcrumbLink
    ├── BreadcrumbSeparator
    ├── BreadcrumbItem
    │   └── BreadcrumbLink
    ├── BreadcrumbSeparator
    └── BreadcrumbItem
        └── BreadcrumbPage
```

## Basic

A basic breadcrumb with a home link and a components link.

> Example `breadcrumb-basic` — `upstream/examples/breadcrumb-basic.tsx`, `static/breadcrumb-basic.html`

## Custom separator

Use a custom component as `children` for `<BreadcrumbSeparator />` to create a custom separator.

> Example `breadcrumb-separator` — `upstream/examples/breadcrumb-separator.tsx`, `static/breadcrumb-separator.html`

## Dropdown

You can compose `<BreadcrumbItem />` with a `<DropdownMenu />` to create a dropdown in the breadcrumb.

> Example `breadcrumb-dropdown` — `upstream/examples/breadcrumb-dropdown.tsx`, `static/breadcrumb-dropdown.html`

## Collapsed

We provide a `<BreadcrumbEllipsis />` component to show a collapsed state when the breadcrumb is too long.

> Example `breadcrumb-ellipsis` — `upstream/examples/breadcrumb-ellipsis.tsx`, `static/breadcrumb-ellipsis.html`

## Link component

To use a custom link component from your routing library, you can use the `asChild` prop on `<BreadcrumbLink />`.

> Example `breadcrumb-link` — `upstream/examples/breadcrumb-link.tsx`, `static/breadcrumb-link.html`

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `breadcrumb-rtl` — `upstream/examples/breadcrumb-rtl.tsx`, `static/breadcrumb-rtl.html`

## API Reference

### Breadcrumb

The `Breadcrumb` component is the root navigation element that wraps all breadcrumb components.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `className` | `string` | -       |

### BreadcrumbList

The `BreadcrumbList` component displays the ordered list of breadcrumb items.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `className` | `string` | -       |

### BreadcrumbItem

The `BreadcrumbItem` component wraps individual breadcrumb items.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `className` | `string` | -       |

### BreadcrumbLink

The `BreadcrumbLink` component displays a clickable link in the breadcrumb.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `className` | `string` | -       |

### BreadcrumbPage

The `BreadcrumbPage` component displays the current page in the breadcrumb (non-clickable).

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `className` | `string` | -       |

### BreadcrumbSeparator

The `BreadcrumbSeparator` component displays a separator between breadcrumb items. You can pass custom children to override the default separator icon.

| Prop        | Type              | Default |
| ----------- | ----------------- | ------- |
| `children`  | `React.ReactNode` | -       |
| `className` | `string`          | -       |

### BreadcrumbEllipsis

The `BreadcrumbEllipsis` component displays an ellipsis indicator for collapsed breadcrumb items.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `className` | `string` | -       |

## Files

- `upstream/ui/breadcrumb.tsx` — the ui file as the registry installs it
- `upstream/examples/breadcrumb-demo.tsx`
- `upstream/examples/breadcrumb-basic.tsx`
- `upstream/examples/breadcrumb-separator.tsx`
- `upstream/examples/breadcrumb-dropdown.tsx`
- `upstream/examples/breadcrumb-ellipsis.tsx`
- `upstream/examples/breadcrumb-link.tsx`
- `upstream/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/breadcrumb
