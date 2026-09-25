# Divider

A visual separator that divides content into distinct sections. Use to create clear boundaries between groups of related content, or to demarcate interactive regions within a layout.

## Classification

- Category: `layout` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/Divider.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: A visual separator that divides content into distinct sections.
- Avoid when: Overuse dividers; rely on spacing and layout to separate content when possible.
- Provides: Divider group, Rule, Label
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: DividerShowcase, DividerFullBleed, DividerVariants, DividerVertical
- Upstream: Astryx core · Layout
- Keywords: divider, separator, hr, rule, line, border, spacer, horizontal rule

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

- `src/examples/DividerShowcase.tsx` — Divider — Variants: Horizontal dividers in subtle and strong variants, plus a labeled divider. A quick visual reference for separator styles. · static: `static/DividerShowcase.html`
- `src/examples/DividerFullBleed.tsx` — Divider — Full Bleed: Divider that extends past container padding to span the full width. Use inside cards or panels when you want a clean edge-to-edge separation, like between an order summary and total. · static: `static/DividerFullBleed.html`
- `src/examples/DividerVariants.tsx` — Divider — Variants: Subtle, labeled, and strong dividers in a single card. Use subtle between related sections, labeled for alternatives like "or", and strong for high-contrast boundaries. · static: `static/DividerVariants.html`
- `src/examples/DividerVertical.tsx` — Divider — Vertical: Vertical dividers separating side-by-side metrics. Use between stat cards, toolbar groups, or any horizontal layout where you need a visual boundary between sections. · static: `static/DividerVertical.html`

## Documentation

### Divider

A visual separator that divides content into distinct sections. Use to create clear boundaries between groups of related content, or to demarcate interactive regions within a layout.

**Do**

- Use subtle dividers between related content sections and strong dividers for high-contrast boundaries.
- Add a label to the divider when sections need a visible category heading.

**Don't**

- Overuse dividers; rely on spacing and layout to separate content when possible.

**Anatomy**

- Divider group (required) — Separator group that arranges one or two rules around an optional label.
- Rule (required) — Painted line segment; a second segment renders when a label is present.
- Label — Optional content displayed between two rule segments.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Orientation of the divider. |
| `label` | `ReactNode` |  | Optional label centered on the divider. |
| `variant` | `'subtle' \| 'strong'` | `'subtle'` | Visual weight of the divider line. |
| `isFullBleed` | `boolean` | `false` | Extend the divider to container edges with negative margins. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value, not an inline style object like style={{}}. |

Styling hook class: `.astryx-divider`

### Divider

A visual separator that divides content into distinct sections. Use to create clear boundaries between groups of related content, or to demarcate interactive regions within a layout.

**Do**

- Use subtle dividers between related content sections and strong dividers for high-contrast boundaries.
- Add a label to the divider when sections need a visible category heading.

**Don't**

- Overuse dividers; rely on spacing and layout to separate content when possible.

**Anatomy**

- Divider group (required) — Separator group that arranges one or two rules around an optional label.
- Rule (required) — Painted line segment; a second segment renders when a label is present.
- Label — Optional content displayed between two rule segments.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | 分隔线的方向。 |
| `label` | `ReactNode` |  | 居中显示在分隔线上的可选标签。 |
| `variant` | `'subtle' \| 'strong'` | `'subtle'` | 分隔线的视觉粗细。 |
| `isFullBleed` | `boolean` | `false` | 通过负边距将分隔线延伸至容器边缘。 |
| `xstyle` | `StyleXStyles` |  | 用于布局自定义的 StyleX 样式（边距、定位、尺寸）。必须是 stylex.create() 的值，不能是 style={{}} 这样的内联样式对象。 |

Styling hook class: `.astryx-divider`

## Files

- `src/Divider.doc.mjs`
- `src/Divider.spec.md`
- `src/Divider.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Divider
