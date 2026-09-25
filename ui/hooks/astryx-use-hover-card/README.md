# useHoverCard

Headless hook for hover-triggered floating cards. Builds on useLayer with hover/focus intent detection, configurable delays, safe hover behavior, and accessible aria-describedby linking. Use for rich previews on hover when you need full control over the trigger or rendered content.

## Classification

- Category: `hooks` — functional
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/useHoverCard.tsx`
- Nature: functional; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Headless hook for hover-triggered floating cards.
- Avoid when: Use for simple text hints: use Tooltip or useTooltip instead.
- Provides: useHoverCard
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: HoverCardHookUsage
- Upstream: Astryx core · interaction
- Keywords: hovercard, hover, preview, card, tooltip, popup, floating, anchor

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

- `src/examples/HoverCardHookUsage.tsx` — useHoverCard — Profile Preview: Custom profile preview using useHoverCard with direct trigger and render control. · static: `static/HoverCardHookUsage.html`

## Documentation

### useHoverCard

Import: `@astryxdesign/core/HoverCard`

Headless hook for hover-triggered floating cards. Builds on useLayer with hover/focus intent detection, configurable delays, safe hover behavior, and accessible aria-describedby linking. Use for rich previews on hover when you need full control over the trigger or rendered content.

**Do**

- Use for rich content previews such as user profiles, entity summaries, and link previews.
- Prefer the HoverCard component for standard trigger-content pairs; use the hook for custom trigger patterns.

**Don't**

- Use for simple text hints: use Tooltip or useTooltip instead.

**Parameters**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `placement` | `'above' \| 'below' \| 'start' \| 'end'` | `'above'` | Position relative to the trigger. Logical: start/end resolve against the popover's own inherited direction (RTL mirrors in pure CSS). |
| `alignment` | `'start' \| 'center' \| 'end'` | `'center'` | Alignment along the placement axis. Logical: start/end resolve against the popover's own inherited direction (RTL mirrors in pure CSS). |
| `delay` | `number` | `300` | Delay before showing the hover card on hover, in milliseconds. |
| `hideDelay` | `number` | `200` | Delay before hiding after mouse or focus leaves, in milliseconds. |
| `focusTrigger` | `'auto' \| 'always' \| 'never'` | `'auto'` | When focus should open the hover card. auto only attaches focus listeners to naturally focusable elements. |
| `touchTrigger` | `'auto' \| 'tap' \| 'none'` | `'auto'` | What a tap does where there is no hover. auto opens on tap unless the trigger performs an action of its own; tap always opens; none never opens on touch. |
| `isEnabled` | `boolean` | `true` | Whether hover and focus triggers are enabled. |
| `label` | `string` |  | Accessible name for the hover card popup. When provided, the popup is exposed as a named role="dialog"; when omitted, it falls back to role="group" (a group may validly be unnamed). |
| `isOpen` | `boolean` |  | Controlled open state. true force-shows, false force-hides, undefined lets hover/focus manage visibility. |
| `isDefaultOpen` | `boolean` | `false` | Whether the hover card should be shown on mount. |
| `onShow` | `() => void` |  | Callback fired when the hover card becomes visible. |
| `onHide` | `() => void` |  | Callback fired when the hover card is hidden. |

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
    "description": "Ref for the positioning anchor element. Use when position and interaction live on different elements."
  },
  {
    "name": "interactionRef",
    "type": "RefCallback<HTMLElement>",
    "description": "Ref for the hover/focus interaction element. Use with positionRef for split trigger patterns."
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
    "name": "renderHoverCard",
    "type": "(children: ReactNode, props?: Omit<ContextRenderProps, 'positioning'>) => ReactNode",
    "description": "Render function for the anchor-positioned hover card content. The positioning opt-out is excluded: the hover card always derives its position from placement/alignment."
  },
  {
    "name": "show",
    "type": "() => void",
    "description": "Imperatively show the hover card immediately."
  },
  {
    "name": "hide",
    "type": "() => void",
    "description": "Imperatively hide the hover card immediately."
  }
]
```

## Files

- `src/useHoverCard.doc.mjs`
- `src/useHoverCard.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/useHoverCard
