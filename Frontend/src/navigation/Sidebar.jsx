// import { NavLink } from "react-router-dom";
// import { Tag } from "lucide-react";

// import { navigationItems } from "./navigation.config";
// import SidebarHeader from "./SidebarHeader";

// // export function AppSidebar() {
// //   return (
// //     <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-border bg-sidebar md:flex">
// //       {/* Logo */}
// //       <div className="p-6">
// //         <div className="mb-8 flex items-center gap-3">
// //           <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand text-brand-foreground shadow-sm">
// //             <Tag className="size-4" strokeWidth={2.5} />
// //           </div>

// //           <div className="min-w-0 leading-tight">
// //             <p className="truncate text-base font-semibold tracking-tight">
// //               TallySpurt
// //             </p>

// //             <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
// //               Retail Console
// //             </p>
// //           </div>
// //         </div>

// //         {/* Navigation */}
// //         <nav className="space-y-1">
// //           {navigationItems.map((item) => {
// //             const Icon = item.icon;

// //             return (
// //               <NavLink
// //                 key={item.to}
// //                 to={item.to}
// //                 end={item.to === "/"}
// //                 className={({ isActive }) =>
// //                   `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
// //                     isActive
// //                       ? "bg-surface text-brand shadow-sm ring-1 ring-black/5"
// //                       : "text-muted-foreground hover:bg-surface/60 hover:text-foreground"
// //                   }`
// //                 }
// //               >
// //                 <Icon className="size-4 shrink-0" />

// //                 <span className="truncate">{item.label}</span>
// //               </NavLink>
// //             );
// //           })}
// //         </nav>
// //       </div>

// //       {/* User */}
// //       <div className="mt-auto border-t border-border p-6">
// //         <div className="flex items-center gap-3">
// //           <div className="grid size-9 shrink-0 place-items-center rounded-full bg-muted text-xs font-bold outline-1 -outline-offset-1 outline-black/5">
// //             RK
// //           </div>

// //           <div className="min-w-0 text-xs font-medium leading-tight">
// //             <p className="truncate">Rajesh Kumar</p>

// //             <p className="truncate text-muted-foreground">Store Manager</p>
// //           </div>
// //         </div>
// //       </div>
// //     </aside>
// //   );
// // }

// export function AppSidebar() {
//   const { user } = useAuth();
//   const { shop } = useShop();

//   const navigation = getNavigationForRole(user.role);

//   return (
//     <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-border bg-sidebar md:flex">
//       <div className="border-b border-border p-5">
//         <SidebarHeader shop={shop} />
//       </div>

//       <nav className="flex-1 space-y-1 overflow-y-auto p-4">
//         {navigation.map((item) => {
//           const Icon = item.icon;

//           return (
//             <NavLink
//               key={item.to}
//               to={item.to}
//               end={item.to === "/"}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
//                   isActive
//                     ? "bg-surface text-brand shadow-sm"
//                     : "text-muted-foreground hover:bg-surface/60 hover:text-foreground"
//                 }`
//               }
//             >
//               <Icon className="size-4 shrink-0" />
//               <span>{item.label}</span>
//             </NavLink>
//           );
//         })}
//       </nav>

//       <div className="border-t border-border p-4">
//         <SidebarUser user={user} />
//       </div>
//     </aside>
//   );
// }

import { NavLink } from "react-router-dom";

import SidebarHeader from "./SidebarHeader";
import SidebarUser from "./SidebarUser";
import { getNavigationForRole } from "./navigation.config";

export function AppSidebar() {
  // TEMPORARY DATA
  // Later this will come from AuthContext / ShopContext / backend

  const user = {
    id: "user_123",
    name: "Rajesh Kumar",
    role: "shopOwner",
  };

  const shop = {
    id: "shop_123",
    name: "Rubab Mens Wear",
    logo: null,
    shopType: "clothing",
  };

  const navigation = getNavigationForRole(user.role);

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-border bg-sidebar md:flex">
      {/* Shop Information */}
      <div className="border-b border-border p-5">
        <SidebarHeader shop={shop} />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-surface text-brand shadow-sm"
                    : "text-muted-foreground hover:bg-surface/60 hover:text-foreground"
                }`
              }
            >
              <Icon className="size-4 shrink-0" />

              <span className="truncate">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Logged-in User */}
      <div className="border-t border-border p-4">
        <SidebarUser user={user} />
      </div>
    </aside>
  );
}
