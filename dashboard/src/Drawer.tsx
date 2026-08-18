/**
 * Detail as a side panel rather than a page swap, so the result list keeps its
 * scroll position and the browse loop is not restarted on every inspection.
 *
 * Adapted from `ui/overlay/drawer` (side panel that keeps its place, Escape and
 * outside dismiss), `ui/navigation/tabs` (one indicator shared across tabs),
 * `ui/code/code-block` (filename + language header over the source surface) and
 * `ui/action-feedback/copy-button` (width-locked label that ticks and reverts
 * after 2s).
 */
import { useEffect, useRef, useState } from "react";
import type { Entry } from "./registry";
import { previewUrl } from "./live";
import { CloseGlyph } from "./Sidebar";

const TABS = ["preview", "files", "docs"] as const;
type Tab = (typeof TABS)[number];

const WIDTHS = [
  { label: "360", value: 360 },
  { label: "768", value: 768 },
  { label: "full", value: 0 },
];

export function Drawer({ entry, onClose }: { entry: Entry; onClose: () => void }) {
  const [tab, setTab] = useState<Tab>("preview");
  const [width, setWidth] = useState(0);
  const [shot, setShot] = useState(!entry.bundled && Boolean(entry.preview));
  const [variant, setVariant] = useState(entry.variants?.[0] ?? "default");
  const [file, setFile] = useState(entry.files[0]?.path ?? null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setTab("preview");
    setShot(!entry.bundled && Boolean(entry.preview));
    setVariant(entry.variants?.[0] ?? "default");
    setFile(entry.files[0]?.path ?? null);
    closeRef.current?.focus({ preventScroll: true });
  }, [entry.id]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusable = panel.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, iframe, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, [onClose]);

  const status = entry.status;

  return (
    <div className="drawer-layer" onClick={(event) => event.target === event.currentTarget && onClose()}>
      <div className="scrim drawer-scrim" aria-hidden />
      <aside ref={panelRef} className="drawer" role="dialog" aria-modal="true" aria-label={entry.title}>
        <header className="drawer-head">
          <div className="drawer-heading">
            <h2>{entry.title}</h2>
            <p className="drawer-id">
              <code>{entry.id}</code>
            </p>
          </div>
          <button ref={closeRef} className="icon-btn" onClick={onClose} aria-label="Close details">
            <CloseGlyph />
          </button>
        </header>

        <div className="drawer-meta">
          <span className="tag">{entry.source}</span>
          {entry.framework && <span className="tag">{entry.framework}</span>}
          {entry.roles.map((role) => (
            <span key={role} className="tag" data-role={role}>
              {role}
            </span>
          ))}
          <span className="tag">{entry.evidence}</span>
          {entry.availability === "personal-cache" && (
            <span className="tag warn" title="Local-only: never copied into a public repository">
              local only
            </span>
          )}
          {status !== "ok" && (
            <span className="tag warn" title={entry.statusReason}>
              {status === "broken" ? "needs shim" : "shim"}
            </span>
          )}
        </div>

        <nav className="tabs" role="tablist" aria-label="Detail sections">
          {TABS.map((name) => (
            <button
              key={name}
              role="tab"
              aria-selected={tab === name}
              data-on={tab === name}
              className="tab"
              onClick={() => setTab(name)}
            >
              {name}
              {name === "files" && <span className="count">{entry.files.length}</span>}
            </button>
          ))}
        </nav>

        <div className="drawer-body">
          {tab === "preview" && (
            <>
              <div className="drawer-controls">
                {entry.preview && (
                  <button className="pill" data-on={shot} onClick={() => setShot(!shot)}>
                    source capture
                  </button>
                )}
                {WIDTHS.map((option) => (
                  <button
                    key={option.label}
                    className="pill"
                    data-on={width === option.value}
                    onClick={() => setWidth(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
                {(entry.variants?.length ?? 0) > 1 && (
                  <select value={variant} onChange={(event) => setVariant(event.target.value)} aria-label="Animation variant">
                    {entry.variants!.map((name) => (
                      <option key={name}>{name}</option>
                    ))}
                  </select>
                )}
              </div>
              <div className="drawer-stage">
                {shot && entry.preview ? (
                  <img src={entry.preview} alt={`${entry.title} source capture`} />
                ) : entry.bundled ? (
                  <iframe
                    key={`${entry.id}-${variant}`}
                    style={width ? { width, margin: "0 auto" } : undefined}
                    src={previewUrl(entry.id, variant)}
                    title={entry.id}
                  />
                ) : (
                  <p className="muted">
                    This reference arrived after the last viewer deployment. Its metadata and source
                    are live; the interactive preview ships with the next one.
                  </p>
                )}
              </div>
            </>
          )}

          {tab === "files" && (
            <div className="files">
              <ul className="filelist">
                {entry.files.map((item) => (
                  <li key={item.path}>
                    <button data-on={file === item.path} onClick={() => setFile(item.path)}>
                      {item.path}
                    </button>
                  </li>
                ))}
                {entry.files.length === 0 && <li className="muted">No source files captured.</li>}
              </ul>
              <SourceCode file={entry.files.find((item) => item.path === file)} />
            </div>
          )}

          {tab === "docs" && (
            <div className="docs">
              {entry.useWhen && (
                <section>
                  <h3>Use when</h3>
                  <p>{entry.useWhen}</p>
                </section>
              )}
              <section>
                <h3>Take it</h3>
                {entry.installation?.command ? (
                  <>
                    <pre className="code">{entry.installation.command}</pre>
                    <Copy label="Copy install command" value={entry.installation.command} />
                  </>
                ) : (
                  <p className="muted">No registry install; copy the pinned source below.</p>
                )}
                <p className="path">
                  <code>{entry.installation?.fallbackPath ?? `${entry.dir.replace(/^\//, "")}/`}</code>
                </p>
                <Copy label="Copy reference id" value={entry.id} />
              </section>
              {entry.prompt && (
                <section>
                  <h3>Agent prompt</h3>
                  <p className="muted">
                    {Math.round(entry.prompt.length / 1000)} KB — the upstream payload with the full
                    source inline.
                  </p>
                  <Copy label="Copy PROMPT.md" value={entry.prompt} />
                </section>
              )}
              {entry.readme && (
                <section>
                  <h3>README</h3>
                  <pre className="doc">{entry.readme}</pre>
                </section>
              )}
              {entry.sourceDoc && (
                <section>
                  <h3>Provenance</h3>
                  <pre className="doc">{entry.sourceDoc}</pre>
                </section>
              )}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

function SourceCode({ file }: { file?: { path: string; code?: string; load?: () => Promise<string> } }) {
  const [code, setCode] = useState(file?.code ?? "");
  const [state, setState] = useState<"idle" | "loading" | "error">(file?.code ? "idle" : "loading");

  useEffect(() => {
    let alive = true;
    if (!file) return;
    if (file.code !== undefined) {
      setCode(file.code);
      setState("idle");
      return;
    }
    setState("loading");
    file.load?.().then(
      (value) => {
        if (!alive) return;
        setCode(value);
        setState("idle");
      },
      (error) => {
        if (!alive) return;
        setCode(String(error));
        setState("error");
      },
    );
    return () => {
      alive = false;
    };
  }, [file?.path]);

  if (!file) return <pre className="code muted">Select a file.</pre>;
  return (
    <div className="codepane">
      <header>
        <span>{file.path}</span>
        {state === "idle" && <Copy label="Copy" value={code} compact />}
      </header>
      {state === "loading" ? (
        <div className="skeleton" aria-label="Loading source">
          {Array.from({ length: 8 }, (_, index) => (
            <span key={index} style={{ width: `${40 + ((index * 37) % 55)}%` }} />
          ))}
        </div>
      ) : (
        <pre className="code" data-error={state === "error" || undefined}>
          {code}
        </pre>
      )}
    </div>
  );
}

function Copy({ label, value, compact }: { label: string; value: string; compact?: boolean }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!done) return;
    const id = setTimeout(() => setDone(false), 2000);
    return () => clearTimeout(id);
  }, [done]);

  return (
    <button
      className={compact ? "pill" : "btn"}
      // The width is locked to the longest state so the tick never reflows the row.
      style={{ minWidth: `${Math.max(label.length, 7) * 0.55}em` }}
      onClick={() => {
        navigator.clipboard.writeText(value).then(
          () => setDone(true),
          () => undefined,
        );
      }}
    >
      {done ? "Copied ✓" : label}
    </button>
  );
}
