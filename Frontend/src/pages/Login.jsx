// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Tag, LogIn, Store, ScanLine, ShieldCheck } from "lucide-react";
// import { toast } from "sonner";
// // import { useAuth } from "../lib/";

// const TABS = [
//   { key: "shopOwner", label: "Shop Owner", icon: Store, demo: { email: "owner@vanya.in", password: "owner123" } },
//   { key: "salesman", label: "Sales Person", icon: ScanLine, demo: { email: "sales@vanya.in", password: "sales123" } },
// ];

// export default function Login() {
// //   const { login } = useAuth();
// const login = ({ email, password, expectedRole }) => {
//   // Placeholder login function, replace with actual authentication logic
//   if ((email === "owner@vanya.in" && password === "owner123" && expectedRole === "shopOwner") ||
//       (email === "sales@vanya.in" && password === "sales123" && expectedRole === "salesman")) {
//     return { ok: true, user: { name: email.split("@")[0] } };
//   }
//   return { ok: false, error: "Invalid credentials" };
// };

// const navigate = useNavigate();
//   const [tab, setTab] = useState("shopOwner");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [siteAdmin, setSiteAdmin] = useState(false);
//   const [busy, setBusy] = useState(false);

//   function onSubmit(e) {
//     e.preventDefault();
//     setBusy(true);
//     const expectedRole = siteAdmin ? "siteAdmin" : tab;
//     const res = login({ email, password, expectedRole });
//     setBusy(false);
//     if (!res.ok) { toast.error(res.error); return; }
//     toast.success(`Welcome back, ${res.user.name}`);
//     navigate({ to: "/dashboard", replace: true });
//   }

//   function fillDemo() {
//     if (siteAdmin) { setEmail("admin@console.in"); setPassword("admin123"); return; }
//     const t = TABS.find((t) => t.key === tab);
//     setEmail(t.demo.email); setPassword(t.demo.password);
//   }

//   return (
//     <div className="grid min-h-screen place-items-center px-4 py-10">
//       <div className="w-full max-w-md">
//         <Link to="/" className="mb-8 flex items-center justify-center gap-3">
//           <div className="grid size-10 place-items-center rounded-lg bg-brand text-brand-foreground shadow-sm">
//             <Tag className="size-5" strokeWidth={2.5} />
//           </div>
//           <div className="leading-tight">
//             <p className="text-lg font-semibold tracking-tight">TallySpurt</p>
//             <p className="text-[11px] uppercase tracking-widest text-muted-foreground">Retail Console</p>
//           </div>
//         </Link>

//         <div className="card-soft p-8">
//           <h1 className="text-xl font-semibold tracking-tight">Sign in</h1>
//           <p className="mt-1 text-sm text-muted-foreground">Choose your role, then use the credentials your admin shared.</p>

//           {/* Role tabs */}
//           <div className={"mt-6 grid grid-cols-2 gap-2 rounded-[14px] bg-surface-muted p-1 " + (siteAdmin ? "opacity-40 pointer-events-none" : "")}>
//             {TABS.map((t) => {
//               const Icon = t.icon;
//               const active = tab === t.key;
//               return (
//                 <button
//                   key={t.key}
//                   type="button"
//                   onClick={() => setTab(t.key)}
//                   className={
//                     "inline-flex items-center justify-center gap-2 rounded-[10px] py-2 text-sm font-semibold transition-colors " +
//                     (active ? "bg-background text-foreground shadow-sm ring-1 ring-black/5" : "text-muted-foreground hover:text-foreground")
//                   }
//                 >
//                   <Icon className="size-4" /> {t.label}
//                 </button>
//               );
//             })}
//           </div>

//           <form onSubmit={onSubmit} className="mt-6 space-y-4">
//             <div>
//               <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</label>
//               <input
//                 type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
//                 placeholder="you@shop.in"
//                 className="w-full rounded-[12px] border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
//               />
//             </div>
//             <div>
//               <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</label>
//               <input
//                 type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
//                 placeholder="••••••••"
//                 className="w-full rounded-[12px] border border-border bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
//               />
//             </div>
//             <button
//               type="submit" disabled={busy}
//               className="inline-flex w-full items-center justify-center gap-2 rounded-[12px] bg-foreground py-3 text-sm font-semibold text-background hover:bg-foreground/90 disabled:opacity-50"
//             >
//               <LogIn className="size-4" /> Sign in as {siteAdmin ? "Site Admin" : TABS.find((t) => t.key === tab).label}
//             </button>
//           </form>

//           <p className="mt-6 text-center text-xs text-muted-foreground">
//             Accounts are created by your admin.{" "}
//             <Link to="/signup" className="font-semibold text-brand">Need access?</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Check,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Package,
  ScanLine,
  ShieldCheck,
  Tag,
  Users,
} from "lucide-react";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);

  /*
   * TEMPORARY LOGIN FUNCTION
   *
   * Replace this function with your real authentication implementation.
   *
   * Your real API should receive:
   *
   * {
   *   email,
   *   password
   * }
   *
   * The backend should determine the user's role.
   *
   * Example successful response:
   *
   * {
   *   ok: true,
   *   user: {
   *     id: "...",
   *     name: "Rajesh Kumar",
   *     email: "owner@example.com",
   *     role: "shopOwner"
   *   }
   * }
   */

  async function login({ email, password }) {
    // Remove this temporary implementation
    // when your real authentication API is connected.

    if (!email || !password) {
      toast.error("Email and password are required.");
      return {
        ok: false,
        error: "Email and password are required.",
      };
    }

    return {
      ok: true,
      user: {
        name: email.split("@")[0],
        email,
        role: "shopOwner",
      },
    };
  }

  async function onSubmit(e) {
    e.preventDefault();

    if (busy) return;

    setBusy(true);

    try {
      const res = await login({
        email: email.trim(),
        password,
      });

      if (!res.ok) {
        toast.error(res.error || "Unable to sign in.");
        return;
      }

      toast.success(`Welcome back, ${res.user.name}`);

      /*
       * Redirect based on the role returned
       * by your BACKEND — not selected by the user.
       */

      switch (res.user.role) {
        case "shopOwner":
          navigate("/dashboard", {
            replace: true,
          });
          break;

        case "salesman":
        case "salesPerson":
          navigate("/billing", {
            replace: true,
          });
          break;

        default:
          toast.error("Your account does not have access to this application.");
      }
    } catch (error) {
      console.error("Login error:", error);

      toast.error("Something went wrong while signing in. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* =====================================================
            LEFT SIDE — PRODUCT / BRAND SECTION
        ====================================================== */}

        <section className="relative hidden overflow-hidden bg-zinc-950 lg:flex lg:flex-col">
          {/* Decorative background */}

          <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />

          <div className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />

          {/* Header */}

          <div className="relative z-10 flex items-center justify-between px-10 py-8 xl:px-14">
            <Link to="/" className="flex items-center gap-3">
              <div className="grid size-11 place-items-center rounded-xl bg-[#E97D1A] text-white shadow-lg shadow-orange-950/20">
                <Tag className="size-5" strokeWidth={2.5} />
              </div>

              <div className="leading-tight">
                <p className="text-lg font-semibold tracking-tight text-white">
                  TallySpurt
                </p>

                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">
                  Retail Console
                </p>
              </div>
            </Link>

            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition hover:text-white"
            >
              <ArrowLeft className="size-4" />
              Back to home
            </Link>
          </div>

          {/* Main content */}

          <div className="relative z-10 flex flex-1 flex-col justify-center px-10 pb-20 xl:px-14">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-zinc-300">
                <ShieldCheck className="size-3.5 text-orange-400" />
                Secure access to your retail console
              </div>

              <h1 className="mt-7 text-4xl font-semibold leading-[1.1] tracking-[-0.04em] text-white xl:text-5xl">
                Everything your clothing store needs.
                <span className="mt-2 block text-orange-400">
                  One simple console.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-base leading-7 text-zinc-400">
                Manage billing, inventory, customers, sales reports and your
                team from one organized workspace built for modern clothing
                retail.
              </p>

              {/* Feature grid */}

              <div className="mt-10 grid grid-cols-2 gap-3">
                <FeatureItem
                  icon={ScanLine}
                  title="Fast Billing"
                  description="Scan and create bills"
                />

                <FeatureItem
                  icon={Package}
                  title="Inventory"
                  description="Track your stock"
                />

                <FeatureItem
                  icon={BarChart3}
                  title="Reports"
                  description="Understand sales"
                />

                <FeatureItem
                  icon={Users}
                  title="Staff Access"
                  description="Control team access"
                />
              </div>

              {/* Trust message */}

              <div className="mt-10 flex items-start gap-3 border-t border-white/10 pt-7">
                <div className="grid size-8 shrink-0 place-items-center rounded-full bg-orange-400/10 text-orange-400">
                  <Check className="size-4" />
                </div>

                <div>
                  <p className="text-sm font-medium text-zinc-200">
                    Private store access
                  </p>

                  <p className="mt-1 text-xs leading-5 text-zinc-500">
                    Store accounts are created through controlled onboarding.
                    Your staff can only access the tools available to their
                    assigned role.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            RIGHT SIDE — LOGIN FORM
        ====================================================== */}

        <main className="flex min-h-screen flex-col">
          {/* Mobile header */}

          <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-5 lg:hidden">
            <Link to="/" className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-xl bg-[#E97D1A] text-white">
                <Tag className="size-5" strokeWidth={2.5} />
              </div>

              <div className="leading-tight">
                <p className="font-semibold tracking-tight text-zinc-950">
                  TallySpurt
                </p>

                <p className="text-[9px] uppercase tracking-[0.2em] text-zinc-500">
                  Retail Console
                </p>
              </div>
            </Link>

            <Link
              to="/"
              className="grid size-10 place-items-center rounded-xl border border-zinc-200 bg-white text-zinc-600"
              aria-label="Back to home"
            >
              <ArrowLeft className="size-4" />
            </Link>
          </div>

          {/* Login content */}

          <div className="flex flex-1 items-center justify-center px-5 py-12 sm:px-8 lg:px-12">
            <div className="w-full max-w-md">
              {/* Icon */}

              <div className="grid size-12 place-items-center rounded-2xl border border-orange-100 bg-orange-50 text-[#E97D1A]">
                <LockKeyhole className="size-5" />
              </div>

              {/* Heading */}

              <div className="mt-6">
                <h2 className="text-3xl font-semibold tracking-[-0.03em] text-zinc-950 sm:text-4xl">
                  Welcome back
                </h2>

                <p className="mt-3 text-sm leading-6 text-zinc-500">
                  Sign in with the credentials provided for your store account.
                </p>
              </div>

              {/* Form */}

              <form onSubmit={onSubmit} className="mt-8 space-y-5">
                {/* Email */}

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-zinc-700"
                  >
                    Email address
                  </label>

                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    disabled={busy}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@yourstore.in"
                    className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3.5 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-[#E97D1A] focus:ring-4 focus:ring-orange-500/10 disabled:cursor-not-allowed disabled:bg-zinc-100"
                  />
                </div>

                {/* Password */}

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-zinc-700"
                    >
                      Password
                    </label>

                    <Link
                      to="/forgot-password"
                      className="text-xs font-semibold text-[#E97D1A] transition hover:text-[#D96F10]"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      disabled={busy}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3.5 pr-12 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-[#E97D1A] focus:ring-4 focus:ring-orange-500/10 disabled:cursor-not-allowed disabled:bg-zinc-100"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      disabled={busy}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 transition hover:text-zinc-700 disabled:cursor-not-allowed"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit */}

                <button
                  type="submit"
                  disabled={busy}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-zinc-950 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-zinc-950/10 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {busy ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Account onboarding */}

              <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-4">
                <div className="flex items-start gap-3">
                  <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-orange-50 text-[#E97D1A]">
                    <ShieldCheck className="size-4" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-zinc-900">
                      Need a store account?
                    </p>

                    <p className="mt-1 text-xs leading-5 text-zinc-500">
                      TallySpurt uses controlled onboarding instead of public
                      registration.
                    </p>

                    <Link
                      to="/#contact"
                      className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#E97D1A] transition hover:text-[#D96F10]"
                    >
                      Contact us to get started
                      <ArrowRight className="size-3" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Footer */}

              <p className="mt-8 text-center text-xs text-zinc-400">
                Secure access to your TallySpurt Retail Console
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* =========================================================
   LEFT PANEL FEATURE ITEM
========================================================= */

function FeatureItem({ icon: Icon, title, description }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-center gap-3">
        <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-orange-400/10 text-orange-400">
          <Icon className="size-4" />
        </div>

        <div>
          <p className="text-sm font-medium text-zinc-200">{title}</p>

          <p className="mt-0.5 text-[11px] text-zinc-500">{description}</p>
        </div>
      </div>
    </div>
  );
}
