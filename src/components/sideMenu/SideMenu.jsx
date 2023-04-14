import React from "react";
import { Menu } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./SideMenu.css";

function SideMenu() {
  const navigate = useNavigate();
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const items = [getItem("Users", "users", <MailOutlined />), getItem("Menu", "menu", <MailOutlined />), getItem("Tables", "tables", <MailOutlined />)];
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
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
        className="Menu"
      />
    </div>
  );
}

export default SideMenu;
