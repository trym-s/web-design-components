# Stepper

Steppers display progress through a sequence of logical and numbered steps. Use them for multi-step workflows like forms, onboarding flows, or checkout processes where users need to see their position and the steps ahead. Rendered as an ordered list (not a navigation landmark).

## Classification

- Category: `navigation` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/Stepper.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Steppers display progress through a sequence of logical and numbered steps.
- Avoid when: Use a stepper for fewer than 3 steps; a simple heading or progress bar works better. Use more than 7 steps; consider grouping related steps or using a different pattern.
- Provides: Stepper, Frame, Compact summary, Step, Progress bar, Connector, Indicator, Label, Description
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: StepperShowcase, StepperCustomContent, StepperIndicatorModes, StepperOnTrackHorizontal, StepperOnTrackVertical, StepperStatus, StepperWidthResponsiveCollapse
- Upstream: Astryx core · Navigation
- Keywords: stepper, steps, wizard, workflow, progress, multi-step, form wizard, onboarding

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

- `src/examples/StepperShowcase.tsx` — Stepper — Checkout Progress: The default stepper: a horizontal track where every step owns an equal segment of the progress bar above its label. The default auto indicator resolves itself per step: a check once the step is done, a ring on the current step, a number for the ones still ahead. Click any step to jump. · static: `static/StepperShowcase.html`
- `src/examples/StepperCustomContent.tsx` — Stepper — Custom Content: A vertical stepper where each step owns a slice of the page. The content slot takes any node (form fields, a summary panel, a banner), so a stepper is not limited to multi-step forms. Rendering the slot only for the active step is what makes the flow expand one step at a time. · static: `static/StepperCustomContent.html`
- `src/examples/StepperIndicatorModes.tsx` — Stepper — Indicator Modes: The indicator prop side by side: none (the bar and label carry the progress on their own), auto (check when done, ring when current, number ahead), always-number, and a custom icon per step. · static: `static/StepperIndicatorModes.html`
- `src/examples/StepperOnTrackHorizontal.tsx` — Stepper — On-Track Horizontal: The on-track layout in horizontal orientation: instead of sitting beside the label, each indicator is slotted into the connector itself, so the numbered nodes read as beads on one continuous line. Labels center under their node. · static: `static/StepperOnTrackHorizontal.html`
- `src/examples/StepperOnTrackVertical.tsx` — Stepper — On-Track Vertical: The on-track layout in vertical orientation: indicators sit inline on a continuous connector rail, with each label and description beside its node. Compare with the separated layout, where the indicator sits alongside its own bar segment instead of on a shared rail. · static: `static/StepperOnTrackVertical.html`
- `src/examples/StepperStatus.tsx` — Stepper — Validation Status: Semantic status per step in a verification flow: success shows a green check, error a red glyph, accent the in-progress step. Status sets the indicator color and glyph only, never the connector, and is announced to assistive tech as text. · static: `static/StepperStatus.html`
- `src/examples/StepperWidthResponsiveCollapse.tsx` — Stepper — Horizontal Narrow Collapsed: A narrow horizontal stepper using horizontalOptions. At 320px wide, four steps fall below the 112px minimumStepWidth and collapse into a current-step summary with Previous and Next controls. · static: `static/StepperWidthResponsiveCollapse.html`

## Documentation

### Stepper

Steppers display progress through a sequence of logical and numbered steps. Use them for multi-step workflows like forms, onboarding flows, or checkout processes where users need to see their position and the steps ahead. Rendered as an ordered list (not a navigation landmark).

**Do**

- Keep step labels short and descriptive: "Payment" not "Enter your payment information".
- Use the vertical orientation when steps carry longer descriptions. A horizontal stepper handles narrow containers itself: once the frame gives each step less than horizontalOptions.minimumStepWidth (112px by default) it drops the labels for a segmented track and uses the configured collapsedVariant beneath it.
- Set horizontalOptions.collapsedVariant to 'withLabel' when the page already supplies Back/Continue, or to 'hiddenLabel' when surrounding UI owns both the current-step heading and navigation and only a bare progress track is needed.
- Provide onStepClick for non-linear workflows where users may need to revisit earlier steps.
- Use status only to apply a semantic color (accent/success/warning/error); pass a custom icon for richer indicators.

**Don't**

- Use a stepper for fewer than 3 steps; a simple heading or progress bar works better.
- Use more than 7 steps; consider grouping related steps or using a different pattern.

**Anatomy**

- Stepper (required) — The ordered list holding the steps. Owns the orientation and the indicator placement the whole flow is laid out on.
- Frame (required) — The layout frame that groups the ordered steps with the optional compact summary shown at narrow widths.
- Compact summary — The optional row a horizontal Stepper adds directly beneath the track once it is too narrow to label every step. horizontalOptions.collapsedVariant chooses a label with Previous/Next controls, the label alone, or no row for a bare progress track. The on-track layout keeps its indicators on the rail instead of repeating the active indicator beside the label. Every step keeps its name in the accessible sequence at any width.
- Step (required) — One step in the flow, and the element carrying its status. Wraps the indicator, label, description, and the track segments belonging to it.
- Progress bar (required) — A 4px segmented bar per step. Filled for completed and active steps. Advancing one step grows the fill along the track it just covered, so the movement reads as progress rather than a bar changing color. Every other change applies at once: going back, jumping forward by more than one step, mounting mid-flow, and any change at all under prefers-reduced-motion. Where a span is drawn by more than one segment (the on-track layouts split it between two steps, three when a content slot sits between them), the segments run in track order at one constant speed, so the fill reads as a single line growing rather than pieces lighting in turn.
- Connector — The track drawn between indicators in the on-track layouts. Each connector paints an unfilled line and, over it, the accent fill covering the progress made. How many pieces a connector is drawn from is an implementation detail of the layout, not a themeable part; use --step-connector-gap to hold the track off the indicator.
- Indicator — A numbered badge, a check, or any custom icon. Controlled via the indicator prop.
- Label (required) — Text identifying the step.
- Description — Supporting text below the label with additional context.

**Theming variables**

- `--step-connector-gap` — Gap a connector leaves where it meets the indicator, spent on the side facing it. Applies to the on-track layouts, whose connector is drawn as one segment either side of the node; 0 leaves the track running unbroken through it. (default `0px`)

Styling hook class: `.astryx-stepper`, `.astryx-stepper-frame`, `.astryx-stepper-summary`, `.astryx-step`, `.astryx-step-indicator`, `.astryx-step-label`, `.astryx-step-description`, `.astryx-step-bar`, `.astryx-step-connector`

### Stepper

步骤器显示通过一系列逻辑编号步骤的进度。用于多步骤工作流程，如表单、入职流程或结账流程。

**Do**

- 保持步骤标签简短和描述性。
- 当步骤有较长描述时使用垂直方向。水平步骤器会自行处理窄容器：当每个步骤的可用宽度不足 horizontalOptions.minimumStepWidth（默认为 112px）时，它会收起标签，并按 collapsedVariant 显示紧凑内容。
- 当页面已有返回/继续控件时，将 horizontalOptions.collapsedVariant 设为 'withLabel'；当周围界面同时提供当前步骤标题和导航、只需要裸进度轨道时，将其设为 'hiddenLabel'。
- 为非线性工作流程提供 onStepClick。

**Don't**

- 少于3个步骤时使用步骤器。
- 超过7个步骤时使用步骤器。

**Theming variables**

- `--step-connector-gap` — 连接线与指示器相接处留出的间隙，落在朝向指示器的一侧。适用于 on-track 布局——其连接线由节点两侧各一段绘制；取 0 时轨道将不间断地穿过节点。 (default `0px`)

Styling hook class: `.astryx-stepper`, `.astryx-stepper-frame`, `.astryx-stepper-summary`, `.astryx-step`, `.astryx-step-indicator`, `.astryx-step-label`, `.astryx-step-description`, `.astryx-step-bar`, `.astryx-step-connector`

## Files

- `src/Stepper.doc.mjs`
- `src/Stepper.spec.md`
- `src/Stepper.tsx`
- `src/StepperContext.ts`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Stepper
