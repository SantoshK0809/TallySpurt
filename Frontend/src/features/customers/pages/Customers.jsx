import { useMemo, useState } from "react";
import { useStore } from "../../../lib/useStore.jsx";
import { formatINR } from "../../../lib/storeHelpers.jsx";
import { Plus, Search, X } from "lucide-react";
import { toast } from "sonner";

export default function Customers() {
  const { state, addCustomer } = useStore();
  const [query, setQuery] = useState("");
  const [adding, setAdding] = useState(false);

  const spendBy = useMemo(() => {
    const m = new Map();
    state.bills.forEach((b) => {
      if (!b.customerId) return;
      m.set(b.customerId, (m.get(b.customerId) || 0) + b.total);
    });
    return m;
  }, [state.bills]);

  const rows = state.customers.filter((c) => {
    const q = query.toLowerCase();
    return !q || c.name.toLowerCase().includes(q) || c.phone.includes(q);
  });

  return (
    <div>
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Customers</h1>
          <p className="mt-1 text-sm text-muted-foreground">Loyalty members and their lifetime spend.</p>
        </div>
        <button
          onClick={() => setAdding(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-semibold text-background hover:bg-foreground/90"
        >
          <Plus className="size-4" /> Add Customer
        </button>
      </header>

      <div className="card-soft mb-6 flex items-center gap-3 p-1.5 px-4">
        <Search className="size-4 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or phone…"
          className="w-full bg-transparent py-2 text-sm focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map((c) => (
          <div key={c.id} className="card-soft p-5">
            <div className="flex items-center gap-3">
              <div className="grid size-11 place-items-center rounded-full bg-surface-muted text-sm font-bold ring-1 ring-black/5">
                {c.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{c.name}</p>
                <p className="truncate text-xs text-muted-foreground">{c.phone}</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-4 text-center">
              <Stat label="Points" value={c.points.toLocaleString("en-IN")} />
              <Stat label="Visits" value={c.visits} />
              <Stat label="Spend" value={formatINR(spendBy.get(c.id) || 0)} />
            </div>
          </div>
        ))}
        {rows.length === 0 && (
          <p className="col-span-full py-12 text-center text-sm text-muted-foreground">No customers match.</p>
        )}
      </div>

      {adding && (
        <AddCustomer
          onClose={() => setAdding(false)}
          onSave={(c) => {
            addCustomer({ id: `C-${Date.now()}`, points: 0, visits: 0, ...c });
            toast.success("Customer added");
            setAdding(false);
          }}
        />
      )}
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-1 font-mono text-sm">{value}</p>
    </div>
  );
}

function AddCustomer({ onClose, onSave }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4">
      <div className="card-soft w-full max-w-sm">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <p className="text-sm font-semibold">Add Customer</p>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="size-4" /></button>
        </div>
        <div className="space-y-4 px-6 py-6">
          <label className="block">
            <span className="mb-1 block text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30" />
          </label>
          <label className="block">
            <span className="mb-1 block text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Phone</span>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 …" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30" />
          </label>
        </div>
        <div className="flex justify-end gap-2 border-t border-border bg-surface-muted px-6 py-3">
          <button onClick={onClose} className="rounded-lg bg-background px-4 py-2 text-sm font-semibold ring-1 ring-border">Cancel</button>
          <button
            onClick={() => {
              if (!name || !phone) return toast.error("Name and phone required");
              onSave({ name, phone });
            }}
            className="rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background"
          >Save</button>
        </div>
      </div>
    </div>
  );
}
