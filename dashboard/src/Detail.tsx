import { useState } from "react";
import { previewUrl, useReported } from "./live";
import type { Entry } from "./registry";

const WIDTHS = [
  { label: "360", value: 360 },
  { label: "768", value: 768 },
  { label: "full", value: 0 },
];

export function Detail({ entry }: { entry: Entry }) {
  const [width, setWidth] = useState(0);
  const [view, setView] = useState<"live" | "reference">("live");
  const [open, setOpen] = useState<string | null>(entry.files[0]?.path ?? null);
  const reported = useReported(entry.id);
  const status = reported?.status === "broken" ? "broken" : entry.status;
  const reason = reported?.reason ?? entry.statusReason;

  return (
    <div className="shell detail">
      <header className="topbar">
        <div>
          <a className="back" href="#/">
            ← all references
          </a>
          <h1>{entry.title}</h1>
          <p className="sub">
            <code>{entry.dir}</code> · {entry.source}
            {entry.nature ? ` · ${entry.nature}` : ""}
            {entry.medium ? ` · ${entry.medium}` : ""}
            {` · ${entry.evidence} evidence · ${entry.roles.join(" / ")}`}
          </p>
        </div>
        <div className="widths">
          <button data-on={view === "live"} onClick={() => setView("live")}>live</button>
          {entry.preview && <button data-on={view === "reference"} onClick={() => setView("reference")}>reference</button>}
          {WIDTHS.map((w) => (
            <button key={w.label} data-on={width === w.value} onClick={() => setWidth(w.value)}>
              {w.label}
            </button>
          ))}
        </div>
      </header>

      {status !== "ok" && (
        <p className="banner">
          <strong>{status === "broken" ? "needs shim" : "shim"}</strong> {reason}
        </p>
      )}

      <div className="detail-stage">
        {view === "reference" && entry.preview ? (
          <a className="detail-shot-link" href={entry.preview} target="_blank" rel="noreferrer" title="Open full-size source capture">
            <img className="detail-shot" src={entry.preview} alt={`${entry.title} source capture`} />
          </a>
        ) : (
          <iframe
            className="detail-frame"
            style={width ? { width, margin: "0 auto" } : undefined}
            src={previewUrl(entry.id)}
            title={entry.id}
          />
        )}
      </div>

      {entry.useWhen && (
        <section className="panel">
          <h2>Use when</h2>
          <p>{entry.useWhen}</p>
        </section>
      )}

      {entry.prompt && (
        <section className="panel">
          <h2>Agent prompt</h2>
          <p className="sub">
            {Math.round(entry.prompt.length / 1000)} KB — upstream “Copy prompt” payload with the
            full source inline.
          </p>
          <button onClick={() => navigator.clipboard.writeText(entry.prompt!)}>
            Copy PROMPT.md
          </button>
        </section>
      )}

      <section className="panel">
        <h2>Files</h2>
        <div className="files">
          <ul className="filelist">
            {entry.files.map((f) => (
              <li key={f.path}>
                <button data-on={open === f.path} onClick={() => setOpen(f.path)}>
                  {f.path}
                </button>
              </li>
            ))}
          </ul>
          <pre className="code">{entry.files.find((f) => f.path === open)?.code}</pre>
        </div>
      </section>

      {entry.readme && (
        <section className="panel">
          <h2>README</h2>
          <pre className="doc">{entry.readme}</pre>
        </section>
      )}

      {entry.sourceDoc && (
        <section className="panel">
          <h2>Provenance</h2>
          <pre className="doc">{entry.sourceDoc}</pre>
        </section>
      )}
    </div>
  );
}
