# useOverflow

Measures children rendered in a hidden container to determine how many fit in the available width without flickering. Uses ResizeObserver to react to container and measured-child size changes. The measurement container should hold all items plus an optional overflow indicator element (identified by a data-overflow-indicator attribute).

## Classification

- Category: `hooks` — functional
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/useOverflow.ts`
- Nature: functional; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Measures children rendered in a hidden container to determine how many fit in the available width without flickering.
- Avoid when: Use for vertical overflow; this hook measures horizontal width only.
- Provides: useOverflow
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: family demo (hooks/astryx-use-container-reveal)
- Upstream: Astryx core · layout
- Keywords: overflow, truncate, responsive, collapse, resize, measure, hidden, more, breadcrumb

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
- Hooks carry behavior only: port the logic, keep the accessibility contract.

## Examples

- None of its own upstream; the demo is its family's: `ui/hooks/astryx-use-container-reveal`.

## Documentation

### useOverflow

Import: `@astryxdesign/core/hooks`

Measures children rendered in a hidden container to determine how many fit in the available width without flickering. Uses ResizeObserver to react to container and measured-child size changes. The measurement container should hold all items plus an optional overflow indicator element (identified by a data-overflow-indicator attribute).

**Do**

- Render all items into the measureRef container (hidden) and only the first visibleCount items into the containerRef container (visible).
- Include an overflow indicator (e.g., "+N more" button) as the last child of the measurement container with a data-overflow-indicator attribute.

**Don't**

- Use for vertical overflow; this hook measures horizontal width only.

**Parameters**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `itemCount` * | `number` |  | Total number of items to measure for overflow. |
| `options` | `UseOverflowOptions` |  | Configuration object for overflow behavior. |
| `options.gap` | `number` | `0` | Gap between items in pixels. Used in width calculations. |
| `options.minVisibleItems` | `number` | `0` | Minimum number of items to always show, even if they don't fit. |
| `options.collapseFrom` | `'start' \| 'end'` | `'end'` | which end to collapse items from. |
| `options.behavior` | `'observeParent' \| 'observeSelf'` | `'observeSelf'` | Which element to observe for overflow calculations. 'observeParent' uses the container's parent element width, allowing the visible container to remain content-sized. |

**Returns**

```ts
[
  {
    "name": "containerRef",
    "type": "React.RefCallback<HTMLElement>",
    "description": "Ref callback to attach to the visible container element."
  },
  {
    "name": "measureRef",
    "type": "React.RefCallback<HTMLElement>",
    "description": "Ref callback to attach to the hidden measurement container that holds all items."
  },
  {
    "name": "visibleCount",
    "type": "number",
    "description": "Number of items that fit in the visible container."
  },
  {
    "name": "hasOverflow",
    "type": "boolean",
    "description": "Whether any items are overflowing (visibleCount < itemCount)."
  }
]
```

## Files

- `upstream/useOverflow.doc.mjs`
- `upstream/useOverflow.ts`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/useOverflow
