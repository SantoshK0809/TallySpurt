import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  ShieldCheck,
  Tag,
} from "lucide-react";
import { toast } from "sonner";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);

  /*
   * TEMPORARY ADMIN LOGIN
   *
   * Replace this with your real API call.
   *
   * POST /api/auth/admin/login
   *
   * Body:
   * {
   *   email,
   *   password
   * }
   *
   * The backend MUST verify that the authenticated
   * user has the siteAdmin / superAdmin role.
   */

  async function adminLogin({ email, password }) {
    if (!email || !password) {
        toast.error("Email and password are required.");
      return {
        ok: false,
        error: "Email and password are required.",
      };
    }

    // Temporary response for frontend development only.
    // REMOVE when backend authentication is connected.

    return {
      ok: true,
      user: {
        name: "Platform Administrator",
        email,
        role: "siteAdmin",
      },
    };
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (busy) return;

    setBusy(true);

    try {
      const response = await adminLogin({
        email: email.trim(),
        password,
      });

      if (!response.ok) {
        toast.error(response.error || "Unable to authenticate administrator.");
        return;
      }

      /*
       * This frontend check is useful for UX,
       * but backend authorization is still mandatory.
       */

      if (response.user.role !== "siteAdmin") {
        toast.error("You are not authorized to access the admin console.");
        return;
      }

      toast.success("Administrator authenticated.");

      navigate("/admin/dashboard", {
        replace: true,
      });
    } catch (error) {
      console.error("Admin login error:", error);

      toast.error("Something went wrong while signing in. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Background decoration */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-300px] h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-[120px]" />

        <div className="absolute bottom-[-300px] right-[-200px] h-[500px] w-[500px] rounded-full bg-orange-500/5 blur-[120px]" />
      </div>

      <div className="relative flex min-h-screen flex-col">
        {/* Header */}

        <header className="border-b border-white/10">
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
            {/* Brand */}

            <Link to="/" className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-xl bg-[#E97D1A] text-white shadow-lg shadow-orange-950/30">
                <Tag className="size-5" strokeWidth={2.5} />
              </div>

              <div className="leading-tight">
                <p className="font-semibold tracking-tight text-white">
                  TallySpurt
                </p>

                <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-zinc-500">
                  Platform Administration
                </p>
              </div>
            </Link>

            {/* Back */}

            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-white"
            >
              <ArrowLeft className="size-4" />

              <span className="hidden sm:inline">Back to website</span>
            </Link>
          </div>
        </header>

        {/* Main */}

        <main className="flex flex-1 items-center justify-center px-5 py-12 sm:px-6">
          <div className="w-full max-w-md">
            {/* Security icon */}

            <div className="mx-auto grid size-14 place-items-center rounded-2xl border border-orange-500/20 bg-orange-500/10 text-orange-400">
              <ShieldCheck className="size-6" />
            </div>

            {/* Heading */}

            <div className="mt-6 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-400">
                Restricted Access
              </p>

              <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                Admin Console
              </h1>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-zinc-500">
                Sign in with your authorized platform administrator credentials
                to manage TallySpurt.
              </p>
            </div>

            {/* Login card */}

            <div className="mt-8 rounded-[24px] border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-sm sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}

                <div>
                  <label
                    htmlFor="admin-email"
                    className="mb-2 block text-sm font-medium text-zinc-300"
                  >
                    Administrator email
                  </label>

                  <input
                    id="admin-email"
                    type="email"
                    autoComplete="email"
                    required
                    disabled={busy}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@tallyspurt.com"
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-orange-500/60 focus:bg-white/[0.08] focus:ring-4 focus:ring-orange-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>

                {/* Password */}

                <div>
                  <label
                    htmlFor="admin-password"
                    className="mb-2 block text-sm font-medium text-zinc-300"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <input
                      id="admin-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      disabled={busy}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3.5 pr-12 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-orange-500/60 focus:bg-white/[0.08] focus:ring-4 focus:ring-orange-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      disabled={busy}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-zinc-300"
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
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#E97D1A] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-950/20 transition hover:bg-[#D96F10] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {busy ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    <>
                      <LockKeyhole className="size-4" />
                      Access Admin Console
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Security notice */}

            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-zinc-500" />

              <p className="text-xs leading-5 text-zinc-600">
                This area is restricted to authorized TallySpurt platform
                administrators. Unauthorized access attempts may be logged.
              </p>
            </div>
          </div>
        </main>

        {/* Footer */}

        <footer className="px-5 py-6 text-center text-xs text-zinc-700">
          © {new Date().getFullYear()} TallySpurt · Platform Administration
        </footer>
      </div>
    </div>
  );
}
