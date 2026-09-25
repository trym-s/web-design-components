# Button

Displays a button or a component that looks like a button.

## Classification

- Category: `action-feedback` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `src/ui/button.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: Displays a button or a component that looks like a button.
- Provides: button with 14 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: button-demo, button-size, button-default, button-outline, button-secondary, button-ghost, button-destructive, button-link, button-icon, button-with-icon, button-rounded, button-spinner, button-group-demo, button-aschild
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add button`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/button.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `src/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `button-demo` — `src/examples/button-demo.tsx`, `static/button-demo.html`

## Installation

```bash
npx shadcn@latest add button
```

- Install the following dependencies:

```bash
npm install radix-ui
```

- Copy and paste the following code into your project.

Source: `components/ui/button.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx
import { Button } from "@/components/ui/button"
```

```tsx
<Button variant="outline">Button</Button>
```

## Cursor

Tailwind v4 [switched](https://tailwindcss.com/docs/upgrade-guide#buttons-use-the-default-cursor) from `cursor: pointer` to `cursor: default` for the button component.

If you want to keep the `cursor: pointer` behavior, add the following code to your CSS file:

You can also enable this during project setup with `npx shadcn@latest init --pointer`.

```css showLineNumbers title="globals.css"
@layer base {
  button:not(:disabled),
  [role="button"]:not(:disabled) {
    cursor: pointer;
  }
}
```

## Size

Use the `size` prop to change the size of the button.

> Example `button-size` — `src/examples/button-size.tsx`, `static/button-size.html`

## Default

> Example `button-default` — `src/examples/button-default.tsx`, `static/button-default.html`

## Outline

> Example `button-outline` — `src/examples/button-outline.tsx`, `static/button-outline.html`

## Secondary

> Example `button-secondary` — `src/examples/button-secondary.tsx`, `static/button-secondary.html`

## Ghost

> Example `button-ghost` — `src/examples/button-ghost.tsx`, `static/button-ghost.html`

## Destructive

> Example `button-destructive` — `src/examples/button-destructive.tsx`, `static/button-destructive.html`

## Link

> Example `button-link` — `src/examples/button-link.tsx`, `static/button-link.html`

## Icon

> Example `button-icon` — `src/examples/button-icon.tsx`, `static/button-icon.html`

## With Icon

Remember to add the `data-icon="inline-start"` or `data-icon="inline-end"` attribute to the icon for the correct spacing.

> Example `button-with-icon` — `src/examples/button-with-icon.tsx`, `static/button-with-icon.html`

## Rounded

Use the `rounded-full` class to make the button rounded.

> Example `button-rounded` — `src/examples/button-rounded.tsx`, `static/button-rounded.html`

## Spinner

Render a `<Spinner />` component inside the button to show a loading state. Remember to add the `data-icon="inline-start"` or `data-icon="inline-end"` attribute to the spinner for the correct spacing.

> Example `button-spinner` — `src/examples/button-spinner.tsx`, `static/button-spinner.html`

## Button Group

To create a button group, use the `ButtonGroup` component. See the [Button Group](/docs/components/radix/button-group) documentation for more details.

> Example `button-group-demo` — `src/examples/button-group-demo.tsx`, `static/button-group-demo.html`

## As Child

You can use the `asChild` prop on `<Button />` to make another component look like a button. Here's an example of a link that looks like a button.

> Example `button-aschild` — `src/examples/button-aschild.tsx`, `static/button-aschild.html`

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `button-rtl` — `src/examples/button-rtl.tsx`, `static/button-rtl.html`

## API Reference

### Button

The `Button` component is a wrapper around the `button` element that adds a variety of styles and functionality.

| Prop      | Type                                                                                 | Default     |
| --------- | ------------------------------------------------------------------------------------ | ----------- |
| `variant` | `"default" \| "outline" \| "ghost" \| "destructive" \| "secondary" \| "link"`        | `"default"` |
| `size`    | `"default" \| "xs" \| "sm" \| "lg" \| "icon" \| "icon-xs" \| "icon-sm" \| "icon-lg"` | `"default"` |
| `asChild` | `boolean`                                                                            | `false`     |

## Files

- `src/ui/button.tsx` — the ui file as the registry installs it
- `src/examples/button-demo.tsx`
- `src/examples/button-size.tsx`
- `src/examples/button-default.tsx`
- `src/examples/button-outline.tsx`
- `src/examples/button-secondary.tsx`
- `src/examples/button-ghost.tsx`
- `src/examples/button-destructive.tsx`
- `src/examples/button-link.tsx`
- `src/examples/button-icon.tsx`
- `src/examples/button-with-icon.tsx`
- `src/examples/button-rounded.tsx`
- `src/examples/button-spinner.tsx`
- `src/examples/button-group-demo.tsx`
- `src/examples/button-aschild.tsx`
- `src/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/button
