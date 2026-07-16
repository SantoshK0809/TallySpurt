// import ShopProfileSettings from "../components/ShopProfileSettings";
// import ContactSettings from "../components/ContactSettings";
// import BillingSettings from "../components/BillingSettings";
// import InvoiceSettings from "../components/InvoiceSettings";

// export default function ShopSettings() {
//   return (
//     <div className="mx-auto w-full max-w-5xl">
//       <header className="mb-6 sm:mb-8">
//         <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
//           Shop Settings
//         </h1>

//         <p className="mt-1 text-sm text-muted-foreground">
//           Manage your shop information, billing preferences and invoice
//           configuration.
//         </p>
//       </header>

//       <div className="space-y-6">
//         <ShopProfileSettings />
//         <ContactSettings />
//         <BillingSettings />
//         <InvoiceSettings />
//       </div>
//     </div>
//   );
// }

import ShopProfileSettings from "../components/ShopProfileSettings";
import ContactSettings from "../components/ContactSettings";
import BillingSettings from "../components/BillingSettings";
import InvoiceSettings from "../components/InvoiceSettings";

export default function ShopSettings() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <header className="mb-6 sm:mb-8">
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Shop Settings
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your shop information, billing preferences and invoice
          configuration.
        </p>
      </header>

      <div className="space-y-6">
        <ShopProfileSettings />

        <ContactSettings />

        <BillingSettings />

        <InvoiceSettings />
      </div>
    </div>
  );
}
