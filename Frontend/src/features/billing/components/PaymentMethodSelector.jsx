const PAYMENT_METHODS = ["UPI", "Card", "Cash"];

export default function PaymentMethodSelector({ payment, onPaymentChange }) {
  return (
    <div className="mt-6">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        Payment Method
      </p>

      <div className="grid grid-cols-3 gap-2">
        {PAYMENT_METHODS.map((method) => (
          <button
            key={method}
            type="button"
            onClick={() => onPaymentChange(method)}
            className={
              "rounded-[10px] py-2 text-xs font-semibold ring-1 transition-colors " +
              (payment === method
                ? "bg-foreground text-background ring-foreground"
                : "bg-background text-foreground ring-border hover:bg-surface-muted")
            }
          >
            {method}
          </button>
        ))}
      </div>
    </div>
  );
}
