import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Tag } from "lucide-react";

import { navigationItems } from "./navigation.config";

export default function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur md:hidden">
        <div className="flex items-center gap-3">
          <div className="grid size-8 place-items-center rounded-lg bg-brand text-brand-foreground">
            <Tag className="size-4" />
          </div>

          <div>
            <p className="text-sm font-semibold">TallySpurt</p>

            <p className="text-[9px] uppercase tracking-widest text-muted-foreground">
              Retail Console
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="grid size-10 place-items-center rounded-lg border border-border hover:bg-muted"
          aria-label="Open navigation"
        >
          <Menu className="size-5" />
        </button>
      </header>

      {/* Overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px] md:hidden"
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[280px] max-w-[85vw] flex-col border-r border-border bg-sidebar shadow-xl transition-transform duration-300 md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-5">
          <div className="flex items-center gap-3">
            <div className="grid size-8 place-items-center rounded-lg bg-brand text-brand-foreground">
              <Tag className="size-4" />
            </div>

            <p className="font-semibold">TallySpurt</p>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="grid size-9 place-items-center rounded-lg hover:bg-muted"
            aria-label="Close navigation"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-surface text-brand shadow-sm"
                      : "text-muted-foreground hover:bg-surface/60 hover:text-foreground"
                  }`
                }
              >
                <Icon className="size-5 shrink-0" />

                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3">
            <div className="grid size-9 shrink-0 place-items-center rounded-full bg-muted text-xs font-bold">
              RK
            </div>

            <div className="min-w-0 text-xs font-medium">
              <p className="truncate">Rajesh Kumar</p>

              <p className="truncate text-muted-foreground">Store Manager</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
