# useKeyboardHint

Shows an ephemeral "← → to navigate" hint anchored to the focused item the first time a roving-tabindex composite (Toolbar, TabList, SegmentedControl, etc.) receives keyboard focus. It teaches sighted keyboard users that arrow keys move within the group. The hint renders arrow keys with Kbd in the top layer (popover="manual") and is CSS-anchor-positioned to the focused element, so overflow containers never clip it. It auto-dismisses on the first arrow press, on timeout, or on blur, and does not re-show for that instance. Toolbar, TabList, and SegmentedControl wire this in automatically; reach for the hook directly only when building a custom roving-tabindex widget.

## Classification

- Category: `hooks` — functional
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/useKeyboardHint.tsx`
- Nature: functional; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Shows an ephemeral "← → to navigate" hint anchored to the focused item the first time a roving-tabindex composite (Toolbar, TabList, SegmentedControl, etc.) receives keyboard focus.
- Avoid when: Use for single controls or widgets without roving-tabindex navigation; the hint only makes sense where arrows move focus within a group.
- Provides: useKeyboardHint
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: useKeyboardHintHookUsage
- Upstream: Astryx core · focus
- Keywords: keyboard, hint, arrow, navigation, roving, tabindex, focus, discoverability, toolbar, tabs, segmented, affordance, a11y

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
- Hooks carry behavior only: port the logic, keep the accessibility contract.

## Examples

- `upstream/examples/useKeyboardHintHookUsage.tsx` — useKeyboardHint — Arrow-key Hint: Toolbar shows an ephemeral "← → to navigate" hint on first keyboard focus via useKeyboardHint, teaching sighted keyboard users that arrows move within the group. · static: `static/useKeyboardHintHookUsage.html`

## Documentation

### useKeyboardHint

Import: `@astryxdesign/core/hooks`

Shows an ephemeral "← → to navigate" hint anchored to the focused item the first time a roving-tabindex composite (Toolbar, TabList, SegmentedControl, etc.) receives keyboard focus. It teaches sighted keyboard users that arrow keys move within the group. The hint renders arrow keys with Kbd in the top layer (popover="manual") and is CSS-anchor-positioned to the focused element, so overflow containers never clip it. It auto-dismisses on the first arrow press, on timeout, or on blur, and does not re-show for that instance. Toolbar, TabList, and SegmentedControl wire this in automatically; reach for the hook directly only when building a custom roving-tabindex widget.

**Do**

- Compose the returned onFocus/onKeyDown with your existing focus handlers rather than replacing them: call onKeyDown first (it only dismisses, never prevents), then your navigation handler.
- Render hintElement as the last child of the composite container; it is position:fixed in the top layer and aria-hidden, so it never affects layout or the accessibility tree.
- Match orientation to the arrow keys your widget actually responds to so the hint shows the correct icons.

**Don't**

- Use for single controls or widgets without roving-tabindex navigation; the hint only makes sense where arrows move focus within a group.

**Parameters**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `options` | `UseKeyboardHintOptions` |  | Configuration object for the keyboard hint. |
| `options.orientation` | `'horizontal' \| 'vertical' \| 'both'` | `'horizontal'` | Which arrow-key axis the composite navigates, controlling which arrow icons the hint shows (← → for horizontal, ↑ ↓ for vertical, all four for both). |
| `options.dismissAfterMs` | `number` | `3000` | Milliseconds before the hint auto-dismisses after appearing. |
| `options.isEnabled` | `boolean` | `true` | Whether the hint is enabled. Set to false to suppress it for a specific instance (e.g. a disabled or read-only widget). |

**Returns**

```ts
[
  {
    "name": "hintElement",
    "type": "ReactNode",
    "description": "The popover hint element to render inside the composite container (as the last child). Portals to the top layer via popover=\"manual\", renders arrow keys with Kbd, and manages its own visibility; render it unconditionally."
  },
  {
    "name": "onFocus",
    "type": "(e: React.FocusEvent) => void",
    "description": "Attach to the container onFocus. Shows the hint on the first keyboard-focus (:focus-visible) entry from outside the composite."
  },
  {
    "name": "onBlur",
    "type": "(e: React.FocusEvent) => void",
    "description": "Attach to the container onBlur. Hides the hint when focus leaves the composite entirely, and re-anchors when focus moves within."
  },
  {
    "name": "onKeyDown",
    "type": "(e: React.KeyboardEvent) => void",
    "description": "Attach to the container onKeyDown. Dismisses the hint on the first arrow press (the user has discovered the interaction). Never prevents default or stops propagation."
  }
]
```

## Files

- `upstream/useKeyboardHint.doc.mjs`
- `upstream/useKeyboardHint.tsx`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/useKeyboardHint
