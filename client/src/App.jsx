import { Route, Routes } from "react-router";
import AuthLayout from "./components/auth/layout";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import AdminLayout from "./components/admin/layout";
import Products from "./pages/admin/products.jsx";
// import CheckAuth from "./common/check-auth";
// import { useSelector } from "react-redux";

const App = () => {
  // Get authentication state from Redux store
  // const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <div>
      {/* <CheckAuth isAuthenticated={isAuthenticated} user={user}> */}
      <Routes>
        {/* auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="products" element={<Products />} />
        </Route>

        {/* for testing */}
        <Route path="/test" element={<Products />} />

        {/* Add a route for unauthorized access */}
        <Route
          path="/unauth-page"
          element={<div>You are not authorized to access this page</div>}
        />

        {/* Default route */}
        <Route path="/" element={<div>Home Page</div>} />

        {/* Shop routes */}
        <Route path="/shop">
          <Route path="home" element={<div>Shop Home Page</div>} />
        </Route>
      </Routes>
      {/* </CheckAuth> */}
    </div>
  );
};

export default App;
