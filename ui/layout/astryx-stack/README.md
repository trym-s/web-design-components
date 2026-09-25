# Stack

Stack arranges items in a row or column with consistent spacing. Use the gap prop to control the space between items.

## Classification

- Category: `layout` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/Stack.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Stack arranges items in a row or column with consistent spacing.
- Avoid when: Nest stacks inside stacks; try wrap="wrap" first to let items flow to the next line.
- Provides: Stack container, Item, Content
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: HStackShowcase, StackItemShowcase, VStackShowcase, HStackBasic, StackAlignment, StackDirections, StackFillItem, StackItemFill, VStackBasic
- Upstream: Astryx core · Layout
- Keywords: stack, hstack, vstack, flexbox, flex, spacing, gap, horizontal, vertical, row, column

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

- `src/examples/HStackShowcase.tsx` — H Stack: Demonstrates HStack arranging items horizontally with different gaps and alignments. · static: `static/HStackShowcase.html`
- `src/examples/StackItemShowcase.tsx` — Stack Item: StackItem can be used within HStack or VStack for more granular control over individual item sizing and alignment, but is optional; stack children work without it. · static: `static/StackItemShowcase.html`
- `src/examples/VStackShowcase.tsx` — V Stack: Demonstrates VStack arranging items vertically with different gaps. · static: `static/VStackShowcase.html`
- `src/examples/HStackBasic.tsx` — HStack — Basic: Items arranged in a horizontal row with a consistent gap and centered vertical alignment. Use HStack whenever siblings should sit side by side. · static: `static/HStackBasic.html`
- `src/examples/StackAlignment.tsx` — Stack — Alignment: Buttons positioned at the start, center, and end of a row. · static: `static/StackAlignment.html`
- `src/examples/StackDirections.tsx` — Stack — Directions: Badges arranged horizontally and vertically in side-by-side cards. · static: `static/StackDirections.html`
- `src/examples/StackFillItem.tsx` — Stack — Fill Item: An avatar, text, and button in a row; the text stretches to fill the available space. · static: `static/StackFillItem.html`
- `src/examples/StackItemFill.tsx` — StackItem — Fill: A static-width item next to one that fills the remaining space. Wrap stack children in StackItem when an item needs explicit sizing control. · static: `static/StackItemFill.html`
- `src/examples/VStackBasic.tsx` — VStack — Basic: A heading and paragraphs stacked vertically with a consistent gap. Use VStack whenever siblings should flow top to bottom with even spacing. · static: `static/VStackBasic.html`

## Documentation

### Stack

Stack arranges items in a row or column with consistent spacing. Use the gap prop to control the space between items.

**Do**

- Use the gap prop for spacing between items; don't add margins manually.
- Use StackItem with size="fill" to make one item stretch and fill the leftover space.

**Don't**

- Nest stacks inside stacks; try wrap="wrap" first to let items flow to the next line.

**Anatomy**

- Stack container (required) — Layout container that arranges content along one flex axis.
- Item — Optional StackItem wrapper that controls one item in the stack.
- Content — Caller-supplied content rendered by a Stack or StackItem.

Styling hook class: `.astryx-stack`, `.astryx-stack-item`

### Stack

Stack arranges items in a row or column with consistent spacing. Use the gap prop to control the space between items.

**Do**

- Use the gap prop for spacing between items; don't add margins manually.
- Use StackItem with size="fill" to make one item stretch and fill the leftover space.

**Don't**

- Nest stacks inside stacks; try wrap="wrap" first to let items flow to the next line.

**Anatomy**

- Stack container (required) — Layout container that arranges content along one flex axis.
- Item — Optional StackItem wrapper that controls one item in the stack.
- Content — Caller-supplied content rendered by a Stack or StackItem.

Styling hook class: `.astryx-stack`, `.astryx-stack-item`

## Files

- `src/Stack.doc.mjs`
- `src/Stack.spec.md`
- `src/Stack.tsx`
- `src/StackItem.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Stack
