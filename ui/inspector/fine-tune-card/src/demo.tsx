import { FineTuneCard } from "./fine-tune-card";

export default function Demo() {
  return (
    <FineTuneCard
      title="Flavor card"
      defaultValue={{ layout: "row", width: 324, height: 96, radius: 28, opacity: 100, type: null }}
      typeOptions={["Seasonal", "Classic", "Limited"]}
    />
  );
}
