#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"

fail() {
  echo "UI bank check failed: $1" >&2
  exit 1
}

mapfile -t references < <(find ui -name reference.tsx -type f | sort)
[[ "${#references[@]}" -eq 50 ]] || fail "expected 50 references, found ${#references[@]}"

use_count="$(rg -l 'Use when:' ui --glob reference.tsx | wc -l | tr -d ' ')"
[[ "$use_count" -eq 50 ]] || fail "expected 50 Use when comments, found $use_count"

for reference in "${references[@]}"; do
  [[ -s "${reference%/*}/preview.png" ]] || fail "missing preview beside $reference"
done

[[ -z "$(find ui -type d -name .git -print -quit)" ]] || fail "nested .git directory found"
! rg -q '@/components/atoms/' ui --glob reference.tsx || fail "unresolved local atom import found"
! rg -q '^/\* Use when: .* reference; copy visual behavior' ui --glob reference.tsx || fail "generic Use when comment found"

css_hash="$(sha256sum ui/_sources/beautiful-ui/styles.css | awk '{print $1}')"
[[ "$css_hash" == "c507d8cb1e31209bbd1faad21fafb4c305752d75458c0d7b497b3620d4ac9cff" ]] || fail "Beautiful UI stylesheet hash changed"

for source in \
  ui/_sources/beautiful-ui/SOURCE.md \
  ui/animation/transitions/SOURCE.md \
  ui/animation/thinking-orbs/SOURCE.md \
  ui/animation/metal-fx/SOURCE.md \
  ui/animation/border-beam/SOURCE.md \
  ui/data-visualization/dither-kit/SOURCE.md; do
  [[ -s "$source" ]] || fail "missing provenance file $source"
done

if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  ! git ls-files -s | awk '$1 == "160000" { found = 1 } END { exit !found }' || fail "gitlink found"
fi

rg -qi 'human-in-the-loop' ui/ai/approval/approval-card/reference.tsx || fail "approval discovery text missing"
rg -qi 'CRM' ui/data-display/records-table/reference.tsx || fail "records discovery text missing"
rg -qi 'dither' ui/data-visualization/dither-kit/reference.tsx || fail "dither discovery text missing"
rg -qi 'liquid-metal' ui/animation/metal-fx/reference.tsx || fail "metal discovery text missing"

echo "UI bank checks passed (${#references[@]} references)."
