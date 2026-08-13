/**
 * Workspace shell: rail → chips → grid → drawer.
 *
 * The bank is ~4000 references, 97% of them icons, so the whole design goal is
 * elimination speed: three narrowing devices (rail facet, chip axis, text) plus
 * ⌘K over everything, and detail in a drawer so narrowing survives inspection.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { BY_ID, CATEGORIES, ENTRIES } from "./registry";
import { useLiveQueue } from "./live";
import { Sidebar } from "./Sidebar";
import { Results } from "./Results";
import { Drawer } from "./Drawer";
import { Palette } from "./Palette";
import { ALL, label, useCatalogView, useCommands, type Mode } from "./view";

const THEME_KEY = "ui-bank-theme";

function useHashEntry() {
  const [hash, setHash] = useState(() => location.hash);
  useEffect(() => {
    const on = () => setHash(location.hash);
    addEventListener("hashchange", on);
    return () => removeEventListener("hashchange", on);
  }, []);
  const match = hash.match(/^#\/c\/(.+)$/);
  return match ? BY_ID.get(decodeURIComponent(match[1])) : undefined;
}

function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) ?? "dark");
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);
  return [theme, () => setTheme(theme === "dark" ? "light" : "dark")] as const;
}

export function App() {
  const entry = useHashEntry();
  const [theme, toggleTheme] = useTheme();
  const [mode, setMode] = useState<Mode>(() => (CATEGORIES.length > 1 ? "components" : "icons"));
  const [group, setGroup] = useState(ALL);
  const [chip, setChip] = useState(ALL);
  const [text, setText] = useState("");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [railOpen, setRailOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const { live, play, stop } = useLiveQueue();

  const view = useCatalogView(ENTRIES, { mode, group, chip, text });
  const commands = useCommands(ENTRIES);

  const totals = useMemo(() => {
    const icons = ENTRIES.filter((item) => item.category === "icons").length;
    return { icons, components: ENTRIES.length - icons };
  }, []);

  const open = (id: string) => {
    location.hash = `#/c/${encodeURIComponent(id)}`;
    setRailOpen(false);
  };
  const close = () => {
    history.replaceState(null, "", location.pathname + location.search);
    dispatchEvent(new HashChangeEvent("hashchange"));
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const typing =
        event.target instanceof HTMLElement &&
        /^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName);
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen(true);
      } else if (event.key === "/" && !typing) {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    addEventListener("keydown", onKeyDown);
    return () => removeEventListener("keydown", onKeyDown);
  }, []);

  const switchMode = (next: Mode) => {
    setMode(next);
    setGroup(ALL);
    setChip(ALL);
  };

  const clearAll = () => {
    setGroup(ALL);
    setChip(ALL);
    setText("");
  };

  return (
    <div className="app" data-rail={railOpen || undefined}>
      <Sidebar
        mode={mode}
        onMode={switchMode}
        total={totals}
        groups={view.groups}
        group={group}
        onGroup={(key) => {
          setGroup(key);
          setChip(ALL);
          setRailOpen(false);
        }}
        groupLabel={mode === "icons" ? "Icon sets" : "Categories"}
        query={text}
        onQuery={setText}
        searchRef={searchRef}
        onOpenPalette={() => setPaletteOpen(true)}
      />

      <main className="main">
        <header className="topbar">
          <button className="icon-btn rail-toggle" onClick={() => setRailOpen(!railOpen)} aria-label="Toggle navigation">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <p className="crumb">
            <span>{mode === "icons" ? "Icons" : "Components"}</span>
            {group !== ALL && <span>{label(group)}</span>}
            <span className="muted">{view.results.length} of {view.poolSize}</span>
          </p>
          <div className="topbar-actions">
            <button className="pill" onClick={() => setPaletteOpen(true)}>
              Search <kbd>⌘K</kbd>
            </button>
            <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle colour scheme">
              {theme === "dark" ? "☾" : "☀"}
            </button>
          </div>
        </header>

        <Results
          mode={mode}
          entries={view.results}
          chips={view.chips}
          chip={chip}
          onChip={setChip}
          resetKey={`${mode}|${group}|${chip}|${text}`}
          onOpen={open}
          live={live}
          onPlay={play}
          onStop={stop}
          onClear={clearAll}
        />
      </main>

      {railOpen && <button className="rail-dismiss" aria-label="Close navigation" onClick={() => setRailOpen(false)} />}

      <Palette
        open={paletteOpen}
        items={commands}
        onSelect={(item) => {
          setPaletteOpen(false);
          open(item.id);
        }}
        onDismiss={() => setPaletteOpen(false)}
      />

      {entry && <Drawer entry={entry} onClose={close} />}
    </div>
  );
}
