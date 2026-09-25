import RandomImageReveal from "./reveal-card";
import image1 from "./demo-assets/1.jpg";
import image2 from "./demo-assets/2.jpg";
import image3 from "./demo-assets/3.jpg";
import image4 from "./demo-assets/4.jpg";
import image5 from "./demo-assets/5.jpg";

export default function Demo() {
  return (
    <div className="flex h-[600px] w-full items-center justify-center">
      <RandomImageReveal images={[image1, image2, image3, image4, image5]} duration={0.2} />
    </div>
  );
}
