import { UserPlus } from "lucide-react";

export default function SalespersonHeader({ onCreate }) {
  return (
    <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Salespersons
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage the people who can access and operate your shop.
        </p>
      </div>

      <button
        type="button"
        onClick={onCreate}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-foreground/90 sm:w-auto"
      >
        <UserPlus className="size-4" />
        Add Salesperson
      </button>
    </header>
  );
}
