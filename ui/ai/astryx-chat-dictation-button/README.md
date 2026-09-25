# Chat Dictation Button

ChatDictationButton is a toggle button that starts and stops voice dictation inside a chat composer. It pairs with useChatDictation to show a microphone icon when idle and animated frequency bars when listening. Place it in the sendActions slot of ChatComposer.

## Classification

- Category: `ai` — interactive
- Medium: React 19 + TypeScript + StyleX (prebuilt CSS); static HTML + CSS per example
- Framework: react
- Entry point: `upstream/ChatDictationButton.tsx`
- Nature: interactive; reuse the behavior, hierarchy and tokens, adapt literal values to the target project.
- Added: 2026-09-24T15:30:00Z
- Curation: pending
- Use when: ChatDictationButton is a toggle button that starts and stops voice dictation inside a chat composer.
- Avoid when: Don't use the dictation button outside a chat composer context. It's designed for the composer's send-action layout, not as a standalone recording control. Don't forget to handle the unsupported case. The button hides itself by default when the browser lacks SpeechRecognition, but you should still design the composer to work without it.
- Provides: Microphone icon, Frequency bars, Ghost button
- Requires: React 19 with `@astryxdesign/core` and a theme, or the static HTML with `ui/_sources/astryx/frame.css`
- Variants: ChatDictationButtonShowcase, ChatDictationButtonBasic, ChatDictationDictationInComposer, ChatDictationDictationStates, ChatDictationSizes
- Upstream: Astryx core · Chat
- Keywords: dictation, microphone, voice, speech, recording, stt, speech-to-text, voice-input, mic

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

- `upstream/examples/ChatDictationButtonShowcase.tsx` — Chat Dictation Button: Interactive dictation button connected to the SpeechRecognition API via useChatDictation. Click the mic to dictate into the composer. · static: `static/ChatDictationButtonShowcase.html`
- `upstream/examples/ChatDictationButtonBasic.tsx` — ChatDictationButton — Basic: A dictation button wired to useChatDictation and placed in the sendActions slot of a ChatComposer. Click the microphone to transcribe speech into the input. · static: `static/ChatDictationButtonBasic.html`
- `upstream/examples/ChatDictationDictationInComposer.tsx` — ChatDictationButton — In Composer: Dictation button placed in the sendActions slot of a chat composer. Shows the recommended integration point for voice input alongside the send button. · static: `static/ChatDictationDictationInComposer.html`
- `upstream/examples/ChatDictationDictationStates.tsx` — ChatDictationButton — States: Dictation button in idle, listening, and speaking states side by side. Shows the three visual phases of a voice input interaction. · static: `static/ChatDictationDictationStates.html`
- `upstream/examples/ChatDictationSizes.tsx` — ChatDictationButton — Sizes: Small and medium dictation buttons side by side. Use small in compact composer densities and medium for standard layouts. · static: `static/ChatDictationSizes.html`

## Documentation

### Chat Dictation Button

ChatDictationButton is a toggle button that starts and stops voice dictation inside a chat composer. It pairs with useChatDictation to show a microphone icon when idle and animated frequency bars when listening. Place it in the sendActions slot of ChatComposer.

**Do**

- Place the dictation button in the sendActions slot of ChatComposer so it sits next to the send button where users expect voice input controls.
- Pass an inputRef to useChatDictation so interim transcripts appear as ghost text in the composer input while the user speaks.
- Enable hasSounds on useChatDictation to give users audio feedback when dictation starts and stops. This is especially helpful when the button's visual change is subtle.

**Don't**

- Don't use the dictation button outside a chat composer context. It's designed for the composer's send-action layout, not as a standalone recording control.
- Don't forget to handle the unsupported case. The button hides itself by default when the browser lacks SpeechRecognition, but you should still design the composer to work without it.

**Anatomy**

- Microphone icon (required) — Shown in the idle state. Indicates that tapping will start voice input.
- Frequency bars — Animated equalizer bars that replace the icon during listening. React to real microphone volume.
- Ghost button (required) — The underlying Button with ghost variant and isIconOnly, providing the hit target and focus ring.

**Props** (`*` required)

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `dictation` * | `UseSpeechRecognitionReturn` |  | The return value from useChatDictation or useSpeechRecognition. Controls all button state: listening, volume, bands, and toggle. |
| `size` | `'sm' \| 'md'` | `'md'` | Button size. Matches ChatComposer density. |
| `isHiddenWhenUnsupported` | `boolean` | `true` | When true, renders nothing if the browser does not support SpeechRecognition. When false, keeps the button visible but disabled. |
| `label` | `string` |  | Accessible label override. Defaults to "Start dictation" or "Stop dictation" based on state. |
| `xstyle` | `StyleXStyles` |  | StyleX styles for layout customization (margins, positioning, sizing). Must be a stylex.create() value, not an inline style object like style={{}}. |

## Files

- `upstream/ChatDictationButton.doc.mjs`
- `upstream/ChatDictationButton.spec.md`
- `upstream/ChatDictationButton.tsx`
- `upstream/demo.tsx` — bank harness that mounts the examples in the neutral theme
- `reference.tsx` — dashboard entry point

Upstream page: https://astryx.atmeta.com/components/ChatDictationButton
