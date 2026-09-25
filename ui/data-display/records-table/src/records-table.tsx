/**
 * Records table — Beautiful UI's compact CRM grid (reference.tsx), styled with shadcn tokens.
 * Tag hues are declared on the root (`--tag-orange` … `--tag-green`, upstream values) and passed per tag as
 * any CSS colour; connection strength uses `--success` / `--warning` / `destructive` / `muted-foreground`.
 */
import { useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "./lib/utils";

export type Strength = "strong" | "weak" | "veryweak" | "none";
export type RecordsSortKey = "name" | "last" | "strength";
export type RecordTag = { label: string; /** CSS colour, e.g. `var(--tag-violet)`; defaults to `--muted-foreground`. */ color?: string };
export type RecordRow = { id: string; name: string; tags: RecordTag[]; last: string; strength: Strength; website?: string };

export type RecordsTableProps = {
  rows: RecordRow[];
  strengthLabels?: Partial<Record<Strength, string>>;
  /** Text of `last` that means "never contacted" (rendered muted). */
  noContactLabel?: string;
  defaultSort?: { key: RecordsSortKey; dir: 1 | -1 };
  onSortChange?: (sort: { key: RecordsSortKey; dir: 1 | -1 }) => void;
  selected?: ReadonlySet<string>;
  onSelectedChange?: (selected: Set<string>) => void;
  onAddCalculation?: () => void;
  className?: string;
};

const STRENGTH: Record<Strength, { label: string; color: string; rank: number }> = {
  strong: { label: "Very strong", color: "var(--success)", rank: 3 },
  weak: { label: "Weak", color: "var(--warning)", rank: 2 },
  veryweak: { label: "Very weak", color: "var(--destructive)", rank: 1 },
  none: { label: "No communication", color: "var(--muted-foreground)", rank: 0 },
};

const ROOT_VARS =
  "[--success:oklch(0.603_0.155_150.9)] [--warning:oklch(0.689_0.179_49.9)] dark:[--success:oklch(0.705_0.154_153.8)] dark:[--warning:oklch(0.746_0.156_55.6)] " +
  "[--tag-orange:oklch(0.757_0.153_66.4)] [--tag-lime:oklch(0.727_0.164_123.9)] [--tag-rose:oklch(0.680_0.169_17.0)] [--tag-magenta:oklch(0.611_0.176_344.0)] " +
  "[--tag-cyan:oklch(0.671_0.118_219.4)] [--tag-violet:oklch(0.627_0.230_296.7)] [--tag-blue:oklch(0.611_0.210_263.9)] [--tag-green:oklch(0.652_0.131_162.9)] " +
  "[--records-sticky-shadow:5px_0_8px_-10px_oklch(0_0_0/0.4)]";

const GRID = "border-r border-b border-border/78 text-left align-middle last:border-r-0";
const CELL = cn(GRID, "h-[42px] overflow-hidden text-ellipsis whitespace-nowrap px-3 transition-colors duration-120 ease-out");
const STICKY = "sticky left-0 z-2 shadow-(--records-sticky-shadow)";
const EASE_STRONG = "ease-[cubic-bezier(.23,1,.32,1)]";

function Icon({ children, size = 14 }: { children: ReactNode; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

function Checkbox({ checked, mixed = false, onChange, label }: { checked: boolean; mixed?: boolean; onChange: () => void; label: string }) {
  const active = checked || mixed;
  return (
    <label className="group/cb relative inline-flex size-6 flex-[0_0_24px] items-center justify-center rounded-sm" title={label}>
      <input type="checkbox" className="peer absolute size-px opacity-0" checked={checked} onChange={onChange} aria-label={label} />
      <span
        className={cn(
          "inline-flex size-[18px] items-center justify-center rounded-sm border transition-[border-color,background-color,box-shadow,transform] duration-140 group-active/cb:scale-96 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary",
          EASE_STRONG,
          active
            ? "border-primary bg-primary text-primary-foreground"
            : "border-input bg-card text-foreground group-hover/cb:border-muted-foreground/60 group-hover/cb:bg-accent dark:bg-input/30",
        )}
      >
        {mixed ? <span className="h-[1.5px] w-2 rounded-full bg-current" /> : checked ? <Icon size={12}><path d="m5 12 4 4L19 6" /></Icon> : null}
      </span>
    </label>
  );
}

function Tag({ tag }: { tag: RecordTag }) {
  const color = tag.color ?? "var(--muted-foreground)";
  return (
    <span
      className="inline-flex h-[23px] max-w-[115px] shrink-0 cursor-pointer items-center overflow-hidden text-ellipsis whitespace-nowrap rounded-sm border border-[color:color-mix(in_srgb,var(--tag-color)_24%,var(--card))] bg-[color:color-mix(in_srgb,var(--tag-color)_13%,var(--card))] px-[7px] text-[11px] font-medium text-[color:color-mix(in_srgb,var(--tag-color)_82%,var(--foreground))]"
      style={{ "--tag-color": color } as CSSProperties}
    >
      <span className="mr-[5px] size-[5px] flex-[0_0_5px] rounded-full bg-(--tag-color)" />
      {tag.label}
    </span>
  );
}

function HeaderCell({ label, icon, sortKey, sort, onSort }: { label: string; icon: ReactNode; sortKey?: RecordsSortKey; sort: { key: RecordsSortKey; dir: 1 | -1 }; onSort: (key: RecordsSortKey) => void }) {
  const active = sort.key === sortKey;
  return (
    <th className={cn(GRID, "sticky top-0 z-5 h-[42px] bg-card p-0 text-[12px] font-semibold text-muted-foreground")}>
      <button
        type="button"
        className="group/h flex h-[42px] w-full items-center gap-2 px-3 text-left text-muted-foreground transition-colors duration-120 ease-out hover:bg-accent hover:text-foreground"
        onClick={sortKey ? () => onSort(sortKey) : undefined}
      >
        <span className="inline-flex shrink-0 text-muted-foreground">{icon}</span>
        <span className="truncate">{label}</span>
        {sortKey && (
          <span
            className={cn(
              "ml-auto inline-flex shrink-0 transition-[opacity,transform] duration-[120ms,160ms] group-hover/h:opacity-100",
              EASE_STRONG,
              active ? "opacity-100" : "opacity-0",
            )}
            style={{ transform: active && sort.dir === -1 ? "rotate(180deg)" : undefined }}
          >
            <Icon size={12}><path d="M12 5v14M5 12l7 7 7-7" /></Icon>
          </span>
        )}
      </button>
    </th>
  );
}

export function RecordsTable({
  rows,
  strengthLabels,
  noContactLabel = "No contact",
  defaultSort = { key: "name", dir: 1 },
  onSortChange,
  selected: selectedProp,
  onSelectedChange,
  onAddCalculation,
  className,
}: RecordsTableProps) {
  const [innerSelected, setInnerSelected] = useState<Set<string>>(new Set());
  const selected = selectedProp ?? innerSelected;
  const [sort, setSort] = useState(defaultSort);
  const levels = useMemo(
    () => Object.fromEntries(Object.entries(STRENGTH).map(([k, v]) => [k, { ...v, label: strengthLabels?.[k as Strength] ?? v.label }])) as typeof STRENGTH,
    [strengthLabels],
  );

  const visibleRows = useMemo(
    () =>
      [...rows].sort((a, b) => {
        const value =
          sort.key === "name" ? a.name.localeCompare(b.name) : sort.key === "last" ? a.last.localeCompare(b.last) : STRENGTH[a.strength].rank - STRENGTH[b.strength].rank;
        return value * sort.dir;
      }),
    [rows, sort],
  );

  const allSelected = visibleRows.length > 0 && visibleRows.every((row) => selected.has(row.id));
  const partiallySelected = !allSelected && visibleRows.some((row) => selected.has(row.id));

  const commitSelected = (next: Set<string>) => {
    setInnerSelected(next);
    onSelectedChange?.(next);
  };
  const toggleSort = (key: RecordsSortKey) => {
    const next = sort.key === key ? { key, dir: (sort.dir * -1) as 1 | -1 } : { key, dir: 1 as const };
    setSort(next);
    onSortChange?.(next);
  };
  const toggleRow = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    commitSelected(next);
  };
  const toggleAll = () => {
    const next = new Set(selected);
    visibleRows.forEach((row) => (allSelected ? next.delete(row.id) : next.add(row.id)));
    commitSelected(next);
  };

  const average = rows.length ? Math.round((rows.reduce((sum, row) => sum + STRENGTH[row.strength].rank, 0) / rows.length / 3) * 100) : 0;
  const footCell = cn(CELL, "sticky bottom-0 z-4 h-[38px] bg-muted text-[11.5px] text-muted-foreground");

  return (
    <div className={cn("w-full min-w-0 overflow-hidden rounded-lg border border-border bg-card shadow-xs", ROOT_VARS, className)}>
      <div
        className="max-h-[438px] overflow-auto overscroll-none [scrollbar-color:var(--input)_transparent] [scrollbar-gutter:stable] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
        tabIndex={0}
        aria-label="Companies table. Scroll horizontally and vertically to view all columns and records."
      >
        <table className="w-full min-w-[990px] table-fixed border-separate border-spacing-0 text-[12px] text-foreground">
          <colgroup>
            <col className="w-[270px]" />
            <col className="w-[275px]" />
            <col className="w-[190px]" />
            <col className="w-[210px]" />
            <col className="w-[175px]" />
          </colgroup>
          <thead>
            <tr>
              <th className={cn(GRID, STICKY, "top-0 z-7 h-[42px] bg-card p-0 text-[12px] font-semibold text-muted-foreground")}>
                <div className="flex h-[42px] w-full items-center gap-2 pl-1.5 pr-3">
                  <Checkbox checked={allSelected} mixed={partiallySelected} onChange={toggleAll} label="Select all companies" />
                  <span className="whitespace-nowrap">Company</span>
                </div>
              </th>
              <HeaderCell label="Categories" sort={sort} onSort={toggleSort} icon={<Icon size={15}><path d="m20.6 13.4-8.6 8.6-8-8V4h10l6.6 6.6a2 2 0 0 1 0 2.8zM7 7h.01" /></Icon>} />
              <HeaderCell label="Last interaction" sortKey="last" sort={sort} onSort={toggleSort} icon={<Icon size={15}><path d="M3 5h18M3 12h12M3 19h7M18 15v6m-3-3h6" /></Icon>} />
              <HeaderCell label="Connection strength" sortKey="strength" sort={sort} onSort={toggleSort} icon={<Icon size={15}><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1a5.5 5.5 0 1 0-7.8 7.8L12 21l8.8-8.5a5.5 5.5 0 0 0 0-7.9z" /></Icon>} />
              <HeaderCell label="Links" sort={sort} onSort={toggleSort} icon={<Icon size={15}><path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1" /></Icon>} />
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row) => {
              const isSelected = selected.has(row.id);
              const strength = levels[row.strength];
              const bg = isSelected ? "bg-[color:color-mix(in_srgb,var(--primary)_7%,var(--card))]" : "group-hover/row:bg-accent";
              return (
                <tr key={row.id} className="group/row">
                  <td className={cn(CELL, STICKY, "flex items-center gap-1 overflow-visible pl-1.5", isSelected ? bg : cn("bg-card", bg))}>
                    <Checkbox checked={isSelected} onChange={() => toggleRow(row.id)} label={`Select ${row.name}`} />
                    <span className="inline-flex size-5 flex-[0_0_20px] items-center justify-center rounded-sm bg-muted text-[10px] font-[650] text-muted-foreground">
                      {row.name.slice(0, 1).toUpperCase()}
                    </span>
                    <a
                      href={row.website ? `https://${row.website}` : "#"}
                      onClick={(event) => !row.website && event.preventDefault()}
                      className={cn(
                        "min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-[12.5px] font-medium text-foreground",
                        row.website && "underline-offset-3 hover:text-primary hover:underline focus-visible:text-primary focus-visible:underline",
                      )}
                    >
                      {row.name}
                    </a>
                  </td>
                  <td className={cn(CELL, bg)}>
                    <div className="flex min-w-0 items-center gap-1 overflow-hidden">
                      {row.tags.slice(0, 4).map((tag) => (
                        <Tag key={tag.label} tag={tag} />
                      ))}
                      {row.tags.length > 4 && (
                        <span className="inline-flex h-[23px] shrink-0 items-center rounded-sm border border-input bg-muted px-[7px] text-[11px] font-medium text-muted-foreground">
                          +{row.tags.length - 4}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className={cn(CELL, bg, row.last === noContactLabel && "text-muted-foreground")}>{row.last}</td>
                  <td className={cn(CELL, bg)}>
                    <span className="inline-flex items-center gap-2 text-muted-foreground">
                      <span className="inline-block size-2 flex-[0_0_8px] rounded-full" style={{ background: strength.color }} />
                      {strength.label}
                    </span>
                  </td>
                  <td className={cn(CELL, bg)}>
                    {row.website ? (
                      <a
                        className="inline-flex max-w-full items-center gap-[5px] overflow-hidden text-ellipsis text-primary underline decoration-current/35 underline-offset-3 transition-colors duration-120 ease-out hover:text-foreground hover:decoration-current focus-visible:text-foreground"
                        href={`https://${row.website}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {row.website}
                        <Icon size={12}><path d="M14 5h5v5M19 5l-8 8" /></Icon>
                      </a>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td className={cn(footCell, "left-0 z-6 font-[550] shadow-(--records-sticky-shadow)")}>
                <span className="mr-[3px] tabular-nums text-foreground">{rows.length}</span> count
              </td>
              <td className={footCell}>
                <button
                  type="button"
                  onClick={onAddCalculation}
                  className={cn("inline-flex items-center gap-1.5 text-muted-foreground transition-[color,transform] duration-[120ms,140ms] hover:text-foreground active:scale-96", EASE_STRONG)}
                >
                  <Icon size={14}><path d="M12 5v14M5 12h14" /></Icon>Add calculation
                </button>
              </td>
              <td className={footCell}>—</td>
              <td className={footCell}>
                <span className="inline-flex items-center gap-[7px] text-muted-foreground">
                  <span className="inline-block size-2 flex-[0_0_8px] rounded-full bg-(--warning)" />
                  {average}% average
                </span>
              </td>
              <td className={footCell}>{rows.filter((row) => row.website).length} links</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
