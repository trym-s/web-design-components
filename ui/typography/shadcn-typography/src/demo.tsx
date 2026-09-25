import { TypographyDemo as E0 } from "./examples/typography-demo";
import { TypographyH1 as E1 } from "./examples/typography-h1";
import { TypographyH2 as E2 } from "./examples/typography-h2";
import { TypographyH3 as E3 } from "./examples/typography-h3";
import { TypographyH4 as E4 } from "./examples/typography-h4";
import { TypographyP as E5 } from "./examples/typography-p";
import { TypographyBlockquote as E6 } from "./examples/typography-blockquote";
import { TypographyTable as E7 } from "./examples/typography-table";
import { TypographyList as E8 } from "./examples/typography-list";
import { TypographyInlineCode as E9 } from "./examples/typography-inline-code";
import { TypographyLead as E10 } from "./examples/typography-lead";
import { TypographyLarge as E11 } from "./examples/typography-large";
import { TypographySmall as E12 } from "./examples/typography-small";
import { TypographyMuted as E13 } from "./examples/typography-muted";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "typography-demo", title: "Typography Demo", component: E0 },
  { name: "typography-h1", title: "Typography H1", component: E1 },
  { name: "typography-h2", title: "Typography H2", component: E2 },
  { name: "typography-h3", title: "Typography H3", component: E3 },
  { name: "typography-h4", title: "Typography H4", component: E4 },
  { name: "typography-p", title: "Typography P", component: E5 },
  { name: "typography-blockquote", title: "Typography Blockquote", component: E6 },
  { name: "typography-table", title: "Typography Table", component: E7 },
  { name: "typography-list", title: "Typography List", component: E8 },
  { name: "typography-inline-code", title: "Typography Inline Code", component: E9 },
  { name: "typography-lead", title: "Typography Lead", component: E10 },
  { name: "typography-large", title: "Typography Large", component: E11 },
  { name: "typography-small", title: "Typography Small", component: E12 },
  { name: "typography-muted", title: "Typography Muted", component: E13 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
