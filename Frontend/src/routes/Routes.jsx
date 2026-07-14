import React from "react";
import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Billing from "../pages/Billing.jsx";
import Reports from "../pages/Reports.jsx";
import Inventory from "../pages/Inventory.jsx";
import Customers from "../pages/Customers.jsx";
import Landing from "../pages/Landing.jsx";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";

const router = createBrowserRouter([
  {
    element: <Landing />,
    path: "/",
  },
  {
    element: <Login />,
    path: "/login",
  },
  {
    element: <Signup />,
    path: "/signup",
  },
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
      ],
    },
  ]);


export default router;
