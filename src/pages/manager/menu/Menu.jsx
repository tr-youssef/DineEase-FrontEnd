import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { callAPI } from "../../../utils/FetchData.js";
import CollapseMenu from "../../../components/collapse/CollapseMenu.jsx";
import { token } from "../../../utils/token.js";
import "./Menu.css";

function Menu() {
  const [categories, setCategories] = useState("");
  useEffect(() => {
    let fetchData = async () => {
      await callAPI("http://localhost:5001/categories", "GET", "", token).then((res) => {
        setCategories(res);
      });
    };
    fetchData();
  }, []);

  return (
    <div className="MenuPage">
      <Link to={"addcategory"}>
        <Button icon={<PlusCircleOutlined />} style={{ background: "#f36805", color: "#FFFFFF", fontSize: "16px", float: "right", marginTop: "60px" }} size={"large"}>
          Add category
        </Button>
      </Link>
      <CollapseMenu categories={categories} />
    </div>
  );
}

export default Menu;
