# Selectable Card

A card that toggles between selected and unselected states with an accent border. For navigation use ClickableCard.

## Classification

- Category: `surface` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/SelectableCard.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: A card that toggles between selected and unselected states with an accent border.
- Avoid when: Use for navigation; use ClickableCard for that.
- Provides: Container, Content
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: SelectableCardShowcase, SelectableCardElevated, SelectableCardMulti
- Upstream: Astryx core · Container
- Keywords: card, selectable, toggle, checkbox, radio, selection

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

- `src/examples/SelectableCardShowcase.tsx` — Selectable Card: A plan picker with single-select radio behavior. Cards show an accent border when selected. · static: `static/SelectableCardShowcase.html`
- `src/examples/SelectableCardElevated.tsx` — Selectable Card — Elevated: Raised selectable cards with `elevation="low"`. The inset selection ring composes on top of the shadow, so a selected card keeps its elevation. · static: `static/SelectableCardElevated.html`
- `src/examples/SelectableCardMulti.tsx` — Selectable Card — Multi-select: Multi-select tag picker using color variant selectable cards with color-matched selection borders. · static: `static/SelectableCardMulti.html`

## Documentation

### Selectable Card

A card that toggles between selected and unselected states with an accent border. For navigation use ClickableCard.

**Do**

- Use for plan pickers, filter chips, or option grids.
- For single-select track one ID; for multi-select use a Set.
- When focused, toggle selection with Space or Enter.

**Don't**

- Use for navigation; use ClickableCard for that.

**Anatomy**

- Container (required) — Interactive div with accent border on selection.
- Content (required) — Children rendered inside the card.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` * | `string` |  | Accessibility label. |
| `isSelected` * | `boolean` |  | Controlled selection state. |
| `onChange` * | `(isSelected: boolean) => void` |  | Called when toggled. |
| `isDisabled` | `boolean` | `false` | Disables the card. |
| `children` | `ReactNode` |  | Card content. |
| `padding` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` | `4` | Inner padding. |
| `variant` | `'default' \| 'transparent' \| 'muted' \| 'blue' \| 'cyan' \| 'gray' \| 'green' \| 'orange' \| 'pink' \| 'purple' \| 'red' \| 'teal' \| 'yellow'` | `'default'` | Background color variant. |
| `elevation` | `'none' \| 'low' \| 'med' \| 'high'` | `'none'` | Resting shadow depth. The selection ring composes on top, so a selected card keeps its shadow. |
| `width` | `SizeValue` |  | Card width. |
| `height` | `SizeValue` |  | Card height. |
| `maxWidth` | `SizeValue` |  | Maximum card width. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value, not an inline style object like style={{}}. |

**Theming variables**

- `--selectable-card-ring-color` — Colour of the selection ring drawn for a variant a theme added. The built-in variants each ring in their own border token and ignore this; a theme that adds a variant sets it in the same rule as that variant's `backgroundColor`, because no token the component could pick is guaranteed to contrast with a fill it cannot know. (default `var(--color-accent)`)

Styling hook class: `.astryx-selectable-card`

## Files

- `src/SelectableCard.doc.mjs`
- `src/SelectableCard.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/SelectableCard
