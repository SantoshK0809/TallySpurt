// import { useEffect, useRef, useState } from "react";
// import { useStore } from "../lib/useStore.jsx";
// import { formatINR } from "../lib/storeHelpers.jsx";
// import { ScanLine, Plus, Minus, Trash2, Printer, CheckCircle2, X } from "lucide-react";
// import { toast } from "sonner";

// export default function Billing() {
//   const { state, addBill, findBySku } = useStore();
//   const [scan, setScan] = useState("");
//   const [items, setItems] = useState([]);
//   const [discountPct, setDiscountPct] = useState(0);
//   const [customerId, setCustomerId] = useState(null);
//   const [payment, setPayment] = useState("UPI");
//   const [showReceipt, setShowReceipt] = useState(null);
//   const inputRef = useRef(null);

//   useEffect(() => {
//     inputRef.current?.focus();
//   }, []);

//   function addBySku(sku) {
//     const clean = String(sku).trim();
//     if (!clean) return;
//     const item = findBySku(clean);
//     if (!item) {
//       toast.error(`SKU "${clean}" not found in inventory`);
//       return;
//     }
//     if (item.stock <= 0) {
//       toast.error(`${item.name} is out of stock`);
//       return;
//     }
//     setItems((prev) => {
//       const existing = prev.find((p) => p.sku === item.sku);
//       if (existing) {
//         if (existing.qty >= item.stock) {
//           toast.warning(`Only ${item.stock} in stock`);
//           return prev;
//         }
//         return prev.map((p) => (p.sku === item.sku ? { ...p, qty: p.qty + 1 } : p));
//       }
//       return [
//         ...prev,
//         { sku: item.sku, name: item.name, price: item.price, qty: 1, size: item.size, color: item.color, stock: item.stock },
//       ];
//     });
//     toast.success(`Added ${item.name}`);
//   }

//   function onScanSubmit(e) {
//     e.preventDefault();
//     addBySku(scan);
//     setScan("");
//     inputRef.current?.focus();
//   }

//   function changeQty(sku, delta) {
//     setItems((prev) =>
//       prev
//         .map((p) => {
//           if (p.sku !== sku) return p;
//           const next = p.qty + delta;
//           if (next > p.stock) {
//             toast.warning(`Only ${p.stock} in stock`);
//             return p;
//           }
//           return { ...p, qty: next };
//         })
//         .filter((p) => p.qty > 0),
//     );
//   }

//   function removeLine(sku) {
//     setItems((prev) => prev.filter((p) => p.sku !== sku));
//   }

//   const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
//   const discount = Math.round((subtotal * discountPct) / 100);
//   const total = subtotal - discount;

//   function completeSale() {
//     if (items.length === 0) {
//       toast.error("Add at least one item");
//       return;
//     }
//     const bill = {
//       id: `INV-${Date.now()}`,
//       date: new Date().toISOString(),
//       items: items.map((it) => ({ sku: it.sku, name: it.name, price: it.price, qty: it.qty })),
//       subtotal,
//       discount,
//       total,
//       customerId,
//       payment,
//     };
//     addBill(bill);
//     setShowReceipt(bill);
//     setItems([]);
//     setDiscountPct(0);
//     setCustomerId(null);
//     toast.success(`Bill ${bill.id} created`);
//   }

//   const customer = state.customers.find((c) => c.id === customerId);

//   return (
//     <div>
//       <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-semibold tracking-tight">New Checkout</h1>
//           <p className="mt-1 text-sm text-muted-foreground max-w-[52ch]">
//             Scan item barcodes / QR or type the SKU manually to build the invoice.
//           </p>
//         </div>
//         <div className="text-right">
//           <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Current Total</p>
//           <p className="font-mono text-2xl font-medium text-brand">{formatINR(total)}</p>
//         </div>
//       </header>

//       <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
//         <div className="space-y-6 lg:col-span-8">
//           <form
//             onSubmit={onScanSubmit}
//             className="card-soft flex items-center p-1.5"
//           >
//             <div className="flex flex-1 items-center gap-3 px-4">
//               <ScanLine className="size-4 shrink-0 text-muted-foreground" />
//               <input
//                 ref={inputRef}
//                 value={scan}
//                 onChange={(e) => setScan(e.target.value)}
//                 placeholder="Scan QR / barcode or type SKU (e.g. VNY-CUR-221)…"
//                 className="min-w-0 flex-1 bg-transparent py-3 text-sm font-mono placeholder:font-sans placeholder:text-muted-foreground focus:outline-none"
//                 autoComplete="off"
//               />
//             </div>
//             <button
//               type="submit"
//               className="inline-flex items-center gap-1.5 rounded-xl bg-foreground py-2.5 pl-2 pr-3 text-sm font-medium text-background hover:bg-foreground/90"
//             >
//               <Plus className="size-4" /> Add
//             </button>
//           </form>

//           <div className="card-soft overflow-hidden p-0">
//             {items.length === 0 ? (
//               <div className="grid place-items-center px-6 py-20 text-center">
//                 <div className="grid size-14 place-items-center rounded-2xl bg-surface-muted">
//                   <ScanLine className="size-6 text-muted-foreground" />
//                 </div>
//                 <p className="mt-4 text-sm font-medium">No items yet</p>
//                 <p className="mt-1 max-w-[36ch] text-xs text-muted-foreground">
//                   Use your QR reader or type a SKU above. Try <span className="font-mono">VNY-CUR-221</span>.
//                 </p>
//               </div>
//             ) : (
//               <table className="w-full text-left">
//                 <thead>
//                   <tr className="border-b border-border bg-surface-muted/40">
//                     <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Item</th>
//                     <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Size/Color</th>
//                     <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Qty</th>
//                     <th className="px-6 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Amount</th>
//                     <th className="px-3 py-4" />
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-border/60">
//                   {items.map((it) => (
//                     <tr key={it.sku}>
//                       <td className="px-6 py-5">
//                         <p className="text-sm font-medium">{it.name}</p>
//                         <p className="font-mono text-[11px] text-muted-foreground">{it.sku} · {formatINR(it.price)}</p>
//                       </td>
//                       <td className="px-6 py-5">
//                         <div className="flex gap-2">
//                           <span className="rounded bg-surface-muted px-2 py-0.5 text-[10px] font-semibold uppercase">{it.size}</span>
//                           <span className="rounded bg-surface-muted px-2 py-0.5 text-[10px] font-semibold uppercase text-muted-foreground">{it.color}</span>
//                         </div>
//                       </td>
//                       <td className="px-6 py-5">
//                         <div className="flex items-center gap-3">
//                           <button onClick={() => changeQty(it.sku, -1)} className="grid size-6 place-items-center rounded-full ring-1 ring-border hover:bg-surface-muted">
//                             <Minus className="size-3" />
//                           </button>
//                           <span className="w-5 text-center text-sm font-medium">{it.qty}</span>
//                           <button onClick={() => changeQty(it.sku, 1)} className="grid size-6 place-items-center rounded-full ring-1 ring-border hover:bg-surface-muted">
//                             <Plus className="size-3" />
//                           </button>
//                         </div>
//                       </td>
//                       <td className="px-6 py-5 text-right font-mono text-sm font-medium">{formatINR(it.price * it.qty)}</td>
//                       <td className="px-3 py-5">
//                         <button onClick={() => removeLine(it.sku)} className="grid size-7 place-items-center rounded-md text-muted-foreground hover:bg-surface-muted hover:text-danger">
//                           <Trash2 className="size-4" />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div>
//         </div>

//         <aside className="space-y-6 lg:col-span-4">
//           <div className="card-soft p-6">
//             <h2 className="mb-6 text-sm font-semibold">Order Summary</h2>
//             <div className="space-y-4">
//               <div className="flex justify-between text-sm">
//                 <span className="text-muted-foreground">Subtotal</span>
//                 <span className="font-mono">{formatINR(subtotal)}</span>
//               </div>
//               <div className="flex items-center justify-between text-sm">
//                 <label className="text-muted-foreground" htmlFor="disc">Discount %</label>
//                 <input
//                   id="disc"
//                   type="number"
//                   min={0}
//                   max={100}
//                   value={discountPct}
//                   onChange={(e) => setDiscountPct(Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
//                   className="w-20 rounded-md border border-border bg-background px-2 py-1 text-right font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
//                 />
//               </div>
//               <div className="flex justify-between text-sm">
//                 <span className="text-muted-foreground">Discount</span>
//                 <span className="font-mono text-brand">- {formatINR(discount)}</span>
//               </div>
//               <div className="flex items-baseline justify-between border-t border-border pt-4">
//                 <span className="text-sm font-semibold">Total Payable</span>
//                 <span className="font-mono text-2xl font-medium tracking-tight">{formatINR(total)}</span>
//               </div>
//             </div>

//             <div className="mt-6">
//               <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Payment Method</p>
//               <div className="grid grid-cols-3 gap-2">
//                 {["UPI", "Card", "Cash"].map((m) => (
//                   <button
//                     key={m}
//                     onClick={() => setPayment(m)}
//                     className={
//                       "rounded-lg py-2 text-xs font-semibold ring-1 transition-colors " +
//                       (payment === m
//                         ? "bg-foreground text-background ring-foreground"
//                         : "bg-background text-foreground ring-border hover:bg-surface-muted")
//                     }
//                   >
//                     {m}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="mt-6 space-y-3">
//               <button
//                 onClick={completeSale}
//                 className="w-full rounded-xl bg-foreground py-3 text-sm font-semibold text-background shadow-sm hover:bg-foreground/90"
//               >
//                 Collect Payment
//               </button>
//               <button
//                 onClick={() => setItems([])}
//                 className="w-full rounded-xl bg-background py-3 text-sm font-semibold text-foreground ring-1 ring-border hover:bg-surface-muted"
//               >
//                 Clear Cart
//               </button>
//             </div>
//           </div>

//           <div className="rounded-3xl bg-surface-muted p-6 ring-1 ring-black/5">
//             <div className="mb-4 flex items-center justify-between">
//               <h2 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Customer</h2>
//               {customer && (
//                 <button onClick={() => setCustomerId(null)} className="text-xs font-medium text-brand">Remove</button>
//               )}
//             </div>
//             {customer ? (
//               <div>
//                 <div className="flex items-center gap-3">
//                   <div className="grid size-10 place-items-center rounded-full bg-background text-xs font-bold ring-1 ring-black/5">
//                     {customer.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium">{customer.name}</p>
//                     <p className="text-xs text-muted-foreground">{customer.phone}</p>
//                   </div>
//                 </div>
//                 <div className="mt-4 flex gap-6 border-t border-border pt-4">
//                   <div>
//                     <p className="text-[10px] font-bold uppercase text-muted-foreground">Points</p>
//                     <p className="font-mono text-sm">{customer.points.toLocaleString("en-IN")}</p>
//                   </div>
//                   <div>
//                     <p className="text-[10px] font-bold uppercase text-muted-foreground">Visits</p>
//                     <p className="font-mono text-sm">{customer.visits}</p>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <select
//                 value=""
//                 onChange={(e) => setCustomerId(e.target.value || null)}
//                 className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/30"
//               >
//                 <option value="">Walk-in customer</option>
//                 {state.customers.map((c) => (
//                   <option key={c.id} value={c.id}>{c.name} — {c.phone}</option>
//                 ))}
//               </select>
//             )}
//           </div>
//         </aside>
//       </div>

//       {showReceipt && <Receipt bill={showReceipt} customer={state.customers.find((c) => c.id === showReceipt.customerId)} onClose={() => setShowReceipt(null)} />}
//     </div>
//   );
// }

// function Receipt({ bill, customer, onClose }) {
//   function print() {
//     window.print();
//   }
//   return (
//     <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4">
//       <div className="card-soft w-full max-w-md overflow-hidden">
//         <div className="flex items-start justify-between border-b border-border px-6 py-4">
//           <div className="flex items-center gap-2">
//             <CheckCircle2 className="size-5 text-success" />
//             <p className="text-sm font-semibold">Payment Collected</p>
//           </div>
//           <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="size-4" /></button>
//         </div>
//         <div className="px-6 py-6">
//           <p className="text-center text-xs uppercase tracking-widest text-muted-foreground">Vanya Boutique</p>
//           <p className="mt-1 text-center font-mono text-[11px] text-muted-foreground">{bill.id}</p>
//           <p className="mt-0.5 text-center text-[11px] text-muted-foreground">{new Date(bill.date).toLocaleString("en-IN")}</p>

//           {customer && (
//             <p className="mt-3 text-center text-xs">{customer.name} · {customer.phone}</p>
//           )}

//           <div className="mt-5 space-y-2 border-t border-dashed border-border pt-4">
//             {bill.items.map((it) => (
//               <div key={it.sku} className="flex justify-between text-xs">
//                 <div>
//                   <p className="font-medium">{it.name}</p>
//                   <p className="font-mono text-muted-foreground">{it.qty} × {formatINR(it.price)}</p>
//                 </div>
//                 <p className="font-mono">{formatINR(it.qty * it.price)}</p>
//               </div>
//             ))}
//           </div>
//           <div className="mt-4 space-y-1 border-t border-dashed border-border pt-3 text-xs">
//             <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="font-mono">{formatINR(bill.subtotal)}</span></div>
//             <div className="flex justify-between"><span className="text-muted-foreground">Discount</span><span className="font-mono">- {formatINR(bill.discount)}</span></div>
//             <div className="mt-2 flex items-baseline justify-between border-t border-border pt-2 text-base">
//               <span className="font-semibold">Total</span>
//               <span className="font-mono font-semibold">{formatINR(bill.total)}</span>
//             </div>
//             <p className="pt-1 text-right text-[11px] text-muted-foreground">Paid via {bill.payment}</p>
//           </div>
//           <p className="mt-6 text-center text-[11px] text-muted-foreground">Thank you for shopping with us</p>
//         </div>
//         <div className="grid grid-cols-2 gap-2 border-t border-border bg-surface-muted p-3">
//           <button onClick={onClose} className="rounded-lg bg-background py-2 text-sm font-semibold ring-1 ring-border">New Bill</button>
//           <button onClick={print} className="inline-flex items-center justify-center gap-2 rounded-lg bg-foreground py-2 text-sm font-semibold text-background">
//             <Printer className="size-4" /> Print
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useEffect, useRef, useState } from "react";
// import { useStore, formatINR } from "@/lib/store.jsx";
// import { useAuth } from "@/lib/auth.jsx";
import { useStore } from "../lib/useStore.jsx";
import { formatINR } from "../lib/storeHelpers.jsx";
import { ScanLine, Plus, Minus, Trash2, Printer, CheckCircle2, X, User, Phone, BadgeCheck } from "lucide-react";
import { toast } from "sonner";

export default function Billing() {
  const { state, addBill, findBySku } = useStore();
  // const { user } = useAuth();
  const user = { name: "Admin" }; // Placeholder for user, replace with actual auth logic
  const [scan, setScan] = useState("");
  const [items, setItems] = useState([]);
  const [discountMode, setDiscountMode] = useState("percent"); // 'percent' | 'amount'
  const [discountPct, setDiscountPct] = useState(0);
  const [discountAmt, setDiscountAmt] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [salesPerson, setSalesPerson] = useState(user?.name || "");
  const [payment, setPayment] = useState("UPI");
  const [showReceipt, setShowReceipt] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => { if (user?.name && !salesPerson) setSalesPerson(user.name); }, [user]);

  function addBySku(sku) {
    const clean = String(sku).trim();
    if (!clean) return;
    const item = findBySku(clean);
    if (!item) { toast.error(`SKU "${clean}" not found in inventory`); return; }
    if (item.stock <= 0) { toast.error(`${item.name} is out of stock`); return; }
    setItems((prev) => {
      const existing = prev.find((p) => p.sku === item.sku);
      if (existing) {
        if (existing.qty >= item.stock) { toast.warning(`Only ${item.stock} in stock`); return prev; }
        return prev.map((p) => (p.sku === item.sku ? { ...p, qty: p.qty + 1 } : p));
      }
      return [...prev, { sku: item.sku, name: item.name, price: item.price, qty: 1, size: item.size, color: item.color, stock: item.stock }];
    });
    toast.success(`Added ${item.name}`);
  }

  function onScanSubmit(e) {
    e.preventDefault();
    addBySku(scan);
    setScan("");
    inputRef.current?.focus();
  }

  function changeQty(sku, delta) {
    setItems((prev) =>
      prev
        .map((p) => {
          if (p.sku !== sku) return p;
          const next = p.qty + delta;
          if (next > p.stock) { toast.warning(`Only ${p.stock} in stock`); return p; }
          return { ...p, qty: next };
        })
        .filter((p) => p.qty > 0),
    );
  }

  function removeLine(sku) {
    setItems((prev) => prev.filter((p) => p.sku !== sku));
  }

  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
  const rawDiscount = discountMode === "percent"
    ? Math.round((subtotal * Math.max(0, Math.min(100, Number(discountPct) || 0))) / 100)
    : Math.max(0, Math.round(Number(discountAmt) || 0));
  const discount = Math.min(rawDiscount, subtotal);
  const total = subtotal - discount;

  function resetForm() {
    setItems([]);
    setDiscountPct(0);
    setDiscountAmt(0);
    setCustomerName("");
    setCustomerPhone("");
  }

  function completeSale() {
    if (items.length === 0) { toast.error("Add at least one item"); return; }
    if (!salesPerson.trim()) { toast.error("Sales person name is required"); return; }
    const bill = {
      id: `INV-${Date.now()}`,
      date: new Date().toISOString(),
      items: items.map((it) => ({ sku: it.sku, name: it.name, price: it.price, qty: it.qty })),
      subtotal,
      discount,
      discountMode,
      discountValue: discountMode === "percent" ? Number(discountPct) || 0 : Number(discountAmt) || 0,
      total,
      customerName: customerName.trim() || "Walk-in",
      customerPhone: customerPhone.trim(),
      salesPerson: salesPerson.trim(),
      payment,
    };
    addBill(bill);
    setShowReceipt(bill);
    resetForm();
    toast.success(`Bill ${bill.id} created`);
  }

  return (
    <div>
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">New Checkout</h1>
          <p className="mt-1 text-sm text-muted-foreground max-w-[52ch]">
            Scan item barcodes / QR or type the SKU manually to build the invoice.
          </p>
        </div>
        <div className="text-right">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Current Total</p>
          <p className="font-mono text-2xl font-medium text-brand">{formatINR(total)}</p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <form onSubmit={onScanSubmit} className="card-soft flex items-center p-1.5">
            <div className="flex flex-1 items-center gap-3 px-4">
              <ScanLine className="size-4 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                value={scan}
                onChange={(e) => setScan(e.target.value)}
                placeholder="Scan QR / barcode or type SKU (e.g. VNY-CUR-221)…"
                className="min-w-0 flex-1 bg-transparent py-3 text-sm font-mono placeholder:font-sans placeholder:text-muted-foreground focus:outline-none"
                autoComplete="off"
              />
            </div>
            <button type="submit" className="inline-flex items-center gap-1.5 rounded-[12px] bg-foreground py-2.5 pl-2 pr-3 text-sm font-medium text-background hover:bg-foreground/90">
              <Plus className="size-4" /> Add
            </button>
          </form>

          <div className="card-soft overflow-hidden p-0">
            {items.length === 0 ? (
              <div className="grid place-items-center px-6 py-20 text-center">
                <div className="grid size-14 place-items-center rounded-2xl bg-surface-muted">
                  <ScanLine className="size-6 text-muted-foreground" />
                </div>
                <p className="mt-4 text-sm font-medium">No items yet</p>
                <p className="mt-1 max-w-[36ch] text-xs text-muted-foreground">
                  Use your QR reader or type a SKU above. Try <span className="font-mono">VNY-CUR-221</span>.
                </p>
              </div>
            ) : (
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-border bg-surface-muted/40">
                    <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Item</th>
                    <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Size/Color</th>
                    <th className="px-6 py-4 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Qty</th>
                    <th className="px-6 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Amount</th>
                    <th className="px-3 py-4" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {items.map((it) => (
                    <tr key={it.sku}>
                      <td className="px-6 py-5">
                        <p className="text-sm font-medium">{it.name}</p>
                        <p className="font-mono text-[11px] text-muted-foreground">{it.sku} · {formatINR(it.price)}</p>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex gap-2">
                          <span className="rounded bg-surface-muted px-2 py-0.5 text-[10px] font-semibold uppercase">{it.size}</span>
                          <span className="rounded bg-surface-muted px-2 py-0.5 text-[10px] font-semibold uppercase text-muted-foreground">{it.color}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <button onClick={() => changeQty(it.sku, -1)} className="grid size-6 place-items-center rounded-full ring-1 ring-border hover:bg-surface-muted"><Minus className="size-3" /></button>
                          <span className="w-5 text-center text-sm font-medium">{it.qty}</span>
                          <button onClick={() => changeQty(it.sku, 1)} className="grid size-6 place-items-center rounded-full ring-1 ring-border hover:bg-surface-muted"><Plus className="size-3" /></button>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-right font-mono text-sm font-medium">{formatINR(it.price * it.qty)}</td>
                      <td className="px-3 py-5">
                        <button onClick={() => removeLine(it.sku)} className="grid size-7 place-items-center rounded-md text-muted-foreground hover:bg-surface-muted hover:text-danger"><Trash2 className="size-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Customer + Sales person details */}
          <div className="card-soft p-6">
            <h2 className="mb-4 text-sm font-semibold">Customer & Sales Person</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Field icon={User} label="Customer name" value={customerName} onChange={setCustomerName} placeholder="e.g. Anita Sharma" />
              <Field icon={Phone} label="Phone number" value={customerPhone} onChange={(v) => setCustomerPhone(v.replace(/[^0-9 +\-]/g, ""))} placeholder="+91 98765 43210" />
              <Field icon={BadgeCheck} label="Sales person" value={salesPerson} onChange={setSalesPerson} placeholder="Sales person name" />
            </div>
          </div>
        </div>

        <aside className="space-y-6 lg:col-span-4">
          <div className="card-soft p-6">
            <h2 className="mb-6 text-sm font-semibold">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-mono">{formatINR(subtotal)}</span>
              </div>

              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Discount type</p>
                <div className="grid grid-cols-2 gap-2">
                  {[{ k: "percent", l: "Percentage %" }, { k: "amount", l: "Flat ₹ amount" }].map((m) => (
                    <button
                      key={m.k}
                      onClick={() => setDiscountMode(m.k)}
                      className={
                        "rounded-[10px] py-2 text-xs font-semibold ring-1 transition-colors " +
                        (discountMode === m.k
                          ? "bg-foreground text-background ring-foreground"
                          : "bg-background text-foreground ring-border hover:bg-surface-muted")
                      }
                    >
                      {m.l}
                    </button>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <label className="text-muted-foreground" htmlFor="disc">
                    {discountMode === "percent" ? "Discount %" : "Amount ₹"}
                  </label>
                  {discountMode === "percent" ? (
                    <input id="disc" type="number" min={0} max={100} value={discountPct}
                      onChange={(e) => setDiscountPct(Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
                      className="w-24 rounded-md border border-border bg-background px-2 py-1 text-right font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand/30" />
                  ) : (
                    <input id="disc" type="number" min={0} value={discountAmt}
                      onChange={(e) => setDiscountAmt(Math.max(0, Number(e.target.value) || 0))}
                      className="w-24 rounded-md border border-border bg-background px-2 py-1 text-right font-mono text-sm focus:outline-none focus:ring-2 focus:ring-brand/30" />
                  )}
                </div>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Discount applied</span>
                <span className="font-mono text-brand">- {formatINR(discount)}</span>
              </div>
              <div className="flex items-baseline justify-between border-t border-border pt-4">
                <span className="text-sm font-semibold">Total Payable</span>
                <span className="font-mono text-2xl font-medium tracking-tight">{formatINR(total)}</span>
              </div>
            </div>

            <div className="mt-6">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Payment Method</p>
              <div className="grid grid-cols-3 gap-2">
                {["UPI", "Card", "Cash"].map((m) => (
                  <button key={m} onClick={() => setPayment(m)}
                    className={"rounded-[10px] py-2 text-xs font-semibold ring-1 transition-colors " + (payment === m ? "bg-foreground text-background ring-foreground" : "bg-background text-foreground ring-border hover:bg-surface-muted")}>
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button onClick={completeSale} className="w-full rounded-[12px] bg-foreground py-3 text-sm font-semibold text-background shadow-sm hover:bg-foreground/90">
                Collect Payment
              </button>
              <button onClick={resetForm} className="w-full rounded-[12px] bg-background py-3 text-sm font-semibold text-foreground ring-1 ring-border hover:bg-surface-muted">
                Clear
              </button>
            </div>
          </div>
        </aside>
      </div>

      {showReceipt && <Receipt bill={showReceipt} onClose={() => setShowReceipt(null)} />}
    </div>
  );
}

function Field({ icon: Icon, label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</label>
      <div className="flex items-center gap-2 rounded-[12px] border border-border bg-background px-3 py-2 focus-within:ring-2 focus-within:ring-brand/30">
        <Icon className="size-4 shrink-0 text-muted-foreground" />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent text-sm focus:outline-none"
        />
      </div>
    </div>
  );
}

function Receipt({ bill, onClose }) {
  function print() { window.print(); }
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4">
      <div className="card-soft w-full max-w-md overflow-hidden">
        <div className="flex items-start justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-5 text-success" />
            <p className="text-sm font-semibold">Payment Collected</p>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="size-4" /></button>
        </div>
        <div className="px-6 py-6">
          <p className="text-center text-xs uppercase tracking-widest text-muted-foreground">Clothing Console</p>
          <p className="mt-1 text-center font-mono text-[11px] text-muted-foreground">{bill.id}</p>
          <p className="mt-0.5 text-center text-[11px] text-muted-foreground">{new Date(bill.date).toLocaleString("en-IN")}</p>

          <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
            <div className="rounded-md bg-surface-muted px-3 py-2">
              <p className="font-semibold uppercase text-muted-foreground">Customer</p>
              <p className="mt-0.5">{bill.customerName}</p>
              {bill.customerPhone && <p className="font-mono text-muted-foreground">{bill.customerPhone}</p>}
            </div>
            <div className="rounded-md bg-surface-muted px-3 py-2">
              <p className="font-semibold uppercase text-muted-foreground">Sales person</p>
              <p className="mt-0.5">{bill.salesPerson}</p>
            </div>
          </div>

          <div className="mt-5 space-y-2 border-t border-dashed border-border pt-4">
            {bill.items.map((it) => (
              <div key={it.sku} className="flex justify-between text-xs">
                <div>
                  <p className="font-medium">{it.name}</p>
                  <p className="font-mono text-muted-foreground">{it.qty} × {formatINR(it.price)}</p>
                </div>
                <p className="font-mono">{formatINR(it.qty * it.price)}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-1 border-t border-dashed border-border pt-3 text-xs">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span className="font-mono">{formatINR(bill.subtotal)}</span></div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Discount {bill.discountMode === "percent" ? `(${bill.discountValue}%)` : "(flat)"}
              </span>
              <span className="font-mono">- {formatINR(bill.discount)}</span>
            </div>
            <div className="mt-2 flex items-baseline justify-between border-t border-border pt-2 text-base">
              <span className="font-semibold">Total</span>
              <span className="font-mono font-semibold">{formatINR(bill.total)}</span>
            </div>
            <p className="pt-1 text-right text-[11px] text-muted-foreground">Paid via {bill.payment}</p>
          </div>
          <p className="mt-6 text-center text-[11px] text-muted-foreground">Thank you for shopping with us</p>
        </div>
        <div className="grid grid-cols-2 gap-2 border-t border-border bg-surface-muted p-3">
          <button onClick={onClose} className="rounded-[10px] bg-background py-2 text-sm font-semibold ring-1 ring-border">New Bill</button>
          <button onClick={print} className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-foreground py-2 text-sm font-semibold text-background">
            <Printer className="size-4" /> Print
          </button>
        </div>
      </div>
    </div>
  );
}
