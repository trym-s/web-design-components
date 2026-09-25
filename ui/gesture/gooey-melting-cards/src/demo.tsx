import { GooeyMeltingCards } from "./gooey-melting-cards";
import cardA from "./avatar-5.png";
import cardB from "./avatar-6.png";

export default function GooeyMeltingCardsDemo() {
  return (
    <div className="grid h-[280px] w-full max-w-md place-items-center overflow-hidden rounded-lg bg-muted/30">
      <GooeyMeltingCards cards={[{ src: cardA }, { src: cardB }]} />
    </div>
  );
}
