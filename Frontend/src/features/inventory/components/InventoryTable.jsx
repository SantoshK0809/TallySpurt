// import InventoryTableRow from "./InventoryTableRow";

// const TABLE_HEADERS = [
//   "SKU",
//   "Item",
//   "Size",
//   "Color",
//   "Price",
//   "Stock",
//   "Status",
//   "",
// ];

// export default function InventoryTable({ items, onEdit, onDelete }) {
//   return (
//     <div className="card-soft overflow-hidden p-0">
//       <table className="w-full text-left">
//         <thead>
//           <tr className="border-b border-border bg-surface-muted/40">
//             {TABLE_HEADERS.map((header, index) => (
//               <th
//                 key={`${header}-${index}`}
//                 className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"
//               >
//                 {header}
//               </th>
//             ))}
//           </tr>
//         </thead>

//         <tbody className="divide-y divide-border/60">
//           {items.map((item) => (
//             <InventoryTableRow
//               key={item.sku}
//               item={item}
//               onEdit={onEdit}
//               onDelete={onDelete}
//             />
//           ))}

//           {items.length === 0 && (
//             <tr>
//               <td
//                 colSpan={8}
//                 className="px-5 py-12 text-center text-sm text-muted-foreground"
//               >
//                 No items match your filters.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import InventoryTableRow from "./InventoryTableRow.jsx";

const TABLE_HEADERS = [
  "SKU",
  "Item",
  "Size",
  "Color",
  "Price",
  "Stock",
  "Status",
  "",
];

export default function InventoryTable({ items, onEdit, onDelete }) {
  return (
    <div className="card-soft overflow-hidden p-0">
      {/* Horizontal scroll container */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-[900px] w-full text-left">
          <thead>
            <tr className="border-b border-border bg-surface-muted/40">
              {TABLE_HEADERS.map((header, index) => (
                <th
                  key={`${header}-${index}`}
                  className="whitespace-nowrap px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-border/60">
            {items.map((item) => (
              <InventoryTableRow
                key={item.sku}
                item={item}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}

            {items.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-5 py-12 text-center text-sm text-muted-foreground"
                >
                  No items match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
