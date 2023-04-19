import React, { useState } from "react";
import { useParams } from "react-router-dom";
import CollapseMenu from "../../../components/collapse/CollapseMenu.jsx";
import Order from "../../../components/order/Order.jsx";
import "./TakeOrder.css";

function TakeOrder() {
  const id = useParams();
  const [order, setOrder] = useState([]);
  return (
    <div className="TakeOrder">
      <CollapseMenu table={id} order={order} setOrder={setOrder} />
      <Order order={order} setOrder={setOrder} />
    </div>
  );
}

export default TakeOrder;
