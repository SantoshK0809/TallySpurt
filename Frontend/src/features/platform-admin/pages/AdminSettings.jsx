import { useState } from "react";
import { KeyRound, Loader2, Mail, Save, ShieldCheck, User } from "lucide-react";

import { toast } from "sonner";

export default function AdminSettings() {
  const [profile, setProfile] = useState({
    name: "Platform Administrator",
    email: "admin@tallyspurt.com",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [savingProfile, setSavingProfile] = useState(false);

  const [changingPassword, setChangingPassword] = useState(false);

  function handleProfileChange(e) {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handlePasswordChange(e) {
    const { name, value } = e.target;

    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function saveProfile(e) {
    e.preventDefault();

    setSavingProfile(true);

    try {
      /*
       * FUTURE:
       *
       * PATCH /api/admin/profile
       */

      await new Promise((resolve) => setTimeout(resolve, 600));

      toast.success("Profile updated.");
    } catch (error) {
      toast.error("Unable to update profile.");
    } finally {
      setSavingProfile(false);
    }
  }

  async function updatePassword(e) {
    e.preventDefault();

    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("New password and confirmation do not match.");

      return;
    }

    if (passwords.newPassword.length < 8) {
      toast.error("Password must contain at least 8 characters.");

      return;
    }

    setChangingPassword(true);

    try {
      /*
       * FUTURE:
       *
       * PATCH /api/admin/change-password
       */

      await new Promise((resolve) => setTimeout(resolve, 600));

      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      toast.success("Password changed successfully.");
    } catch (error) {
      toast.error("Unable to change password.");
    } finally {
      setChangingPassword(false);
    }
  }

  return (
    <div>
      {/* Header */}

      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#E97D1A]">
          Administration
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-zinc-950 sm:text-4xl">
          Settings
        </h1>

        <p className="mt-2 text-sm text-zinc-500">
          Manage your platform administrator account and security.
        </p>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        {/* Profile */}

        <section className="rounded-[24px] border border-zinc-200 bg-white">
          <SettingsHeader
            icon={User}
            title="Administrator Profile"
            description="Manage your platform administrator information."
          />

          <form onSubmit={saveProfile} className="space-y-5 p-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Name
              </label>

              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Email address
              </label>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />

                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  required
                  className={`${inputClass} pl-11`}
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Platform Role
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3">
                <ShieldCheck className="size-4 text-[#E97D1A]" />

                <span className="text-sm font-semibold text-zinc-700">
                  platformAdmin
                </span>
              </div>

              <p className="mt-2 text-xs leading-5 text-zinc-400">
                Platform administrator access cannot be changed from this page.
              </p>
            </div>

            <div className="flex justify-end border-t border-zinc-100 pt-5">
              <button
                type="submit"
                disabled={savingProfile}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:opacity-60"
              >
                {savingProfile ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="size-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </section>

        {/* Password */}

        <section className="rounded-[24px] border border-zinc-200 bg-white">
          <SettingsHeader
            icon={KeyRound}
            title="Change Password"
            description="Update the password used to access the admin console."
          />

          <form onSubmit={updatePassword} className="space-y-5 p-6">
            <PasswordField
              label="Current password"
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={handlePasswordChange}
            />

            <PasswordField
              label="New password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
            />

            <PasswordField
              label="Confirm new password"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handlePasswordChange}
            />

            <div className="rounded-xl border border-orange-100 bg-orange-50 p-4">
              <p className="text-xs leading-5 text-zinc-600">
                Use a strong, unique password for your platform administrator
                account. Since this account controls shop onboarding and
                platform-level access, it requires stronger protection than a
                normal shop account.
              </p>
            </div>

            <div className="flex justify-end border-t border-zinc-100 pt-5">
              <button
                type="submit"
                disabled={changingPassword}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:opacity-60"
              >
                {changingPassword ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <KeyRound className="size-4" />
                    Change Password
                  </>
                )}
              </button>
            </div>
          </form>
        </section>
      </div>

      {/* Security */}

      <section className="mt-6 rounded-[24px] border border-zinc-200 bg-white">
        <SettingsHeader
          icon={ShieldCheck}
          title="Account Security"
          description="Security information for your platform administrator account."
        />

        <div className="grid gap-4 p-6 sm:grid-cols-2">
          <SecurityItem title="Administrator Role" value="platformAdmin" />

          <SecurityItem title="Account Status" value="Active" />
        </div>
      </section>
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus:border-[#E97D1A] focus:ring-4 focus:ring-orange-500/10";

function SettingsHeader({ icon: Icon, title, description }) {
  return (
    <div className="flex items-start gap-3 border-b border-zinc-200 px-6 py-5">
      <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-orange-50 text-[#E97D1A]">
        <Icon className="size-4" />
      </div>

      <div>
        <h2 className="font-semibold text-zinc-900">{title}</h2>

        <p className="mt-1 text-xs text-zinc-500">{description}</p>
      </div>
    </div>
  );
}

function PasswordField({ label, name, value, onChange }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-zinc-700">
        {label}
      </label>

      <input
        type="password"
        name={name}
        value={value}
        onChange={onChange}
        required
        autoComplete="new-password"
        className={inputClass}
      />
    </div>
  );
}

function SecurityItem({ title, value }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
      <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
        {title}
      </p>

      <p className="mt-2 text-sm font-semibold text-zinc-800">{value}</p>
    </div>
  );
}
