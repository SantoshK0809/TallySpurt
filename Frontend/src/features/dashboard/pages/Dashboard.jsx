// import { useMemo } from "react";
// import { Link } from "react-router-dom";
// import { useStore } from "../../../lib/useStore.jsx";
// import { formatINR } from "../../../lib/storeHelpers.jsx";
// import {
//   ResponsiveContainer,
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
// } from "recharts";
// import { ScanLine, Package, Receipt, TrendingUp, AlertTriangle } from "lucide-react";

// function startOfDay(d) {
//   const x = new Date(d);
//   x.setHours(0, 0, 0, 0);
//   return x;
// }

// export default function Dashboard() {
//   const { state } = useStore();
//   const today = startOfDay(new Date()).getTime();

//   const todayBills = state.bills.filter((b) => startOfDay(b.date).getTime() === today);
//   const todayRevenue = todayBills.reduce((s, b) => s + b.total, 0);
//   const monthStart = new Date();
//   monthStart.setDate(1);
//   monthStart.setHours(0, 0, 0, 0);
//   const monthBills = state.bills.filter((b) => new Date(b.date) >= monthStart);
//   const monthRevenue = monthBills.reduce((s, b) => s + b.total, 0);

//   const lowStock = state.inventory.filter((i) => i.stock <= i.lowAt);

//   const chartData = useMemo(() => {
//     const map = new Map();
//     for (let i = 13; i >= 0; i--) {
//       const d = new Date();
//       d.setDate(d.getDate() - i);
//       const key = startOfDay(d).getTime();
//       map.set(key, { date: d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" }), revenue: 0 });
//     }
//     state.bills.forEach((b) => {
//       const k = startOfDay(b.date).getTime();
//       if (map.has(k)) map.get(k).revenue += b.total;
//     });
//     return Array.from(map.values());
//   }, [state.bills]);

//   const stats = [
//     { label: "Today's Revenue", value: formatINR(todayRevenue), sub: `${todayBills.length} bills`, icon: TrendingUp, accent: true },
//     { label: "Month to Date", value: formatINR(monthRevenue), sub: `${monthBills.length} bills`, icon: Receipt },
//     { label: "Inventory Items", value: state.inventory.length, sub: `${state.inventory.reduce((s, i) => s + i.stock, 0)} units`, icon: Package },
//     { label: "Low Stock", value: lowStock.length, sub: "needs attention", icon: AlertTriangle, danger: lowStock.length > 0 },
//   ];

//   return (
//     <div>
//       <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
//           <p className="mt-1 text-sm text-muted-foreground">
//             Snapshot of today's sales, inventory health and store performance.
//           </p>
//         </div>
//         <Link
//           to="/billing"
//           className="inline-flex items-center gap-2 rounded-xl bg-foreground px-4 py-2.5 text-sm font-semibold text-background shadow-sm hover:bg-foreground/90"
//         >
//           <ScanLine className="size-4" /> Start New Bill
//         </Link>
//       </header>

//       <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
//         {stats.map((s) => {
//           const Icon = s.icon;
//           return (
//             <div key={s.label} className="card-soft p-5">
//               <div className="flex items-center justify-between">
//                 <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{s.label}</p>
//                 <Icon className={"size-4 " + (s.danger ? "text-danger" : s.accent ? "text-brand" : "text-muted-foreground")} />
//               </div>
//               <p className="mt-3 font-mono text-2xl font-medium tracking-tight">{s.value}</p>
//               <p className="mt-1 text-xs text-muted-foreground">{s.sub}</p>
//             </div>
//           );
//         })}
//       </div>

//       <section className="mt-8 card-soft p-6">
//         <div className="mb-4 flex items-center justify-between">
//           <div>
//             <h2 className="text-base font-semibold">Sales — Last 14 days</h2>
//             <p className="text-xs text-muted-foreground">Daily revenue trend</p>
//           </div>
//           <Link to="/reports" className="text-xs font-medium text-brand">View full report →</Link>
//         </div>
//         <div className="h-64 w-full">
//           <ResponsiveContainer>
//             <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
//               <defs>
//                 <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="0%" stopColor="var(--brand)" stopOpacity={0.35} />
//                   <stop offset="100%" stopColor="var(--brand)" stopOpacity={0} />
//                 </linearGradient>
//               </defs>
//               <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
//               <XAxis dataKey="date" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
//               <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => "₹" + (v / 1000).toFixed(0) + "k"} />
//               <Tooltip
//                 contentStyle={{ borderRadius: 12, border: "1px solid var(--border)", fontSize: 12 }}
//                 formatter={(v) => [formatINR(v), "Revenue"]}
//               />
//               <Area type="monotone" dataKey="revenue" stroke="var(--brand)" strokeWidth={2} fill="url(#rev)" />
//             </AreaChart>
//           </ResponsiveContainer>
//         </div>
//       </section>

//       <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
//         <div className="card-soft p-6">
//           <div className="mb-4 flex items-center justify-between">
//             <h3 className="text-base font-semibold">Low Stock Alerts</h3>
//             <Link to="/inventory" className="text-xs font-medium text-brand">Manage</Link>
//           </div>
//           <div className="space-y-3">
//             {lowStock.length === 0 && <p className="text-sm text-muted-foreground">All items are above their reorder level. </p>}
//             {lowStock.map((i) => (
//               <div key={i.sku} className="flex items-center justify-between rounded-xl bg-surface-muted px-4 py-3">
//                 <div>
//                   <p className="text-sm font-medium">{i.name}</p>
//                   <p className="font-mono text-[11px] text-muted-foreground">{i.sku} · {i.size} · {i.color}</p>
//                 </div>
//                 <span className="rounded-md bg-danger/10 px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-danger">
//                   {i.stock} left
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="card-soft p-6">
//           <div className="mb-4 flex items-center justify-between">
//             <h3 className="text-base font-semibold">Recent Bills</h3>
//             <Link to="/reports" className="text-xs font-medium text-brand">All</Link>
//           </div>
//           <div className="space-y-3">
//             {state.bills.slice(0, 6).map((b) => (
//               <div key={b.id} className="flex items-center justify-between rounded-xl px-4 py-3 hover:bg-surface-muted">
//                 <div>
//                   <p className="font-mono text-xs text-muted-foreground">{b.id.slice(0, 18)}…</p>
//                   <p className="text-xs text-muted-foreground">{new Date(b.date).toLocaleString("en-IN")} · {b.payment}</p>
//                 </div>
//                 <p className="font-mono text-sm font-medium">{formatINR(b.total)}</p>
//               </div>
//             ))}
//             {state.bills.length === 0 && <p className="text-sm text-muted-foreground">No bills yet — create your first invoice.</p>}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

import DashboardHeader from "../components/DashboardHeader";
import DashboardStats from "../components/DashboardStats";
import SalesChart from "../components/SalesChart";
import LowStockAlerts from "../components/LowStockAlerts";
import RecentBills from "../components/RecentBills";

import { useDashboardData } from "../hooks/useDashboardData";

export default function Dashboard() {
  const { stats, chartData, lowStockItems, recentBills } = useDashboardData();

  return (
    <div className="w-full min-w-0">
      <DashboardHeader />

      <DashboardStats stats={stats} />

      <SalesChart data={chartData} />

      <div className="mt-6 grid grid-cols-1 gap-6 sm:mt-8 xl:grid-cols-2">
        <LowStockAlerts items={lowStockItems} />

        <RecentBills bills={recentBills} />
      </div>
    </div>
  );
}
