// import { Outlet } from "react-router-dom";
// import AdminSidebar from "./AdminSidebar";
// import AdminHeader from "./AdminHeader";

// export default function AdminLayout() {
//   return (
//     <div className="min-h-screen bg-[#F8F7F5]">
//       <AdminSidebar />

//       <div className="min-h-screen lg:pl-[280px]">
//         <AdminHeader />

//         <main className="px-5 py-6 sm:px-6 lg:px-8 lg:py-8">
//           <div className="mx-auto max-w-[1500px]">
//             <Outlet />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { Outlet } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F7F5]">
      <AdminSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="min-h-screen lg:pl-[280px]">
        <AdminHeader
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="px-5 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto max-w-[1500px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}