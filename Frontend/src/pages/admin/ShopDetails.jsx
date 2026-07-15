import { useState } from "react";
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Store,
  User,
  UserRoundCheck,
} from "lucide-react";

import { Link, useParams } from "react-router-dom";

import { toast } from "sonner";

const MOCK_SHOPS = {
  1: {
    id: "1",
    name: "Vanya Boutique",
    businessType: "Clothing Retail",

    email: "contact@vanya.in",
    phone: "+91 98765 43210",

    address: "123 Fashion Street",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411001",

    status: "active",

    createdAt: "14 July 2026",

    owner: {
      name: "Rajesh Kumar",
      email: "rajesh@vanya.in",
      phone: "+91 98765 43210",
      role: "shopOwner",
    },
  },

  2: {
    id: "2",
    name: "Urban Style",
    businessType: "Clothing Retail",

    email: "contact@urbanstyle.in",
    phone: "+91 91234 56789",

    address: "MG Road",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411001",

    status: "active",

    createdAt: "10 July 2026",

    owner: {
      name: "Amit Sharma",
      email: "amit@urbanstyle.in",
      phone: "+91 91234 56789",
      role: "shopOwner",
    },
  },

  3: {
    id: "3",
    name: "Classic Menswear",
    businessType: "Clothing Retail",

    email: "contact@classic.in",
    phone: "+91 99887 76655",

    address: "FC Road",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411004",

    status: "suspended",

    createdAt: "02 July 2026",

    owner: {
      name: "Vikram Patil",
      email: "vikram@classic.in",
      phone: "+91 99887 76655",
      role: "shopOwner",
    },
  },
};

export default function ShopDetails() {
  const { shopId } = useParams();

  const shopData = MOCK_SHOPS[shopId];

  const [status, setStatus] = useState(shopData?.status || "active");

  if (!shopData) {
    return (
      <div className="rounded-[24px] border border-zinc-200 bg-white p-10 text-center">
        <Store className="mx-auto size-8 text-zinc-300" />

        <h1 className="mt-4 text-xl font-semibold text-zinc-900">
          Shop not found
        </h1>

        <p className="mt-2 text-sm text-zinc-500">
          The requested shop does not exist.
        </p>

        <Link
          to="/admin/shops"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#E97D1A]"
        >
          <ArrowLeft className="size-4" />
          Return to shops
        </Link>
      </div>
    );
  }

  function toggleShopStatus() {
    const nextStatus = status === "active" ? "suspended" : "active";

    /*
     * FUTURE:
     *
     * PATCH /api/admin/shops/:shopId/status
     *
     * {
     *   status: nextStatus
     * }
     */

    setStatus(nextStatus);

    toast.success(
      nextStatus === "active"
        ? "Shop access activated."
        : "Shop access suspended.",
    );
  }

  return (
    <div>
      {/* Header */}

      <Link
        to="/admin/shops"
        className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 transition hover:text-zinc-950"
      >
        <ArrowLeft className="size-3.5" />
        Back to shops
      </Link>

      <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-orange-50 text-[#E97D1A]">
            <Store className="size-6" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-semibold tracking-[-0.03em] text-zinc-950">
                {shopData.name}
              </h1>

              <StatusBadge status={status} />
            </div>

            <p className="mt-2 text-sm text-zinc-500">
              {shopData.businessType}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={toggleShopStatus}
          className={
            status === "active"
              ? "rounded-xl border border-red-200 bg-white px-5 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
              : "rounded-xl bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800"
          }
        >
          {status === "active" ? "Suspend Shop" : "Activate Shop"}
        </button>
      </div>

      {/* Content */}

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        {/* Shop Information */}

        <section className="rounded-[24px] border border-zinc-200 bg-white">
          <SectionHeader
            icon={Building2}
            title="Business Information"
            description="Information associated with this shop."
          />

          <div className="grid gap-6 p-6 sm:grid-cols-2">
            <InfoItem
              icon={Store}
              label="Business Name"
              value={shopData.name}
            />

            <InfoItem
              icon={Building2}
              label="Business Type"
              value={shopData.businessType}
            />

            <InfoItem
              icon={Mail}
              label="Business Email"
              value={shopData.email}
            />

            <InfoItem
              icon={Phone}
              label="Business Phone"
              value={shopData.phone}
            />

            <InfoItem
              icon={CalendarDays}
              label="Created"
              value={shopData.createdAt}
            />

            <InfoItem
              icon={ShieldCheck}
              label="Platform Status"
              value={status === "active" ? "Active" : "Suspended"}
            />

            <div className="sm:col-span-2">
              <InfoItem
                icon={MapPin}
                label="Business Address"
                value={`${shopData.address}, ${shopData.city}, ${shopData.state} - ${shopData.pincode}`}
              />
            </div>
          </div>
        </section>

        {/* Owner */}

        <section className="rounded-[24px] border border-zinc-200 bg-white">
          <SectionHeader
            icon={UserRoundCheck}
            title="Primary Shop Owner"
            description="The owner account associated with this business."
          />

          <div className="p-6">
            <div className="flex items-center gap-4">
              <div className="grid size-12 place-items-center rounded-2xl bg-zinc-950 text-sm font-bold text-white">
                {getInitials(shopData.owner.name)}
              </div>

              <div>
                <p className="font-semibold text-zinc-900">
                  {shopData.owner.name}
                </p>

                <span className="mt-1 inline-flex rounded-full bg-orange-50 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-[#E97D1A]">
                  {shopData.owner.role}
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-4 border-t border-zinc-100 pt-5">
              <InfoItem
                icon={Mail}
                label="Email"
                value={shopData.owner.email}
              />

              <InfoItem
                icon={Phone}
                label="Phone"
                value={shopData.owner.phone}
              />

              <InfoItem icon={User} label="Account Role" value="Shop Owner" />
            </div>
          </div>
        </section>
      </div>

      {/* Suspension warning */}

      {status === "suspended" && (
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-5">
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-red-500" />

          <div>
            <p className="text-sm font-semibold text-red-700">
              Shop access is suspended
            </p>

            <p className="mt-1 text-xs leading-5 text-red-600">
              Users belonging to this shop should not be allowed to access
              protected shop functionality while the shop is suspended. This
              restriction must be enforced by the backend.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function SectionHeader({ icon: Icon, title, description }) {
  return (
    <div className="flex items-start gap-3 border-b border-zinc-200 px-6 py-5">
      <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-orange-50 text-[#E97D1A]">
        <Icon className="size-4" />
      </div>

      <div>
        <h2 className="font-semibold text-zinc-900">{title}</h2>

        <p className="mt-1 text-xs text-zinc-500">{description}</p>
      </div>
    </div>
  );
}

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 size-4 shrink-0 text-zinc-400" />

      <div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
          {label}
        </p>

        <p className="mt-1 text-sm font-medium text-zinc-700">{value || "—"}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  return (
    <span
      className={
        status === "active"
          ? "rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600"
          : "rounded-full bg-red-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-red-500"
      }
    >
      {status}
    </span>
  );
}

function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
