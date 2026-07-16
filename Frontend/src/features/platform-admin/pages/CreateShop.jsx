import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Save,
  ShieldCheck,
  Store,
  User,
} from "lucide-react";
import { toast } from "sonner";

const BUSINESS_TYPES = [
  {
    value: "clothing",
    label: "Clothing Retail",
  },
  {
    value: "grocery",
    label: "Grocery Retail",
    disabled: true,
  },
  {
    value: "electronics",
    label: "Electronics Retail",
    disabled: true,
  },
  {
    value: "general",
    label: "General Retail",
    disabled: true,
  },
];

const initialForm = {
  shopName: "",
  businessType: "clothing",
  phone: "",
  email: "",
  address: "",
  city: "",
  state: "",
  pincode: "",

  ownerName: "",
  ownerEmail: "",
  ownerPhone: "",
};

export default function CreateShop() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [busy, setBusy] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (busy) return;

    setBusy(true);

    try {
      /*
       * FUTURE API:
       *
       * POST /api/admin/shops
       *
       * {
       *   shop: {
       *     name,
       *     businessType,
       *     ...
       *   },
       *   owner: {
       *     name,
       *     email,
       *     phone
       *   }
       * }
       *
       * Backend should create:
       *
       * 1. Shop
       * 2. shopOwner account
       * 3. Associate owner with shop
       *
       * This should ideally happen transactionally.
       */

      await new Promise((resolve) => setTimeout(resolve, 800));

      console.log("Create shop:", form);

      toast.success("Shop created successfully.");

      navigate("/admin/shops");
    } catch (error) {
      console.error("Create shop error:", error);

      toast.error("Unable to create the shop. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      {/* Page Header */}

      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link
            to="/admin/shops"
            className="mb-4 inline-flex items-center gap-2 text-xs font-semibold text-zinc-500 transition hover:text-zinc-950"
          >
            <ArrowLeft className="size-3.5" />
            Back to shops
          </Link>

          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#E97D1A]">
            Shop Onboarding
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-zinc-950 sm:text-4xl">
            Create a new shop
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
            Create the business workspace and its primary shop owner account.
          </p>
        </div>
      </div>

      {/* Information Notice */}

      <div className="mt-8 flex items-start gap-3 rounded-2xl border border-orange-100 bg-orange-50/70 p-4">
        <ShieldCheck className="mt-0.5 size-5 shrink-0 text-[#E97D1A]" />

        <div>
          <p className="text-sm font-semibold text-zinc-900">
            Controlled onboarding
          </p>

          <p className="mt-1 text-xs leading-5 text-zinc-600">
            Creating a shop also creates its primary shop owner account. The
            owner can later create salesperson accounts for their own business.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {/* Business Information */}

        <FormSection
          icon={Store}
          title="Business Information"
          description="Basic information about the business being onboarded."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <FormField label="Shop name" required>
              <input
                type="text"
                name="shopName"
                value={form.shopName}
                onChange={handleChange}
                required
                placeholder="Enter business name"
                className={inputClass}
              />
            </FormField>

            <FormField label="Business type" required>
              <select
                name="businessType"
                value={form.businessType}
                onChange={handleChange}
                className={inputClass}
              >
                {BUSINESS_TYPES.map((type) => (
                  <option
                    key={type.value}
                    value={type.value}
                    disabled={type.disabled}
                  >
                    {type.label}
                    {type.disabled ? " — Coming soon" : ""}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Business email">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="contact@business.in"
                  className={`${inputClass} pl-11`}
                />
              </div>
            </FormField>

            <FormField label="Business phone" required>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />

                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="+91 98765 43210"
                  className={`${inputClass} pl-11`}
                />
              </div>
            </FormField>
          </div>
        </FormSection>

        {/* Address */}

        <FormSection
          icon={MapPin}
          title="Business Address"
          description="The primary address associated with this shop."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <FormField label="Address">
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Shop number, building, street..."
                  className={`${inputClass} resize-none`}
                />
              </FormField>
            </div>

            <FormField label="City">
              <input
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Pune"
                className={inputClass}
              />
            </FormField>

            <FormField label="State">
              <input
                type="text"
                name="state"
                value={form.state}
                onChange={handleChange}
                placeholder="Maharashtra"
                className={inputClass}
              />
            </FormField>

            <FormField label="PIN code">
              <input
                type="text"
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                placeholder="411001"
                className={inputClass}
              />
            </FormField>
          </div>
        </FormSection>

        {/* Owner */}

        <FormSection
          icon={User}
          title="Primary Shop Owner"
          description="This account will receive owner-level access to the newly created shop."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <FormField label="Owner name" required>
              <input
                type="text"
                name="ownerName"
                value={form.ownerName}
                onChange={handleChange}
                required
                placeholder="Enter owner's full name"
                className={inputClass}
              />
            </FormField>

            <FormField label="Owner email" required>
              <input
                type="email"
                name="ownerEmail"
                value={form.ownerEmail}
                onChange={handleChange}
                required
                placeholder="owner@business.in"
                className={inputClass}
              />
            </FormField>

            <FormField label="Owner phone" required>
              <input
                type="tel"
                name="ownerPhone"
                value={form.ownerPhone}
                onChange={handleChange}
                required
                placeholder="+91 98765 43210"
                className={inputClass}
              />
            </FormField>

            <div className="flex items-end">
              <div className="w-full rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                <div className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#E97D1A]" />

                  <p className="text-xs leading-5 text-zinc-500">
                    The account will be created with the{" "}
                    <span className="font-semibold text-zinc-700">
                      shopOwner
                    </span>{" "}
                    role and associated only with this shop.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FormSection>

        {/* Actions */}

        <div className="flex flex-col-reverse gap-3 border-t border-zinc-200 pt-6 sm:flex-row sm:justify-end">
          <Link
            to="/admin/shops"
            className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={busy}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Creating shop...
              </>
            ) : (
              <>
                <Save className="size-4" />
                Create Shop
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-[#E97D1A] focus:ring-4 focus:ring-orange-500/10";

function FormSection({ icon: Icon, title, description, children }) {
  return (
    <section className="overflow-hidden rounded-[24px] border border-zinc-200 bg-white">
      <div className="flex items-start gap-4 border-b border-zinc-200 px-5 py-5 sm:px-6">
        <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-orange-50 text-[#E97D1A]">
          <Icon className="size-[18px]" />
        </div>

        <div>
          <h2 className="font-semibold text-zinc-900">{title}</h2>

          <p className="mt-1 text-xs leading-5 text-zinc-500">{description}</p>
        </div>
      </div>

      <div className="p-5 sm:p-6">{children}</div>
    </section>
  );
}

function FormField({ label, required, children }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-zinc-700">
        {label}

        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      {children}
    </div>
  );
}
