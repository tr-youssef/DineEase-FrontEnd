import React from "react";
import "./AppBar.css";
import { ClockCircleTwoTone } from "@ant-design/icons";
import Clock from "../clock/Clock.jsx";
import Profil from "../profil/profil.jsx";

function AppBar() {
  //Load avatar,name,role from backend
  const avatar = "https://i.pravatar.cc/100";
  const name = "Margo Purcell";
  const role = "Manager";

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
          <Profil avatar={avatar} name={name} role={role} />
        </div>
      </div>
    </div>
  );
}

export default AppBar;
