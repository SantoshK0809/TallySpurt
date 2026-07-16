export default function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  variant = "default",
}) {
  const iconClassName = {
    default: "text-muted-foreground",
    accent: "text-brand",
    danger: "text-danger",
  };

  return (
    <article className="card-soft min-w-0 p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground sm:text-[11px]">
          {label}
        </p>

        <Icon
          className={`size-4 shrink-0 ${
            iconClassName[variant] ?? iconClassName.default
          }`}
        />
      </div>

      <p className="mt-3 truncate font-mono text-xl font-medium tracking-tight sm:text-2xl">
        {value}
      </p>

      <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
    </article>
  );
}
