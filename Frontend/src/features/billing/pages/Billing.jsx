import { useEffect, useRef, useState } from "react";
import { useStore } from "../../../lib/useStore.jsx";
import { formatINR } from "../../../lib/storeHelpers.jsx";
import { CheckCircle2, Printer, X } from "lucide-react";
import { toast } from "sonner";

import BillingHeader from "../components/BillingHeader.jsx";
import SKUScanner from "../components/SKUScanner.jsx";
import BillingItemsTable from "../components/BillingItemsTable.jsx";
import CustomerSalesDetails from "../components/CustomerSalesDetails.jsx";
import OrderSummary from "../components/OrderSummary.jsx";

export default function Billing() {
  const { addBill, findBySku } = useStore();

  // Placeholder until actual auth integration
  const user = { name: "Admin" };

  const [scan, setScan] = useState("");
  const [items, setItems] = useState([]);

  const [discountMode, setDiscountMode] = useState("percent");
  const [discountPct, setDiscountPct] = useState(0);
  const [discountAmt, setDiscountAmt] = useState(0);

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [salesPerson, setSalesPerson] = useState(user?.name || "");

  const [payment, setPayment] = useState("UPI");

  const [showReceipt, setShowReceipt] = useState(null);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (user?.name && !salesPerson) {
      setSalesPerson(user.name);
    }
  }, [user, salesPerson]);

  function addBySku(sku) {
    const cleanSku = String(sku).trim();

    if (!cleanSku) {
      return;
    }

    const item = findBySku(cleanSku);

    if (!item) {
      toast.error(`SKU "${cleanSku}" not found in inventory`);
      return;
    }

    if (item.stock <= 0) {
      toast.error(`${item.name} is out of stock`);
      return;
    }

    setItems((previousItems) => {
      const existingItem = previousItems.find(
        (currentItem) => currentItem.sku === item.sku,
      );

      if (existingItem) {
        if (existingItem.qty >= item.stock) {
          toast.warning(`Only ${item.stock} in stock`);

          return previousItems;
        }

        return previousItems.map((currentItem) =>
          currentItem.sku === item.sku
            ? {
                ...currentItem,
                qty: currentItem.qty + 1,
              }
            : currentItem,
        );
      }

      return [
        ...previousItems,
        {
          sku: item.sku,
          name: item.name,
          price: item.price,
          qty: 1,
          size: item.size,
          color: item.color,
          stock: item.stock,
        },
      ];
    });

    toast.success(`Added ${item.name}`);
  }

  function handleScanSubmit(event) {
    event.preventDefault();

    addBySku(scan);

    setScan("");

    inputRef.current?.focus();
  }

  function changeQuantity(sku, delta) {
    setItems((previousItems) =>
      previousItems
        .map((item) => {
          if (item.sku !== sku) {
            return item;
          }

          const nextQuantity = item.qty + delta;

          if (nextQuantity > item.stock) {
            toast.warning(`Only ${item.stock} in stock`);

            return item;
          }

          return {
            ...item,
            qty: nextQuantity,
          };
        })
        .filter((item) => item.qty > 0),
    );
  }

  function removeItem(sku) {
    setItems((previousItems) =>
      previousItems.filter((item) => item.sku !== sku),
    );
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  const rawDiscount =
    discountMode === "percent"
      ? Math.round(
          (subtotal * Math.max(0, Math.min(100, Number(discountPct) || 0))) /
            100,
        )
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
    if (items.length === 0) {
      toast.error("Add at least one item");
      return;
    }

    if (!salesPerson.trim()) {
      toast.error("Sales person name is required");
      return;
    }

    const bill = {
      id: `INV-${Date.now()}`,

      date: new Date().toISOString(),

      items: items.map((item) => ({
        sku: item.sku,
        name: item.name,
        price: item.price,
        qty: item.qty,
      })),

      subtotal,

      discount,

      discountMode,

      discountValue:
        discountMode === "percent"
          ? Number(discountPct) || 0
          : Number(discountAmt) || 0,

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

  function handleCustomerPhoneChange(value) {
    setCustomerPhone(value.replace(/[^0-9 +\-]/g, ""));
  }

  return (
    <div>
      <BillingHeader total={total} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <SKUScanner
            value={scan}
            onChange={setScan}
            onSubmit={handleScanSubmit}
            inputRef={inputRef}
          />

          <BillingItemsTable
            items={items}
            onQuantityChange={changeQuantity}
            onRemove={removeItem}
          />

          <CustomerSalesDetails
            customerName={customerName}
            customerPhone={customerPhone}
            salesPerson={salesPerson}
            onCustomerNameChange={setCustomerName}
            onCustomerPhoneChange={handleCustomerPhoneChange}
            onSalesPersonChange={setSalesPerson}
          />
        </div>

        <aside className="space-y-6 lg:col-span-4">
          <OrderSummary
            subtotal={subtotal}
            discount={discount}
            total={total}
            discountMode={discountMode}
            discountPercent={discountPct}
            discountAmount={discountAmt}
            payment={payment}
            onDiscountModeChange={setDiscountMode}
            onDiscountPercentChange={setDiscountPct}
            onDiscountAmountChange={setDiscountAmt}
            onPaymentChange={setPayment}
            onCompleteSale={completeSale}
            onClear={resetForm}
          />
        </aside>
      </div>

      {showReceipt && (
        <Receipt bill={showReceipt} onClose={() => setShowReceipt(null)} />
      )}
    </div>
  );
}

function Receipt({ bill, onClose }) {
  function print() {
    window.print();
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4">
      <div className="card-soft w-full max-w-md overflow-hidden">
        <div className="flex items-start justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-5 text-success" />

            <p className="text-sm font-semibold">Payment Collected</p>
          </div>

          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="px-6 py-6">
          <p className="text-center text-xs uppercase tracking-widest text-muted-foreground">
            Clothing Console
          </p>

          <p className="mt-1 text-center font-mono text-[11px] text-muted-foreground">
            {bill.id}
          </p>

          <p className="mt-0.5 text-center text-[11px] text-muted-foreground">
            {new Date(bill.date).toLocaleString("en-IN")}
          </p>

          <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
            <div className="rounded-md bg-surface-muted px-3 py-2">
              <p className="font-semibold uppercase text-muted-foreground">
                Customer
              </p>

              <p className="mt-0.5">{bill.customerName}</p>

              {bill.customerPhone && (
                <p className="font-mono text-muted-foreground">
                  {bill.customerPhone}
                </p>
              )}
            </div>

            <div className="rounded-md bg-surface-muted px-3 py-2">
              <p className="font-semibold uppercase text-muted-foreground">
                Sales person
              </p>

              <p className="mt-0.5">{bill.salesPerson}</p>
            </div>
          </div>

          <div className="mt-5 space-y-2 border-t border-dashed border-border pt-4">
            {bill.items.map((item) => (
              <div key={item.sku} className="flex justify-between text-xs">
                <div>
                  <p className="font-medium">{item.name}</p>

                  <p className="font-mono text-muted-foreground">
                    {item.qty} × {formatINR(item.price)}
                  </p>
                </div>

                <p className="font-mono">{formatINR(item.qty * item.price)}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-1 border-t border-dashed border-border pt-3 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>

              <span className="font-mono">{formatINR(bill.subtotal)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Discount{" "}
                {bill.discountMode === "percent"
                  ? `(${bill.discountValue}%)`
                  : "(flat)"}
              </span>

              <span className="font-mono">- {formatINR(bill.discount)}</span>
            </div>

            <div className="mt-2 flex items-baseline justify-between border-t border-border pt-2 text-base">
              <span className="font-semibold">Total</span>

              <span className="font-mono font-semibold">
                {formatINR(bill.total)}
              </span>
            </div>

            <p className="pt-1 text-right text-[11px] text-muted-foreground">
              Paid via {bill.payment}
            </p>
          </div>

          <p className="mt-6 text-center text-[11px] text-muted-foreground">
            Thank you for shopping with us
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 border-t border-border bg-surface-muted p-3">
          <button
            onClick={onClose}
            className="rounded-[10px] bg-background py-2 text-sm font-semibold ring-1 ring-border"
          >
            New Bill
          </button>

          <button
            onClick={print}
            className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-foreground py-2 text-sm font-semibold text-background"
          >
            <Printer className="size-4" />
            Print
          </button>
        </div>
      </div>
    </div>
  );
}
