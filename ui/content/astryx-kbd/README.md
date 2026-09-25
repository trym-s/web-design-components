# Kbd

Renders a keyboard shortcut as styled key badges. Use Kbd in tooltips, menus, and help text to show key combinations.

## Classification

- Category: `content` — structural
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/Kbd.tsx`
- Nature: structural; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Renders a keyboard shortcut as styled key badges.
- Avoid when: Use Kbd as the only way to discover an action; shortcuts should supplement visible controls, not replace them.
- Provides: Shortcut, Key badge
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: KbdShowcase, KbdInlineInstructions, KbdMenuShortcuts, KbdModifierCombos
- Upstream: Astryx core · Content
- Keywords: kbd, keyboard, shortcut, hotkey, keybinding, keystroke, keycombo, modifier, accelerator

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

- `upstream/examples/KbdShowcase.tsx` — Kbd · static: `static/KbdShowcase.html`
- `upstream/examples/KbdInlineInstructions.tsx` — Kbd — Inline Instructions: Keyboard shortcuts rendered inline within instructional text · static: `static/KbdInlineInstructions.html`
- `upstream/examples/KbdMenuShortcuts.tsx` — Kbd — Menu Shortcuts: Menu-style list pairing action labels with their keyboard shortcuts · static: `static/KbdMenuShortcuts.html`
- `upstream/examples/KbdModifierCombos.tsx` — Kbd — Modifier Combinations: Modifier combinations and special keys rendered as shortcut badges · static: `static/KbdModifierCombos.html`

## Documentation

### Kbd

Renders a keyboard shortcut as styled key badges. Use Kbd in tooltips, menus, and help text to show key combinations.

**Do**

- Place shortcuts near the action they trigger: in a tooltip, menu item, or inline instruction.
- Use mod instead of ctrl or cmd; it automatically adapts to the user's platform.

**Don't**

- Use Kbd as the only way to discover an action; shortcuts should supplement visible controls, not replace them.

**Anatomy**

- Shortcut (required) — Group that presents the complete keyboard shortcut and its accessible name.
- Key badge (required) — Painted key badge rendered once for each key in the shortcut.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `keys` * | `string` |  | Keyboard shortcut string. Use "+" to separate keys. Special keys: mod (Cmd on Mac), ctrl, alt, shift, enter, backspace, escape, tab, up, down, left, right, plus. Aliases: esc for escape and return for enter. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value, not an inline style object like style={{}}. |
| `className` | `string` |  | CSS class name for the root element. Prefer xstyle for styling; className is provided for integration with non-StyleX systems. |
| `style` | `CSSProperties` |  | Inline styles for the root element. Prefer xstyle for styling; inline styles bypass StyleX optimization. |

Styling hook class: `.astryx-kbd`

### Kbd

Renders a keyboard shortcut as styled key badges. Use Kbd in tooltips, menus, and help text to show key combinations.

**Do**

- Place shortcuts near the action they trigger: in a tooltip, menu item, or inline instruction.
- Use mod instead of ctrl or cmd; it automatically adapts to the user's platform.

**Don't**

- Use Kbd as the only way to discover an action; shortcuts should supplement visible controls, not replace them.

**Anatomy**

- Shortcut (required) — Group that presents the complete keyboard shortcut and its accessible name.
- Key badge (required) — Painted key badge rendered once for each key in the shortcut.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `keys` * | `string` |  | 键盘快捷键字符串。使用 "+" 分隔各按键。特殊按键：mod（Mac 上为 Cmd）、ctrl、alt、shift、enter、backspace、escape、tab、up、down、left、right、plus。别名：esc 等同于 escape，return 等同于 enter。 |
| `xstyle` | `StyleXStyles` |  | 用于布局自定义的 StyleX 样式（边距、定位、尺寸）。必须是 stylex.create() 的值，这不能是 style={{}} 这样的内联样式对象。 |
| `className` | `string` |  | 根元素的 CSS 类名。建议优先使用 xstyle 进行样式设置，className 用于与非 StyleX 系统的集成。 |
| `style` | `CSSProperties` |  | 根元素的内联样式。建议优先使用 xstyle 进行样式设置，内联样式会绕过 StyleX 优化。 |

Styling hook class: `.astryx-kbd`

## Files

- `upstream/Kbd.doc.mjs`
- `upstream/Kbd.spec.md`
- `upstream/Kbd.tsx`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/Kbd
