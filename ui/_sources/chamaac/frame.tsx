/**
 * Bank-only harness: mounts Chamaac demos on the site's stylesheet, in a box the size of its preview
 * area (full-bleed backgrounds fill it). Not part of the snapshot.
 */
import { Component, type ComponentType, type ReactNode } from "react";
import "./styles.css";

export type Example = { name: string; title: string; component: ComponentType };

class Guard extends Component<{ children: ReactNode }, { error?: string }> {
  state: { error?: string } = {};
  static getDerivedStateFromError(e: Error) { return { error: e.message }; }
  render() { return this.state.error ? <pre data-bank-error style={{ color: "crimson", whiteSpace: "pre-wrap" }}>{this.state.error}</pre> : this.props.children; }
}

export function ChamaacFrame({ examples }: { examples: Example[] }) {
  const Example = examples[0].component;
  // The capture tool enumerates examples through this list.
  (window as any).__bankExamples = examples.map((e) => e.name);
  return (
    <div data-bank-frame className="bg-background text-foreground antialiased" style={{ width: "100%", minHeight: "100vh", boxSizing: "border-box", padding: 24 }}>
      <div data-bank-example={examples[0].name} className="relative flex min-h-[500px] w-full items-center justify-center overflow-hidden rounded-xl border border-border">
        <Guard><Example /></Guard>
      </div>
    </div>
  );
}
