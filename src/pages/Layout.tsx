import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <nav className="fixed w-full z-50">
        <Header />
      </nav>
      <main className="">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
