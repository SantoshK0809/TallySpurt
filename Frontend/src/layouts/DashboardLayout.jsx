import { Outlet } from "react-router-dom";
import { AppSidebar } from "../components/sidebar/AppSidebar.jsx";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-background">

      <AppSidebar />

      <main className="ml-64 min-h-screen p-8">

        <Outlet />

      </main>

    </div>
  );
}