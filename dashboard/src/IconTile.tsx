/**
 * One icon in the dense grid.
 *
 * A tile stays inert until it scrolls into view, then mounts its own module —
 * React icon components and raw line-md SVGs render directly in the shell, so
 * hovering a tile plays the real upstream animation without an iframe. Vue,
 * Svelte and Lottie sets need their own runtime or the personal cache, so their
 * tiles say so and defer to the detail panel's iframe.
 */
import { useEffect, useRef, useState } from "react";
import type { Entry } from "./registry";
import { ErrorBoundary } from "./ErrorBoundary";
import { iconLoader, mountsInShell, pickIconComponent } from "./iconModules";

export function IconTile({ entry, onOpen }: { entry: Entry; onOpen: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || visible) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((item) => item.isIntersecting)) setVisible(true);
      },
      { rootMargin: "120px 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <button ref={ref} className="tile" onClick={onOpen} title={entry.id}>
      <span className="tile-stage">
        {visible && mountsInShell(entry) ? (
          <ErrorBoundary fallback={<span className="tile-fallback">!</span>}>
            <Glyph entry={entry} />
          </ErrorBoundary>
        ) : (
          <span className="tile-fallback" aria-hidden>
            {entry.framework?.slice(0, 2) ?? "?"}
          </span>
        )}
      </span>
      <span className="tile-name">{entry.name}</span>
      {entry.availability === "personal-cache" && <span className="tile-flag">local</span>}
    </button>
  );
}

function Glyph({ entry }: { entry: Entry }) {
  const [mod, setMod] = useState<Record<string, unknown> | string>();

  useEffect(() => {
    let alive = true;
    const loader = iconLoader(entry);
    if (!loader) return;
    Promise.resolve(loader())
      .then((value) => alive && setMod(value as Record<string, unknown> | string))
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, [entry.id]);

  if (!mod) return <span className="tile-fallback" aria-hidden />;
  if (entry.framework === "svg") {
    return <span className="tile-svg" dangerouslySetInnerHTML={{ __html: mod as string }} />;
  }

  const Component = pickIconComponent(mod as Record<string, unknown>) as any;
  if (!Component) return <span className="tile-fallback" aria-hidden />;
  // Only `size` is universal across the sets; every other prop these components
  // do not declare is spread onto their root div and React warns about it. They
  // drive their own hover animation from their own mouse handlers anyway.
  return <Component size={22} />;
}
