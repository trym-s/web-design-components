import { RecommendationCard, type RecommendationOption } from "./recommendation-card";

const code = "rounded-sm px-1.5 py-0.5 font-mono text-[12px]";

const OPTIONS: RecommendationOption[] = [
  {
    key: "high",
    body: (
      <>
        Reorder waffle cones from <code className={`${code} bg-primary/10 text-primary`}>cone_king</code> with lead time{" "}
        <code className={`${code} bg-primary/10 text-primary`}>7_days</code>.
      </>
    ),
    short: "Reorder from cone_king · 7-day lead",
    signal: 3,
    tone: "success",
    label: "High confidence",
    cta: "Accept",
    ctaVariant: "primary",
  },
  {
    key: "review",
    body: (
      <>
        Switch vanilla to <code className={`${code} bg-(--warning)/12 text-(--warning)`}>vanilla_madagascar</code> for peak season.
      </>
    ),
    short: "Switch to vanilla_madagascar",
    signal: 2,
    tone: "warning",
    label: "Needs review",
    cta: "Configure",
    ctaVariant: "foreground",
  },
  {
    key: "none",
    body: (
      <>
        Fall back to a <span className="font-medium text-foreground">full restock</span> across every SKU.
      </>
    ),
    short: "Full restock across every SKU",
    signal: 0,
    tone: "muted",
    label: "No signal",
    cta: "Accept full restock",
    ctaVariant: "foreground",
  },
];

export default function Demo() {
  return (
    <RecommendationCard
      title="Want me to place this restock order?"
      options={OPTIONS}
      onAccept={(option) => console.log("accepted", option.key)}
    />
  );
}
