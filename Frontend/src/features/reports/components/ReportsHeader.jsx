import { Download } from "lucide-react";

const REPORT_MODES = [
  {
    value: "daily",
    label: "Daily (30d)",
  },
  {
    value: "monthly",
    label: "Monthly (12m)",
  },
];

export default function ReportsHeader({
  mode,
  onModeChange,
  onExport,
}) {
  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Sales Reports
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Track revenue, bills and best sellers over time.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="inline-flex rounded-xl bg-surface-muted p-1 ring-1 ring-black/5">
          {REPORT_MODES.map((reportMode) => (
            <button
              key={reportMode.value}
              onClick={() => onModeChange(reportMode.value)}
              className={
                "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors " +
                (mode === reportMode.value
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground")
              }
            >
              {reportMode.label}
            </button>
          ))}
        </div>

        <button
          onClick={onExport}
          className="inline-flex items-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-semibold text-background hover:bg-foreground/90"
        >
          <Download className="size-4" />
          Export CSV
        </button>
      </div>
    </header>
  );
}