import { Link } from "react-router-dom";
import { Tag, ShieldCheck, ArrowLeft } from "lucide-react";

export default function Signup() {
  return (
    <div className="grid min-h-screen place-items-center px-4 py-10">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-8 flex items-center justify-center gap-3">
          <div className="grid size-10 place-items-center rounded-lg bg-brand text-brand-foreground shadow-sm">
            <Tag className="size-5" strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <p className="text-lg font-semibold tracking-tight">TallySpurt</p>
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground">Retail Console</p>
          </div>
        </Link>

        <div className="card-soft p-8 text-center">
          <div className="mx-auto grid size-12 place-items-center rounded-full bg-brand/10 text-brand">
            <ShieldCheck className="size-5" />
          </div>
          <h1 className="mt-4 text-xl font-semibold tracking-tight">Accounts are invite-only</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Public signups are disabled. The site admin creates shop owner accounts, and each shop owner adds their own salespeople from the console.
          </p>

          <div className="mt-6 rounded-[12px] bg-surface-muted p-4 text-left">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">How to get in</p>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              <li><span className="font-semibold text-foreground">Shop owner?</span> Ask the site admin to create your shop and account.</li>
              <li><span className="font-semibold text-foreground">Salesperson?</span> Ask your shop owner to add you from their <span className="font-mono text-xs">/users</span> page.</li>
            </ul>
          </div>

          <Link to="/login" className="mt-6 inline-flex items-center gap-2 rounded-[12px] bg-foreground px-4 py-2.5 text-sm font-semibold text-background hover:bg-foreground/90">
            <ArrowLeft className="size-4" /> Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
