"use client";

import OrbitingIcons from "../../../../_sources/chamaac/app/in-progress/orbiting-icons/orbiting-icons";

const icons = [
  new URL("../../../../_sources/chamaac/public/icons/gmail.svg", import.meta.url).href,
  new URL("../../../../_sources/chamaac/public/icons/linear.svg", import.meta.url).href,
  new URL("../../../../_sources/chamaac/public/icons/slack.svg", import.meta.url).href,
  new URL("../../../../_sources/chamaac/public/icons/whatsapp.svg", import.meta.url).href,
  new URL("../../../../_sources/chamaac/public/icons/x.svg", import.meta.url).href,
];

const OrbitingIconsDemo = () => {
  return (
    <div className="w-full h-[500px] flex items-center justify-center bg-white dark:bg-black">
      <OrbitingIcons icons={icons} />
    </div>
  );
};

export default OrbitingIconsDemo;
