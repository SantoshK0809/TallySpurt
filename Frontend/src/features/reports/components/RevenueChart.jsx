import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

import { formatINR } from "../../../lib/storeHelpers.jsx";

export default function RevenueChart({ data, mode }) {
  return (
    <section className="card-soft mt-6 p-6">
      <h2 className="mb-4 text-base font-semibold">
        {mode === "daily" ? "Daily Revenue" : "Monthly Revenue"}
      </h2>

      <div className="h-72">
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
              vertical={false}
            />

            <XAxis
              dataKey="label"
              stroke="var(--muted-foreground)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              interval={mode === "daily" ? 2 : 0}
            />

            <YAxis
              stroke="var(--muted-foreground)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) =>
                "₹" + (value / 1000).toFixed(0) + "k"
              }
            />

            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid var(--border)",
                fontSize: 12,
              }}
              formatter={(value) => [
                formatINR(value),
                "Revenue",
              ]}
            />

            <Bar
              dataKey="revenue"
              radius={[6, 6, 0, 0]}
            >
              {data.map((item) => (
                <Cell
                  key={item.key}
                  fill="var(--brand)"
                  fillOpacity={0.85}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}