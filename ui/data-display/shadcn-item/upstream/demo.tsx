import { ItemDemo as E0 } from "./examples/item-demo";
import { ItemVariant as E1 } from "./examples/item-variant";
import { ItemSizeDemo as E2 } from "./examples/item-size";
import { ItemIcon as E3 } from "./examples/item-icon";
import { ItemAvatar as E4 } from "./examples/item-avatar";
import { ItemImage as E5 } from "./examples/item-image";
import { ItemGroupExample as E6 } from "./examples/item-group";
import { ItemHeaderDemo as E7 } from "./examples/item-header";
import { ItemLink as E8 } from "./examples/item-link";
import { ItemDropdown as E9 } from "./examples/item-dropdown";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "item-demo", title: "Item Demo", component: E0 },
  { name: "item-variant", title: "Item Variant", component: E1 },
  { name: "item-size", title: "Item Size", component: E2 },
  { name: "item-icon", title: "Item Icon", component: E3 },
  { name: "item-avatar", title: "Item Avatar", component: E4 },
  { name: "item-image", title: "Item Image", component: E5 },
  { name: "item-group", title: "Item Group", component: E6 },
  { name: "item-header", title: "Item Header", component: E7 },
  { name: "item-link", title: "Item Link", component: E8 },
  { name: "item-dropdown", title: "Item Dropdown", component: E9 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
