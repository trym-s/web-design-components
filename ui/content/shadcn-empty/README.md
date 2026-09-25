# Empty

Use the Empty component to display an empty state.

## Classification

- Category: `content` — structural
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `upstream/ui/empty.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: Use the Empty component to display an empty state.
- Provides: empty with 7 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: empty-demo, empty-outline, empty-background, empty-avatar, empty-avatar-group, empty-input-group, empty-card
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add empty`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/empty.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `upstream/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `empty-demo` — `upstream/examples/empty-demo.tsx`, `static/empty-demo.html`

## Installation

```bash
npx shadcn@latest add empty
```

- Copy and paste the following code into your project.

Source: `components/ui/empty.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
```

```tsx
<Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <Icon />
    </EmptyMedia>
    <EmptyTitle>No data</EmptyTitle>
    <EmptyDescription>No data found</EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button>Add data</Button>
  </EmptyContent>
</Empty>
```

## Composition

Use the following composition to build an `Empty` state:

```text
Empty
├── EmptyHeader
│   ├── EmptyMedia
│   ├── EmptyTitle
│   └── EmptyDescription
└── EmptyContent
```

## Outline

Use the `border` utility class to create an outline empty state.

> Example `empty-outline` — `upstream/examples/empty-outline.tsx`, `static/empty-outline.html`

## Background

Use the `bg-*` and `bg-gradient-*` utilities to add a background to the empty state.

> Example `empty-background` — `upstream/examples/empty-background.tsx`, `static/empty-background.html`

## Avatar

Use the `EmptyMedia` component to display an avatar in the empty state.

> Example `empty-avatar` — `upstream/examples/empty-avatar.tsx`, `static/empty-avatar.html`

## Avatar Group

Use the `EmptyMedia` component to display an avatar group in the empty state.

> Example `empty-avatar-group` — `upstream/examples/empty-avatar-group.tsx`, `static/empty-avatar-group.html`

## InputGroup

You can add an `InputGroup` component to the `EmptyContent` component.

> Example `empty-input-group` — `upstream/examples/empty-input-group.tsx`, `static/empty-input-group.html`

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `empty-rtl` — `upstream/examples/empty-rtl.tsx`, `static/empty-rtl.html`

## API Reference

### Empty

The main component of the empty state. Wraps the `EmptyHeader` and `EmptyContent` components.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `className` | `string` |         |

```tsx
<Empty>
  <EmptyHeader />
  <EmptyContent />
</Empty>
```

### EmptyHeader

The `EmptyHeader` component wraps the empty media, title, and description.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `className` | `string` |         |

```tsx
<EmptyHeader>
  <EmptyMedia />
  <EmptyTitle />
  <EmptyDescription />
</EmptyHeader>
```

### EmptyMedia

Use the `EmptyMedia` component to display the media of the empty state such as an icon or an image. You can also use it to display other components such as an avatar.

| Prop        | Type                  | Default   |
| ----------- | --------------------- | --------- |
| `variant`   | `"default" \| "icon"` | `default` |
| `className` | `string`              |           |

```tsx
<EmptyMedia variant="icon">
  <Icon />
</EmptyMedia>
```

```tsx
<EmptyMedia>
  <Avatar>
    <AvatarImage src="..." />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
</EmptyMedia>
```

### EmptyTitle

Use the `EmptyTitle` component to display the title of the empty state.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `className` | `string` |         |

```tsx
<EmptyTitle>No data</EmptyTitle>
```

### EmptyDescription

Use the `EmptyDescription` component to display the description of the empty state.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `className` | `string` |         |

```tsx
<EmptyDescription>You do not have any notifications.</EmptyDescription>
```

### EmptyContent

Use the `EmptyContent` component to display the content of the empty state such as a button, input or a link.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `className` | `string` |         |

```tsx
<EmptyContent>
  <Button>Add Project</Button>
</EmptyContent>
```

## Files

- `upstream/ui/empty.tsx` — the ui file as the registry installs it
- `upstream/examples/empty-demo.tsx`
- `upstream/examples/empty-outline.tsx`
- `upstream/examples/empty-background.tsx`
- `upstream/examples/empty-avatar.tsx`
- `upstream/examples/empty-avatar-group.tsx`
- `upstream/examples/empty-input-group.tsx`
- `upstream/examples/empty-card.tsx`
- `upstream/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/empty
