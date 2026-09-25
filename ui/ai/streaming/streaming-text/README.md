# Streaming Text

An answer streams progressively with inline sources, response actions, and suggested follow-up prompts.

## Classification

- Category: `ai` — streamed answer
- Medium: React + TypeScript + Tailwind CSS v4
- Entry point: `reference.tsx`
- Nature: interactive; reuse the blur-in word stream, inline citation chips, action row and follow-ups
- Use when: an answer streams progressively with inline sources, response actions, and suggested follow-up prompts.

## Files

- `src/` — copy-paste component, hand-derived from `reference.tsx`
- `reference.tsx` — upstream capture and dashboard entry point
- `preview.png` — capture from the original site
- Shared styles: `ui/_sources/beautiful-ui/styles.css` (token mapping in `ui/_sources/beautiful-ui/SOURCE.md`)

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--foreground`, `--muted`, `--border`, …).
It imports only `react`, `clsx` and `tailwind-merge` (through `lib/utils.ts`); `streaming-text.css` holds the `stream-in`,
`pop-in`, `fade-in` and `fade-up` keyframes and the link underline. `src/demo.tsx` simulates the stream (one token per 55 ms,
3.4 s hold, loop) and uses token-coloured placeholder source marks.

### StreamingText — `streaming-text.tsx`

- Props: `tokens` (`({ text } | { cite: index into sources })[]` streamed so far — append one per tick), `done` (stream
  finished), `sources` (`{ name, domain, href, icon }[]`), `sourcesLabel` (default "{n} sources"), `followUps` (strings),
  `followUpsLabel` ("Follow-ups"), `onFollowUp(text)`, `onAction("copy" | "retry" | "up" | "down")`, `className`.
- Structure: a column up to 380 px wide (min-height 15.5 rem). Paragraph 13 px, relaxed leading, `--foreground`: each word is
  a span that resolves from blur (opacity 0 + 4 px blur → clear, 420 ms `cubic-bezier(0.22,0.61,0.25,1)`); a citation is an
  18 px mono 10.5 px chip (`--muted` fill, 1 px `--border` ring, 12 px avatar + domain) that pops in (250 ms) and links out.
  While streaming a 2×12 px `--foreground` caret follows the text. Action row (8 px below): four 24 px icon buttons (copy,
  regenerate, thumbs up, thumbs down; 15 px stroked icons, `--muted-foreground`, hover `--foreground` at 8 %) and a sources
  button — overlapping 14 px round avatars with a 1.5 px `--muted` ring plus the label. Sources panel: `--muted`, radius
  `--radius`, 1 px `--border` ring, one 12 px row per source (16 px avatar, name with a growing underline on hover, mono domain
  on the right). Follow-ups: a 12 px medium caption, then one 12.5 px row per prompt with a reply-arrow icon and a
  `--border` bottom rule.
- States: while `done` is false the action row and follow-ups are transparent and inert; when done they fade in (400 ms)
  and follow-ups fade up 8 px (350 ms `cubic-bezier(0.23,1,0.32,1)`, staggered 90 ms). The sources panel opens only when done:
  `grid-template-rows` 0fr↔1fr + opacity, 300 ms.
- Interactions: action buttons call `onAction`; the sources button toggles the panel; follow-up rows call `onFollowUp`;
  chips and panel rows are links (new tab).
- Keyboard: all controls are native buttons/links in DOM order; the sources button exposes `aria-expanded`; hidden panel
  links are removed from the Tab order.
