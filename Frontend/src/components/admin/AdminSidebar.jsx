// import {
//   LayoutDashboard,
//   LogOut,
//   Plus,
//   Settings,
//   ShieldCheck,
//   Store,
//   Tag,
// } from "lucide-react";

// import { NavLink, useNavigate } from "react-router-dom";

// const navigation = [
//   {
//     label: "Dashboard",
//     to: "/admin/dashboard",
//     icon: LayoutDashboard,
//   },
//   {
//     label: "Shops",
//     to: "/admin/shops",
//     icon: Store,
//   },
//   {
//     label: "Create Shop",
//     to: "/admin/shops/create",
//     icon: Plus,
//   },
// ];

// export default function AdminSidebar() {
//   const navigate = useNavigate();

//   function handleLogout() {
//     // Later:
//     // await logout();
//     // clear authentication state / cookies if necessary

//     navigate("/admin/login", {
//       replace: true,
//     });
//   }

//   return (
//     <aside className="fixed inset-y-0 left-0 z-40 hidden w-[280px] flex-col border-r border-zinc-200 bg-white lg:flex">
//       {/* Brand */}

//       <div className="flex h-20 items-center border-b border-zinc-200 px-6">
//         <div className="flex items-center gap-3">
//           <div className="grid size-10 place-items-center rounded-xl bg-[#E97D1A] text-white">
//             <Tag className="size-5" strokeWidth={2.5} />
//           </div>

//           <div className="leading-tight">
//             <p className="font-semibold tracking-tight text-zinc-950">
//               TallySpurt
//             </p>

//             <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
//               Platform Admin
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Navigation */}

//       <div className="flex-1 px-4 py-6">
//         <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400">
//           Platform
//         </p>

//         <nav className="space-y-1">
//           {navigation.map((item) => {
//             const Icon = item.icon;

//             return (
//               <NavLink
//                 key={item.to}
//                 to={item.to}
//                 end={item.to === "/admin/dashboard"}
//                 className={({ isActive }) =>
//                   [
//                     "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition",
//                     isActive
//                       ? "bg-orange-50 text-[#E97D1A]"
//                       : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-950",
//                   ].join(" ")
//                 }
//               >
//                 <Icon className="size-[18px]" />

//                 {item.label}
//               </NavLink>
//             );
//           })}
//         </nav>
//       </div>

//       {/* Admin */}

//       <div className="border-t border-zinc-200 p-4">
//         <NavLink
//           to="/admin/settings"
//           className={({ isActive }) =>
//             [
//               "mb-2 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition",
//               isActive
//                 ? "bg-orange-50 text-[#E97D1A]"
//                 : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-950",
//             ].join(" ")
//           }
//         >
//           <Settings className="size-[18px]" />
//           Settings
//         </NavLink>

//         <div className="mt-3 flex items-center gap-3 rounded-2xl bg-zinc-50 p-3">
//           <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-zinc-950 text-white">
//             <ShieldCheck className="size-4" />
//           </div>

//           <div className="min-w-0 flex-1">
//             <p className="truncate text-sm font-semibold text-zinc-900">
//               Platform Admin
//             </p>

//             <p className="truncate text-[11px] text-zinc-500">
//               Administrator
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={handleLogout}
//             className="grid size-8 place-items-center rounded-lg text-zinc-400 transition hover:bg-white hover:text-red-500"
//             aria-label="Logout"
//           >
//             <LogOut className="size-4" />
//           </button>
//         </div>
//       </div>
//     </aside>
//   );
// }

import {
  LayoutDashboard,
  LogOut,
  Plus,
  Settings,
  ShieldCheck,
  Store,
  Tag,
  X,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

const navigation = [
  {
    label: "Dashboard",
    to: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Shops",
    to: "/admin/shops",
    icon: Store,
  },
  {
    label: "Create Shop",
    to: "/admin/shops/create",
    icon: Plus,
  },
];

export default function AdminSidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();

  function closeSidebar() {
    setSidebarOpen(false);
  }

  function handleLogout() {
    closeSidebar();

    // Later:
    // await logout();

    navigate("/admin/login", {
      replace: true,
    });
  }

  return (
    <>
      {/* =====================================================
          MOBILE BACKDROP
      ====================================================== */}

      {sidebarOpen && (
        <button
          type="button"
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-zinc-950/40 backdrop-blur-[2px] lg:hidden"
          aria-label="Close navigation menu"
        />
      )}

      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex w-[280px] flex-col
          border-r border-zinc-200
          bg-white
          shadow-2xl
          transition-transform duration-300 ease-in-out

          lg:z-40
          lg:translate-x-0
          lg:shadow-none

          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* =====================================================
            BRAND
        ====================================================== */}

        <div className="flex h-20 shrink-0 items-center justify-between border-b border-zinc-200 px-6">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-[#E97D1A] text-white">
              <Tag className="size-5" strokeWidth={2.5} />
            </div>

            <div className="leading-tight">
              <p className="font-semibold tracking-tight text-zinc-950">
                TallySpurt
              </p>

              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
                Platform Admin
              </p>
            </div>
          </div>

          {/* Mobile Close Button */}

          <button
            type="button"
            onClick={closeSidebar}
            className="grid size-9 place-items-center rounded-xl text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-900 lg:hidden"
            aria-label="Close navigation menu"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* =====================================================
            NAVIGATION
        ====================================================== */}

        <div className="flex-1 overflow-y-auto px-4 py-6">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400">
            Platform
          </p>

          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/admin/dashboard"}
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition",
                      isActive
                        ? "bg-orange-50 text-[#E97D1A]"
                        : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-950",
                    ].join(" ")
                  }
                >
                  <Icon className="size-[18px]" />

                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* =====================================================
            ADMIN BOTTOM SECTION
        ====================================================== */}

        <div className="shrink-0 border-t border-zinc-200 p-4">
          <NavLink
            to="/admin/settings"
            onClick={closeSidebar}
            className={({ isActive }) =>
              [
                "mb-2 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition",
                isActive
                  ? "bg-orange-50 text-[#E97D1A]"
                  : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-950",
              ].join(" ")
            }
          >
            <Settings className="size-[18px]" />
            Settings
          </NavLink>

          {/* Admin Profile */}

          <div className="mt-3 flex items-center gap-3 rounded-2xl bg-zinc-50 p-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-zinc-950 text-white">
              <ShieldCheck className="size-4" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-zinc-900">
                Platform Admin
              </p>

              <p className="truncate text-[11px] text-zinc-500">
                Administrator
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="grid size-8 shrink-0 place-items-center rounded-lg text-zinc-400 transition hover:bg-white hover:text-red-500"
              aria-label="Logout"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
