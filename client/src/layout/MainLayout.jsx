import Foot from "@/components/Foot";
import NavBar from "@/components/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";

const Mainlayout = () => {
  return (
    <div className="h-screen overflow-auto">
      <div className="relative top-0 right-0 left-0">
        <NavBar />
      </div>
      <div>
        <Outlet />
      </div>
      <div className="relative bottom-0 right-0 left-0">
        <Foot />
      </div>
    </div>
  );
};

export default Mainlayout;
