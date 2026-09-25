import { StatsCards } from "./stats-cards";
import model1 from "./demo-assets/1.png";
import model2 from "./demo-assets/2.png";

export default function Demo() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[var(--stats-cards-surface,var(--color-orange-50))] py-10">
      <StatsCards
        width="w-70"
        height="h-84"
        stats={[
          { value: "$100k+", label: "Revenue driven", description: "From scroll-stopping campaigns that actually sell." },
          { value: "37M+", label: "Organic impressions", description: "Growth through content that sells, not just trends." },
        ]}
        images={[
          { src: model1, alt: "Model", badge: "900k Liked" },
          { src: model2, alt: "Campaign", badge: "1.5M Viewed" },
        ]}
      />
    </div>
  );
}
