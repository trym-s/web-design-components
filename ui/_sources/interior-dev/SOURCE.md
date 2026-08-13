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
