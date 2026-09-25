# useDevWarning

Fires a dev-only "Component: message" console warning once per mount while the condition holds. It is the render-safe way for a component to flag misuse: warning straight from the render body repeats on every render, and gating it with state adds a re-render, so this uses a ref and an effect instead. For a warning outside a component, use the imperative devWarn utility.

## Classification

- Category: `hooks` — functional
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/useDevWarning.ts`
- Nature: functional; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Fires a dev-only "Component: message" console warning once per mount while the condition holds.
- Avoid when: Use it for anything a user could see or for runtime error handling; it is stripped from production builds.
- Provides: useDevWarning
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: family demo (hooks/astryx-use-container-reveal)
- Upstream: Astryx core · utility
- Keywords: warning, dev, development, console, guardrail, misuse, invariant, debug, devWarn

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

### useDevWarning

Import: `@astryxdesign/core/hooks`

Fires a dev-only "Component: message" console warning once per mount while the condition holds. It is the render-safe way for a component to flag misuse: warning straight from the render body repeats on every render, and gating it with state adds a re-render, so this uses a ref and an effect instead. For a warning outside a component, use the imperative devWarn utility.

**Do**

- Say what is wrong and what the builder should do instead; the message is the whole value of the warning.
- Warn about combinations the types cannot express, such as two mutually exclusive props being set together.

**Don't**

- Use it for anything a user could see or for runtime error handling; it is stripped from production builds.

**Parameters**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `component` * | `string` |  | Component or hook name, used as the message prefix. |
| `message` * | `string` |  | What went wrong and how to fix it. |
| `condition` | `boolean` | `true` | Whether to warn. |

**Returns**

```ts
[]
```

## Files

- `src/useDevWarning.doc.mjs`
- `src/useDevWarning.ts`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/useDevWarning
