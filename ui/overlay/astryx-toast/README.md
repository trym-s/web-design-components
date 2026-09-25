# Toast

Toast shows a brief, non-blocking notification to confirm an action or present temporary information. Use it for scenarios where the user needs feedback but not a decision, such as saving, deleting, or changing a status. For production use, prefer the `useToast()` hook; it handles positioning, stacking, auto-dismiss, and deduplication via `ToastViewport`. Toasts stay within viewport and safe-area gutters, wrap long message content, and enter, exit, or swipe-dismiss toward their configured top or bottom edge. The vertical swipe uses the same spatial model as placement motion: top Toasts leave upward and bottom Toasts leave downward. Swipe waits for dominant edge-directed intent before cancelling native touch movement and reports the existing manual dismissal reason. Pen is supported as direct-contact input; mouse drag is excluded to avoid conflicting with desktop text selection, where the visible close control remains available. Set `isAutoHide: false` explicitly when an action or message must remain available. The `Toast` component renders the visual toast element inline and is useful for previews, documentation, and static showcases where the viewport lifecycle is not needed.

## Classification

- Category: `overlay` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/Toast.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Toast shows a brief, non-blocking notification to confirm an action or present temporary information.
- Avoid when: Don't use a toast for critical errors that block the user. Use Banner for persistent, in-context messaging that requires acknowledgment. Don't put long or multi-line content in a toast; it disappears after 5 seconds and the user may not finish reading. Don't show form validation errors as toasts. Use inline field validation so the user can see exactly which field needs fixing.
- Provides: Body, End content, Dismiss button
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: ToastShowcase, ToastAction, ToastDeduplication, ToastDismiss, ToastStacking, ToastTypes
- Upstream: Astryx core · Overlay
- Keywords: toast, notification, snackbar, alert, message, feedback, status

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

- `src/examples/ToastShowcase.tsx` — Toast: Imperative toast notifications triggered with useToast and rendered in the toast viewport. · static: `static/ToastShowcase.html`
- `src/examples/ToastAction.tsx` — Toast — Action: Persistent toasts with a trailing button or link so the user can act on the notification, like undoing a delete or viewing a report. · static: `static/ToastAction.html`
- `src/examples/ToastDeduplication.tsx` — Toast — Deduplication: Prevent duplicate toasts with uniqueID. Use ignore to keep the first toast, or overwrite to replace it with updated content like a progress percentage. · static: `static/ToastDeduplication.html`
- `src/examples/ToastDismiss.tsx` — Toast — Dismiss: Show a persistent toast and dismiss it programmatically using the function returned by useToast. Use for long-running operations that need manual cleanup. · static: `static/ToastDismiss.html`
- `src/examples/ToastStacking.tsx` — Toast — Stacking: Multiple toasts stacking vertically with smooth enter and exit animations. Click repeatedly to see how toasts queue and dismiss. · static: `static/ToastStacking.html`
- `src/examples/ToastTypes.tsx` — Toast — Types: Info and error toast variants side by side. Info toasts auto-dismiss after 5 seconds, error toasts persist until the user dismisses them. · static: `static/ToastTypes.html`

## Documentation

### Toast

Toast shows a brief, non-blocking notification to confirm an action or present temporary information. Use it for scenarios where the user needs feedback but not a decision, such as saving, deleting, or changing a status. For production use, prefer the `useToast()` hook; it handles positioning, stacking, auto-dismiss, and deduplication via `ToastViewport`. Toasts stay within viewport and safe-area gutters, wrap long message content, and enter, exit, or swipe-dismiss toward their configured top or bottom edge. The vertical swipe uses the same spatial model as placement motion: top Toasts leave upward and bottom Toasts leave downward. Swipe waits for dominant edge-directed intent before cancelling native touch movement and reports the existing manual dismissal reason. Pen is supported as direct-contact input; mouse drag is excluded to avoid conflicting with desktop text selection, where the visible close control remains available. Set `isAutoHide: false` explicitly when an action or message must remain available. The `Toast` component renders the visual toast element inline and is useful for previews, documentation, and static showcases where the viewport lifecycle is not needed.

**Do**

- Keep messages short: only a few words that tell the user what happened, like "Changes saved" or "Message sent".
- Add a short undo action in the endContent slot for reversible operations. Set isAutoHide to false when the action must remain available.
- Use uniqueID to deduplicate toasts that fire from repeated actions, like clicking a save button multiple times.
- Use error type for failures that need attention but not immediate action; it persists until dismissed so the user won't miss it.

**Don't**

- Don't use a toast for critical errors that block the user. Use Banner for persistent, in-context messaging that requires acknowledgment.
- Don't put long or multi-line content in a toast; it disappears after 5 seconds and the user may not finish reading.
- Don't show form validation errors as toasts. Use inline field validation so the user can see exactly which field needs fixing.

**Anatomy**

- Body (required) — The primary message text describing what happened or what the user should know.
- End content — A trailing action like an Undo button or a link, placed after the body text.
- Dismiss button (required) — A close button that lets the user manually dismiss the toast before auto-hide.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `body` * | `ReactNode` |  | Primary message content. |
| `type` | `'info' \| 'error'` | `'info'` | Toast type controlling background color. Error toasts persist until dismissed. |
| `isAutoHide` | `boolean` |  | Whether the toast auto-dismisses. Defaults to true for info, false for error. |
| `autoHideDuration` | `number` | `5000` | Duration in ms before auto-dismiss. Timed content must satisfy WCAG 2.2.1. |
| `endContent` | `ReactNode` |  | Content rendered at the trailing end (e.g. Undo button, link). Keep action labels short. |
| `uniqueID` | `string` |  | Unique identifier for deduplication. |
| `collisionBehavior` | `'overwrite' \| 'ignore'` | `'overwrite'` | Behavior when a toast with matching uniqueID already exists. |
| `onHide` | `(reason: "auto" \| "manual") => void` |  | Callback fired when the toast is removed. |
| `onDismiss` * | `(reason: "auto" \| "manual") => void` |  | Callback fired when the toast is dismissed. |
| `renderContent` | `(toast: ToastContentRenderProps) => ReactNode` |  | Replaces the content of this toast's card with your own layout. Astryx keeps the card, its astryx-toast theme target, the live-region role and auto-hide behavior, then hands the renderer the message, endContent, resolved toast settings and a dismiss callback. The custom renderer owns every control in its layout: compose the control you want and call dismiss from it. Astryx does not inject a fallback close into custom content. Per-toast: an app shares one layout by wrapping useToast and passing it on every call, while a toast raised by library code that never passes it renders as an ordinary Astryx toast. The argument is {body, endContent, type, isAutoHide, autoHideDuration, dismiss}, where type is 'info' \| 'error'. |

Styling hook class: `.astryx-toast`

## Files

- `src/Toast.doc.mjs`
- `src/Toast.tsx`
- `src/ToastContext.ts`
- `src/ToastViewport.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Toast
