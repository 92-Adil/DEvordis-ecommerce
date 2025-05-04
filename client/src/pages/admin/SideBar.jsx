import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const SideBar = () => {
    const navigate=useNavigate()
  return (
    <div className="flex ">
      <div className="w-64 h-screen sticky top-0 right-0 bg-gray-100">
        <div className="flex-col pl-4 pt-10 space-y-4 cursor-pointer ">
          <h1 className=" text-xl font-sans hover:font-medium" onClick={()=>navigate("/admin/adminProducts")}>Admin Created Products</h1>
          <h1 className=" text-xl font-sans hover:font-medium "onClick={()=>navigate("/admin/orderList")}>Orders of the Products</h1>
        </div>
      </div>
      <div className="flex-1" >
        <Outlet />
      </div>
    </div>
  );
};

export default SideBar;
