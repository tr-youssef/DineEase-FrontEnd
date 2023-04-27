import React from "react";
import "./AppBar.css";
import { Dropdown, Space } from "antd";
import { ClockCircleTwoTone } from "@ant-design/icons";
import Clock from "../clock/Clock.jsx";
import Profil from "../profil/profil.jsx";

function AppBar() {
  let auth = JSON.parse(localStorage.getItem("user"));
  const avatar = "https://i.pravatar.cc/100";
  const name = auth?.firstName + " " + auth?.lastName;
  const role = auth?.role;
  const items = [
    {
      label: "Duplicate",
      key: "1",
      onClick: () => handleDuplicate(record.id),
    },
  ];
  const menuProps = {
    items,
  };

  return (
    <div className="AppBar">
      <img className="Logo" src="/src/assets/Logo2.png" alt="Logo" />
      <div className="Clock">
        <ClockCircleTwoTone twoToneColor="#f36805" size={50} />
        <Clock />
      </div>
      <div>
        {role === "Server" && <div className="Notification"></div>}
        <div className="Profil">
          <Dropdown menu={menuProps}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Profil avatar={avatar} name={name} role={role} />
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default AppBar;
