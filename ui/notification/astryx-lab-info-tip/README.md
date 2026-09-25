# Info Tip

An inline info-icon help affordance: a small "i" button that reveals a tooltip on hover, keyboard focus, and tap. Use it next to labels, values, and metrics for permission notes, metric definitions, and field help. Its value over hand-composing Icon inside Tooltip is the pre-wired accessible trigger: a real button with an aria-label, Tab-reachable, tooltip on hover AND focus AND tap, and Escape dismissal.

## Classification

- Category: `notification` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/InfoTip.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: An inline info-icon help affordance: a small "i" button that reveals a tooltip on hover, keyboard focus, and tap.
- Avoid when: Hand-compose Icon inside Tooltip for info affordances; the bare Icon is aria-hidden and unfocusable, so keyboard and screen-reader users never see it. Use InfoTip for essential information users must see to complete a task; put that text inline instead.
- Provides: InfoTip, InfoTip
- Requires: React 19 with `@astryxdesign/lab` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: InfoTip, LayerDismissal
- Upstream: Astryx lab (experimental, canary-only upstream) · Feedback & Status
- Keywords: info, tooltip, help, hint, affordance, icon, label, field, metric, definition

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

- `src/stories/InfoTip.stories.tsx` — Storybook — InfoTip
- `src/stories/LayerDismissal.stories.tsx` — Storybook — LayerDismissal

## Documentation

### Info Tip

An inline info-icon help affordance: a small "i" button that reveals a tooltip on hover, keyboard focus, and tap. Use it next to labels, values, and metrics for permission notes, metric definitions, and field help. Its value over hand-composing Icon inside Tooltip is the pre-wired accessible trigger: a real button with an aria-label, Tab-reachable, tooltip on hover AND focus AND tap, and Escape dismissal.

**Do**

- Keep tooltip content concise, plain, and non-interactive; use Popover or HoverCard for links and buttons.
- Override label when "More information" is too generic, e.g. "About this metric".
- Rely on InfoTip rather than a hand-rolled info button on touch: it sets Tooltip touchTrigger to tap, so a tap opens the tooltip even though the trigger is a button, and a tap outside dismisses it.

**Don't**

- Hand-compose Icon inside Tooltip for info affordances; the bare Icon is aria-hidden and unfocusable, so keyboard and screen-reader users never see it.
- Use InfoTip for essential information users must see to complete a task; put that text inline instead.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `content` * | `ReactNode` |  | Content to display in the tooltip. Typically short, non-interactive text. Mirrors Tooltip's content prop. |
| `label` | `string` | `'More information'` | Accessible name for the trigger button. |
| `size` | `'xsm' \| 'sm' \| 'md' \| 'lg'` | `'sm'` | Size of the info icon (12px, 16px, 20px, 24px). Maps 1:1 to Icon sizes. |

### Info Tip

An inline info-icon help affordance: a small "i" button that reveals a tooltip on hover, keyboard focus, and tap. Use it next to labels, values, and metrics for permission notes, metric definitions, and field help.

**Do**

- Keep tooltip content concise, plain, and non-interactive; use Popover or HoverCard for links and buttons.
- Override label when "More information" is too generic, e.g. "About this metric".
- Rely on InfoTip rather than a hand-rolled info button on touch: it sets Tooltip touchTrigger to tap, so a tap opens the tooltip even though the trigger is a button, and a tap outside dismisses it.

**Don't**

- Hand-compose Icon inside Tooltip for info affordances; the bare Icon is aria-hidden and unfocusable, so keyboard and screen-reader users never see it.
- Use InfoTip for essential information users must see to complete a task; put that text inline instead.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `content` * | `ReactNode` |  | 工具提示中显示的内容。通常为简短的非交互文本。与 Tooltip 的 content 属性一致。 |
| `label` | `string` | `'More information'` | 触发按钮的无障碍名称。 |
| `size` | `'xsm' \| 'sm' \| 'md' \| 'lg'` | `'sm'` | 信息图标的尺寸（12px、16px、20px、24px）。与 Icon 尺寸一一对应。 |

## Files

- `src/InfoTip.doc.mjs`
- `src/InfoTip.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://facebook.github.io/astryx/storybook/
