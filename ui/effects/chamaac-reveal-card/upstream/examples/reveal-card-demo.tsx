import RandomImageReveal from "../../../../_sources/chamaac/app/in-progress/random-image-reveal/reveal-card";

export default function RandomImageRevealDemo() {
  return (
    <div className="w-full h-[600px] flex justify-center items-center">
      <RandomImageReveal
        images={[
          new URL("../../../../_sources/chamaac/public/images/1.jpg", import.meta.url).href,
          new URL("../../../../_sources/chamaac/public/images/2.jpg", import.meta.url).href,
          new URL("../../../../_sources/chamaac/public/images/3.jpg", import.meta.url).href,
          new URL("../../../../_sources/chamaac/public/images/4.jpg", import.meta.url).href,
          new URL("../../../../_sources/chamaac/public/images/5.jpg", import.meta.url).href,
        ]}
        duration={0.2}
      />
    </div>
  );
}
