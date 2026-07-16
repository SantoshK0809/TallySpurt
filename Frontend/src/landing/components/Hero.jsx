import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Package,
  Receipt,
  ScanLine,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-orange-100/60 blur-3xl" />

      <div className="mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-6 sm:pt-20 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-semibold text-[#D96F10]">
            <Sparkles className="size-3.5" />
            Built for modern Indian clothing stores
          </div>

          <h1 className="mt-7 text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-zinc-950 sm:text-5xl md:text-6xl lg:text-7xl">
            Run your clothing store
            <span className="block text-[#E97D1A]">
              from one simple console.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg">
            Manage billing, inventory, customers, sales reports and your team
            without juggling spreadsheets and disconnected tools.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-zinc-950 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-zinc-950/10 transition hover:-translate-y-0.5 hover:bg-zinc-800"
            >
              Book a demo
              <ArrowRight className="size-4" />
            </a>

            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-2xl border border-zinc-200 bg-white px-6 py-3.5 text-sm font-semibold text-zinc-800 transition hover:border-zinc-300 hover:bg-zinc-50"
            >
              Sign in to your store
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-zinc-500 sm:text-sm">
            <TrustItem text="No public registration" />
            <TrustItem text="Role-based staff access" />
            <TrustItem text="Built for Indian retail" />
          </div>
        </div>

        <div className="relative mx-auto mt-14 max-w-6xl lg:mt-20">
          <div className="absolute inset-x-10 bottom-0 -z-10 h-32 bg-orange-200/40 blur-3xl" />

          <div className="overflow-hidden rounded-[24px] border border-zinc-200 bg-white shadow-[0_30px_80px_rgba(24,24,27,0.12)] sm:rounded-[32px]">
            <div className="flex items-center gap-2 border-b border-zinc-200 bg-zinc-50/80 px-4 py-3 sm:px-6">
              <div className="size-2.5 rounded-full bg-zinc-300" />
              <div className="size-2.5 rounded-full bg-zinc-300" />
              <div className="size-2.5 rounded-full bg-zinc-300" />

              <div className="mx-auto hidden rounded-lg border border-zinc-200 bg-white px-16 py-1.5 text-[10px] text-zinc-400 sm:block">
                app.tallyspurt.com
              </div>
            </div>

            <div className="grid bg-[#F8F7F5] md:grid-cols-[190px_1fr]">
              <div className="hidden border-r border-zinc-200 bg-white p-5 md:block">
                <div className="mb-8 flex items-center gap-2">
                  <div className="grid size-8 place-items-center rounded-lg bg-[#E97D1A] text-white">
                    <ScanLine className="size-4" />
                  </div>
                  <span className="text-sm font-semibold">TallySpurt</span>
                </div>

                {["Dashboard", "New Bill", "Inventory", "Reports", "Customers"].map(
                  (item, index) => (
                    <div
                      key={item}
                      className={`mb-2 rounded-xl px-3 py-2.5 text-xs font-medium ${
                        index === 0
                          ? "bg-orange-50 text-[#E97D1A]"
                          : "text-zinc-500"
                      }`}
                    >
                      {item}
                    </div>
                  ),
                )}
              </div>

              <div className="p-4 sm:p-6 lg:p-8">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xl font-semibold tracking-tight sm:text-2xl">
                      Dashboard
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">
                      Your store at a glance.
                    </p>
                  </div>

                  <div className="hidden rounded-xl bg-zinc-950 px-4 py-2 text-xs font-semibold text-white sm:block">
                    + New Bill
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
                  <PreviewStat
                    icon={TrendingUp}
                    label="Today's Revenue"
                    value="₹42,180"
                  />
                  <PreviewStat
                    icon={Receipt}
                    label="Bills Today"
                    value="18"
                  />
                  <PreviewStat
                    icon={Package}
                    label="Inventory"
                    value="248"
                  />
                  <PreviewStat
                    icon={ScanLine}
                    label="Low Stock"
                    value="3"
                  />
                </div>

                <div className="mt-4 grid gap-4 lg:grid-cols-[1.5fr_1fr]">
                  <div className="min-h-48 rounded-2xl border border-zinc-200 bg-white p-5">
                    <p className="text-xs font-semibold">Sales Overview</p>

                    <div className="mt-8 flex h-24 items-end gap-2">
                      {[35, 52, 42, 68, 58, 78, 65, 85, 72, 94, 80, 100].map(
                        (height, index) => (
                          <div
                            key={index}
                            className="flex-1 rounded-t-md bg-orange-100"
                            style={{ height: `${height}%` }}
                          />
                        ),
                      )}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-zinc-200 bg-white p-5">
                    <p className="text-xs font-semibold">Recent Activity</p>

                    <div className="mt-4 space-y-3">
                      {["Invoice created", "Stock updated", "Customer added"].map(
                        (item) => (
                          <div
                            key={item}
                            className="flex items-center gap-3 border-b border-zinc-100 pb-3 last:border-0"
                          >
                            <div className="size-7 rounded-lg bg-orange-50" />
                            <div>
                              <p className="text-[10px] font-medium">{item}</p>
                              <p className="text-[9px] text-zinc-400">
                                Just now
                              </p>
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustItem({ text }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <Check className="size-3.5 text-[#E97D1A]" />
      {text}
    </span>
  );
}

function PreviewStat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <p className="text-[9px] font-semibold uppercase tracking-wider text-zinc-400">
          {label}
        </p>
        <Icon className="size-3.5 text-[#E97D1A]" />
      </div>
      <p className="mt-3 text-lg font-semibold sm:text-xl">{value}</p>
    </div>
  );
}