# Audio Player

A composable audio player. One component, one install, fully owned by you.

## Classification

- Category: `data-display` — interactive
- Medium: React + TypeScript + Tailwind CSS v4 (shadcn Base UI, Nova style, `@audio-ui/react` primitives); static HTML
- Framework: react
- Entry point: `ui/_sources/audio-ui/registry-audio/bases/base/audio/player.tsx`
- Nature: interactive; reuse the control, its interaction model and layout, adapt literal values to the target project.
- Added: 2026-09-25T08:37:12Z
- Curation: pending
- Use when: A composable audio player.
- Provides: Audio Player with 4 documented examples
- Requires: React, Tailwind v4 with the shadcn tokens and a shadcn style (`cn-*` slots), `@audio-ui/react` 0.1.2
- Variants: player-queue-shuffle-repeat-demo, player-queue-preferences-demo, player-queue-simple-demo, player-queue-all-controls-demo
- Upstream: Audio UI · queue
- Preferred install: `npx shadcn@latest add @audio/player`
- Local source fallback: `ui/_sources/audio-ui/registry-audio/bases/base/audio/player.tsx`

## How an agent uses this reference

- **React + Tailwind v4 + shadcn tokens** — copy `src/` as-is (it vendors the `@audio-ui/react` primitives it needs and
  imports only allowlisted packages); `src/demo.tsx` shows the wiring with sample data. See `## Usage`.
- **React + shadcn target** — add the `@audio` registry (`https://audio-ui.xyz/docs/registry`) and install as above; the demos in
  `upstream/examples/` show the exact usage. The elements live in `ui/_sources/audio-ui/registry-audio/bases/base/audio/`.
- **Any other stack** — `static/<example>.html` is the rendered DOM against `ui/_sources/audio-ui/styles.css` (the
  site's Tailwind build with the Nova style); keep the markup, re-implement drag/keyboard behavior from the docs.

## Examples

- `upstream/examples/player-queue-shuffle-repeat-demo.tsx` — Minimal queue with shuffle and repeat controls · static: `static/player-queue-shuffle-repeat-demo.html`
- `upstream/examples/player-queue-preferences-demo.tsx` — Minimal queue with preferences dropdown · static: `static/player-queue-preferences-demo.html`
- `upstream/examples/player-queue-simple-demo.tsx` — Stacked player with queue and preferences · static: `static/player-queue-simple-demo.html`
- `upstream/examples/player-queue-all-controls-demo.tsx` — Queue with all controls (shuffle, repeat, preferences) · static: `static/player-queue-all-controls-demo.html`

## Files

- `src/` — copy-paste component, hand-derived from `upstream/`; a re-import preserves it
- `ui/_sources/audio-ui/registry-audio/bases/base/audio/player.tsx` — the element as the registry installs it
- `ui/_sources/audio-ui/registry-audio/bases/base/hooks/use-audio-provider.ts` — the element as the registry installs it
- `upstream/demo.tsx` — bank harness mounting every example
- `reference.tsx` — dashboard entry point

Upstream page: https://audio-ui.xyz/docs/components/base/player

## Usage

Copy `src/` into a React + Tailwind v4 project that has the shadcn tokens (`--background`, `--primary`, `--ring`, …).
It imports only `react`, `@base-ui/react`, `class-variance-authority`, `clsx`, `tailwind-merge` and `lucide-react`. `src/audio-ui/` is a
vendored copy of `@audio-ui/react` 0.1.2 (MIT, Ouest Labs; licence in `src/audio-ui/LICENSE`). `src/ui/` holds the shadcn/ui
components it builds on; point those imports at the target's own copies when it has them. `src/demo.tsx` is sample
data and wiring only.

### Fader — `fader.tsx`

- Props: `value` / `defaultValue`, `min`, `max`, `step`, `onValueChange`, `onValueCommit`, `disabled`, `orientation`
  (`vertical` by default, or inherited from an enclosing channel strip; vertical is at least 160 px tall, horizontal at
  least 128 px wide), `size` (`sm` / `default` / `lg`: track 6 / 8 / 10 px, thumb 20×14 / 24×16 / 28×20 px), `thumbMarks`
  (grip lines on the thumb, default 3, `false` for none), `aria-*`, `id`, `className`.
- Structure: a `role="slider"` with `aria-orientation`; a fully rounded track in `--input` (90 %), filled from the bottom
  (vertical) or the left (horizontal) by a `--primary` range; a `--card` thumb with a 1 px `--ring` border, corner radius
  `min(var(--radius-md), 10px)`, carrying `--primary` grip lines at 50 %.
- States: the thumb gets a 3 px `--ring` ring at 50 % on hover, focus-visible and press; disabled → 50 % opacity.
- Interactions: pressing the track jumps the value there and keeps dragging; wheel ±`step`.
- Keyboard: ArrowUp/ArrowRight +`step`, ArrowDown/ArrowLeft −`step`, PageUp/PageDown ±10 steps, Home → `min`, End → `max`; every value is clamped to `min…max` and rounded to `step`.

### Transport (seek bar) — `transport.tsx`

- Props: `value` (playhead, `min…max`, default 0…100), `bufferedValue` (buffered-ahead position), `onSeek(value)`, `min`, `max`,
  `step`, `disabled`, `orientation` (`horizontal` by default, or inherited from a channel strip), `size` (`sm` / `default` / `lg`),
  `freezeValuesWhileDragging` (ignore incoming `value` updates mid-drag, for a live clock), `aria-*`.
- Structure: a `role="slider"` over a rounded `--input` (90 %) track holding a `--primary` (40 %) buffered range behind a
  `--primary` played range, and a `--card` thumb with a `--ring` border and one `--primary` grip line.
- States: thumb ring on hover / focus-visible / press as the fader; disabled → 50 % opacity.
- Interactions: press the track to jump, drag the thumb to scrub.
- Keyboard: ArrowUp/ArrowRight +`step`, ArrowDown/ArrowLeft −`step`, PageUp/PageDown ±10 steps, Home → `min`, End → `max`; every value is clamped to `min…max` and rounded to `step`.

### Audio player — `player.tsx`

The player never touches audio. `AudioPlayerProvider` receives the playback state and callbacks as props; every part below
reads them from there and only reports intent. Connect the callbacks to whatever plays the audio.

- `AudioPlayerProvider` props — state: `queue` (`Track[]`: `id`, `title`, `artist`, `album`, `artwork` URL, `duration` s,
  `live`), `currentIndex` (−1 = nothing loaded), `isPlaying`, `isLoading`, `currentTime` s, `duration` s (`Infinity` = live,
  0 = unknown), `bufferedTime` s, `volume` 0…1, `muted`, `playbackRate`, `repeatMode` (`none` | `one` | `all`), `shuffle`,
  `insertMode` (`first` | `last` | `after`); callbacks: `onPlayPause`, `onSeek(seconds)`, `onNext`, `onPrevious`,
  `onVolumeChange(0…1)`, `onMutedChange`, `onPlaybackRateChange`, `onRepeatModeChange`, `onShuffleChange`,
  `onInsertModeChange`, `onPlayTrack(index)`, `onRemoveTrack(id)`, `onReorder(queue)`, `onClearQueue`.
- `AudioPlayer` — the surface: `size` (`default` 16 px / `sm` 12 px vertical padding), `variant` (`default` and `widget`:
  `--card` at 70 % with a `--foreground`/10 % ring and a backdrop blur; `ghost`: transparent, `--muted`/30 % on hover).
  `AudioPlayerControlBar` lays parts out in a row (`compact`) or a column (`stacked`); `AudioPlayerControlGroup` is a
  horizontally scrolling row with snap points.
- Buttons are shadcn `Button`s with a tooltip and an `aria-label`: `AudioPlayerPlay` (play/pause glyphs cross-fade with a
  blur; spinner while `isLoading`; disabled with no track; Space anywhere on the page toggles it), `AudioPlayerSkipBack` /
  `AudioPlayerSkipForward` (disabled at the ends of the queue unless `repeatMode` is `all`), `AudioPlayerRewind` /
  `AudioPlayerFastForward` (±10 s, disabled for live streams).
- `AudioPlayerSeekBar` — the transport slider in percent of `duration`; disabled and full for live streams.
  `AudioPlayerTimeDisplay` — `m:ss` elapsed, or remaining with `remaining`; for a live stream the remaining display reads
  "LIVE" in `--destructive` with a pulsing radio icon.
- `AudioPlayerVolume` — an outline icon button (speaker glyph by level: muted, < 33 %, < 66 %, above) opening a menu with the
  level in mono numbers, a mute toggle and a small horizontal fader (0–100). Hidden below the `md` breakpoint.
- `AudioPlaybackSpeed` — outline button showing the current rate (0.5×–2×) that opens a radio menu; disabled for live streams.
- Queue: `AudioQueueShuffle` and `AudioQueueRepeatMode` are toggle buttons (`aria-pressed`, `secondary` when on; repeat cycles
  none → all → one); `AudioQueuePreferences` opens radio groups for repeat and insert mode; `AudioQueue` opens a dialog with a
  search field (title/artist filter), the queue as a track list (reorderable when not searching, remove buttons, click to
  play) and a destructive "Clear" button.
- Tracks: `AudioTrack` renders one row (shadcn `Item`: `media` slot, title, artist, `m:ss` duration or a "Live" badge,
  `actions` slot; outlined when it is the current track; click plays it or toggles playback). `AudioTrackCover` (artwork
  avatar or a music glyph on `--muted`), `AudioTrackIndex` (1-based number), `AudioTrackPlayPauseAction`,
  `AudioTrackRemoveAction` (hidden on the current track). `AudioTrackList` renders the queue (or `tracks`) as a column or a
  `grid` (two columns from `xl`), with `mode="sortable"` drag handles, `media` `cover` | `index`, `actions`
  `play-pause` | `remove` | `play-pause-with-remove` | `none`, `filterQuery`, and an empty state (`emptyLabel`, `emptyDescription`).
- Keyboard: every button, menu and dialog follows the shadcn/Base UI patterns (Tab, Enter/Space, arrow keys in menus, Escape
  closes); sliders follow the transport and fader maps; the sortable list follows its own map.

### Sortable list — `sortable-list.tsx`

- Parts: `SortableList` (`items: { id }[]`, `onChange(items)` with the new order, `renderItem(item, index)`, `className`),
  `SortableItem` (`id`; wraps one row in an `<li>`), `SortableDragHandle` (the grip button that starts a drag).
- Structure: a plain `<ul>`; the row being moved drops to 40 % opacity with a shadow and a `--ring` outline; a visually
  hidden `aria-live` region announces pick-up, moves and drop.
- Interactions: drag the grip; the list reorders live as the row passes the nearest neighbour (distance to row centres,
  so it also works in grids).
- Keyboard (grip focused): Space / Enter lifts the row, arrow keys move it one place, Space / Enter drops it, Escape
  restores the order from before the lift.
