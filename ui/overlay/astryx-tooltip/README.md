# Tooltip

A short text hint that appears on hover or focus, anchored to a trigger element. Use it to describe icon-only buttons, show the full text of truncated labels, or provide supplementary context without cluttering the UI.

## Classification

- Category: `overlay` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/Tooltip.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: A short text hint that appears on hover or focus, anchored to a trigger element.
- Avoid when: Place interactive elements like links or buttons inside a tooltip; use HoverCard or Popover instead. Use tooltips for essential information that users must see to complete a task.
- Provides: Tooltip surface, Tooltip text
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: TooltipShowcase, TooltipActionBarTooltips, TooltipHookUsage, TooltipInlineTextTooltips
- Upstream: Astryx core · Overlay
- Keywords: tooltip, hint, infotip, title, hover, flyout, balloon, helpertext

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

- `src/examples/TooltipShowcase.tsx` — Tooltip · static: `static/TooltipShowcase.html`
- `src/examples/TooltipActionBarTooltips.tsx` — Tooltip — Action Bar: Tooltips on an action button bar with contextual descriptions. · static: `static/TooltipActionBarTooltips.html`
- `src/examples/TooltipHookUsage.tsx` — Tooltip — Hook Usage: Tooltip using the useTooltip hook for programmatic control. · static: `static/TooltipHookUsage.html`
- `src/examples/TooltipInlineTextTooltips.tsx` — Tooltip — Inline Text: Tooltips on inline text terms for definitions. · static: `static/TooltipInlineTextTooltips.html`

## Documentation

### Tooltip

A short text hint that appears on hover or focus, anchored to a trigger element. Use it to describe icon-only buttons, show the full text of truncated labels, or provide supplementary context without cluttering the UI.

**Do**

- Keep tooltip content concise: aim for under 140 characters of plain text.
- Add a tooltip to icon-only buttons and controls that lack a visible label.
- Set touchTrigger to tap when the trigger is a button whose only job is revealing the tooltip, such as an info icon: touch has no hover, and auto keeps the tap for triggers that perform an action.

**Don't**

- Place interactive elements like links or buttons inside a tooltip; use HoverCard or Popover instead.
- Use tooltips for essential information that users must see to complete a task.

**Anatomy**

- Tooltip surface (required) — Painted overlay surface that presents the tooltip.
- Tooltip text (required) — Tooltip content rendered within the surface.

Styling hook class: `.astryx-tooltip`

### Tooltip

A short text hint that appears on hover or focus, anchored to a trigger element. Use it to describe icon-only buttons, show the full text of truncated labels, or provide supplementary context without cluttering the UI.

**Do**

- Keep tooltip content concise: aim for under 140 characters of plain text.
- Add a tooltip to icon-only buttons and controls that lack a visible label.
- Set touchTrigger to tap when the trigger is a button whose only job is revealing the tooltip, such as an info icon: touch has no hover, and auto keeps the tap for triggers that perform an action.

**Don't**

- Place interactive elements like links or buttons inside a tooltip; use HoverCard or Popover instead.
- Use tooltips for essential information that users must see to complete a task.

**Anatomy**

- Tooltip surface (required) — Painted overlay surface that presents the tooltip.
- Tooltip text (required) — Tooltip content rendered within the surface.

Styling hook class: `.astryx-tooltip`

## Files

- `src/Tooltip.doc.mjs`
- `src/Tooltip.spec.md`
- `src/Tooltip.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Tooltip
