import { Link } from "react-router-dom";
import { formatINR } from "../../../lib/storeHelpers.jsx";

export default function RecentBills({ bills }) {
  return (
    <section className="card-soft min-w-0 p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h3 className="text-base font-semibold">Recent Bills</h3>

        <Link
          to="/reports"
          className="shrink-0 text-xs font-medium text-brand hover:underline"
        >
          View All
        </Link>
      </div>

      {bills.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No bills yet — create your first invoice.
        </p>
      ) : (
        <div className="space-y-1">
          {bills.map((bill) => (
            <div
              key={bill.id}
              className="flex flex-col gap-2 rounded-xl px-3 py-3 transition-colors hover:bg-surface-muted sm:flex-row sm:items-center sm:justify-between sm:px-4"
            >
              <div className="min-w-0">
                <p className="truncate font-mono text-xs text-muted-foreground">
                  {bill.id}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {new Date(bill.date).toLocaleString("en-IN")} · {bill.payment}
                </p>
              </div>

              <p className="shrink-0 font-mono text-sm font-medium">
                {formatINR(bill.total)}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
