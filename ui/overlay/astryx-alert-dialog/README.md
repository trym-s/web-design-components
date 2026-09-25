# Alert Dialog

AlertDialog asks the user to confirm a destructive or irreversible action before it happens. Use it for things like deleting content, revoking access, or discarding unsaved changes. It implements the WAI-ARIA APG [Alert Dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/): `role="alertdialog"`, a title linked by `aria-labelledby`, a consequence description linked by `aria-describedby`, focus moved into the dialog on open and returned to the trigger on close, and no dismissal by clicking outside. Escape cancels. AlertDialog passes its requested width through to Dialog, which clamps the surface to the container and dynamic viewport with token gutters. Generic Dialog footers should wrap, but Dialog does not own action semantics or order; consumer composition controls that. AlertDialog owns its confirmation semantics: above 640px, actions render horizontally and may move onto another row; at 640px and below, the destructive action appears above Cancel and both buttons fill the footer width. Button labels retain their standard single-line behavior. The breakpoint follows available width, not pointer or hover capability. The body scrolls when block space is constrained. For cases where you want to show an alert without managing open state, use the `useImperativeAlertDialog` hook: call `alert.show(options)` and render `alert.element` in your tree.

## Classification

- Category: `overlay` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/AlertDialog.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: AlertDialog asks the user to confirm a destructive or irreversible action before it happens.
- Avoid when: Use AlertDialog for non-destructive actions; use a standard Dialog instead. Rely on color alone to signal danger; the action label itself should say what will happen. Close the dialog from onAction before the work finishes; hold it open with isActionLoading and call onOpenChange(false) when the action settles.
- Provides: Title, Description, Cancel button, Action button, Backdrop
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: AlertDialogAsyncAction, AlertDialogDeleteConfirmation
- Upstream: Astryx core · Overlay
- Keywords: alert, alertdialog, confirm, confirmation, destructive, delete, modal, dialog, imperative

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

- `upstream/examples/AlertDialogAsyncAction.tsx` — AlertDialog — Loading: A confirmation dialog that shows a spinner while the action runs. · static: `static/AlertDialogAsyncAction.html`
- `upstream/examples/AlertDialogDeleteConfirmation.tsx` — AlertDialog — Delete: A delete button that asks the user to confirm before deleting. · static: `static/AlertDialogDeleteConfirmation.html`

## Documentation

### Alert Dialog

AlertDialog asks the user to confirm a destructive or irreversible action before it happens. Use it for things like deleting content, revoking access, or discarding unsaved changes. It implements the WAI-ARIA APG [Alert Dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/): `role="alertdialog"`, a title linked by `aria-labelledby`, a consequence description linked by `aria-describedby`, focus moved into the dialog on open and returned to the trigger on close, and no dismissal by clicking outside. Escape cancels. AlertDialog passes its requested width through to Dialog, which clamps the surface to the container and dynamic viewport with token gutters. Generic Dialog footers should wrap, but Dialog does not own action semantics or order; consumer composition controls that. AlertDialog owns its confirmation semantics: above 640px, actions render horizontally and may move onto another row; at 640px and below, the destructive action appears above Cancel and both buttons fill the footer width. Button labels retain their standard single-line behavior. The breakpoint follows available width, not pointer or hover capability. The body scrolls when block space is constrained. For cases where you want to show an alert without managing open state, use the `useImperativeAlertDialog` hook: call `alert.show(options)` and render `alert.element` in your tree.

**Do**

- Make the action button label specific: "Delete project" is better than "OK" or "Confirm".
- Describe what will happen in the description so the user knows the consequences before confirming.
- Keep the cancel button as the least-destructive focus target. On narrow screens the destructive action is visually and structurally above Cancel, but Cancel still receives initial focus.
- Use concise, specific action labels. Above 640px, complete buttons may move onto another row; at 640px and below, the destructive action appears above Cancel and both buttons fill the footer width.

**Don't**

- Use AlertDialog for non-destructive actions; use a standard Dialog instead.
- Rely on color alone to signal danger; the action label itself should say what will happen.
- Close the dialog from onAction before the work finishes; hold it open with isActionLoading and call onOpenChange(false) when the action settles.

**Anatomy**

- Title (required) — The question being asked. Renders as a level-2 heading and labels the dialog via aria-labelledby.
- Description (required) — What will happen if the user confirms. Linked to the dialog via aria-describedby.
- Cancel button (required) — Ghost button that dismisses without acting. Takes initial focus, and Escape does the same thing.
- Action button (required) — The confirming action. Destructive by default; shows a spinner while isActionLoading is set.
- Backdrop (required) — Overlay behind the dialog that blocks page interaction. Clicking it does not dismiss.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `isOpen` * | `boolean` |  | Whether the dialog is open. |
| `onOpenChange` * | `(isOpen: boolean) => unknown` |  | Visibility change callback. |
| `title` * | `string` |  | Dialog title. Linked via aria-labelledby. |
| `description` * | `string` |  | Consequence description. Linked via aria-describedby. |
| `actionLabel` * | `string` |  | Action button label. |
| `onAction` * | `() => unknown` |  | Called when action button is clicked. Does NOT auto-close. |
| `cancelLabel` | `string` | `'Cancel'` | Cancel button label. |
| `actionVariant` | `ButtonVariant` | `'destructive'` | Action button variant. |
| `isActionLoading` | `boolean` |  | Shows loading spinner on the action button. |
| `width` | `number \| string` | `400` | Requested dialog width. Dialog preserves this preferred width and clamps it to the container and dynamic viewport with token gutters. |
| `isInline` | `boolean` | `false` | Renders alert dialog content inline without modal behavior. For documentation previews and showcases only. Not being a modal, the inline path renders role="group" instead of role="alertdialog". |

Styling hook class: `.astryx-alert-dialog`

### useImperativeAlertDialog

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `show` | `(options: AlertDialogOptions) => void` |  | Show the alert dialog with the given options. Options are the same as AlertDialog props minus isOpen/onOpenChange. |
| `hide` | `() => void` |  | Hide the alert dialog. |
| `isOpen` | `boolean` |  | Whether the dialog is currently open. |
| `element` | `ReactNode` |  | The dialog element: render this in your JSX tree. |

### useImperativeAlertDialog

## Files

- `upstream/AlertDialog.doc.mjs`
- `upstream/AlertDialog.tsx`
- `upstream/useImperativeAlertDialog.doc.mjs`
- `upstream/useImperativeAlertDialog.tsx`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/AlertDialog
