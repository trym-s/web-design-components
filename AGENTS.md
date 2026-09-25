# UI Reference Bank

## Agent skills

### Issue tracker

Issues live as GitHub issues in `trym-s/web-design-components`, driven with the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

The five canonical triage labels are used under their default names. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `CONTEXT.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.

## Agent selection workflow

- After adding or changing a reference, run `npm run catalog:build`; CI/build uses
  `npm run catalog:check` to reject a stale or inconsistent `catalog/catalog.json`.
- After adding a component reference, commit and push its completed capture to the configured remote.
- Treat a user-provided code block as a request to add that component to this UI reference bank unless they state another intent.
- Query agent-facing candidates with `node tools/ui-bank.mjs search ...`; inspect a candidate with
  `node tools/ui-bank.mjs show <id>` before adapting it.
- Install the user-invoked `$ui-bank` workflow on a cloned host with `npm run skill:install`. It
  symlinks `.agents/skills/ui-bank` into every agent runtime already present on the machine —
  Claude Code, Codex, Hermes, Antigravity, and the cross-runtime `~/.agents/skills` alias. Use
  `--host <name>` to target one runtime and `--all` to install for absent runtimes too.
- The skill copies an entry's `src/` into a React target, or rebuilds it from `src/` and its README
  for any other stack. `ui/` itself never becomes the target project's runtime dependency.

`ui/` contains references. An entry's `src/` is the copy-paste component; its `upstream/` is the
pinned original it was derived from (see *Entry layout* below).

- Search directory names and `Use when:` comments with `rg`.
- Read source and any accompanying styles together.
- Beautiful UI references use the exact shared snapshot at `ui/_sources/beautiful-ui/styles.css`; search it for the selectors used by the chosen reference instead of reading the whole compiled file.
- `ui/animation/transitions/` holds one free transition per directory; `SOURCE.md` records the upstream source and captured commit.
- Use nearby `preview.png` as visual grounding; it is captured from the original reference site.
- Current source sites: `https://beautiful-ui-five.vercel.app/` and `https://www.arlan.me/vault` (see `ui/_sources/arlan-vault/SOURCE.md`),
  plus the design systems Astryx (`astryx-*`, `ui/_sources/astryx/SOURCE.md`) and shadcn/ui (`shadcn-*`,
  `ui/_sources/shadcn/SOURCE.md`) and the auth screens of Better Auth UI (`better-auth-ui-*` for its shadcn
  flavour, `better-auth-ui-heroui-*` for HeroUI; `ui/_sources/better-auth-ui/SOURCE.md`), and Chamaac UI (`chamaac-*`: shader backgrounds, buttons, text
  animations, sections; `ui/_sources/chamaac/SOURCE.md`; its animated icons are the `chamaac-icons` set), and Audio UI (`audio-ui-*`: knobs,
  faders, XY pads, players, channel strips, synth blocks; `ui/_sources/audio-ui/SOURCE.md`), each rebuilt by
  `tools/import-<system>.mjs` and `tools/capture-bank.mjs`.
- Design-system references carry `static/<example>.html` (plus `.open.html` for overlays): the rendered DOM
  linked to the system's local stylesheet. Use it when the target is not React; it has markup and tokens,
  not behavior.
- Every reference README carries a `## Classification` block: category, medium, entry point, and
  nature (`decorative` visual-only vs `structural` / `interactive` / `functional`), plus an
  ISO-8601 `Added` timestamp for newest-first browsing. Decorative
  entries supply look-and-feel only — never lift their layout or interaction as a UX pattern.
- Arlan vault entries ship a `PROMPT.md`: the upstream agent prompt with the whole source inline.
  Pass it verbatim to an agent that must port the effect; read `upstream/` when you only need technique.
- Reuse visual hierarchy, spacing, color, radius, shadow, and interaction decisions.
- Translate the reference into the target project's framework and conventions.
- Bans live in `bans/`, one Markdown file per ban, and are compiled into `catalog/catalog.json` by
  `npm run catalog:build`. Every `search` and `show` payload carries them, and
  `node tools/ui-bank.mjs bans` prints them. They govern the interface produced from the bank, not
  the bank itself: a pinned snapshot may contain a banned pattern and stay a valid reference. Add a
  ban by adding a file with `id`/`title` front matter and `## Rule` / `## Instead` sections; never
  restate its text anywhere else.
- Do not invent missing design values or combine conflicting references.
- Treat every `upstream/` or `registry/` tree as a pinned source snapshot, not an installable package.

`dashboard/` is a viewer only; keep every `upstream/` read-only. Run `npm run dev` to browse it.

## Entry layout: `upstream/` and `src/`

Apply this to every new component and to every re-import.

- `upstream/` — the pinned upstream source, unchanged except import and asset rewrites needed to run
  it in this repo. Provenance and diff base for later re-imports. Never edited by hand.
- `src/` — the component a target project uses. React targets copy it as-is; other stacks rebuild it
  from `src/` plus the README. It must satisfy all of:
  1. Imports only: `react`, `react-dom`, Tailwind classes, shadcn/ui components and their primitives
     (`radix-ui`, `@radix-ui/react-*`, `@base-ui/react`), `class-variance-authority`, `clsx`, `tailwind-merge`,
     `lucide-react`, and — where the effect needs them — `motion` and `three` /
     `@react-three/fiber`. No source-library package, no Next.js (`next/*`, `next-themes`, `geist`),
     no `@/…` alias, no path leaving `src/`. Vendor what is needed into `src/`; shadcn/ui components
     go in `src/ui/`, which a target that already has them points at its own copies.
  2. Every color, radius, font, and shadow resolves through shadcn tokens (`--background`,
     `--foreground`, `--primary`, `--muted`, `--border`, `--radius`, …) or a CSS variable the
     component declares with a default. Literal hex/rgb may appear only as such a default (shader
     palettes: a colour prop defaulting to the upstream value), so rebranding means changing
     tokens or props. Vendored shadcn/ui files in `src/ui/` are exempt, and so are hand-tuned effect
     palettes (gradient stops, foil or shader colour tables) as long as the component's own UI
     surfaces use tokens. Document overriding a component variable through inline `style` or an
     outer rule: two arbitrary-property classes setting one variable resolve by stylesheet order,
     not class order.
  3. Content and behavior arrive through props and callbacks; sample data and example
     wiring (a simulated clock, a demo audio engine) live only in `src/demo.tsx`. Components that front a service (auth, audio engine, network) expose UI state
     and callbacks, not a client for that service.
  4. The README's `## Usage` section lists props, states, interactions, and keyboard behavior —
     enough to rebuild the component in plain HTML/CSS/JS without reading React.
- Entries whose upstream cannot meet these rules (Astryx: StyleX; Better Auth UI HeroUI flavour:
  HeroUI package) carry `upstream/` only and stay visual references. Single-file captures may keep
  their upstream code in `reference.tsx` instead of `upstream/`.
- `npm run catalog:check` enforces rule 1 on every `src/`; `npm run portable:check -- <id>` copies
  `src/` into `tools/portable-fixture/` (Vite react-ts template + shadcn tokens), type-checks, builds,
  and screenshots `demo.tsx`. Both must pass before a `src/` is committed.

## Investigate mode: when the user sends a URL and asks to find or capture components

Treat a supplied URL as an investigation target, not as permission to copy the first visible
markup. The goal is to identify the complete public component set, prove what is actually
available, and represent it faithfully in this bank.

### 1. Establish the upstream and the requested scope

1. Open the exact URL with Chromium. Follow redirects and record the canonical origin.
2. Inspect the rendered site, page source, network-visible routes, metadata, sitemap/robots files,
   and any linked source repository. Prefer the upstream repository over reverse-engineering
   minified production bundles when both describe the same release.
3. Determine what the user means by “all”: published/free/ready components only, or also planned,
   premium, private, and placeholder entries. Include only items whose usable source or public
   implementation can be proven. Report excluded planned or unavailable items explicitly.
4. Cross-check the live catalog against the repository registry, component directory, demo
   directory, and documentation routes. Do not infer completeness from search-engine results.
5. Pin the capture to an exact commit or immutable release when a repository exists. Record the
   capture date, upstream URLs, license, and commit in `_sources/<upstream>/SOURCE.md`.

### 2. Build a component inventory before editing

For every confirmed component, record:

- upstream name, slug, category, and catalog/sheet identifier;
- public documentation URL and source file path;
- whether it is decorative, structural, interactive, or functional;
- runtime framework and dependencies;
- demo entry point and all runtime assets it consumes;
- whether its behavior can be exercised without upstream network access.

Use this inventory as the source of truth for counts. Component source, demo source, README,
SOURCE, reference entry point, and preview counts must agree at the end.

### 3. Capture into the bank structure

Create one directory per component under the closest existing semantic category:

```text
ui/<category>/<slug>/
├── reference.tsx        # `Use when:` comment and dashboard default export
├── README.md            # classification, files, use guidance
├── SOURCE.md            # provenance, license, pinned revision
├── preview.png          # Chromium capture from the original component page
├── upstream/
│   ├── <slug>.tsx       # pinned component/hook source
│   └── demo.tsx         # minimal replayable upstream demo
└── src/                 # copy-paste component (see Entry layout)
    ├── <slug>.tsx
    └── demo.tsx
```

- In `upstream/`, preserve upstream component behavior and values. Only rewrite imports and asset
  paths needed to make the snapshot run inside this repository. Derive `src/` from it.
- Keep shared styles, licenses, fonts, images, video, audio, manifests, and other common material
  in `ui/_sources/<upstream>/`.
- Prefer a repeatable importer under `tools/` when capturing multiple components. It must pin the
  same upstream revision and reproduce every path rewrite, including component-specific rewrites.
- Add the upstream as a distinct dashboard source when provenance detection would otherwise label
  it `standalone`.

### 4. Localize every runtime dependency

The finished viewer must not rely on the upstream being online.

1. Search component/demo code and shared CSS for HTTP URLs, root-relative asset paths, CSS
   `url(...)`, image/video/audio sources, JSON manifests, CDN base constants, and runtime fetches.
2. Download every accessible static runtime asset into the appropriate `_sources/<upstream>/`
   snapshot. Keep documentation hyperlinks external; localize assets needed to render or interact.
3. Rewrite CSS font URLs to local relative files and rewrite CDN/media helpers to the local source
   root.
4. Import images used by Vite demos with `import asset from "...?..."` or `new URL(...,
   import.meta.url)` instead of leaving them as literal `/ui/_sources/...` strings. Literal paths
   work in the Vite dev server but are not emitted into `dist/`; a Pages SPA fallback can then
   return `index.html` with status 200 and still produce a broken image.
5. After building, request each emitted asset and verify both status and MIME type. `200 text/html`
   for a `.jpg`, `.woff2`, or `.webm` is a missing asset hidden by the SPA fallback.
6. Keep the localization/import tool idempotent so rerunning an upstream capture does not restore
   remote URLs or regress component-specific asset imports.

Dynamic APIs are not static assets. Identify them separately and either provide a documented local
fixture or mark the reference as network-dependent; never silently fabricate service responses.

### 5. Capture and verify with Chromium

- Use installed Chromium in headless mode for source previews and final viewer checks.
- Capture every upstream component at one consistent viewport unless the component specifically
  requires another size.
- Inspect representative screenshots visually rather than trusting exit status alone.
- Exercise interactive references where meaningful: open overlays, press controls, load images,
  and wait for transitions to settle.
- Validate the dashboard at desktop and a real mobile viewport such as `390×844`.
- On mobile, keep filters and file tabs horizontally scrollable, use touch-sized controls, and make
  category card rows horizontal `scroll-snap` tracks when swipe browsing is requested.

### 6. Build and deployment verification

1. Run the repository production build after all captures and asset rewrites. Resolve missing asset
   and module errors; do not dismiss them as harmless without checking the output.
2. Ensure the static output has a real root `index.html`. Add an SPA `_redirects` fallback through
   `public/`, but do not depend on the fallback as a substitute for missing assets.
3. For Cloudflare Pages work, use the global `deploying-to-cloudflare` skill. Build before every
   upload, deploy only `dist/`, use the configured production branch, and never expose credentials.
4. Verify both the immutable deployment URL and the production domain with HTTP requests.
5. Open the production domain in mobile Chromium and inspect the resulting screenshot. A successful
   Wrangler upload is not completion if the root route, iframe, font, image, or interaction fails.

### 7. Completion checklist

Do not call the investigation complete until all of these are true:

- live-site and repository inventories agree;
- every included component has source, demo, classification, provenance, and preview;
- every runtime static asset is local and emitted into `dist/`;
- the production build succeeds without unresolved asset warnings;
- representative interactive components work in Chromium;
- mobile swipe/navigation behavior is usable;
- deployed root and emitted assets return the expected status and MIME types;
- the final report states counts, pinned revision, excluded scope, validation performed, and the
  live URL when deployed.
