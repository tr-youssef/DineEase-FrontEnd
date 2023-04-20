import React, { useState, useEffect } from "react";
import "./Order.css";
import LineOrder from "./lineOrder/LineOrder.jsx";

function Order({ order, setOrder }) {
  return (
    <div className="Order">
      <div className="Title">Order</div>
      {order &&
        order.map((item) => {
          return <LineOrder name={item.name} price={item.price} quantity={item.quantity} setOrder={setOrder} />;
        })}
    </div>
  );
}

export default Order;
