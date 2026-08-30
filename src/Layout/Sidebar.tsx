import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, PanelLeft } from "lucide-react";
import { useToast } from "../hooks/useToasts";
import InternHubImage from "../assets/internhub.png";

interface MenuItem {
  label: string;
  icon: any;
  path: string;
}

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
  menuItems: MenuItem[];
  theme?: "light" | "dark";
  logo?: React.ReactNode;
}

export default function Sidebar({
  collapsed,
  setCollapsed,
  menuItems,
  theme = "light",
  logo,
}: SidebarProps) {
  const isDark = theme === "dark";
  const { showSuccess, showError } = useToast();

  const navigate = useNavigate();

  const logout = () => {
    try {
      localStorage.removeItem("accessTokenA");
      localStorage.removeItem("userA");

      localStorage.removeItem("accessTokenS");
      localStorage.removeItem("userS");

      localStorage.removeItem("accessTokenO");
      localStorage.removeItem("userO");

      showSuccess("Logout successful");

      navigate("/");
    } catch (err) {
      console.warn("Error occured", err);
      showError("Failed to logout");
    }
  };

  return (
    <div
      className={`
        ${collapsed ? "w-20" : "w-64"}
        ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-700"}
        h-screen overflow-hidden transition-all duration-300 flex flex-col border-r
        ${isDark ? "border-gray-800" : "border-gray-200"}
      `}
    >
      <div
        className={`
    flex items-center justify-between border-b p-4
    ${isDark ? "border-gray-800" : "border-gray-200"}
  `}
      >
        {!collapsed && (
          <div className="flex items-center gap-3">
            <img
              src={InternHubImage}
              alt="InternHub"
              className="h-10 w-auto object-contain"
            />
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`
      flex h-9 w-9 items-center justify-center rounded-lg
      transition-all duration-200 active:scale-95
      ${
        isDark
          ? "border border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700"
          : "border border-gray-200 bg-white text-gray-700 shadow-sm hover:bg-gray-50"
      }
    `}
        >
          <PanelLeft className="h-5 w-5" />
        </button>
      </div>

      {!collapsed && logo && <div className="px-4 py-3">{logo}</div>}

      <nav className="flex-1 overflow-y-auto p-3 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end
              className={({ isActive }) =>
                `flex items-center px-4 py-3 rounded-lg transition-all font-semibold
                ${collapsed ? "justify-center" : "space-x-3"}
                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : isDark
                      ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                      : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                }`
              }
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      <div
        className={`
          p-3 border-t
          ${isDark ? "border-gray-800" : "border-gray-200"}
        `}
      >
        <button
          onClick={logout}
          className={`flex items-center w-full px-4 py-3 rounded-lg transition-all cursor-pointer
            ${collapsed ? "justify-center" : "space-x-3"}
            ${
              isDark
                ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                : "text-red-500 hover:bg-red-100"
            }
          `}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}
