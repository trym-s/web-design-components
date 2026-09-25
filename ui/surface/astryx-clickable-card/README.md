# Clickable Card

An interactive card for navigation or action targets. Nested interactive elements work independently.

## Classification

- Category: `surface` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/ClickableCard.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: An interactive card for navigation or action targets.
- Avoid when: Use for toggling selection; use SelectableCard for that.
- Provides: Container, Content
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: ClickableCardShowcase, ClickableCardElevated, ClickableCardWithNestedButton
- Upstream: Astryx core · Container
- Keywords: card, clickable, interactive, navigation, action, link

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

- `upstream/examples/ClickableCardShowcase.tsx` — Clickable Card: A clickable card that navigates on click. Nested interactive elements work independently. · static: `static/ClickableCardShowcase.html`
- `upstream/examples/ClickableCardElevated.tsx` — Clickable Card — Elevated: A clickable card raised with `elevation="med"` so the shadow signals the whole surface is interactive. · static: `static/ClickableCardElevated.html`
- `upstream/examples/ClickableCardWithNestedButton.tsx` — Clickable Card — Nested Button: A product card that navigates on click but has an independent "Add to cart" button inside. · static: `static/ClickableCardWithNestedButton.html`

## Documentation

### Clickable Card

An interactive card for navigation or action targets. Nested interactive elements work independently.

**Do**

- Use for cards that navigate to a detail page or trigger a single action.
- Nest buttons or links freely inside; they handle their own events.

**Don't**

- Use for toggling selection; use SelectableCard for that.

**Anatomy**

- Container (required) — Interactive div with hover/focus/active states.
- Content (required) — Children, which may include nested interactive elements.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `string` |  | Accessibility label. |
| `onClick` | `(event: MouseEvent) => void` |  | Click handler: fires on card surface only. |
| `href` | `string` |  | Navigation URL. Plain, new-tab, Cmd/Ctrl-click, and middle-click activation all follow the shared navigation rule described on the Link `href` prop. |
| `target` | `string` | `'_self'` | Link target. |
| `isDisabled` | `boolean` | `false` | Disables the card. |
| `children` | `ReactNode` |  | Card content. |
| `padding` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` | `4` | Inner padding. |
| `variant` | `'default' \| 'transparent' \| 'muted' \| 'blue' \| 'cyan' \| 'gray' \| 'green' \| 'orange' \| 'pink' \| 'purple' \| 'red' \| 'teal' \| 'yellow'` | `'default'` | Background color variant. |
| `elevation` | `'none' \| 'low' \| 'med' \| 'high'` | `'none'` | Resting shadow depth. Often raised to signal the whole card is clickable. |
| `width` | `SizeValue` |  | Card width. |
| `height` | `SizeValue` |  | Card height. |
| `maxWidth` | `SizeValue` |  | Maximum card width. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value, not an inline style object like style={{}}. |

Styling hook class: `.astryx-clickable-card`

## Files

- `upstream/ClickableCard.doc.mjs`
- `upstream/ClickableCard.tsx`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/ClickableCard
