const DISCOUNT_MODES = [
  {
    value: "percent",
    label: "Percentage %",
  },
  {
    value: "amount",
    label: "Flat ₹ amount",
  },
];

export default function DiscountSelector({
  mode,
  discountPercent,
  discountAmount,
  onModeChange,
  onPercentChange,
  onAmountChange,
}) {
  return (
    <div>
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        Discount type
      </p>

      <div className="grid grid-cols-2 gap-2">
        {DISCOUNT_MODES.map((discountMode) => (
          <button
            key={discountMode.value}
            type="button"
            onClick={() => onModeChange(discountMode.value)}
            className={
              "rounded-[10px] py-2 text-xs font-semibold ring-1 transition-colors " +
              (mode === discountMode.value
                ? "bg-foreground text-background ring-foreground"
                : "bg-background text-foreground ring-border hover:bg-surface-muted")
            }
          >
            {discountMode.label}
          </button>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between text-sm">
        <label className="text-muted-foreground" htmlFor="discount">
          {mode === "percent" ? "Discount %" : "Amount ₹"}
        </label>

        {mode === "percent" ? (
          <input
            id="discount"
            type="number"
            min={0}
            max={100}
            value={discountPercent}
            onChange={(event) =>
              onPercentChange(
                Math.max(0, Math.min(100, Number(event.target.value) || 0)),
              )
            }
            className="w-24 rounded-md border border-border bg-background px-2 py-1 text-right font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        ) : (
          <input
            id="discount"
            type="number"
            min={0}
            value={discountAmount}
            onChange={(event) =>
              onAmountChange(Math.max(0, Number(event.target.value) || 0))
            }
            className="w-24 rounded-md border border-border bg-background px-2 py-1 text-right font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        )}
      </div>
    </div>
  );
}
