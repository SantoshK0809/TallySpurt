import { Minus, Plus, Trash2 } from "lucide-react";
import { formatINR } from "../../../lib/storeHelpers.jsx";

export default function BillingItemRow({ item, onQuantityChange, onRemove }) {
  return (
    <tr>
      <td className="px-6 py-5">
        <p className="text-sm font-medium">{item.name}</p>

        <p className="font-mono text-[11px] text-muted-foreground">
          {item.sku} · {formatINR(item.price)}
        </p>
      </td>

      <td className="px-6 py-5">
        <div className="flex gap-2">
          <span className="rounded bg-surface-muted px-2 py-0.5 text-[10px] font-semibold uppercase">
            {item.size}
          </span>

          <span className="rounded bg-surface-muted px-2 py-0.5 text-[10px] font-semibold uppercase text-muted-foreground">
            {item.color}
          </span>
        </div>
      </td>

      <td className="px-6 py-5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onQuantityChange(item.sku, -1)}
            className="grid size-6 place-items-center rounded-full ring-1 ring-border hover:bg-surface-muted"
          >
            <Minus className="size-3" />
          </button>

          <span className="w-5 text-center text-sm font-medium">
            {item.qty}
          </span>

          <button
            type="button"
            onClick={() => onQuantityChange(item.sku, 1)}
            className="grid size-6 place-items-center rounded-full ring-1 ring-border hover:bg-surface-muted"
          >
            <Plus className="size-3" />
          </button>
        </div>
      </td>

      <td className="px-6 py-5 text-right font-mono text-sm font-medium">
        {formatINR(item.price * item.qty)}
      </td>

      <td className="px-3 py-5">
        <button
          type="button"
          onClick={() => onRemove(item.sku)}
          className="grid size-7 place-items-center rounded-md text-muted-foreground hover:bg-surface-muted hover:text-danger"
        >
          <Trash2 className="size-4" />
        </button>
      </td>
    </tr>
  );
}
