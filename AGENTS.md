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
- The skill may adapt references into a target project, but `ui/` remains a read-only snapshot and
  must never become the target project's runtime dependency.

`ui/` contains visual references, not reusable packages.

- Search directory names and `Use when:` comments with `rg`.
- Read source and any accompanying styles together.
- Beautiful UI references use the exact shared snapshot at `ui/_sources/beautiful-ui/styles.css`; search it for the selectors used by the chosen reference instead of reading the whole compiled file.
- `ui/animation/transitions/` holds one free transition per directory; `SOURCE.md` records the upstream source and captured commit.
- Use nearby `preview.png` as visual grounding; it is captured from the original reference site.
- Current source sites: `https://beautiful-ui-five.vercel.app/` and `https://www.arlan.me/vault` (see `ui/_sources/arlan-vault/SOURCE.md`).
- Every reference README carries a `## Classification` block: category, medium, entry point, and
  nature (`decorative` visual-only vs `structural` / `interactive` / `functional`), plus an
  ISO-8601 `Added` timestamp for newest-first browsing. Decorative
  entries supply look-and-feel only — never lift their layout or interaction as a UX pattern.
- Arlan vault entries ship a `PROMPT.md`: the upstream agent prompt with the whole source inline.
  Pass it verbatim to an agent that must port the effect; read `src/` when you only need technique.
- Reuse visual hierarchy, spacing, color, radius, shadow, and interaction decisions.
- Translate the reference into the target project's framework and conventions.
- Bans live in `bans/`, one Markdown file per ban, and are compiled into `catalog/catalog.json` by
  `npm run catalog:build`. Every `search` and `show` payload carries them, and
  `node tools/ui-bank.mjs bans` prints them. They govern the interface produced from the bank, not
  the bank itself: a pinned snapshot may contain a banned pattern and stay a valid reference. Add a
  ban by adding a file with `id`/`title` front matter and `## Rule` / `## Instead` sections; never
  restate its text anywhere else.
- Do not invent missing design values or combine conflicting references.
- Treat every retained `src/` or `registry/` tree as a pinned source snapshot, not an installable package.

`dashboard/` is a viewer only; keep `ui/` as a read-only source snapshot. Run `npm run dev` to browse it.

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
└── src/
    ├── <slug>.tsx       # pinned component/hook source
    └── demo.tsx         # minimal replayable upstream demo
```

- Preserve upstream component behavior and values. Only rewrite imports and asset paths needed to
  make the snapshot run inside this repository.
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
