#!/usr/bin/env bash
set -euo pipefail

url="${1:-https://beautiful-ui-five.vercel.app/}"
declare -A paths=(
  ["Loading State"]="ui/ai/progress/long-running-work-loader"
  ["Thinking"]="ui/ai/reasoning/expandable-agent-trace"
  ["Streaming Text"]="ui/ai/streaming/streaming-text"
  ["Approval Card"]="ui/ai/approval/approval-card"
  ["Tool Chips"]="ui/ai/tooling/tool-call-chips"
  ["Task Rows"]="ui/ai/tasks/task-rows"
  ["Chat"]="ui/ai/chat/chat-composer"
  ["Prompt Bar"]="ui/ai/input/prompt-bar"
  ["Recommendation Card"]="ui/ai/decision/recommendation-card"
  ["Context Cards"]="ui/ai/retrieval/retrieved-chunks-list"
  ["Diff Table"]="ui/data-display/diff-table"
  ["Records Table"]="ui/data-display/records-table"
  ["Filter Table"]="ui/data-display/filter-table"
  ["Sidebar Nav"]="ui/navigation/sidebar-nav"
  ["Search"]="ui/search/search-list"
  ["Insight Cards"]="ui/insights/insight-cards"
  ["Code Block"]="ui/code/code-block"
  ["Fine-tune Card"]="ui/inspector/fine-tune-card"
  ["Selection Actions"]="ui/ai/selection/selection-actions"
)

agent-browser open "$url" >/dev/null
agent-browser wait --load networkidle >/dev/null
agent-browser set viewport 760 520 >/dev/null

for title in "${!paths[@]}"; do
  dir="${paths[$title]}"
  mkdir -p "$dir"
  agent-browser eval "(()=>{const wanted=\"${title}\";let target;for(const s of document.querySelectorAll('section.primitive-showcase')){const hit=s.querySelector('h3')?.textContent.trim()===wanted;s.style.display=hit?'block':'none';if(hit)target=s}target?.scrollIntoView({block:'start'});})()" >/dev/null
  agent-browser wait 900 >/dev/null
  box="$(agent-browser get box 'section.primitive-showcase[style*="display: block"] .primitive-demo-surface')"
  x="$(awk '/^x:/{print $2}' <<<"$box")"
  y="$(awk '/^y:/{print $2}' <<<"$box")"
  w="$(awk '/^width:/{print $2}' <<<"$box")"
  h="$(awk '/^height:/{print $2}' <<<"$box")"
  agent-browser screenshot "$dir/.capture.png" >/dev/null
  magick "$dir/.capture.png" -crop "${w}x${h}+${x}+${y}" +repage "$dir/preview.png"
  rm "$dir/.capture.png"
done

agent-browser close >/dev/null
