import { useMemo, useState } from "react";
import { useStore } from "../../../lib/useStore.jsx";
import { toast } from "sonner";

import ReportsHeader from "../components/ReportsHeader.jsx";
import ReportKPIGrid from "../components/ReportKPIGrid.jsx";
import RevenueChart from "../components/RevenueChart.jsx";
import TopSellingItems from "../components/TopSellingItems.jsx";
import PeriodBreakdown from "../components/PeriodBreakdown.jsx";

function startOfDay(date) {
  const value = new Date(date);
  value.setHours(0, 0, 0, 0);
  return value;
}

function ymKey(date) {
  const value = new Date(date);

  return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(
    2,
    "0",
  )}`;
}

function ymLabel(date) {
  const value = new Date(date);

  return value.toLocaleDateString("en-IN", {
    month: "short",
    year: "2-digit",
  });
}

export default function Reports() {
  const { state } = useStore();

  const [mode, setMode] = useState("daily");

  const daily = useMemo(() => {
    const map = new Map();

    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      const key = startOfDay(date).getTime();

      map.set(key, {
        key,
        label: date.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
        }),
        revenue: 0,
        count: 0,
      });
    }

    state.bills.forEach((bill) => {
      const key = startOfDay(bill.date).getTime();

      if (map.has(key)) {
        const row = map.get(key);

        row.revenue += bill.total;
        row.count += 1;
      }
    });

    return Array.from(map.values());
  }, [state.bills]);

  const monthly = useMemo(() => {
    const map = new Map();

    for (let i = 11; i >= 0; i--) {
      const date = new Date();

      date.setMonth(date.getMonth() - i, 1);

      const key = ymKey(date);

      map.set(key, {
        key,
        label: ymLabel(date),
        revenue: 0,
        count: 0,
      });
    }

    state.bills.forEach((bill) => {
      const key = ymKey(bill.date);

      if (map.has(key)) {
        const row = map.get(key);

        row.revenue += bill.total;
        row.count += 1;
      }
    });

    return Array.from(map.values());
  }, [state.bills]);

  const data = mode === "daily" ? daily : monthly;

  const totalRevenue = data.reduce((sum, row) => sum + row.revenue, 0);

  const totalBills = data.reduce((sum, row) => sum + row.count, 0);

  const averageBillValue = totalBills
    ? Math.round(totalRevenue / totalBills)
    : 0;

  const topItems = useMemo(() => {
    const earliest = data[0]?.key;
    const map = new Map();

    state.bills.forEach((bill) => {
      const key =
        mode === "daily" ? startOfDay(bill.date).getTime() : ymKey(bill.date);

      const isInRange =
        mode === "daily"
          ? key >= earliest
          : data.some((row) => row.key === key);

      if (isInRange) {
        bill.items.forEach((item) => {
          const currentItem = map.get(item.sku) || {
            sku: item.sku,
            name: item.name,
            qty: 0,
            revenue: 0,
          };

          currentItem.qty += item.qty;
          currentItem.revenue += item.qty * item.price;

          map.set(item.sku, currentItem);
        });
      }
    });

    return Array.from(map.values())
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 6);
  }, [state.bills, data, mode]);

  function exportCSV() {
    const rows = [["Period", "Revenue (INR)", "Bills"]];

    data.forEach((row) => {
      rows.push([row.label, row.revenue, row.count]);
    });

    const csv = rows.map((row) => row.join(",")).join("\n");

    const blob = new Blob([csv], {
      type: "text/csv",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `vanya-${mode}-sales.csv`;

    link.click();

    URL.revokeObjectURL(url);

    toast.success("Exported CSV");
  }

  return (
    <div>
      <ReportsHeader mode={mode} onModeChange={setMode} onExport={exportCSV} />

      <ReportKPIGrid
        totalRevenue={totalRevenue}
        totalBills={totalBills}
        averageBillValue={averageBillValue}
      />

      <RevenueChart data={data} mode={mode} />

      <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <TopSellingItems items={topItems} />

        <PeriodBreakdown data={data} />
      </section>
    </div>
  );
}
