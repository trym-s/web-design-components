import { BreadcrumbDemo as E0 } from "./examples/breadcrumb-demo";
import { BreadcrumbBasic as E1 } from "./examples/breadcrumb-basic";
import { BreadcrumbSeparatorDemo as E2 } from "./examples/breadcrumb-separator";
import { BreadcrumbDropdown as E3 } from "./examples/breadcrumb-dropdown";
import { BreadcrumbEllipsisDemo as E4 } from "./examples/breadcrumb-ellipsis";
import { BreadcrumbLinkDemo as E5 } from "./examples/breadcrumb-link";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "breadcrumb-demo", title: "Breadcrumb Demo", component: E0 },
  { name: "breadcrumb-basic", title: "Breadcrumb Basic", component: E1 },
  { name: "breadcrumb-separator", title: "Breadcrumb Separator", component: E2 },
  { name: "breadcrumb-dropdown", title: "Breadcrumb Dropdown", component: E3 },
  { name: "breadcrumb-ellipsis", title: "Breadcrumb Ellipsis", component: E4 },
  { name: "breadcrumb-link", title: "Breadcrumb Link", component: E5 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
