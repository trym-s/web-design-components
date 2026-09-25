# Prompt Bar

An AI composer needs attachments, @ sources, / commands, model selection, dictation, and send controls.

## Classification

- Category: `ai` — composer
- Medium: React + TypeScript + Tailwind CSS v4
- Entry point: `reference.tsx`
- Nature: interactive; reuse the composer layout, the @ and / menus with a gliding highlight, and the model picker
- Use when: an AI composer needs attachments, @ sources, / commands, model selection, dictation, and send controls.

## Files

- `src/` — copy-paste component, hand-derived from `reference.tsx`
- `reference.tsx` — upstream capture and dashboard entry point
- `preview.png` — capture from the original site
- Shared styles: `ui/_sources/beautiful-ui/styles.css` (token mapping in `ui/_sources/beautiful-ui/SOURCE.md`)

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--card`, `--foreground`, `--accent`, …).
It imports only `react`, `lucide-react`, `clsx` and `tailwind-merge` (through `lib/utils.ts`); `prompt-bar.css` holds the
`pop-in` and `eq-bounce` keyframes and the model sweep. The upstream's `glimm` WebGL rainbow shader is replaced by a
blurred full-spectrum gradient band (hues computed in the component) that crosses the composer once. `src/demo.tsx` holds the
sample sources (brand marks with their own colours), commands, models, fake attachments and a fake dictation transcript.

### PromptBar — `prompt-bar.tsx`

- Props: `sources` (`{ key, name, desc, icon?, attach?, connectable?, connected? }[]`), `commands` (`{ key, name: "/…", desc }[]`),
  `models` (`{ key, name, tag?, flagship? }[]`), `model` + `onModelChange(key)`, `draft` + `onDraftChange(text)` (or
  uncontrolled `defaultDraft`), `attachments` (file names) + `onAttach()` + `onRemoveAttachment(index)`,
  `onConnectChange(key, connected)`, `onSend({ text, attachments })`, `listening` + `onListeningChange(next)` (dictation is the
  caller's), `variant` (`rounded` | `pill`), `placeholder` ("Write a message…"; "Listening…" while listening), `className`.
- Structure: composer card (`--card`, 1 px `--border` border + ring, `shadow-xs`, 6 px padding; radius `--radius + 4px`, pill:
  full, or `--radius + 14px` when it holds attachments or wraps). Optional attachment chips row (26 px, `--muted`, 11.5 px
  `--muted-foreground`, file icon, name ≤ 144 px, 16 px remove ×). Controls grid, 4 px gaps: 28 px + button, a textarea (13/18 px,
  grows from 28 to 100 px, then scrolls), the model button (12 px medium name + chevron), a 28 px mic button and a 28 px send
  button (↑). When the text wraps or contains a newline the textarea takes the full first row and the controls move to a
  second row. Menus open above the composer (8 px gap): `--card`, radius `--radius`, `shadow-sm` + 1 px `--border` ring, 4 px
  padding. @ menu rows are 36 px (22 px icon slot, 12.5 px medium name, 12 px `--muted-foreground` description, optional
  "Connect" in `--primary` / "Connected" in `--success`), then a footer hint above a `--border` rule. Model menu: 176 px wide,
  right-aligned, 30 px rows (name, 11 px tag, check on the current model).
- States: a single `--accent` highlight glides between rows (top/height 220 ms `cubic-bezier(0.23,1,0.32,1)`), visible once
  the pointer or arrow keys engage the list; menus pop in (scale 0.95→1, 180 ms) from their bottom edge. + button and model
  button: hover `--accent`; + stays filled while its menu is open. Mic while listening: `--primary` at 10 % with three 2.5 px
  bars bouncing (900 ms, 150 ms stagger). Send: `--foreground` fill and `--card` arrow when there is text or an attachment,
  else `--input` fill, `--muted-foreground` arrow, disabled. Composer border turns `--input` on focus. Choosing a model marked
  `flagship` (from another model) plays the rainbow band left→right in ~1 s. `--success` is declared on the root
  (`oklch(0.603 0.155 150.9)`, dark `oklch(0.705 0.154 153.8)`).
- Interactions: typing `@word` or `/word` at a word start opens the matching menu filtered by the word; + opens the @ menu
  unfiltered. Picking a source inserts `@Name `, a command inserts `/name ` (replacing the typed token); the attach source
  calls `onAttach` instead. The Connect label toggles without picking the row. Send clears the draft and closes menus.
- Keyboard: in an open menu ↑/↓ move the highlight (wrapping), Enter or Tab picks; Esc closes menus (the token stays typed);
  Enter sends, Shift+Enter inserts a newline (ignored while an IME is composing). Buttons expose `aria-expanded` /
  `aria-pressed`; menus are `listbox`es with `option` rows.
