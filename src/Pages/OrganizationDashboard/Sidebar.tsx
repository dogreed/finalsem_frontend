// import { Link, useLocation } from 'react-router-dom';
// import {
//   LayoutDashboard,
//   Building2,
//   PlusCircle,
//   FileText,
//   Users,
//   Mail,
//   BarChart3,
//   Settings,
//   LogOut,
//   ChevronLeft,
//   ChevronRight,
//   Target
// } from 'lucide-react';

// interface SidebarProps {
//   collapsed: boolean;
//   setCollapsed: (collapsed: boolean) => void;
// }

// export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
//   const location = useLocation();

//   const menuItems = [
//     { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
//     { icon: Building2, label: 'Organization Profile', path: '/admin/profile' },
//     { icon: PlusCircle, label: 'Post Vacancy', path: '/admin/post-job' },
//     { icon: FileText, label: 'Manage Vacancies', path: '/admin/manage-jobs' },
//     { icon: Users, label: 'Candidates', path: '/admin/candidates' },
//     { icon: Mail, label: 'Applications', path: '/admin/applications' },
//     { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
//     { icon: Settings, label: 'Settings', path: '/admin/settings' },
//   ];

//   const isActive = (path: string) => location.pathname === path;

//   return (
//     <div
//       className={`${
//         collapsed ? 'w-20' : 'w-64'
//       } bg-gray-900 text-white min-h-screen fixed left-0 top-0 transition-all duration-300 z-30 flex flex-col`}
//     >
//       <div className="p-4 flex items-center justify-between border-b border-gray-800">
//         {!collapsed && (
//           <div className="flex items-center">
//             <Target className="h-8 w-8 text-blue-500" />
//             <span className="ml-2 text-lg font-bold">JobMatch Pro</span>
//           </div>
//         )}
//         {collapsed && <Target className="h-8 w-8 text-blue-500 mx-auto" />}
//         <button
//           onClick={() => setCollapsed(!collapsed)}
//           className="text-gray-400 hover:text-white ml-auto"
//         >
//           {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
//         </button>
//       </div>

//       <nav className="flex-1 p-4 space-y-2">
//         {menuItems.map((item) => (
//           <Link
//             key={item.path}
//             to={item.path}
//             className={`flex items-center ${
//               collapsed ? 'justify-center' : 'justify-start'
//             } px-4 py-3 rounded-lg transition-colors ${
//               isActive(item.path)
//                 ? 'bg-blue-600 text-white'
//                 : 'text-gray-300 hover:bg-gray-800 hover:text-white'
//             }`}
//             title={collapsed ? item.label : ''}
//           >
//             <item.icon className="h-5 w-5 flex-shrink-0" />
//             {!collapsed && <span className="ml-3">{item.label}</span>}
//           </Link>
//         ))}
//       </nav>

//       <div className="p-4 border-t border-gray-800">
//         <button
//           className={`flex items-center ${
//             collapsed ? 'justify-center' : 'justify-start'
//           } px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors w-full`}
//           title={collapsed ? 'Logout' : ''}
//         >
//           <LogOut className="h-5 w-5 flex-shrink-0" />
//           {!collapsed && <span className="ml-3">Logout</span>}
//         </button>
//       </div>
//     </div>
//   );
// }
