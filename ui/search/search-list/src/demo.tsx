import { SearchList } from "./search-list";

const ITEMS = [
  "Forecast summer demand",
  "Find waffle cone suppliers",
  "Compare seasonal flavors",
  "Draft flavor launch plan",
  "Check cold-chain status",
  "Audit sugar costs",
  "Retire low sellers",
];

export default function Demo() {
  return <SearchList items={ITEMS} />;
}
