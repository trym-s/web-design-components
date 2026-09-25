import E0 from "./examples/PaginationDotsCarousel.tsx";
import E1 from "./examples/PaginationPageSize.tsx";
import E2 from "./examples/PaginationVariants.tsx";
import E3 from "./examples/PaginationWithTable.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "PaginationDotsCarousel", title: "Pagination — Dots Carousel", component: E0 },
  { name: "PaginationPageSize", title: "Pagination — Page Size Selector", component: E1 },
  { name: "PaginationVariants", title: "Pagination — Variants", component: E2 },
  { name: "PaginationWithTable", title: "Pagination — With Table", component: E3 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
