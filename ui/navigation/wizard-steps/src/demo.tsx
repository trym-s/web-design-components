import { useState } from "react";
import { WizardSteps } from "./wizard-steps";

const row =
  "flex items-center justify-between gap-3 rounded-[calc(var(--radius)-1px)] bg-muted px-3 py-2 text-[12.5px]";

const steps = [
  {
    id: "plan",
    label: "Choose a plan",
    content: (
      <ul className="space-y-1">
        {[
          ["Starter", "3 seats"],
          ["Team", "12 seats"],
          ["Scale", "unlimited"],
        ].map(([name, seats]) => (
          <li key={name} className={row}>
            <span className="text-foreground">{name}</span>
            <span className="text-muted-foreground">{seats}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: "billing",
    label: "Billing details",
    content: (
      <ul className="space-y-1">
        {[
          ["Card", "•••• 4242"],
          ["Invoice email", "billing@acme.co"],
          ["VAT number", "Not set"],
        ].map(([field, value]) => (
          <li key={field} className={row}>
            <span className="text-foreground">{field}</span>
            <span className="text-muted-foreground">{value}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: "review",
    label: "Review",
    content: (
      <ul className="space-y-1">
        {[
          ["Team", "12 seats"],
          ["Billed", "yearly"],
          ["Charged to", "•••• 4242"],
        ].map(([field, value]) => (
          <li key={field} className={row}>
            <span className="text-foreground">{field}</span>
            <span className="text-muted-foreground">{value}</span>
          </li>
        ))}
      </ul>
    ),
  },
];

export default function WizardStepsDemo() {
  const [index, setIndex] = useState(1);
  const [done, setDone] = useState(false);

  return (
    <div className="mx-auto w-full max-w-[420px]">
      <WizardSteps
        steps={steps}
        index={index}
        complete={done}
        onIndexChange={(next) => {
          setDone(false);
          setIndex(next);
        }}
        onComplete={() => setDone(true)}
      />
    </div>
  );
}
