import StackScroll from "./stack-scroll";
// The upstream demo's Unsplash photos (Unsplash License), downloaded at 800 px.
import mountains from "./demo-assets/mountains.jpg";
import ocean from "./demo-assets/ocean.jpg";
import desert from "./demo-assets/desert.jpg";

const items = [
  { image: mountains, title: "The Call of the Mountains" },
  { image: ocean, title: "The Serenity of the Ocean" },
  { image: desert, title: "The Spirit of the Desert" },
];

export default function Demo() {
  return <StackScroll items={items} />;
}
