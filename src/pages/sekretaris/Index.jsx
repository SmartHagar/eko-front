/** @format */

import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/sekretaris/sidebar/SideBar";
import "./style.css";
import "react-notifications/lib/notifications.css";

const Index = () => {
  return (
    <div className="bg-my-gray">
      <div className="flex gap-8">
        <div className="flex gap-8">
          <SideBar />
        </div>
        <div className="my-4 w-full mr-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Index;
