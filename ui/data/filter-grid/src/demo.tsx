"use client";

import {
  FilterGrid,
  type FilterDefinition,
} from "./filter-grid";

type Asset = {
  id: string;
  name: string;
  kind: "image" | "clip" | "doc";
  size: string;
};

const ASSETS: Asset[] = [
  { id: "a1", name: "hero-wide", kind: "image", size: "2.4 MB" },
  { id: "a2", name: "onboarding", kind: "clip", size: "18 MB" },
  { id: "a3", name: "brand-deck", kind: "doc", size: "840 KB" },
  { id: "a4", name: "swatches", kind: "image", size: "410 KB" },
  { id: "a5", name: "changelog", kind: "doc", size: "22 KB" },
  { id: "a6", name: "teaser-cut", kind: "clip", size: "31 MB" },
  { id: "a7", name: "grid-study", kind: "image", size: "1.1 MB" },
  { id: "a8", name: "contract-v3", kind: "doc", size: "96 KB" },
  { id: "a9", name: "still-frame", kind: "image", size: "3.0 MB" },
];

const FILTERS: FilterDefinition<Asset>[] = [
  { id: "all", label: "All", match: () => true },
  { id: "image", label: "Images", match: (a) => a.kind === "image" },
  { id: "clip", label: "Clips", match: (a) => a.kind === "clip" },
  { id: "doc", label: "Docs", match: (a) => a.kind === "doc" },
];

export default function FilterGridDemo() {
  return (
    <div className="mx-auto w-full max-w-[440px]">
      <FilterGrid
        label="Asset type"
        items={ASSETS}
        filters={FILTERS}
        getKey={(a) => a.id}
        columns={3}
        rowHeight={64}
        renderItem={(a) => (
          <div className="flex h-full flex-col justify-between">
            <p className="truncate text-[12.5px] font-medium text-foreground">
              {a.name}
            </p>
            <p className="font-mono text-[10.5px] leading-none tracking-[0.06em] tabular-nums text-muted-foreground">{a.size}</p>
          </div>
        )}
      />
    </div>
  );
}
