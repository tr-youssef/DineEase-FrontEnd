import React, { useState } from "react";
import { Collapse } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import "./CollapseMenu.css";

function CollapseMenu({ categories }) {
  const { Panel } = Collapse;
  const [activeKey, setActiveKey] = useState("0");
  const onChange = (key) => {
    setActiveKey(key);
  };
  function EditCategory(event) {
    event.stopPropagation();
    console.log("Edit");
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
                        <EditFilled onClick={EditCategory} />
                      </div>
                      <div className="Icons">
                        <DeleteFilled onClick={DeleteCategory} />
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
