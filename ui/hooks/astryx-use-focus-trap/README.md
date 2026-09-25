# useFocusTrap

Traps focus within a container element following the WAI-ARIA dialog focus trap pattern. Listens to focus events on the document and redirects focus back into the container if it escapes via keyboard navigation. Handles both Tab and Shift+Tab wrapping. When the trap deactivates or unmounts, focus is restored to the element that was focused before activation, unless focus was already moved elsewhere or never entered the trap (so popups that keep focus on their trigger, like comboboxes, are unaffected). Mouse clicks outside the container are not intercepted; use a light-dismiss handler for that.

## Classification

- Category: `hooks` — functional
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/useFocusTrap.ts`
- Nature: functional; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Traps focus within a container element following the WAI-ARIA dialog focus trap pattern.
- Avoid when: Use on non-modal content like tooltips or dropdowns; those need light-dismiss, not focus trapping.
- Provides: useFocusTrap
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: family demo (hooks/astryx-use-container-reveal)
- Upstream: Astryx core · focus
- Keywords: focus, trap, modal, dialog, accessibility, a11y, keyboard, tab, escape, wai-aria

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

- None of its own upstream; the demo is its family's: `ui/hooks/astryx-use-container-reveal`.

## Documentation

### useFocusTrap

Import: `@astryxdesign/core/hooks`

Traps focus within a container element following the WAI-ARIA dialog focus trap pattern. Listens to focus events on the document and redirects focus back into the container if it escapes via keyboard navigation. Handles both Tab and Shift+Tab wrapping. When the trap deactivates or unmounts, focus is restored to the element that was focused before activation, unless focus was already moved elsewhere or never entered the trap (so popups that keep focus on their trigger, like comboboxes, are unaffected). Mouse clicks outside the container are not intercepted; use a light-dismiss handler for that.

**Do**

- Call focusFirst() when opening a dialog/modal to move focus into the trapped region.
- Provide an onEscape callback to close the dialog when Escape is pressed.
- Rely on the built-in focus restoration on close; only add your own onHide focus handling when you need to send focus somewhere other than the previously-focused element.

**Don't**

- Use on non-modal content like tooltips or dropdowns; those need light-dismiss, not focus trapping.

**Parameters**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `options` * | `UseFocusTrapOptions` |  | Configuration object for the focus trap. |
| `options.isActive` * | `boolean` |  | Whether the focus trap is currently active. |
| `options.onEscape` | `() => void` |  | Callback when Escape key is pressed inside the trapped container. |

**Returns**

```ts
[
  {
    "name": "containerRef",
    "type": "React.RefObject<HTMLElement | null>",
    "description": "Ref to attach to the container element that should trap focus."
  },
  {
    "name": "focusFirst",
    "type": "() => void",
    "description": "Focuses the first focusable element inside the container."
  }
]
```

## Files

- `src/useFocusTrap.doc.mjs`
- `src/useFocusTrap.ts`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/useFocusTrap
