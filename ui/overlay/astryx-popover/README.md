# Popover

A click-triggered overlay anchored to a button or trigger element. Use it for secondary actions, inline confirmations, or supplementary information that does not warrant a full dialog. For hover previews use HoverCard, for brief helper text use Tooltip.

## Classification

- Category: `overlay` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/Popover.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: A click-triggered overlay anchored to a button or trigger element.
- Avoid when: Nest popovers inside other popovers; it creates confusing focus and navigation. Assume input complexity alone determines the presentation; evaluate the task's focus, space, and interaction requirements. Assume scrolling alone means Popover is the wrong component; a bounded Popover may scroll while a focused anchored interaction remains appropriate.
- Provides: Trigger element, Popover surface, Popover content, Fallback close control
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: PopoverShowcase, PopoverBottomSheetAlternative, PopoverConfirmAction, PopoverFilterPanel, PopoverKeyboardShortcuts, PopoverSettingsPanel
- Upstream: Astryx core · Overlay
- Keywords: popover, popup, dropdown, tooltip, overlay, flyout, callout, popper, anchor, floating, bubble

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

- `src/examples/PopoverShowcase.tsx` — Popover · static: `static/PopoverShowcase.html`
- `src/examples/PopoverBottomSheetAlternative.tsx` — Popover — Bottom Sheet Alternative: Opt-in BottomSheet alternative for compact touch surfaces where actions should use a modal presentation anchored to the bottom edge. · static: `static/PopoverBottomSheetAlternative.html`
- `src/examples/PopoverConfirmAction.tsx` — Popover — Confirm Action: Inline confirmation popover for destructive actions with delete and cancel buttons. · static: `static/PopoverConfirmAction.html`
- `src/examples/PopoverFilterPanel.tsx` — Popover — Filter Panel: Popover with checkbox filters and apply/reset actions. · static: `static/PopoverFilterPanel.html`
- `src/examples/PopoverKeyboardShortcuts.tsx` — Popover — Keyboard Shortcuts: Popover displaying a list of keyboard shortcuts with key and description pairs. · static: `static/PopoverKeyboardShortcuts.html`
- `src/examples/PopoverSettingsPanel.tsx` — Popover — Settings Panel: Popover with toggle switches for managing user preferences like notifications, dark mode, and sounds. · static: `static/PopoverSettingsPanel.html`

## Documentation

### Popover

A click-triggered overlay anchored to a button or trigger element. Use it for secondary actions, inline confirmations, or supplementary information that does not warrant a full dialog. For hover previews use HoverCard, for brief helper text use Tooltip.

**Do**

- Keep popover content focused on a single task or piece of information.
- Provide a clear way to close: either by clicking outside or with an explicit close button.
- Theme the painted surface through popover. Existing popover-surface overrides remain supported for compatibility, while new themes use the canonical target.

**Don't**

- Nest popovers inside other popovers; it creates confusing focus and navigation.
- Assume input complexity alone determines the presentation; evaluate the task's focus, space, and interaction requirements.
- Assume scrolling alone means Popover is the wrong component; a bounded Popover may scroll while a focused anchored interaction remains appropriate.

**Anatomy**

- Trigger element (required) — Caller-supplied or externally referenced control that anchors and toggles the popover.
- Popover surface (required) — Painted surface owned by Popover. Theme it through the canonical popover target; popover-surface remains supported as a deprecated compatibility alias.
- Popover content (required) — Caller-supplied content rendered inside the surface.
- Fallback close control — Keyboard-reachable close affordance appended by usePopover when enabled.

Styling hook class: `.astryx-popover`, `.astryx-popover-surface`

### Popover

A click-triggered overlay anchored to a button or trigger element. Use it for secondary actions, inline confirmations, or supplementary information that does not warrant a full dialog. For hover previews use HoverCard, for brief helper text use Tooltip.

**Do**

- Keep popover content focused on a single task or piece of information.
- Provide a clear way to close: either by clicking outside or with an explicit close button.
- Theme the painted surface through popover. Existing popover-surface overrides remain supported for compatibility, while new themes use the canonical target.

**Don't**

- Nest popovers inside other popovers; it creates confusing focus and navigation.
- Assume input complexity alone determines the presentation; evaluate the task's focus, space, and interaction requirements.
- Assume scrolling alone means Popover is the wrong component; a bounded Popover may scroll while a focused anchored interaction remains appropriate.

**Anatomy**

- Trigger element (required) — Caller-supplied or externally referenced control that anchors and toggles the popover.
- Popover surface (required) — Painted surface owned by Popover. Theme it through the canonical popover target; popover-surface remains supported as a deprecated compatibility alias.
- Popover content (required) — Caller-supplied content rendered inside the surface.
- Fallback close control — Keyboard-reachable close affordance appended by usePopover when enabled.

Styling hook class: `.astryx-popover`, `.astryx-popover-surface`

## Files

- `src/Popover.doc.mjs`
- `src/Popover.spec.md`
- `src/Popover.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Popover
