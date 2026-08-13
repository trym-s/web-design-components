import { previewUrl, useReported } from "./live";
import type { Entry } from "./registry";

interface Props {
  entry: Entry;
  live: boolean;
  onPlay: () => void;
  onStop: () => void;
}

export function Card({ entry, live, onPlay, onStop }: Props) {
  const reported = useReported(entry.id);
  const status = reported?.status === "broken" ? "broken" : entry.status;
  const reason = reported?.reason ?? entry.statusReason;

  return (
    <article className="card" data-status={status}>
      <div className="card-stage">
        {live ? (
          <iframe className="card-frame" src={previewUrl(entry.id)} title={entry.id} />
        ) : entry.preview ? (
          <img className="card-shot" src={entry.preview} alt="" loading="lazy" />
        ) : (
          <div className="card-blank">
            <span>{entry.medium ?? entry.source}</span>
          </div>
        )}
      </div>

      <header className="card-head">
        <h3>{entry.title}</h3>
        <div className="card-actions">
          <button onClick={live ? onStop : onPlay}>{live ? "Stop" : "Play"}</button>
          <a href={`#/c/${encodeURIComponent(entry.id)}`}>Open</a>
        </div>
      </header>

      <p className="card-use">{entry.useWhen || <em>no “Use when” line</em>}</p>

      <footer className="card-tags">
        <span className="tag src">{entry.source}</span>
        <span className="tag">{entry.category}</span>
        {entry.nature && <span className="tag nature">{entry.nature}</span>}
        <span className="tag" title={`Agent selection evidence: ${entry.evidence}`}>{entry.evidence}</span>
        {entry.prompt && <span className="tag">prompt</span>}
        {status !== "ok" && (
          <span className="tag warn" title={reason}>
            {status === "broken" ? "needs shim" : "shim"}
          </span>
        )}
      </footer>
    </article>
  );
}
