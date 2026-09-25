# Source

- Upstream: https://beautiful-ui-five.vercel.app/
- Captured: 2026-08-11
- Stylesheet: `/_next/static/css/05982ab9f2554636.css`
- Upstream SHA-256: `853ec71b46bd65926b4928472cf38cf682726d3ad921036c0e2655f11026a977`
- Stored SHA-256: `f5d987e1df2a19c164b07c47aab43b8c02f73402af81869b7f50471a7adb74d4` (font URLs localized)
- ETag: `e164023adf477d1a244d7fbde93754f4`
- Dependencies referenced by examples: React, `glimm`, `iconoir-react`, `liveline`
- Scope: the 19 Beautiful UI entries stored under `ui/`

The 13 WOFF2 files referenced by the stylesheet are retained under `fonts/`; the stored CSS uses
relative local URLs and does not request fonts from the upstream Next.js deployment.

No public source license was visible when captured. Keep this snapshot in the private reference bank; do not publish or redistribute it without permission.

## Token mapping for `src/`

The snapshot styles components with bank-specific utilities (`text-ink`, `bg-green-tint`, `var(--line)`,
`shadow-card`, `rounded-control` …) defined in `styles.css`. A copy-paste `src/` (AGENTS.md, Entry layout,
rule 2) resolves them through shadcn tokens instead, the same way in every entry. It covers the 11
`ui/ai/**` entries and the 8 single-file standalone captures that share this stylesheet (`code/code-block`,
`data-display/*-table`, `insights/insight-cards`, `inspector/fine-tune-card`, `navigation/sidebar-nav`,
`search/search-list`).

| Snapshot token (light / dark) | `src/` |
| --- | --- |
| `--ink` `#1f2124` / `#f2f3f4` | `foreground` |
| `--ink-2` `#62656b` / `#a5a8ad`, `--ink-3` `#6c6f75` / `#9a9da3` | `muted-foreground` |
| `--page` `#fafafb` / `#17181a` | `background` |
| `--surface` `#fff` / `#232427` | `card` (text on it: `card-foreground`) |
| `--canvas`, `--field`, `--inset`, `--stripe-bg` (near-white greys) | `muted` |
| `--hover` `#f4f5f6` / `#2a2b2e` | `accent` (text on it: `accent-foreground`) |
| `--hover-2` `#e7e9eb` / `#313236` | `foreground/8` |
| `--stripe` `#49494913` / `#ffffff0e` | `foreground/5` |
| `--line` `#ecedef` / `#2e3033` | `border` |
| `--line-strong` `#e0e2e5` / `#3a3c40` | `input` |
| `--accent`, `--accent-ink` (blue) | `primary` (text on a fill: `primary-foreground`) |
| `--accent-tint` | `primary/10` |
| `--red` / `--red-tint` | `destructive` / `destructive/10` |
| `--green` `#189a4d` / `#3dbb72` | `--success`, declared on the component root with the upstream value: `[--success:oklch(0.603_0.155_150.9)] dark:[--success:oklch(0.705_0.154_153.8)]` |
| `--green-tint` | `(--success)/12` |
| `--orange` `#ef720c` / `#f68f3c` | `--warning`, declared the same way: `[--warning:oklch(0.689_0.179_49.9)] dark:[--warning:oklch(0.746_0.156_55.6)]` |
| `--orange-tint` | `(--warning)/12` |
| `--tooltip-bg` / `--tooltip-fg` / `--tooltip-muted` / `--tooltip-border` | `foreground` / `background` / `background/70` / `foreground` |
| `text-white` on a status fill | kept (shadcn's own destructive button does the same) |
| `--font-inter` / `--font-mono-face` | `font-sans` / `font-mono` |
| `rounded-card` 10px / `rounded-control` 8px / `rounded-chip` 6px | `rounded-lg` / `rounded-md` / `rounded-sm` (shadcn: `--radius`, −2px, −4px) |
| any other radius N px | `rounded-[calc(var(--radius)-(10−N)px)]`, so the default `--radius` (10px) gives N; `rounded-full` stays |
| `shadow-hairline` | `ring-1 ring-border` |
| `shadow-btn` | `shadow-xs ring-1 ring-input` |
| `shadow-card` / `shadow-raised` / `shadow-overlay` | `shadow-xs` / `shadow-sm` / `shadow-lg`, each with `ring-1 ring-border` |
| `shadow-inset-field` | `inset-shadow-xs` |
| other literal shadows | the nearest of the above, or a declared `--<component>-shadow` variable |
| keyframes (`pop-in`, `fade-up`, `shimmer-text`, `stream-in`, `caret-blink`, …) | copied verbatim into a CSS file in `src/`, imported by the component |

Status hues (`--success`, `--warning`) are the only colours without a shadcn token; override them on the
component root (or globally, after removing the root declaration) to rebrand.
