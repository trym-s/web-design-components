---
name: ui-bank
description: Autonomously design and implement a target project's interface from the human-curated references in this cloned UI bank, only when the user explicitly requests $ui-bank.
---

# UI Bank

Use the bank as design evidence, not as an installable component package. Keep `ui/` read-only.

## 1. Derive UI requirements

Read the target project's instructions, product language, interface, design tokens, framework,
dependencies, routes, data shapes, responsive rules, and test commands. Derive its audience, jobs,
information hierarchy, actions, data states, and constraints.

Turn each need into a UI requirement containing its context, user goal, behavior, constraints, and
page role. Make reasonable product decisions from repository evidence and continue autonomously.

Completion criterion: every material interface need is represented by a UI requirement.

## 2. Select references

Locate this skill's repository root by walking upward until `tools/ui-bank.mjs` and
`catalog/catalog.json` exist. Run `npm run catalog:check`, then query:

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
references and remaining limitations.
