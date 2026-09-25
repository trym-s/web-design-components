# Chat Composer

A tabbed AI conversation combines reasoning replies, tool context, and a compact composer.

## Classification

- Category: `ai` — chat panel
- Medium: React + TypeScript + Tailwind CSS v4
- Entry point: `reference.tsx`
- Nature: interactive; reuse the fixed-height panel with tab header, labelled reply sections and the inset composer
- Use when: a tabbed AI conversation combines reasoning replies, tool context, and a compact composer.

## Files

- `src/` — copy-paste component, hand-derived from `reference.tsx`
- `reference.tsx` — upstream capture and dashboard entry point
- `preview.png` — capture from the original site
- Shared styles: `ui/_sources/beautiful-ui/styles.css` (token mapping in `ui/_sources/beautiful-ui/SOURCE.md`)

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--card`, `--muted`, `--border`, `--input`, …).
It imports only `react`, `clsx` and `tailwind-merge`; `chat-composer.css` holds the `fade-up` keyframes. `src/demo.tsx` is
sample data and the scripted reply sequence only (after a send: first section at +500 ms, second section resolving at
+1.9 s, settled at +3.1 s).

### ChatComposer — `chat-composer.tsx`

- Props: `tabs` (string[]), `activeTab`, `onTabChange(tab)`, `onAction("new" | "history" | "more")` for the three header
  icons, `userMessage` (the last prompt; empty hides the bubble), `sections` (`{ label, sub, time, body, resolving? }[]`),
  `placeholder` ("Prompt or tag a flavor with @"), `onSend(text)`, `className`.
- Structure: a 288 px-high card, max-width 380 px, `--card` fill, 14 px radius (`rounded-xl`), `shadow-xs` + 1 px `--border`
  ring, overflow hidden. Header (6 px padding, bottom border `--border`): tab buttons (13 px, padding 3×8 px, `rounded-sm`)
  and three 24 px icon buttons (+, clock, ⋯; 15 px icons, `--muted-foreground`, hover `--accent`). Conversation region
  (flex-1, scrolls, padding 10 px 12 px 4 px, 10 px gap): a right-aligned user bubble (`--muted`, 12 px radius, 13 px
  text, 6×12 px padding, 56 px left inset), then one block per section — a 12 px meta line (label medium `--foreground`,
  sub `--muted-foreground`, "for {time}" `--foreground`) over a 13 px body. Composer (6 px outer padding): a `--muted`
  box with a 1 px `--border` border, `rounded-md`, `shadow-xs`, 10 px padding, 8 px gap, holding a borderless 13 px input
  and a right-aligned 28 px send button (↑ 16 px icon).
- States: active tab `--muted` fill, inactive tabs 50 % opacity (75 % on hover). The user bubble fades in and rises 10 px
  in 300 ms `cubic-bezier(0.23,1,0.32,1)` when `userMessage` becomes non-empty. Each section enters with `fade-up`
  (400 ms, same curve); `resolving` sections sit at 55 % opacity, 0.5 px blur, scale 0.985 from the top-left, and
  transition out in 400 ms. Composer border turns `--input` while focused. Send button: disabled (`--input` fill,
  `--muted-foreground` icon) until the draft has text, then `--foreground` fill with a `--card` icon; scales to 0.96 when pressed.
- Interactions: clicking anywhere in the composer box focuses the input; the send button or Enter calls `onSend` with the
  trimmed draft and clears it. Tabs call `onTabChange`.
- Keyboard: native buttons and input; Enter sends; tabs expose `aria-pressed`; the input is labelled "Chat prompt", icon
  buttons carry `aria-label`s.
