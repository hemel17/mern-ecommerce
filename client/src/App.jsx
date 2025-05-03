import { Route, Routes } from "react-router";
import AuthLayout from "./components/auth/layout";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import AdminLayout from "./components/admin/layout";

const App = () => {
  return (
    <div>
      <Routes>
        {/* auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* admin routes */}
        <Route path="/admin" element={<AdminLayout />}></Route>
      </Routes>
    </div>
  );
};

export default App;
