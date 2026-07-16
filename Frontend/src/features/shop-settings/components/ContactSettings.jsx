import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";

const initialContact = {
  phone: "",
  alternatePhone: "",
  email: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  postalCode: "",
};

export default function ContactSettings() {
  const [contact, setContact] = useState(initialContact);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setContact((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Saving contact settings:", contact);
  };

  const inputClassName =
    "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20";

  return (
    <section className="card-soft p-4 sm:p-6">
      <div className="mb-6">
        <h2 className="font-semibold">Contact & Address</h2>

        <p className="mt-1 text-xs text-muted-foreground">
          Contact and location information for your shop.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Phone Number
            </label>

            <div className="relative">
              <Phone className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <input
                type="tel"
                name="phone"
                value={contact.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className={`${inputClassName} pl-10`}
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Alternate Phone
            </label>

            <input
              type="tel"
              name="alternatePhone"
              value={contact.alternatePhone}
              onChange={handleChange}
              placeholder="Optional"
              className={inputClassName}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium">
              Business Email
            </label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <input
                type="email"
                name="email"
                value={contact.email}
                onChange={handleChange}
                placeholder="shop@example.com"
                className={`${inputClassName} pl-10`}
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium">
              Address Line 1
            </label>

            <div className="relative">
              <MapPin className="absolute left-3 top-3 size-4 text-muted-foreground" />

              <input
                type="text"
                name="addressLine1"
                value={contact.addressLine1}
                onChange={handleChange}
                placeholder="Shop number, building, street"
                className={`${inputClassName} pl-10`}
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium">
              Address Line 2
            </label>

            <input
              type="text"
              name="addressLine2"
              value={contact.addressLine2}
              onChange={handleChange}
              placeholder="Area or landmark (optional)"
              className={inputClassName}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">City</label>

            <input
              type="text"
              name="city"
              value={contact.city}
              onChange={handleChange}
              className={inputClassName}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">State</label>

            <input
              type="text"
              name="state"
              value={contact.state}
              onChange={handleChange}
              className={inputClassName}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">PIN Code</label>

            <input
              type="text"
              name="postalCode"
              value={contact.postalCode}
              onChange={handleChange}
              maxLength={6}
              className={inputClassName}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="w-full rounded-lg bg-foreground px-4 py-2.5 text-sm font-semibold text-background sm:w-auto"
          >
            Save Contact Details
          </button>
        </div>
      </form>
    </section>
  );
}
