import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

import {
  LayoutDashboard,
  User,
  Briefcase,
  Send,
  FileText,
  BarChart3,
  Settings,
  Target,
} from "lucide-react";
import Sidebar from "./Sidebar";

export default function MainUserDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const userMenu = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/user" },
    { label: "My Profile", icon: User, path: "/user/profile" },
    { label: "Job Recommendations", icon: Target, path: "/user/jobs" },
    { label: "All Jobs", icon: Briefcase, path: "/user/all-jobs" },
    { label: "Applied Jobs", icon: Send, path: "/user/applied" },
    { label: "Aptitude Test", icon: FileText, path: "/user/aptitude-test" },
    { label: "Test Dashboard", icon: BarChart3, path: "/user/test-dashboard" },
    { label: "Settings", icon: Settings, path: "/user/settings" },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Reusable Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        menuItems={userMenu}
        theme="light"
      />

      {/* Right Section */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
