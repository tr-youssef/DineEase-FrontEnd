import React from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import "./SideMenu.css";

function SideMenu({ menuItems }) {
  const navigate = useNavigate();
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
        defaultSelectedKeys={["users"]}
        defaultOpenKeys={["users"]}
        mode="inline"
        items={items}
        className="Menu"
      />
    </div>
  );
}

export default SideMenu;
