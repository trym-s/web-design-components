# ascii.rest

- Site: https://ascii.rest/
- Repository: https://github.com/bas3line/ascii
- Captured commit: `813ea2a233b56cc1c67a00d1e65ded21845ed1cd`
- Capture date: 2026-10-08T14:00:32Z
- License: MIT — `LICENSE`; local fonts have their own SIL OFL notices under `fonts/`.
- Importer: `node tools/import-ascii-rest.mjs .cache/ascii-rest/upstream`
- Previews: `node tools/capture-bank.mjs --source ascii-rest --previews`

## Inventory

- creatures: 10
- data: 10
- distros: 23
- effects: 8
- generative: 13
- nature: 16
- objects: 14
- physics: 14
- scenes: 15
- shapes: 12
- space: 11
- type: 9
- ui: 12

167 captured references, including all 23 distro pieces. The live site and pinned repository agree on 208 published pieces. Per-piece paths, options, dependencies, dimensions and upstream documentation are recorded in `manifest.json`.

## Excluded

- 27 language logos (upstream `logos`).
- 14 company logos (upstream `companies`).

## Snapshot boundary

Piece source is retained per reference, with only its type import rewritten. `src/mount.ts`, `src/react.tsx`, `src/types.ts`, `src/index.ts` and `src/terminal.ts` are unchanged. `src/cli.ts` reads its captured version from `manifest.json`. The library index includes only the requested pieces. The HTML and Astro adapters use local font paths; the Astro adapter points to captured TypeScript instead of package build output. `frame.tsx`, `frame.css` and the distro React wrappers are bank-only harnesses. Distro attribution notices remain intact. Every default demo runs offline after the bank is loaded.

## Terminal playback

Run from the bank repository root on Aletheia; no install or upstream connection is needed:

```sh
node ui/_sources/ascii-rest/src/cli.ts list
node ui/_sources/ascii-rest/src/cli.ts donut
node ui/_sources/ascii-rest/src/cli.ts ubuntu
node ui/_sources/ascii-rest/src/cli.ts night-coast
```

Any key stops playback. `--mono` uses the terminal's own ink; `--light` selects light-background shading; `--seconds` bounds playback. A pipe prints the first frame. Coloured square-cell scenes pair rows into Unicode half blocks with ANSI truecolor; a wide terminal shows the full scene. The piece list contains only the captured scope.
