import { workflowSteps } from "../../data/landingData";

export default function Workflow() {
  return (
    <section
      id="how-it-works"
      className="border-y border-zinc-200 bg-[#FAF9F7] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#E97D1A]">
            How it works
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-5xl">
            From onboarding to your first bill.
          </h2>

          <p className="mt-5 text-zinc-600">
            A controlled onboarding process keeps store access private while
            giving owners the ability to manage their own team.
          </p>
        </div>

        <div className="relative mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {workflowSteps.map(
            ({ number, icon: Icon, title, description }) => (
              <article
                key={number}
                className="relative rounded-[24px] border border-zinc-200 bg-white p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-widest text-zinc-300">
                    {number}
                  </span>

                  <div className="grid size-10 place-items-center rounded-xl bg-orange-50 text-[#E97D1A]">
                    <Icon className="size-5" />
                  </div>
                </div>

                <h3 className="mt-8 text-lg font-semibold">{title}</h3>

                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  {description}
                </p>
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  );
}