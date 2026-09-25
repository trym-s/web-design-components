# Log Stream

Experimental streaming log viewer: mono grid rows (timestamp \| level \| source \| message) with token-derived level accents, expandable per-row detail panels, follow-scroll live tailing with a "Jump to latest" affordance, and an always-dark terminal variant. Appended rows fade in via @starting-style. Live announcements follow the pinning state: the role="log" region is aria-live="polite" only while following the tail, and aria-live="off" while unfollowed, so a busy stream never floods assistive tech.

## Classification

- Category: `content` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/LogStream.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Experimental streaming log viewer: mono grid rows (timestamp \| level \| source \| message) with token-derived level accents, expandable per-row detail panels, follow-scroll live tailing with a "Jump to latest" affordance, and an always-dark terminal variant.
- Provides: LogStream
- Requires: React 19 with `@astryxdesign/lab` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: LogStream
- Upstream: Astryx lab (experimental, canary-only upstream) · Content
- Keywords: log, stream, terminal, console, output, logs, tail

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

## Examples

- `src/stories/LogStream.stories.tsx` — Storybook — LogStream

## Documentation

### Log Stream

Experimental streaming log viewer: mono grid rows (timestamp \| level \| source \| message) with token-derived level accents, expandable per-row detail panels, follow-scroll live tailing with a "Jump to latest" affordance, and an always-dark terminal variant. Appended rows fade in via @starting-style. Live announcements follow the pinning state: the role="log" region is aria-live="polite" only while following the tail, and aria-live="off" while unfollowed, so a busy stream never floods assistive tech.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `entries` * | `LogEntry[]` |  | Array of log entry objects to render. |
| `variant` | `'default' \| 'terminal'` | `'default'` | Visual variant style: 'default' uses theme surface background, 'terminal' uses fixed dark background. |
| `isFollowing` | `boolean` |  | Controlled follow-pinning state to auto-scroll to the newest entry. |
| `onFollowChange` | `(following: boolean) => void` |  | Callback fired when follow-pinning state changes. |
| `maxHeight` | `number \| string` |  | Maximum container height before vertical scrolling. |
| `hasTimestamps` | `boolean` | `true` | Show or hide the timestamp column. |
| `label` | `string` | `'Log stream'` | Accessible label for the log region. |
| `renderEntry` | `(entry: LogEntry) => ReactNode` |  | Custom render function for replacing individual row layout. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization. |

## Files

- `src/LogStream.doc.mjs`
- `src/LogStream.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://facebook.github.io/astryx/storybook/
