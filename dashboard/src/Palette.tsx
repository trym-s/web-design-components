/**
 * ⌘K overlay over the whole bank.
 *
 * Adapted from `ui/overlay/command-palette`: the `combobox` + `listbox` pairing,
 * `aria-activedescendant`, the polite result-count announcement, scroll lock
 * with a gutter compensation, dismiss on outside pointer-up-after-down, and the
 * Escape capture are preserved. Motion's layout animation is replaced by CSS
 * transitions so the shell keeps no animation dependency.
 */
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useCommandPalette, type Command } from "./useCommandPalette";
import { SearchGlyph } from "./Sidebar";

interface Item extends Command {
  hint?: string;
}

export function Palette<T extends Item>({
  open,
  items,
  onSelect,
  onDismiss,
}: {
  open: boolean;
  items: T[];
  onSelect: (item: T) => void;
  onDismiss: () => void;
}) {
  const [host, setHost] = useState<HTMLElement | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const liveRef = useRef<HTMLSpanElement>(null);
  const downedOutside = useRef(false);

  const { query, setQuery, results, activeId, listRef, onKeyDown, pointerActivate, run } =
    useCommandPalette<T>({ items, onSelect, onDismiss });

  useEffect(() => setHost(document.body), []);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    inputRef.current?.focus({ preventScroll: true });
  }, [open, setQuery]);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const overflow = root.style.overflow;
    const padding = root.style.paddingRight;
    const gutter = window.innerWidth - root.clientWidth;
    root.style.overflow = "hidden";
    if (gutter > 0) root.style.paddingRight = `${gutter}px`;
    return () => {
      root.style.overflow = overflow;
      root.style.paddingRight = padding;
    };
  }, [open]);

  const count = results.length;
  useEffect(() => {
    const id = setTimeout(() => {
      if (!liveRef.current) return;
      liveRef.current.textContent =
        count === 0 ? "No reference matches" : `${count} ${count === 1 ? "reference" : "references"} available`;
    }, 400);
    return () => clearTimeout(id);
  }, [count]);

  if (!host || !open) return null;

  return createPortal(
    <div
      className="layer"
      onPointerDown={(event) => {
        downedOutside.current = !panelRef.current?.contains(event.target as Node);
      }}
      onClick={(event) => {
        if (panelRef.current?.contains(event.target as Node)) return;
        if (!downedOutside.current) return;
        downedOutside.current = false;
        onDismiss();
      }}
    >
      <div className="scrim" aria-hidden />
      <div ref={panelRef} className="palette" role="dialog" aria-modal="true" aria-label="Search references">
        <div className="palette-field">
          <SearchGlyph />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-label="Search references"
            aria-expanded
            aria-controls="palette-list"
            aria-autocomplete="list"
            aria-activedescendant={activeId ? `palette-${activeId}` : undefined}
            autoComplete="off"
            spellCheck={false}
            value={query}
            placeholder="Search every reference…"
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={onKeyDown}
          />
          <span className="palette-count">{count}</span>
        </div>

        <ul id="palette-list" ref={listRef} role="listbox" aria-label="References" onMouseDown={(e) => e.preventDefault()}>
          {results.map((item) => (
            <li
              key={item.id}
              id={`palette-${item.id}`}
              role="option"
              aria-selected={item.id === activeId}
              data-on={item.id === activeId}
              onPointerMove={(event) => pointerActivate(item.id, event)}
              onClick={() => run(item)}
            >
              <span className="palette-label">{item.label}</span>
              {item.hint && <span className="palette-hint">{item.hint}</span>}
              <span className="palette-id">{item.id}</span>
            </li>
          ))}
          {count === 0 && <li className="palette-empty">No reference matches</li>}
        </ul>

        <footer className="palette-foot">
          <span><kbd>↑</kbd><kbd>↓</kbd> move</span>
          <span><kbd>↵</kbd> open</span>
          <span><kbd>esc</kbd> close</span>
        </footer>
        <span ref={liveRef} role="status" aria-live="polite" className="sr-only" />
      </div>
    </div>,
    host,
  );
}
