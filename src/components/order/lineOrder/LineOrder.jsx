import React from "react";
import { PlusCircleFilled, MinusCircleFilled } from "@ant-design/icons";
import "./LineOrder.css";

function LineOrder({ item, setOrder, order }) {
  function Minus(id) {
    const index = order.findIndex((x) => x.id === id);
    if (index !== -1) {
      const newOrder = [...order];
      if (newOrder[index].quantity === 1) newOrder.pop(newOrder[index]);
      else newOrder[index].quantity--;
      setOrder(newOrder);
    }
  }
  function Plus(id) {
    const index = order.findIndex((x) => x.id === id);
    if (index !== -1) {
      const newOrder = [...order];
      newOrder[index].quantity++;
      setOrder(newOrder);
    }
  }
  return (
    <div className="LineOrder">
      <div className="NamePrice">
        <div className="Name">{item.name}</div>
        <div className="Price">{item.price} CAD</div>
      </div>
      <div className="QuantityButton">
        <MinusCircleFilled
          style={{
            fontSize: "35px",
          }}
          onClick={() => Minus(item.id)}
        />
        <div className="Quantity">{item.quantity}</div>
        <PlusCircleFilled
          style={{
            fontSize: "35px",
          }}
          onClick={() => Plus(item.id)}
        />
      </div>
    </div>
  );
}

export default LineOrder;
