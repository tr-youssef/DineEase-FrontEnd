import React from "react";
import { Avatar, Dropdown, Menu } from "antd";
import { useNavigate } from "react-router-dom";
import "./Profil.css";

function Profil({ avatar, name, role }) {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate("/signin");
  }
  
  const menuItems = [
    {
      key: "logout",
      onClick: handleLogout,
      label: "Logout",
    },
  ];

  return (
    <div className="Profil">
      <Dropdown
        overlay={
          <Menu>
            {menuItems.map((item) => (
              <Menu.Item key={item.key} onClick={item.onClick}>
                {item.label}
              </Menu.Item>
            ))}
          </Menu>
        }
        trigger={["click"]}
      >
        <Avatar size="large" src={avatar} />
      </Dropdown>
      <div className="NameRole">
        <div className="Name">{name}</div>
        <div className="Role">{role}</div>
      </div>
    </div>
  );
}

export default Profil;
