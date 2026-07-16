import { Check } from "lucide-react";
import { modules } from "../../data/landingData";

export default function Modules() {
  return (
    <section id="modules" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E97D1A]">
            Product modules
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-5xl">
            One product for the core parts of your store.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {modules.map((module) => (
            <article
              key={module.number}
              className="rounded-[28px] border border-zinc-200 bg-[#FAF9F7] p-6 sm:p-8"
            >
              <div className="flex items-start justify-between">
                <span className="text-xs font-bold tracking-[0.2em] text-[#E97D1A]">
                  MODULE {module.number}
                </span>
              </div>

              <h3 className="mt-6 text-2xl font-semibold tracking-tight">
                {module.title}
              </h3>

              <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-500">
                {module.description}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {module.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2 text-sm text-zinc-700"
                  >
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-orange-100 text-[#E97D1A]">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {feature}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}