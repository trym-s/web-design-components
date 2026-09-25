# useStreamingText

Smooths bursty streamed text into a steady character-by-character reveal using requestAnimationFrame. Decouples arrival rate from display rate. Advances on word and syntax boundaries to avoid slicing mid-markdown or mid-word, preventing visual glitches with markdown renderers. Animation timing derives from Astryx motion tokens via useTheme when available, with sensible fallbacks outside a theme provider. Snaps to full text when isStreaming becomes false.

## Classification

- Category: `hooks` — functional
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `src/useStreamingText.ts`
- Nature: functional; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: Smooths bursty streamed text into a steady character-by-character reveal using requestAnimationFrame.
- Avoid when: Use for static text that does not change; the hook adds unnecessary overhead for non-streaming content.
- Provides: useStreamingText
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: useStreamingTextHookUsage
- Upstream: Astryx core · streaming
- Keywords: streaming, text, typewriter, animation, ai, chat, markdown, reveal, llm, chunked

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
- Hooks carry behavior only: port the logic, keep the accessibility contract.

## Examples

- `src/examples/useStreamingTextHookUsage.tsx` — useStreamingText — Streaming Response: Smooth bursty generated text into a steady reveal with useStreamingText. · static: `static/useStreamingTextHookUsage.html`

## Documentation

### useStreamingText

Import: `@astryxdesign/core/hooks`

Smooths bursty streamed text into a steady character-by-character reveal using requestAnimationFrame. Decouples arrival rate from display rate. Advances on word and syntax boundaries to avoid slicing mid-markdown or mid-word, preventing visual glitches with markdown renderers. Animation timing derives from Astryx motion tokens via useTheme when available, with sensible fallbacks outside a theme provider. Snaps to full text when isStreaming becomes false.

**Do**

- Pass the accumulated text (not individual chunks) as targetText; the hook handles incremental reveal internally.
- Set isStreaming to false when the stream completes to snap to the final text.
- Use speed='instant' for non-animated contexts like search results or when reduced motion is preferred.

**Don't**

- Use for static text that does not change; the hook adds unnecessary overhead for non-streaming content.

**Parameters**

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `targetText` * | `string` |  | The full target text to reveal. As new chunks arrive, update this value with the accumulated text. |
| `isStreaming` * | `boolean` |  | Whether text is currently being streamed. When false, the hook returns the full targetText immediately. |
| `options` | `UseStreamingTextOptions` |  | Optional configuration for streaming behavior. |
| `options.speed` | `'natural' \| 'fast' \| 'instant'` | `'natural'` | Speed preset for text reveal. 'natural' is steady ~2 chars/frame, 'fast' scales with backlog ~4 chars/frame, 'instant' returns full text with no animation. |

**Returns**

```ts
[
  {
    "name": "displayedText",
    "type": "string",
    "description": "The portion of targetText to render. Grows steadily toward the full targetText during streaming, or equals targetText when not streaming."
  }
]
```

## Files

- `src/useStreamingText.doc.mjs`
- `src/useStreamingText.ts`
- `src/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/useStreamingText
