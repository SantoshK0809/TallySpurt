import { useMemo } from "react";
import { useStore } from "../../../lib/useStore.jsx";
import { formatINR } from "../../../lib/storeHelpers.jsx";
import {
  TrendingUp,
  Receipt,
  Package,
  AlertTriangle,
} from "lucide-react";

function startOfDay(date) {
  const normalizedDate = new Date(date);
  normalizedDate.setHours(0, 0, 0, 0);

  return normalizedDate;
}

export function useDashboardData() {
  const { state } = useStore();

  const dashboardData = useMemo(() => {
    const today = startOfDay(new Date()).getTime();

    const todayBills = state.bills.filter(
      (bill) => startOfDay(bill.date).getTime() === today
    );

    const todayRevenue = todayBills.reduce(
      (total, bill) => total + bill.total,
      0
    );

    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);

    const monthBills = state.bills.filter(
      (bill) => new Date(bill.date) >= monthStart
    );

    const monthRevenue = monthBills.reduce(
      (total, bill) => total + bill.total,
      0
    );

    const lowStockItems = state.inventory.filter(
      (item) => item.stock <= item.lowAt
    );

    const totalInventoryUnits = state.inventory.reduce(
      (total, item) => total + item.stock,
      0
    );

    const stats = [
      {
        label: "Today's Revenue",
        value: formatINR(todayRevenue),
        sub: `${todayBills.length} bills`,
        icon: TrendingUp,
        variant: "accent",
      },
      {
        label: "Month to Date",
        value: formatINR(monthRevenue),
        sub: `${monthBills.length} bills`,
        icon: Receipt,
        variant: "default",
      },
      {
        label: "Inventory Items",
        value: state.inventory.length,
        sub: `${totalInventoryUnits} units`,
        icon: Package,
        variant: "default",
      },
      {
        label: "Low Stock",
        value: lowStockItems.length,
        sub: "needs attention",
        icon: AlertTriangle,
        variant: lowStockItems.length > 0 ? "danger" : "default",
      },
    ];

    return {
      stats,
      lowStockItems,
      recentBills: state.bills.slice(0, 6),
    };
  }, [state.bills, state.inventory]);

  const chartData = useMemo(() => {
    const dateMap = new Map();

    for (let i = 13; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      const key = startOfDay(date).getTime();

      dateMap.set(key, {
        date: date.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
        }),
        revenue: 0,
      });
    }

    state.bills.forEach((bill) => {
      const key = startOfDay(bill.date).getTime();

      if (dateMap.has(key)) {
        dateMap.get(key).revenue += bill.total;
      }
    });

    return Array.from(dateMap.values());
  }, [state.bills]);

  return {
    ...dashboardData,
    chartData,
  };
}