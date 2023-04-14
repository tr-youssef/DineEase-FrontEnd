import React, { useState } from "react";
import { Collapse } from "antd";
import "./CollapseMenu.css";

function CollapseMenu({ categories }) {
  const { Panel } = Collapse;
  const [activeKey, setActiveKey] = useState("0");
  const onChange = (key) => {
    console.log(categories[key]);
    setActiveKey(key);
  };
  return (
    <div className="CollapseMenu">
      <Collapse accordion className="Collapse" onChange={onChange}>
        {categories.map((categorie, id) => {
          return (
            <Panel header={categorie} key={id} className="Panel">
              <p>{categorie}</p>
            </Panel>
          );
        })}
      </Collapse>
    </div>
  );
}

export default CollapseMenu;
