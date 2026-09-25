# Avatar

Avatar represents a person or team with a profile photo, initials, or a default icon. Use it in comment headers, contact lists, chat messages, user cards, and anywhere you need to identify someone visually.

## Classification

- Category: `content` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/Avatar.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Avatar represents a person or team with a profile photo, initials, or a default icon.
- Avoid when: Rely on a status label to name an interactive avatar. "Online" says nothing about where the link goes. Use Avatar for logos, product images, or anything that isn't a person or team. Use an image or icon instead. Use xstyle or className to override shape. Use the shape prop instead so themes can control it globally.
- Provides: Photo, Initials, Default icon, Status dot
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: AvatarShowcase, AvatarStatusDotShowcase, AvatarFallbackChain, AvatarInitialsFallback, AvatarInteractive, AvatarStatusDotVariants, AvatarTooltip, AvatarUserCard, AvatarWithImage, AvatarWithStatus
- Upstream: Astryx core · Content
- Keywords: avatar, profile, user, photo, thumbnail, initials, gravatar, pfp, userpic

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

- `src/examples/AvatarShowcase.tsx` — Avatar: Avatars at every size with an image, initials fallback, and a status dot. A quick visual reference for choosing the right size. · static: `static/AvatarShowcase.html`
- `src/examples/AvatarStatusDotShowcase.tsx` — Avatar Status Dot: AvatarStatusDot renders a presence indicator on an Avatar, with variants for positive, neutral, and negative states. The dot size automatically coordinates with the Avatar size. · static: `static/AvatarStatusDotShowcase.html`
- `src/examples/AvatarFallbackChain.tsx` — Avatar — Fallback Chain: Demonstrates the avatar fallback chain: primary image, fallback image, initials, then default icon. · static: `static/AvatarFallbackChain.html`
- `src/examples/AvatarInitialsFallback.tsx` — Avatar — Initials: Show initials instead of a photo. The avatar extracts the first and last initials from the name automatically. Use when you only have a user name, like in anonymous accounts or new user onboarding. · static: `static/AvatarInitialsFallback.html`
- `src/examples/AvatarInteractive.tsx` — Avatar — Interactive: Make an avatar interactive by passing `href` to render it as a link or `onClick` to render it as a button. Both forms are focusable and show a focus-visible ring for keyboard users. Use for profile links, mention pop-ups, or any avatar people can act on. · static: `static/AvatarInteractive.html`
- `src/examples/AvatarStatusDotVariants.tsx` — AvatarStatusDot — Variants: Presence dots on Avatars using the success, neutral, and error variants. Pass an AvatarStatusDot to the Avatar status prop; the dot sizes itself to match the Avatar. · static: `static/AvatarStatusDotVariants.html`
- `src/examples/AvatarTooltip.tsx` — Avatar — Tooltip: By default an avatar shows its name in a tooltip on hover and keyboard focus. Pass a string to show custom text instead, or false to turn the tooltip off. · static: `static/AvatarTooltip.html`
- `src/examples/AvatarUserCard.tsx` — Avatar — User Card: Place an avatar next to a name and role to create a user card row. Use for comment headers, contact lists, profile sections, or anywhere you need to identify a person at a glance. · static: `static/AvatarUserCard.html`
- `src/examples/AvatarWithImage.tsx` — Avatar — Photo: Show a profile photo at different sizes. Use when you have a user photo URL. If the image fails to load, initials are shown instead. · static: `static/AvatarWithImage.html`
- `src/examples/AvatarWithStatus.tsx` — Avatar — Status Dot: Add a status dot to an avatar to show whether someone is online, away, or busy. Use in chat, messaging, or any UI where knowing availability matters. · static: `static/AvatarWithStatus.html`

## Documentation

### Avatar

Avatar represents a person or team with a profile photo, initials, or a default icon. Use it in comment headers, contact lists, chat messages, user cards, and anywhere you need to identify someone visually.

**Do**

- Always pass a name so the avatar can show initials if the photo fails to load, and so screen readers can announce who it represents.
- Pick a size that matches the context: xsm or sm for inline mentions, md or lg for lists and cards, xl for profile headers.
- Add a status dot when knowing someone's availability matters, like in chat or team views.
- When wrapping an Avatar in your own Tooltip or HoverCard, set tooltip={false} so the built-in name tooltip does not overlap yours.
- Give every interactive avatar (href or onClick) a name or alt. It is the control's accessible name, and it warns in development when it is missing.

**Don't**

- Rely on a status label to name an interactive avatar. "Online" says nothing about where the link goes.
- Use Avatar for logos, product images, or anything that isn't a person or team. Use an image or icon instead.
- Use xstyle or className to override shape. Use the shape prop instead so themes can control it globally.

**Anatomy**

- Photo — The profile image, loaded from the src URL. Shown when available.
- Initials — One or two letters extracted from the name. Shown when no photo is available.
- Default icon — A generic person silhouette. Shown when there is no photo or name.
- Status dot — A small indicator in the bottom-right corner showing availability (online, away, busy). Each variant pairs colour with a distinct shape so status does not rely on colour alone.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `src` | `string` |  | Primary image source URL. |
| `fallbackSrc` | `string` |  | Fallback image when primary fails. |
| `name` | `string` |  | User name for initials and alt text. |
| `alt` | `string` |  | Alt text (falls back to name). |
| `size` | `'xsm' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| number` | `'md'` | Avatar size. Use a named size ('xsm' 20px, 'sm' 24px, 'md' 36px, 'lg' 48px, 'xl' 128px) or a numeric pixel value. Avatar shares Icon's abbreviated scale, but its tiers are larger because avatars align with media rather than glyphs. Inside an AvatarGroup the group's size wins and this prop is ignored. |
| `shape` | `'circle' \| 'rounded' \| 'square'` | `'circle'` | Shape variant of the avatar. 'circle' (default) stays fully round. 'rounded' uses the element radius token so it matches UI corner rounding and can be set globally via theme. 'square' has no radius. Status dot positioning adapts automatically: 4-o'clock on circle, bottom-right corner on rounded/square. |
| `status` | `ReactNode` |  | Corner content for status indicators. AvatarStatusDot reports its `label` to the avatar, which composes it into the accessible name (e.g. "Jane Doe, Online") so screen readers announce the status. Reporting goes through context, so it still works when the dot sits inside a wrapper component of your own. |
| `tooltip` | `string \| boolean` | `true` | Tooltip shown on hover and keyboard focus. Omitted or true shows the avatar's name; a string shows that text instead; false shows no tooltip. Not auto-disabled when wrapped in your own Tooltip/HoverCard. Set tooltip={false} if you supply your own overlay. No tooltip is shown when tooltip is true/omitted and there is no name. |
| `href` | `string` |  | When set, the avatar renders as an interactive link (`<a>` or a custom link component) pointing here. This follows the same element-swap rule as Button. Requires a meaningful accessible name via `alt` or `name`: an interactive avatar without one warns in development. Inside an AvatarGroup, interactive avatars share a single Tab stop and are reached with arrow keys. |
| `as` | `ElementType` |  | Custom link component used when `href` is set (e.g. `next/link`). Overrides the provider-level LinkProvider default. Only applies with `href`. |
| `target` | `string` |  | Link target attribute. Only applies with `href`. |
| `rel` | `string` |  | Link rel attribute. Only applies with `href`. |
| `onClick` | `(e: MouseEvent) => void` |  | Click handler. When set without `href`, the avatar renders as a focusable `<button type="button">`. Requires a meaningful accessible name via `alt` or `name`: an interactive avatar without one warns in development. |

Styling hook class: `.astryx-avatar`, `.astryx-avatar-fallback`, `.astryx-avatar-status-dot`, `.astryx-avatar-status-dot-glyph`

### Avatar Status Dot

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'success' \| 'neutral' \| 'error'` | `'success'` | Semantic variant pairing colour with a distinct shape: success = filled green dot, neutral = grey ring, error = red dot with a minus bar. |
| `label` | `string` |  | Accessible label describing the status. Inside an Avatar it is composed into the avatar's accessible name (e.g. "Jane Doe, Online"); the Avatar root is role="img", which prunes child semantics, so the composed name is how the status reaches assistive tech. Standalone dots expose role="img" with this label directly. |
| `icon` | `ReactNode` |  | Icon centered inside the dot (hidden at tiny sizes). A rendered icon replaces the built-in shape glyph, so use a different icon per status. |

### Avatar Status Dot

### Avatar Status Dot

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `'success' \| 'neutral' \| 'error'` | `'success'` | 语义变体，颜色与形状配对：success = 绿色实心点，neutral = 灰色圆环，error = 带横杠的红色点。 |
| `label` | `string` |  | 描述状态的无障碍标签。在 Avatar 内会被合成进头像自身的无障碍名称（如 "Jane Doe, Online"）——Avatar 根元素为 role="img"，会裁剪子元素语义，因此合成名称是辅助技术获知状态的途径。独立使用时状态点直接以 role="img" 暴露该标签。 |
| `icon` | `ReactNode` |  | 居中显示在状态点内的图标（tiny 尺寸时隐藏）。渲染的图标会替换内置形状标记，请为每个状态使用不同的图标。 |

## Files

- `src/Avatar.doc.mjs`
- `src/Avatar.tsx`
- `src/AvatarSizeContext.ts`
- `src/AvatarStatusDot.doc.mjs`
- `src/AvatarStatusDot.spec.md`
- `src/AvatarStatusDot.tsx`
- `src/AvatarStatusLabelContext.ts`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Avatar
