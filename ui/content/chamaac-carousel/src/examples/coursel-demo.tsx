"use client";

import Coursel from "../../../../_sources/chamaac/registry/chamaac/carousel/carousel";

export default function CourselDemo() {
  const images = [
    new URL("../../../../_sources/chamaac/public/images/1.jpg", import.meta.url).href,
    new URL("../../../../_sources/chamaac/public/images/2.jpg", import.meta.url).href,
    new URL("../../../../_sources/chamaac/public/images/3.jpg", import.meta.url).href,
    new URL("../../../../_sources/chamaac/public/images/4.jpg", import.meta.url).href,
    new URL("../../../../_sources/chamaac/public/images/5.jpg", import.meta.url).href,
  ];

  return (
    <div className="w-full h-[500px] flex justify-center items-center">
      <Coursel images={images} />
    </div>
  );
}
