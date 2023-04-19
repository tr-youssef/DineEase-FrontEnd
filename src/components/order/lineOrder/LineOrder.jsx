import React from "react";
import { Button } from "antd";
import { PlusCircleFilled, MinusCircleFilled } from "@ant-design/icons";
import "./LineOrder.css";

function LineOrder({ name, price, quantity }) {
  return (
    <div className="LineOrder">
      <div className="NamePrice">
        <div className="Name">{name}</div>
        <div className="Price">{price} CAD</div>
      </div>
      <div className="QuantityButton">
        <MinusCircleFilled
          style={{
            fontSize: "35px",
          }}
        />
        <div className="Quantity">{quantity}</div>
        <PlusCircleFilled
          style={{
            fontSize: "35px",
          }}
        />
      </div>
    </div>
  );
}

export default LineOrder;
