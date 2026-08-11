# UI Reference Bank

`ui/` contains visual references, not reusable packages.

- Search directory names and `Use when:` comments with `rg`.
- Read source and any accompanying styles together.
- Beautiful UI references use the exact shared snapshot at `ui/_sources/beautiful-ui/styles.css`; search it for the selectors used by the chosen reference instead of reading the whole compiled file.
- `ui/animation/transitions/` holds one free transition per directory; `SOURCE.md` records the upstream source and captured commit.
- Use nearby `preview.png` as visual grounding; it is captured from the original reference site.
- Current source site: `https://beautiful-ui-five.vercel.app/`.
- Reuse visual hierarchy, spacing, color, radius, shadow, and interaction decisions.
- Translate the reference into the target project's framework and conventions.
- Do not invent missing design values or combine conflicting references.
- Treat every retained `src/` or `registry/` tree as a pinned source snapshot, not an installable package.
