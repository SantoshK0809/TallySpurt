import { useState } from "react";
import { ReceiptText } from "lucide-react";

export default function BillingSettings() {
  const [settings, setSettings] = useState({
    gstEnabled: false,
    gstin: "",
  });

  const handleGSTToggle = () => {
    setSettings((previous) => ({
      ...previous,
      gstEnabled: !previous.gstEnabled,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Saving billing settings:", settings);
  };

  return (
    <section className="card-soft p-4 sm:p-6">
      <div className="mb-6 flex items-start gap-3">
        <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand">
          <ReceiptText className="size-5" />
        </div>

        <div>
          <h2 className="font-semibold">Billing Settings</h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Configure tax information used while generating bills.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between gap-4 rounded-xl border border-border p-4">
          <div>
            <p className="text-sm font-medium">Enable GST Billing</p>

            <p className="mt-1 text-xs text-muted-foreground">
              Apply GST configuration when generating invoices.
            </p>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={settings.gstEnabled}
            onClick={handleGSTToggle}
            className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
              settings.gstEnabled ? "bg-brand" : "bg-muted"
            }`}
          >
            <span
              className={`absolute top-1 size-4 rounded-full bg-white shadow transition-transform ${
                settings.gstEnabled ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {settings.gstEnabled && (
          <div className="mt-5">
            <label className="mb-1.5 block text-sm font-medium">GSTIN</label>

            <input
              type="text"
              value={settings.gstin}
              onChange={(event) =>
                setSettings((previous) => ({
                  ...previous,
                  gstin: event.target.value.toUpperCase(),
                }))
              }
              placeholder="27ABCDE1234F1Z5"
              maxLength={15}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 font-mono text-sm uppercase outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 sm:max-w-md"
            />

            <p className="mt-1.5 text-xs text-muted-foreground">
              Enter your 15-character GST Identification Number.
            </p>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="w-full rounded-lg bg-foreground px-4 py-2.5 text-sm font-semibold text-background sm:w-auto"
          >
            Save Billing Settings
          </button>
        </div>
      </form>
    </section>
  );
}
