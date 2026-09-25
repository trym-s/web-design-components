import { DatePickerDemo as E0 } from "./examples/date-picker-demo";
import { DatePickerSimple as E1 } from "./examples/date-picker-basic";
import { DatePickerWithRange as E2 } from "./examples/date-picker-range";
import { DatePickerSimple as E3 } from "./examples/date-picker-dob";
import { DatePickerInput as E4 } from "./examples/date-picker-input";
import { DatePickerTime as E5 } from "./examples/date-picker-time";
import { DatePickerNaturalLanguage as E6 } from "./examples/date-picker-natural-language";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "date-picker-demo", title: "Date Picker Demo", component: E0 },
  { name: "date-picker-basic", title: "Date Picker Basic", component: E1 },
  { name: "date-picker-range", title: "Date Picker Range", component: E2 },
  { name: "date-picker-dob", title: "Date Picker Dob", component: E3 },
  { name: "date-picker-input", title: "Date Picker Input", component: E4 },
  { name: "date-picker-time", title: "Date Picker Time", component: E5 },
  { name: "date-picker-natural-language", title: "Date Picker Natural Language", component: E6 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
