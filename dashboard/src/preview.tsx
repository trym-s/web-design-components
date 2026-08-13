/**
 * Preview entry — one component per document.
 *
 * Every live component runs inside its own iframe pointed at this page, which is
 * what keeps the three incompatible CSS worlds (the captured Tailwind snapshot,
 * the transitions.dev `.t-*` sheets, the dashboard shell) from colliding, and
 * what makes stopping a card genuinely tear down its rAF loops.
 */
import { StrictMode, Suspense, useEffect, useState, type ComponentType } from "react";
import { createRoot } from "react-dom/client";
import { BY_ID } from "./registry";
import { ErrorBoundary } from "./ErrorBoundary";
import { DEMO_COMPONENTS, DEMO_PROPS } from "./demos";
import { IconPreview } from "./IconPreview";
import "./preview-base.css";

const id = new URLSearchParams(location.search).get("id") ?? "";
const entry = BY_ID.get(id);
const variant = new URLSearchParams(location.search).get("variant") ?? undefined;

function report(status: "ok" | "broken", reason?: string) {
  parent.postMessage({ type: "preview-status", id, status, reason }, "*");
}

function pickComponent(mod: Record<string, unknown>): ComponentType | null {
  if (typeof mod.default === "function") return mod.default as ComponentType;
  // transitions.dev entries use a single named export instead of a default.
  const named = Object.entries(mod).filter(
    ([k, v]) => typeof v === "function" && /^[A-Z]/.test(k),
  );
  return named.length ? (named[0][1] as ComponentType) : null;
}

function Preview() {
  const [Comp, setComp] = useState<ComponentType | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      if (!entry) return setErr(`Unknown id: ${id}`);
      if (entry.category === "icons") return;
      if (entry.cssProfile === "beautiful-ui") {
        document.documentElement.classList.add("dark");
        await import("/ui/_sources/beautiful-ui/styles.css");
        await import("./bu-fonts.css");
      }
      if (!entry.load) return setErr("No reference.tsx to mount.");
      try {
        const mod = await entry.load();
        const picked = pickComponent(mod);
        if (!picked) return setErr("Module exports no component.");
        if (alive) setComp(() => picked);
      } catch (e: any) {
        if (alive) setErr(e?.message ?? String(e));
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (err) report("broken", err);
    else if (Comp) report("ok");
  }, [err, Comp]);

  if (err) {
    return (
      <div className="pv-error">
        <strong>needs shim</strong>
        <pre>{err}</pre>
      </div>
    );
  }
  if (entry?.category === "icons") return <div className="pv-stage pv-icon"><IconPreview entry={entry} variant={variant} /></div>;
  if (!Comp) return <div className="pv-loading">loading…</div>;
  const Demo = DEMO_COMPONENTS[id];
  return (
    <div className={`pv-stage${id.startsWith("animation/transitions/") ? " pv-transition" : ""}${Demo ? " pv-showcase" : ""}`}>
      {Demo ? <Suspense fallback={<div className="pv-loading">loading…</div>}><Demo /></Suspense> : <Comp {...(DEMO_PROPS[id] ?? {})} />}
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary onError={(m) => report("broken", m)}>
      <Preview />
    </ErrorBoundary>
  </StrictMode>,
);
