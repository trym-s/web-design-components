import { ExpandingSearch } from "./expanding-search";

export default function ExpandingSearchDemo() {
  return (
    <div className="flex w-[280px] flex-col items-center gap-6">
      <ExpandingSearch className="max-w-[240px]" />
      <ExpandingSearch
        className="max-w-[240px]"
        defaultOpen
        defaultValue="invoices"
        resultCount={12}
        collapseOnBlur={false}
      />
    </div>
  );
}
