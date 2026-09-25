# Timer

Displays a standardized elapsed duration for active work without scheduling a React render on every tick. Elapsed format updates by second below one hour and by minute after one hour; clock format remains second-precise.

## Classification

- Category: `content` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/Timer.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Displays a standardized elapsed duration for active work without scheduling a React render on every tick.
- Avoid when: Do not use Timer for dates, time zones, or relative calendar language; use Timestamp instead. Do not add aria-live unless hearing an announcement every tick is appropriate for the specific task.
- Provides: Elapsed time
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: TimerShowcase, TimerFormats, TimerInline, TimerTypography
- Upstream: Astryx core · Content
- Keywords: timer, elapsed, duration, seconds, minutes, hours, stopwatch, waiting, loading, processing

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

## Examples

- `upstream/examples/TimerShowcase.tsx` — Timer · static: `static/TimerShowcase.html`
- `upstream/examples/TimerFormats.tsx` — Timer — Formats: Elapsed compact units and stopwatch clock notation shown from the same start time. · static: `static/TimerFormats.html`
- `upstream/examples/TimerInline.tsx` — Timer — Inline: A Timer composed into status copy while inheriting the surrounding typography. · static: `static/TimerInline.html`
- `upstream/examples/TimerTypography.tsx` — Timer — Typography: Timer using its Timestamp-matched default typography and an emphasized override. · static: `static/TimerTypography.html`

## Documentation

### Timer

Displays a standardized elapsed duration for active work without scheduling a React render on every tick. Elapsed format updates by second below one hour and by minute after one hour; clock format remains second-precise.

**Do**

- Use elapsed for compact duration text that may span seconds, minutes, or hours.
- Use clock for stopwatch-like surfaces where seconds remain meaningful after an hour.
- Pass startTime when the operation began before Timer mounted so the display reflects the complete wait.

**Don't**

- Do not use Timer for dates, time zones, or relative calendar language; use Timestamp instead.
- Do not add aria-live unless hearing an announcement every tick is appropriate for the specific task.

**Anatomy**

- Elapsed time (required) — Semantic time element containing a standardized elapsed duration.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `startTime` | `number` |  | Unix time in milliseconds when the measured operation began. Omit it to start from this Timer's mount. |
| `format` | `'elapsed' \| 'clock'` | `'elapsed'` | Standard duration representation. Elapsed uses compact units and drops seconds after one hour; clock uses m:ss or h:mm:ss. |
| `type` | `'body' \| 'large' \| 'label' \| 'supporting' \| 'code' \| 'display-1' \| 'display-2' \| 'display-3' \| 'inherit'` | `'supporting'` | Semantic text type. Uses the same typography behavior as Timestamp. |
| `size` | `'4xs' \| '3xs' \| '2xs' \| 'xsm' \| 'sm' \| 'base' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| '4xl'` |  | Explicit font size override. Overrides the size from type. |
| `color` | `'primary' \| 'secondary' \| 'disabled' \| 'placeholder' \| 'accent' \| 'inherit'` | `'secondary'` | Text color. |
| `weight` | `'normal' \| 'medium' \| 'semibold' \| 'bold'` |  | Font weight override. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for the Text wrapper. Must be a stylex.create() value. |
| `className` | `string` |  | CSS class name for the Text wrapper. Prefer xstyle for styling. |
| `style` | `CSSProperties` |  | Inline styles for the Text wrapper. Prefer xstyle for styling. |

Styling hook class: `.astryx-timer`

**Example — Elapsed duration**

```tsx
<Timer />
```

**Example — Stopwatch clock**

```tsx
<Timer format="clock" />
```

**Example — Operation that started before mount**

```tsx
<Timer startTime={operationStartedAt} />
```

**Example — Match surrounding text**

```tsx
<Text>
  Processing for <Timer type="inherit" color="inherit" />
</Text>
```

**Example — Prominent elapsed time**

```tsx
<Timer type="body" size="lg" color="primary" weight="semibold" />
```

## Files

- `upstream/Timer.doc.mjs`
- `upstream/Timer.spec.md`
- `upstream/Timer.tsx`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Timer
