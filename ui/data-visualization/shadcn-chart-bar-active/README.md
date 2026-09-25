# Chart Bar Active

A bar chart with an active bar

## Classification

- Category: `data-visualization` — structural
- Medium: React + TypeScript + Tailwind CSS v4 + Recharts (new-york-v4 `chart` and `card`); static HTML + compiled CSS
- Framework: react
- Entry point: `upstream/chart-bar-active.tsx`
- Nature: structural; reuse the chart form, encoding and card framing, not the sample data.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: A bar chart with an active bar.
- Provides: bar chart
- Requires: React with Recharts, Tailwind v4 and the shadcn `--chart-*` tokens, or `static/chart-bar-active.html` with `ui/_sources/shadcn/styles.css` (a static SVG snapshot)
- Variants: default
- Upstream: shadcn/ui charts · bar
- Preferred install: `npx shadcn@latest add chart-bar-active`
- Registry: https://ui.shadcn.com/r/styles/new-york-v4/chart-bar-active.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `upstream/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Files

- `upstream/chart-bar-active.tsx`
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/charts/bar#chart-bar-active
