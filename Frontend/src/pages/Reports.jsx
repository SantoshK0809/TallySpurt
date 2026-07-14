import { useMemo, useState } from "react";
import { useStore } from "../lib/useStore.jsx";
import { formatINR } from "../lib/storeHelpers.jsx";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from "recharts";
import { Download } from "lucide-react";
import { toast } from "sonner";

function startOfDay(d) { const x = new Date(d); x.setHours(0,0,0,0); return x; }
function ymKey(d) { const x = new Date(d); return `${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,"0")}`; }
function ymLabel(d) { const x = new Date(d); return x.toLocaleDateString("en-IN", { month: "short", year: "2-digit" }); }

export default function Reports() {
  const { state } = useStore();
  const [mode, setMode] = useState("daily"); // daily | monthly

  const daily = useMemo(() => {
    const map = new Map();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const k = startOfDay(d).getTime();
      map.set(k, { key: k, label: d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" }), revenue: 0, count: 0 });
    }
    state.bills.forEach((b) => {
      const k = startOfDay(b.date).getTime();
      if (map.has(k)) { const row = map.get(k); row.revenue += b.total; row.count += 1; }
    });
    return Array.from(map.values());
  }, [state.bills]);

  const monthly = useMemo(() => {
    const map = new Map();
    for (let i = 11; i >= 0; i--) {
      const d = new Date(); d.setMonth(d.getMonth() - i, 1);
      const k = ymKey(d);
      map.set(k, { key: k, label: ymLabel(d), revenue: 0, count: 0 });
    }
    state.bills.forEach((b) => {
      const k = ymKey(b.date);
      if (map.has(k)) { const row = map.get(k); row.revenue += b.total; row.count += 1; }
    });
    return Array.from(map.values());
  }, [state.bills]);

  const data = mode === "daily" ? daily : monthly;
  const totalRev = data.reduce((s, r) => s + r.revenue, 0);
  const totalBills = data.reduce((s, r) => s + r.count, 0);
  const avg = totalBills ? Math.round(totalRev / totalBills) : 0;

  // Top selling items in selected range
  const topItems = useMemo(() => {
    const earliest = data[0]?.key;
    const map = new Map();
    state.bills.forEach((b) => {
      const k = mode === "daily" ? startOfDay(b.date).getTime() : ymKey(b.date);
      if (mode === "daily" ? k >= earliest : data.some((d) => d.key === k)) {
        b.items.forEach((it) => {
          const cur = map.get(it.sku) || { sku: it.sku, name: it.name, qty: 0, revenue: 0 };
          cur.qty += it.qty;
          cur.revenue += it.qty * it.price;
          map.set(it.sku, cur);
        });
      }
    });
    return Array.from(map.values()).sort((a, b) => b.revenue - a.revenue).slice(0, 6);
  }, [state.bills, data, mode]);

  function exportCSV() {
    const rows = [["Period", "Revenue (INR)", "Bills"]];
    data.forEach((r) => rows.push([r.label, r.revenue, r.count]));
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vanya-${mode}-sales.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Exported CSV");
  }

  return (
    <div>
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Sales Reports</h1>
          <p className="mt-1 text-sm text-muted-foreground">Track revenue, bills and best sellers over time.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="inline-flex rounded-xl bg-surface-muted p-1 ring-1 ring-black/5">
            {[["daily","Daily (30d)"],["monthly","Monthly (12m)"]].map(([k,l]) => (
              <button
                key={k}
                onClick={() => setMode(k)}
                className={"rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors " + (mode === k ? "bg-background text-foreground shadow-sm" : "text-muted-foreground")}
              >
                {l}
              </button>
            ))}
          </div>
          <button onClick={exportCSV} className="inline-flex items-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-semibold text-background hover:bg-foreground/90">
            <Download className="size-4" /> Export CSV
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KPI label="Total Revenue" value={formatINR(totalRev)} />
        <KPI label="Total Bills" value={totalBills.toLocaleString("en-IN")} />
        <KPI label="Avg. Bill Value" value={formatINR(avg)} />
      </div>

      <section className="card-soft mt-6 p-6">
        <h2 className="mb-4 text-base font-semibold">{mode === "daily" ? "Daily Revenue" : "Monthly Revenue"}</h2>
        <div className="h-72">
          <ResponsiveContainer>
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="label" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} interval={mode === "daily" ? 2 : 0} />
              <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => "₹" + (v/1000).toFixed(0) + "k"} />
              <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", fontSize: 12 }} formatter={(v) => [formatINR(v), "Revenue"]} />
              <Bar dataKey="revenue" radius={[6,6,0,0]}>
                {data.map((_, i) => (<Cell key={i} fill="var(--brand)" fillOpacity={0.85} />))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card-soft p-6">
          <h3 className="mb-4 text-base font-semibold">Top Selling Items</h3>
          <div className="space-y-3">
            {topItems.length === 0 && <p className="text-sm text-muted-foreground">No sales in this range.</p>}
            {topItems.map((t, idx) => (
              <div key={t.sku} className="flex items-center justify-between rounded-xl bg-surface-muted px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="grid size-6 place-items-center rounded-full bg-background text-[11px] font-bold ring-1 ring-border">{idx + 1}</span>
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="font-mono text-[11px] text-muted-foreground">{t.sku} · {t.qty} units</p>
                  </div>
                </div>
                <p className="font-mono text-sm font-medium">{formatINR(t.revenue)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card-soft p-6">
          <h3 className="mb-4 text-base font-semibold">Period Breakdown</h3>
          <div className="max-h-80 overflow-y-auto">
            <table className="w-full text-left text-sm">
              <thead className="sticky top-0 bg-surface">
                <tr className="border-b border-border">
                  <th className="py-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Period</th>
                  <th className="py-2 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Bills</th>
                  <th className="py-2 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {[...data].reverse().map((r) => (
                  <tr key={r.key}>
                    <td className="py-2.5">{r.label}</td>
                    <td className="py-2.5 text-right font-mono">{r.count}</td>
                    <td className="py-2.5 text-right font-mono">{formatINR(r.revenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

function KPI({ label, value }) {
  return (
    <div className="card-soft p-5">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-3 font-mono text-2xl font-medium tracking-tight">{value}</p>
    </div>
  );
}
