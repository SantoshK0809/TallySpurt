const STORAGE_KEY = "vanya-boutique-state-v1";

export const seedInventory = [
  { sku: "VNY-CUR-221", name: "Hand-Embroidered Chanderi Kurta", category: "Kurta", size: "L", color: "Indigo", price: 4250, stock: 14, lowAt: 5 },
  { sku: "VNY-ACC-098", name: "Jaipur Block-Print Dupatta", category: "Accessory", size: "Free", color: "Ochre", price: 950, stock: 22, lowAt: 8 },
  { sku: "VNY-SAR-512", name: "Silk Saree — Banarasi Weave", category: "Saree", size: "Free", color: "Royal Blue", price: 8500, stock: 6, lowAt: 4 },
  { sku: "VNY-TUN-104", name: "Cotton Tunic", category: "Tunic", size: "M", color: "Crimson", price: 1200, stock: 42, lowAt: 10 },
  { sku: "VNY-SHL-077", name: "Pashmina Shawl", category: "Shawl", size: "Free", color: "Camel", price: 4500, stock: 18, lowAt: 6 },
  { sku: "VNY-TRO-330", name: "Linen Trousers", category: "Trouser", size: "32", color: "Sand", price: 2800, stock: 3, lowAt: 6 },
  { sku: "VNY-KUR-441", name: "Lucknowi Chikan Kurta", category: "Kurta", size: "XL", color: "White", price: 3200, stock: 9, lowAt: 5 },
  { sku: "VNY-SHR-201", name: "Oxford Shirt", category: "Shirt", size: "M", color: "Sky", price: 1800, stock: 11, lowAt: 5 },
];

export const seedCustomers = [
  { id: "C-001", name: "Ananya Mishra", phone: "+91 98765 43210", points: 1240, visits: 8 },
  { id: "C-002", name: "Rahul Verma", phone: "+91 90123 55661", points: 540, visits: 3 },
  { id: "C-003", name: "Priya Nair", phone: "+91 98203 47712", points: 2105, visits: 14 },
];

export function seedBills() {
  const out = [];
  const today = new Date();

  for (let d = 60; d >= 0; d--) {
    const day = new Date(today);
    day.setDate(today.getDate() - d);
    const billsToday = 1 + Math.floor(Math.random() * 5);

    for (let i = 0; i < billsToday; i++) {
      const item = seedInventory[Math.floor(Math.random() * seedInventory.length)];
      const qty = 1 + Math.floor(Math.random() * 2);
      const item2 = seedInventory[Math.floor(Math.random() * seedInventory.length)];
      const qty2 = 1 + Math.floor(Math.random() * 2);
      const items = [
        { sku: item.sku, name: item.name, price: item.price, qty },
        { sku: item2.sku, name: item2.name, price: item2.price, qty: qty2 },
      ];
      const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);
      const discount = Math.random() < 0.3 ? Math.round(subtotal * 0.1) : 0;

      out.push({
        id: `INV-${day.getTime()}-${i}`,
        date: day.toISOString(),
        items,
        subtotal,
        discount,
        total: subtotal - discount,
        customerId: Math.random() < 0.6 ? seedCustomers[Math.floor(Math.random() * seedCustomers.length)].id : null,
        payment: Math.random() < 0.6 ? "UPI" : Math.random() < 0.5 ? "Card" : "Cash",
      });
    }
  }

  return out;
}

export function load() {
  if (typeof window === "undefined") return { inventory: seedInventory, customers: seedCustomers, bills: [] };

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}

  const initial = { inventory: seedInventory, customers: seedCustomers, bills: seedBills() };

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  } catch {}

  return initial;
}

export function formatINR(n) {
  return "₹" + Number(n || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 });
}
