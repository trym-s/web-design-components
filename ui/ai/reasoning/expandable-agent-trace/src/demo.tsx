import { useEffect, useState } from "react";
import { AgentTrace, type AgentTraceRow, type AgentTraceVariant } from "./agent-trace";

/* The upstream's scripted run: stage 1 opens the trace (800 ms), stage 2 shows the first
 * rows (+600 ms), stage 3 shows all rows and settles (+1.8 s), stage 4 collapses (+2.6 s). */
const STAGES = [800, 600, 1800, 2600];

const SAMPLES: Record<AgentTraceVariant, { active: string; done: string; rows: AgentTraceRow[]; query?: string; more?: string }> = {
  steps: {
    active: "Thinking",
    done: "Thought for 4 seconds",
    rows: [
      { primary: "Reading flavor briefs" },
      { primary: "Scanning supplier lists" },
      { primary: "Comparing tasting notes", secondary: "6 flavors" },
      { primary: "Writing the scoop report" },
    ],
  },
  reasoning: {
    active: "Thinking",
    done: "Thought for 4 seconds",
    rows: [
      { primary: "Summer demand spikes for stone-fruit flavors — peach and apricot lead." },
      { primary: "I should check cone inventory before promoting a waffle-bowl special." },
    ],
  },
  search: {
    active: "Searching the web",
    done: "Searched the web",
    query: "best waffle cone supplier",
    more: "+7 more",
    rows: [
      { primary: "Joy Cone", secondary: "joycone.com", href: "https://joycone.com/fs_products/waffle-cones/" },
      { primary: "WebstaurantStore", secondary: "webstaurantstore.com", href: "https://www.webstaurantstore.com/ice-cream-shop-supplies.html" },
      { primary: "The Konery", secondary: "thekonery.com", href: "https://www.thekonery.com/" },
    ],
  },
  coding: {
    active: "Running tools",
    done: "Ran 3 tools",
    rows: [
      { primary: "Read", secondary: "flavors.ts", mono: true },
      { primary: "Edit", secondary: "ChurnSchedule.tsx", mono: true, add: 74, del: 41 },
      { primary: "Run", secondary: "npm run freeze", mono: true },
    ],
  },
};

function Run({ variant }: { variant: AgentTraceVariant }) {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    if (stage >= STAGES.length) return;
    const t = setTimeout(() => setStage((s) => s + 1), STAGES[stage]);
    return () => clearTimeout(t);
  }, [stage]);

  const sample = SAMPLES[variant];
  const visible = stage < 2 ? 0 : stage === 2 ? Math.min(2, sample.rows.length) : sample.rows.length;
  return (
    <AgentTrace
      variant={variant}
      working={stage < 3}
      activeLabel={sample.active}
      doneLabel={sample.done}
      rows={sample.rows.slice(0, visible)}
      query={sample.query}
      moreLabel={stage >= 3 ? sample.more : undefined}
      autoExpanded={stage >= 1 && stage < 4}
    />
  );
}

export default function Demo() {
  return (
    <div className="grid w-full max-w-3xl gap-6 sm:grid-cols-2">
      {(["steps", "reasoning", "search", "coding"] as const).map((variant) => (
        <Run key={variant} variant={variant} />
      ))}
    </div>
  );
}
