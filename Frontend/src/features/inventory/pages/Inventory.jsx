import { useMemo, useState } from "react";
import { useStore } from "../../../lib/useStore.jsx";
import { formatINR } from "../../../lib/storeHelpers.jsx";
import { Plus, Search, Pencil, Trash2, X } from "lucide-react";
import { toast } from "sonner";

const empty = { sku: "", name: "", category: "", size: "", color: "", price: 0, stock: 0, lowAt: 5 };

export default function Inventory() {
  const { state, upsertItem, removeItem } = useStore();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [editing, setEditing] = useState(null);

  const categories = useMemo(() => ["All", ...Array.from(new Set(state.inventory.map((i) => i.category)))], [state.inventory]);

  const rows = state.inventory.filter((i) => {
    const q = query.toLowerCase();
    const matchesQ = !q || i.name.toLowerCase().includes(q) || i.sku.toLowerCase().includes(q);
    const matchesC = filter === "All" || i.category === filter;
    return matchesQ && matchesC;
  });

  function save(form) {
    if (!form.sku || !form.name) {
      toast.error("SKU and Name are required");
      return;
    }
    upsertItem({ ...form, price: Number(form.price) || 0, stock: Number(form.stock) || 0, lowAt: Number(form.lowAt) || 0 });
    toast.success(`Saved ${form.name}`);
    setEditing(null);
  }

  return (
    <div>
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Inventory</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage SKUs, sizes, pricing and stock thresholds.</p>
        </div>
        <button
          onClick={() => setEditing(empty)}
          className="inline-flex items-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-semibold text-background shadow-sm hover:bg-foreground/90"
        >
          <Plus className="size-4" /> Add Item
        </button>
      </header>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="card-soft flex flex-1 items-center gap-3 p-1.5 px-4 min-w-65">
          <Search className="size-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or SKU…"
            className="w-full bg-transparent py-2 text-sm focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={
                "rounded-full px-3 py-1.5 text-xs font-medium ring-1 transition-colors " +
                (filter === c ? "bg-foreground text-background ring-foreground" : "bg-background text-muted-foreground ring-border hover:bg-surface-muted")
              }
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="card-soft overflow-hidden p-0">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border bg-surface-muted/40">
              {["SKU", "Item", "Size", "Color", "Price", "Stock", "Status", ""].map((h) => (
                <th key={h} className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {rows.map((i) => {
              const low = i.stock <= i.lowAt;
              const out = i.stock === 0;
              return (
                <tr key={i.sku}>
                  <td className="px-5 py-4 font-mono text-xs">{i.sku}</td>
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium">{i.name}</p>
                    <p className="text-[11px] text-muted-foreground">{i.category}</p>
                  </td>
                  <td className="px-5 py-4 text-sm">{i.size}</td>
                  <td className="px-5 py-4 text-sm">{i.color}</td>
                  <td className="px-5 py-4 font-mono text-sm">{formatINR(i.price)}</td>
                  <td className="px-5 py-4 font-mono text-sm">{i.stock}</td>
                  <td className="px-5 py-4">
                    {out ? (
                      <span className="rounded bg-danger/10 px-2 py-0.5 text-[10px] font-bold uppercase text-danger">Out</span>
                    ) : low ? (
                      <span className="rounded bg-warning/15 px-2 py-0.5 text-[10px] font-bold uppercase text-warning">Low</span>
                    ) : (
                      <span className="rounded bg-success/10 px-2 py-0.5 text-[10px] font-bold uppercase text-success">In Stock</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => setEditing(i)} className="grid size-7 place-items-center rounded-md text-muted-foreground hover:bg-surface-muted hover:text-foreground"><Pencil className="size-3.5" /></button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete ${i.name}?`)) { removeItem(i.sku); toast.success("Item deleted"); }
                        }}
                        className="grid size-7 place-items-center rounded-md text-muted-foreground hover:bg-surface-muted hover:text-danger"
                      ><Trash2 className="size-3.5" /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr><td colSpan={8} className="px-5 py-12 text-center text-sm text-muted-foreground">No items match your filters.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {editing && <ItemDialog initial={editing} onSave={save} onClose={() => setEditing(null)} />}
    </div>
  );
}

function ItemDialog({ initial, onSave, onClose }) {
  const [form, setForm] = useState(initial);
  const isNew = !initial.sku;

  function set(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4">
      <div className="card-soft w-full max-w-lg">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <p className="text-sm font-semibold">{isNew ? "Add Item" : `Edit ${initial.name}`}</p>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="size-4" /></button>
        </div>
        <div className="grid grid-cols-2 gap-4 px-6 py-6">
          <Field label="SKU" value={form.sku} onChange={(v) => set("sku", v)} mono disabled={!isNew} />
          <Field label="Category" value={form.category} onChange={(v) => set("category", v)} />
          <div className="col-span-2"><Field label="Name" value={form.name} onChange={(v) => set("name", v)} /></div>
          <Field label="Size" value={form.size} onChange={(v) => set("size", v)} />
          <Field label="Color" value={form.color} onChange={(v) => set("color", v)} />
          <Field label="Price (₹)" type="number" value={form.price} onChange={(v) => set("price", v)} />
          <Field label="Stock" type="number" value={form.stock} onChange={(v) => set("stock", v)} />
          <Field label="Low-stock at" type="number" value={form.lowAt} onChange={(v) => set("lowAt", v)} />
        </div>
        <div className="flex justify-end gap-2 border-t border-border bg-surface-muted px-6 py-3">
          <button onClick={onClose} className="rounded-lg bg-background px-4 py-2 text-sm font-semibold ring-1 ring-border">Cancel</button>
          <button onClick={() => onSave(form)} className="rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background">Save</button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", mono = false, disabled = false }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={
          "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30 disabled:opacity-60 " +
          (mono ? "font-mono" : "")
        }
      />
    </label>
  );
}
