// Lightweight client-side store using localStorage for inventory, bills, customers.
import { useEffect, useMemo, useState } from "react";
import { load, seedInventory, seedCustomers, seedBills } from "./storeHelpers.jsx";
import { StoreCtx } from "./storeContext.jsx";

export function StoreProvider({ children }) {
  const [state, setState] = useState(() => ({ inventory: seedInventory, customers: seedCustomers, bills: [] }));
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(load());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try { window.localStorage.setItem("vanya-boutique-state-v1", JSON.stringify(state)); } catch {}
  }, [state, hydrated]);

  const api = useMemo(() => ({
    state,
    addBill: (bill) => setState((s) => {
      const inv = s.inventory.map((it) => {
        const line = bill.items.find((l) => l.sku === it.sku);
        return line ? { ...it, stock: Math.max(0, it.stock - line.qty) } : it;
      });
      return { ...s, bills: [bill, ...s.bills], inventory: inv };
    }),
    upsertItem: (item) => setState((s) => {
      const exists = s.inventory.some((i) => i.sku === item.sku);
      const inv = exists ? s.inventory.map((i) => (i.sku === item.sku ? { ...i, ...item } : i)) : [item, ...s.inventory];
      return { ...s, inventory: inv };
    }),
    removeItem: (sku) => setState((s) => ({ ...s, inventory: s.inventory.filter((i) => i.sku !== sku) })),
    addCustomer: (c) => setState((s) => ({ ...s, customers: [c, ...s.customers] })),
    findBySku: (sku) => state.inventory.find((i) => i.sku.toLowerCase() === String(sku).toLowerCase()),
    resetSeed: () => {
      const initial = { inventory: seedInventory, customers: seedCustomers, bills: seedBills() };
      setState(initial);
    },
  }), [state]);

  return <StoreCtx.Provider value={api}>{children}</StoreCtx.Provider>;
}
