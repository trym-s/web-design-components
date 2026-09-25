# Marker

Displays an inline status, system note, bordered row, or labeled separator in a conversation.

## Classification

- Category: `content` — structural
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `src/ui/marker.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: Displays an inline status, system note, bordered row, or labeled separator in a conversation.
- Provides: marker with 8 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: marker-demo, marker-variants, marker-status, marker-shimmer, marker-separator, marker-border, marker-icon, marker-link-button
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add marker`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/marker.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `src/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `marker-demo` (radix-rhea) — `src/examples/marker-demo.tsx`, `static/marker-demo.html`

The `Marker` component displays inline conversation markers such as status updates, system notes, bordered rows, and labeled separators. Compose it with [`Message`](/docs/components/message) in a conversation thread.

## Installation

```bash
npx shadcn@latest add marker
```

- Copy and paste the following code into your project.

Source: `components/ui/marker.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx showLineNumbers
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"
```

```tsx showLineNumbers
<Marker>
  <MarkerIcon>
    <CheckIcon />
  </MarkerIcon>
  <MarkerContent>Explored 4 files</MarkerContent>
</Marker>
```

## Composition

Use the following composition to build a marker:

```text
Marker
├── MarkerIcon
└── MarkerContent
```

## Features

- Inline marker, bordered row, and labeled separator variants
- Decorative icon slot that is hidden from assistive tech
- Polymorphic root via `asChild` for link and button markers
- Pairs with the [`shimmer`](/docs/utils/shimmer) utility for streaming status text
- Customizable styling through the `className` prop on every part

## Variants

Use `variant` to switch between an inline marker, bordered row, and labeled separator.

> Example `marker-variants` (radix-rhea) — `src/examples/marker-variants.tsx`, `static/marker-variants.html`

| Variant     | Description                                          |
| ----------- | ---------------------------------------------------- |
| `default`   | An inline marker for status, notes, and actions.     |
| `border`    | A default marker with a bottom border under the row. |
| `separator` | A centered label with divider lines on each side.    |

## Status

Set `role="status"` and include a [`Spinner`](/docs/components/spinner) for streaming or in-progress markers so updates are announced.

> Example `marker-status` (radix-rhea) — `src/examples/marker-status.tsx`, `static/marker-status.html`

## Shimmer

Add the [`shimmer`](/docs/utils/shimmer) utility class to `MarkerContent` for an animated streaming-text effect. The utility ships with the `shadcn` package — see the shimmer docs for installation.

> Example `marker-shimmer` (radix-rhea) — `src/examples/marker-shimmer.tsx`, `static/marker-shimmer.html`

## Separator

Use the `separator` variant for labeled dividers, such as dates or section breaks, in a conversation.

> Example `marker-separator` (radix-rhea) — `src/examples/marker-separator.tsx`, `static/marker-separator.html`

## Border

Use the `border` variant for status rows that should keep the default marker alignment while separating the next row.

> Example `marker-border` (radix-rhea) — `src/examples/marker-border.tsx`, `static/marker-border.html`

## With Icon

Use `MarkerIcon` to render an icon alongside the content. Use `flex-col` to stack the icon above the content.

> Example `marker-icon` (radix-rhea) — `src/examples/marker-icon.tsx`, `static/marker-icon.html`

## Links and Buttons

Turn a marker into a link or button with the `asChild` prop on `Marker`.

> Example `marker-link-button` (radix-rhea) — `src/examples/marker-link-button.tsx`, `static/marker-link-button.html`

```tsx showLineNumbers
import { Marker, MarkerContent } from "@/components/ui/marker"

export function MarkerLinkDemo() {
  return (
    <Marker asChild>
      <a href="#">
        <MarkerContent>View the pull request</MarkerContent>
      </a>
    </Marker>
  )
}
```

## Accessibility

`Marker` is presentational by default. The correct semantics depend on how you use it, so choose the role based on intent rather than relying on a single default.

### Status and Progress

For streaming or progress markers such as "Thinking..." or a running tool, set `role="status"` so assistive tech announces the update as it appears. `Marker` forwards `role` to the underlying element.

```tsx showLineNumbers
<Marker role="status">
  <MarkerIcon>
    <Spinner />
  </MarkerIcon>
  <MarkerContent>Compacting conversation</MarkerContent>
</Marker>
```

### Labeled Separators

A separator that carries text, such as a date or a section label, needs no role. The divider lines are decorative CSS pseudo-elements, and the text is announced as ordinary content.

```tsx showLineNumbers
<Marker variant="separator">
  <MarkerContent>Today</MarkerContent>
</Marker>
```

> Note:
  **Note:** Do not add `role="separator"` to a labeled divider. A separator
  takes its accessible name from `aria-label`, not from its text, and its
  contents are treated as presentational, so the visible label would not be
  announced. Reserve `role="separator"` for a divider with no meaningful text.

### Bordered Markers

A bordered marker keeps the same semantics as the default marker. The bottom border is decorative, so choose `role="status"`, `asChild`, or no role based on the marker's purpose.

```tsx showLineNumbers
<Marker variant="border">
  <MarkerIcon>
    <FileTextIcon />
  </MarkerIcon>
  <MarkerContent>Opened implementation notes</MarkerContent>
</Marker>
```

### Decorative Icons

`MarkerIcon` is decorative and hidden from assistive tech with `aria-hidden`, so the adjacent `MarkerContent` carries the meaning. For an icon-only marker, provide an `aria-label` or visible text so it is not announced as empty.

```tsx showLineNumbers
<Marker aria-label="Synced">
  <MarkerIcon>
    <CheckIcon />
  </MarkerIcon>
</Marker>
```

### Interactive Markers

When a marker links or triggers an action, render it as a real `<button>` or `<a>` with the `asChild` prop so it is focusable and exposes the correct role. The accessible name comes from the marker text.

```tsx showLineNumbers
<Marker asChild>
  <a href="/files">
    <MarkerIcon>
      <FileTextIcon />
    </MarkerIcon>
    <MarkerContent>Explored 4 files</MarkerContent>
  </a>
</Marker>
```

## API Reference

### Marker

The root marker element. The file also exports `markerVariants` for composing the marker styles into custom components.

| Prop        | Type                                   | Default     | Description                                      |
| ----------- | -------------------------------------- | ----------- | ------------------------------------------------ |
| `variant`   | `"default" \| "border" \| "separator"` | `"default"` | The marker layout.                               |
| `asChild`   | `boolean`                              | `false`     | Render as the child element, such as a link.     |
| `className` | `string`                               | -           | Additional classes to apply to the root element. |

### MarkerIcon

A decorative icon slot. Hidden from assistive tech with `aria-hidden`.

| Prop        | Type     | Default | Description                                   |
| ----------- | -------- | ------- | --------------------------------------------- |
| `className` | `string` | -       | Additional classes to apply to the icon slot. |

### MarkerContent

The marker text content.

| Prop        | Type     | Default | Description                                      |
| ----------- | -------- | ------- | ------------------------------------------------ |
| `className` | `string` | -       | Additional classes to apply to the content slot. |

## Files

- `src/ui/marker.tsx` — the ui file as the registry installs it
- `src/examples/marker-demo.tsx`
- `src/examples/marker-variants.tsx`
- `src/examples/marker-status.tsx`
- `src/examples/marker-shimmer.tsx`
- `src/examples/marker-separator.tsx`
- `src/examples/marker-border.tsx`
- `src/examples/marker-icon.tsx`
- `src/examples/marker-link-button.tsx`
- `src/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/marker
