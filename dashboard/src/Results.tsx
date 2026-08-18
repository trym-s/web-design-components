/**
 * The result surface: chip row, grid, progressive reveal, empty state.
 *
 * Chips are adapted from `ui/data-display/filter-table` (counted, horizontally
 * scrollable, `aria-pressed`); the reveal is adapted from `ui/async/load-more`;
 * the empty block is adapted from `ui/search/search-list`.
 */
import type { Entry } from "./registry";
import type { Chip, Mode } from "./view";
import { ALL } from "./view";
import { usePagedList } from "./useLoadMore";
import { IconTile } from "./IconTile";
import { previewUrl, useReported } from "./live";
import { SearchGlyph } from "./Sidebar";

const PAGE = { components: 24, icons: 90 } as const;

interface Props {
  mode: Mode;
  entries: Entry[];
  sources: Chip[];
  source: string;
  onSource: (key: string) => void;
  chips: Chip[];
  chip: string;
  onChip: (key: string) => void;
  resetKey: string;
  onOpen: (id: string) => void;
  live: string[];
  onPlay: (id: string) => void;
  onStop: (id: string) => void;
  onClear: () => void;
}

export function Results({
  mode,
  entries,
  sources,
  source,
  onSource,
  chips,
  chip,
  onChip,
  resetKey,
  onOpen,
  live,
  onPlay,
  onStop,
  onClear,
}: Props) {
  const { shown, hasMore, paused, sentinelRef, load, total } = usePagedList(
    entries,
    PAGE[mode],
    resetKey,
  );

  return (
    <div className="results">
      {mode === "components" && (
        <div className="chips" role="group" aria-label="Source">
          {sources.map((item) => (
            <button
              key={item.key}
              className="chip"
              aria-pressed={source === item.key}
              data-on={source === item.key}
              onClick={() => onSource(source === item.key && item.key !== ALL ? ALL : item.key)}
            >
              {item.label}
              <span className="count">{item.count}</span>
            </button>
          ))}
        </div>
      )}
      <div className="chips" role="group" aria-label={mode === "icons" ? "Framework" : "Role"}>
        {chips.map((item) => {
          const active = chip === item.key;
          return (
            <button
              key={item.key}
              className="chip"
              data-tone={item.tone}
              aria-pressed={active}
              data-on={active}
              onClick={() => onChip(active && item.key !== ALL ? ALL : item.key)}
            >
              {item.tone && <span className="dot" aria-hidden />}
              {item.label}
              <span className="count">{item.count}</span>
            </button>
          );
        })}
      </div>

      {total === 0 ? (
        <div className="empty">
          <span className="empty-mark">
            <SearchGlyph />
          </span>
          <strong>No reference matches</strong>
          <span>Adjust the filter or clear it to see the full set.</span>
          <button className="btn" onClick={onClear}>
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <div className={mode === "icons" ? "grid grid-icons" : "grid grid-cards"}>
            {shown.map((entry) =>
              mode === "icons" ? (
                <IconTile key={entry.id} entry={entry} onOpen={() => onOpen(entry.id)} />
              ) : (
                <ComponentCard
                  key={entry.id}
                  entry={entry}
                  live={live.includes(entry.id)}
                  onPlay={() => onPlay(entry.id)}
                  onStop={() => onStop(entry.id)}
                  onOpen={() => onOpen(entry.id)}
                />
              ),
            )}
          </div>

          <div ref={sentinelRef} className="sentinel">
            {hasMore ? (
              paused ? (
                <button className="btn" onClick={load}>
                  Load more — {shown.length} of {total}
                </button>
              ) : (
                <span className="muted">Loading {shown.length} of {total}…</span>
              )
            ) : (
              <span className="muted">All {total} shown</span>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function ComponentCard({
  entry,
  live,
  onPlay,
  onStop,
  onOpen,
}: {
  entry: Entry;
  live: boolean;
  onPlay: () => void;
  onStop: () => void;
  onOpen: () => void;
}) {
  const reported = useReported(entry.id);
  const status = reported?.status === "broken" ? "broken" : entry.status;
  const reason = reported?.reason ?? entry.statusReason;

  return (
    <article className="card" data-status={status}>
      <div className="card-stage">
        {live && entry.bundled ? (
          <iframe className="card-frame" src={previewUrl(entry.id)} title={entry.id} />
        ) : entry.preview ? (
          <img className="card-shot" src={entry.preview} alt="" loading="lazy" />
        ) : (
          <span className="card-blank">{entry.medium ?? entry.source}</span>
        )}
        {entry.bundled && (
          // With no capture behind it the stage is otherwise a dead grey box, so
          // the only thing that fills it stays visible instead of waiting for hover.
          <button className="card-play" data-bare={!entry.preview || undefined} onClick={live ? onStop : onPlay}>
            {live ? "Stop" : "Play"}
          </button>
        )}
      </div>

      <button className="card-body" onClick={onOpen}>
        <span className="card-title">
          {entry.title}
          {status !== "ok" && (
            <span className="tag warn" title={reason}>
              {status === "broken" ? "needs shim" : "shim"}
            </span>
          )}
        </span>
        <span className="card-use">{entry.useWhen || "No “Use when” line"}</span>
        <span className="card-tags">
          <span className="tag">{entry.source}</span>
          {entry.roles.map((role) => (
            <span key={role} className="tag" data-role={role}>
              {role}
            </span>
          ))}
          <span className="tag" title={`Agent selection evidence: ${entry.evidence}`}>
            {entry.evidence}
          </span>
        </span>
      </button>
    </article>
  );
}
