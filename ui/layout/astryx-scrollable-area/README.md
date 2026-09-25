# Scrollable Area

Provides a native scroll viewport and a real observed content box. The viewport enters the tab order only while a requested logical axis is effectively scrollable, and containment applies only to effective axes.

## Classification

- Category: `layout` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/ScrollableArea.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Provides a native scroll viewport and a real observed content box.
- Avoid when: Hide the native scrollbar without another visible and operable overflow affordance. Add another overflow wrapper around ScrollableArea; one native viewport should own scrolling.
- Provides: Viewport, Content box
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: default
- Upstream: Astryx core · Layout
- Keywords: scroll, overflow, viewport, logical axis, keyboard, overscroll, sticky, scrollbar, padding, full bleed

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

- None upstream; the demo mounts the documented playground defaults.

## Documentation

### Scrollable Area

Provides a native scroll viewport and a real observed content box. The viewport enters the tab order only while a requested logical axis is effectively scrollable, and containment applies only to effective axes.

**Do**

- Give every area a concise label that identifies the content keyboard users will scroll.
- Choose `inline`, `block`, or `both` from content intent; the component maps the logical axes through writing mode and direction.
- Keep the default `overscroll="allow"` for nested areas unless the interaction deliberately needs containment.
- Use `useScrollableArea` instead when a component already owns both a viewport and a suitable content box, or when children must remain direct flex/grid items or retain a definite percentage block-size basis.
- ScrollableArea owns one normal block content box with a 100% minimum size. Inline and both-axis modes use max-content inline sizing, so intrinsic inline layout is intentionally wider than the viewport.
- Use logical padding props on the content box so nested full-bleed components receive the same inset geometry.
- Set `isFullBleed` only when the viewport itself should reach an ancestor container edge; it is off by default.
- Set `stickyContainment="always"` only when a fitting viewport should intentionally remain a Sticky boundary.

**Don't**

- Hide the native scrollbar without another visible and operable overflow affordance.
- Add another overflow wrapper around ScrollableArea; one native viewport should own scrolling.

**Anatomy**

- Viewport (required) — The root native scroll container, accessible name owner, focus target while effective, and `astryx-scrollable-area` theme target.
- Content box (required) — A real inner layout box observed together with the viewport. For inline scrolling it uses max-content inline sizing with a 100% minimum.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `axis` | `'inline' \| 'block' \| 'both'` | `'block'` | Logical axis or axes where native scrolling is allowed. |
| `label` * | `string` |  | Accessible name for the viewport when it becomes keyboard scrollable. |
| `role` | `'group' \| 'region'` | `'group'` | Semantics for the named viewport. |
| `overscroll` | `'allow' \| 'contain'` | `'allow'` | Whether effective axes continue scrolling an ancestor at their edge. |
| `width` | `SizeValue` |  | Width of the viewport; a number is interpreted as pixels, a string is used as-is. |
| `height` | `SizeValue` |  | Height of the viewport; a number is interpreted as pixels, a string is used as-is. |
| `maxWidth` | `SizeValue` |  | Maximum width of the viewport. |
| `minHeight` | `SizeValue` |  | Minimum height of the viewport. |
| `stickyContainment` | `'whenScrollable' \| 'always'` | `'whenScrollable'` | Whether fitting content passes Sticky ownership to an outer container or deliberately keeps this viewport as the CSS Sticky boundary. |
| `padding` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` | `0` | Content padding on every logical edge; publishes matching inset geometry. |
| `paddingInline` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` |  | Logical inline-axis content padding; overrides `padding` on that axis. |
| `paddingInlineStart` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` |  | Logical inline-start content padding; overrides broader padding values. |
| `paddingInlineEnd` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` |  | Logical inline-end content padding; overrides broader padding values. |
| `paddingBlock` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` |  | Logical block-axis content padding; overrides `padding` on that axis. |
| `paddingBlockStart` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` |  | Logical block-start content padding; overrides broader padding values. |
| `paddingBlockEnd` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` |  | Logical block-end content padding; overrides broader padding values. |
| `isFullBleed` | `boolean` | `false` | Lets the viewport escape inherited container padding without changing content padding. |
| `children` | `ReactNode` |  | Content rendered inside the observed content box. |
| `xstyle` | `StyleXStyles` |  | StyleX sizing and native scrollbar presentation overrides for the viewport. |

Styling hook class: `.astryx-scrollable-area`

## Files

- `src/ScrollableArea.doc.mjs`
- `src/ScrollableArea.spec.md`
- `src/ScrollableArea.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/ScrollableArea
