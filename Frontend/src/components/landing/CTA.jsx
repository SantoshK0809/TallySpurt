import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section id="contact" className="bg-white px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-zinc-950 px-6 py-12 text-white sm:px-10 sm:py-16 lg:px-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-400">
              Get started
            </p>

            <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-5xl">
              Ready to bring your clothing store into one modern console?
            </h2>

            <p className="mt-5 max-w-2xl leading-7 text-zinc-400">
              Talk to us about your store. We'll help you understand whether
              TallySpurt fits your workflow and guide you through onboarding.
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <Benefit text="Controlled store onboarding" />
              <Benefit text="Owner and staff accounts" />
              <Benefit text="Built for clothing retail" />
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a
              href="mailto:your-email@example.com"
              className="inline-flex min-w-44 items-center justify-center gap-2 rounded-2xl bg-[#E97D1A] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#D96F10]"
            >
              Book a demo
              <ArrowRight className="size-4" />
            </a>

            <Link
              to="/login"
              className="inline-flex min-w-44 items-center justify-center rounded-2xl border border-white/15 px-6 py-3.5 text-sm font-semibold transition hover:bg-white/10"
            >
              Existing user? Sign in
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Benefit({ text }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm text-zinc-300">
      <CheckCircle2 className="size-4 text-orange-400" />
      {text}
    </span>
  );
}