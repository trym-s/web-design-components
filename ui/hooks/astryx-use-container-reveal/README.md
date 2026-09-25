# useContainerReveal

A headless hover/focus reveal primitive. Gives a container a scoped trigger that reveals (or conceals) content inside it when the container is hovered or receives keyboard focus: the classic "row actions appear on hover" pattern. The reveal is CSS-only: no hover state lives in React and hovering never triggers a re-render. The caller authors no StyleX for the reveal itself; the hook hands out the container and content styles, and a nested container shadows its ancestor, so nested containers never leak hover/focus into one another. Accessible by construction: revealed content is visually hidden at rest with position and opacity (never display:none), so it stays mounted, keeps its place in the tab order, and is announced to assistive technology; it reveals on :focus-within so keyboard users see it when tabbing in, stays visible on touch (never gated behind hover on coarse pointers), and honors prefers-reduced-motion.

## Classification

- Category: `hooks` — functional
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/useContainerReveal.ts`
- Nature: functional; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: A headless hover/focus reveal primitive.
- Avoid when: Reach past the API into the hook's private custom properties (--_reveal-opacity and friends) to suppress a reveal; use forceState / forceVisibility, which survive a rename. Use it to hide content that must always be discoverable; keep essential actions visible instead of gating them behind hover.
- Provides: useContainerReveal
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: useContainerRevealHookUsage
- Upstream: Astryx core · interaction
- Keywords: reveal, hover, focus, container, row, actions, overlay, conceal, hidden, show

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

- `src/examples/useContainerRevealHookUsage.tsx` — useContainerReveal — Reveal-on-hover Row Actions: File rows keep their edit/delete actions hidden at rest and reveal them on hover or keyboard focus via useContainerReveal; the actions stay mounted and in the tab order. · static: `static/useContainerRevealHookUsage.html`

## Documentation

### useContainerReveal

Import: `@astryxdesign/core/hooks`

A headless hover/focus reveal primitive. Gives a container a scoped trigger that reveals (or conceals) content inside it when the container is hovered or receives keyboard focus: the classic "row actions appear on hover" pattern. The reveal is CSS-only: no hover state lives in React and hovering never triggers a re-render. The caller authors no StyleX for the reveal itself; the hook hands out the container and content styles, and a nested container shadows its ancestor, so nested containers never leak hover/focus into one another. Accessible by construction: revealed content is visually hidden at rest with position and opacity (never display:none), so it stays mounted, keeps its place in the tab order, and is announced to assistive technology; it reveals on :focus-within so keyboard users see it when tabbing in, stays visible on touch (never gated behind hover on coarse pointers), and honors prefers-reduced-motion.

**Do**

- Destructure getContainerProps and getContentRevealProps; spread getContainerProps() on the container (via mergeProps with your own stylex.props) and getContentRevealProps() on the content to reveal.
- Use for secondary affordances: reveal-on-hover row actions (edit/copy/remove on list or table rows) and overlay controls on a card or media tile (e.g. Thumbnail's remove button).
- Gate the reveal with isEnabled when a consumer prop decides whether content is revealed on hover or always shown; it can change at any time.
- Pass isLayoutPreserved for absolutely-positioned or overlay content to reserve its box and avoid layout shift when it appears.
- Set a hoverDelay (100-250ms) on rows in a long list, so a cursor travelling across the list does not light up every row it passes; keyboard and touch still reveal immediately.
- Reach for forceState when something other than the pointer owns the interaction (a drag, a scroll or motion gate, an open row menu), and forceVisibility when just one element should ignore the container.

**Don't**

- Reach past the API into the hook's private custom properties (--_reveal-opacity and friends) to suppress a reveal; use forceState / forceVisibility, which survive a rename.
- Use it to hide content that must always be discoverable; keep essential actions visible instead of gating them behind hover.

**Parameters**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `options` | `UseContainerRevealOptions` |  | Configuration object for the reveal container. Optional. |
| `options.isEnabled` | `boolean` | `true` | When false the hook is inert: the container gets no styles and content getters return no styles, so content is always shown. Read on every render, so a component can flip it after mount (e.g. revealOn === "hover"). |

**Returns**

```ts
[
  {
    "name": "getContainerProps",
    "type": "(options?: ContainerRevealOptions) => {className?: string; style?: CSSProperties}",
    "description": "Spread onto the container whose hover/focus-within drives the reveal. Accepts hoverDelay (ms the pointer must dwell before the reveal starts: a hover-intent gate like Tooltip's and HoverCard's delay, so a cursor sweeping across a list leaves nothing painted behind it) and forceState (\"active\" | \"inactive\") to pin the trigger state when a caller owns it: a motion gate, a scroll, or a row whose menu is open. \"inactive\" still yields to keyboard focus and coarse pointers."
  },
  {
    "name": "getContentRevealProps",
    "type": "(options?: ContentRevealOptions) => {className?: string; style?: CSSProperties}",
    "description": "Spread onto each revealed / concealed child. Accepts isRevealInverted to conceal-on-hover instead of reveal-on-hover, isLayoutPreserved to reserve the layout box while hidden (opacity-only) and avoid layout shift, and forceVisibility (\"shown\" | \"hidden\") to pin this one element's appearance whatever the container is doing. \"hidden\" yields to focus."
  }
]
```

## Files

- `src/useContainerReveal.doc.mjs`
- `src/useContainerReveal.ts`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/useContainerReveal
