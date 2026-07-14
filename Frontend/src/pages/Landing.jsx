import { Link } from "react-router-dom";
import { Tag, ScanLine, Package, BarChart3, Users, ShieldCheck, ArrowRight, Sparkles, Receipt, Store } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="border-b border-border/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="grid size-9 place-items-center rounded-lg bg-brand text-brand-foreground shadow-sm">
              <Tag className="size-4" strokeWidth={2.5} />
            </div>
            <div className="leading-tight">
              <p className="text-base font-semibold tracking-tight">TallySpurt</p>
              <p className="text-[11px] uppercase tracking-widest text-muted-foreground">Retail Console</p>
            </div>
          </div>
          <nav className="flex items-center gap-2">
            <a href="#features" className="hidden rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground sm:inline-block">Features</a>
            <a href="#how" className="hidden rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground sm:inline-block">How it works</a>
            <Link to="/login" className="inline-flex items-center gap-2 rounded-[12px] bg-foreground px-4 py-2 text-sm font-semibold text-background hover:bg-foreground/90">
              Sign in <ArrowRight className="size-4" />
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-16 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-surface-muted px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground ring-1 ring-border">
              <Sparkles className="size-3" /> Built for Indian clothing stores
            </span>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight lg:text-5xl">
              A calmer way to run <span className="text-brand">your clothing shop</span>.
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground">
              Scan tags, print bills, watch stock, and read the day's numbers — all from one warm,
              uncluttered console. No spreadsheets, no chaos, everything in Indian Rupees.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/login" className="inline-flex items-center gap-2 rounded-[12px] bg-foreground px-5 py-3 text-sm font-semibold text-background shadow-sm hover:bg-foreground/90">
                Sign in to your shop <ArrowRight className="size-4" />
              </Link>
              <a href="#features" className="inline-flex items-center gap-2 rounded-[12px] bg-surface px-5 py-3 text-sm font-semibold ring-1 ring-border hover:bg-surface-muted">
                See what's inside
              </a>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">
              New shop? Accounts are created by the site admin — reach out to get set up.
            </p>
          </div>

          {/* Mock console preview */}
          <div className="card-soft p-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Today at the counter</p>
              <span className="rounded-full bg-brand/10 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-brand">Live</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <MiniStat label="Revenue" value="₹42,180" sub="18 bills" />
              <MiniStat label="Items sold" value="34" sub="today" />
              <MiniStat label="Low stock" value="3" sub="need reorder" />
              <MiniStat label="New customers" value="5" sub="today" />
            </div>
            <div className="mt-5 space-y-2">
              {[
                { name: "Silk Saree — Banarasi", meta: "SAR-512 · Royal Blue", amt: "₹8,500" },
                { name: "Chanderi Kurta", meta: "CUR-221 · Indigo · L", amt: "₹4,250" },
                { name: "Block-Print Dupatta", meta: "ACC-098 · Ochre", amt: "₹950" },
              ].map((r) => (
                <div key={r.meta} className="flex items-center justify-between rounded-xl bg-surface-muted px-3 py-2.5">
                  <div>
                    <p className="text-sm font-medium">{r.name}</p>
                    <p className="font-mono text-[11px] text-muted-foreground">{r.meta}</p>
                  </div>
                  <p className="font-mono text-sm font-semibold">{r.amt}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-border/70 bg-surface-muted/40">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-brand">Everything you need</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Made for the way you actually work.</h2>
            <p className="mt-3 text-muted-foreground">
              From the moment a customer walks in to end-of-month reporting, Clothing Console keeps
              your team moving without switching tools.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Feature icon={ScanLine} title="QR-first billing" desc="Scan tags straight from a QR reader. Add items, apply flat or percentage discounts, take UPI/Card/Cash, and print a receipt." />
            <Feature icon={Package} title="Live inventory" desc="Track every SKU with size, colour, price and reorder point. Stock decrements automatically after each bill." />
            <Feature icon={BarChart3} title="Daily & monthly reports" desc="Revenue trends, top sellers and payment mix — export to CSV whenever your accountant asks." />
            <Feature icon={Users} title="Customer directory" desc="Names, phone numbers, loyalty points and visit history — build repeat business without a spreadsheet." />
            <Feature icon={Receipt} title="Two discount modes" desc="Salespeople can enter a flat rupee discount or a percentage — the total updates instantly, capped at the subtotal." />
            <Feature icon={ShieldCheck} title="Roles that make sense" desc="Owners manage inventory and reports; salespeople bill customers. Everyone sees only what they should." />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-brand">How it works</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">One console, two logins.</h2>
          <p className="mt-3 text-muted-foreground">
            Each shop has its own owner and their own team. Salespeople only ever see the shop that
            created their account.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <Step n="1" icon={ShieldCheck} title="Site admin sets up the shop"
            desc="The Clothing Console admin creates the shop and its owner account. No public signups." />
          <Step n="2" icon={Store} title="Shop owner adds their team"
            desc="Owners add salespeople from the Users page — each is locked to that shop's inventory and customers." />
          <Step n="3" icon={ScanLine} title="Salespeople bill customers"
            desc="Log in at the counter, scan a QR tag, capture customer details, apply a discount, print — done." />
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border/70">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <h3 className="text-2xl font-semibold tracking-tight">Ready to bring your shop online?</h3>
          <p className="mt-2 text-muted-foreground">Sign in with the credentials your admin shared.</p>
          <Link to="/login" className="mt-6 inline-flex items-center gap-2 rounded-[12px] bg-foreground px-5 py-3 text-sm font-semibold text-background hover:bg-foreground/90">
            Go to sign in <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-border/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Clothing Console</p>
          <p>Made for Indian retail · INR ₹</p>
        </div>
      </footer>
    </div>
  );
}

function MiniStat({ label, value, sub }) {
  return (
    <div className="rounded-xl bg-surface-muted p-3 ring-1 ring-black/5">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-1 font-mono text-lg font-medium">{value}</p>
      <p className="text-[11px] text-muted-foreground">{sub}</p>
    </div>
  );
}

function Feature({ icon: Icon, title, desc }) {
  return (
    <div className="card-soft p-5">
      <div className="grid size-9 place-items-center rounded-lg bg-brand/10 text-brand">
        <Icon className="size-4" />
      </div>
      <p className="mt-4 text-sm font-semibold">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}

function Step({ n, icon: Icon, title, desc }) {
  return (
    <div className="card-soft p-6">
      <div className="flex items-center gap-3">
        <span className="grid size-8 place-items-center rounded-full bg-foreground font-mono text-xs font-bold text-background">{n}</span>
        <Icon className="size-4 text-brand" />
      </div>
      <p className="mt-4 text-sm font-semibold">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}
