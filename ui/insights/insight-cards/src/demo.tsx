import { AllocationCard, AnomalyCard, CompareCard, Entity, InsightCards, Mono, type InsightPage } from "./insight-cards";

const formatPercent = (v: number) => `${v > 0 ? "+" : ""}${v.toFixed(2)}%`;
const formatMoney = (v: number) => `$${Math.round(v).toLocaleString("en-US")}`;
const spend = [274, 289, 264, 307, 331, 1210, 1718, 2112];

const PAGES: InsightPage[] = [
  {
    key: "compare",
    prose: (
      <>
        The worst performer in your <Entity name="Creamery" /> is Rocky Road — down <Mono tone="negative">-6%</Mono> or{" "}
        <Mono tone="negative">-$2,453.44</Mono>.
      </>
    ),
    card: (
      <CompareCard
        formatValue={formatPercent}
        series={[
          { id: "mint", name: "Mint Chip", values: [-2.9, -3.4, -3.05, -3.86, -3.52, -4.1, -3.82, -4.41], sub: "-$2,377.66", tone: "negative", color: "var(--warning)" },
          { id: "pistachio", name: "Pistachio", values: [0.22, 0.58, 0.42, 0.91, 0.76, 1.08, 0.96, 1.15], sub: "+$617.22", tone: "positive", color: "var(--primary)" },
        ]}
      />
    ),
    pill: "Should I rebalance flavors?",
  },
  {
    key: "anomaly",
    prose: (
      <>
        Unusually high freezer bill on <span className="font-medium text-foreground">Dec 13</span> — <Mono tone="negative">+$1,834.66</Mono> above your
        average.
      </>
    ),
    card: (
      <AnomalyCard
        title="High freezer spend"
        metrics={[
          { key: "spend", label: "Spend", values: spend, format: formatMoney, threshold: "$2,112 threshold" },
          { key: "usage", label: "Usage", values: [18, 19, 17, 21, 22, 58, 81, 96], format: (v) => `${Math.round(v)} kWh`, threshold: "82 kWh threshold" },
        ]}
        total={`${formatMoney(spend[spend.length - 1])} spent`}
        delta="+$1,834.66"
        comparison="vs 3 months"
      />
    ),
    pill: "Get tips on cutting freezer costs",
  },
  {
    key: "allocation",
    prose: (
      <>
        You&apos;re heavily invested in <Entity name="Vanilla" /> — it&apos;s <span className="font-medium text-foreground">72.5%</span> of your case.
      </>
    ),
    card: (
      <AllocationCard
        title="Vanilla allocation"
        mark="V"
        segments={[
          { name: "VAN", label: "Vanilla", pct: 72.5, amount: "$51,785", tone: "accent" },
          { name: "CHOC", label: "Chocolate", pct: 22.8, amount: "$16,278", tone: "strong" },
          { name: "MINT", label: "Mint", pct: 4.7, amount: "$3,357", tone: "subtle" },
        ]}
        description="Contribution snapshot across current inventory value. Segment selection changes the inspected group without moving the card."
      />
    ),
    pill: "If we look at seasonals, what changes?",
  },
];

export default function Demo() {
  return <InsightCards pages={PAGES} />;
}
