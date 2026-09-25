# useMediaQuery

SSR-safe media query hook that subscribes to window.matchMedia changes. Returns whether the given media query matches. Always returns false on first render for SSR compatibility.

## Classification

- Category: `hooks` — functional
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/useMediaQuery.ts`
- Nature: functional; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: SSR-safe media query hook that subscribes to window.matchMedia changes.
- Avoid when: Use for server-rendered content that must match on first paint; the hook always returns false initially.
- Provides: useMediaQuery
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: family demo (hooks/astryx-use-container-reveal)
- Upstream: Astryx core · media
- Keywords: responsive, breakpoint, media, mobile, desktop, screen, matchmedia

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

### useMediaQuery

Import: `@astryxdesign/core/hooks`

SSR-safe media query hook that subscribes to window.matchMedia changes. Returns whether the given media query matches. Always returns false on first render for SSR compatibility.

**Do**

- Use for responsive layout switching based on viewport width, color scheme, or motion preferences.
- Prefer Astryx responsive tokens and component props over manual breakpoint logic when possible.

**Don't**

- Use for server-rendered content that must match on first paint; the hook always returns false initially.

**Parameters**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `query` * | `string` |  | CSS media query string to evaluate. |

**Returns**

```ts
[
  {
    "name": "matches",
    "type": "boolean",
    "description": "Whether the media query currently matches. Always false on first render (SSR-safe)."
  }
]
```

## Files

- `src/useMediaQuery.doc.mjs`
- `src/useMediaQuery.ts`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/useMediaQuery
