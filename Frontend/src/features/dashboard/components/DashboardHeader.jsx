import { Link } from "react-router-dom";
import { ScanLine } from "lucide-react";

export default function DashboardHeader() {
  return (
    <header className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Dashboard
        </h1>

        <p className="mt-1 max-w-xl text-sm text-muted-foreground">
          Snapshot of today's sales, inventory health and store performance.
        </p>
      </div>

      <Link
        to="/billing"
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-semibold text-background shadow-sm transition-colors hover:bg-foreground/90 sm:w-auto"
      >
        <ScanLine className="size-4" />

        <span>Start New Bill</span>
      </Link>
    </header>
  );
}