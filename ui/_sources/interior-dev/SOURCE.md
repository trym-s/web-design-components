# interior.dev source snapshot

- Upstream: https://www.interior.dev/docs
- Repository: https://github.com/ddoemonn/interior
- Captured commit: `081a76c74caffc2a88960b7b7ae7c8bd03273ed7`
- Captured: 2026-08-12
- License: MIT (see `LICENSE`)

This directory holds the shared visual source material used by all interior.dev entries. Each
entry retains its self-contained copy-paste component and the upstream live demo. The bank treats
these files as a pinned source snapshot, not as a package.

Runtime assets are local: `fonts/` contains the 11 WOFF2 files referenced by `styles.css`,
`avatars/` contains the eight presence-demo portraits, and `demo/` contains the two photographic
examples. No interior.dev component requires a remote asset request.

## Token mapping for `src/`

`upstream/` styles components with Tailwind's `stone` palette plus `dark:` pairs and the site's `--accent`.
A copy-paste `src/` (AGENTS.md, Entry layout, rule 2) resolves them through shadcn tokens, the same way in
every entry; `dark:` colour pairs disappear because the tokens switch with `.dark`.

| `upstream/` (light · dark) | `src/` |
| --- | --- |
| `bg-white` · `stone-900`/`950` surfaces | `bg-card` (panels, popovers: `bg-popover`) or `bg-background` for the page |
| `text-stone-900`/`800`/`700` · `stone-50`…`200` | `text-foreground` |
| `text-stone-600`/`500`/`400` · `stone-300`…`500` | `text-muted-foreground` |
| `text-stone-300` (disabled, placeholders) | `text-muted-foreground/60` |
| `border-stone-200`/`300` · `white/10`…`/20` | `border-border` (form controls: `border-input`) |
| `bg-stone-50`/`100` · `white/5`…`/10` | `bg-muted` (hover fill: `bg-accent`) |
| `bg-stone-200`/`300` · `white/15`…`/20` (tracks, pressed) | `bg-foreground/10` … `/15` |
| `bg-stone-800`/`900` · `stone-100` inverted fill, `text-white` · `stone-900` on it | `bg-primary` / `text-primary-foreground` |
| scrims `bg-stone-900/40` · `black/65` | `bg-black/50`, as shadcn's own dialog overlay |
| `ring-stone-400`/`500`, focus outlines | `ring-ring` / `outline-ring` |
| `text-red-600` · `red-400`, `border-red-*`, `bg-red-50` | `text-destructive`, `border-destructive`, `bg-destructive/10` |
| `emerald-600` · `emerald-400` | `--success`, declared on the component root: `[--success:oklch(0.596_0.145_163.2)] dark:[--success:oklch(0.765_0.177_163.2)]`; use `text-(--success)`, `bg-(--success)/12` |
| `amber-600` · `amber-400` | `--warning`, declared the same way: `[--warning:oklch(0.666_0.179_58.3)] dark:[--warning:oklch(0.828_0.189_84.4)]` |
| `--accent` `#4568ff` / `--accent-soft` | `primary` / `primary/10` |
| gradient fades `from-white` · `from-stone-900` | `from-background` (or `from-card` inside a card) |
| `font-mono`, `font-sans` | unchanged (Tailwind theme fonts) |
| `rounded-*` | `sm`/`md`/`lg`/`xl`/`full` unchanged (shadcn derives them from `--radius`); `rounded-2xl`+ or `rounded-[Npx]` → `rounded-[calc(var(--radius)+(N−10)px)]` |
| `shadow-*` scale | unchanged; shadows with literal colours → the nearest `shadow-*` step or a declared `--<component>-shadow` |

`--success` and `--warning` are the only colours without a shadcn token; override them on the component
root to rebrand.
