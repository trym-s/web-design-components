# Status Dot

A small colored dot that communicates status like online/offline presence or severity levels. Supports five semantic variants and an optional pulse animation. Always pair with a visible text label, as color alone should not carry meaning.

## Classification

- Category: `notification` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/StatusDot.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: A small colored dot that communicates status like online/offline presence or severity levels.
- Avoid when: Rely on color alone to communicate status; StatusDot is not fully accessible in isolation, so the builder must make the status distinguishable in context via a label, an icon, or an accessible alternative. Use the pulse animation for purely decorative purposes; reserve it for states that require immediate attention.
- Provides: Dot, Status icon
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: StatusDotShowcase, StatusDotPulsing, StatusDotStatusIndicators, StatusDotVariants
- Upstream: Astryx core · Feedback & Status
- Keywords: statusdot, dot, indicator, status, signal, presence, availability, online, pip

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

- `upstream/examples/StatusDotShowcase.tsx` — Status Dot: A positive status dot indicator. · static: `static/StatusDotShowcase.html`
- `upstream/examples/StatusDotPulsing.tsx` — StatusDot — Pulsing: Animated pulsing dots for live, processing, and error states. · static: `static/StatusDotPulsing.html`
- `upstream/examples/StatusDotStatusIndicators.tsx` — StatusDot — Status Indicators: Labeled status dot list for presence indicators like online, away, and offline. · static: `static/StatusDotStatusIndicators.html`
- `upstream/examples/StatusDotVariants.tsx` — StatusDot — Variants: All five semantic color variants displayed in a row. · static: `static/StatusDotVariants.html`

## Documentation

### Status Dot

A small colored dot that communicates status like online/offline presence or severity levels. Supports five semantic variants and an optional pulse animation. Always pair with a visible text label, as color alone should not carry meaning.

**Do**

- Use StatusDot as a binary present/absent signal; avoid encoding many distinct states in a single dot, since color and size alone cannot reliably distinguish them.
- Always pair with a visible text label so status is not conveyed by color alone.
- Provide a descriptive `label` prop for screen reader accessibility.
- Pair the dot with an icon that carries the status as a distinct shape when it must stand on its own without adjacent text, so meaning survives without color.
- If you can't add a label or an icon, make sure the status is conveyed elsewhere accessibly (e.g. adjacent text, a table column, or a live region).

**Don't**

- Rely on color alone to communicate status; StatusDot is not fully accessible in isolation, so the builder must make the status distinguishable in context via a label, an icon, or an accessible alternative.
- Use the pulse animation for purely decorative purposes; reserve it for states that require immediate attention.

**Anatomy**

- Dot (required) — Painted status dot that carries the selected semantic variant.
- Status icon — Optional caller-supplied icon rendered inside the dot.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` * | `'success' \| 'warning' \| 'error' \| 'accent' \| 'neutral'` |  | Semantic color variant. |
| `label` * | `string` |  | Accessible label surfaced via aria-label. |
| `isPulsing` | `boolean` | `false` | Enables a pulse animation; respects prefers-reduced-motion: reduce. |
| `tooltip` | `string` |  | Tooltip text shown on hover to explain the status meaning. |
| `icon` | `ReactNode` |  | Optional icon rendered centered inside the dot, painted in currentColor (the variant's ink). Gives the status a non-color mark, so use a different icon per status. Booleans and empty strings are ignored, so `cond && <Icon />` is safe. Same contract as AvatarStatusDot. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value, not an inline style object like style={{}}. |

Styling hook class: `.astryx-status-dot`, `.astryx-statusdot`

### Status Dot

A small colored dot that communicates status like online/offline presence or severity levels. Supports five semantic variants and an optional pulse animation. Always pair with a visible text label, as color alone should not carry meaning.

**Do**

- Use StatusDot as a binary present/absent signal; avoid encoding many distinct states in a single dot, since color and size alone cannot reliably distinguish them.
- Always pair with a visible text label so status is not conveyed by color alone.
- Provide a descriptive `label` prop for screen reader accessibility.
- Pair the dot with an icon that carries the status as a distinct shape when it must stand on its own without adjacent text, so meaning survives without color.
- If you can't add a label or an icon, make sure the status is conveyed elsewhere accessibly (e.g. adjacent text, a table column, or a live region).

**Don't**

- Rely on color alone to communicate status; StatusDot is not fully accessible in isolation, so the builder must make the status distinguishable in context via a label, an icon, or an accessible alternative.
- Use the pulse animation for purely decorative purposes; reserve it for states that require immediate attention.

**Anatomy**

- Dot (required) — Painted status dot that carries the selected semantic variant.
- Status icon — Optional caller-supplied icon rendered inside the dot.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` * | `'success' \| 'warning' \| 'error' \| 'accent' \| 'neutral'` |  | 语义颜色变体。 |
| `label` * | `string` |  | 通过 aria-label 暴露的无障碍标签。 |
| `isPulsing` | `boolean` | `false` | 启用脉冲动画；尊重 prefers-reduced-motion: reduce 设置。 |
| `icon` | `ReactNode` |  | 可选图标，居中渲染于圆点内，以 currentColor（变体的前景色）着色。为状态提供非颜色标记，请为每个状态使用不同图标。布尔值和空字符串会被忽略，因此 `cond && <Icon />` 是安全的。与 AvatarStatusDot 的契约一致。 |
| `xstyle` | `StyleXStyles` |  | 用于布局自定义的 StyleX 样式（外边距、定位、尺寸）。必须是 stylex.create() 的值，而非内联样式对象如 style={{}}。 |

Styling hook class: `.astryx-status-dot`, `.astryx-statusdot`

## Files

- `upstream/StatusDot.doc.mjs`
- `upstream/StatusDot.spec.md`
- `upstream/StatusDot.tsx`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/StatusDot
