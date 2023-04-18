import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Collapse } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { callAPI } from "../../utils/FetchData.js";
import { token } from "../../utils/token.js";
import ItemCard from "../itemCard/ItemCard.jsx";
import "./CollapseMenu.css";

function CollapseMenu({ categories, setCategories }) {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
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
  const onChange = (key) => {
    setItems([]);
    if (key.length !== 0) {
      callAPI(`http://localhost:5001/items/getitems/${categories[key]._id}`, "GET", {}, token).then((res) => {
        setItems(res);
      });
    }
  };
  return (
    <div className="CollapseMenu">
      <Collapse accordion className="Collapse" onChange={onChange}>
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
                <div className="ItemsMenu">
                  {items.map((item) => {
                    return (
                      <Link to={`edititem/${item._id}`} key={item._id}>
                        <ItemCard title={item.name} price={item.price} description={item.description} img={item.picture} />
                      </Link>
                    );
                  })}

                  <Link to={`additem/${categorie._id}`}>
                    <ItemCard title={"Add new items"} img={"plus_sign.png"} />
                  </Link>
                </div>
              </Panel>
            );
          })}
      </Collapse>
    </div>
  );
}

export default CollapseMenu;
