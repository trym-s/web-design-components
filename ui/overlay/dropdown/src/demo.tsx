import { useState } from "react";
import { Dropdown } from "./dropdown";

const VISIBILITY = [
  { value: "private", label: "Only me", hint: "default" },
  { value: "team", label: "Anyone at Acme" },
  { value: "link", label: "Anyone with the link" },
  { value: "public", label: "Public on the web" },
];

export default function DropdownDemo() {
  const [visibility, setVisibility] = useState("private");

  return (
    <div className="grid w-full place-items-center pb-[160px]">
      <Dropdown
        label="Visibility"
        items={VISIBILITY}
        value={visibility}
        onChange={setVisibility}
        defaultOpen
      />
    </div>
  );
}
