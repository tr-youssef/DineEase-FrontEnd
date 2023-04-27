
import { Tabs } from "antd";
import NewClient from "./NewClients/NewClients.jsx";
import AlreadyOrdered from "./AlreadyOrdered/AlreadyOrdered.jsx";

const Server = () => {
 

  
const items = [
  {
    key: "1",
    label: `New Clients`,
    children: <NewClient />,
  },
  {
    key: "2",
    label: `Already ordered`,
    children: <AlreadyOrdered  />,
  },
];
  return (
  <div className="tabs-container">
    <Tabs defaultActiveKey="1" items={items} />
    </div>
  )
}

export default Server;
