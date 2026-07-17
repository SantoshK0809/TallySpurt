import { formatINR } from "../../../lib/storeHelpers.jsx";

export default function TopSellingItems({ items }) {
  return (
    <div className="card-soft p-6">
      <h3 className="mb-4 text-base font-semibold">
        Top Selling Items
      </h3>

      <div className="space-y-3">
        {items.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No sales in this range.
          </p>
        )}

        {items.map((item, index) => (
          <div
            key={item.sku}
            className="flex items-center justify-between rounded-xl bg-surface-muted px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-6 place-items-center rounded-full bg-background text-[11px] font-bold ring-1 ring-border">
                {index + 1}
              </span>

              <div>
                <p className="text-sm font-medium">
                  {item.name}
                </p>

                <p className="font-mono text-[11px] text-muted-foreground">
                  {item.sku} · {item.qty} units
                </p>
              </div>
            </div>

            <p className="font-mono text-sm font-medium">
              {formatINR(item.revenue)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}