# Item

A versatile component for displaying content with media, title, description, and actions.

## Classification

- Category: `data-display` — structural
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `src/ui/item.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: A versatile component for displaying content with media, title, description, and actions.
- Provides: item with 10 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: item-demo, item-variant, item-size, item-icon, item-avatar, item-image, item-group, item-header, item-link, item-dropdown
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add item`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/item.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `src/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `item-demo` — `src/examples/item-demo.tsx`, `static/item-demo.html`

The `Item` component is a straightforward flex container that can house nearly any type of content. Use it to display a title, description, and actions. Group it with the `ItemGroup` component to create a list of items.

## Installation

```bash
npx shadcn@latest add item
```

- Copy and paste the following code into your project.

Source: `components/ui/item.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx showLineNumbers
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
```

```tsx showLineNumbers
<Item>
  <ItemMedia variant="icon">
    <Icon />
  </ItemMedia>
  <ItemContent>
    <ItemTitle>Title</ItemTitle>
    <ItemDescription>Description</ItemDescription>
  </ItemContent>
  <ItemActions>
    <Button>Action</Button>
  </ItemActions>
</Item>
```

## Composition

Use the following composition to build an `Item`:

```text
ItemGroup
└── Item
    ├── ItemHeader
    ├── ItemMedia
    ├── ItemContent
    │   ├── ItemTitle
    │   └── ItemDescription
    ├── ItemActions
    └── ItemFooter
```

## Item vs Field

Use `Field` if you need to display a form input such as a checkbox, input, radio, or select.

If you only need to display content such as a title, description, and actions, use `Item`.

## Variant

Use the `variant` prop to change the visual style of the item.

> Example `item-variant` — `src/examples/item-variant.tsx`, `static/item-variant.html`

## Size

Use the `size` prop to change the size of the item. Available sizes are `default`, `sm`, and `xs`.

> Example `item-size` — `src/examples/item-size.tsx`, `static/item-size.html`

## Icon

Use `ItemMedia` with `variant="icon"` to display an icon.

> Example `item-icon` — `src/examples/item-icon.tsx`, `static/item-icon.html`

## Avatar

You can use `ItemMedia` with `variant="avatar"` to display an avatar.

> Example `item-avatar` — `src/examples/item-avatar.tsx`, `static/item-avatar.html`

## Image

Use `ItemMedia` with `variant="image"` to display an image.

> Example `item-image` — `src/examples/item-image.tsx`, `static/item-image.html`

## Group

Use `ItemGroup` to group related items together.

> Example `item-group` — `src/examples/item-group.tsx`, `static/item-group.html`

## Header

Use `ItemHeader` to add a header above the item content.

> Example `item-header` — `src/examples/item-header.tsx`, `static/item-header.html`

## Link

Use the `asChild` prop to render the item as a link. The hover and focus states will be applied to the anchor element.

> Example `item-link` — `src/examples/item-link.tsx`, `static/item-link.html`

```tsx showLineNumbers
<Item asChild>
  <a href="/dashboard">
    <ItemMedia variant="icon">
      <HomeIcon />
    </ItemMedia>
    <ItemContent>
      <ItemTitle>Dashboard</ItemTitle>
      <ItemDescription>Overview of your account and activity.</ItemDescription>
    </ItemContent>
  </a>
</Item>
```

## Dropdown

> Example `item-dropdown` — `src/examples/item-dropdown.tsx`, `static/item-dropdown.html`

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `item-rtl` — `src/examples/item-rtl.tsx`, `static/item-rtl.html`

## API Reference

### Item

The main component for displaying content with media, title, description, and actions.

| Prop      | Type                                | Default     |
| --------- | ----------------------------------- | ----------- |
| `variant` | `"default" \| "outline" \| "muted"` | `"default"` |
| `size`    | `"default" \| "sm" \| "xs"`         | `"default"` |
| `asChild` | `boolean`                           | `false`     |

### ItemGroup

A container that groups related items together with consistent styling.

```tsx
<ItemGroup>
  <Item />
  <Item />
</ItemGroup>
```

### ItemSeparator

A separator between items in a group.

```tsx
<ItemGroup>
  <Item />
  <ItemSeparator />
  <Item />
</ItemGroup>
```

### ItemMedia

Use `ItemMedia` to display media content such as icons, images, or avatars.

| Prop      | Type                             | Default     |
| --------- | -------------------------------- | ----------- |
| `variant` | `"default" \| "icon" \| "image"` | `"default"` |

```tsx
<ItemMedia variant="icon">
  <Icon />
</ItemMedia>
```

```tsx
<ItemMedia variant="image">
  <img src="..." alt="..." />
</ItemMedia>
```

### ItemContent

Wraps the title and description of the item.

```tsx
<ItemContent>
  <ItemTitle>Title</ItemTitle>
  <ItemDescription>Description</ItemDescription>
</ItemContent>
```

### ItemTitle

Displays the title of the item.

```tsx
<ItemTitle>Item Title</ItemTitle>
```

### ItemDescription

Displays the description of the item.

```tsx
<ItemDescription>Item description</ItemDescription>
```

### ItemActions

Container for action buttons or other interactive elements.

```tsx
<ItemActions>
  <Button>Action</Button>
</ItemActions>
```

### ItemHeader

Displays a header above the item content.

```tsx
<Item>
  <ItemHeader>Header</ItemHeader>
  <ItemContent>...</ItemContent>
</Item>
```

### ItemFooter

Displays a footer below the item content.

```tsx
<Item>
  <ItemContent>...</ItemContent>
  <ItemFooter>Footer</ItemFooter>
</Item>
```

## Files

- `src/ui/item.tsx` — the ui file as the registry installs it
- `src/examples/item-demo.tsx`
- `src/examples/item-variant.tsx`
- `src/examples/item-size.tsx`
- `src/examples/item-icon.tsx`
- `src/examples/item-avatar.tsx`
- `src/examples/item-image.tsx`
- `src/examples/item-group.tsx`
- `src/examples/item-header.tsx`
- `src/examples/item-link.tsx`
- `src/examples/item-dropdown.tsx`
- `src/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/item
