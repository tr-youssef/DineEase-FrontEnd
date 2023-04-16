import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Collapse } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import "./CollapseMenu.css";

function CollapseMenu({ categories }) {
  const { Panel } = Collapse;
  const [activeKey, setActiveKey] = useState("0");
  const navigate = useNavigate();
  const onChange = (key) => {
    setActiveKey(key);
  };
  function EditCategory(event, id) {
    event.stopPropagation();
    navigate(`editcategory/${id}`);
  }
  function DeleteCategory(event) {
    event.stopPropagation();
    console.log("Delete");
  }
  return (
    <div className="CollapseMenu">
      <Collapse accordion className="Collapse" onChange={onChange}>
        {categories &&
          categories?.map((categorie, id) => {
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
                <p>{categorie.name}</p>
              </Panel>
            );
          })}
      </Collapse>
    </div>
  );
}

export default CollapseMenu;
