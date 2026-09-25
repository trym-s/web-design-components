# AI Input

A polished AI input component with model selection, tools, file uploads, and smooth animations.

## Classification

- Category: `ai` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 + Motion; static HTML
- Framework: react
- Entry point: `upstream/examples/ai-input-demo.tsx`
- Nature: interactive; reuse the effect, motion and composition, adapt literal values to the target project.
- Added: 2026-09-25T08:24:04Z
- Curation: pending
- Use when: A polished AI input component with model selection, tools, file uploads, and smooth animations.
- Provides: AI Input
- Requires: `motion`, `clsx`, `tailwind-merge`, `lucide-react`
- Variants: default
- Upstream: Chamaac UI · published
- Preferred install: `npx shadcn@latest add https://www.chamaac.com/r/ai-input.json`
- Registry: https://www.chamaac.com/r/ai-input.json
- Local source fallback: `ui/_sources/chamaac/registry/chamaac/ai-input/ai-input.tsx`

## How an agent uses this reference

- **React + Tailwind v4 + shadcn tokens** — copy `src/` as-is (Next.js removed; it imports only allowlisted packages);
  `src/demo.tsx` shows the wiring with sample data. See `## Usage`.
- **React + Tailwind target** — install from the registry above, or copy the component from `ui/_sources/chamaac/` and the demo from `upstream/examples/`, changing only import paths.
- **Any other stack** — `static/ai-input.html` is the rendered DOM against `ui/_sources/chamaac/styles.css`.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `models` | `Model[]` | `DEFAULT_MODELS` | Array of AI models to display in the model selector dropdown. Each model has id, name, label, and icon. |
| `tools` | `ToolItem[]` | `DEFAULT_TOOLS` | Array of tools to display in the tools dropdown. Each tool has an icon and label. |
| `plusMenuItems` | `MenuItem[]` | `DEFAULT_PLUS_MENU` | Array of items for the plus button menu. Each item has id, icon, and label. |
| `onSubmit` | `(message: string, attachments: Attachment[]) => void` | `-` | Callback function called when user submits a message. Receives the message text and array of attachments. |
| `placeholder` | `string` | `"Ask anything..."` | Placeholder text for the input textarea. |
| `className` | `string` | `""` | Custom class names for styling the container. |

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `ui/_sources/chamaac/registry/chamaac/ai-input/ai-input.tsx` — the component as the registry installs it
- `upstream/examples/ai-input-demo.tsx` — the site's demo
- `upstream/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://www.chamaac.com/components/inputs/ai-input

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--foreground`, `--border`, …).
It imports only `react`, `motion`, `lucide-react`, `clsx`, `tailwind-merge`. `src/LICENSE` is Chamaac UI's MIT licence (Copyright (c) 2026 Amarnath); keep it with the files.
`src/demo.tsx` is sample data and wiring only. Colours without a shadcn equivalent are
props or CSS variables whose defaults are the upstream values; fonts come from the target project.

### AIInput — `ai-input.tsx`

A chat composer: a rounded `--background` box with an auto-growing textarea, a plus menu, a Tools pill, a model pill, mic and send buttons. Before the first message it is centred in its box (default `h-[100dvh]`); afterwards the conversation fills the space above and the composer docks at the bottom. Also exports `AIInputDropdown`, `AIInputPillButton`, `AIInputMessages`, `AIInputFilePreview`, `useAIInput` and the `Model` / `ToolItem` / `MenuItem` / `Message` / `Attachment` types.

- Props: `models` ({id, name, label, icon}[]), `tools` ({icon, label}[]), `plusMenuItems` ({id, icon, label}[]; ids `files` and `videos` open the image/document and video pickers), `messages` (controlled conversation: {id, role `user`|`ai`, content, attachments?}[]), `onSubmit(text, attachments)`, `onListeningChange(listening)`, `placeholder`, `className`. Upstream's simulated AI reply is gone: the host appends replies to `messages` (the demo does it with a timeout). Without `messages` the component records only what the user sends.
- States: empty (send button disabled, mic shown) vs typing (clear ✕ and a `--primary` send button); listening (mic turns into a `--destructive` stop square with a ping, the textarea is disabled and reads "Listening..."); a selected tool replaces the Tools pill with its own pill and a ✕; open dropdown (`--popover` panel above the trigger, a transparent backdrop closes it); pending attachments show as 64 px thumbnails with remove buttons.
- Interactions: plus → menu → native file picker; picked files preview via object URLs; Tools / model pills open lists (the chosen model shows a check); ✕ on the tools pill clears it.
- Keyboard: Enter sends, Shift+Enter inserts a newline; Escape on the dropdown backdrop closes it; all controls are native buttons.
- Reduced motion: wrapped in `MotionConfig reducedMotion="user"`, so transform and layout animations jump to their end state when the user asks for reduced motion; opacity and colour still fade.
