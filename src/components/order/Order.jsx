import React, { useState, useEffect, useMemo } from "react";
import { Button } from "antd";
import LineOrder from "./lineOrder/LineOrder.jsx";
import TotalPrice from "../totalPrice/TotalPrice.jsx";
import "./Order.css";

function Order({ order, setOrder }) {
  function sum() {
    const sum = order.reduce(add, 0);
    function add(accumulator, a) {
      return accumulator + a.price * a.quantity;
    }
    return sum;
  }
  const item = sum();
  function takeOrder() {}
  return (
    <div className="Order">
      <div className="OrderTop">
        <div className="Title">Order</div>
        <div className="LineItem">
          {order &&
            order.map((item) => {
              return <LineOrder item={item} order={order} setOrder={setOrder} key={item.id} />;
            })}
        </div>
      </div>
      <div className="OrderBottom">
        <div className="OrderTotalPrice">
          <TotalPrice item={item} />
        </div>
        <div className="TakeOrderButton">
          <Button style={{ color: "#F36805", backgroundColor: "#FFFFFF", width: "300px", margin: "40px 47px 56px 47px" }} type="primary" onClick={takeOrder}>
            Take Order
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Order;
