import React from "react";
import "./AppBar.css";
import { ClockCircleTwoTone } from "@ant-design/icons";
import Clock from "../clock/Clock.jsx";
import Profil from "../profil/profil.jsx";
import OrderLogo from "../../assets/menu1.png";
import ServeDish from "../../assets/servingDish.png";


function AppBar() {
  let auth = JSON.parse(localStorage.getItem("user"));
  const avatar = "https://i.pravatar.cc/100";
  const name = auth?.firstName + " " + auth?.lastName;
  const role = auth?.role;

  return (
    <div className="AppBar">
     <div className="LogoContainer">
      <img className="Logo" src="/src/assets/Logo2.png" alt="Logo" />
    
         </div>
      <div className="Clock">
        <ClockCircleTwoTone twoToneColor="#f36805" size={50} />
        <Clock />
      </div>
      <div className="ServerProfile">
  {role === "server" && (
          <div className="Notification">
      <img className="OrderLogo" src={OrderLogo} alt="Order Logo" />
      <img className="ServeDishLogo" src={ServeDish} alt="Serve Dish Logo" />
     
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
