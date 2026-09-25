# Input Group

Add addons, buttons, and helper content to inputs.

## Classification

- Category: `input` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `upstream/ui/input-group.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: Add addons, buttons, and helper content to inputs.
- Provides: input-group with 23 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: input-group-demo, input-group-inline-start, input-group-inline-end, input-group-block-start, input-group-block-end, input-group-icon, input-group-text, input-group-button, input-group-kbd, input-group-dropdown, input-group-spinner, input-group-textarea, input-group-custom, input-group-basic, input-group-button-group, input-group-in-card, input-group-label, input-group-textarea-examples, input-group-tooltip, input-group-with-addons, input-group-with-buttons, input-group-with-kbd, input-group-with-tooltip
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add input-group`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/input-group.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `upstream/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

import { IconInfoCircle } from "@tabler/icons-react"

> Example `input-group-demo` — `upstream/examples/input-group-demo.tsx`, `static/input-group-demo.html`

## Installation

```bash
npx shadcn@latest add input-group
```

- Copy and paste the following code into your project.

Source: `components/ui/input-group.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx showLineNumbers
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
```

```tsx showLineNumbers
<InputGroup>
  <InputGroupInput placeholder="Search..." />
  <InputGroupAddon>
    <SearchIcon />
  </InputGroupAddon>
</InputGroup>
```

## Composition

Use the following composition to build an `InputGroup`:

```text
InputGroup
├── InputGroupInput or InputGroupTextarea
├── InputGroupAddon
├── InputGroupButton
└── InputGroupText
```

## Align

Use the `align` prop on `InputGroupAddon` to position the addon relative to the input.

> Note:
  For proper focus management, `InputGroupAddon` should always be placed after
  `InputGroupInput` or `InputGroupTextarea` in the DOM. Use the `align` prop to
  visually position the addon.

### inline-start

Use `align="inline-start"` to position the addon at the start of the input. This is the default.

> Example `input-group-inline-start` — `upstream/examples/input-group-inline-start.tsx`, `static/input-group-inline-start.html`

### inline-end

Use `align="inline-end"` to position the addon at the end of the input.

> Example `input-group-inline-end` — `upstream/examples/input-group-inline-end.tsx`, `static/input-group-inline-end.html`

### block-start

Use `align="block-start"` to position the addon above the input.

> Example `input-group-block-start` — `upstream/examples/input-group-block-start.tsx`, `static/input-group-block-start.html`

### block-end

Use `align="block-end"` to position the addon below the input.

> Example `input-group-block-end` — `upstream/examples/input-group-block-end.tsx`, `static/input-group-block-end.html`

## Icon

> Example `input-group-icon` — `upstream/examples/input-group-icon.tsx`, `static/input-group-icon.html`

## Text

> Example `input-group-text` — `upstream/examples/input-group-text.tsx`, `static/input-group-text.html`

## Button

> Example `input-group-button` — `upstream/examples/input-group-button.tsx`, `static/input-group-button.html`

## Kbd

> Example `input-group-kbd` — `upstream/examples/input-group-kbd.tsx`, `static/input-group-kbd.html`

## Dropdown

> Example `input-group-dropdown` — `upstream/examples/input-group-dropdown.tsx`, `static/input-group-dropdown.html`

## Spinner

> Example `input-group-spinner` — `upstream/examples/input-group-spinner.tsx`, `static/input-group-spinner.html`

## Textarea

> Example `input-group-textarea` — `upstream/examples/input-group-textarea.tsx`, `static/input-group-textarea.html`

## Custom Input

Add the `data-slot="input-group-control"` attribute to your custom input for automatic focus state handling.

Here's an example of a custom resizable textarea from a third-party library.

> Example `input-group-custom` — `upstream/examples/input-group-custom.tsx`, `static/input-group-custom.html`

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `input-group-rtl` — `upstream/examples/input-group-rtl.tsx`, `static/input-group-rtl.html`

## API Reference

### InputGroup

The main component that wraps inputs and addons.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `className` | `string` |         |

```tsx
<InputGroup>
  <InputGroupInput />
  <InputGroupAddon />
</InputGroup>
```

### InputGroupAddon

Displays icons, text, buttons, or other content alongside inputs.

> Note:
  For proper focus navigation, the `InputGroupAddon` component should be placed
  after the input. Set the `align` prop to position the addon.

| Prop        | Type                                                             | Default          |
| ----------- | ---------------------------------------------------------------- | ---------------- |
| `align`     | `"inline-start" \| "inline-end" \| "block-start" \| "block-end"` | `"inline-start"` |
| `className` | `string`                                                         |                  |

```tsx
<InputGroupAddon align="inline-end">
  <SearchIcon />
</InputGroupAddon>
```

**For `<InputGroupInput />`, use the `inline-start` or `inline-end` alignment. For `<InputGroupTextarea />`, use the `block-start` or `block-end` alignment.**

The `InputGroupAddon` component can have multiple `InputGroupButton` components and icons.

```tsx
<InputGroupAddon>
  <InputGroupButton>Button</InputGroupButton>
  <InputGroupButton>Button</InputGroupButton>
</InputGroupAddon>
```

### InputGroupButton

Displays buttons within input groups.

| Prop        | Type                                                                          | Default   |
| ----------- | ----------------------------------------------------------------------------- | --------- |
| `size`      | `"xs" \| "icon-xs" \| "sm" \| "icon-sm"`                                      | `"xs"`    |
| `variant`   | `"default" \| "destructive" \| "outline" \| "secondary" \| "ghost" \| "link"` | `"ghost"` |
| `className` | `string`                                                                      |           |

```tsx
<InputGroupButton>Button</InputGroupButton>
<InputGroupButton size="icon-xs" aria-label="Copy">
  <CopyIcon />
</InputGroupButton>
```

### InputGroupInput

Replacement for `<Input />` when building input groups. This component has the input group styles pre-applied and uses the unified `data-slot="input-group-control"` for focus state handling.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `className` | `string` |         |

All other props are passed through to the underlying `<Input />` component.

```tsx
<InputGroup>
  <InputGroupInput placeholder="Enter text..." />
  <InputGroupAddon>
    <SearchIcon />
  </InputGroupAddon>
</InputGroup>
```

### InputGroupTextarea

Replacement for `<Textarea />` when building input groups. This component has the textarea group styles pre-applied and uses the unified `data-slot="input-group-control"` for focus state handling.

| Prop        | Type     | Default |
| ----------- | -------- | ------- |
| `className` | `string` |         |

All other props are passed through to the underlying `<Textarea />` component.

```tsx
<InputGroup>
  <InputGroupTextarea placeholder="Enter message..." />
  <InputGroupAddon align="block-end">
    <InputGroupButton>Send</InputGroupButton>
  </InputGroupAddon>
</InputGroup>
```

## Changelog

### 2025-10-06 `InputGroup`

Add the `min-w-0` class to the `InputGroup` component. See [diff](https://github.com/shadcn-ui/ui/pull/8341/files#diff-0e2ee95d0050ca4c5d82339df86c54e14a6739dc4638fdda0eec8f73aebc2da9).

## Files

- `upstream/ui/input-group.tsx` — the ui file as the registry installs it
- `upstream/examples/input-group-demo.tsx`
- `upstream/examples/input-group-inline-start.tsx`
- `upstream/examples/input-group-inline-end.tsx`
- `upstream/examples/input-group-block-start.tsx`
- `upstream/examples/input-group-block-end.tsx`
- `upstream/examples/input-group-icon.tsx`
- `upstream/examples/input-group-text.tsx`
- `upstream/examples/input-group-button.tsx`
- `upstream/examples/input-group-kbd.tsx`
- `upstream/examples/input-group-dropdown.tsx`
- `upstream/examples/input-group-spinner.tsx`
- `upstream/examples/input-group-textarea.tsx`
- `upstream/examples/input-group-custom.tsx`
- `upstream/examples/input-group-basic.tsx`
- `upstream/examples/input-group-button-group.tsx`
- `upstream/examples/input-group-in-card.tsx`
- `upstream/examples/input-group-label.tsx`
- `upstream/examples/input-group-textarea-examples.tsx`
- `upstream/examples/input-group-tooltip.tsx`
- `upstream/examples/input-group-with-addons.tsx`
- `upstream/examples/input-group-with-buttons.tsx`
- `upstream/examples/input-group-with-kbd.tsx`
- `upstream/examples/input-group-with-tooltip.tsx`
- `upstream/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/input-group
