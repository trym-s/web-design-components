# Hover Card

For sighted users to preview content available behind a link.

## Classification

- Category: `overlay` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `src/ui/hover-card.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: For sighted users to preview content available behind a link.
- Provides: hover-card with 2 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: hover-card-demo, hover-card-sides
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add hover-card`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/hover-card.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `src/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `hover-card-demo` — `src/examples/hover-card-demo.tsx`, `static/hover-card-demo.html`

## Installation

```bash
npx shadcn@latest add hover-card
```

- Install the following dependencies:

```bash
npm install radix-ui
```

- Copy and paste the following code into your project.

Source: `components/ui/hover-card.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx showLineNumbers
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
```

```tsx showLineNumbers
<HoverCard>
  <HoverCardTrigger>Hover</HoverCardTrigger>
  <HoverCardContent>
    The React Framework – created and maintained by @vercel.
  </HoverCardContent>
</HoverCard>
```

## Composition

Use the following composition to build a `HoverCard`:

```text
HoverCard
├── HoverCardTrigger
└── HoverCardContent
```

## Trigger Delays

Use `openDelay` and `closeDelay` on the `HoverCard` to control when the card opens and
closes.

```tsx showLineNumbers
<HoverCard openDelay={100} closeDelay={200}>
  <HoverCardTrigger>Hover</HoverCardTrigger>
  <HoverCardContent>Content</HoverCardContent>
</HoverCard>
```

## Positioning

Use the `side` and `align` props on `HoverCardContent` to control placement.

```tsx showLineNumbers
<HoverCard>
  <HoverCardTrigger>Hover</HoverCardTrigger>
  <HoverCardContent side="top" align="start">
    Content
  </HoverCardContent>
</HoverCard>
```

## Basic

> Example `hover-card-demo` — `src/examples/hover-card-demo.tsx`, `static/hover-card-demo.html`

## Sides

> Example `hover-card-sides` — `src/examples/hover-card-sides.tsx`, `static/hover-card-sides.html`

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `hover-card-rtl` — `src/examples/hover-card-rtl.tsx`, `static/hover-card-rtl.html`

## API Reference

See the [Radix UI](https://www.radix-ui.com/docs/primitives/components/hover-card#api-reference) documentation for more information.

## Files

- `src/ui/hover-card.tsx` — the ui file as the registry installs it
- `src/examples/hover-card-demo.tsx`
- `src/examples/hover-card-sides.tsx`
- `src/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/hover-card
