# Skeleton

Use to show a placeholder while content is loading.

## Classification

- Category: `notification` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `src/ui/skeleton.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: Use to show a placeholder while content is loading.
- Provides: skeleton with 6 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: skeleton-demo, skeleton-avatar, skeleton-card, skeleton-text, skeleton-form, skeleton-table
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add skeleton`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/skeleton.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `src/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `skeleton-demo` — `src/examples/skeleton-demo.tsx`, `static/skeleton-demo.html`

## Installation

```bash
npx shadcn@latest add skeleton
```

- Copy and paste the following code into your project.

Source: `components/ui/skeleton.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx
import { Skeleton } from "@/components/ui/skeleton"
```

```tsx
<Skeleton className="h-[20px] w-[100px] rounded-full" />
```

## Avatar

> Example `skeleton-avatar` — `src/examples/skeleton-avatar.tsx`, `static/skeleton-avatar.html`

## Card

> Example `skeleton-card` — `src/examples/skeleton-card.tsx`, `static/skeleton-card.html`

## Text

> Example `skeleton-text` — `src/examples/skeleton-text.tsx`, `static/skeleton-text.html`

## Form

> Example `skeleton-form` — `src/examples/skeleton-form.tsx`, `static/skeleton-form.html`

## Table

> Example `skeleton-table` — `src/examples/skeleton-table.tsx`, `static/skeleton-table.html`

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `skeleton-rtl` — `src/examples/skeleton-rtl.tsx`, `static/skeleton-rtl.html`

## Files

- `src/ui/skeleton.tsx` — the ui file as the registry installs it
- `src/examples/skeleton-demo.tsx`
- `src/examples/skeleton-avatar.tsx`
- `src/examples/skeleton-card.tsx`
- `src/examples/skeleton-text.tsx`
- `src/examples/skeleton-form.tsx`
- `src/examples/skeleton-table.tsx`
- `src/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/skeleton
