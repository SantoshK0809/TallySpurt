// import React from "react";
// import { createBrowserRouter } from "react-router-dom";
// import DashboardLayout from "../layouts/DashboardLayout.jsx";
// import Dashboard from "../pages/Dashboard.jsx";
// import Billing from "../pages/Billing.jsx";
// import Reports from "../pages/Reports.jsx";
// import Inventory from "../pages/Inventory.jsx";
// import Customers from "../pages/Customers.jsx";
// import Landing from "../pages/Landing.jsx";
// import Login from "../pages/Login.jsx";
// import Signup from "../pages/Signup.jsx";
// import AdminLogin from "../pages/admin/AdminLogin.jsx";

// const router = createBrowserRouter([
//   {
//     element: <Landing />,
//     path: "/",
//   },
//   {
//     element: <Login />,
//     path: "/login",
//   },
//   {
//     path: "/admin/login",
//     element: <AdminLogin />,
//   },
//   {
//     element: <Signup />,
//     path: "/signup",
//   },
//   {
//     element: <DashboardLayout />,
//     children: [
//       {
//         path: "/dashboard",
//           element: <Dashboard />,
//         },
//         {
//           path: "/billing",
//           element: <Billing />,
//         },
//         {
//           path: "/inventory",
//           element: <Inventory />,
//         },
//         {
//           path: "/reports",
//           element: <Reports />,
//         },
//         {
//           path: "/customers",
//           element: <Customers />,
//         },
//       ],
//     },
//   ]);

// export default router;

import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

// Public pages
import Landing from "../../landing/pages/Landing.jsx";
import Login from "../../features/auth/pages/Login.jsx";

// Shop application
import DashboardLayout from "../../layouts/DashboardLayout.jsx";
import Dashboard from "../../features/dashboard/pages/Dashboard.jsx";
import Billing from "../../features/billing/pages/Billing.jsx";
import Reports from "../../features/reports/pages/Reports.jsx";
import Inventory from "../../features/inventory/pages/Inventory.jsx";
import Customers from "../../features/customers/pages/Customers.jsx";

// Platform Admin
import AdminLayout from "../../features/platform-admin/components/AdminLayout.jsx";
import AdminLogin from "../../features/platform-admin/pages/AdminLogin.jsx";
import AdminDashboard from "../../features/platform-admin/pages/AdminDashboard.jsx";
import Shops from "../../features/platform-admin/pages/Shops.jsx";
import CreateShop from "../../features/platform-admin/pages/CreateShop.jsx";
import ShopDetails from "../../features/platform-admin/pages/ShopDetails.jsx";
import AdminSettings from "../../features/platform-admin/pages/AdminSettings.jsx";
import Salespersons from "../../features/employees/pages/Salespersons.jsx";
import ShopSettings from "../../features/shop-settings/pages/ShopSettings.jsx";

const router = createBrowserRouter([
  // PUBLIC ROUTES
  {
    path: "/",
    element: <Landing />,
  },

  {
    path: "/login",
    element: <Login />,
  },

  // PLATFORM ADMIN AUTHENTICATION

  {
    path: "/admin/login",
    element: <AdminLogin />,
  },

  // PLATFORM ADMIN APPLICATION

  {
    path: "/admin",
    element: <AdminLayout />,

    children: [
      // /admin
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },

      // /admin/dashboard
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },

      // /admin/shops
      {
        path: "shops",
        element: <Shops />,
      },

      // /admin/shops/create
      {
        path: "shops/create",
        element: <CreateShop />,
      },

      // /admin/shops/:shopId
      {
        path: "shops/:shopId",
        element: <ShopDetails />,
      },

      // /admin/settings
      {
        path: "settings",
        element: <AdminSettings />,
      },
    ],
  },

  // SHOP APPLICATION
  // shopOwner + salesperson

  {
    element: <DashboardLayout />,

    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },

      {
        path: "/billing",
        element: <Billing />,
      },

      {
        path: "/inventory",
        element: <Inventory />,
      },

      {
        path: "/reports",
        element: <Reports />,
      },

      {
        path: "/customers",
        element: <Customers />,
      },
      {
        path: "/employees",
        element: <Salespersons />,
      },
      {
        path: "/shop-settings",
        element: <ShopSettings />,
      },
    ],
  },
]);

export default router;
