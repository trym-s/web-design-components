# useInteractiveRole

Resolves what a polymorphic component should render as, in one place: href wins, then onClick, then an interactive trigger context supplied by a parent (Popover, DropdownMenu and friends), then inert. Use it in any component that is sometimes a link, sometimes a button, and sometimes plain content; Token, Thumbnail, Item and ClickableCard all do. Because context is part of the resolution, a component built on it becomes a valid trigger for new surfaces without changing.

## Classification

- Category: `hooks` — functional
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/useInteractiveRole.ts`
- Nature: functional; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Resolves what a polymorphic component should render as, in one place: href wins, then onClick, then an interactive trigger context supplied by a parent (Popover, DropdownMenu and friends), then inert.
- Avoid when: Add another ad-hoc href/onClick precedence check in a component; new trigger contexts are added here so every consumer inherits them.
- Provides: useInteractiveRole
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: family demo (hooks/astryx-use-container-reveal)
- Upstream: Astryx core · interaction
- Keywords: role, polymorphic, link, button, inert, href, onClick, element type, as, trigger, semantics, accessibility, a11y

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

### useInteractiveRole

Import: `@astryxdesign/core/hooks`

Resolves what a polymorphic component should render as, in one place: href wins, then onClick, then an interactive trigger context supplied by a parent (Popover, DropdownMenu and friends), then inert. Use it in any component that is sometimes a link, sometimes a button, and sometimes plain content; Token, Thumbnail, Item and ClickableCard all do. Because context is part of the resolution, a component built on it becomes a valid trigger for new surfaces without changing.

**Do**

- Switch on the returned role to pick the element, and render an anchor only for "link" so keyboard and middle-click behavior come from the platform.
- Pass isDisabled through rather than dropping the href yourself; the hook already keeps disabled links out of the tab order.

**Don't**

- Add another ad-hoc href/onClick precedence check in a component; new trigger contexts are added here so every consumer inherits them.

**Parameters**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `options` * | `UseInteractiveRoleOptions` |  | The interactivity inputs the component received. |
| `options.href` | `string` |  | URL for navigation. Highest priority: with an href the component is a link. |
| `options.onClick` | `((...args: never[]) => unknown) \| null` |  | Click handler. Resolves to a button, ahead of any context-provided role. |
| `options.isDisabled` | `boolean` | `false` | When true, href is ignored for role resolution (a disabled link is an anti-pattern), so the role comes from onClick, then context, then inert. |

**Returns**

```ts
[
  {
    "name": "role",
    "type": "'link' | 'button' | 'inert'",
    "description": "The element the component should render: an anchor, a button, or a non-interactive span/div."
  }
]
```

## Files

- `upstream/useInteractiveRole.doc.mjs`
- `upstream/useInteractiveRole.ts`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/useInteractiveRole
