import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Collapse } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { callAPI } from "../../utils/FetchData.js";
import { token } from "../../utils/token.js";
import ItemCard from "../itemCard/ItemCard.jsx";
import "./CollapseMenu.css";

function CollapseMenu({ table, order, setOrder }) {
  const navigate = useNavigate();
  const [categories, setCategories] = useState("");
  const [items, setItems] = useState([]);
  const { Panel } = Collapse;
  useEffect(() => {
    let fetchData = async () => {
      await callAPI("http://localhost:5001/categories", "GET", "", token).then((res) => {
        if (!res.error) setCategories(res);
      });
    };
    fetchData();
  }, []);
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
  function onChange(key) {
    setItems([]);
    if (key.length !== 0) {
      callAPI(`http://localhost:5001/items/getitems/${categories[key]._id}`, "GET", {}, token).then((res) => {
        setItems(res);
      });
    }
  }
  function onClick(id, name, price) {
    const index = order.findIndex((x) => x.id === id);
    if (index === -1) order.push({ id: id, name: name, price: price, quantity: 1 });
    setOrder(order);
  }
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
                    {!table && (
                      <div className="HeaderIcons">
                        <div className="Icons">
                          <EditFilled onClick={(event) => EditCategory(event, categorie._id)} />
                        </div>
                        <div className="Icons">
                          <DeleteFilled onClick={(event) => DeleteCategory(event, categorie._id)} />
                        </div>
                      </div>
                    )}
                  </div>
                }
                key={id}
                className="Panel"
              >
                <div className="ItemsMenu">
                  {items.map((item) => {
                    return table ? (
                      <div
                        onClick={() => {
                          onClick(item._id, item.name, item.price);
                        }}
                        key={item._id}
                        className="ItemMenu"
                      >
                        <ItemCard title={item.name} price={item.price} description={item.description} img={item.picture} />
                      </div>
                    ) : (
                      <Link to={`edititem/${item._id}`} key={item._id}>
                        <ItemCard title={item.name} price={item.price} description={item.description} img={item.picture} />
                      </Link>
                    );
                  })}

                  {!table && (
                    <Link to={`additem/${categorie._id}`}>
                      <ItemCard title={"Add new items"} img={"plus_sign.png"} />
                    </Link>
                  )}
                </div>
              </Panel>
            );
          })}
      </Collapse>
    </div>
  );
}

export default CollapseMenu;
