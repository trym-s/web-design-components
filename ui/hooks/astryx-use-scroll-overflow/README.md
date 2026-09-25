# useScrollOverflow

Tracks scroll overflow state for a horizontally scrollable container. Returns a ref callback and state booleans that update as the user scrolls or the container resizes. Uses scroll event listeners and ResizeObserver for reactive updates. Tolerance of 1px is applied to avoid sub-pixel false positives.

## Classification

- Category: `hooks` — functional
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/useScrollOverflow.ts`
- Nature: functional; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Tracks scroll overflow state for a horizontally scrollable container.
- Avoid when: Use for vertical scroll tracking; this hook only measures horizontal overflow.
- Provides: useScrollOverflow
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: family demo (hooks/astryx-use-container-reveal)
- Upstream: Astryx core · layout
- Keywords: scroll, overflow, carousel, fade, edge, horizontal, scrollable, resize

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

### useScrollOverflow

Import: `@astryxdesign/core/hooks`

Tracks scroll overflow state for a horizontally scrollable container. Returns a ref callback and state booleans that update as the user scrolls or the container resizes. Uses scroll event listeners and ResizeObserver for reactive updates. Tolerance of 1px is applied to avoid sub-pixel false positives.

**Do**

- Use to show/hide scroll navigation buttons or fade edges on carousels and horizontal lists.
- Apply the scrollRef to a container with overflow-x: auto or overflow-x: scroll.

**Don't**

- Use for vertical scroll tracking; this hook only measures horizontal overflow.

**Returns**

```ts
[
  {
    "name": "scrollRef",
    "type": "React.RefCallback<HTMLElement>",
    "description": "Ref callback to attach to the horizontally scrollable container element."
  },
  {
    "name": "overflowStart",
    "type": "boolean",
    "description": "Whether content overflows the start edge (left in LTR, right in RTL)."
  },
  {
    "name": "overflowEnd",
    "type": "boolean",
    "description": "Whether content overflows the end edge (right in LTR, left in RTL)."
  },
  {
    "name": "hasOverflow",
    "type": "boolean",
    "description": "Whether the container has any scroll overflow at all (scrollWidth > clientWidth)."
  }
]
```

## Files

- `upstream/useScrollOverflow.doc.mjs`
- `upstream/useScrollOverflow.ts`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/useScrollOverflow
