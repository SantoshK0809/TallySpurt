export default function InventoryStatusBadge({ stock, lowAt }) {
  const isOutOfStock = stock === 0;
  const isLowStock = stock <= lowAt;

  if (isOutOfStock) {
    return (
      <span className="rounded bg-danger/10 px-2 py-0.5 text-[10px] font-bold uppercase text-danger">
        Out
      </span>
    );
  }

  if (isLowStock) {
    return (
      <span className="rounded bg-warning/15 px-2 py-0.5 text-[10px] font-bold uppercase text-warning">
        Low
      </span>
    );
  }

  return (
    <span className="rounded bg-success/10 px-2 py-0.5 text-[10px] font-bold uppercase text-success">
      In Stock
    </span>
  );
}
