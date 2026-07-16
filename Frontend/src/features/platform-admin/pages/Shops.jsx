import { useState } from "react";
import { Link } from "react-router-dom";

import { ArrowRight, Plus, Search, Store } from "lucide-react";

const shops = [
  {
    id: "1",
    name: "Vanya Boutique",
    owner: "Rajesh Kumar",
    email: "rajesh@vanya.in",
    businessType: "Clothing Retail",
    createdAt: "14 Jul 2026",
    status: "active",
  },
  {
    id: "2",
    name: "Urban Style",
    owner: "Amit Sharma",
    email: "amit@urbanstyle.in",
    businessType: "Clothing Retail",
    createdAt: "10 Jul 2026",
    status: "active",
  },
  {
    id: "3",
    name: "Classic Menswear",
    owner: "Vikram Patil",
    email: "vikram@classic.in",
    businessType: "Clothing Retail",
    createdAt: "02 Jul 2026",
    status: "suspended",
  },
];

export default function Shops() {
  const [search, setSearch] = useState("");

  const filteredShops = shops.filter((shop) => {
    const query = search.toLowerCase();

    return (
      shop.name.toLowerCase().includes(query) ||
      shop.owner.toLowerCase().includes(query) ||
      shop.email.toLowerCase().includes(query)
    );
  });

  return (
    <div>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#E97D1A]">
            Businesses
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-zinc-950 sm:text-4xl">
            Shops
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            View and manage businesses registered on TallySpurt.
          </p>
        </div>

        <Link
          to="/admin/shops/create"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-950 px-5 py-3 text-sm font-semibold text-white"
        >
          <Plus className="size-4" />
          Create Shop
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-[24px] border border-zinc-200 bg-white">
        {/* Search */}

        <div className="border-b border-zinc-200 p-5">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search shops, owners or email..."
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#E97D1A] focus:bg-white focus:ring-4 focus:ring-orange-500/10"
            />
          </div>
        </div>

        {/* Desktop table */}

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50/70 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                <th className="px-6 py-4">Shop</th>
                <th className="px-6 py-4">Owner</th>
                <th className="px-6 py-4">Business Type</th>
                <th className="px-6 py-4">Created</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4" />
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-100">
              {filteredShops.map((shop) => (
                <tr key={shop.id} className="transition hover:bg-zinc-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="grid size-9 place-items-center rounded-xl bg-orange-50 text-[#E97D1A]">
                        <Store className="size-4" />
                      </div>

                      <p className="text-sm font-semibold text-zinc-900">
                        {shop.name}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <p className="text-sm text-zinc-700">{shop.owner}</p>

                    <p className="mt-0.5 text-xs text-zinc-400">{shop.email}</p>
                  </td>

                  <td className="px-6 py-4 text-sm text-zinc-500">
                    {shop.businessType}
                  </td>

                  <td className="px-6 py-4 text-sm text-zinc-500">
                    {shop.createdAt}
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge status={shop.status} />
                  </td>

                  <td className="px-6 py-4 text-right">
                    <Link
                      to={`/admin/shops/${shop.id}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#E97D1A]"
                    >
                      View
                      <ArrowRight className="size-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile */}

        <div className="divide-y divide-zinc-100 md:hidden">
          {filteredShops.map((shop) => (
            <Link
              key={shop.id}
              to={`/admin/shops/${shop.id}`}
              className="block p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-zinc-900">{shop.name}</p>

                  <p className="mt-1 text-xs text-zinc-500">{shop.owner}</p>
                </div>

                <StatusBadge status={shop.status} />
              </div>

              <p className="mt-3 text-xs text-zinc-400">
                {shop.businessType} · {shop.createdAt}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  return (
    <span
      className={
        status === "active"
          ? "rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase text-emerald-600"
          : "rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-bold uppercase text-red-500"
      }
    >
      {status}
    </span>
  );
}
