# AI Input

A polished AI input component with model selection, tools, file uploads, and smooth animations.

## Classification

- Category: `ai` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 + Motion; static HTML
- Framework: react
- Entry point: `src/examples/ai-input-demo.tsx`
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

- **React + Tailwind target** — install from the registry above, or copy the component from `ui/_sources/chamaac/` and the demo from `src/examples/`, changing only import paths.
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

- `ui/_sources/chamaac/registry/chamaac/ai-input/ai-input.tsx` — the component as the registry installs it
- `src/examples/ai-input-demo.tsx` — the site's demo
- `src/demo.tsx` — bank harness
- `reference.tsx` — dashboard entry point

Upstream page: https://www.chamaac.com/components/inputs/ai-input
