import React from "react";
import { Tabs } from "antd";
import SignIn from "../login/SignIn.jsx";
import NewClientData from "./newClientsData.jsx";
import AlreadyOrderedData from "./alreadyOrderedData.jsx";

const server = () => <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;

const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: "1",
    label: `New Clients`,
    children: <NewClientData />,
  },
  {
    key: "2",
    label: `Already ordered`,
    children: <AlreadyOrderedData />,
  },
];

export default server;
