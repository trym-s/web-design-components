import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { PageSlide } from "./page-side-by-side";

const COINS = [
  { name: "Ethereum", symbol: "ETH", tone: "bg-chart-3/10 text-chart-3", price: "$3,412.08" },
  { name: "Avalanche", symbol: "AVAX", tone: "bg-destructive/10 text-destructive", price: "$27.64" },
  { name: "BNB", symbol: "BNB", tone: "bg-chart-4/15 text-chart-5", price: "$598.11" },
];

export default function Demo() {
  const [page, setPage] = useState<1 | 2>(1);
  const [coin, setCoin] = useState(COINS[0]);

  const badge = (c: (typeof COINS)[number]) => (
    <span className={`grid size-8 shrink-0 place-items-center rounded-full text-xs ${c.tone}`}>{c.name[0]}</span>
  );

  return (
    <div className="flex h-[260px] w-[296px] items-start justify-center rounded-xl bg-muted/40 px-4 pt-4">
      <PageSlide
        page={page}
        className="h-[244px] w-full rounded-t-xl border border-b-0 bg-card text-card-foreground"
        first={
          <div className="flex flex-col px-4 pt-4">
            <div className="mx-auto mb-3 h-2.5 w-24 rounded-full bg-muted" />
            {COINS.map((c) => (
              <button
                key={c.symbol}
                type="button"
                onClick={() => {
                  setCoin(c);
                  setPage(2);
                }}
                className="flex items-center gap-3 rounded-lg py-2 text-left hover:bg-accent"
              >
                {badge(c)}
                <span className="text-sm leading-snug">
                  {c.name}
                  <span className="block text-muted-foreground">{c.symbol}</span>
                </span>
              </button>
            ))}
          </div>
        }
        second={
          <div className="flex flex-col gap-4 p-4">
            <button type="button" onClick={() => setPage(1)} className="flex items-center gap-1 self-start text-sm text-muted-foreground hover:text-foreground">
              <ChevronLeft className="size-4" />
              Back
            </button>
            <div className="flex items-center gap-3">
              {badge(coin)}
              <span className="text-sm font-medium">{coin.name}</span>
            </div>
            <div className="text-2xl font-medium tabular-nums">{coin.price}</div>
          </div>
        }
      />
    </div>
  );
}
