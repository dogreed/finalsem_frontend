import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

import {
  LayoutDashboard,
  Building2,
  PlusCircle,
  FileText,
  Users,
  Mail,
  BarChart3,
  Settings,
} from "lucide-react";

export default function MainOrganizationDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const OrganizationMenu = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/organization/dashboard",
    },
    {
      label: "Organization Profile",
      icon: Building2,
      path: "/organization/profile",
    },
    { label: "Post Vacancy", icon: PlusCircle, path: "/organization/post-job" },
    {
      label: "Manage Vacancies",
      icon: FileText,
      path: "/organization/manage-jobs",
    },
    { label: "Candidates", icon: Users, path: "/organization/candidates" },
    { label: "Applications", icon: Mail, path: "/organization/applications" },
    { label: "Analytics", icon: BarChart3, path: "/organization/analytics" },
    { label: "Settings", icon: Settings, path: "/organization/settings" },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        menuItems={OrganizationMenu}
        theme="light"
      />

      {/* Right Column */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
