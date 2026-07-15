import { Bell, Menu, ShieldCheck } from "lucide-react";

export default function AdminHeader({onMenuClick}) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center border-b border-zinc-200 bg-white/90 px-5 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1500px] items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-zinc-900">
            Platform Administration
          </p>

          <p className="mt-0.5 hidden text-xs text-zinc-500 sm:block">
            Manage shops and platform access.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="grid size-10 place-items-center rounded-xl border border-zinc-200 bg-white text-zinc-500 transition hover:bg-zinc-50"
          >
            <Bell className="size-[18px]" />
          </button>

          <div className="hidden items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 py-2 sm:flex">
            <ShieldCheck className="size-4 text-[#E97D1A]" />

            <span className="text-xs font-semibold text-zinc-700">
              platformAdmin
            </span>
          </div>

          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open navigation menu"
            className="grid size-10 place-items-center rounded-xl border border-zinc-200 bg-white text-zinc-500 lg:hidden"
          >
            <Menu className="size-[18px]" />
          </button>
        </div>
      </div>
    </header>
  );
}