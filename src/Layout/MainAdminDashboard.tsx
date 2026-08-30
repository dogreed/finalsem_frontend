import { useState } from "react";
import { Outlet } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  Building2,
  // Briefcase,
  Brain,
  HelpCircle,
  // FileText,
  BarChart3,
  Flag,
  Settings,
} from "lucide-react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function MainAdminDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const adminMenu = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
    { label: "Users Management", icon: Users, path: "/admin/users" },
    { label: "Organizations", icon: Building2, path: "/admin/organizations" },
    // { label: "Jobs Management", icon: Briefcase, path: "/admin/jobs" },
    { label: "Aptitude Tests", icon: Brain, path: "/admin/aptitude-tests" },
    { label: "Question Bank", icon: HelpCircle, path: "/admin/questions" },
    // { label: "Applications", icon: FileText, path: "/admin/applications" },
    { label: "Platform Analytics", icon: BarChart3, path: "/admin/analytics" },
    { label: "Reports & Moderation", icon: Flag, path: "/admin/reports" },
    { label: "System Settings", icon: Settings, path: "/admin/settings" },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        menuItems={adminMenu}
        theme="light"
      />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
