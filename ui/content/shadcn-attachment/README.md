# Attachment

Displays a file or image attachment with media, metadata, upload state, and actions.

## Classification

- Category: `content` — structural
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `upstream/ui/attachment.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: Displays a file or image attachment with media, metadata, upload state, and actions.
- Provides: attachment with 6 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: attachment-demo, attachment-image, attachment-states, attachment-sizes, attachment-group, attachment-trigger
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add attachment`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/attachment.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `upstream/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `attachment-demo` (radix-rhea) — `upstream/examples/attachment-demo.tsx`, `static/attachment-demo.html`

The `Attachment` component displays a file or image attachment, its media, name, and metadata, with optional actions and upload state. Use it for files and images in chat composers, message threads, and upload lists.

## Installation

```bash
npx shadcn@latest add attachment
```

- Install the required shadcn/ui dependencies:

```bash
npx shadcn@latest add button
```

- Copy and paste the following code into your project.

Source: `components/ui/attachment.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"
```

```tsx
<Attachment>
  <AttachmentMedia>
    <FileTextIcon />
  </AttachmentMedia>
  <AttachmentContent>
    <AttachmentTitle>sales-dashboard.pdf</AttachmentTitle>
    <AttachmentDescription>PDF · 2.4 MB</AttachmentDescription>
  </AttachmentContent>
  <AttachmentActions>
    <AttachmentAction aria-label="Remove sales-dashboard.pdf">
      <XIcon />
    </AttachmentAction>
  </AttachmentActions>
</Attachment>
```

## Composition

Use the following composition to build an attachment:

```text
Attachment
├── AttachmentMedia
├── AttachmentContent
│   ├── AttachmentTitle
│   └── AttachmentDescription
├── AttachmentActions
│   └── AttachmentAction
└── AttachmentTrigger
```

Use `AttachmentGroup` to lay out multiple attachments in a scrollable row:

```text
AttachmentGroup
├── Attachment
└── Attachment
```

## Features

- Icon and image media through `AttachmentMedia`
- Upload states: `idle`, `uploading`, `processing`, `error`, and `done` with built-in styling and a shimmer while in progress
- Three sizes and horizontal or vertical orientation
- A full-card `AttachmentTrigger` that opens a link or dialog while the actions stay independently clickable
- Scrollable, snapping `AttachmentGroup` with an edge fade
- Customizable styling through the `className` prop on every part

## Image

Set `variant="image"` on `AttachmentMedia` and render an `<img>` inside it. Use `orientation="vertical"` to stack the media above the content.

> Example `attachment-image` (radix-rhea) — `upstream/examples/attachment-image.tsx`, `static/attachment-image.html`

## States

Set `state` to reflect the upload lifecycle. `uploading` and `processing` shimmer the title, and `error` switches to a destructive treatment.

> Example `attachment-states` (radix-rhea) — `upstream/examples/attachment-states.tsx`, `static/attachment-states.html`

## Sizes

Use `size` to switch between `default`, `sm`, and `xs`.

> Example `attachment-sizes` (radix-rhea) — `upstream/examples/attachment-sizes.tsx`, `static/attachment-sizes.html`

## Group

Wrap attachments in `AttachmentGroup` to lay them out in a horizontally scrollable, snapping row with an edge fade.

> Example `attachment-group` (radix-rhea) — `upstream/examples/attachment-group.tsx`, `static/attachment-group.html`

## Trigger

Add an `AttachmentTrigger` to make the whole card open a link or dialog. It fills the card behind the actions, so the actions stay clickable.

> Example `attachment-trigger` (radix-rhea) — `upstream/examples/attachment-trigger.tsx`, `static/attachment-trigger.html`

```tsx showLineNumbers
<Dialog>
  <Attachment>
    {/* media, content, actions */}
    <DialogTrigger asChild>
      <AttachmentTrigger aria-label="Preview research-summary.pdf" />
    </DialogTrigger>
  </Attachment>
  <DialogContent>{/* ... */}</DialogContent>
</Dialog>
```

## Accessibility

`AttachmentAction` renders a `Button`, and `AttachmentTrigger` renders a real `<button>` (or your element via `asChild`). Follow the guidance below so both are operable and announced.

### Label icon-only actions

`AttachmentAction` is usually icon-only, so give each one an `aria-label` describing the action and its target.

```tsx showLineNumbers
<AttachmentAction aria-label="Remove sales-dashboard.pdf">
  <XIcon />
</AttachmentAction>
```

### Label the trigger

`AttachmentTrigger` covers the card with no text of its own, so give it an `aria-label` for what activating it does.

```tsx showLineNumbers
<AttachmentTrigger asChild>
  <a
    href={url}
    target="_blank"
    rel="noreferrer"
    aria-label="Open workspace.png"
  />
</AttachmentTrigger>
```

The trigger sits behind the actions in the stacking order, so an `AttachmentAction` and the `AttachmentTrigger` never trap each other — both remain separately focusable and clickable.

### Keyboard scrolling

An `AttachmentGroup` scrolls horizontally. When its attachments are interactive: a trigger or actions, keyboard users reach off-screen items by tabbing to them. For a row of presentational attachments, make the group itself focusable and scrollable by adding `tabIndex={0}`, `role="group"`, and an `aria-label`.

### Meaning beyond color

The `error` state uses a destructive color. Keep the failure reason in `AttachmentDescription` so the state is not conveyed by color alone.

## API Reference

### Attachment

The root attachment container.

| Prop          | Type                                                         | Default        | Description                                       |
| ------------- | ------------------------------------------------------------ | -------------- | ------------------------------------------------- |
| `state`       | `"idle" \| "uploading" \| "processing" \| "error" \| "done"` | `"done"`       | The upload state. Drives styling and the shimmer. |
| `size`        | `"default" \| "sm" \| "xs"`                                  | `"default"`    | The attachment size.                              |
| `orientation` | `"horizontal" \| "vertical"`                                 | `"horizontal"` | Lay the media beside or above the content.        |
| `className`   | `string`                                                     | -              | Additional classes to apply to the root element.  |

### AttachmentMedia

The media slot for an icon or image preview.

| Prop        | Type                | Default  | Description                                    |
| ----------- | ------------------- | -------- | ---------------------------------------------- |
| `variant`   | `"icon" \| "image"` | `"icon"` | Whether the media holds an icon or an `<img>`. |
| `className` | `string`            | -        | Additional classes to apply to the media slot. |

### AttachmentContent

Wraps the title and description.

| Prop        | Type     | Default | Description                                      |
| ----------- | -------- | ------- | ------------------------------------------------ |
| `className` | `string` | -       | Additional classes to apply to the content slot. |

### AttachmentTitle

The attachment name. Shimmers while the attachment is `uploading` or `processing`.

| Prop        | Type     | Default | Description                               |
| ----------- | -------- | ------- | ----------------------------------------- |
| `className` | `string` | -       | Additional classes to apply to the title. |

### AttachmentDescription

Secondary metadata such as the file type, size, or upload status.

| Prop        | Type     | Default | Description                                     |
| ----------- | -------- | ------- | ----------------------------------------------- |
| `className` | `string` | -       | Additional classes to apply to the description. |

### AttachmentActions

A container for one or more actions, aligned to the end of the attachment.

| Prop        | Type     | Default | Description                                 |
| ----------- | -------- | ------- | ------------------------------------------- |
| `className` | `string` | -       | Additional classes to apply to the actions. |

### AttachmentAction

An action button. Renders a [`Button`](/docs/components/button) and accepts all of its props.

| Prop       | Type                                  | Default     | Description                              |
| ---------- | ------------------------------------- | ----------- | ---------------------------------------- |
| `size`     | `Button["size"]`                      | `"icon-xs"` | The button size.                         |
| `...props` | `React.ComponentProps<typeof Button>` | -           | Props spread to the underlying `Button`. |

### AttachmentTrigger

A full-card overlay that activates the attachment. Renders a `<button>` by default.

| Prop       | Type                             | Default | Description                                  |
| ---------- | -------------------------------- | ------- | -------------------------------------------- |
| `asChild`  | `boolean`                        | `false` | Render as the child element, such as a link. |
| `...props` | `React.ComponentProps<"button">` | -       | Props spread to the trigger element.         |

### AttachmentGroup

Lays out attachments in a horizontally scrollable, snapping row.

| Prop        | Type     | Default | Description                               |
| ----------- | -------- | ------- | ----------------------------------------- |
| `className` | `string` | -       | Additional classes to apply to the group. |

## Files

- `upstream/ui/attachment.tsx` — the ui file as the registry installs it
- `upstream/examples/attachment-demo.tsx`
- `upstream/examples/attachment-image.tsx`
- `upstream/examples/attachment-states.tsx`
- `upstream/examples/attachment-sizes.tsx`
- `upstream/examples/attachment-group.tsx`
- `upstream/examples/attachment-trigger.tsx`
- `upstream/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/attachment
