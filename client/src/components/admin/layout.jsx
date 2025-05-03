import { useState, useEffect } from "react";
import AdminHeader from "./header.jsx";
import AdminSidebar from "./sidebar.jsx";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Only apply this for mobile/small screens
      if (window.innerWidth < 768 && sidebarOpen) {
        // Check if the click is outside sidebar by seeing if it has a parent with sidebar class
        // This assumes no sidebar element was clicked
        let targetElement = event.target;
        let isInsideSidebar = false;

        while (targetElement != null) {
          if (
            targetElement.classList &&
            targetElement.classList.contains("sidebar-container")
          ) {
            isInsideSidebar = true;
            break;
          }
          targetElement = targetElement.parentElement;
        }

        if (!isInsideSidebar) {
          setSidebarOpen(false);
        }
      }
    };

    // Listen for custom event from sidebar close button
    const handleToggleSidebar = () => setSidebarOpen(false);

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("toggle-sidebar", handleToggleSidebar);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("toggle-sidebar", handleToggleSidebar);
    };
  }, [sidebarOpen]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader toggleSidebar={toggleSidebar} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
