import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Tag, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/70 bg-[#FAF9F7]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-xl bg-[#E97D1A] text-white shadow-sm">
            <Tag className="size-5" strokeWidth={2.4} />
          </div>

          <div className="leading-tight">
            <p className="font-semibold tracking-tight text-zinc-950">
              TallySpurt
            </p>
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">
              Retail Console
            </p>
          </div>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          <NavItem href="#features">Features</NavItem>
          <NavItem href="#modules">Modules</NavItem>
          <NavItem href="#how-it-works">How it works</NavItem>
          <NavItem href="#faq">FAQ</NavItem>
          <NavItem href="#contact">Contact</NavItem>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/login"
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-zinc-700 transition hover:bg-white hover:text-zinc-950"
          >
            Sign in
          </Link>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800"
          >
            Book a demo
            <ArrowRight className="size-4" />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="grid size-10 place-items-center rounded-xl border border-zinc-200 bg-white text-zinc-700 lg:hidden"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-zinc-200 bg-[#FAF9F7] px-5 py-5 lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1">
            {[
              ["Features", "#features"],
              ["Modules", "#modules"],
              ["How it works", "#how-it-works"],
              ["FAQ", "#faq"],
              ["Contact", "#contact"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={closeMenu}
                className="rounded-xl px-4 py-3 text-sm font-medium text-zinc-700 hover:bg-white"
              >
                {label}
              </a>
            ))}

            <div className="mt-4 grid grid-cols-2 gap-3">
              <Link
                to="/login"
                onClick={closeMenu}
                className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-center text-sm font-semibold"
              >
                Sign in
              </Link>

              <a
                href="#contact"
                onClick={closeMenu}
                className="rounded-xl bg-zinc-950 px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Book a demo
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function NavItem({ href, children }) {
  return (
    <a
      href={href}
      className="rounded-xl px-4 py-2.5 text-sm font-medium text-zinc-600 transition hover:bg-white hover:text-zinc-950"
    >
      {children}
    </a>
  );
}