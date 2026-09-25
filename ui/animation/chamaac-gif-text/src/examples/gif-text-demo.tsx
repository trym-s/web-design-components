import GifText from "../../../../_sources/chamaac/app/components/text-animations/gif-text/gif-text";

function GifTextDemo() {
  return (
    <div className="w-full h-[300px] md:h-[500px] relative ">
      <GifText
        text="OCEAN"
        gif="https://assets.amarn.me/gif-text.gif"
        containerClassName="h-full"
      />
    </div>
  );
}

export default GifTextDemo;
