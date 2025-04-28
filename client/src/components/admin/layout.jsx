import { Outlet } from "react-router";
import AdminHeader from "./header";

const AdminLayout = () => {
  return (
    <div>
      <AdminHeader />

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
