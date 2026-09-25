import { AvatarGroup } from "./avatar-group-hover";

const PEOPLE = [
  { initials: "AM", tone: "bg-chart-1" },
  { initials: "JL", tone: "bg-chart-2" },
  { initials: "RK", tone: "bg-chart-3" },
  { initials: "SO", tone: "bg-chart-4" },
  { initials: "DT", tone: "bg-chart-5" },
  { initials: "NV", tone: "bg-primary" },
];

const avatar = "grid size-7 place-items-center rounded-full text-[10px] font-semibold ring-2 ring-background";

export default function Demo() {
  const items = [
    ...PEOPLE.map(({ initials, tone }) => (
      <span className={`${avatar} ${tone} text-primary-foreground`}>{initials}</span>
    )),
    <span className={`${avatar} bg-muted text-muted-foreground`}>+2</span>,
  ];

  return (
    <div className="flex h-[260px] w-[296px] items-center justify-center rounded-xl bg-muted/40 p-4">
      <AvatarGroup items={items} itemClassName="-ml-1.5 first:ml-0" />
    </div>
  );
}
