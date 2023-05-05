import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import AvailableData from "./Available/Available";
import FilledData from "./Filled/Filled.jsx";
import "./Receptionist.css";

function Receptionist() {
  const [activeTabKey, setActiveTabKey] = useState(localStorage.getItem("activeTabKey") || "1");

  const onTabChange = (key) => {
    setActiveTabKey(key);
    localStorage.setItem("activeTabKey", key);
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

  useEffect(() => {
    const storedTabKey = localStorage.getItem("activeTabKey");
    if (storedTabKey) {
      setActiveTabKey(storedTabKey);
    }
  }, []);

  return (
    <div className="Receptionist">
      <div>
        <Tabs activeKey={activeTabKey} items={items} onChange={onTabChange} destroyInactiveTabPane={true} />
      </div>
    </div>
  );
}

export default Receptionist;
