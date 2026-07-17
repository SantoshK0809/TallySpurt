import { formatINR } from "../../../lib/storeHelpers.jsx";

export default function BillingHeader({ total }) {
  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">New Checkout</h1>

        <p className="mt-1 max-w-[52ch] text-sm text-muted-foreground">
          Scan item barcodes / QR or type the SKU manually to build the invoice.
        </p>
      </div>

      <div className="text-right">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Current Total
        </p>

        <p className="font-mono text-2xl font-medium text-brand">
          {formatINR(total)}
        </p>
      </div>
    </header>
  );
}
