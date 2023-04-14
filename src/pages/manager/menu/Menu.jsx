import React from "react";
import CollapseMenu from "../../../components/collapse/CollapseMenu.jsx";

const categories = ["burgers", "Hot Dog", "Fries", "Drinks"];
function Menu() {
  return (
    <div className="Menu">
      <CollapseMenu categories={categories} />
    </div>
  );
}

export default Menu;
