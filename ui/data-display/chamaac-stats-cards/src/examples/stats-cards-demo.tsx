import { StatsCards } from "../../../../_sources/chamaac/registry/chamaac/stats-cards/stats-cards";

export default function StatsCardsDemo() {
  return (
    <div className="w-full h-full flex items-center justify-center py-10 bg-orange-50">
      <StatsCards
        width="w-70"
        height="h-84"
        images={[new URL("../../../../_sources/chamaac/public/images/models/1.png", import.meta.url).href, new URL("../../../../_sources/chamaac/public/images/models/2.png", import.meta.url).href]}
      />
    </div>
  );
}
