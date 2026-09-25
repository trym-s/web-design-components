/**
 * Bank-only harness: mounts Better Auth UI shadcn/ui demos inside the docs site's own providers,
 * whose auth client answers every endpoint with demo data. Not part of the snapshot.
 */
import { Component, useState, type ComponentType, type ReactNode } from "react";
import { Providers } from "./app/components/demos/shadcn/providers";
import "./shadcn.css";

export type Example = { name: string; title: string; component: ComponentType };

class Guard extends Component<{ children: ReactNode }, { error?: string }> {
  state: { error?: string } = {};
  static getDerivedStateFromError(e: Error) { return { error: e.message }; }
  render() { return this.state.error ? <pre data-bank-error style={{ color: "crimson", whiteSpace: "pre-wrap" }}>{this.state.error}</pre> : this.props.children; }
}

export function BetterAuthFrame({ examples, bare = false }: { examples: Example[]; bare?: boolean }) {
  const pinned = new URLSearchParams(location.search).get("example");
  const [current, setCurrent] = useState(() => Math.max(0, examples.findIndex((e) => e.name === pinned)));
  const Example = examples[current]?.component;
  // The capture tool enumerates examples through this list.
  (window as any).__bankExamples = examples.map((e) => e.name);
  const body = <Guard key={current}>{Example ? <Example /> : null}</Guard>;
  return (
    <div data-bank-frame className="bg-background text-foreground font-sans antialiased" style={{ width: "100%", minHeight: "100vh", boxSizing: "border-box", padding: 24 }}>
      {examples.length > 1 && !pinned && (
        <select aria-label="Example" value={current} onChange={(e) => setCurrent(Number(e.target.value))} style={{ margin: "0 0 16px", font: "inherit" }}>
          {examples.map((e, i) => <option key={e.name} value={i}>{e.title}</option>)}
        </select>
      )}
      <div data-bank-example={examples[current]?.name} className="flex min-h-[350px] w-full items-center justify-center">
        {bare ? body : <Providers>{body}</Providers>}
      </div>
    </div>
  );
}
