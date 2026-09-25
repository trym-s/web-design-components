import { InputOTPDemo as E0 } from "./examples/input-otp-demo";
import { InputOTPPattern as E1 } from "./examples/input-otp-pattern";
import E2 from "./examples/input-otp-separator";
import { InputOTPDisabled as E3 } from "./examples/input-otp-disabled";
import E4 from "./examples/input-otp-controlled";
import { InputOTPInvalid as E5 } from "./examples/input-otp-invalid";
import { InputOTPFourDigits as E6 } from "./examples/input-otp-four-digits";
import { InputOTPAlphanumeric as E7 } from "./examples/input-otp-alphanumeric";
import { InputOTPForm as E8 } from "./examples/input-otp-form";
import { ShadcnFrame } from "../../../_sources/shadcn/frame";

const examples = [
  { name: "input-otp-demo", title: "Input Otp Demo", component: E0 },
  { name: "input-otp-pattern", title: "Input Otp Pattern", component: E1 },
  { name: "input-otp-separator", title: "Input Otp Separator", component: E2 },
  { name: "input-otp-disabled", title: "Input Otp Disabled", component: E3 },
  { name: "input-otp-controlled", title: "Input Otp Controlled", component: E4 },
  { name: "input-otp-invalid", title: "Input Otp Invalid", component: E5 },
  { name: "input-otp-four-digits", title: "Input Otp Four Digits", component: E6 },
  { name: "input-otp-alphanumeric", title: "Input Otp Alphanumeric", component: E7 },
  { name: "input-otp-form", title: "Input Otp Form", component: E8 },
];

export default function Demo() {
  return <ShadcnFrame examples={examples} />;
}
