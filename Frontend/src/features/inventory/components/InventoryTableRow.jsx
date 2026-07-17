import { Pencil, Trash2 } from "lucide-react";
import { formatINR } from "../../../lib/storeHelpers.jsx";
import InventoryStatusBadge from "./InventoryStatusBadge";

export default function InventoryTableRow({ item, onEdit, onDelete }) {
  return (
    <tr>
      <td className="px-5 py-4 font-mono text-xs">{item.sku}</td>

      <td className="px-5 py-4">
        <p className="text-sm font-medium">{item.name}</p>

        <p className="text-[11px] text-muted-foreground">{item.category}</p>
      </td>

      <td className="px-5 py-4 text-sm">{item.size}</td>

      <td className="px-5 py-4 text-sm">{item.color}</td>

      <td className="px-5 py-4 font-mono text-sm">{formatINR(item.price)}</td>

      <td className="px-5 py-4 font-mono text-sm">{item.stock}</td>

      <td className="px-5 py-4">
        <InventoryStatusBadge stock={item.stock} lowAt={item.lowAt} />
      </td>

      <td className="px-5 py-4">
        <div className="flex justify-end gap-1">
          <button
            onClick={() => onEdit(item)}
            className="grid size-7 place-items-center rounded-md text-muted-foreground hover:bg-surface-muted hover:text-foreground"
            aria-label={`Edit ${item.name}`}
          >
            <Pencil className="size-3.5" />
          </button>

          <button
            onClick={() => onDelete(item)}
            className="grid size-7 place-items-center rounded-md text-muted-foreground hover:bg-surface-muted hover:text-danger"
            aria-label={`Delete ${item.name}`}
          >
            <Trash2 className="size-3.5" />
          </button>
        </div>
      </td>
    </tr>
  );
}
