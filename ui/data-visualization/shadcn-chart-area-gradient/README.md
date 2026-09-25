# Chart Area Gradient

An area chart with gradient fill

## Classification

- Category: `data-visualization` — structural
- Medium: React + TypeScript + Tailwind CSS v4 + Recharts (new-york-v4 `chart` and `card`); static HTML + compiled CSS
- Framework: react
- Entry point: `upstream/chart-area-gradient.tsx`
- Nature: structural; reuse the chart form, encoding and card framing, not the sample data.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: An area chart with gradient fill.
- Provides: area chart
- Requires: React with Recharts, Tailwind v4 and the shadcn `--chart-*` tokens, or `static/chart-area-gradient.html` with `ui/_sources/shadcn/styles.css` (a static SVG snapshot)
- Variants: default
- Upstream: shadcn/ui charts · area
- Preferred install: `npx shadcn@latest add chart-area-gradient`
- Registry: https://ui.shadcn.com/r/styles/new-york-v4/chart-area-gradient.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `upstream/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Files

- `upstream/chart-area-gradient.tsx`
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/charts/area#chart-area-gradient
