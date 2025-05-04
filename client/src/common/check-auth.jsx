import { Navigate, useLocation } from "react-router";

/**
 * Authentication and route protection component
 * Handles redirects based on authentication status and user role
 * Allows unauthenticated users to access the home page
 */
function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();
  const { pathname } = location;

  // For debugging purposes
  console.log(
    "Current path:",
    pathname,
    "Is authenticated:",
    isAuthenticated,
    "user:",
    user
  );

  // For authenticated users on the root path, redirect based on role
  if (pathname === "/" && isAuthenticated) {
    return user?.role === "admin" ? (
      <Navigate to="/admin/dashboard" />
    ) : (
      <Navigate to="/shop/home" />
    );
  }

  // Check if current path is in auth pages or public pages
  const isAuthPage =
    pathname.includes("/login") || pathname.includes("/register");
  const isPublicPage = pathname === "/" || pathname === "/shop/home";

  // User is not authenticated but trying to access protected pages
  if (!isAuthenticated && !isAuthPage && !isPublicPage) {
    return <Navigate to="/login" />;
  }

  // User is authenticated but trying to access auth pages
  if (isAuthenticated && isAuthPage) {
    return user?.role === "admin" ? (
      <Navigate to="/admin/dashboard" />
    ) : (
      <Navigate to="/shop/home" />
    );
  }

  // Non-admin user trying to access admin routes
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    pathname.includes("/admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  // Admin user trying to access shop routes
  if (isAuthenticated && user?.role === "admin" && pathname.includes("/shop")) {
    return <Navigate to="/admin/dashboard" />;
  }

  // If all checks pass, render the children
  return <>{children}</>;
}

export default CheckAuth;
