import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tag, LogIn, Store, ScanLine, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
// import { useAuth } from "../lib/";

const TABS = [
  { key: "shopOwner", label: "Shop Owner", icon: Store, demo: { email: "owner@vanya.in", password: "owner123" } },
  { key: "salesman", label: "Sales Person", icon: ScanLine, demo: { email: "sales@vanya.in", password: "sales123" } },
];

export default function Login() {
//   const { login } = useAuth();
const login = ({ email, password, expectedRole }) => {
  // Placeholder login function, replace with actual authentication logic
  if ((email === "owner@vanya.in" && password === "owner123" && expectedRole === "shopOwner") ||
      (email === "sales@vanya.in" && password === "sales123" && expectedRole === "salesman")) {
    return { ok: true, user: { name: email.split("@")[0] } };
  }
  return { ok: false, error: "Invalid credentials" };
};

const navigate = useNavigate();
  const [tab, setTab] = useState("shopOwner");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [siteAdmin, setSiteAdmin] = useState(false);
  const [busy, setBusy] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    const expectedRole = siteAdmin ? "siteAdmin" : tab;
    const res = login({ email, password, expectedRole });
    setBusy(false);
    if (!res.ok) { toast.error(res.error); return; }
    toast.success(`Welcome back, ${res.user.name}`);
    navigate({ to: "/dashboard", replace: true });
  }

  function fillDemo() {
    if (siteAdmin) { setEmail("admin@console.in"); setPassword("admin123"); return; }
    const t = TABS.find((t) => t.key === tab);
    setEmail(t.demo.email); setPassword(t.demo.password);
  }

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

        <div className="card-soft p-8">
          <h1 className="text-xl font-semibold tracking-tight">Sign in</h1>
          <p className="mt-1 text-sm text-muted-foreground">Choose your role, then use the credentials your admin shared.</p>

          {/* Role tabs */}
          <div className={"mt-6 grid grid-cols-2 gap-2 rounded-[14px] bg-surface-muted p-1 " + (siteAdmin ? "opacity-40 pointer-events-none" : "")}>
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = tab === t.key;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTab(t.key)}
                  className={
                    "inline-flex items-center justify-center gap-2 rounded-[10px] py-2 text-sm font-semibold transition-colors " +
                    (active ? "bg-background text-foreground shadow-sm ring-1 ring-black/5" : "text-muted-foreground hover:text-foreground")
                  }
                >
                  <Icon className="size-4" /> {t.label}
                </button>
              );
            })}
          </div>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</label>
              <input
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="you@shop.in"
                className="w-full rounded-[12px] border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</label>
              <input
                type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-[12px] border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
              />
            </div>
            <button
              type="submit" disabled={busy}
              className="inline-flex w-full items-center justify-center gap-2 rounded-[12px] bg-foreground py-3 text-sm font-semibold text-background hover:bg-foreground/90 disabled:opacity-50"
            >
              <LogIn className="size-4" /> Sign in as {siteAdmin ? "Site Admin" : TABS.find((t) => t.key === tab).label}
            </button>
          </form>

          <div className="mt-6 rounded-[12px] bg-surface-muted p-4">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Demo credentials</p>
              <button type="button" onClick={fillDemo} className="text-[11px] font-semibold text-brand">Fill in →</button>
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground">
              Try the shop owner or sales person tab, or{" "}
              <button
                type="button"
                onClick={() => setSiteAdmin((v) => !v)}
                className="inline-flex items-center gap-1 font-semibold text-foreground hover:text-brand"
              >
                <ShieldCheck className="size-3" /> {siteAdmin ? "back to shop login" : "sign in as site admin"}
              </button>
              .
            </p>
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Accounts are created by your admin.{" "}
            <Link to="/signup" className="font-semibold text-brand">Need access?</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
