// import { useState } from "react";
// import { NavLink } from "react-router-dom";
// import {
//   LayoutDashboard,
//   User,
//   Briefcase,
//   Send,
//   FileText,
//   BarChart3,
//   Settings as SettingsIcon,
//   LogOut,
//   PanelLeft,
// } from "lucide-react";

// const menuItems = [
//   { id: "", label: "Dashboard", icon: LayoutDashboard },
//   { id: "profile", label: "My Profile", icon: User },
//   { id: "jobs", label: "Job Recommendations", icon: Briefcase },
//   { id: "applied", label: "Applied Jobs", icon: Send },
//   { id: "aptitude-test", label: "Aptitude Test", icon: FileText },
//   { id: "test-dashboard", label: "Test Dashboard", icon: BarChart3 },
//   { id: "settings", label: "Settings", icon: SettingsIcon },
// ];

// export default function Sidebar() {
//   const [collapsed, setCollapsed] = useState(false);

//   return (
//     <div
//       className={`${
//         collapsed ? "w-20" : "w-64"
//       } bg-white border-r border-gray-200 flex flex-col transition-all duration-300`}
//     >
//       {/* Collapse Button */}
//       <div className="p-4 border-b border-gray-200 flex justify-end">
//         <button
//           onClick={() => setCollapsed(!collapsed)}
//           className="w-9 h-9 flex items-center justify-center rounded-lg bg-white border border-gray-200 shadow-sm hover:bg-gray-50 hover:shadow active:scale-95 transition-all duration-200"
//         >
//           <PanelLeft className="w-5 h-5 text-gray-700" />
//         </button>
//       </div>

//       {/* Menu */}
//       <nav className="flex-1 p-3 space-y-1">
//         {menuItems.map((item) => {
//           const Icon = item.icon;

//           return (
//             <NavLink
//               key={item.label}
//               to={`/user/${item.id}`}
//               end={item.id === ""}
//               className={({ isActive }) =>
//                 `w-full flex items-center ${
//                   collapsed ? "justify-center" : "space-x-3"
//                 } px-4 py-3 rounded-lg transition-all ${
//                   isActive
//                     ? "bg-blue-600 text-white shadow-md"
//                     : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
//                 }`
//               }
//             >
//               <Icon className="w-5 h-5" />
//               {!collapsed && (
//                 <span className="font-medium">{item.label}</span>
//               )}
//             </NavLink>
//           );
//         })}
//       </nav>

//       {/* Logout */}
//       <div className="p-3 border-t border-gray-200">
//         <button
//           className={`w-full flex items-center ${
//             collapsed ? "justify-center" : "space-x-3"
//           } px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all`}
//         >
//           <LogOut className="w-5 h-5" />
//           {!collapsed && <span className="font-medium">Logout</span>}
//         </button>
//       </div>
//     </div>
//   );
// }