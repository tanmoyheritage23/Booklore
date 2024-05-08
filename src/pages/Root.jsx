import { Outlet, useLoaderData, useNavigate } from "react-router-dom";

import Navigation from "../components/Navigation";
import Footer from "../components/Footersection";
import { useEffect } from "react";

const RootLayout = () => {
  const nevigate = useNavigate();
  const token = useLoaderData();
  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("username");
      localStorage.removeItem("expiration");
    }

    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("username");
      localStorage.removeItem("expiration");
      nevigate("/");
    }, 1 * 60 * 60 * 1000);
  }, [token]);
  return (
    <>
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
