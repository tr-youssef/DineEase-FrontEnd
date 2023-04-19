import React, { useState, useEffect } from "react";
import "./Order.css";
import LineOrder from "./lineOrder/LineOrder.jsx";

function Order({ order, setOrder }) {
  const [orders, setOrders] = useState(order);
  useEffect(() => {
    console.log("order 1", order);
    setOrders(order);
  }, [order]);
  return (
    <div className="Order">
      <div className="Title">Order</div>
      {order.map((item) => {
        return <LineOrder key={item.id} name={item.name} price={item.price} quantity={item.quantity} setOrder={setOrder} />;
      })}
    </div>
  );
}

export default Order;
