# useTooltip

Headless hook for hover/focus-triggered tooltips. Builds on useLayer with hover intent, keyboard focus handling, and accessible aria-describedby linking. Use for custom trigger elements that need tooltip behavior without the wrapper component.

## Classification

- Category: `hooks` — functional
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/useTooltip.tsx`
- Nature: functional; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Headless hook for hover/focus-triggered tooltips.
- Avoid when: Put interactive content inside tooltips: use Popover or HoverCard instead.
- Provides: useTooltip
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: family demo (overlay/astryx-tooltip)
- Upstream: Astryx core · interaction
- Keywords: tooltip, hint, label, hover, info, title, floating

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

- None of its own upstream; the demo is its family's: `ui/overlay/astryx-tooltip`.

## Documentation

### useTooltip

Import: `@astryxdesign/core/Tooltip`

Headless hook for hover/focus-triggered tooltips. Builds on useLayer with hover intent, keyboard focus handling, and accessible aria-describedby linking. Use for custom trigger elements that need tooltip behavior without the wrapper component.

**Do**

- Use for brief text labels that describe icon buttons, truncated text, abbreviations, or compact controls.
- Prefer the Tooltip component for standard wrapping; use the hook when the trigger is not a simple child.

**Don't**

- Put interactive content inside tooltips: use Popover or HoverCard instead.

**Parameters**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `placement` | `'above' \| 'below' \| 'start' \| 'end'` | `'above'` | Position relative to the trigger. Logical: start/end resolve against the popover's own inherited direction (RTL mirrors in pure CSS). |
| `alignment` | `'start' \| 'center' \| 'end'` | `'center'` | Alignment along the placement axis. Logical: start/end resolve against the popover's own inherited direction (RTL mirrors in pure CSS). |
| `delay` | `number` | `200` | Delay before showing on hover, in milliseconds. |
| `hideDelay` | `number` | `0` | Delay before hiding after mouse or focus leaves, in milliseconds. |
| `focusTrigger` | `'auto' \| 'always' \| 'never'` | `'auto'` | When focus should open the tooltip. auto only attaches focus listeners to naturally focusable elements. |
| `touchTrigger` | `'auto' \| 'tap' \| 'none'` | `'auto'` | What a tap does where there is no hover. auto opens on tap unless the trigger performs an action of its own; tap always opens (an info icon rendered as a button); none never opens on touch. |
| `isEnabled` | `boolean` | `true` | Whether hover and focus triggers are enabled. |
| `isOpen` | `boolean` |  | Controlled open state. true force-shows, false force-hides, undefined lets hover/focus manage visibility. |
| `isDefaultOpen` | `boolean` | `false` | Whether the tooltip should be shown on mount. |
| `onShow` | `() => void` |  | Callback fired when the tooltip becomes visible. |
| `onHide` | `() => void` |  | Callback fired when the tooltip is hidden. |

**Returns**

```ts
[
  {
    "name": "ref",
    "type": "RefCallback<HTMLElement>",
    "description": "Combined ref that sets both position and interaction on the same trigger element."
  },
  {
    "name": "positionRef",
    "type": "RefCallback<HTMLElement>",
    "description": "Ref for the positioning anchor element."
  },
  {
    "name": "interactionRef",
    "type": "RefCallback<HTMLElement>",
    "description": "Ref for the hover/focus interaction element."
  },
  {
    "name": "anchorId",
    "type": "string",
    "description": "CSS anchor name for advanced positioning cases."
  },
  {
    "name": "describedBy",
    "type": "string",
    "description": "ID to compose into aria-describedby on the trigger."
  },
  {
    "name": "renderTooltip",
    "type": "(children: ReactNode, props?: Omit<ContextRenderProps, 'positioning'>) => ReactNode",
    "description": "Render function for the anchor-positioned tooltip content. The positioning opt-out is excluded: the tooltip always derives its position from placement/alignment."
  }
]
```

## Files

- `src/useTooltip.doc.mjs`
- `src/useTooltip.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/useTooltip
