import { Menu, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "@/store/auth";

const AdminHeader = ({ toggleSidebar }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    console.log("Logout clicked");
    dispatch(logout());
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm h-16 flex items-center px-4">
      {/* Menu Button - Only visible on mobile */}
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-md text-gray-500 hover:text-indigo-600 hover:bg-gray-100 md:hidden"
        aria-label="Toggle sidebar"
      >
        <Menu size={24} />
      </button>

      {/* TODO : Page Title - You can make this dynamic based on current route */}
      <div className="flex-1 ml-4 md:ml-0">
        <h1 className="text-xl font-semibold text-gray-800">Clothing</h1>
      </div>

      {/* Right side actions */}
      <div className="flex items-center space-x-2">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 transition-colors cursor-pointer"
          aria-label="Logout"
        >
          <LogOut size={20} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
