// import { Store, Upload } from "lucide-react";

// export default function ShopProfileSettings() {
//   return (
//     <section className="card-soft p-4 sm:p-6">
//       <div className="mb-6">
//         <h2 className="font-semibold">Shop Profile</h2>

//         <p className="mt-1 text-xs text-muted-foreground">
//           Basic information about your shop.
//         </p>
//       </div>

//       <div className="flex flex-col gap-6 sm:flex-row">
//         <div className="shrink-0">
//           <div className="grid size-20 place-items-center rounded-xl border border-border bg-muted">
//             <Store className="size-7 text-muted-foreground" />
//           </div>

//           <button
//             type="button"
//             className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-brand"
//           >
//             <Upload className="size-3" />
//             Upload logo
//           </button>
//         </div>

//         <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
//           <div className="sm:col-span-2">
//             <label className="mb-1.5 block text-sm font-medium">
//               Shop Name
//             </label>

//             <input
//               type="text"
//               placeholder="Rubab Mens Wear"
//               className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand/30"
//             />
//           </div>

//           <div>
//             <label className="mb-1.5 block text-sm font-medium">
//               Shop Type
//             </label>

//             <input
//               type="text"
//               value="Clothing"
//               disabled
//               className="w-full rounded-lg border border-border bg-muted px-3 py-2.5 text-sm text-muted-foreground"
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import { useState } from "react";

import ShopLogoUpload from "./ShopLogoUpload";

export default function ShopProfileSettings() {
  const [shopName, setShopName] = useState("Rubab Mens Wear");
  const [logo, setLogo] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log({
      shopName,
      logo,
    });
  };

  return (
    <section className="card-soft p-4 sm:p-6">
      <div className="mb-6">
        <h2 className="font-semibold">Shop Profile</h2>

        <p className="mt-1 text-xs text-muted-foreground">
          Manage your shop identity and basic information.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <ShopLogoUpload initialLogo={null} onChange={setLogo} />

        <div className="my-6 border-t border-border" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-medium">
              Shop Name
            </label>

            <input
              type="text"
              value={shopName}
              onChange={(event) => setShopName(event.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium">
              Shop Type
            </label>

            <input
              type="text"
              value="Clothing"
              disabled
              className="w-full cursor-not-allowed rounded-lg border border-border bg-muted px-3 py-2.5 text-sm text-muted-foreground"
            />

            <p className="mt-1.5 text-xs text-muted-foreground">
              Shop type cannot be changed after setup.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="w-full rounded-lg bg-foreground px-4 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-foreground/90 sm:w-auto"
          >
            Save Profile
          </button>
        </div>
      </form>
    </section>
  );
}
