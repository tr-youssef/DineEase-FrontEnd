import React from "react";
import "./AppBar.css";
import { ClockCircleTwoTone } from "@ant-design/icons";
import { Badge, Avatar, Dropdown, Menu } from "antd";
import Clock from "../clock/Clock.jsx";
import Profil from "../profil/profil.jsx";
import OrderLogo from "../../assets/menu1.png";
import ServeDish from "../../assets/servingDish.png";
import { useEffect, useState } from "react";
import { callAPI } from "../../utils/FetchData";

function AppBar() {
  let auth = JSON.parse(localStorage.getItem("user"));
  const avatar = "https://i.pravatar.cc/100";
  const name = auth?.firstName + " " + auth?.lastName;
  const role = auth?.role;
  const [NumberOfNewClient, setNumberOfNewClient] = useState(0);
  useEffect(() => {
    callAPI(`http://localhost:5001/booked/availableTables`, "GET", "", auth.token).then((res) => {
      const result = res.map((table) => ({
        ...table,
        key: table._id,
      }));
      setNumberOfNewClient(result.length);
    });
  }, []);

  const NumberOfDishReadyToServe = (
    <Menu>
      <Menu.Item key="1">Option 1</Menu.Item>
      <Menu.Item key="2">Option 2</Menu.Item>
      <Menu.Item key="3">Option 3</Menu.Item>
      <Menu.Item key="4">Option 4</Menu.Item>
    </Menu>
  );

  return (
    <div className="AppBar">
      <div className="LogoContainer">
        <img className="Logo" src="/src/assets/Logo2.png" alt="Logo" />
      </div>
      <div className="Clock">
        <ClockCircleTwoTone twoToneColor="#f36805" size={50} />
        <Clock />
      </div>
      <div className="NotificationProfile">
        {role === "server" && (
          <div className="Notification">
            <Badge count={NumberOfNewClient}>
              <Avatar shape="square" size="large" src={OrderLogo} />
            </Badge>
            <Dropdown overlay={NumberOfDishReadyToServe}>
              <Badge count={1}>
                <Avatar shape="square" size="large" src={ServeDish} />
              </Badge>
            </Dropdown>
          </div>
        )}
        <div className="Profil">
          <Profil avatar={avatar} name={name} role={role} />
        </div>
      </div>
    </div>
  );
}

export default AppBar;
