import { ArrowUpRight } from "lucide-react";
import  dashboardScreenshot  from "../../assets/landing/TallySpurt_dashboard.png";

export default function DashboardPreview() {
  return (
    <section className="bg-zinc-950 py-20 text-white sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-400">
              Your store. One dashboard.
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-5xl">
              See what is happening without digging through records.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-zinc-400">
              Get a clear view of sales, inventory activity and store
              performance from a console designed for everyday retail work.
            </p>

            <a
              href="#features"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-orange-400 hover:text-orange-300"
            >
              Explore the features
              <ArrowUpRight className="size-4" />
            </a>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-3 shadow-2xl">
            <div className="aspect-[16/10] overflow-hidden rounded-[20px] border border-white/10 bg-[#F8F7F5]">

              <div className="flex h-full items-center justify-center p-8 text-center">
                <div>
                  <img
                    src={dashboardScreenshot}
                    alt="TallySpurt dashboard showing sales and inventory overview"
                    className="h-full w-full text-gray-500 object-cover object-top"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
