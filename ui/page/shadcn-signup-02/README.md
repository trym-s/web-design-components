# Signup 02

A two column signup page with a cover image.

## Classification

- Category: `page` — structural
- Medium: React + TypeScript + Tailwind CSS v4 (new-york-v4); static HTML + compiled CSS snapshot
- Framework: react
- Entry point: `src/page.tsx`
- Nature: structural; reuse the page composition, hierarchy and density, not its sample data.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: A two column signup page with a cover image.
- Provides: authentication, signup block — 2 files
- Requires: React with Tailwind v4 and the shadcn tokens, or `static/signup-02.html` with `ui/_sources/shadcn/styles.css`
- Variants: default
- Upstream: shadcn/ui block · authentication, signup
- Preferred install: `npx shadcn@latest add signup-02`
- Registry: https://ui.shadcn.com/r/styles/new-york-v4/signup-02.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `src/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Files

- `src/components/signup-form.tsx`
- `src/page.tsx`
- `src/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/view/new-york-v4/signup-02
