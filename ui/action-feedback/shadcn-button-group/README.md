# Button Group

A container that groups related buttons together with consistent styling.

## Classification

- Category: `action-feedback` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (radix-ui primitives); static HTML + compiled CSS per example
- Framework: react
- Entry point: `src/ui/button-group.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T16:30:00Z
- Curation: pending
- Use when: A container that groups related buttons together with consistent styling.
- Provides: button-group with 11 documented examples
- Requires: React with Tailwind v4 and the shadcn tokens, or the static HTML with `ui/_sources/shadcn/styles.css`
- Variants: button-group-demo, button-group-orientation, button-group-size, button-group-nested, button-group-separator, button-group-split, button-group-input, button-group-input-group, button-group-dropdown, button-group-select, button-group-popover
- Upstream: shadcn/ui · style radix-nova
- Preferred install: `npx shadcn@latest add button-group`
- Registry: https://ui.shadcn.com/r/styles/radix-nova/button-group.json

## How an agent uses this reference

- **React + Tailwind v4 target** — `npx shadcn@latest add` installs the same code; or copy the ui file
  and the example from `src/`, changing only the `@/…` import paths.
- **Any other stack (vanilla HTML/CSS/JS, Vue, Svelte…)** — open `static/<example>.html`: the rendered DOM
  of each example; every class resolves through `ui/_sources/shadcn/styles.css` (the site's Tailwind
  build: tokens, utilities, animations). Keep the markup and the `--background`/`--primary`/… tokens;
  re-implement behavior from the docs below (Radix primitives supply focus, keyboard and ARIA).

## Documentation

> Example `button-group-demo` — `src/examples/button-group-demo.tsx`, `static/button-group-demo.html`

## Installation

```bash
npx shadcn@latest add button-group
```

- Install the following dependencies:

```bash
npm install radix-ui
```

- Copy and paste the following code into your project.

Source: `components/ui/button-group.tsx`

- Update the import paths to match your project setup.

## Usage

```tsx
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group"
```

```tsx
<ButtonGroup>
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</ButtonGroup>
```

## Composition

Use the following composition to build a `ButtonGroup`:

```text
ButtonGroup
├── Button or Input
├── ButtonGroupSeparator
└── ButtonGroupText
```

## Accessibility

- The `ButtonGroup` component has the `role` attribute set to `group`.
- Use <Kbd>Tab</Kbd> to navigate between the buttons in the group.
- Use `aria-label` or `aria-labelledby` to label the button group.

```tsx showLineNumbers
<ButtonGroup aria-label="Button group">
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</ButtonGroup>
```

## ButtonGroup vs ToggleGroup

- Use the `ButtonGroup` component when you want to group buttons that perform an action.
- Use the `ToggleGroup` component when you want to group buttons that toggle a state.

## Orientation

Set the `orientation` prop to change the button group layout.

> Example `button-group-orientation` — `src/examples/button-group-orientation.tsx`, `static/button-group-orientation.html`

## Size

Control the size of buttons using the `size` prop on individual buttons.

> Example `button-group-size` — `src/examples/button-group-size.tsx`, `static/button-group-size.html`

## Nested

Nest `<ButtonGroup>` components to create button groups with spacing.

> Example `button-group-nested` — `src/examples/button-group-nested.tsx`, `static/button-group-nested.html`

## Separator

The `ButtonGroupSeparator` component visually divides buttons within a group.

Buttons with variant `outline` do not need a separator since they have a border. For other variants, a separator is recommended to improve the visual hierarchy.

> Example `button-group-separator` — `src/examples/button-group-separator.tsx`, `static/button-group-separator.html`

## Split

Create a split button group by adding two buttons separated by a `ButtonGroupSeparator`.

> Example `button-group-split` — `src/examples/button-group-split.tsx`, `static/button-group-split.html`

## Input

Wrap an `Input` component with buttons.

> Example `button-group-input` — `src/examples/button-group-input.tsx`, `static/button-group-input.html`

## Input Group

Wrap an `InputGroup` component to create complex input layouts.

> Example `button-group-input-group` — `src/examples/button-group-input-group.tsx`, `static/button-group-input-group.html`

## Dropdown Menu

Create a split button group with a `DropdownMenu` component.

> Example `button-group-dropdown` — `src/examples/button-group-dropdown.tsx`, `static/button-group-dropdown.html`

## Select

Pair with a `Select` component.

> Example `button-group-select` — `src/examples/button-group-select.tsx`, `static/button-group-select.html`

## Popover

Use with a `Popover` component.

> Example `button-group-popover` — `src/examples/button-group-popover.tsx`, `static/button-group-popover.html`

## RTL

To enable RTL support in shadcn/ui, see the [RTL configuration guide](/docs/rtl).

> Example `button-group-rtl` — `src/examples/button-group-rtl.tsx`, `static/button-group-rtl.html`

## API Reference

### ButtonGroup

The `ButtonGroup` component is a container that groups related buttons together with consistent styling.

| Prop          | Type                         | Default        |
| ------------- | ---------------------------- | -------------- |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` |

```tsx
<ButtonGroup>
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</ButtonGroup>
```

Nest multiple button groups to create complex layouts with spacing. See the [nested](#nested) example for more details.

```tsx
<ButtonGroup>
  <ButtonGroup />
  <ButtonGroup />
</ButtonGroup>
```

### ButtonGroupSeparator

The `ButtonGroupSeparator` component visually divides buttons within a group.

| Prop          | Type                         | Default      |
| ------------- | ---------------------------- | ------------ |
| `orientation` | `"horizontal" \| "vertical"` | `"vertical"` |

```tsx
<ButtonGroup>
  <Button>Button 1</Button>
  <ButtonGroupSeparator />
  <Button>Button 2</Button>
</ButtonGroup>
```

### ButtonGroupText

Use this component to display text within a button group.

| Prop      | Type      | Default |
| --------- | --------- | ------- |
| `asChild` | `boolean` | `false` |

```tsx
<ButtonGroup>
  <ButtonGroupText>Text</ButtonGroupText>
  <Button>Button</Button>
</ButtonGroup>
```

Use the `asChild` prop to render a custom component as the text, for example a label.

```tsx showLineNumbers
import { ButtonGroupText } from "@/components/ui/button-group"
import { Label } from "@/components/ui/label"

export function ButtonGroupTextDemo() {
  return (
    <ButtonGroup>
      <ButtonGroupText asChild>
        <Label htmlFor="name">Text</Label>
      </ButtonGroupText>
      <Input placeholder="Type something here..." id="name" />
    </ButtonGroup>
  )
}
```

## Files

- `src/ui/button-group.tsx` — the ui file as the registry installs it
- `src/examples/button-group-demo.tsx`
- `src/examples/button-group-orientation.tsx`
- `src/examples/button-group-size.tsx`
- `src/examples/button-group-nested.tsx`
- `src/examples/button-group-separator.tsx`
- `src/examples/button-group-split.tsx`
- `src/examples/button-group-input.tsx`
- `src/examples/button-group-input-group.tsx`
- `src/examples/button-group-dropdown.tsx`
- `src/examples/button-group-select.tsx`
- `src/examples/button-group-popover.tsx`
- `src/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://ui.shadcn.com/docs/components/radix/button-group
