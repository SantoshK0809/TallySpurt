import { formatINR } from "../../../lib/storeHelpers.jsx";

export default function PeriodBreakdown({ data }) {
  return (
    <div className="card-soft p-6">
      <h3 className="mb-4 text-base font-semibold">Period Breakdown</h3>

      <div className="max-h-80 overflow-y-auto">
        <table className="w-full text-left text-sm">
          <thead className="sticky top-0 bg-surface">
            <tr className="border-b border-border">
              <th className="py-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Period
              </th>

              <th className="py-2 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Bills
              </th>

              <th className="py-2 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Revenue
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border/60">
            {[...data].reverse().map((row) => (
              <tr key={row.key}>
                <td className="py-2.5">{row.label}</td>

                <td className="py-2.5 text-right font-mono">{row.count}</td>

                <td className="py-2.5 text-right font-mono">
                  {formatINR(row.revenue)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
