# Collapsible

Collapsible hides and reveals content behind a trigger button. Use it in settings panels, FAQ pages, or detail views to keep the page scannable while letting users drill into sections they care about. Wrap multiple collapsibles in CollapsibleGroup for accordion behavior. For custom collapsible components, use the `useCollapsible` hook directly (`astryx hook useCollapsible`).

## Classification

- Category: `surface` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/Collapsible.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Collapsible hides and reveals content behind a trigger button.
- Avoid when: Hide critical or required content behind a collapsible; users may not discover it. Nest collapsibles more than two levels deep; it makes content hard to find and navigate. Use a collapsible for a single short paragraph; just show the text directly instead.
- Provides: Trigger, Chevron, Content
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: CollapsibleGroupShowcase, CollapsibleShowcase, CollapsibleControlledAccordion, CollapsibleDividedAccordion, CollapsibleGroupAccordion, CollapsibleMultipleAccordion, CollapsibleSingleAccordion, CollapsibleWithoutCard
- Upstream: Astryx core · Container
- Keywords: accordion, collapse, expandable, disclosure, toggle, panel, foldable, expander, expand

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

- `src/examples/CollapsibleGroupShowcase.tsx` — Collapsible Group: CollapsibleGroup coordinates its Collapsible children: with type="single", opening one closes the others. No state or handlers in the example — the group owns which value is open and each child only declares its own. One Collapsible per Card, so each trigger keeps its default large type as the heading of its own surface. · static: `static/CollapsibleGroupShowcase.html`
- `src/examples/CollapsibleShowcase.tsx` — Collapsible: An accordion group with three collapsible sections in single mode: opening one closes the others. · static: `static/CollapsibleShowcase.html`
- `src/examples/CollapsibleControlledAccordion.tsx` — Collapsible — Controlled: Manage the open section from parent state, so something other than a click can move it: a URL parameter, a form jumping to the step that failed validation, or the Previous/Next controls shown here. onChange hands back the whole open value. · static: `static/CollapsibleControlledAccordion.html`
- `src/examples/CollapsibleDividedAccordion.tsx` — Collapsible — FAQ: FAQ built with hasDividers: row hairlines and density padding with no custom CSS. Questions set their own type — body at semibold, not the trigger's default 17px large — so a list of questions reads as rows rather than a stack of headings, and question and answer separate on weight and color instead of size. · static: `static/CollapsibleDividedAccordion.html`
- `src/examples/CollapsibleGroupAccordion.tsx` — CollapsibleGroup — Density: density sets the block padding on every row in the group, so a list of sections can be tuned to the surface it sits on without touching the rows. compact for dense surfaces like sidebars and inspectors, balanced (the default) for page content, spacious for a short list that is the main thing on the page. It follows Table's scale and pairs with hasDividers, which turns it on at balanced. · static: `static/CollapsibleGroupAccordion.html`
- `src/examples/CollapsibleMultipleAccordion.tsx` — Collapsible — Multiple Mode: Several sections open at once, for comparing across them — feature lists, pricing tiers. One Collapsible per Card, so each trigger keeps its own large type: it is the heading of its surface, not a row in a list. · static: `static/CollapsibleMultipleAccordion.html`
- `src/examples/CollapsibleSingleAccordion.tsx` — Collapsible — Single Mode: Only one section open at a time, so a single body of content competes for attention. Use defaultValue to pre-expand whichever section a first-time reader needs. Each Collapsible owns a Section, so its trigger is that section heading. · static: `static/CollapsibleSingleAccordion.html`
- `src/examples/CollapsibleWithoutCard.tsx` — Collapsible — With Dividers: A flat list on the page background with hand-placed Dividers, for detail panels and sidebars where cards would add too much weight. Rows, so the triggers step down to body-semibold and a supporting metadata line sits under each answer. · static: `static/CollapsibleWithoutCard.html`

## Documentation

### Collapsible

Collapsible hides and reveals content behind a trigger button. Use it in settings panels, FAQ pages, or detail views to keep the page scannable while letting users drill into sections they care about. Wrap multiple collapsibles in CollapsibleGroup for accordion behavior. For custom collapsible components, use the `useCollapsible` hook directly (`astryx hook useCollapsible`).

**Do**

- Use hasDividers on CollapsibleGroup for FAQ-style lists: built-in row hairlines with themed border tokens, no hand-rolled borders.
- Wrap each Collapsible in an Card for visual separation in accordion layouts, or use CollapsibleGroup's hasDividers for flat lists; don't combine both.
- Use CollapsibleGroup with type="single" for settings or FAQ pages where only one section should be open at a time.
- Use type="multiple" when users need to compare content across sections, like feature lists or pricing tiers.
- Start sections open (defaultIsOpen) when the content is likely needed on first view; don't make users click to see essential info.

**Don't**

- Hide critical or required content behind a collapsible; users may not discover it.
- Nest collapsibles more than two levels deep; it makes content hard to find and navigate.
- Use a collapsible for a single short paragraph; just show the text directly instead.

**Anatomy**

- Trigger (required) — The always-visible button that toggles the content. Shows a label and a chevron indicator.
- Chevron — Animated disclosure arrow. It follows the label by default; chevronPosition="start" moves it ahead of the label, points inward when collapsed (mirrored under RTL), and turns down when expanded.
- Content — The area that hides or reveals when the trigger is clicked.

**Accessibility**

- Trigger label — WCAG 1.4.3 Contrast (Minimum) (4.5:1): The trigger text must have at least 4.5:1 contrast with the surface behind it. For Pointer down, measure against the pressed overlay the trigger row paints while it is pressed.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `trigger` * | `ReactNode` |  | Content shown in the trigger area (always visible). |
| `children` | `ReactNode` |  | Content that collapses and expands. |
| `defaultIsOpen` | `boolean` | `true` | Default open state (uncontrolled). |
| `isOpen` | `boolean` |  | Controlled open state. |
| `isDisabled` | `boolean` | `false` | Disable the item so its trigger can't be toggled (dimmed, aria-disabled, and out of the tab order). Doesn't collapse an already-open item. |
| `onOpenChange` | `(isOpen: boolean) => void` |  | Callback invoked when the open state changes. |
| `chevronPosition` | `'start' \| 'end'` | `'end'` | Logical position of Collapsible's disclosure chevron. `end` (default) follows the label, pointing down when collapsed and up when expanded. `start` precedes the label, pointing inward toward content when collapsed (mirrored under RTL) and down when expanded. Inside a CollapsibleGroup this defaults to the group's chevronPosition. |
| `value` | `string` |  | Identifier used for group coordination. Required when placed inside an CollapsibleGroup. |

Styling hook class: `.astryx-collapsible`, `.astryx-collapsible-trigger`, `.astryx-collapsible-content`, `.astryx-collapsible-group`

### Collapsible Group

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `'single' \| 'multiple'` | `'single'` | Whether one or many items can be open simultaneously. |
| `defaultValue` | `string \| string[]` |  | Default open item(s) for uncontrolled usage. Use a string for single mode and an array for multiple mode. |
| `value` | `string \| string[]` |  | Controlled open item(s). |
| `onChange` | `(value: string \| string[]) => void` |  | Callback invoked when the set of open items changes. |
| `hasDividers` | `boolean` | `false` | Whether to draw hairline dividers between the group's items. When set, the group renders a wrapper div and items default to 'balanced' density. Pair with bare Collapsible children; Card-wrapped items provide their own separation. |
| `density` | `'compact' \| 'balanced' \| 'spacious'` |  | Row density controlling trigger and content block padding on the group's items. Defaults to 'balanced' when dividers are shown; otherwise items keep their default unpadded look. |
| `chevronPosition` | `'start' \| 'end'` | `'end'` | Logical position shared by the group's direct Collapsible items. `end` is the default trailing indicator; `start` is a leading disclosure arrow that points inward when collapsed (mirrored under RTL) and down when expanded. An individual Collapsible can still override it. |
| `children` * | `ReactNode` |  | Collapsible instances to coordinate. |

### Collapsible Group

### Collapsible Group

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `type` | `'single' \| 'multiple'` | `'single'` | 是否允许同时展开一个或多个项目。 |
| `defaultValue` | `string \| string[]` |  | 非受控模式下默认展开的项目。single 模式使用字符串，multiple 模式使用数组。 |
| `value` | `string \| string[]` |  | 受控展开的项目。 |
| `onChange` | `(value: string \| string[]) => void` |  | 展开项目集合变更时调用的回调。 |
| `hasDividers` | `boolean` | `false` | 是否在组项目之间绘制细线分隔线。启用后组会渲染一个包裹 div，且项目默认使用 'balanced' 密度。适合搭配裸 Collapsible 子项使用；用 Card 包裹的项目自带视觉分隔。 |
| `density` | `'compact' \| 'balanced' \| 'spacious'` |  | 控制组内项目触发器和内容块内边距的行密度。显示分隔线时默认为 'balanced'；否则项目保持默认的无内边距外观。 |
| `chevronPosition` | `'start' \| 'end'` | `'end'` | 组内直接 Collapsible 项目的逻辑箭头位置。`end` 是默认的尾随指示器；`start` 是前置展开箭头，折叠时指向内容（RTL 下镜像），展开时向下。单个 Collapsible 仍可覆盖此设置。 |
| `children` * | `ReactNode` |  | 需要协调的 Collapsible 实例。 |

## Files

- `src/Collapsible.doc.mjs`
- `src/Collapsible.spec.md`
- `src/Collapsible.tsx`
- `src/CollapsibleGroup.doc.mjs`
- `src/CollapsibleGroup.tsx`
- `src/CollapsibleGroupContext.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Collapsible
