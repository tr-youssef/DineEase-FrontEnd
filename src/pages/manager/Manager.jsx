import React from "react";
import { Outlet } from "react-router-dom";
import SideMenu from "../../components/sideMenu/SideMenu.jsx";
import { MailOutlined } from "@ant-design/icons";
import "./Manager.css";

function Manager() {
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const menuItems = [getItem("Users", "users", <MailOutlined />), getItem("Menu", "menu", <MailOutlined />), getItem("Tables", "tables", <MailOutlined />)];
  return (
    <div className="Manager">
      <SideMenu menuItems={menuItems} />
      <Outlet />
    </div>
  );
}

export default Manager;
