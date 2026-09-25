# Avatar

An image element with a fallback for representing the user.

## Classification

- Category: `content` — structural
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `upstream/ui/avatar.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: An image element with a fallback for representing the user.
- Provides: avatar with 9 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: avatar-demo, avatar-basic, avatar-badge, avatar-badge-icon, avatar-group, avatar-group-count, avatar-group-count-icon, avatar-size, avatar-dropdown
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add avatar`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/avatar.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `upstream/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `avatar-demo` — `upstream/examples/avatar-demo.tsx`, `static/avatar-demo.html`

## Installation

```bash
npx shadcn@latest add avatar
```

- Install the following dependencies:

```bash
npm install radix-ui
```

- Copy and paste the following code into your project.

Source: `components/ui/avatar.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx showLineNumbers
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
```

```tsx showLineNumbers
<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
```

## Composition

Use the following composition to build an `Avatar`:

```text
Avatar
├── AvatarImage
├── AvatarFallback
└── AvatarBadge
```

Use the following composition to build an `AvatarGroup`:

```text
AvatarGroup
├── Avatar
│   ├── AvatarImage
│   ├── AvatarFallback
│   └── AvatarBadge
├── Avatar
│   ├── AvatarImage
│   ├── AvatarFallback
│   └── AvatarBadge
└── AvatarGroupCount
```

## Basic

A basic avatar component with an image and a fallback.

> Example `avatar-basic` — `upstream/examples/avatar-basic.tsx`, `static/avatar-basic.html`

## Badge

Use the `AvatarBadge` component to add a badge to the avatar. The badge is positioned at the bottom right of the avatar.

> Example `avatar-badge` — `upstream/examples/avatar-badge.tsx`, `static/avatar-badge.html`

Use the `className` prop to add custom styles to the badge such as custom colors, sizes, etc.

```tsx showLineNumbers
<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
  <AvatarBadge className="bg-green-600 dark:bg-green-800" />
</Avatar>
```

## Badge with Icon

You can also use an icon inside `<AvatarBadge>`.

> Example `avatar-badge-icon` — `upstream/examples/avatar-badge-icon.tsx`, `static/avatar-badge-icon.html`

## Avatar Group

Use the `AvatarGroup` component to add a group of avatars.

> Example `avatar-group` — `upstream/examples/avatar-group.tsx`, `static/avatar-group.html`

## Avatar Group Count

Use `<AvatarGroupCount>` to add a count to the group.

> Example `avatar-group-count` — `upstream/examples/avatar-group-count.tsx`, `static/avatar-group-count.html`

## Avatar Group with Icon

You can also use an icon inside `<AvatarGroupCount>`.

> Example `avatar-group-count-icon` — `upstream/examples/avatar-group-count-icon.tsx`, `static/avatar-group-count-icon.html`

## Sizes

Use the `size` prop to change the size of the avatar.

> Example `avatar-size` — `upstream/examples/avatar-size.tsx`, `static/avatar-size.html`

## Dropdown

You can use the `Avatar` component as a trigger for a dropdown menu.

> Example `avatar-dropdown` — `upstream/examples/avatar-dropdown.tsx`, `static/avatar-dropdown.html`

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `avatar-rtl` — `upstream/examples/avatar-rtl.tsx`, `static/avatar-rtl.html`

## API Reference

### Avatar

The `Avatar` component is the root component that wraps the avatar image and fallback.

| Prop        | Type                        | Default     |
| ----------- | --------------------------- | ----------- |
| `size`      | `"default" \| "sm" \| "lg"` | `"default"` |
| `className` | `string`                    | -           |

### AvatarImage

The `AvatarImage` component displays the avatar image. It accepts all Radix UI Avatar Image props.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `src`       | `string` | -       |
| `alt`       | `string` | -       |
| `className` | `string` | -       |

### AvatarFallback

The `AvatarFallback` component displays a fallback when the image fails to load. It accepts all Radix UI Avatar Fallback props.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `className` | `string` | -       |

### AvatarBadge

The `AvatarBadge` component displays a badge indicator on the avatar, typically positioned at the bottom right.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `className` | `string` | -       |

### AvatarGroup

The `AvatarGroup` component displays a group of avatars with overlapping styling.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `className` | `string` | -       |

### AvatarGroupCount

The `AvatarGroupCount` component displays a count indicator in an avatar group, typically showing the number of additional avatars.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `className` | `string` | -       |

For more information about Radix UI Avatar props, see the [Radix UI documentation](https://www.radix-ui.com/primitives/docs/components/avatar#api-reference).

## Files

- `upstream/ui/avatar.tsx` — the ui file as the registry installs it
- `upstream/examples/avatar-demo.tsx`
- `upstream/examples/avatar-basic.tsx`
- `upstream/examples/avatar-badge.tsx`
- `upstream/examples/avatar-badge-icon.tsx`
- `upstream/examples/avatar-group.tsx`
- `upstream/examples/avatar-group-count.tsx`
- `upstream/examples/avatar-group-count-icon.tsx`
- `upstream/examples/avatar-size.tsx`
- `upstream/examples/avatar-dropdown.tsx`
- `upstream/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/avatar
