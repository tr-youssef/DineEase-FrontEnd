import React from "react";
import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import "./SideMenu.css";

function SideMenu({ menuItems }) {
  const navigate = useNavigate();
  const location = useLocation();
  const items = menuItems;
  const onClick = (e) => {
    navigate(`${e.key}`);
  };
  return (
    <div className="Menu">
      <Menu
        onClick={onClick}
        style={{
          width: 200,
        }}
        defaultSelectedKeys={location.pathname.split("/")[2]}
        mode="inline"
        items={items}
        className="Menu"
      />
    </div>
  );
}

export default SideMenu;
