# Sidebar 15

A left and right sidebar.

## Classification

- Category: `layout` — structural
- Medium: React + TypeScript + Tailwind CSS v4 (new-york-v4); static HTML + compiled CSS snapshot
- Framework: react
- Entry point: `upstream/page.tsx`
- Nature: structural; reuse the page composition, hierarchy and density, not its sample data.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: A left and right sidebar.
- Provides: sidebar, dashboard block — 11 files
- Requires: React with Tailwind v4 and the shadcn tokens, or `static/sidebar-15.html` with `ui/_sources/shadcn/styles.css`
- Variants: default
- Upstream: shadcn/ui block · sidebar, dashboard
- Preferred install: `npx shadcn@latest add sidebar-15`
- Registry: https://ui.shadcn.com/r/styles/new-york-v4/sidebar-15.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `upstream/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Files

- `upstream/components/calendars.tsx`
- `upstream/components/date-picker.tsx`
- `upstream/components/nav-favorites.tsx`
- `upstream/components/nav-main.tsx`
- `upstream/components/nav-secondary.tsx`
- `upstream/components/nav-user.tsx`
- `upstream/components/nav-workspaces.tsx`
- `upstream/components/sidebar-left.tsx`
- `upstream/components/sidebar-right.tsx`
- `upstream/components/team-switcher.tsx`
- `upstream/page.tsx`
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/view/new-york-v4/sidebar-15
