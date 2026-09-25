# useEntryAnimation

Returns a StyleX style for animating an element on mount. Only animates when the element is dynamically inserted after the initial page paint; elements rendered on page load are not animated. Uses Astryx motion tokens (duration, easing) for consistent animation timing. Requires "use client"; does not support SSR.

## Classification

- Category: `hooks` — functional
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/useEntryAnimation.ts`
- Nature: functional; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Returns a StyleX style for animating an element on mount.
- Avoid when: Use for elements that should be visible on initial page load; they will not animate.
- Provides: useEntryAnimation
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: family demo (hooks/astryx-use-container-reveal)
- Upstream: Astryx core · animation
- Keywords: animation, entry, mount, transition, slide, fade, scale, motion, stylex

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
- Hooks carry behavior only: port the logic, keep the accessibility contract.

## Examples

- None of its own upstream; the demo is its family's: `ui/hooks/astryx-use-container-reveal`.

## Documentation

### useEntryAnimation

Import: `@astryxdesign/core/hooks`

Returns a StyleX style for animating an element on mount. Only animates when the element is dynamically inserted after the initial page paint; elements rendered on page load are not animated. Uses Astryx motion tokens (duration, easing) for consistent animation timing. Requires "use client"; does not support SSR.

**Do**

- Use for conditionally rendered elements like validation messages, toasts, or expanding sections.
- Spread the returned style into stylex.props() alongside other styles.

**Don't**

- Use for elements that should be visible on initial page load; they will not animate.

**Parameters**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `preset` | `'slideDown' \| 'slideUp' \| 'fadeIn' \| 'scaleIn'` | `'slideDown'` | Animation preset to apply on mount. |

**Returns**

```ts
[
  {
    "name": "entryStyle",
    "type": "StyleXStyles | null",
    "description": "A StyleX style object for the entry animation, or null if the element was rendered on initial page load (no animation needed)."
  }
]
```

## Files

- `src/useEntryAnimation.doc.mjs`
- `src/useEntryAnimation.ts`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/useEntryAnimation
