---
name: ui-bank
description: Autonomously design and implement a target project's interface from the human-curated references in this cloned UI bank, only when the user explicitly requests $ui-bank.
---

# UI Bank

Use the bank as design evidence, not as an installable component package. Keep `ui/` read-only.

## Bans

The bank carries house bans: patterns that must not appear in the interface you produce. They are rules about your output, not about the references — a reference may contain a banned pattern and still be a valid source for everything else in it. Adapt around the banned part; never reproduce it.

Bans are binding, not preferences to weigh. Every `search` and `show` payload carries the current list in its `bans` field, so read it there; `node tools/ui-bank.mjs bans` prints it on its own. The registry in `bans/` is the only source of truth — no other file restates a ban's text.

## 1. Derive UI requirements

Read the target project's instructions, product language, interface, design tokens, framework,
dependencies, routes, data shapes, responsive rules, and test commands. Derive its audience, jobs,
information hierarchy, actions, data states, and constraints.

Turn each need into a UI requirement containing its context, user goal, behavior, constraints, and
page role. Make reasonable product decisions from repository evidence and continue autonomously.

Completion criterion: every material interface need is represented by a UI requirement.

## 2. Select references

This skill runs from a symlink (`<agent-home>/skills/ui-bank`) into the bank repository; the target project you're working in is not that repository, so do not look for `tools/ui-bank.mjs` by walking up from the target project's working directory — it won't be an ancestor. Resolve the bank root from the symlink's real path instead:

```bash
SKILL_LINK="$(realpath "${CLAUDE_CONFIG_DIR:-$HOME/.claude}/skills/ui-bank" 2>/dev/null \
  || realpath "${CODEX_HOME:-$HOME/.codex}/skills/ui-bank" 2>/dev/null \
  || realpath "${HERMES_HOME:-$HOME/.hermes}/skills/ui-bank" 2>/dev/null \
  || realpath "${ANTIGRAVITY_HOME:-$HOME/.gemini}/skills/ui-bank" 2>/dev/null \
  || realpath "${AGENTS_HOME:-$HOME/.agents}/skills/ui-bank" 2>/dev/null)"
BANK_ROOT="$(cd "$SKILL_LINK/../../.." && pwd)"
```

If none of those paths exist, ask the user for the bank repository's location on this host — it must be cloned locally (it is not fetched over the network) — then run `npm run skill:install` there to (re)create the symlink. Once `BANK_ROOT` is known, `cd "$BANK_ROOT"`, confirm `tools/ui-bank.mjs` and `catalog/catalog.json` exist, run `npm run catalog:check`, then query:

```bash
node tools/ui-bank.mjs search <need terms> --role structure --limit 8
node tools/ui-bank.mjs search <need terms> --role behavior --limit 8
node tools/ui-bank.mjs search <need terms> --role visual --limit 8
node tools/ui-bank.mjs show <reference-id>
```

Search returns only human-curated references. For each UI requirement, compare `Use when`,
`Avoid when`, and `Choose over`; use `Provides` and `Requires` to check behavior and compatibility.
Inspect each serious candidate's reference, README, source, preview, and status paths returned by
`show`. Search selected source files and accompanying styles together.

For Beautiful UI, search `ui/_sources/beautiful-ui/styles.css` for selectors used by the reference.
For Arlan entries, pass `PROMPT.md` verbatim only when porting the whole effect; otherwise read
`src/` for technique.

Apply these gates:

- `blocked`: exclude.
- `limited`: use only with a local replacement for the limitation.
- `review`: inspect source before use.
- `decorative`: use only for appearance, never information architecture or interaction flow.

Completion criterion: each supported UI requirement has a fitting reference whose behavior,
runtime cost, accessibility, and adaptation cost fit the target.

## 3. Adapt

Implement the selected composition in the target project's framework, tokens, accessibility
patterns, and domain language. Preserve useful behavior and hierarchy, not snapshot-specific layout
or literal copy. Do not add the bank as a runtime dependency or edit its snapshots.

Apply every ban from the `bans` field to what you produce, even when the selected reference uses a
banned pattern. Replace the banned part with that ban's `instead` guidance and note the substitution
in the decision record.

Cover the states the target needs: loading, empty, error, permission, overflow, keyboard, reduced
motion, and mobile. Avoid fabricating backend behavior.

## 4. Verify and record

Run the target project's build and relevant tests. Use Chromium at desktop and `390x844`; exercise
meaningful controls and inspect screenshots. Fix failures.

Write `docs/ui-decisions/<dashboard-slug>.md` using
[the decision template](references/decision-template.md). Record the bank commit with
`git -C <bank-root> rev-parse HEAD`.

Completion criterion: every UI requirement is implemented or explicitly unsupported by the
curated bank, validation passes, screenshots were inspected, and the decision record names selected
references, any ban substitutions, and remaining limitations.
