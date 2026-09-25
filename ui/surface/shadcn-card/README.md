# Card

Displays a card with header, content, and footer.

## Classification

- Category: `surface` — structural
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `src/ui/card.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: Displays a card with header, content, and footer.
- Provides: card with 5 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: card-demo, card-small, card-spacing, card-edge-to-edge, card-image
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add card`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/card.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `src/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `card-demo` — `src/examples/card-demo.tsx`, `static/card-demo.html`

## Installation

```bash
npx shadcn@latest add card
```

- Copy and paste the following code into your project.

Source: `components/ui/card.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx showLineNumbers
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
```

```tsx showLineNumbers
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
    <CardAction>Card Action</CardAction>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>
```

## Composition

Use the following composition to build a `Card`:

```text
Card
├── CardHeader
│   ├── CardTitle
│   ├── CardDescription
│   └── CardAction
├── CardContent
└── CardFooter
```

## Size

Use the `size="sm"` prop to set the size of the card to small. The small size variant uses smaller spacing.

> Example `card-small` — `src/examples/card-small.tsx`, `static/card-small.html`

## Spacing

In addition to the `size` prop, you can use the `--card-spacing` CSS variable to control the spacing between sections and the inset of card parts.

> Example `card-spacing` — `src/examples/card-spacing.tsx`, `static/card-spacing.html`

Use negative margins with `-mx-(--card-spacing)` to make content go edge to edge while keeping it aligned with the card inset. When the edge-to-edge content sits above a footer, use `-mb-(--card-spacing)` on `CardContent` to remove the section gap.

> Example `card-edge-to-edge` — `src/examples/card-edge-to-edge.tsx`, `static/card-edge-to-edge.html`

## Image

Add an image before the card header to create a card with an image.

> Example `card-image` — `src/examples/card-image.tsx`, `static/card-image.html`

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `card-rtl` — `src/examples/card-rtl.tsx`, `static/card-rtl.html`

## API Reference

### Card

The `Card` component is the root container for card content.

| Prop        | Type                | Default     |
| ----------- | ------------------- | ----------- |
| `size`      | `"default" \| "sm"` | `"default"` |
| `className` | `string`            | -           |

### CardHeader

The `CardHeader` component is used for a title, description, and optional action.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `className` | `string` | -       |

### CardTitle

The `CardTitle` component is used for the card title.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `className` | `string` | -       |

### CardDescription

The `CardDescription` component is used for helper text under the title.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `className` | `string` | -       |

### CardAction

The `CardAction` component places content in the top-right of the header (for example, a button or a badge).

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `className` | `string` | -       |

### CardContent

The `CardContent` component is used for the main card body.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `className` | `string` | -       |

### CardFooter

The `CardFooter` component is used for actions and secondary content at the bottom of the card.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `className` | `string` | -       |

## Changelog

### Spacing Variable

If you're upgrading from a previous version of the `Card` component, you'll need to apply the following updates to use the `--card-spacing` variable:

- Update the Card root spacing classes.

Replace the hard-coded gap and vertical padding with `--card-spacing`, and set the default and small size values on the root:

```diff
  className={cn(
-   "group/card flex flex-col gap-4 overflow-hidden rounded-xl bg-card py-4 text-sm text-card-foreground ring-1 ring-foreground/10 has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
+   "group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl bg-card py-(--card-spacing) text-sm text-card-foreground ring-1 ring-foreground/10 [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
    className
  )}
```

- Update CardHeader spacing classes.

Replace the horizontal padding and border spacing with the shared variable:

```diff
  className={cn(
-   "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-4 group-data-[size=sm]/card:px-3 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3",
+   "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
    className
  )}
```

- Update CardContent and CardFooter spacing classes.

Use `--card-spacing` for the content inset and footer padding:

```diff
  function CardContent({ className, ...props }: React.ComponentProps<"div">) {
    return (
      <div
        data-slot="card-content"
-       className={cn("px-4 group-data-[size=sm]/card:px-3", className)}
+       className={cn("px-(--card-spacing)", className)}
        {...props}
      />
    )
  }
```

```diff
  className={cn(
-   "flex items-center rounded-b-xl border-t bg-muted/50 p-4 group-data-[size=sm]/card:p-3",
+   "flex items-center rounded-b-xl border-t bg-muted/50 p-(--card-spacing)",
    className
  )}
```

After applying these changes, you can customize card spacing by setting `--card-spacing` on the `Card` with an arbitrary property class:

```tsx
function Example() {
  return <Card className="[--card-spacing:--spacing(6)]">...</Card>
}
```

## Files

- `src/ui/card.tsx` — the ui file as the registry installs it
- `src/examples/card-demo.tsx`
- `src/examples/card-small.tsx`
- `src/examples/card-spacing.tsx`
- `src/examples/card-edge-to-edge.tsx`
- `src/examples/card-image.tsx`
- `src/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/card
