import { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { callAPI } from "../../utils/FetchData.jsx";
import { socket } from "../../utils/Socket.jsx";
import "./Chef.css";

function Chef() {
  const [orders, setOrders] = useState([]);
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  useEffect(() => {
    let fetchData = async () => {
      await callAPI(`${import.meta.env.VITE__API_URL}/orders`, "GET", {}, token).then((res) => {
        setOrders(res);
      });
    };
    fetchData();
  }, []);

  useEffect(() => {
    socket.connect();
    socket.on("orders", (data) => {
      setOrders(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  async function changeStatus(id) {
    const data = { status: "Ready" };
    await callAPI(`${import.meta.env.VITE__API_URL}/orders/status/${id}`, "PATCH", data, token).then(() => {});
  }

  return (
    <div>
      <Row className="ChefRow">
        {orders &&
          orders?.map((order) => {
            return (
              <Col className="ChefCol" onClick={() => changeStatus(order._id)} span={6} key={order._id}>
                <div className="ChefTable">{order.bookedId.tableId.nameOfTable}</div>
                {order?.items?.map((item) => {
                  return (
                    <div className="ChefItems" key={item.id}>
                      <div className="ChefLineItem">
                        <div className="ChefLineName">{item.name}</div>
                        <div className="ChefLineQuantity">{item.quantity}</div>
                      </div>
                    </div>
                  );
                })}
              </Col>
            );
          })}
      </Row>
    </div>
  );
}

export default Chef;
