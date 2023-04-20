import React from "react";
import "./TotalPrice.css";

function TotalPrice({ item }) {
  return (
    <div className="TotalPrice">
      <div className="Line">
        <div>Items :</div>
        <div>{item} CAD</div>
      </div>
      <div className="Line">
        <div>Tax (5%) :</div>
        <div>{Math.round((item * 0.05 + Number.EPSILON) * 100) / 100} CAD</div>
      </div>
      <hr className="HR" />
      <div className="Line">
        <div>Total :</div>
        <div>{Math.round((item + item * 0.05 + Number.EPSILON) * 100) / 100} CAD</div>
      </div>
    </div>
  );
}

export default TotalPrice;
