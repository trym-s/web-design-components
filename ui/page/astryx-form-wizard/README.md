# Form Wizard

Linear multi-step form that moves through one panel at a time, with a horizontal progress track pinned above rather than running down a rail, so every step keeps the full content width for its fields. Only the current step renders, unlike an accordion where each section expands into one long scrolling form. Each advance is validated, and a step left broken stays flagged to jump back to. Wizard, stepper, multi-step, onboarding, setup, signup, or guided flow.

## Classification

- Category: `page` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS snapshot
- Framework: react
- Entry point: `upstream/page.tsx`
- Nature: structural; reuse the page composition, hierarchy and density, not its sample data.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Linear multi-step form that moves through one panel at a time, with a horizontal progress track pinned above rather than running down a rail, so every step keeps the full content width for its fields.
- Provides: full-page layout composed from 23 Astryx components
- Requires: React 19 with `@astryxdesign/core` and a theme, or `static/page.html` with `ui/_sources/astryx/frame.css`
- Variants: default
- Upstream: Astryx template · Form - Wizard

## How an agent uses this reference

- **React 19 target** — install `@astryxdesign/core` + a theme and copy the example from
  `upstream/examples/` as-is, or read `upstream/` to own the component (upstream calls this "swizzle").
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the
  rendered DOM of each example with every class resolved by the local stylesheets in
  `ui/_sources/astryx/` (`frame.css` pulls fonts, reset, component CSS and all seven themes).
  Keep the markup, the `data-astryx-theme` wrapper and the `--*` tokens; re-implement behavior
  from the Props / Accessibility sections below, never from the minified class names.
- Design rules shared by every component: `ui/_sources/astryx/docs/` (principles, tokens, color,
  spacing, typography, motion, layout).

## Components used

- Badge
- Banner
- Button
- Card
- CheckboxInput
- CheckboxList
- Divider
- Field
- FormLayout
- Grid
- Layout
- MetadataList
- NumberInput
- RadioList
- SelectableCard
- Selector
- Stack
- Stepper
- Switch
- Text
- TextArea
- TextInput
- hooks

## Files

- `upstream/page.tsx`
- `upstream/template.doc.mjs`
- `static/page.html` — rendered markup
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/templates/form-wizard
