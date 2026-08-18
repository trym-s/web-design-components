# Future features

These ideas are intentionally outside the current UI Bank scope. They are recorded here so the
current component workflow does not acquire speculative branches.

## Reference kinds

Introduce a `kind` only when a reference needs a distinct selection or adaptation workflow:

- `component` — a standalone control or functional UI element
- `icon` — a symbol placed into an existing icon slot
- `animation` — motion applied to an existing element or state change
- `section` — a page region with its own content hierarchy
- `layout` — page-level arrangement of multiple sections

Each reference has one primary kind. Visual or behavioural traits remain categories or
capabilities rather than additional kinds.

## Kind-specific skill phases

Extend UI Bank with separate integration phases when their reference collections are curated.
The expected order is `layout → section → component → animation → icon`, so structural decisions
precede behavioural and visual detail.

## Icon curation

Icon metadata continues to be derived from its path and upstream source for now. Do not include
the 3,929 existing icon references in the manual component-curation pass. Add deeper icon semantics
only when the icon-specific selection workflow is designed.
