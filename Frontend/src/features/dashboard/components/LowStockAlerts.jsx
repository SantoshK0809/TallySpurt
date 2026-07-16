import { Link } from "react-router-dom";

export default function LowStockAlerts({ items }) {
  return (
    <section className="card-soft min-w-0 p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h3 className="text-base font-semibold">Low Stock Alerts</h3>

        <Link
          to="/inventory"
          className="shrink-0 text-xs font-medium text-brand hover:underline"
        >
          Manage
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          All items are above their reorder level.
        </p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.sku}
              className="flex flex-col gap-3 rounded-xl bg-surface-muted px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{item.name}</p>

                <p className="mt-0.5 truncate font-mono text-[11px] text-muted-foreground">
                  {item.sku} · {item.size} · {item.color}
                </p>
              </div>

              <span className="w-fit shrink-0 rounded-md bg-danger/10 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-danger">
                {item.stock} left
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
