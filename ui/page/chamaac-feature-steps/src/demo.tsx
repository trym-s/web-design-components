import FeatureSteps from "./feature-steps";
// The upstream demo's Unsplash photos (Unsplash License), downloaded at 1024 px.
import mountain from "./demo-assets/step-1.jpg";
import city from "./demo-assets/step-2.jpg";
import forest from "./demo-assets/step-3.jpg";

const features = [
  {
    step: "Step 1",
    title: "Mountain Adventure",
    content: "A stunning mountain landscape captured at sunrise. The peaks are illuminated by the golden light of the morning sun.",
    image: mountain,
  },
  {
    step: "Step 2",
    title: "City Lights",
    content: "Night view of a vibrant city glowing with lights. The urban skyline reflects the energy and bustle of city life.",
    image: city,
  },
  {
    step: "Step 3",
    title: "Forest Path",
    content: "A peaceful walking trail surrounded by lush greenery. The path winds through the dense forest, offering a serene escape.",
    image: forest,
  },
];

export default function Demo() {
  return (
    <div className="flex w-full items-center justify-center">
      <FeatureSteps features={features} autoPlayInterval={6000} imageClassName="h-[300px] md:h-auto" />
    </div>
  );
}
