import React from "react";
import { Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import CollapseMenu from "../../../components/collapse/CollapseMenu.jsx";
import "./Menu.css";

function Menu() {
  return (
    <div className="MenuPage">
      <Link to={"addcategory"}>
        <Button icon={<PlusCircleOutlined />} style={{ background: "#f36805", color: "#FFFFFF", fontSize: "16px", float: "right" }} size={"large"}>
          Add category
        </Button>
      </Link>
      <CollapseMenu />
    </div>
  );
}

export default Menu;
