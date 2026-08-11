/* Use when: a product needs expressive area, line, bar, pie, or radar charts with ordered-dither texture, compact legends, selection, and tooltips. */

"use client";

import {
  Area,
  AreaChart,
  Tooltip,
  XAxis,
  YAxis,
} from "./registry/dither-kit";

const data = [
  { month: "Jan", sales: 186 },
  { month: "Feb", sales: 240 },
  { month: "Mar", sales: 198 },
];

const config = {
  sales: { label: "Sales", color: "blue" as const },
};

export default function DitherKitReference() {
  return (
    <div className="h-64 w-full">
      <AreaChart data={data} config={config} bloom="low">
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip labelKey="month" />
        <Area dataKey="sales" variant="gradient" />
      </AreaChart>
    </div>
  );
}
