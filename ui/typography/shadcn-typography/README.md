# Typography

Styles for headings, paragraphs, lists, etc.

## Classification

- Category: `typography` — structural
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `upstream/examples/typography-demo.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: Styles for headings, paragraphs, lists, etc.
- Provides: composition pattern with 14 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: typography-demo, typography-h1, typography-h2, typography-h3, typography-h4, typography-p, typography-blockquote, typography-table, typography-list, typography-inline-code, typography-lead, typography-large, typography-small, typography-muted
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add typography`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/typography.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `upstream/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

We do not ship any typography styles by default. This page is an example of how you can use utility classes to style your text.

> Example `typography-demo` — `upstream/examples/typography-demo.tsx`, `static/typography-demo.html`

## h1

> Example `typography-h1` — `upstream/examples/typography-h1.tsx`, `static/typography-h1.html`

## h2

> Example `typography-h2` — `upstream/examples/typography-h2.tsx`, `static/typography-h2.html`

## h3

> Example `typography-h3` — `upstream/examples/typography-h3.tsx`, `static/typography-h3.html`

## h4

> Example `typography-h4` — `upstream/examples/typography-h4.tsx`, `static/typography-h4.html`

## p

> Example `typography-p` — `upstream/examples/typography-p.tsx`, `static/typography-p.html`

## blockquote

> Example `typography-blockquote` — `upstream/examples/typography-blockquote.tsx`, `static/typography-blockquote.html`

## table

> Example `typography-table` — `upstream/examples/typography-table.tsx`, `static/typography-table.html`

## list

> Example `typography-list` — `upstream/examples/typography-list.tsx`, `static/typography-list.html`

## Inline code

> Example `typography-inline-code` — `upstream/examples/typography-inline-code.tsx`, `static/typography-inline-code.html`

## Lead

> Example `typography-lead` — `upstream/examples/typography-lead.tsx`, `static/typography-lead.html`

## Large

> Example `typography-large` — `upstream/examples/typography-large.tsx`, `static/typography-large.html`

## Small

> Example `typography-small` — `upstream/examples/typography-small.tsx`, `static/typography-small.html`

## Muted

> Example `typography-muted` — `upstream/examples/typography-muted.tsx`, `static/typography-muted.html`

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `typography-rtl` — `upstream/examples/typography-rtl.tsx`, `static/typography-rtl.html`

## Files

- `upstream/examples/typography-demo.tsx`
- `upstream/examples/typography-h1.tsx`
- `upstream/examples/typography-h2.tsx`
- `upstream/examples/typography-h3.tsx`
- `upstream/examples/typography-h4.tsx`
- `upstream/examples/typography-p.tsx`
- `upstream/examples/typography-blockquote.tsx`
- `upstream/examples/typography-table.tsx`
- `upstream/examples/typography-list.tsx`
- `upstream/examples/typography-inline-code.tsx`
- `upstream/examples/typography-lead.tsx`
- `upstream/examples/typography-large.tsx`
- `upstream/examples/typography-small.tsx`
- `upstream/examples/typography-muted.tsx`
- `upstream/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/typography
