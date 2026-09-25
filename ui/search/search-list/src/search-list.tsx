/**
 * Search list — Beautiful UI's command search (reference.tsx), styled with shadcn tokens.
 * Case-insensitive substring filter; empty query shows the first `suggestionCount` items.
 */
import { useState } from "react";
import { cn } from "./lib/utils";
import "./search-list.css";

export type SearchListProps = {
  items: string[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (query: string) => void;
  /** Called when a result is picked (the query also becomes that item). */
  onSelect?: (item: string) => void;
  placeholder?: string;
  suggestionCount?: number;
  emptyTitle?: string;
  emptyHint?: string;
  className?: string;
};

export function SearchList({
  items,
  value,
  defaultValue = "",
  onValueChange,
  onSelect,
  placeholder = "Search flavors…",
  suggestionCount = 5,
  emptyTitle = "No results found",
  emptyHint = "Adjust your search to try again",
  className,
}: SearchListProps) {
  const [inner, setInner] = useState(defaultValue);
  const query = value ?? inner;
  const setQuery = (q: string) => {
    setInner(q);
    onValueChange?.(q);
  };
  const results = query ? items.filter((i) => i.toLowerCase().includes(query.toLowerCase())) : items.slice(0, suggestionCount);
  const empty = query.length > 2 && results.length === 0;

  return (
    <div className={cn("flex min-h-[248px] w-full max-w-72 flex-col items-stretch", className)}>
      <div className="w-full self-start overflow-hidden rounded-lg bg-card shadow-sm ring-1 ring-border">
        <div className="flex h-10 items-center gap-2 border-b border-border px-3 transition-colors duration-100 hover:bg-accent">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0 stroke-muted-foreground" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
            aria-label={placeholder.replace(/…$/, "")}
            className="min-w-0 flex-1 bg-transparent text-[13px] text-foreground outline-none placeholder:text-muted-foreground"
          />
          {query && (
            <button
              aria-label="Clear search"
              type="button"
              onClick={() => setQuery("")}
              className="flex size-5.5 items-center justify-center rounded-full text-muted-foreground transition-colors duration-100 hover:bg-border/70 hover:text-foreground"
              style={{ animation: "fade-in 150ms ease-out both" }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {empty ? (
          <div className="flex flex-col items-center justify-center gap-1 px-4 py-8" style={{ animation: "fade-in 250ms ease-out both" }}>
            <span className="mb-1.5 flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground ring-1 ring-border">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
            </span>
            <span className="text-[13px] font-medium text-foreground">{emptyTitle}</span>
            <span className="text-[12px] text-muted-foreground">{emptyHint}</span>
          </div>
        ) : (
          <div className="p-1">
            {results.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setQuery(item);
                  onSelect?.(item);
                }}
                className="flex h-8 w-full items-center rounded-sm px-2 text-left text-[13px] text-foreground transition-colors duration-100 hover:bg-accent"
                style={{ animation: "fade-in 200ms ease-out both" }}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
