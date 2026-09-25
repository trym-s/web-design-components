# Direction

A provider component that sets the text direction for your application.

## Classification

- Category: `utility` — functional
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `src/ui/direction.tsx`
- Nature: functional; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: A provider component that sets the text direction for your application.
- Provides: direction with 0 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: default
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add direction`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/direction.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `src/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

The `DirectionProvider` component is used to set the text direction (`ltr` or `rtl`) for your application. This is essential for supporting right-to-left languages like Arabic, Hebrew, and Persian.

Here's a preview of the component in RTL mode. Use the language selector to switch the language. To see more examples, look for the RTL section on components pages.

> Example `card-rtl` — `src/examples/card-rtl.tsx`, `static/card-rtl.html`

## Installation

```bash
npx shadcn@latest add direction
```

- Install the following dependencies:

```bash
npm install radix-ui
```

- Copy and paste the following code into your project.

Source: `components/ui/direction.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx showLineNumbers
import { DirectionProvider } from "@/components/ui/direction"
```

```tsx showLineNumbers
<html dir="rtl">
  <body>
    <DirectionProvider direction="rtl">
      {/* Your app content */}
    </DirectionProvider>
  </body>
</html>
```

## useDirection

The `useDirection` hook is used to get the current direction of the application.

```tsx showLineNumbers
import { useDirection } from "@/components/ui/direction"

function MyComponent() {
  const direction = useDirection()
  return <div>Current direction: {direction}</div>
}
```

## Files

- `src/ui/direction.tsx` — the ui file as the registry installs it
- `src/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/direction
