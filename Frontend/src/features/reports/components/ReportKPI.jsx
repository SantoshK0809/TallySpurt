export default function ReportKPI({ label, value }) {
  return (
    <div className="card-soft p-5">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>

      <p className="mt-3 font-mono text-2xl font-medium tracking-tight">
        {value}
      </p>
    </div>
  );
}
