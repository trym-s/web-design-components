import { FloatingLabelInput } from "./floating-label";

export default function FloatingLabelDemo() {
  return (
    <div className="flex justify-center">
      <div className="flex w-[320px] flex-col gap-3">
        <FloatingLabelInput
          label="Account reference"
          hint="Printed on the statement header."
          maxLength={16}
        />
        <FloatingLabelInput label="Work email" type="email" defaultValue="nadia@northwind.co" required />
        <FloatingLabelInput label="Tax ID" defaultValue="GB-00" invalid hint="Enter the full 9-digit number." />
      </div>
    </div>
  );
}
