import {
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBag,
  ClipboardList,
  X,
} from "lucide-react";
import { Link } from "react-router";

const AdminSidebar = ({ isOpen }) => {
  // Navigation items with their icons
  const navItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/admin/dashboard",
    },
    {
      name: "Products",
      icon: <ShoppingBag size={20} />,
      path: "/admin/products",
    },
    {
      name: "Orders",
      icon: <ClipboardList size={20} />,
      path: "/admin/orders",
    },
  ];

  return (
    <aside
      className={`${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 fixed md:static inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out bg-white border-r border-gray-200 shadow-sm sidebar-container`}
    >
      {/* Logo and Site Name */}
      <div className="flex items-center justify-between h-16 px-4 border-b">
        <Link to="/admin" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-md flex items-center justify-center">
            <span className="text-gray-500 ">
              <ChartNoAxesCombined />
            </span>
          </div>
          <span className="text-xl font-semibold">Admin Panel</span>
        </Link>

        {/* Close button - visible only on mobile */}
        <button
          className="md:hidden"
          onClick={() =>
            window.dispatchEvent(new CustomEvent("toggle-sidebar"))
          }
        >
          <X size={20} />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="mt-6 px-4">
        <ul className="space-y-1">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 hover:text-indigo-600 group transition-colors"
              >
                <span className="text-gray-500 group-hover:text-indigo-600 transition-colors">
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
