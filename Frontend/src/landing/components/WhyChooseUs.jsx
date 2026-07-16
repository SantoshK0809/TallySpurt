import { benefits } from "../../data/landingData";

export default function WhyChooseUs() {
  return (
    <section className="bg-[#FAF9F7] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Why TallySpurt"
          title="Less time managing software. More time running your store."
          description="Built around the everyday workflow of clothing retailers, from the billing counter to inventory and business reporting."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className="group rounded-[24px] border border-zinc-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-950/5 sm:p-7"
            >
              <div className="grid size-11 place-items-center rounded-2xl bg-orange-50 text-[#E97D1A] transition group-hover:bg-[#E97D1A] group-hover:text-white">
                <Icon className="size-5" />
              </div>

              <h3 className="mt-5 text-lg font-semibold tracking-tight">
                {title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E97D1A]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-zinc-600">
        {description}
      </p>
    </div>
  );
}