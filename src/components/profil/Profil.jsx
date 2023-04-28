import React from "react";
import { Avatar, Dropdown } from "antd";
import { useNavigate } from "react-router-dom";
import "./Profil.css";
import { LogoutOutlined } from "@ant-design/icons";

function Profil({ avatar, name, role }) {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    navigate("/signin");
  }
  
  const items = [
    {
      key: "logout",
      onClick: handleLogout,
      label: "Logout", icon: <LogoutOutlined className="logoutIcon"/>
    },
  ];

  const menuProps = {
    items,
  }

  return (
  <Dropdown 
  menu={menuProps}
  // trigger={["click"]}
  >
    <div className="Profil">
        <Avatar size="large" src={avatar} />
      <div className="NameRole">
        <div className="Name">{name}</div>
        <div className="Role">{role}</div>
      </div>
    </div>
    </Dropdown>
  );
}

export default Profil;
