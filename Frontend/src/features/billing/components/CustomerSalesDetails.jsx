import { User, Phone, BadgeCheck } from "lucide-react";

import BillingField from "./BillingField.jsx";

export default function CustomerSalesDetails({
  customerName,
  customerPhone,
  salesPerson,
  onCustomerNameChange,
  onCustomerPhoneChange,
  onSalesPersonChange,
}) {
  return (
    <div className="card-soft p-6">
      <h2 className="mb-4 text-sm font-semibold">Customer & Sales Person</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <BillingField
          icon={User}
          label="Customer name"
          value={customerName}
          onChange={onCustomerNameChange}
          placeholder="e.g. Anita Sharma"
        />

        <BillingField
          icon={Phone}
          label="Phone number"
          value={customerPhone}
          onChange={onCustomerPhoneChange}
          placeholder="+91 98765 43210"
        />

        <BillingField
          icon={BadgeCheck}
          label="Sales person"
          value={salesPerson}
          onChange={onSalesPersonChange}
          placeholder="Sales person name"
        />
      </div>
    </div>
  );
}
