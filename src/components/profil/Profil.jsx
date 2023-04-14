import React from "react";
import { Avatar } from "antd";
import "./Profil.css";

function Profil({ avatar, name, role }) {
  return (
    <div className="Profil">
      <Avatar size="large" src={avatar} />
      <div className="NameRole">
        <div className="Name">{name}</div>
        <div className="Role">{role}</div>
      </div>
    </div>
  );
}

export default Profil;
