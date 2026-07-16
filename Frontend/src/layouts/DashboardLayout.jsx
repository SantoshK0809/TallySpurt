// import { Outlet } from "react-router-dom";
// // import { AppSidebar } from "../components/sidebar/AppSidebar.jsx";
// // import { Sidebar } from "lucide-react";
// import {AppSidebar} from "../navigation/Sidebar.jsx";
// import MobileSidebar from "../navigation/MobileSidebar.jsx";

// export default function DashboardLayout() {
//   return (
//     <div className="min-h-screen bg-background">

//       {/* <AppSidebar /> */}
//       <AppSidebar/>

//       <MobileSidebar/>

//       <main className="ml-64 min-h-screen p-8">

//         <Outlet />

//       </main>

//     </div>
//   );
// }

import { Outlet } from "react-router-dom";

import { AppSidebar } from "../navigation/Sidebar";
import MobileSidebar from "../navigation/MobileSidebar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <AppSidebar />

      {/* Mobile Navigation */}
      <MobileSidebar />

      {/* Main Content */}
      <main className="min-w-0 md:ml-64">
        <div className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
