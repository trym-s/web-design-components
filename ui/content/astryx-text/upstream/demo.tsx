import E0 from "./examples/HeadingShowcase.tsx";
import E1 from "./examples/TextShowcase.tsx";
import E2 from "./examples/HeadingCardGrid.tsx";
import E3 from "./examples/HeadingPageLayout.tsx";
import E4 from "./examples/HeadingTruncation.tsx";
import E5 from "./examples/TextColors.tsx";
import E6 from "./examples/TextHeadingLevels.tsx";
import E7 from "./examples/TextInline.tsx";
import E8 from "./examples/TextTruncation.tsx";
import E9 from "./examples/TextTypes.tsx";
import E10 from "./examples/TextWeight.tsx";
import E11 from "./examples/TextWordBreak.tsx";
import E12 from "./examples/TextWrap.tsx";
import { AstryxFrame } from "../../../_sources/astryx/frame";

const examples = [
  { name: "HeadingShowcase", title: "Heading", component: E0 },
  { name: "TextShowcase", title: "Text", component: E1 },
  { name: "HeadingCardGrid", title: "Heading — Card Grid", component: E2 },
  { name: "HeadingPageLayout", title: "Heading — Page Hierarchy", component: E3 },
  { name: "HeadingTruncation", title: "Heading — Truncation", component: E4 },
  { name: "TextColors", title: "Text — Colors", component: E5 },
  { name: "TextHeadingLevels", title: "Text — Heading Levels", component: E6 },
  { name: "TextInline", title: "Text — Inline", component: E7 },
  { name: "TextTruncation", title: "Text — Truncation", component: E8 },
  { name: "TextTypes", title: "Text — Types", component: E9 },
  { name: "TextWeight", title: "Text — Weight", component: E10 },
  { name: "TextWordBreak", title: "Text — Word Break", component: E11 },
  { name: "TextWrap", title: "Text — Wrap", component: E12 },
];

export default function Demo() {
  return <AstryxFrame examples={examples} />;
}
