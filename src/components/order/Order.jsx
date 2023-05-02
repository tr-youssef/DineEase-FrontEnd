import React from "react";
import { Button } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import LineOrder from "./lineOrder/LineOrder.jsx";
import TotalPrice from "../totalPrice/TotalPrice.jsx";
import { callAPI } from "../../utils/FetchData.jsx";
import "./Order.css";

function Order({ booked, order, setOrder }) {
  const navigate = useNavigate();
  const bookedId = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  function sum() {
    const sum = order.reduce(add, 0);
    function add(accumulator, a) {
      return accumulator + a.price * a.quantity;
    }
    return sum;
  }
  const item = sum();

  function takeOrder() {
    const data = {
      bookedId: bookedId,
      userId: user.userId,
      items: order,
      subTotalAmount: item,
      tax: Math.round((item * 0.05 + Number.EPSILON) * 100) / 100,
      totalAmount: Math.round((item + item * 0.05 + Number.EPSILON) * 100) / 100,
      status: "New",
    };
    callAPI("http://localhost:5001/orders", "POST", data, user.token).then(() => {
      const statusTable = {
        status: "AlreadyOrdered",
      };
      callAPI(`http://localhost:5001/booked/bookedStatus/${booked._id}`, "PATCH", statusTable, user.token).then(() => {
        navigate("/server");
      })

  }
  )};
   
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
