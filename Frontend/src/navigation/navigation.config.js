// import {
//   LayoutDashboard,
//   ScanLine,
//   Package,
//   BarChart3,
//   Users,
// } from "lucide-react";

// export const navigationItems = [
//   {
//     to: "/",
//     label: "Dashboard",
//     icon: LayoutDashboard,
//   },
//   {
//     to: "/billing",
//     label: "New Bill",
//     icon: ScanLine,
//   },
//   {
//     to: "/inventory",
//     label: "Inventory",
//     icon: Package,
//   },
//   {
//     to: "/reports",
//     label: "Reports",
//     icon: BarChart3,
//   },
//   {
//     to: "/customers",
//     label: "Customers",
//     icon: Users,
//   },
// ];

import {
  LayoutDashboard,
  ScanLine,
  Package,
  BarChart3,
  Users,
  UserRoundPlus,
  Settings,
} from "lucide-react";

export const navigationItems = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    roles: ["shopOwner", "salesperson"],
  },
  {
    to: "/billing",
    label: "New Bill",
    icon: ScanLine,
    roles: ["shopOwner", "salesperson"],
  },
  {
    to: "/inventory",
    label: "Inventory",
    icon: Package,
    roles: ["shopOwner", "salesperson"],
  },
  {
    to: "/customers",
    label: "Customers",
    icon: Users,
    roles: ["shopOwner", "salesperson"],
  },
  {
    to: "/reports",
    label: "Reports",
    icon: BarChart3,
    roles: ["shopOwner"],
  },
  {
    to: "/employees",
    label: "Salespersons",
    icon: UserRoundPlus,
    roles: ["shopOwner"],
  },
  {
    to: "/shop-settings",
    label: "Shop Settings",
    icon: Settings,
    roles: ["shopOwner"],
  },
];

export function getNavigationForRole(role) {
  return navigationItems.filter((item) => item.roles.includes(role));
}
