# Card

Card is a bordered, elevated container for discrete, self-contained items: things you could reorder, remove, or interact with independently. Cards are NOT the default layout tool. Most content groups don't need a container at all; spacing and alignment create visual grouping naturally. Only reach for a Card when items need clear interaction boundaries or visual comparison in a grid.

## Classification

- Category: `surface` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/Card.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Card is a bordered, elevated container for discrete, self-contained items: things you could reorder, remove, or interact with independently.
- Avoid when: Default to cards for visual grouping. A heading + Stack with proper spacing creates hierarchy without adding borders everywhere. Cards should be the exception, not the default. Wrap page sections in cards. "General Settings", "Notification Preferences", form groups: these are page regions, use Section or heading + stack. Create identical card grids (icon + heading + text, repeated). Vary the layout or question whether cards are needed at all. Nest cards inside other cards; flatten the hierarchy or use spacing and dividers instead. Use color variants for status; use Banner or Badge for that. Color cards are for categorization.
- Provides: Container, Content
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: CardShowcase, CardCallout, CardElevations, CardVariants, CardWithInnerLayout, CardWithSimpleContent
- Upstream: Astryx core · Container
- Keywords: card, surface, panel, container, elevated, shadow, box, paper, tile, well

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

- `src/examples/CardShowcase.tsx` — Card: A card with a heading and body text showing the default container style. · static: `static/CardShowcase.html`
- `src/examples/CardCallout.tsx` — Card — Callout: Muted-variant cards for tips, notes, or supplementary information. Use when content should be visually distinct but not prominent. The muted variant uses a wash background instead of the elevated default, making it feel recessed rather than raised. Works well in sidebars, help panels, or inline callouts. · static: `static/CardCallout.html`
- `src/examples/CardElevations.tsx` — Card — Elevations: The four elevation levels side by side. Cards are flat by default; raise a card with `elevation` only when it needs to float above surrounding content. · static: `static/CardElevations.html`
- `src/examples/CardVariants.tsx` — Card — Variants: Default, muted, and color variants side by side. Use color variants to categorize cards visually, like team colors, project tags, or content types. Each color uses the corresponding background token from the theme, so they adapt to light and dark mode automatically. · static: `static/CardVariants.html`
- `src/examples/CardWithInnerLayout.tsx` — Card — Layout: A card with a structured header, content area, and footer with action buttons. Use for forms, dialogs, or settings panels that need clear sections. Pair Card with Layout to get automatic dividers between header, content, and footer. The footer aligns actions to the right by default. · static: `static/CardWithInnerLayout.html`
- `src/examples/CardWithSimpleContent.tsx` — Card — Simple: A card with a heading and body text. Use for summaries, descriptions, or any grouped content that needs visual separation from the page. The card handles its own border, background, and padding; just pass your content as children. Set a width to constrain it, or leave it to fill the parent. · static: `static/CardWithSimpleContent.html`

## Documentation

### Card

Card is a bordered, elevated container for discrete, self-contained items: things you could reorder, remove, or interact with independently. Cards are NOT the default layout tool. Most content groups don't need a container at all; spacing and alignment create visual grouping naturally. Only reach for a Card when items need clear interaction boundaries or visual comparison in a grid.

**Do**

- Ask "could I reorder or remove this independently?" If yes, it's a card. If no, it's just a section of the page: use a heading + Stack or Section.
- Use cards for discrete items: a single user profile, a single notification, a single metric, a product in a grid. Each card represents one "thing" with clear interaction boundaries.
- Spacing and alignment alone create visual grouping. Not everything needs a container; try removing the card and see if the grouping is still clear from whitespace and typography.
- Keep padding consistent across sibling cards so they align visually in a grid or list.
- Pair a card with Layout when you need a structured header, scrollable content, and footer with actions.

**Don't**

- Default to cards for visual grouping. A heading + Stack with proper spacing creates hierarchy without adding borders everywhere. Cards should be the exception, not the default.
- Wrap page sections in cards. "General Settings", "Notification Preferences", form groups: these are page regions, use Section or heading + stack.
- Create identical card grids (icon + heading + text, repeated). Vary the layout or question whether cards are needed at all.
- Nest cards inside other cards; flatten the hierarchy or use spacing and dividers instead.
- Use color variants for status; use Banner or Badge for that. Color cards are for categorization.

**Anatomy**

- Container (required) — The outer box with border, background, border-radius, and padding.
- Content (required) — Any children rendered inside the card. Often a stack of heading, text, and actions.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `width` | `SizeValue` |  | Width of the card (number = pixels, string = used as-is). |
| `height` | `SizeValue` |  | Height of the card (number = pixels, string = used as-is). |
| `maxWidth` | `SizeValue` |  | Maximum width of the card. |
| `minHeight` | `SizeValue` |  | Minimum height of the card. |
| `children` | `ReactNode` |  | Content to render inside the card. |
| `padding` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` | `the theme's card padding (spacing step 4 with no theme)` | Internal padding using the spacing scale. Omit it and the card takes the theme's card padding rather than a step, so passing a step is a decision to override the theme, not a way to restate the default. |
| `variant` | `'default' \| 'transparent' \| 'muted' \| 'blue' \| 'cyan' \| 'gray' \| 'green' \| 'orange' \| 'pink' \| 'purple' \| 'red' \| 'teal' \| 'yellow'` | `'default'` | Background color variant. `default` uses the standard card background. `transparent` drops the background entirely. `muted` uses the muted background for de-emphasised cards. The non-semantic variants use the corresponding `--color-background-<name>` token. |
| `elevation` | `'none' \| 'low' \| 'med' \| 'high'` | `'none'` | Resting shadow depth. `none` is flat; `low`/`med`/`high` map to the shadow token scale. Raise a card only when it needs to float above surrounding content. |

Styling hook class: `.astryx-card`

### Card

Card is a bordered, elevated container for discrete, self-contained items: things you could reorder, remove, or interact with independently. Cards are NOT the default layout tool. Most content groups don't need a container at all; spacing and alignment create visual grouping naturally. Only reach for a Card when items need clear interaction boundaries or visual comparison in a grid.

**Do**

- Ask "could I reorder or remove this independently?" If yes, it's a card. If no, it's just a section of the page: use a heading + Stack or Section.
- Use cards for discrete items: a single user profile, a single notification, a single metric, a product in a grid. Each card represents one "thing" with clear interaction boundaries.
- Spacing and alignment alone create visual grouping. Not everything needs a container; try removing the card and see if the grouping is still clear from whitespace and typography.
- Keep padding consistent across sibling cards so they align visually in a grid or list.
- Pair a card with Layout when you need a structured header, scrollable content, and footer with actions.

**Don't**

- Default to cards for visual grouping. A heading + Stack with proper spacing creates hierarchy without adding borders everywhere. Cards should be the exception, not the default.
- Wrap page sections in cards. "General Settings", "Notification Preferences", form groups: these are page regions, use Section or heading + stack.
- Create identical card grids (icon + heading + text, repeated). Vary the layout or question whether cards are needed at all.
- Nest cards inside other cards; flatten the hierarchy or use spacing and dividers instead.
- Use color variants for status; use Banner or Badge for that. Color cards are for categorization.

**Anatomy**

- Container (required) — The outer box with border, background, border-radius, and padding.
- Content (required) — Any children rendered inside the card. Often a stack of heading, text, and actions.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `width` | `SizeValue` |  | 卡片宽度（数字 = 像素，字符串 = 按原样使用）。 |
| `height` | `SizeValue` |  | 卡片高度（数字 = 像素，字符串 = 按原样使用）。 |
| `maxWidth` | `SizeValue` |  | 卡片最大宽度。 |
| `minHeight` | `SizeValue` |  | 卡片最小高度。 |
| `children` | `ReactNode` |  | 在卡片内部渲染的内容。 |
| `padding` | `0 \| 0.5 \| 1 \| 1.5 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10` | `the theme's card padding (spacing step 4 with no theme)` | 使用间距比例的内边距。省略时，卡片采用主题的卡片内边距，而不是某个步进值；传入步进值意味着覆盖主题，而不是复述默认值。 |
| `variant` | `'default' \| 'transparent' \| 'muted' \| 'blue' \| 'cyan' \| 'gray' \| 'green' \| 'orange' \| 'pink' \| 'purple' \| 'red' \| 'teal' \| 'yellow'` | `'default'` | 背景颜色变体。`default` 使用标准卡片背景；`transparent` 完全去掉背景；`muted` 使用弱化卡片的柔和背景。非语义变体使用对应的 `--color-background-<name>` 令牌。 |
| `elevation` | `'none' \| 'low' \| 'med' \| 'high'` | `'none'` | 静止阴影深度。`none` 为扁平；`low`/`med`/`high` 对应阴影令牌比例。 |

Styling hook class: `.astryx-card`

## Files

- `src/Card.doc.mjs`
- `src/Card.tsx`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Card
