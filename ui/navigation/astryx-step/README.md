# Step

Individual step within a Stepper. Renders a progress-bar segment, an indicator, and a label with optional description. Progress (completed/active/not-started) is derived from the parent Stepper's activeStep and this step's step index.

## Classification

- Category: `navigation` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/Step.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Individual step within a Stepper.
- Provides: Step
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: StepShowcase, StepContent, StepIndicator, StepStates
- Upstream: Astryx core · Navigation

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

## Examples

- `src/examples/StepShowcase.tsx` — Step: A single Step, with every part it can render: the indicator, the label with its optional marker and trailing endContent, and the description beneath. A Step never sets its own completed/current state. It declares its index and derives the rest from the parent Stepper, so one Step in one Stepper is a complete example. · static: `static/StepShowcase.html`
- `src/examples/StepContent.tsx` — Step — Content Slot: Children passed to a Step render below its description, indented to line up with the label rather than the indicator, and stay outside the clickable label area so buttons inside remain their own targets. In a full flow you gate the slot on the step being active. That is what turns a vertical stepper into an expanding one. · static: `static/StepContent.html`
- `src/examples/StepIndicator.tsx` — Step — Indicator: Everything the indicator prop accepts: the auto default, an always-number badge, a custom ReactNode, and none, each on its own completed Step so the prop is the only difference between them. Every variant occupies the same 16px box, so a step swapping its number for a check as it completes never shifts the label beside it. The last cell shows that a custom node can be live rather than static: a Spinner on a step that is in progress, shaded `inherit` so it picks up the step's own tint like any other glyph. · static: `static/StepIndicator.html`
- `src/examples/StepStates.tsx` — Step — States: Every state a single Step can land in, each shown as one Step in its own Stepper. Completed, current, and upcoming are derived by comparing the step index against the parent activeStep, so they are never set directly; isDisabled and status are the two a step declares itself. Status is a separate axis from progress, which is why a completed step can still carry a warning. · static: `static/StepStates.html`

## Documentation

### Step

Individual step within a Stepper. Renders a progress-bar segment, an indicator, and a label with optional description. Progress (completed/active/not-started) is derived from the parent Stepper's activeStep and this step's step index.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `step` * | `number` |  | Zero-based index of this step. Used to derive progress (completed/active/not-started) relative to the parent activeStep. |
| `label` * | `string` |  | Step label text. Kept to a single line and ellipsized when the step is narrower than the label, so a row of horizontal steps stays the same height and the track under them stays straight. The full string is still read out as part of the step, so a truncated label costs nothing in the accessible name — but short labels survive narrow layouts better. |
| `description` | `string` |  | Optional description shown below the label for additional context. |
| `children` | `ReactNode` |  | Content rendered below the label and description. Useful in vertical steppers for form fields or detailed step content. In a compact horizontal Stepper, the content remains mounted to preserve local state while it is hidden with the expanded step details. |
| `status` | `'accent' \| 'success' \| 'warning' \| 'error'` |  | Semantic color for the step. Controls color only and maps to the global Astryx semantic tokens. Leave unset for the progress-derived default coloring. |
| `indicator` | `'auto' \| 'number' \| 'none' \| ReactNode` | `'auto'` | What to show as the step indicator. 'auto' shows a number until completed then a check, 'number' always shows a numbered badge, 'none' hides it, or pass any ReactNode (e.g. an Icon) for a fully custom indicator. |
| `isDisabled` | `boolean` | `false` | Disables interaction and dims the step indicator and label. |
| `isOptional` | `boolean` | `false` | Marks the step as optional, appending an "Optional" affordance after the label. |
| `endContent` | `ReactNode` |  | Trailing content rendered at the end of the label row. |
| `density` | `'compact' \| 'balanced' \| 'spacious'` |  | Controls vertical padding of the step. Falls back to the stepper-level density when unset. |

## Files

- `src/Step.doc.mjs`
- `src/Step.tsx`
- `src/StepStatus.ts`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Step
