# Dashboard 01

A dashboard with sidebar, charts and data table.

## Classification

- Category: `page` — structural
- Medium: React + TypeScript + Tailwind CSS v4 (new-york-v4); static HTML + compiled CSS snapshot
- Framework: react
- Entry point: `src/page.tsx`
- Nature: structural; reuse the page composition, hierarchy and density, not its sample data.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: A dashboard with sidebar, charts and data table.
- Provides: dashboard block — 11 files
- Requires: React with Tailwind v4 and the shadcn tokens, or `static/dashboard-01.html` with `ui/_sources/shadcn/styles.css`
- Variants: default
- Upstream: shadcn/ui block · dashboard
- Preferred install: `npx shadcn@latest add dashboard-01`
- Registry: https://ui.shadcn.com/r/styles/new-york-v4/dashboard-01.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `src/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Files

- `src/components/app-sidebar.tsx`
- `src/components/chart-area-interactive.tsx`
- `src/components/data-table.tsx`
- `src/components/nav-documents.tsx`
- `src/components/nav-main.tsx`
- `src/components/nav-secondary.tsx`
- `src/components/nav-user.tsx`
- `src/components/section-cards.tsx`
- `src/components/site-header.tsx`
- `src/data.json`
- `src/page.tsx`
- `src/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/view/new-york-v4/dashboard-01
