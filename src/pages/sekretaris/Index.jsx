/** @format */

import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/sekretaris/sidebar/SideBar";
import "./style.css";

const Index = () => {
  return (
    <div className="bg-my-gray">
      <div className="md:flex md:gap-8 md:mx-0">
        <div className="md:flex md:gap-8">
          <SideBar />
        </div>
        <div className="my-4 w-full md:mr-4 px-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Index;
