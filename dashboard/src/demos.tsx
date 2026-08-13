/**
 * Demo props for references that export a component taking required props.
 * The bank stores the component, not a usage example, so the dashboard supplies
 * one here rather than editing the captured file.
 */
import { lazy, type ComponentType, type ReactNode } from "react";

const BorderBeam = lazy(() => import("/ui/animation/border-beam/src").then((m) => ({ default: m.BorderBeam })));
const HoverVideoButton = lazy(() => import("/ui/animation/hover-video-button/src/hover-video/HoverVideoButton").then((m) => ({ default: m.HoverVideoButton })));
const MetalFx = lazy(() => import("/ui/animation/metal-fx/src").then((m) => ({ default: m.MetalFx })));
const ThinkingOrb = lazy(() => import("/ui/animation/thinking-orbs/src").then((m) => ({ default: m.ThinkingOrb })));

type Demo = ComponentType;

function BorderBeamDemo() {
  return (
    <div className="showcase showcase-beam">
      <ShowcaseHead title="Border beam" subtitle="Traveling border beam component" />
      <div className="showcase-beam-main">
        <BorderBeam size="md" colorVariant="colorful">
          <div className="agent-box">
            <span className="agent-at">@</span>
            <span className="agent-placeholder">Build anything...</span>
            <span className="agent-chip">Agent⌄</span>
            <span className="agent-chip">Auto⌄</span>
            <button aria-label="Send">↑</button>
          </div>
        </BorderBeam>
      </div>
      <div className="showcase-beam-row">
        <div>
          <BorderBeam size="sm" colorVariant="colorful">
            <button className="beam-square" aria-label="Stop">■</button>
          </BorderBeam>
        </div>
        <div>
          <BorderBeam size="line" colorVariant="colorful">
            <label className="beam-search">⌕ <input placeholder="Search" /></label>
          </BorderBeam>
        </div>
      </div>
    </div>
  );
}

function MetalFxDemo() {
  return (
    <div className="showcase showcase-metal">
      <ShowcaseHead title="Liquid metal" subtitle="Animated liquid metal border component" />
      <div className="metal-compose">
        <span className="metal-placeholder">Build anything...</span>
        <button className="metal-round" aria-label="Add">+</button>
        <span className="metal-chip">Agent⌄</span>
        <span className="metal-chip">Auto⌄</span>
        <MetalFx variant="circle" preset="chromatic" theme="dark">
          <button className="metal-send" aria-label="Send">↑</button>
        </MetalFx>
      </div>
      <div className="metal-toolbar">
        <label className="metal-search">⌕ <input placeholder="Search" /></label>
        <MetalFx variant="button" preset="chromatic" theme="dark">
          <button className="metal-upgrade">Upgrade to Pro</button>
        </MetalFx>
        <button className="metal-more" aria-label="More">•••</button>
      </div>
    </div>
  );
}

const ORBS = [
  ["solving", "Solving....", 64],
  ["composing", "Thinking....", 64],
  ["listening", "Agent listening...", 20],
  ["working", "Working....", 64],
  ["searching", "Searching....", 64],
] as const;

function ThinkingOrbsDemo() {
  return (
    <div className="showcase showcase-orbs">
      <ShowcaseHead title="Thinking orbs" subtitle="Animated thinking orb component" />
      <div className="orb-grid">
        {ORBS.map(([state, label, size]) => (
          <div className="orb-cell" key={state}>
            <span className={size === 20 ? "orb-pill orb-pill-small" : "orb-pill"}>
              <ThinkingOrb state={state} size={size} theme="dark" />
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HoverVideoDemo() {
  return (
    <div className="showcase showcase-hover-video">
      <p>Hover to reveal</p>
      <HoverVideoButton label="Everything amo" video="/vault/amo" width={320} variant="light" />
    </div>
  );
}

function ShowcaseHead({ title, subtitle }: { title: string; subtitle: string }) {
  return <header className="showcase-head"><i aria-hidden="true" /><h1>{title}</h1><p>{subtitle}</p></header>;
}

export const DEMO_COMPONENTS: Record<string, Demo> = {
  "animation/border-beam": BorderBeamDemo,
  "animation/hover-video-button": HoverVideoDemo,
  "animation/metal-fx": MetalFxDemo,
  "animation/thinking-orbs": ThinkingOrbsDemo,
};

const bars = (
  <div className="demo-bars">
    <i /><i /><i />
  </div>
);

const menuIcon = (close = false) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    {close ? (
      <><path d="M6 6l12 12" /><path d="M18 6L6 18" /></>
    ) : (
      <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>
    )}
  </svg>
);

const avatar = (initials: string, bg: string): ReactNode => (
  <span
    style={{
      display: "grid",
      placeItems: "center",
      width: 36,
      height: 36,
      borderRadius: "50%",
      background: bg,
      color: "#fff",
      fontSize: 13,
      fontWeight: 600,
    }}
  >
    {initials}
  </span>
);

export const DEMO_PROPS: Record<string, Record<string, unknown>> = {
  "animation/transitions/accordion": {
    title: "Appearance",
    children: bars,
  },
  "animation/transitions/avatar-group-hover": {
    items: [
      avatar("AM", "#7aa2ff"),
      avatar("VK", "#c084fc"),
      avatar("JD", "#f472b6"),
      avatar("RS", "#34d399"),
    ],
  },
  "animation/transitions/tabs-sliding": {
    tabs: ["Plan", "Debug", "Ask"],
  },
  "animation/transitions/tooltip": {
    id: "demo-tooltip",
    content: "Copied to clipboard",
    children: (p: Record<string, unknown>) => <button {...p}>Hover me</button>,
  },
  "animation/transitions/modal": {
    children: bars,
  },
  "animation/transitions/shimmer-text": {
    children: "Planning next moves",
  },
  "animation/transitions/card-tilt": {
    children: (
      <div className="demo-credit-card">
        <span>Credit</span><strong>VISA</strong><b>John Smith</b><code>4111 - 1111 - 1111 - 1111</code>
      </div>
    ),
  },
  "animation/transitions/error-state-shake": {
    children: <input defaultValue="John" aria-label="Name" />,
    message: "Please enter a valid email.",
  },
  "animation/transitions/icon-swap": {
    iconA: menuIcon(),
    iconB: menuIcon(true),
  },
  "animation/transitions/notification-badge": {
    children: (
      <svg className="demo-bell" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
      </svg>
    ),
  },
  "animation/transitions/panel-reveal": {
    children: bars,
  },
  "animation/transitions/plus-menu-morph": {
    children: bars,
  },
  "animation/transitions/skeleton-reveal": {
    skeleton: <div className="demo-user demo-user-skeleton"><i /><span>{bars}</span></div>,
    children: <div className="demo-user"><b>JC</b><span><strong>Jane Cooper</strong><small>jane@example.com</small></span></div>,
  },
  "animation/transitions/success-check": {
    children: (
      <svg className="demo-success" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="24" />
        <path d="m17.3 25 4.5 4.8 9-9.6" />
      </svg>
    ),
  },
  "animation/transitions/texts-reveal": {
    primary: "Pull request opened",
    secondary: "Review requested from 3 teammates",
  },
};
