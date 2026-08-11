#!/usr/bin/env bash
set -euo pipefail

url="${1:-https://transitions.dev/}"
declare -A titles=(
  [accordion]="Accordion"
  [avatar-group-hover]="Avatar group hover"
  [card-resize]="Card resize"
  [card-tilt]="3D tilt"
  [checkbox-check]="Checkbox check"
  [error-state-shake]="Error state shake"
  [icon-swap]="Icon swap"
  [input-clear-dissolve]="Input clear with dissolve"
  [learn-more-hover]="Learn more hover"
  [like-button]="Like button"
  [menu-dropdown]="Menu dropdown"
  [modal]="Modal open/close"
  [notification-badge]="Notification badge"
  [number-pop-in]="Number pop-in"
  [page-side-by-side]="Page side-by-side"
  [panel-reveal]="Panel reveal"
  [plus-menu-morph]="Dropdown menu morph"
  [shimmer-text]="Shimmer text"
  [skeleton-reveal]="Skeleton loader and reveal"
  [spinning-counter]="Spinning counter"
  [success-check]="Success check"
  [tabs-sliding]="Tabs sliding"
  [text-states-swap]="Text states swap"
  [texts-reveal]="Texts reveal"
  [toast]="Toast open/close"
  [toggle]="Toggle"
  [tooltip]="Tooltip open/close"
)

agent-browser open "$url" >/dev/null
agent-browser wait --load networkidle >/dev/null
agent-browser set viewport 900 700 >/dev/null

for slug in "${!titles[@]}"; do
  title="${titles[$slug]}"
  dir="ui/animation/transitions/$slug"
  agent-browser eval "(()=>{const wanted=${title@Q};let target;for(const card of document.querySelectorAll('[data-proto-card]')){const hit=card.querySelector('.card-title')?.textContent.trim()===wanted;card.style.display=hit?'block':'none';if(hit)target=card}target?.scrollIntoView({block:'center'});})()" >/dev/null
  agent-browser wait 900 >/dev/null
  box="$(agent-browser get box 'article[data-proto-card][style*="display: block"] .card-stage')"
  x="$(awk '/^x:/{print $2}' <<<"$box")"
  y="$(awk '/^y:/{print $2}' <<<"$box")"
  w="$(awk '/^width:/{print $2}' <<<"$box")"
  h="$(awk '/^height:/{print $2}' <<<"$box")"
  agent-browser screenshot "$dir/.capture.png" >/dev/null
  magick "$dir/.capture.png" -crop "${w}x${h}+${x}+${y}" +repage "$dir/preview.png"
  rm "$dir/.capture.png"
done

agent-browser close >/dev/null
