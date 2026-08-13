import { useEffect, useState } from "react";
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
  const [variant, setVariant] = useState(entry.variants?.[0] ?? "default");
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
          {entry.bundled && <button data-on={view === "live"} onClick={() => setView("live")}>live</button>}
          {entry.preview && <button data-on={view === "reference"} onClick={() => setView("reference")}>reference</button>}
          {WIDTHS.map((w) => (
            <button key={w.label} data-on={width === w.value} onClick={() => setWidth(w.value)}>
              {w.label}
            </button>
          ))}
          {(entry.variants?.length ?? 0) > 1 && (
            <select value={variant} onChange={(event) => setVariant(event.target.value)} aria-label="Animation variant">
              {entry.variants!.map((name) => <option key={name}>{name}</option>)}
            </select>
          )}
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
        ) : entry.bundled ? (
          <iframe
            className="detail-frame"
            style={width ? { width, margin: "0 auto" } : undefined}
            src={previewUrl(entry.id, variant)}
            title={entry.id}
          />
        ) : (
          <div className="card-blank">Interactive preview will arrive with the next viewer deployment.</div>
        )}
      </div>

      {entry.useWhen && (
        <section className="panel">
          <h2>Use when</h2>
          <p>{entry.useWhen}</p>
        </section>
      )}

      {entry.installation && (
        <section className="panel">
          <h2>Install</h2>
          {entry.installation.command && <><p className="sub">Preferred shadcn install</p><pre className="doc">{entry.installation.command}</pre><button onClick={() => navigator.clipboard.writeText(entry.installation!.command!)}>Copy command</button></>}
          {entry.installation.fallbackPath && <p>Local source fallback: <code>{entry.installation.fallbackPath}</code></p>}
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
          <SourceCode file={entry.files.find((f) => f.path === open)} />
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

function SourceCode({ file }: { file?: { code?: string; load?: () => Promise<string> } }) {
  const [code, setCode] = useState(file?.code ?? "loading…");
  useEffect(() => {
    let alive = true;
    setCode(file?.code ?? "loading…");
    file?.load?.().then((value) => alive && setCode(value)).catch((error) => alive && setCode(String(error)));
    return () => { alive = false; };
  }, [file]);
  return <pre className="code">{code}</pre>;
}
