/**
 * Left rail: mode switch, quick search, and the grouped facet the current mode
 * navigates by (category for components, upstream source for icons).
 *
 * Adapted from `ui/navigation/sidebar-nav/reference.tsx` — the workspace row,
 * the `/`-hinted quick search, section captions, per-item counts and the single
 * hover/active box that travels between rows are preserved. That reference's
 * own `preview.png` is a captured 404 page, so only its source informed this.
 */
import { useLayoutEffect, useRef, useState } from "react";
import type { Mode } from "./view";

export interface Facet {
  key: string;
  label: string;
  count: number;
}

interface Props {
  mode: Mode;
  onMode: (mode: Mode) => void;
  total: Record<Mode, number>;
  groups: Facet[];
  group: string;
  onGroup: (key: string) => void;
  groupLabel: string;
  query: string;
  onQuery: (value: string) => void;
  searchRef: React.RefObject<HTMLInputElement | null>;
  onOpenPalette: () => void;
}

export function Sidebar({
  mode,
  onMode,
  total,
  groups,
  group,
  onGroup,
  groupLabel,
  query,
  onQuery,
  searchRef,
  onOpenPalette,
}: Props) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [box, setBox] = useState<{ top: number; height: number } | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useLayoutEffect(() => {
    const container = navRef.current;
    const target = itemRefs.current[hovered ?? group];
    if (!container || !target) return setBox(null);
    const containerRect = container.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    setBox({ top: targetRect.top - containerRect.top, height: targetRect.height });
  }, [hovered, group, groups]);

  return (
    <aside className="rail">
      <div className="rail-brand">
        <span className="rail-mark">UI</span>
        <span className="rail-title">
          <span className="rail-name">Reference Bank</span>
          <span className="rail-sub">{total.components + total.icons} references</span>
        </span>
      </div>

      <div className="modes" role="tablist" aria-label="Reference mode">
        {(["components", "icons"] as Mode[]).map((value) => (
          <button
            key={value}
            role="tab"
            aria-selected={mode === value}
            data-on={mode === value}
            className="mode"
            onClick={() => onMode(value)}
          >
            {value === "components" ? "Components" : "Icons"}
            <span className="count">{total[value]}</span>
          </button>
        ))}
      </div>

      <label className="quick">
        <SearchGlyph />
        <input
          ref={searchRef}
          value={query}
          onChange={(event) => onQuery(event.target.value)}
          placeholder="Filter this list"
          aria-label="Filter the current list"
        />
        {query ? (
          <button className="quick-clear" aria-label="Clear filter" onClick={() => onQuery("")}>
            <CloseGlyph />
          </button>
        ) : (
          <kbd>/</kbd>
        )}
      </label>

      <button className="rail-action" onClick={onOpenPalette}>
        <span>Search all references</span>
        <kbd>⌘K</kbd>
      </button>

      <div className="rail-scroll">
        <div className="rail-caption">{groupLabel}</div>
        <div ref={navRef} className="rail-nav" onMouseLeave={() => setHovered(null)}>
          <span
            aria-hidden
            className="rail-box"
            style={{
              top: box?.top ?? 0,
              height: box?.height ?? 0,
              opacity: box ? 1 : 0,
            }}
          />
          {groups.map((item) => {
            const active = item.key === group;
            return (
              <button
                key={item.key}
                ref={(element) => {
                  itemRefs.current[item.key] = element;
                }}
                className="rail-item"
                data-on={active}
                aria-current={active ? "page" : undefined}
                onMouseEnter={() => setHovered(item.key)}
                onFocus={() => setHovered(item.key)}
                onBlur={() => setHovered(null)}
                onClick={() => onGroup(item.key)}
              >
                <span className="rail-label">{item.label}</span>
                <span className="count">{item.count}</span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

export function SearchGlyph() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  );
}

export function CloseGlyph() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}
