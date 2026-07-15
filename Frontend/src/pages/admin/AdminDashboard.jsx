import { Link } from "react-router-dom";

import {
  ArrowRight,
  Building2,
  CircleCheck,
  CirclePause,
  Plus,
  Store,
  Users,
} from "lucide-react";

const stats = [
  {
    label: "Total Shops",
    value: "12",
    description: "Registered businesses",
    icon: Store,
  },
  {
    label: "Active Shops",
    value: "10",
    description: "Currently active",
    icon: CircleCheck,
  },
  {
    label: "Suspended",
    value: "2",
    description: "Access disabled",
    icon: CirclePause,
  },
  {
    label: "Shop Owners",
    value: "12",
    description: "Primary owner accounts",
    icon: Users,
  },
];

const recentShops = [
  {
    id: "1",
    name: "Vanya Boutique",
    owner: "Rajesh Kumar",
    email: "rajesh@vanya.in",
    type: "Clothing Retail",
    status: "active",
  },
  {
    id: "2",
    name: "Urban Style",
    owner: "Amit Sharma",
    email: "amit@urbanstyle.in",
    type: "Clothing Retail",
    status: "active",
  },
  {
    id: "3",
    name: "Classic Menswear",
    owner: "Vikram Patil",
    email: "vikram@classic.in",
    type: "Clothing Retail",
    status: "suspended",
  },
];

export default function AdminDashboard() {
  return (
    <div>
      {/* Heading */}

      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#E97D1A]">
            Overview
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-zinc-950 sm:text-4xl">
            Platform Dashboard
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Manage businesses and platform access from one place.
          </p>
        </div>

        <Link
          to="/admin/shops/create"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
        >
          <Plus className="size-4" />
          Create Shop
        </Link>
      </div>

      {/* Stats */}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-[22px] border border-zinc-200 bg-white p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-zinc-500">
                    {stat.label}
                  </p>

                  <p className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">
                    {stat.value}
                  </p>
                </div>

                <div className="grid size-10 place-items-center rounded-xl bg-orange-50 text-[#E97D1A]">
                  <Icon className="size-[18px]" />
                </div>
              </div>

              <p className="mt-2 text-xs text-zinc-400">{stat.description}</p>
            </div>
          );
        })}
      </div>

      {/* Quick action */}

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_2fr]">
        <div className="rounded-[24px] bg-zinc-950 p-6 text-white">
          <div className="grid size-11 place-items-center rounded-xl bg-white/10">
            <Building2 className="size-5 text-orange-400" />
          </div>

          <h2 className="mt-6 text-xl font-semibold">Onboard a new business</h2>

          <p className="mt-2 text-sm leading-6 text-zinc-400">
            Create the shop workspace and its primary owner account.
          </p>

          <Link
            to="/admin/shops/create"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-orange-400 transition hover:text-orange-300"
          >
            Start onboarding
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Recent shops */}

        <div className="overflow-hidden rounded-[24px] border border-zinc-200 bg-white">
          <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-5">
            <div>
              <h2 className="font-semibold text-zinc-900">
                Recently Added Shops
              </h2>

              <p className="mt-1 text-xs text-zinc-500">
                Latest businesses registered on the platform.
              </p>
            </div>

            <Link
              to="/admin/shops"
              className="text-xs font-semibold text-[#E97D1A]"
            >
              View all
            </Link>
          </div>

          <div className="divide-y divide-zinc-100">
            {recentShops.map((shop) => (
              <Link
                key={shop.id}
                to={`/admin/shops/${shop.id}`}
                className="flex items-center gap-4 px-6 py-4 transition hover:bg-zinc-50"
              >
                <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-zinc-100 text-zinc-600">
                  <Store className="size-[18px]" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-zinc-900">
                    {shop.name}
                  </p>

                  <p className="mt-0.5 truncate text-xs text-zinc-500">
                    {shop.owner} · {shop.type}
                  </p>
                </div>

                <StatusBadge status={shop.status} />

                <ArrowRight className="hidden size-4 text-zinc-300 sm:block" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const active = status === "active";

  return (
    <span
      className={[
        "rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider",
        active ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500",
      ].join(" ")}
    >
      {status}
    </span>
  );
}
