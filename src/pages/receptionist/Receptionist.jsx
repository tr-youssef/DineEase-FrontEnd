import React from "react";
import { Tabs } from "antd";
import AvailableData from "./Available/Available";
import FilledData from "./Filled/Filled.jsx"
import "./Receptionist.css"

function Receptionist() {
    const onChange = (key) => {
        console.log(key);
      };

      const items = [
        {
          key: "1",
          label: `Available`,
          children: <AvailableData />,
        },
        {
          key: "2",
          label: `Filled`,
          children: <FilledData />,
        },
      ];
    
    return (
      <div className="Receptionist">
        <div>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
      </div>
    );
  }
  
  export default Receptionist;
  