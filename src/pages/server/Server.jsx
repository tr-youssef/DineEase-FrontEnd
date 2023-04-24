import React from "react";
import { Tabs } from "antd";
import SignIn from "../login/SignIn.jsx";
import NewClientData from "./newClientsData.jsx";
import AlreadyOrderedData from "./alreadyOrderedData.jsx";

const Server = () => <Tabs defaultActiveKey="1" items={items} onChange={onChange} style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)' }} />;

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

export default Server;
