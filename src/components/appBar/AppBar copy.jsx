import React from "react";
import "./AppBar.css";
import { ClockCircleTwoTone, CheckCircleTwoTone } from "@ant-design/icons";
import { Badge, Avatar, Dropdown } from "antd";
import Clock from "../clock/Clock.jsx";
import Profil from "../profil/profil.jsx";
import OrderLogo from "../../assets/menu1.png";
import ServeDish from "../../assets/servingDish.png";
import { useEffect, useState } from "react";
import { callAPI } from "../../utils/FetchData";
import { NotifContext } from "../../utils/Context.jsx";

function AppBar() {
  let auth = JSON.parse(localStorage.getItem("user"));
  const avatar = "https://i.pravatar.cc/100";
  const name = auth?.firstName + " " + auth?.lastName;
  const role = auth?.role;
  const [NumberOfNewClient, setNumberOfNewClient] = useState(0);
  const [NumberOfOrdersReady, setNumberOfOrdersReady] = useState(0);
  const [ordersReady, setOrdersReady] = useState([]);

  useEffect(() => {
    callAPI(`http://localhost:5001/booked/availableTables`, "GET", "", auth.token).then((res) => {
      const result = res.map((table) => ({
        ...table,
        key: table._id,
      }));
      setNumberOfNewClient(result.length);
    });
  }, []);

  useEffect(() => {
    callAPI(`http://localhost:5001/orders/orderReady`, "GET", "", auth.token).then((res) => {
      const result = res.map((table) => ({
        ...table,
        key: table._id,
      }));
      setNumberOfOrdersReady(result.length);
      setOrdersReady(result);
    });
  }, []);

  function changeStatusToServed(order) {
    const statusOrder = {
      status: "Served",
    };
    callAPI(`http://localhost:5001/orders/status/${order._id}`, "PATCH", statusOrder, auth.token);
    if (NumberOfOrdersReady > 0) setNumberOfOrdersReady(NumberOfOrdersReady - 1);
  }
  function DataOfDishReadyToServer() {
    let items = [];
    if (ordersReady.length > 0)
      ordersReady.map((order) => {
        items.push({
          key: order._id,
          onClick: () => changeStatusToServed(order),
          label: order.bookedId.tableId.nameOfTable,
          icon: <CheckCircleTwoTone twoToneColor="#52c41a" className="CheckCircleTwoTone" />,
        });
      });
    return items;
  }
  const items = DataOfDishReadyToServer();

  const menuProps = {
    items,
  };

  return (
    <div className="AppBar">
      <div className="LogoContainer">
        <img className="Logo" src="/src/assets/Logo2.png" alt="Logo" />
      </div>
      <div className="Clock">
        <ClockCircleTwoTone twoToneColor="#f36805" size={50} />
        <Clock />
      </div>
      <div className="NotificationProfile">
        {role === "server" && (
          <div className="Notification">
            <div className="NotificationItem">
              <Badge count={NumberOfNewClient}>
                <Avatar shape="square" size="large" src={OrderLogo} />
              </Badge>
            </div>
            <div className="NotificationItem">
              <Dropdown menu={menuProps}>
                <div>
                  <Badge count={NumberOfOrdersReady}>
                    <Avatar shape="square" size="large" src={ServeDish} />
                  </Badge>
                </div>
              </Dropdown>
            </div>
          </div>
        )}
        <div className="Profil">
          <Profil avatar={avatar} name={name} role={role} />
        </div>
      </div>
    </div>
  );
}

export default AppBar;
