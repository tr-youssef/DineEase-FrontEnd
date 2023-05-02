
import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import NewClient from "./NewClients/NewClients.jsx";
import PendingPayments from "./PendingPayments/PendingPayments.jsx"

const Server = () => {

  const [activeTabKey, setActiveTabKey] = useState(
    localStorage.getItem("activeTabKey") || "1"
  );

  const onTabChange = (key) => {
    setActiveTabKey(key);
    localStorage.setItem("activeTabKey", key);
  };

  
const items = [
  {
    key: "1",
    label: `New Clients`,
    children: <NewClient />,
  },
  {
    key: "2",
    label: `Pending Payments`,
    children: <PendingPayments  />,
  },
];

useEffect(() => {
  const storedTabKey = localStorage.getItem("activeTabKey");
  if (storedTabKey) {
    setActiveTabKey(storedTabKey);
  }
}, []);

  return (
      <div>
        <Tabs activeKey={activeTabKey} items={items} onChange={onTabChange} />
      </div>
  )
}

export default Server;
