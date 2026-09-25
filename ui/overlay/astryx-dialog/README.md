# Dialog

Dialog displays a modal overlay that blocks interaction with the page until the user responds. Use it for delete confirmations, edit forms, terms acceptance, or any decision that should not be skipped. For cases where you want to show a dialog without managing open state, use the `useImperativeDialog` hook: call `dialog.show(content)` and render `dialog.element` in your tree.

## Classification

- Category: `overlay` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/Dialog.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Dialog displays a modal overlay that blocks interaction with the page until the user responds.
- Avoid when: Use a dialog for simple messages that could be shown inline or as a toast notification. Nest dialogs inside other dialogs; restructure the flow into steps within a single dialog instead. Use the fullscreen variant for simple confirmations; it is meant for complex content like editors or long forms.
- Provides: Header, Body, Footer, Backdrop
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: DialogHeaderShowcase, DialogShowcase, DialogAdaptivePresentation, DialogConfirmationDialog, DialogFormDialog, DialogFullscreenDialog, DialogHeaderBasic, DialogScrollingContent, DialogWithSubtitle
- Upstream: Astryx core · Overlay
- Keywords: dialog, modal, popup, overlay, lightbox, alert, confirm, prompt, backdrop, focus trap, imperative

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

- `src/examples/DialogHeaderShowcase.tsx` — Dialog Header: DialogHeader provides a structured header for dialogs with slots for title, subtitle, close button, and optional start or end content. · static: `static/DialogHeaderShowcase.html`
- `src/examples/DialogShowcase.tsx` — Dialog: Modal dialog with a header, body content, and close button. · static: `static/DialogShowcase.html`
- `src/examples/DialogAdaptivePresentation.tsx` — Dialog — Adaptive presentation: Opt-in recipe for an AdaptiveDialog wrapper: Dialog remains the default everywhere, while touchPresentation="bottom-sheet" switches only at lg and below when pointer is coarse and hover is unavailable. Includes a deterministic presentation override for tests/unusual environments and notes that BottomSheet purpose controls swipe and scrim dismissal. Usage examples: touchPresentation="dialog" keeps Dialog, "fullscreen" chooses fullscreen Dialog, and "bottom-sheet" chooses BottomSheet only for the touch-oriented range. Keep presentation as the deterministic override. Do not use this by default for AlertDialog or destructive confirmations. · static: `static/DialogAdaptivePresentation.html`
- `src/examples/DialogConfirmationDialog.tsx` — Dialog — Confirmation: Asks the user to confirm a destructive action before it happens. Use before deleting projects, removing team members, revoking API keys, or any irreversible operation. · static: `static/DialogConfirmationDialog.html`
- `src/examples/DialogFormDialog.tsx` — Dialog — Form: Collects user input without navigating away from the page. Uses purpose="form" so clicking the backdrop won't close it. Use for editing profiles, creating items, or updating settings inline. · static: `static/DialogFormDialog.html`
- `src/examples/DialogFullscreenDialog.tsx` — Dialog — Fullscreen: Takes over the entire viewport for content that needs maximum space. Use for documentation viewers, rich text editors, multi-step wizards, or media previews where the standard dialog width is too narrow. · static: `static/DialogFullscreenDialog.html`
- `src/examples/DialogHeaderBasic.tsx` — DialogHeader — Basic: A DialogHeader with a title, subtitle, and close button, placed in the header slot of a Dialog Layout. Pass onOpenChange to render the close button. · static: `static/DialogHeaderBasic.html`
- `src/examples/DialogScrollingContent.tsx` — Dialog — Scrollable: Constrains the dialog height and scrolls the body when content overflows. Use for terms and conditions, license agreements, changelogs, or any long-form content the user needs to review before accepting. · static: `static/DialogScrollingContent.html`
- `src/examples/DialogWithSubtitle.tsx` — Dialog — Required: Cannot be dismissed by Escape or backdrop click; the user must explicitly choose an action. Uses purpose="required". Use for ownership transfers, legal acknowledgements, or critical decisions where skipping is not an option. · static: `static/DialogWithSubtitle.html`

## Documentation

### Dialog

Dialog displays a modal overlay that blocks interaction with the page until the user responds. Use it for delete confirmations, edit forms, terms acceptance, or any decision that should not be skipped. For cases where you want to show a dialog without managing open state, use the `useImperativeDialog` hook: call `dialog.show(content)` and render `dialog.element` in your tree.

**Do**

- Choose the right purpose: info for dismissable content, form to prevent accidental backdrop dismissal, required when the user must respond.
- Include a clear title in the header so users immediately understand what the dialog is asking.
- Use purpose="form" for dialogs with inputs so the user can't accidentally lose data by clicking the backdrop.
- Keep dialogs focused on a single task; if the content grows beyond what fits, consider a full page instead.

**Don't**

- Use a dialog for simple messages that could be shown inline or as a toast notification.
- Nest dialogs inside other dialogs; restructure the flow into steps within a single dialog instead.
- Use the fullscreen variant for simple confirmations; it is meant for complex content like editors or long forms.

**Anatomy**

- Header (required) — Title, optional subtitle, and close button. The title receives focus on open and labels the dialog via aria-labelledby.
- Body (required) — The main content area: text, forms, lists, or any layout.
- Footer — Action buttons like Save/Cancel or Accept/Decline, aligned to the end.
- Backdrop (required) — Semi-transparent overlay behind the dialog that blocks page interaction.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `isOpen` * | `boolean` |  | Whether the dialog is open. |
| `onOpenChange` * | `(isOpen: boolean) => unknown` |  | Callback when dialog visibility changes. |
| `children` * | `ReactNode` |  | Dialog content. |
| `width` | `number \| string` | `400` | Preferred width of the dialog in pixels or any CSS value. Standard dialogs clamp to their container and the dynamic viewport with spacing-token gutters so narrow viewports keep content on screen. |
| `maxHeight` | `number \| string` | `'75dvh'` | Maximum height of the dialog. Defaults to a dynamic viewport value so browser UI changes are reflected where supported. |
| `position` | `DialogPosition` |  | Static position for the dialog; centered by default when omitted. Use logical `start`/`end` for inline offsets so positioned dialogs mirror correctly under RTL. |
| `variant` | `'standard' \| 'fullscreen'` | `'standard'` | Dialog variant: fullscreen expands to fill the entire viewport. |
| `purpose` | `'required' \| 'form' \| 'info'` | `'info'` | Controls dismissal behavior: required disables Escape and backdrop click; form disables backdrop click after interaction; info allows both. |
| `padding` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` |  | Internal padding of the dialog using the spacing scale step. |
| `isInline` | `boolean` | `false` | Renders dialog content inline without the <dialog> element, backdrop, or modal behavior. For documentation previews and showcases only. |

Styling hook class: `.astryx-dialog`, `.astryx-dialog-header`, `.astryx-dialog-header-start-content`, `.astryx-dialog-header-title-block`, `.astryx-dialog-header-end-content`, `.astryx-dialog-header-close-icon`

### Dialog Header

Use DialogHeader to give a dialog a labelled title area and optional close control.

**Anatomy**

- Header row (required) — Arranges the title block, optional start/end content, and close control.
- Start content — Wraps optional leading content.
- Title block (required) — Groups the title and optional subtitle.
- End content — Groups optional trailing content with the optional close control.
- Close icon — Visual close glyph inside the close button.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` |  | Dialog title (receives focus on open and labels the dialog via aria-labelledby). |
| `subtitle` | `string` |  | Subtitle below the title. |
| `onOpenChange` | `(isOpen: boolean) => unknown` |  | Close button callback (no button if omitted). |
| `startContent` | `ReactNode` |  | Content before the title (e.g., a back button). |
| `endContent` | `ReactNode` |  | Content after the title, before close button. |
| `endContentEdgeCompensation` | `'inline' \| 'block' \| 'all'` |  | Selects compensation axes for the end-content slot. Omit to preserve automatic close-action compensation. |
| `hasDivider` | `boolean` | `true` | Adds border at the bottom edge. |

Styling hook class: `.astryx-dialog-header`, `.astryx-dialog-header-start-content`, `.astryx-dialog-header-title-block`, `.astryx-dialog-header-end-content`, `.astryx-dialog-header-close-icon`

**Example — Basic**

```tsx

import {DialogHeader} from '@astryxdesign/core/Dialog';

<DialogHeader title="Delete file?" subtitle="This action cannot be undone." />;

```

**Example — With close button**

```tsx

import {useState} from 'react';
import {DialogHeader} from '@astryxdesign/core/Dialog';

function Header() {
  const [, setIsOpen] = useState(true);

  // Passing onOpenChange renders a close button that calls it with false.
  return <DialogHeader title="Settings" onOpenChange={setIsOpen} />;
}

```

**Example — With start and end content**

```tsx

import {DialogHeader} from '@astryxdesign/core/Dialog';
import {Icon} from '@astryxdesign/core/Icon';
import {Badge} from '@astryxdesign/core/Badge';

<DialogHeader
  title="Notifications"
  startContent={<Icon icon="chevronLeft" size="sm" />}
  endContent={<Badge label="3" />}
/>;

```

### Dialog Header

labelled dialog title area + optional close control

**Anatomy**

- Header row (required) — arranges title block, optional start/end content, close control
- Start content — wraps optional leading content
- Title block (required) — groups title + optional subtitle
- End content — groups optional trailing content + optional close control
- Close icon — close glyph inside close button

### Dialog Header

使用 DialogHeader 为对话框提供带标签的标题区和可选的关闭控件。

**Anatomy**

- Header row (required) — 排列标题区、可选的首尾内容和关闭控件。
- Start content — 包装可选的首部内容。
- Title block (required) — 组合标题和可选副标题。
- End content — 组合可选尾部内容和可选关闭控件。
- Close icon — 关闭按钮内的关闭图标。

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `title` | `string` |  | 对话框标题（打开时获得焦点）。 |
| `subtitle` | `string` |  | 标题下方的副标题。 |
| `onOpenChange` | `(isOpen: boolean) => unknown` |  | 关闭按钮的回调（省略时不显示按钮）。 |
| `startContent` | `ReactNode` |  | 标题之前的内容（例如返回按钮）。 |
| `endContent` | `ReactNode` |  | 标题之后、关闭按钮之前的内容。 |
| `endContentEdgeCompensation` | `'inline' \| 'block' \| 'all'` |  | 选择尾部内容插槽的补偿轴；省略时保留关闭操作的自动补偿。 |
| `hasDivider` | `boolean` | `true` | 在底部边缘添加分隔线。 |

Styling hook class: `.astryx-dialog-header`, `.astryx-dialog-header-start-content`, `.astryx-dialog-header-title-block`, `.astryx-dialog-header-end-content`, `.astryx-dialog-header-close-icon`

### useImperativeDialog

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `show` | `(content: ReactNode, options?: DialogOptions) => void` |  | Show the dialog with the given content. Options are the same as Dialog props minus isOpen/onOpenChange/children. |
| `hide` | `() => void` |  | Hide the dialog. |
| `isOpen` | `boolean` |  | Whether the dialog is currently open. |
| `element` | `ReactNode` |  | The dialog element: render this in your JSX tree. |

### useImperativeDialog

## Files

- `src/Dialog.doc.mjs`
- `src/Dialog.spec.md`
- `src/Dialog.tsx`
- `src/DialogContext.ts`
- `src/DialogHeader.doc.mjs`
- `src/DialogHeader.tsx`
- `src/modules/DialogHeader.spec.md`
- `src/useImperativeDialog.doc.mjs`
- `src/useImperativeDialog.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Dialog
