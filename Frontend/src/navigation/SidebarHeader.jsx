import { Store } from "lucide-react";

export default function SidebarHeader({ shop }) {
  return (
    <div className="flex items-center gap-3">
      {shop?.logo ? (
        <img
          src={shop.logo}
          alt={`${shop.name} logo`}
          className="size-10 shrink-0 rounded-lg object-cover"
        />
      ) : (
        <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand text-brand-foreground">
          <Store className="size-5" />
        </div>
      )}

      <div className="min-w-0">
        <p className="truncate text-sm font-semibold">
          {shop?.name || "Your Shop"}
        </p>

        <p className="truncate text-[10px] uppercase tracking-widest text-muted-foreground">
          TallySpurt
        </p>
      </div>
    </div>
  );
}
