import React from "react";
import { Outlet, useLocation } from "react-router";

const AuthLayout = () => {
  const location = useLocation();

  const actionText = location.pathname.includes("login") ? (
    <>
      Enter your credentials to <span className="text-blue-500">Login</span>
    </>
  ) : (
    <>
      Enter your details to <span className="text-blue-500">Register</span>
    </>
  );

  return (
    <section className="min-h-screen space-y-15 md:space-y-20 py-10">
      <div>
        <h2 className="text-3xl md:text-5xl text-center">
          <span className="text-blue-500">Welcome</span> to Clothing
        </h2>
        <p className="text-center md:text-xl mt-4">{actionText}</p>
      </div>
      <div className="flex items-center justify-center">
        <Outlet />
      </div>
    </section>
  );
};

export default AuthLayout;
