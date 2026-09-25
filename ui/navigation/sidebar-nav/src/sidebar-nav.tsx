/**
 * Sidebar nav — Beautiful UI's workspace sidebar (reference.tsx), styled with shadcn tokens.
 * A single highlight slides to the hovered (or else the active) item.
 */
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "./lib/utils";
import "./sidebar-nav.css";

const EASE = "cubic-bezier(0.23,1,0.32,1)";

export type SidebarNavItem = {
  key: string;
  label: string;
  icon: ReactNode;
  /** Count badge (pops in again whenever the number changes). */
  count?: number;
  /** Shows a hover-revealed "+" button. */
  onAdd?: () => void;
};
export type SidebarNavSection = { label: string; items: SidebarNavItem[] };

export type SidebarNavProps = {
  workspace: { name: string; subtitle: string; initial: string };
  onWorkspaceClick?: () => void;
  sections: SidebarNavSection[];
  active?: string;
  defaultActive?: string;
  onActiveChange?: (key: string) => void;
  search?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
};

export function SidebarNav({
  workspace,
  onWorkspaceClick,
  sections,
  active: activeProp,
  defaultActive = sections[0]?.items[0]?.key,
  onActiveChange,
  search,
  onSearchChange,
  searchPlaceholder = "Quick search",
  actionLabel,
  onAction,
  className,
}: SidebarNavProps) {
  const [innerActive, setInnerActive] = useState(defaultActive);
  const active = activeProp ?? innerActive;
  const [hovered, setHovered] = useState<string | null>(null);
  const [box, setBox] = useState<{ top: number; height: number } | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const select = (key: string) => {
    setInnerActive(key);
    onActiveChange?.(key);
  };

  useLayoutEffect(() => {
    const container = navRef.current;
    const target = itemRefs.current[hovered ?? active ?? ""];
    if (!container || !target) return;
    const c = container.getBoundingClientRect();
    const t = target.getBoundingClientRect();
    setBox({ top: t.top - c.top, height: t.height });
  }, [hovered, active]);

  return (
    <div className={cn("w-60 rounded-lg bg-card p-2 shadow-sm ring-1 ring-border", className)}>
      <button
        type="button"
        onClick={onWorkspaceClick}
        className="mb-2 flex w-full items-center gap-2.5 rounded-md p-1.5 text-left transition-[background-color,transform] duration-100 hover:bg-accent active:scale-[0.96]"
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-foreground text-[13px] font-semibold text-background">
          {workspace.initial}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13px] font-medium leading-tight text-foreground">{workspace.name}</span>
          <span className="block truncate text-[11px] leading-tight text-muted-foreground">{workspace.subtitle}</span>
        </span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="stroke-muted-foreground" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 15l5 5 5-5M7 9l5-5 5 5" />
        </svg>
      </button>

      <label className="mb-1 flex h-8 items-center gap-2 rounded-md bg-muted px-2.5 ring-1 ring-border">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="stroke-muted-foreground" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
        <input
          value={search}
          onChange={(event) => onSearchChange?.(event.target.value)}
          placeholder={searchPlaceholder}
          className="min-w-0 flex-1 bg-transparent text-[12.5px] text-foreground outline-none placeholder:text-muted-foreground"
        />
        <kbd className="flex size-4.5 items-center justify-center rounded-[calc(var(--radius)-5px)] bg-card text-[10px] text-muted-foreground ring-1 ring-border">/</kbd>
      </label>

      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="mb-2 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-[13px] font-medium text-primary transition-[background-color,transform] duration-100 hover:bg-primary/10 active:scale-[0.96]"
        >
          <span className="min-w-0 flex-1 truncate text-left">{actionLabel}</span>
          <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
        </button>
      )}

      <div ref={navRef} onMouseLeave={() => setHovered(null)} className="relative flex flex-col gap-2">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 rounded-[calc(var(--radius)-3px)] bg-accent"
          style={{
            top: box?.top ?? 0,
            height: box?.height ?? 0,
            opacity: box ? 1 : 0,
            transition: `top 220ms ${EASE}, height 220ms ${EASE}, opacity 150ms ease`,
          }}
        />
        {sections.map((section) => (
          <div key={section.label}>
            <div className="px-2 pb-1 pt-1 text-[10.5px] font-medium uppercase tracking-[0.08em] text-muted-foreground">{section.label}</div>
            <div className="flex flex-col gap-px">
              {section.items.map((item) => {
                const isActive = item.key === active;
                return (
                  <button
                    key={item.key}
                    ref={(el) => {
                      itemRefs.current[item.key] = el;
                    }}
                    type="button"
                    onMouseEnter={() => setHovered(item.key)}
                    onFocus={() => setHovered(item.key)}
                    onBlur={() => setHovered(null)}
                    onClick={() => select(item.key)}
                    aria-current={isActive ? "page" : undefined}
                    className="group relative z-10 flex w-full items-center gap-2 rounded-[calc(var(--radius)-3px)] px-2 py-1.5 text-left transition-[color,transform] duration-150 active:scale-[0.96]"
                  >
                    <span className={cn("[&_svg]:size-[13px]", isActive ? "text-foreground" : "text-muted-foreground")}>{item.icon}</span>
                    <span className={cn("min-w-0 flex-1 truncate text-[13px] transition-colors duration-150", isActive ? "font-medium text-foreground" : "text-muted-foreground")}>
                      {item.label}
                    </span>
                    {item.count !== undefined && (
                      <span
                        key={item.count}
                        className={cn(
                          "flex h-4.5 min-w-4.5 items-center justify-center rounded-full px-1 text-[10.5px] font-semibold tabular-nums",
                          isActive ? "bg-card text-muted-foreground ring-1 ring-border" : "bg-primary/10 text-primary",
                        )}
                        style={{ animation: `pop-in 250ms ${EASE} both` }}
                      >
                        {item.count}
                      </span>
                    )}
                    {item.onAdd && (
                      <span
                        role="button"
                        aria-label={`Add to ${item.label}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          item.onAdd?.();
                        }}
                        className={cn(
                          "flex size-4.5 items-center justify-center rounded-[calc(var(--radius)-5px)] text-muted-foreground transition-[background-color,color,opacity] duration-100 hover:bg-border/70 hover:text-foreground group-hover:opacity-100",
                          isActive ? "opacity-100" : "opacity-0",
                        )}
                      >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
