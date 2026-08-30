// import {
//   LayoutDashboard,
//   Users,
//   Building2,
//   Briefcase,
//   Brain,
//   HelpCircle,
//   FileText,
//   BarChart3,
//   Flag,
//   Settings,
//   LogOut
// } from "lucide-react";

// import { NavLink } from "react-router-dom";

// const menuItems = [
//   { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
//   { title: "Users Management", url: "/admin/users", icon: Users },
//   { title: "Organizations", url: "/admin/organizations", icon: Building2 },
//   { title: "Jobs Management", url: "/admin/jobs", icon: Briefcase },
//   { title: "Aptitude Tests", url: "/admin/aptitude-tests", icon: Brain },
//   { title: "Question Bank", url: "/admin/questions", icon: HelpCircle },
//   { title: "Applications", url: "/admin/applications", icon: FileText },
//   { title: "Platform Analytics", url: "/admin/analytics", icon: BarChart3 },
//   { title: "Reports & Moderation", url: "/admin/reports", icon: Flag },
//   { title: "System Settings", url: "/admin/settings", icon: Settings },
// ];

// export default function AdminSidebar() {

//   return (
//     <aside className="w-64 h-screen border-r bg-white flex flex-col">

//       {/* Logo */}

//       <div className="p-4 flex items-center gap-2 border-b">
//         <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
//           <Briefcase className="w-4 h-4 text-white"/>
//         </div>

//         <span className="font-bold">
//           JobMatch Admin
//         </span>
//       </div>

//       {/* Menu */}

//       <nav className="flex-1 p-3 space-y-1">

//         {menuItems.map((item) => {

//           const Icon = item.icon;

//           return (
//             <NavLink
//               key={item.title}
//               to={item.url}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition
//                 ${isActive
//                   ? "bg-blue-100 text-blue-700 font-medium"
//                   : "text-gray-600 hover:bg-gray-100"}`
//               }
//             >
//               <Icon className="w-4 h-4"/>
//               {item.title}
//             </NavLink>
//           );

//         })}

//       </nav>

//       {/* Footer */}

//       <div className="p-3 border-t">

//         <a
//           href="/"
//           className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-100"
//         >
//           <LogOut className="w-4 h-4"/>
//           Logout
//         </a>

//       </div>

//     </aside>
//   );
// }