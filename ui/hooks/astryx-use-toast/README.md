# useToast

Hook for showing toast notifications from anywhere in your component tree. Returns a function that accepts toast options and shows the notification. Works automatically with LayerProvider or self-mounts a fallback viewport.

## Classification

- Category: `hooks` — functional
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/useToast.tsx`
- Nature: functional; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Hook for showing toast notifications from anywhere in your component tree.
- Avoid when: Use for critical errors that require acknowledgment; use AlertDialog instead. Call useToast in the same component that renders LayerProvider; it must be called from a child component inside the provider.
- Provides: useToast
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: family demo (overlay/astryx-toast)
- Upstream: Astryx core · interaction
- Keywords: toast, notification, snackbar, alert, message, feedback, flash

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

- None of its own upstream; the demo is its family's: `ui/overlay/astryx-toast`.

## Documentation

### useToast

Import: `@astryxdesign/core/Toast`

Hook for showing toast notifications from anywhere in your component tree. Returns a function that accepts toast options and shows the notification. Works automatically with LayerProvider or self-mounts a fallback viewport.

**Do**

- Use for transient success/error feedback that does not require user action.
- Set uniqueID to deduplicate toasts from rapid user actions.

**Don't**

- Use for critical errors that require acknowledgment; use AlertDialog instead.
- Call useToast in the same component that renders LayerProvider; it must be called from a child component inside the provider.

**Returns**

```ts
[
  {
    "name": "showToast",
    "type": "(options: ToastOptions) => () => void",
    "description": "Show a toast notification. Returns a dismiss function. Options include body (ReactNode), type (\"info\" | \"error\"), isAutoHide, autoHideDuration, endContent, uniqueID, and collisionBehavior."
  }
]
```

## Files

- `upstream/useToast.doc.mjs`
- `upstream/useToast.tsx`
- `upstream/useToastGesture.ts`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/useToast
