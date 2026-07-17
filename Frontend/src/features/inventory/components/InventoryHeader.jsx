import { Plus } from "lucide-react";

export default function InventoryHeader({ onAddItem }) {
  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Inventory</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage SKUs, sizes, pricing and stock thresholds.
        </p>
      </div>

      <button
        onClick={onAddItem}
        className="inline-flex items-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-semibold text-background shadow-sm hover:bg-foreground/90"
      >
        <Plus className="size-4" />
        Add Item
      </button>
    </header>
  );
}
