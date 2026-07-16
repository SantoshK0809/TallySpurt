import { Link } from "react-router-dom";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { formatINR } from "../../../lib/storeHelpers.jsx";

export default function SalesChart({ data }) {
  return (
    <section className="card-soft mt-6 p-4 sm:mt-8 sm:p-6">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold">Sales — Last 14 days</h2>

          <p className="text-xs text-muted-foreground">Daily revenue trend</p>
        </div>

        <Link
          to="/reports"
          className="w-fit text-xs font-medium text-brand hover:underline"
        >
          View full report →
        </Link>
      </div>

      <div className="h-56 w-full sm:h-64 lg:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: -15,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--brand)" stopOpacity={0.35} />

                <stop offset="100%" stopColor="var(--brand)" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
              vertical={false}
            />

            <XAxis
              dataKey="date"
              stroke="var(--muted-foreground)"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              minTickGap={20}
            />

            <YAxis
              stroke="var(--muted-foreground)"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              width={50}
              tickFormatter={(value) =>
                value >= 1000 ? `₹${(value / 1000).toFixed(0)}k` : `₹${value}`
              }
            />

            <Tooltip
              contentStyle={{
                borderRadius: 12,
                border: "1px solid var(--border)",
                fontSize: 12,
              }}
              formatter={(value) => [formatINR(value), "Revenue"]}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="var(--brand)"
              strokeWidth={2}
              fill="url(#revenueGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
