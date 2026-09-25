import GifText from "./gif-text";
// Upstream's sample GIF (assets.amarn.me/gif-text.gif), downscaled to 240 px / 8 fps for the bank.
import ocean from "./demo-assets/ocean.gif";

// The site shows this on its dark theme; `dark` switches the shadcn tokens for this subtree.
export default function Demo() {
  return (
    <div className="dark relative h-[300px] w-full md:h-[500px]">
      <GifText text="OCEAN" gif={ocean} containerClassName="h-full" />
    </div>
  );
}
