# File Upload List

A list of files being uploaded with per-file progress and actions.

## Classification

- Category: `input` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `upstream/examples/file-upload-list.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: A list of files being uploaded with per-file progress and actions.
- Provides: composition pattern with 1 documented example
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: file-upload-list
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add file-upload-list`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/file-upload-list.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `upstream/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

Not yet documented on the site; the examples below are the repository's demos.

## Files

- `upstream/examples/file-upload-list.tsx`
- `upstream/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://github.com/shadcn-ui/ui/tree/main/apps/v4/examples/radix (not yet on the docs site)
