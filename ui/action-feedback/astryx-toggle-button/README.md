# Toggle Button

ToggleButton switches between selected and unselected states to represent a persistent on/off choice. Use it standalone for binary actions like bold, mute, or favorite, or inside a ToggleButtonGroup for single-select or multi-select toolbar controls.

## Classification

- Category: `action-feedback` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/ToggleButton.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: ToggleButton switches between selected and unselected states to represent a persistent on/off choice.
- Avoid when: Don't use a ToggleButton for one-time actions like "Submit" or "Delete"; those are regular Buttons, not toggles. Don't mix ToggleButtons with regular Buttons inside the same group; use only ToggleButtons in a ToggleButtonGroup. Don't use a ToggleButton for on/off settings that persist across sessions; use a Switch instead, which better communicates "setting" semantics.
- Provides: Icon, Pressed icon, Label, Spinner
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: ToggleButtonGroupShowcase, ToggleButtonShowcase, ToggleButtonColor, ToggleButtonGroup, ToggleButtonGroupVertical, ToggleButtonIconSwap, ToggleButtonLabel, ToggleButtonStates
- Upstream: Astryx core · Action
- Keywords: toggle, togglebutton, pressed, toolbar, formatting, segmented, button-group, exclusive, multi-select

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

- `upstream/examples/ToggleButtonGroupShowcase.tsx` — Toggle Button Group: ToggleButtonGroup manages a set of ToggleButtons with single-select or multi-select behavior for options like view modes or filters. · static: `static/ToggleButtonGroupShowcase.html`
- `upstream/examples/ToggleButtonShowcase.tsx` — Toggle Button · static: `static/ToggleButtonShowcase.html`
- `upstream/examples/ToggleButtonColor.tsx` — ToggleButton — Color: Toggle buttons with colored icons in the pressed state. Shows accent-colored toolbar formatting and semantic reaction colors (yellow star, red heart, blue bookmark). · static: `static/ToggleButtonColor.html`
- `upstream/examples/ToggleButtonGroup.tsx` — ToggleButton — Group: Toggle button groups in single-select and multi-select modes. Single selection acts as a view mode switcher; multiple selection forms a formatting toolbar. · static: `static/ToggleButtonGroup.html`
- `upstream/examples/ToggleButtonGroupVertical.tsx` — ToggleButtonGroup — Vertical: A vertically stacked ToggleButtonGroup using the vertical orientation, shown with both single-select and multi-select behavior, ideal for sidebar-style option lists and vertical toolbars. · static: `static/ToggleButtonGroupVertical.html`
- `upstream/examples/ToggleButtonIconSwap.tsx` — ToggleButton — Icon Swap: Icon-only toggle buttons that swap between outline and solid icons when pressed. Use for actions like favorite, bookmark, or mute where the icon itself communicates the state. · static: `static/ToggleButtonIconSwap.html`
- `upstream/examples/ToggleButtonLabel.tsx` — ToggleButton — Label: Toggle buttons with visible text labels that show a font weight shift on press. Use when the icon alone is not enough to communicate the action. · static: `static/ToggleButtonLabel.html`
- `upstream/examples/ToggleButtonStates.tsx` — ToggleButton — States: Default, pressed, disabled, and loading states of a standalone toggle button. Shows how visual treatment changes across states. · static: `static/ToggleButtonStates.html`

## Documentation

### Toggle Button

ToggleButton switches between selected and unselected states to represent a persistent on/off choice. Use it standalone for binary actions like bold, mute, or favorite, or inside a ToggleButtonGroup for single-select or multi-select toolbar controls.

**Do**

- Use a filled or colored icon for the pressed state so users can see the current state at a glance: an outline star vs a solid star, for example.
- Keep the label identical between pressed and unpressed states. Let the visual treatment (icon, weight, background) communicate the change.
- Wrap related toggles in a ToggleButtonGroup with an accessible label so screen readers announce them as a connected set.

**Don't**

- Don't use a ToggleButton for one-time actions like "Submit" or "Delete"; those are regular Buttons, not toggles.
- Don't mix ToggleButtons with regular Buttons inside the same group; use only ToggleButtons in a ToggleButtonGroup.
- Don't use a ToggleButton for on/off settings that persist across sessions; use a Switch instead, which better communicates "setting" semantics.

**Anatomy**

- Icon — A leading icon that represents the toggle action, like a star for favorite or bold "B" for formatting.
- Pressed icon — An alternate icon shown when pressed: typically a filled version of the default icon to reinforce the active state.
- Label (required) — The visible text or accessible name. For icon-only toggles, used as the aria-label and auto-tooltip.
- Spinner — Replaces the icon during async operations triggered by pressedChangeAction.

**Accessibility**

- Text label — WCAG 1.4.3 Contrast (Minimum) (4.5:1): The label must have at least 4.5:1 contrast with the button background when selected and unselected. For Hover and Pointer down, measure the final background after the overlay is applied.
- Essential icon or spinner arc — WCAG 1.4.11 Non-text Contrast (3:1): An icon-only ToggleButton must have at least 3:1 contrast between its icon and button background. The moving spinner arc must also meet 3:1. An icon beside a visible label does not need its own check.
- Selected state indicator — WCAG 1.4.11 Non-text Contrast (3:1 if relied upon): The selected background must reach 3:1 only when users need it to tell selected from unselected. Label weight or a changed icon can also show selection.
- Visible control boundary — WCAG 1.4.11 Non-text Contrast (3:1 if needed): The button edge needs 3:1 contrast only when users need it to see the control. A visible label or icon can show the control instead.
- Keyboard focus indicator — WCAG 1.4.11 Non-text Contrast (3:1): The focus outline must have at least 3:1 contrast with the area around the button. Check both selected and unselected states.
- Disabled appearance — WCAG 1.4.3 and 1.4.11 exceptions (Not required): Disabled controls do not need to meet these contrast ratios.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `string` |  | Accessible label for the button. Used as visible text, or as aria-label for icon-only buttons. |
| `isPressed` | `boolean` |  | Whether the button is currently pressed. Ignored for a ToggleButtonGroup member with a value. |
| `onPressedChange` | `(isPressed: boolean, event: MouseEvent) => void` |  | Called synchronously when pressed state should change. Receives the next state and the click event; call event.preventDefault() to skip pressedChangeAction. Without an Action, the callback produces no Action-pending feedback. Ignored for a ToggleButtonGroup member with a value. |
| `pressedChangeAction` | `(isPressed: boolean) => void \| Promise<void>` |  | Action handler for API- or navigation-backed toggles, run in a transition after the synchronous onPressedChange callback unless that callback calls event.preventDefault(). Works without onPressedChange. Shows an optimistic pressed state and a spinner while pending, and remains interruptible by re-clicks. Omit it for callback-only toggles with no Action-pending feedback. Ignored for a ToggleButtonGroup member with a value. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size. Defaults to group size when inside a group. |
| `elevation` | `'none' \| 'low' \| 'med' \| 'high'` | `'none'` | Resting shadow depth for floating (FAB-style) toggle buttons, mirroring Button. `none` is the default flat button; `low`/`med`/`high` map to the shadow token scale. Applies inside a ToggleButtonGroup as well — grouped children retain their own elevation. |
| `isDisabled` | `boolean` | `false` | Whether the button is disabled. |
| `isLoading` | `boolean` | `false` | Whether the button shows a loading spinner. |
| `icon` | `ReactNode` |  | Icon element. When provided without children, button becomes icon-only with tooltip from label. |
| `isIconOnly` | `boolean` | `false` | When true, renders as a square icon-only button with `label` as the aria-label and an automatic tooltip from the label. |
| `pressedIcon` | `ReactNode` |  | Icon shown when pressed. Falls back to icon if not provided. |
| `children` | `ReactNode` |  | Visible content. If omitted with icon, button becomes icon-only. |
| `tooltip` | `string` |  | Tooltip text shown on hover. |
| `value` | `string` |  | Value identifier when used inside ToggleButtonGroup. Required in groups. |
| `data-testid` | `string` |  | Test selector for automated testing frameworks. |

Styling hook class: `.astryx-toggle-button-group`, `.astryx-toggle-button`

### Toggle Button Group

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` * | `ReactNode` |  | ToggleButton children. Give each member a value; the group owns its pressed state and ignores its isPressed, onPressedChange, and pressedChangeAction props. Member activation calls the group’s onChange without starting a member Action transition. |
| `label` * | `string` |  | Accessible label for the group (aria-label). |
| `type` | `'single' \| 'multiple'` | `'single'` | Selection mode. Single allows one active button, multiple allows many. |
| `value` * | `string \| null \| string[]` |  | Currently selected value(s). Type depends on selection mode. |
| `onChange` * | `(value: string \| null \| string[]) => void` |  | Called when selection changes. |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout direction of the button group. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Default size for buttons in the group. Individual buttons can override. |
| `isDisabled` | `boolean` | `false` | Whether all buttons in the group are disabled. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value. |
| `data-testid` | `string` |  | Test selector for automated testing frameworks. |

### Toggle Button Group

### Toggle Button Group

## Files

- `upstream/ToggleButton.doc.mjs`
- `upstream/ToggleButton.tsx`
- `upstream/ToggleButtonGroup.doc.mjs`
- `upstream/ToggleButtonGroup.tsx`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/ToggleButton
