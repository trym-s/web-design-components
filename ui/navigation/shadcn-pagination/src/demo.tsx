import E0 from "./examples/pagination-demo";
import { PaginationSimple as E1 } from "./examples/pagination-simple";
import { PaginationIconsOnly as E2 } from "./examples/pagination-icons-only";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "pagination-demo", title: "Pagination Demo", component: E0 },
  { name: "pagination-simple", title: "Pagination Simple", component: E1 },
  { name: "pagination-icons-only", title: "Pagination Icons Only", component: E2 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
