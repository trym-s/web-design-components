/**
 * Bank-only harness: mounts Audio UI demos in the docs' default style (Base UI + Nova, `.style-nova`).
 * Not part of the snapshot.
 */
import { Component, useState, type ComponentType, type ReactNode } from "react";
import { AudioDemoProvider } from "./components/audio-demo-provider";
import "./styles.css";

export type Example = { name: string; title: string; component: ComponentType };

class Guard extends Component<{ children: ReactNode }, { error?: string }> {
  state: { error?: string } = {};
  static getDerivedStateFromError(e: Error) { return { error: e.message }; }
  render() { return this.state.error ? <pre data-bank-error style={{ color: "crimson", whiteSpace: "pre-wrap" }}>{this.state.error}</pre> : this.props.children; }
}

/** `tracks`: seed the audio store with the docs' demo tracks, as the docs do for player, queue, track and playback-speed. */
const body = (Example: ComponentType | undefined, current: number) => <Guard key={current}>{Example ? <Example /> : null}</Guard>;

export function AudioFrame({ examples, tracks = false }: { examples: Example[]; tracks?: boolean }) {
  const pinned = new URLSearchParams(location.search).get("example");
  const [current, setCurrent] = useState(() => Math.max(0, examples.findIndex((e) => e.name === pinned)));
  const Example = examples[current]?.component;
  // The capture tool enumerates examples through this list.
  (window as any).__bankExamples = examples.map((e) => e.name);
  return (
    <div data-bank-frame className="style-nova bg-background text-foreground font-sans antialiased" style={{ width: "100%", minHeight: "100vh", boxSizing: "border-box", padding: 24 }}>
      {examples.length > 1 && !pinned && (
        <select aria-label="Example" value={current} onChange={(e) => setCurrent(Number(e.target.value))} style={{ margin: "0 0 16px", font: "inherit" }}>
          {examples.map((e, i) => <option key={e.name} value={i}>{e.title}</option>)}
        </select>
      )}
      <div data-bank-example={examples[current]?.name} className="flex min-h-[320px] w-full items-center justify-center rounded-xl border p-6">
        {tracks ? <AudioDemoProvider>{body(Example, current)}</AudioDemoProvider> : body(Example, current)}
      </div>
    </div>
  );
}
