import { useState } from "react";
import { X, UserPlus } from "lucide-react";

const initialFormData = {
  name: "",
  email: "",
  phone: "",
};

export default function CreateSalespersonModal({ open, onClose, onCreate }) {
  const [formData, setFormData] = useState(initialFormData);

  if (!open) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Temporary implementation.
    // Later this will call the employee API.
    console.log("Creating salesperson:", formData);

    onCreate?.(formData);

    setFormData(initialFormData);
    onClose();
  };

  const handleClose = () => {
    setFormData(initialFormData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close modal"
        onClick={handleClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg rounded-2xl border border-border bg-background shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-border p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand">
              <UserPlus className="size-5" />
            </div>

            <div>
              <h2 className="font-semibold">Add Salesperson</h2>

              <p className="mt-1 text-xs text-muted-foreground">
                Create a salesperson account for your shop.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="grid size-9 shrink-0 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 p-5 sm:p-6">
            {/* Name */}
            <div>
              <label
                htmlFor="salesperson-name"
                className="mb-1.5 block text-sm font-medium"
              >
                Full Name
              </label>

              <input
                id="salesperson-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                required
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="salesperson-email"
                className="mb-1.5 block text-sm font-medium"
              >
                Email Address
              </label>

              <input
                id="salesperson-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="salesperson@example.com"
                required
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="salesperson-phone"
                className="mb-1.5 block text-sm font-medium"
              >
                Phone Number
              </label>

              <input
                id="salesperson-phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col-reverse gap-3 border-t border-border p-5 sm:flex-row sm:justify-end sm:p-6">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-foreground/90"
            >
              <UserPlus className="size-4" />
              Create Salesperson
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
