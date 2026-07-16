import { storeTypes } from "../../data/landingData";

export default function TrustedStores() {
  return (
    <section className="border-y border-zinc-200 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
          Designed for modern fashion retail
        </p>

        <div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {storeTypes.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center justify-center gap-3 rounded-2xl border border-zinc-100 bg-zinc-50/60 px-4 py-4 text-sm font-medium text-zinc-600"
            >
              <Icon className="size-4 text-[#E97D1A]" />
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}