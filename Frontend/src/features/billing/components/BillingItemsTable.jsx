import BillingEmptyState from "./BillingEmptyState.jsx";
import BillingItemRow from "./BillingItemRow.jsx";

export default function BillingItemsTable({
  items,
  onQuantityChange,
  onRemove,
}) {
  return (
    <div className="card-soft overflow-hidden p-0">
      {items.length === 0 ? (
        <BillingEmptyState />
      ) : (
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border bg-surface-muted/40">
              <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Item
              </th>

              <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Size/Color
              </th>

              <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Qty
              </th>

              <th className="px-6 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Amount
              </th>

              <th className="px-3 py-4" />
            </tr>
          </thead>

          <tbody className="divide-y divide-border/60">
            {items.map((item) => (
              <BillingItemRow
                key={item.sku}
                item={item}
                onQuantityChange={onQuantityChange}
                onRemove={onRemove}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
