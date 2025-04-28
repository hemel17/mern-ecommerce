import React from "react";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div>
      <h2>Auth layout</h2>

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
