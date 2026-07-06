import { Outlet } from "react-router-dom";
import { useState } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

import { superAdminMenu } from "../../menus/superAdminMenu";
import { societyAdminMenu } from "../../menus/societyAdminMenu";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);

  const role = localStorage.getItem("role");

  // console.log(localStorage.getItem("role"));

  const menu = role === "super_admin" ? superAdminMenu : societyAdminMenu;

  // console.log("menu", menu);

  return (
    <div className="bg-[#F7F9FB] min-h-screen">
      <Sidebar open={open} setOpen={setOpen} menu={menu} />

      <div className="lg:ml-60">
        <div className="fixed top-0 right-0 left-0 lg:left-60 z-40">
          <Topbar open={open} setOpen={setOpen} />
        </div>

        <main className="pt-20 px-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
