# useLongPress

Detects a single-finger press-and-hold and reports where it happened, so touch users can reach affordances that a pointer gets from right-click. iOS Safari never synthesizes a contextmenu event on long-press, which makes this the only touch route into a cursor-positioned surface such as ContextMenu. The press cancels on movement, lift, multi-touch or unmount.

## Classification

- Category: `hooks` — functional
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/useLongPress.ts`
- Nature: functional; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Detects a single-finger press-and-hold and reports where it happened, so touch users can reach affordances that a pointer gets from right-click.
- Avoid when: Use it for the primary action of a control; press-and-hold is undiscoverable as the only way to do something.
- Provides: useLongPress
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: family demo (hooks/astryx-use-container-reveal)
- Upstream: Astryx core · interaction
- Keywords: long press, touch, press and hold, context menu, mobile, ios, safari, gesture, tap

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

### useLongPress

Import: `@astryxdesign/core/hooks`

Detects a single-finger press-and-hold and reports where it happened, so touch users can reach affordances that a pointer gets from right-click. iOS Safari never synthesizes a contextmenu event on long-press, which makes this the only touch route into a cursor-positioned surface such as ContextMenu. The press cancels on movement, lift, multi-touch or unmount.

**Do**

- Use the reported point to position the surface you open, so it appears under the finger.
- Pair it with the pointer contextmenu handler rather than replacing it; this hook only covers touch.

**Don't**

- Use it for the primary action of a control; press-and-hold is undiscoverable as the only way to do something.

**Parameters**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `options` * | `UseLongPressOptions` |  | Configuration object. |
| `options.onLongPress` * | `(point: {x: number; y: number}) => void` |  | Fired with the touch start point once the press is held for delayMs. |
| `options.disabled` | `boolean` | `false` | When true, the returned touch handlers are inert. |
| `options.delayMs` | `number` | `500` | Hold duration before the press fires, in milliseconds. |
| `options.moveCancelPx` | `number` | `10` | Movement past this distance on either axis cancels the press, treating it as a scroll or drag. |

**Returns**

```ts
[
  {
    "name": "handlers",
    "type": "UseLongPressHandlers",
    "description": "onTouchStart, onTouchMove, onTouchEnd and onTouchCancel to spread onto the target element."
  }
]
```

## Files

- `src/useLongPress.doc.mjs`
- `src/useLongPress.ts`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/useLongPress
