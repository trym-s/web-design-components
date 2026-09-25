# Service Monitoring Dashboard

Always-on analytics with a triage rail: status-colored tiles with sparklines, multi-series time charts over a switchable window, and an independently scrolling alert column that folds into the content when narrow. Monitoring, uptime, health, latency, alerting, incidents, or observability.

## Classification

- Category: `page` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS snapshot
- Framework: react
- Entry point: `src/page.tsx`
- Nature: structural; reuse the page composition, hierarchy and density, not its sample data.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Always-on analytics with a triage rail: status-colored tiles with sparklines, multi-series time charts over a switchable window, and an independently scrolling alert column that folds into the content when narrow.
- Provides: full-page layout composed from 15 Astryx components
- Requires: React 19 with `@astryxdesign/core` and a theme, or `static/page.html` with `ui/_sources/astryx/frame.css`
- Variants: default
- Upstream: Astryx template · Dashboard - Monitoring

## How an agent uses this reference

- **React 19 target** — install `@astryxdesign/core` + a theme and copy the example from
  `src/examples/` as-is, or read `src/` to own the component (upstream calls this "swizzle").
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the
  rendered DOM of each example with every class resolved by the local stylesheets in
  `ui/_sources/astryx/` (`frame.css` pulls fonts, reset, component CSS and all seven themes).
  Keep the markup, the `data-astryx-theme` wrapper and the `--*` tokens; re-implement behavior
  from the Props / Accessibility sections below, never from the minified class names.
- Design rules shared by every component: `ui/_sources/astryx/docs/` (principles, tokens, color,
  spacing, typography, motion, layout).

## Components used

- Badge
- Card
- Divider
- EmptyState
- Grid
- Icon
- Layout
- List
- SegmentedControl
- Selector
- StatusDot
- Text
- Timestamp
- Token
- hooks

## Files

- `src/page.tsx`
- `src/template.doc.mjs`
- `static/page.html` — rendered markup
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/templates/dashboard-alert-rail
