import { formatINR } from "../../../lib/storeHelpers.jsx";

import DiscountSelector from "./DiscountSelector.jsx";
import PaymentMethodSelector from "./PaymentMethodSelector.jsx";

export default function OrderSummary({
  subtotal,
  discount,
  total,
  discountMode,
  discountPercent,
  discountAmount,
  payment,
  onDiscountModeChange,
  onDiscountPercentChange,
  onDiscountAmountChange,
  onPaymentChange,
  onCompleteSale,
  onClear,
}) {
  return (
    <div className="card-soft p-6">
      <h2 className="mb-6 text-sm font-semibold">Order Summary</h2>

      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>

          <span className="font-mono">{formatINR(subtotal)}</span>
        </div>

        <DiscountSelector
          mode={discountMode}
          discountPercent={discountPercent}
          discountAmount={discountAmount}
          onModeChange={onDiscountModeChange}
          onPercentChange={onDiscountPercentChange}
          onAmountChange={onDiscountAmountChange}
        />

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Discount applied</span>

          <span className="font-mono text-brand">- {formatINR(discount)}</span>
        </div>

        <div className="flex items-baseline justify-between border-t border-border pt-4">
          <span className="text-sm font-semibold">Total Payable</span>

          <span className="font-mono text-2xl font-medium tracking-tight">
            {formatINR(total)}
          </span>
        </div>
      </div>

      <PaymentMethodSelector
        payment={payment}
        onPaymentChange={onPaymentChange}
      />

      <div className="mt-6 space-y-3">
        <button
          type="button"
          onClick={onCompleteSale}
          className="w-full rounded-[12px] bg-foreground py-3 text-sm font-semibold text-background shadow-sm hover:bg-foreground/90"
        >
          Collect Payment
        </button>

        <button
          type="button"
          onClick={onClear}
          className="w-full rounded-[12px] bg-background py-3 text-sm font-semibold text-foreground ring-1 ring-border hover:bg-surface-muted"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
