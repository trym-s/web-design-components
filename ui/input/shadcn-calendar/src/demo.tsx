import E0 from "./examples/calendar-demo";
import E1 from "./examples/calendar-hijri";
import E2 from "./examples/calendar-basic";
import { CalendarRange as E3 } from "./examples/calendar-range";
import { CalendarCaption as E4 } from "./examples/calendar-caption";
import { CalendarWithPresets as E5 } from "./examples/calendar-presets";
import { CalendarWithTime as E6 } from "./examples/calendar-time";
import { CalendarBookedDates as E7 } from "./examples/calendar-booked-dates";
import { CalendarCustomDays as E8 } from "./examples/calendar-custom-days";
import { CalendarWeekNumbers as E9 } from "./examples/calendar-week-numbers";
import { CalendarMultiple as E10 } from "./examples/calendar-multiple";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "calendar-demo", title: "Calendar Demo", component: E0 },
  { name: "calendar-hijri", title: "Calendar Hijri", component: E1 },
  { name: "calendar-basic", title: "Calendar Basic", component: E2 },
  { name: "calendar-range", title: "Calendar Range", component: E3 },
  { name: "calendar-caption", title: "Calendar Caption", component: E4 },
  { name: "calendar-presets", title: "Calendar Presets", component: E5 },
  { name: "calendar-time", title: "Calendar Time", component: E6 },
  { name: "calendar-booked-dates", title: "Calendar Booked Dates", component: E7 },
  { name: "calendar-custom-days", title: "Calendar Custom Days", component: E8 },
  { name: "calendar-week-numbers", title: "Calendar Week Numbers", component: E9 },
  { name: "calendar-multiple", title: "Calendar Multiple · not on docs page", component: E10 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
