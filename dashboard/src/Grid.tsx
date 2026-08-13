import { useMemo, useState } from "react";
import { CATEGORIES, ENTRIES, NATURES, SOURCES } from "./registry";
import { MAX_LIVE, useLiveQueue } from "./live";
import { Card } from "./Card";

const ALL = "all";

export function Grid() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState(ALL);
  const [src, setSrc] = useState(ALL);
  const [nature, setNature] = useState(ALL);
  const { live, play, stop } = useLiveQueue();

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return ENTRIES.filter(
      (e) =>
        (cat === ALL || e.category === cat) &&
        (src === ALL || e.source === src) &&
        (nature === ALL || e.nature === nature) &&
        (!needle ||
          e.id.toLowerCase().includes(needle) ||
          e.useWhen.toLowerCase().includes(needle)),
    );
  }, [q, cat, src, nature]);

  const groups = useMemo(() => {
    const m = new Map<string, typeof shown>();
    for (const e of shown) m.set(e.category, [...(m.get(e.category) ?? []), e]);
    return [...m.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [shown]);

  return (
    <div className="shell">
      <header className="topbar">
        <div>
          <h1>UI Reference Bank</h1>
          <p className="sub">
            {ENTRIES.length} references · {shown.length} shown · previews render one per
            iframe, {MAX_LIVE} live at a time
          </p>
        </div>
        <input
          className="search"
          placeholder="search name or “Use when”…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </header>

      <div className="filters">
        <Filter label="category" value={cat} set={setCat} options={CATEGORIES} />
        <Filter label="source" value={src} set={setSrc} options={SOURCES} />
        {NATURES.length > 0 && (
          <Filter label="nature" value={nature} set={setNature} options={NATURES} />
        )}
      </div>

      {groups.map(([category, items]) => (
        <section key={category} className="group">
          <h2>
            {category} <span>{items.length}</span>
          </h2>
          <div className="grid">
            {items.map((e) => (
              <Card
                key={e.id}
                entry={e}
                live={live.includes(e.id)}
                onPlay={() => play(e.id)}
                onStop={() => stop(e.id)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function Filter({
  label,
  value,
  set,
  options,
}: {
  label: string;
  value: string;
  set: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="filter">
      <span>{label}</span>
      <select value={value} onChange={(e) => set(e.target.value)}>
        <option value={ALL}>all</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
