import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ScanLine,
  Package,
  BarChart3,
  Users,
  Tag,
} from "lucide-react";

const items = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/billing", label: "New Bill", icon: ScanLine },
  { to: "/inventory", label: "Inventory", icon: Package },
  { to: "/reports", label: "Reports", icon: BarChart3 },
  { to: "/customers", label: "Customers", icon: Users },
];

export function AppSidebar() {
  // const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-border bg-sidebar md:flex">
      <div className="p-6">
        <div className="mb-8 flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-lg bg-brand text-brand-foreground shadow-sm">
            <Tag className="size-4" strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <p className="text-base font-semibold tracking-tight">
              TallySpurt
            </p>
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
              Retail Console
            </p>
          </div>
        </div>
        <nav className="space-y-1">
          {items.map((item) => {
            // const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-surface text-brand shadow-sm ring-1 ring-black/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-surface/60"
                  }`
                }
              >
                <Icon className="size-4" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
      <div className="mt-auto border-t border-border p-6">
        <div className="flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-full bg-muted text-xs font-bold outline-1 -outline-offset-1 outline-black/5">
            RK
          </div>
          <div className="text-xs font-medium leading-tight">
            <p>Rajesh Kumar</p>
            <p className="text-muted-foreground">Store Manager</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
