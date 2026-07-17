export default function BillingField({
  icon: Icon,
  label,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </label>

      <div className="flex items-center gap-2 rounded-[12px] border border-border bg-background px-3 py-2 focus-within:ring-2 focus-within:ring-brand/30">
        <Icon className="size-4 shrink-0 text-muted-foreground" />

        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent text-sm focus:outline-none"
        />
      </div>
    </div>
  );
}
