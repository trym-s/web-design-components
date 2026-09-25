# Avatar Group

AvatarGroup displays multiple avatars in an overlapping row with an optional overflow indicator. Uses a compositional API: pass Avatar children directly so each avatar can carry its own props (status dots, click handlers, etc.).

## Classification

- Category: `content` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/AvatarGroup.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: AvatarGroup displays multiple avatars in an overlapping row with an optional overflow indicator.
- Avoid when: Don't nest AvatarGroups; use a single group with all avatars. Don't set size on the child avatars. The group's size wins over each child's own size prop, including when the group leaves size at its default, so a child's size is silently ignored inside a group.
- Provides: Avatar children, Overflow indicator
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: AvatarGroupOverflowShowcase, AvatarGroupShowcase, AvatarGroup, AvatarGroupInteractive, AvatarGroupOverflowCustomText, AvatarGroupOverflowDefault
- Upstream: Astryx core · Content
- Keywords: avatar, group, facepile, stack, overlap, participants, assignees, members, team

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

- `upstream/examples/AvatarGroupOverflowShowcase.tsx` — Avatar Group Overflow: Overflow indicators for hidden avatars, including the default +N label and custom count text. · static: `static/AvatarGroupOverflowShowcase.html`
- `upstream/examples/AvatarGroupShowcase.tsx` — Avatar Group: Overlapping avatar rows with a sliced visible set and a server-side overflow count. Shows team members in a compact facepile layout. · static: `static/AvatarGroupShowcase.html`
- `upstream/examples/AvatarGroup.tsx` — Avatar — Group: Overlap multiple avatars in a row to represent a group of people. Use for team lists, PR reviewers, or participant counts where you want to show faces without taking up much space. · static: `static/AvatarGroup.html`
- `upstream/examples/AvatarGroupInteractive.tsx` — Avatar Group — Interactive: A facepile whose avatars link to profiles, with an overflow indicator that opens the full member list. The whole group is one Tab stop; arrow keys move between the avatars and the overflow button. · static: `static/AvatarGroupInteractive.html`
- `upstream/examples/AvatarGroupOverflowCustomText.tsx` — Avatar Group Overflow — Custom Text: Provide short custom children such as 12+ when the overflow count needs compact product-specific formatting. · static: `static/AvatarGroupOverflowCustomText.html`
- `upstream/examples/AvatarGroupOverflowDefault.tsx` — Avatar Group Overflow — Default Count: Use AvatarGroupOverflow without children to render the standard +N overflow count. · static: `static/AvatarGroupOverflowDefault.html`

## Documentation

### Avatar Group

AvatarGroup displays multiple avatars in an overlapping row with an optional overflow indicator. Uses a compositional API: pass Avatar children directly so each avatar can carry its own props (status dots, click handlers, etc.).

**Do**

- Slice the list yourself and pass only the avatars you want visible; 3-5 is typical. The group renders exactly the children it is given and never slices for you.
- Use AvatarGroupOverflow for custom overflow content like a popover trigger or "add member" button.
- Pass status dots, click handlers, or tooltips directly on each Avatar child.
- Make avatars interactive with href or onClick to link to profiles. Interactive avatars share a single Tab stop; arrow keys move between them, and the group announces a keyboard hint to assistive tech. This follows the WAI-ARIA APG roving tabindex technique for managing focus in a composite: https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex

**Don't**

- Don't nest AvatarGroups; use a single group with all avatars.
- Don't set size on the child avatars. The group's size wins over each child's own size prop, including when the group leaves size at its default, so a child's size is silently ignored inside a group.

**Anatomy**

- Avatar children (required) — Avatar elements that form the overlapping row. Each can have its own props.
- Overflow indicator — A "+N" circle at the end showing hidden count, or a custom AvatarGroupOverflow slot.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` * | `ReactNode` |  | Avatar children, optionally followed by one AvatarGroupOverflow. Consumers handle slicing to the desired visible count. |
| `size` | `AvatarSize` | `'md'` | Size applied to all avatars via context. This wins over each child Avatar's own size prop, including when it is left at the default, so set the size here rather than on the children. |
| `shape` | `'circle' \| 'rounded' \| 'square'` | `'circle'` | Shape applied to all avatars via context, overriding each avatar's own shape prop. Also applied to AvatarGroupOverflow's "+N" indicator. |
| `ref` | `React.Ref<HTMLDivElement>` |  | Ref forwarded to the root element. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization. |
| `data-testid` | `string` |  | Test selector for automated testing frameworks. |

Styling hook class: `.astryx-avatar-group`, `.astryx-avatar-group-overflow`

### Avatar Group Overflow

AvatarGroupOverflow appears at the end of an AvatarGroup to summarize people who are not shown individually. Use it when a group is sliced to a small number of visible avatars but the hidden count still matters.

**Do**

- Pass the real hidden count to `count` so the accessible label matches the visible indicator.
- Use short custom text such as `+12` or `99+`. The indicator is circular for short counts and grows into a pill for wider counts so the number always fits.
- Provide `onClick` when the overflow opens a member list, popover, or detail view.

**Don't**

- Do not pass custom text that disagrees with `count`; `count` continues to provide the accessible label.
- Do not use long labels inside the indicator; place longer participant details next to the group instead.

**Anatomy**

- Count label (required) — The compact `+N` or custom count text displayed inside the circular indicator.
- Button behavior — When `onClick` is provided, the indicator becomes an interactive button with focus and hover states.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `count` * | `number` |  | The number of hidden avatars. Used for the default `+N` label and the accessible label. |
| `children` | `ReactNode` |  | Optional custom count text rendered inside the indicator. Omit to use the default `+N` label. |
| `onClick` | `() => void` |  | Callback fired when the overflow indicator is clicked. When provided, the indicator renders as a focusable button. |
| `ref` | `React.Ref<HTMLElement>` |  | Ref forwarded to the overflow indicator element. |
| `xstyle` | `StyleXStyles` |  | stylex.create() value — not an inline style object. |

**Example — Default overflow count**

```tsx

<AvatarGroup size="lg">
  {users.slice(0, 3).map(user => (
    <Avatar key={user.id} src={user.src} name={user.name} />
  ))}
  <AvatarGroupOverflow count={users.length - 3} />
</AvatarGroup>

```

**Example — Custom count text**

```tsx

<AvatarGroup size="lg">
  {users.slice(0, 3).map(user => (
    <Avatar key={user.id} src={user.src} name={user.name} />
  ))}
  <AvatarGroupOverflow count={12}>12+</AvatarGroupOverflow>
</AvatarGroup>

```

### Avatar Group Overflow

Use at end of AvatarGroup to summarize hidden people after slicing visible avatars.

**Do**

- Pass real hidden count to `count` for a11y.
- Keep custom text short: `+12`, `99+`.
- Use `onClick` to open member list/popover/details.

**Don't**

- Don't let custom text disagree with `count`; `count` still labels the indicator for accessibility.
- Don't use long labels inside avatar-sized circle.

### Avatar Group Overflow

AvatarGroupOverflow 显示在 AvatarGroup 末尾，用来汇总未单独展示的成员。适用于只展示少量头像但仍需要显示隐藏数量的场景。

**Do**

- 向 `count` 传入真实隐藏数量，确保无障碍标签与可见指示器一致。
- 使用 `+12` 或 `99+` 等短文本；指示器在计数较短时为圆形，计数较宽时会拉伸为胶囊形，确保数字始终完整显示。
- 当溢出项会打开成员列表、弹出层或详情视图时提供 `onClick`。

**Don't**

- 不要让自定义文本与 `count` 不一致；`count` 仍用于无障碍标签。
- 不要在指示器内使用长标签；更长的参与者详情应放在头像组旁边。

## Files

- `upstream/AvatarGroup.doc.mjs`
- `upstream/AvatarGroup.tsx`
- `upstream/AvatarGroupContext.ts`
- `upstream/AvatarGroupOverflow.doc.mjs`
- `upstream/AvatarGroupOverflow.spec.md`
- `upstream/AvatarGroupOverflow.tsx`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/AvatarGroup
