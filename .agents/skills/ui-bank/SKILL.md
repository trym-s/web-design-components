---
name: ui-bank
description: Select and adapt references from this cloned UI bank for a target project's interface, only when the user explicitly requests $ui-bank.
---

# UI Bank

Use the bank as design evidence, not as an installable component package. Keep `ui/` read-only.

## 1. Ground in the target project

Read its agent instructions, product/domain vocabulary, existing interface, design tokens, framework, dependencies, routes, data shapes, responsive rules, and test commands. Derive facts from the project. Ask only for product decisions that would materially change the result.

Completion criterion: state the dashboard's audience, jobs, information hierarchy, actions, data states, technical constraints, and unresolved product decisions.

## 2. Find candidates

Locate this skill's repository root by walking upward until `tools/ui-bank.mjs` and `catalog/catalog.json` exist. Run `npm run catalog:check`, then query:

```bash
node tools/ui-bank.mjs search <need terms> --role structure --limit 8
node tools/ui-bank.mjs search <need terms> --role behavior --limit 8
node tools/ui-bank.mjs search <need terms> --role visual --limit 8
node tools/ui-bank.mjs show <reference-id>
```

Inspect each serious candidate's `reference`, README, source, preview, and status paths returned by `show`. Search the selected source files and accompanying styles together. For Beautiful UI, search `ui/_sources/beautiful-ui/styles.css` for the selectors in the selected reference. For Arlan entries, pass `PROMPT.md` verbatim only when porting the whole effect; otherwise read `src/` for technique.

Apply these gates:

- `blocked`: exclude from proposals.
- `limited`: propose only with the limitation and a local replacement plan.
- `review`: inspect source manually before proposing.
- `verified`: still judge product fit; evidence is not suitability.
- `decorative`: use only for look and feel, never information architecture or interaction flow.

Completion criterion: retain only candidates whose role, behavior, runtime cost, accessibility, and adaptation cost fit the target.

## 3. Request skeleton approval

Present one recommended composition and one meaningfully different alternative. For each, give:

- compact page skeleton and primary user flow;
- reference IDs with `structure`, `behavior`, or `visual` role;
- evidence level and relevant limitation;
- what will be preserved versus adapted;
- why the recommended composition fits better.

Wait for approval before implementing structural layout, navigation, or workflow. Low-risk visual details do not need separate approval.

## 4. Adapt in the target project

Translate the approved references into the target framework, component conventions, tokens, accessibility patterns, and domain language. Preserve useful behavior and hierarchy, not snapshot-specific layout or literal product copy. Do not add the bank as a runtime dependency and do not edit its snapshots.

Cover the states the target product actually needs: loading, empty, error, permission, overflow, keyboard, reduced motion, and mobile. Avoid fabricating backend behavior.

## 5. Verify and record

Run the target project's build and relevant tests. Use Chromium at desktop and `390x844`; exercise meaningful controls and inspect screenshots. Fix failures before completion.

Write `docs/ui-decisions/<dashboard-slug>.md` in the target project using [the decision template](references/decision-template.md). Record the bank commit with `git -C <bank-root> rev-parse HEAD`.

Completion criterion: approved composition works in the target project, validation passes, screenshots were inspected, and the decision record names remaining limitations.
