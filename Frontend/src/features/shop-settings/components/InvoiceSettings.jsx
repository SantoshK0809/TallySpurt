import { useState } from "react";
import { FileText, Plus, Trash2 } from "lucide-react";

const initialSettings = {
  showLogo: true,
  showShopName: true,
  showAddress: true,
  showPhone: true,
  showEmail: false,
  showGSTIN: true,

  footerMessage: "Thank you for shopping with us!",

  showTermsAndConditions: false,

  termsAndConditions: [
    "Goods once sold can only be exchanged within 7 days.",
    "Original invoice is required for exchange.",
  ],
};

export default function InvoiceSettings() {
  const [settings, setSettings] = useState(initialSettings);

  const toggleSetting = (name) => {
    setSettings((previous) => ({
      ...previous,
      [name]: !previous[name],
    }));
  };

  const handleTermChange = (index, value) => {
    setSettings((previous) => {
      const updatedTerms = [...previous.termsAndConditions];

      updatedTerms[index] = value;

      return {
        ...previous,
        termsAndConditions: updatedTerms,
      };
    });
  };

  const handleAddTerm = () => {
    setSettings((previous) => ({
      ...previous,
      termsAndConditions: [...previous.termsAndConditions, ""],
    }));
  };

  const handleRemoveTerm = (index) => {
    setSettings((previous) => ({
      ...previous,
      termsAndConditions: previous.termsAndConditions.filter(
        (_, termIndex) => termIndex !== index,
      ),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const cleanedTerms = settings.termsAndConditions
      .map((term) => term.trim())
      .filter(Boolean);

    const invoiceSettings = {
      ...settings,
      termsAndConditions: cleanedTerms,
    };

    console.log("Saving invoice settings:", invoiceSettings);

    // Later:
    // await shopSettingsApi.updateInvoiceSettings(
    //   invoiceSettings
    // );
  };

  const options = [
    {
      name: "showLogo",
      label: "Shop Logo",
    },
    {
      name: "showShopName",
      label: "Shop Name",
    },
    {
      name: "showAddress",
      label: "Shop Address",
    },
    {
      name: "showPhone",
      label: "Phone Number",
    },
    {
      name: "showEmail",
      label: "Email Address",
    },
    {
      name: "showGSTIN",
      label: "GSTIN",
    },
  ];

  return (
    <section className="card-soft p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6 flex items-start gap-3">
        <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand">
          <FileText className="size-5" />
        </div>

        <div>
          <h2 className="font-semibold">Invoice Settings</h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Customize the information displayed on your printed invoices.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Invoice Header Information */}
        <div>
          <p className="mb-3 text-sm font-medium">Invoice Header Information</p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {options.map((option) => (
              <label
                key={option.name}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-muted/50"
              >
                <input
                  type="checkbox"
                  checked={settings[option.name]}
                  onChange={() => toggleSetting(option.name)}
                  className="size-4 rounded border-border accent-brand"
                />

                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Footer Message */}
        <div className="mt-6 border-t border-border pt-6">
          <label
            htmlFor="footerMessage"
            className="mb-1.5 block text-sm font-medium"
          >
            Invoice Footer Message
          </label>

          <textarea
            id="footerMessage"
            value={settings.footerMessage}
            onChange={(event) =>
              setSettings((previous) => ({
                ...previous,
                footerMessage: event.target.value,
              }))
            }
            rows={3}
            maxLength={250}
            placeholder="Thank you for shopping with us!"
            className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
          />

          <div className="mt-1 flex flex-col gap-1 text-xs text-muted-foreground sm:flex-row sm:justify-between">
            <span>This message appears at the bottom of the invoice.</span>

            <span className="shrink-0">
              {settings.footerMessage.length}/250
            </span>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="mt-6 border-t border-border pt-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium">Terms & Conditions</p>

              <p className="mt-1 text-xs text-muted-foreground">
                Add return policies, exchange policies or other shop rules to
                your invoices.
              </p>
            </div>

            {/* Enable / Disable Toggle */}
            <button
              type="button"
              role="switch"
              aria-checked={settings.showTermsAndConditions}
              onClick={() => toggleSetting("showTermsAndConditions")}
              className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                settings.showTermsAndConditions ? "bg-brand" : "bg-muted"
              }`}
            >
              <span
                className={`absolute top-1 size-4 rounded-full bg-white shadow transition-transform ${
                  settings.showTermsAndConditions
                    ? "translate-x-6"
                    : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Terms List */}
          {settings.showTermsAndConditions && (
            <div className="mt-5">
              <div className="space-y-3">
                {settings.termsAndConditions.map((term, index) => (
                  <div key={index} className="flex items-start gap-3">
                    {/* Sequence Number */}
                    <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-xs font-semibold text-muted-foreground">
                      {index + 1}
                    </div>

                    {/* Term Input */}
                    <textarea
                      value={term}
                      onChange={(event) =>
                        handleTermChange(index, event.target.value)
                      }
                      rows={2}
                      maxLength={300}
                      placeholder={`Enter condition ${index + 1}`}
                      className="min-w-0 flex-1 resize-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
                    />

                    {/* Delete Term */}
                    <button
                      type="button"
                      onClick={() => handleRemoveTerm(index)}
                      className="grid size-9 shrink-0 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-danger/10 hover:text-danger"
                      aria-label={`Remove condition ${index + 1}`}
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {settings.termsAndConditions.length === 0 && (
                <div className="rounded-lg border border-dashed border-border p-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    No terms or conditions added.
                  </p>
                </div>
              )}

              {/* Add Term */}
              <button
                type="button"
                onClick={handleAddTerm}
                className="mt-4 inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
              >
                <Plus className="size-4" />
                Add Condition
              </button>

              <p className="mt-3 text-xs text-muted-foreground">
                Conditions will be printed sequentially on the invoice in the
                order shown above.
              </p>
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="mt-6 flex justify-end border-t border-border pt-6">
          <button
            type="submit"
            className="w-full rounded-lg bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-foreground/90 sm:w-auto"
          >
            Save Invoice Settings
          </button>
        </div>
      </form>
    </section>
  );
}
