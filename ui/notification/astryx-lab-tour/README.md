# Tour

Use a Tour to introduce a feature or onboard a user through a few key parts of the UI. Compose it from TourStep children, each pointing at an element via targetRef; the Tour advances through them with Next/Back and ends on Done. It is controlled: keep isActive in your own state and persist "has seen this tour" yourself (the component only reports dismissal via onDismiss). Built on the existing Popover/Layer anchoring and overlay tokens rather than a bespoke positioning engine.

## Classification

- Category: `notification` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/Tour.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Use a Tour to introduce a feature or onboard a user through a few key parts of the UI.
- Avoid when: Gate essential, must-see information behind a tour step; users can dismiss it; put critical info inline. Use a tour as a substitute for clear UI; fix confusing interfaces rather than narrating them.
- Provides: Tour
- Requires: React 19 with `@astryxdesign/lab` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: Tour
- Upstream: Astryx lab (experimental, canary-only upstream) · Feedback & Status
- Keywords: tour, nux, onboarding, walkthrough, product tour, coachmark, spotlight, guide, feature step, step

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

## Examples

- `upstream/stories/Tour.stories.tsx` — Storybook — Tour

## Documentation

### Tour

Use a Tour to introduce a feature or onboard a user through a few key parts of the UI. Compose it from TourStep children, each pointing at an element via targetRef; the Tour advances through them with Next/Back and ends on Done. It is controlled: keep isActive in your own state and persist "has seen this tour" yourself (the component only reports dismissal via onDismiss). Built on the existing Popover/Layer anchoring and overlay tokens rather than a bespoke positioning engine.

**Do**

- Keep tours short: a few high-value steps. Long tours get skipped.
- Persist completion yourself (from onDismiss) so a user does not see the same tour on every visit.
- Point each step at a stable, visible element; ensure the target is on-screen before its step becomes active.

**Don't**

- Gate essential, must-see information behind a tour step; users can dismiss it; put critical info inline.
- Use a tour as a substitute for clear UI; fix confusing interfaces rather than narrating them.

## Files

- `upstream/Tour.doc.mjs`
- `upstream/Tour.tsx`
- `upstream/TourContext.ts`
- `upstream/TourStep.tsx`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://facebook.github.io/astryx/storybook/
