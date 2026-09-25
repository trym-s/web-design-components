# Toast

A succinct message that is displayed temporarily.

## Classification

- Category: `notification` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `src/examples/undefined.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: A succinct message that is displayed temporarily.
- Provides: composition pattern with 0 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: default
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add toast`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/toast.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `src/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

The toast component has been deprecated. Use the [sonner](/docs/components/radix/sonner) component instead.

## Files


- `src/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/toast
