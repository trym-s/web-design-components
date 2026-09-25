# usePopover

Headless hook for click-triggered popovers with focus trapping. Combines useLayer with useFocusTrap, auto-focus, light dismiss, Escape handling, and an optional hidden close button for accessible dialog-like popover behavior. Every painted surface emits the canonical popover target and deprecated popover-surface compatibility alias. A custom composition needing a distinct stable seam should pass and document its own surfaceTarget.

## Classification

- Category: `hooks` — functional
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/usePopover.tsx`
- Nature: functional; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Headless hook for click-triggered popovers with focus trapping.
- Avoid when: Use for non-interactive hover previews: use useHoverCard or useTooltip instead.
- Provides: usePopover
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: PopoverHookUsage
- Upstream: Astryx core · interaction
- Keywords: popover, popup, dropdown, floating, anchor, dialog, overlay, flyout

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
- Hooks carry behavior only: port the logic, keep the accessibility contract.

## Examples

- `src/examples/PopoverHookUsage.tsx` — usePopover — Quick Actions: Custom quick-actions popover using usePopover for trigger refs, ARIA attributes, and focus trapping. · static: `static/PopoverHookUsage.html`

## Documentation

### usePopover

Import: `@astryxdesign/core/Popover`

Headless hook for click-triggered popovers with focus trapping. Combines useLayer with useFocusTrap, auto-focus, light dismiss, Escape handling, and an optional hidden close button for accessible dialog-like popover behavior. Every painted surface emits the canonical popover target and deprecated popover-surface compatibility alias. A custom composition needing a distinct stable seam should pass and document its own surfaceTarget.

**Do**

- Use for interactive content such as menus, pickers, forms, and command panels that need focus management.
- Prefer the Popover component for standard trigger-content pairs; use the hook for custom trigger patterns.
- Use popover as the broad surface target. Popover-surface remains supported compatibility output, but new theme source uses the canonical key.
- When a custom composition needs its own theme refinement, pass and document an owned surfaceTarget such as selector-popup. It refines the Popover surface rather than creating another anatomy part.

**Don't**

- Use for non-interactive hover previews: use useHoverCard or useTooltip instead.

**Parameters**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `onShow` | `() => void` |  | Callback fired when the popover becomes visible. |
| `onHide` | `() => void` |  | Callback fired when the popover is hidden. Use this to return focus to the trigger when needed. |
| `xstyle` | `StyleXStyles` |  | StyleX styles applied to the popover content wrapper, after the default surface styles. |
| `hasLightDismiss` | `boolean` | `true` | Whether clicking outside dismisses the popover. |
| `hasEscapeDismiss` | `boolean` | `true` | Whether pressing Escape dismisses the popover. Only takes full effect together with hasLightDismiss: false, since native light dismiss also closes on Escape. |
| `hasAutoFocus` | `boolean` | `true` | Whether to focus the first genuine content control when opened. Dialogs with none fall back to the labeled surface; the generated close control is excluded from initial focus. |
| `hasCloseButton` | `boolean` | `true` | Whether to include a hidden close button that appears for keyboard users. |
| `closeButtonLabel` | `string` | `'Close popover'` | Accessible label for the hidden close button. |
| `dialogLabel` | `string` |  | Accessible label for the popover dialog (only applies when role is "dialog"). Provide one when there is no visible title. |
| `role` | `'dialog' \| 'none'` | `'dialog'` | ARIA role on the content wrapper. Use "dialog" for genuine dialog content; use "none" for listbox/menu popups whose own content role should be exposed and whose trigger keeps DOM focus. |
| `isModal` | `boolean` | `true` | Whether a dialog-role popover is modal (aria-modal). Only applies when role is "dialog". |
| `hasSurface` | `boolean` | `true` | Whether to apply the default popover surface background, radius, and shadow. |
| `surfaceTarget` | `string` |  | Optional component-owned refinement target on the painted surface, without the astryx- prefix. Use and document one when a direct hook composition needs distinct theme reachability. Do not use popover-surface; it is a deprecated compatibility alias of the canonical popover target. |

**Returns**

```ts
[
  {
    "name": "triggerRef",
    "type": "(el: HTMLElement | null) => void",
    "description": "Ref callback to attach to the trigger element for CSS anchor positioning."
  },
  {
    "name": "contentRef",
    "type": "RefObject<HTMLDivElement | null>",
    "description": "Ref for the popover content container used by focus trapping."
  },
  {
    "name": "anchorId",
    "type": "string",
    "description": "CSS anchor name for advanced positioning cases."
  },
  {
    "name": "show",
    "type": "(options?: {skipAutoFocus?: boolean}) => void",
    "description": "Imperatively show the popover. skipAutoFocus preserves current focus for input-triggered popovers."
  },
  {
    "name": "hide",
    "type": "() => void",
    "description": "Imperatively hide the popover."
  },
  {
    "name": "toggle",
    "type": "() => void",
    "description": "Toggle the popover open or closed."
  },
  {
    "name": "isOpen",
    "type": "boolean",
    "description": "Whether the popover is currently open."
  },
  {
    "name": "id",
    "type": "string",
    "description": "Unique ID for aria-describedby or aria-controls."
  },
  {
    "name": "render",
    "type": "(children: ReactNode, props?: ContextRenderProps) => ReactNode",
    "description": "Render function for anchor-positioned popover content. Pass placement and alignment here. Logical: start/end resolve against the popover's own inherited direction (RTL mirrors in pure CSS)."
  },
  {
    "name": "triggerProps",
    "type": "{aria-haspopup: \"dialog\" | \"true\"; aria-expanded: boolean; aria-controls: string}",
    "description": "ARIA attributes to spread onto the trigger element. aria-haspopup reflects the popover role."
  }
]
```

## Files

- `src/usePopover.doc.mjs`
- `src/usePopover.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/usePopover
