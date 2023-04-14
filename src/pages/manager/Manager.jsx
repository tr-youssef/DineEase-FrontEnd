import React from "react";
import { Outlet } from "react-router-dom";
import SideMenu from "../../components/sideMenu/SideMenu.jsx";
import "./manager.css";

function Manager() {
  return (
    <div className="Manager">
      <SideMenu />
      <Outlet />
    </div>
  );
}

export default Manager;
