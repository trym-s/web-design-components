/**
 * Sentinel-driven progressive reveal.
 *
 * Adapted from `ui/async/load-more/src/load-more.tsx`. The behaviour that
 * matters here is preserved: an IntersectionObserver sentinel that fires ahead
 * of the viewport edge, and a `maxAutoLoads` ceiling that pauses the run and
 * hands control back to an explicit button so an endless list cannot scroll the
 * user into an unbounded DOM. The upstream async/error phases are dropped —
 * this list grows from an in-memory array, so a page can never fail to load.
 */
import { useCallback, useEffect, useRef, useState } from "react";

export function useLoadMore({
  onLoad,
  hasMore,
  rootMargin = "600px 0px",
  maxAutoLoads = 3,
}: {
  onLoad: () => void;
  hasMore: boolean;
  rootMargin?: string;
  maxAutoLoads?: number;
}) {
  const [paused, setPaused] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const runs = useRef(0);

  const fetchMore = useRef(onLoad);
  fetchMore.current = onLoad;
  const more = useRef(hasMore);
  more.current = hasMore;

  const load = useCallback(() => {
    runs.current = 0;
    setPaused(false);
    if (more.current) fetchMore.current();
  }, []);

  useEffect(() => {
    const element = sentinelRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting) || !more.current) return;
        if (runs.current >= maxAutoLoads) {
          setPaused(true);
          return;
        }
        runs.current += 1;
        fetchMore.current();
      },
      { rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin, maxAutoLoads]);

  return { paused, sentinelRef, load };
}

/** Resets the visible page count whenever the query behind the list changes. */
export function usePagedList<T>(items: T[], pageSize: number, resetKey: string) {
  const [pages, setPages] = useState(1);

  useEffect(() => {
    setPages(1);
  }, [resetKey]);

  const shown = items.slice(0, pages * pageSize);
  const hasMore = shown.length < items.length;
  const { paused, sentinelRef, load } = useLoadMore({
    onLoad: () => setPages((current) => current + 1),
    hasMore,
  });

  return { shown, hasMore, paused, sentinelRef, load, total: items.length };
}
