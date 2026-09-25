# Badge

Badge highlights a status or category at a glance. Use it sparingly: only when a value represents a distinct state (Active, Failed) or a grouping tag (Engineering, Design). Most metadata (dates, durations, counts, descriptions) should be plain description text, not badges.

## Classification

- Category: `notification` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/Badge.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Badge highlights a status or category at a glance.
- Avoid when: Apply a "success" badge to every healthy/active/normal item. If all rows show green "Active" badges, none stand out; the badge adds noise, not information. Show only the states that need user attention (errors, warnings, pending actions). Use badges for metadata. Durations ("6h window"), counts ("12 trigger types"), dates, and descriptions are not statuses or categories; use description text (Text with type="supporting") instead. Use semantic status variants (success, warning, error, info) for categories or informational content. These are visually loud and should only indicate system state. Repeat the same badge in every row of a table or list. If the same value appears in most rows, it's not adding information; use plain text for common states and reserve badges for the exceptional ones. Make badges clickable; they are read-only indicators. Use a button or link if the user needs to take action.
- Provides: Icon, Label
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: BadgeShowcase, BadgeCategoryTags, BadgeCountBadges, BadgeStatusLabels
- Upstream: Astryx core · Feedback & Status
- Keywords: badge, tag, chip, label, status, indicator, count, counter, pill, notification, marker

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

- `upstream/examples/BadgeShowcase.tsx` — Badge — Variants: All semantic and color badge variants in a single view. Use semantic variants for status and color variants for categories. · static: `static/BadgeShowcase.html`
- `upstream/examples/BadgeCategoryTags.tsx` — Badge — Colors: Tag items with color-coded categories like teams, priorities, or topics. Use the 9 non-semantic color variants when you need to distinguish groups visually. · static: `static/BadgeCategoryTags.html`
- `upstream/examples/BadgeCountBadges.tsx` — Badge — Counts: Show a number inside a badge for notification counts, unread messages, or task totals. Use next to icons, nav items, or list labels. · static: `static/BadgeCountBadges.html`
- `upstream/examples/BadgeStatusLabels.tsx` — Badge — Status: Show the state of an item like Active, Pending, or Failed. Use in table rows, list items, or detail pages where users need to see status at a glance. · static: `static/BadgeStatusLabels.html`

## Documentation

### Badge

Badge highlights a status or category at a glance. Use it sparingly: only when a value represents a distinct state (Active, Failed) or a grouping tag (Engineering, Design). Most metadata (dates, durations, counts, descriptions) should be plain description text, not badges.

**Do**

- Every status badge steals attention. Only badge states where the user needs to notice or act: errors, warnings, items requiring follow-up. If no action is needed, plain text is fine.
- Use success, warning, and error variants only for system status that demands attention: "Failed", "Degraded", "Action Required". These have bold solid backgrounds designed to stand out.
- Use color variants (blue, purple, teal, etc.) for category tags that group or classify items: team names, content types, priority levels.
- Keep labels to one or two words. If you need more detail, put it in surrounding text instead of the badge.
- Add an icon when it helps identify the badge type quickly, but always include a text label alongside it.

**Don't**

- Apply a "success" badge to every healthy/active/normal item. If all rows show green "Active" badges, none stand out; the badge adds noise, not information. Show only the states that need user attention (errors, warnings, pending actions).
- Use badges for metadata. Durations ("6h window"), counts ("12 trigger types"), dates, and descriptions are not statuses or categories; use description text (Text with type="supporting") instead.
- Use semantic status variants (success, warning, error, info) for categories or informational content. These are visually loud and should only indicate system state.
- Repeat the same badge in every row of a table or list. If the same value appears in most rows, it's not adding information; use plain text for common states and reserve badges for the exceptional ones.
- Make badges clickable; they are read-only indicators. Use a button or link if the user needs to take action.

**Anatomy**

- Icon — An optional leading icon that helps identify the badge type at a glance.
- Label (required) — The text or number shown inside the badge.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'neutral' \| 'info' \| 'success' \| 'warning' \| 'error' \| 'blue' \| 'cyan' \| 'green' \| 'orange' \| 'pink' \| 'purple' \| 'red' \| 'teal' \| 'yellow'` | `'neutral'` | Visual style variant. Semantic variants (neutral, info, success, warning, error) use solid backgrounds. Non-semantic color variants use tinted backgrounds with colored text for categorization and tagging. |
| `label` | `ReactNode` |  | Badge text content. A badge is one line, so a label wider than the space available is cut with an ellipsis rather than escaping its container; a string or number label is also set as the badge's title so the full text stays reachable on hover. |
| `icon` | `ReactNode` |  | Optional leading icon. |

Styling hook class: `.astryx-badge`

### Badge

Badge highlights a status or category at a glance. Use it sparingly: only when a value represents a distinct state (Active, Failed) or a grouping tag (Engineering, Design). Most metadata (dates, durations, counts, descriptions) should be plain description text, not badges.

**Do**

- Every status badge steals attention. Only badge states where the user needs to notice or act: errors, warnings, items requiring follow-up. If no action is needed, plain text is fine.
- Use success, warning, and error variants only for system status that demands attention: "Failed", "Degraded", "Action Required". These have bold solid backgrounds designed to stand out.
- Use color variants (blue, purple, teal, etc.) for category tags that group or classify items: team names, content types, priority levels.
- Keep labels to one or two words. If you need more detail, put it in surrounding text instead of the badge.
- Add an icon when it helps identify the badge type quickly, but always include a text label alongside it.

**Don't**

- Apply a "success" badge to every healthy/active/normal item. If all rows show green "Active" badges, none stand out; the badge adds noise, not information. Show only the states that need user attention (errors, warnings, pending actions).
- Use badges for metadata. Durations ("6h window"), counts ("12 trigger types"), dates, and descriptions are not statuses or categories; use description text (Text with type="supporting") instead.
- Use semantic status variants (success, warning, error, info) for categories or informational content. These are visually loud and should only indicate system state.
- Repeat the same badge in every row of a table or list. If the same value appears in most rows, it's not adding information; use plain text for common states and reserve badges for the exceptional ones.
- Make badges clickable; they are read-only indicators. Use a button or link if the user needs to take action.

**Anatomy**

- Icon — An optional leading icon that helps identify the badge type at a glance.
- Label (required) — The text or number shown inside the badge.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'neutral' \| 'info' \| 'success' \| 'warning' \| 'error' \| 'blue' \| 'cyan' \| 'green' \| 'orange' \| 'pink' \| 'purple' \| 'red' \| 'teal' \| 'yellow'` | `'neutral'` | 视觉样式变体。语义变体使用实色背景，非语义颜色变体使用浅色背景配彩色文字。 |
| `label` | `ReactNode` |  | 徽章文本内容。 |
| `icon` | `ReactNode` |  | 可选的前置图标。 |

Styling hook class: `.astryx-badge`

## Files

- `upstream/Badge.doc.mjs`
- `upstream/Badge.test-violations.tsx`
- `upstream/Badge.tsx`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Badge
