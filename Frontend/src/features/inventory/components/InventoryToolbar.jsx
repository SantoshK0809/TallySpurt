import { Search } from "lucide-react";

export default function InventoryToolbar({
  query,
  onQueryChange,
  categories,
  filter,
  onFilterChange,
}) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <div className="card-soft flex min-w-65 flex-1 items-center gap-3 p-1.5 px-4">
        <Search className="size-4 text-muted-foreground" />

        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search by name or SKU…"
          className="w-full bg-transparent py-2 text-sm focus:outline-none"
        />
      </div>

      <div className="flex flex-wrap gap-1.5">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onFilterChange(category)}
            className={
              "rounded-full px-3 py-1.5 text-xs font-medium ring-1 transition-colors " +
              (filter === category
                ? "bg-foreground text-background ring-foreground"
                : "bg-background text-muted-foreground ring-border hover:bg-surface-muted")
            }
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
