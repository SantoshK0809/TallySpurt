import { features } from "../../data/landingData";

export default function Features() {
  return (
    <section id="features" className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E97D1A]">
            Core features
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-5xl">
            Everything your team needs for everyday retail operations.
          </h2>

          <p className="mt-5 max-w-2xl leading-7 text-zinc-600">
            Keep the important parts of your store connected instead of
            managing billing, stock and customer information in separate
            places.
          </p>
        </div>

        <div className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="flex gap-4">
              <div className="grid size-11 shrink-0 place-items-center rounded-2xl bg-orange-50 text-[#E97D1A]">
                <Icon className="size-5" />
              </div>

              <div>
                <h3 className="font-semibold text-zinc-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}