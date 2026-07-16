import { Tag, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { footerLinks } from "../../data/landingData";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-[#F5F3F0]">
      <div className="mx-auto max-w-7xl px-5 pb-8 pt-14 sm:px-6 lg:px-8 lg:pt-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <a href="#" className="inline-flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-xl bg-[#E97D1A] text-white">
                <Tag className="size-5" />
              </div>

              <div>
                <p className="font-semibold text-zinc-950">TallySpurt</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                  Retail Console
                </p>
              </div>
            </a>

            <p className="mt-5 text-sm leading-6 text-zinc-500">
              A modern billing and store management console built for clothing
              stores, boutiques and fashion retailers.
            </p>
          </div>

          <FooterColumn title="Product" links={footerLinks.product} />

          <FooterColumn title="Resources" links={footerLinks.resources} />

          <div>
            <p className="text-sm font-semibold text-zinc-900">Account</p>

            <div className="mt-4 flex flex-col gap-3">
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-sm text-zinc-500 transition hover:text-zinc-950"
              >
                Sign in
                <ArrowUpRight className="size-3.5" />
              </Link>

              <a
                href="#contact"
                className="text-sm text-zinc-500 transition hover:text-zinc-950"
              >
                Book a demo
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-zinc-300/70 pt-7 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} TallySpurt. All rights reserved.
          </p>

          <p>Built for modern Indian retail · INR ₹</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <p className="text-sm font-semibold text-zinc-900">{title}</p>

      <div className="mt-4 flex flex-col gap-3">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-sm text-zinc-500 transition hover:text-zinc-950"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}