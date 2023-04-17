import React from "react";
import { useNavigate } from "react-router-dom";
import { Collapse } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { callAPI } from "../../utils/FetchData.js";
import { token } from "../../utils/token.js";
import ItemCard from "../itemCard/ItemCard.jsx";
import "./CollapseMenu.css";

function CollapseMenu({ categories, setCategories }) {
  const navigate = useNavigate();
  const { Panel } = Collapse;
  function EditCategory(event, id) {
    event.stopPropagation();
    navigate(`editcategory/${id}`);
  }
  function DeleteCategory(event, id) {
    event.stopPropagation();
    callAPI(`http://localhost:5001/categories/${id}`, "DELETE", {}, token).then((res) => {
      if (res === "Category deleted") setCategories(categories.filter((category) => category._id !== id));
    });
  }
  return (
    <div className="CollapseMenu">
      <Collapse accordion className="Collapse">
        {categories &&
          categories.map((categorie, id) => {
            return (
              <Panel
                header={
                  <div className="Header">
                    {categorie.name}
                    <div className="HeaderIcons">
                      <div className="Icons">
                        <EditFilled onClick={(event) => EditCategory(event, categorie._id)} />
                      </div>
                      <div className="Icons">
                        <DeleteFilled onClick={(event) => DeleteCategory(event, categorie._id)} />
                      </div>
                    </div>
                  </div>
                }
                key={id}
                className="Panel"
              >
                <div className="Items">
                  <ItemCard title={"Basic Burger"} price={14} description={"These burger patties are made with ground beef and an easy bread..."} img={"basic_burger.png"} />
                  <ItemCard title={"Basic Burger"} price={14} description={"These burger patties are made with ground beef and an easy bread..."} img={"basic_burger.png"} />
                  <ItemCard title={"Basic Burger"} price={14} description={"These burger patties are made with ground beef and an easy bread..."} img={"basic_burger.png"} />
                  <ItemCard title={"Basic Burger"} price={14} description={"These burger patties are made with ground beef and an easy bread..."} img={"basic_burger.png"} />
                </div>
              </Panel>
            );
          })}
      </Collapse>
    </div>
  );
}

export default CollapseMenu;
